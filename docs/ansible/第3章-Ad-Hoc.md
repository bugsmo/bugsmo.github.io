---
order: 3
tags:
  - ansible教程
title: 第 3 章 - Ad-Hoc 命令
date: 2023-11-15 17:46:13
categories:
  - ansible
columns:
  -
---

# 第 3 章 - Ad-Hoc 命令

在上一章中，我们通过创建一个非常简单的 Ansible playbook 结束了对 Vagrant 本地基础设施测试的探索。早些时候，我们使用了一个简单的 ansible ad-hoc 命令在远程服务器上运行一次性命令。

我们将在接下来的章节中更深入地探讨剧本；现在，我们将探讨 Ansible 如何帮助您使用临时命令在一台或多台服务器上快速执行常见任务并从中收集数据。

## 指挥管弦乐队

在过去十年中，由单个管理员管理的服务器数量急剧增加，特别是随着虚拟化和不断增长的云应用程序使用已成为标准。因此，管理员必须找到以简化的方式管理服务器的新方法。

在任何一天，系统管理员都有许多任务：

- 通过 `dnf` 、 `apt` 和其他包管理器应用补丁和更新。
- 检查资源使用情况（磁盘空间、内存、CPU、交换空间、网络）。
- 检查日志文件。
- 管理系统用户和组。
- 管理 DNS 设置、hosts 文件等。
- 将文件复制到服务器或从服务器复制文件。
- 部署应用程序或运行应用程序维护。
- 重新启动服务器。
- 管理 cron 作业。

几乎所有这些任务都可以（通常是）至少部分自动化，但有些任务通常需要人为参与，特别是在实时诊断问题时。在当今复杂的多服务器环境中，单独登录服务器并不是一个可行的解决方案。

Ansible 允许管理员使用 ansible 命令同时在一台或数百台计算机上运行临时命令。在第 1 章中，我们在添加到 Ansible 库存文件中的服务器上运行了几个命令（ ping 和 free -m ）。本章将更详细地探讨临时命令和多服务器环境。即使您决定忽略 Ansible 的其余强大功能，在阅读本章后您也将能够更有效地管理您的服务器。

::: tip
本章中的一些示例将展示如何使用临时命令配置服务器的某些方面。通常更适合将所有配置包含在剧本和模板中，因此更容易配置服务器（第一次运行剧本），然后确保其配置是幂等的（您可以一遍又一遍地运行剧本，并且您的服务器将处于正确的状态）。

本章中的示例仅用于说明目的，所有示例可能并不适用于您的环境。但即使您仅使用 Ansible 进行服务器管理并针对服务器组运行单独的任务，并且根本不使用 Ansible 的 playbook 功能，您仍然可以在 Ansible 中拥有出色的编排和部署工具！
:::

## 使用 Vagrant 构建基础架构以进行测试

在本章的其余部分中，由于我们希望在不损坏任何生产服务器的情况下进行大量实验，因此我们将使用 Vagrant 强大的多机功能来配置一些服务器，我们将使用 Ansible 管理这些服务器。

之前，我们使用 Vagrant 启动一台运行 Rocky Linux 8 的虚拟机。在该示例中，我们使用了 Vagrantfile 中定义的所有 Vagrant 默认配置。在这个例子中，我们将使用 Vagrant 强大的多机管理功能。

![](https://assets.moweilong.com/img/1-basic-vagrant-application.svg)

我们将管理三个虚拟机：两个应用程序服务器和一个数据库服务器。许多简单的 Web 应用程序和网站都有类似的架构，尽管这可能无法反映现有基础设施组合的广阔领域，但足以突出 Ansible 的服务器管理能力。

首先，在本地驱动器上的某个位置创建一个新文件夹（我喜欢使用 ~/VMs/[dir] ），并创建一个名为 Vagrantfile 的新空白文件（这是我们向 Vagrant 描述虚拟机的方式） ）。在您喜欢的编辑器中打开文件，添加以下内容，然后保存文件：

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # General Vagrant VM configuration.
  config.vm.box = "geerlingguy/rockylinux8"
  config.ssh.insert_key = false
  config.vm.synced_folder ".", "/vagrant", disabled: true
  config.vm.provider :virtualbox do |v|
    v.memory = 512
    v.linked_clone = true
  end

  # Application server 1.
  config.vm.define "app1" do |app|
    app.vm.hostname = "orc-app1.test"
    app.vm.network :private_network, ip: "192.168.56.4"
  end

  # Application server 2.
  config.vm.define "app2" do |app|
    app.vm.hostname = "orc-app2.test"
    app.vm.network :private_network, ip: "192.168.56.5"
  end

  # Database server.
  config.vm.define "db" do |db|
    db.vm.hostname = "orc-db.test"
    db.vm.network :private_network, ip: "192.168.56.6"
  end
end
```

这个 Vagrantfile 定义了我们想要管理的三台服务器，并为每台服务器提供了唯一的主机名、机器名（对于 VirtualBox）和 IP 地址。为简单起见，所有三台服务器都将运行 Rocky Linux 8。

打开终端窗口并将目录更改为刚刚创建的 Vagrantfile 所在的同一文件夹。输入 `vagrant up` 让 Vagrant 开始构建三个虚拟机。如果您在构建第 2 章中的示例时已经下载了该盒子，那么此过程不会花费太长时间——也许 3-5 分钟。

在此过程中，我们将努力告诉 Ansible 有关服务器的信息，以便我们可以立即开始管理它们。

## 多个服务器的清单文件

您可以通过多种方式告诉 Ansible 您管理的服务器，但最标准、最简单的方法是将它们添加到与 Ansible 项目一起存储的清单文件中。

在前面的示例中，我们使用 `-i hosts.ini` 在命令行上指定了清单文件的路径。但是，我们也可以通过存储在项目根目录中的 `ansible.cfg` 文件中指定清单文件的路径来避免每次运行 ansible 命令时都必须指定此路径：

```text
[defaults]
inventory = hosts.ini
```

现在，将以下内容添加到 `hosts.ini` 文件中，该文件也在项目的根目录中：

```text
# Lines beginning with a # are comments, and are only included for
# illustration. These comments are overkill for most inventory files.

# Application servers
[app]
192.168.56.4
192.168.56.5

# Database server
[db]
192.168.56.6

# Group 'multi' with all servers
[multi:children]
app
db

# Variables that will be applied to all servers
[multi:vars]
ansible_user=vagrant
ansible_ssh_private_key_file=~/.vagrant.d/insecure_private_key
```

让我们逐组逐步完成这个示例：

1. 第一个块将我们的两个应用程序服务器放入“app”组中。
2. 第二个块将数据库服务器放入“db”组。
3. 第三个块告诉 ansible 定义一个新组“multi”，其中包含子组，我们添加“app”和“db”组。
4. 第四个块将变量添加到 “multi“ 组，这些变量将应用于 “multi“ 及其所有子项中的所有服务器。

::: tip
稍后我们将深入探讨变量、组定义、组层次结构和其他清单文件主题。目前，我们只希望 Ansible 了解我们的服务器，以便我们可以快速开始管理它们。
:::

保存更新的清单文件，然后检查 Vagrant 是否已完成三个虚拟机的构建。 Vagrant 完成后，我们就可以开始使用 Ansible 管理服务器了。

## 您的第一个简短的命令

您需要做的第一件事就是检查您的服务器。让我们确保它们配置正确，具有正确的时间和日期（我们不希望应用程序中出现任何与时间同步相关的错误！），并且有足够的可用资源来运行应用程序。

::: tip
我们在这里手动检查的许多事情也应该由生产服务器上的自动化系统进行监控；预防灾难的最好方法是知道灾难何时到来，并在灾难发生之前解决问题。您应该使用 Munin、Nagios、Cacti、Hyperic 等工具来确保您清楚了解服务器过去和现在的资源使用情况！如果您正在运行通过 Internet 提供的网站或 Web 应用程序，您可能还应该使用外部监控解决方案，例如 Pingdom 或 Uptime Robot。
:::

### 发现 Ansible 的并行特性

首先，我想确保 Vagrant 使用正确的主机名配置虚拟机。使用带有 `-a` 参数“hostname”的 ansible 对所有服务器运行主机名：

```bash
ansible multi -a "hostname"
```

Ansible 将对所有三台服务器运行此命令，并返回结果（如果 Ansible 无法到达一台服务器，它将显示该服务器的错误，但继续在其他服务器上运行该命令）。

如果 Ansible 报告 `No hosts matched` 或返回一些其他与清单相关的错误，则您的 `ansible.cfg` 文件可能没有位于正确的目录中，或者它的语法可能不正确。您还可以尝试通过显式设置 `ANSIBLE_INVENTORY` 环境变量来覆盖清单文件路径： `export ANSIBLE_INVENTORY=hosts.ini` 。

如果您收到类似 `The authenticity of host '192.168.56.5' can't be established.` 的错误，这是因为 SSH 具有安全功能，要求您在第一次连接时确认服务器的“主机密钥”。您可以在命令行上键入 yes （在本例中多次）以消除警告并接受主机密钥，或者您也可以设置环境变量 `ANSIBLE_HOST_KEY_CHECKING=False` 。主机密钥接受的行为也可以在 SSH 配置文件中配置。

您可能已经注意到，该命令并未按照您期望的顺序在每台服务器上运行。继续运行该命令几次，然后查看顺序：

```bash
# First run results:                # Second run results:
192.168.56.5 | CHANGED | rc=0 >>    192.168.56.6 | CHANGED | rc=0 >>
orc-app2.test                       orc-db.test

192.168.56.6 | CHANGED | rc=0 >>    192.168.56.5 | CHANGED | rc=0 >>
orc-db.test                         orc-app2.test

192.168.56.4 | CHANGED | rc=0 >>    192.168.56.4 | CHANGED | rc=0 >>
orc-app1.test                       orc-app1.test
```

默认情况下，Ansible 将使用多个进程分支并行运行命令，因此命令将更快地完成。如果您管理几台服务器，这可能不会比在一台服务器上一台服务器上串行运行命令快多少，但即使管理 5-10 台服务器，如果您使用 Ansible 的并行性（默认情况下启用），您也会注意到显着的加速。

再次运行相同的命令，但这一次，添加参数 `-f 1` 来告诉 Ansible 仅使用一个 fork（基本上，是按顺序在每台服务器上执行该命令）：

```bash
❯ ansible multi -a "hostname" -f 1

192.168.56.4 | CHANGED | rc=0 >>
orc-app1.test

192.168.56.5 | CHANGED | rc=0 >>
orc-app2.test

192.168.56.6 | CHANGED | rc=0 >>
orc-db.test
```

一遍又一遍地运行相同的命令，它总是会以相同的顺序返回结果。您很少需要这样做，但更常见的是您想要增加该值（例如 `-f 10` 或 `-f 25` ...取决于如何您的系统和网络连接可以处理的大部分内容），以加快在数十或数百台服务器上运行命令的过程。

::: tip
大多数人将操作的目标（ `multi` ）放在命令/操作本身之前（“在 X 服务器上，运行 Y 命令”），但如果你的大脑以相反的顺序工作（“在 X 服务器上运行 Y 命令”） X 服务器”），您可以将目标放在其他参数之后（ `ansible -a "hostname" multi` ）——命令是等效的。
:::

### 了解您的环境

现在我们相信 Vagrant 能够正确设置主机名，让我们确保其他一切都按顺序进行。

首先，让我们确保服务器有可供我们的应用程序使用的磁盘空间：

```bash
❯ ansible multi -a "df -h"
192.168.56.5 | CHANGED | rc=0 >>
Filesystem           Size  Used Avail Use% Mounted on
devtmpfs             212M     0  212M   0% /dev
tmpfs                231M     0  231M   0% /dev/shm
tmpfs                231M  3.4M  228M   2% /run
tmpfs                231M     0  231M   0% /sys/fs/cgroup
/dev/mapper/rl-root   52G  3.2G   49G   7% /
/dev/sda1           1014M  255M  760M  26% /boot
/dev/mapper/rl-home   26G  213M   26G   1% /home
tmpfs                 47M     0   47M   0% /run/user/1000

192.168.56.6 | CHANGED | rc=0 >>
Filesystem           Size  Used Avail Use% Mounted on
devtmpfs             212M     0  212M   0% /dev
tmpfs                231M     0  231M   0% /dev/shm
tmpfs                231M  3.4M  228M   2% /run
tmpfs                231M     0  231M   0% /sys/fs/cgroup
/dev/mapper/rl-root   52G  3.1G   49G   6% /
/dev/sda1           1014M  255M  760M  26% /boot
/dev/mapper/rl-home   26G  213M   26G   1% /home
tmpfs                 47M     0   47M   0% /run/user/1000

192.168.56.4 | CHANGED | rc=0 >>
Filesystem           Size  Used Avail Use% Mounted on
devtmpfs             212M     0  212M   0% /dev
tmpfs                231M     0  231M   0% /dev/shm
tmpfs                231M  3.4M  228M   2% /run
tmpfs                231M     0  231M   0% /sys/fs/cgroup
/dev/mapper/rl-root   52G  3.1G   49G   6% /
/dev/sda1           1014M  255M  760M  26% /boot
/dev/mapper/rl-home   26G  213M   26G   1% /home
tmpfs                 47M     0   47M   0% /run/user/1000
```

看起来我们现在还有足够的空间；我们的应用程序非常轻量级。

其次，我们还要确保服务器上有足够的内存：

```bash
❯ ansible multi -a "free -m"
192.168.56.4 | CHANGED | rc=0 >>
              total        used        free      shared  buff/cache   available
Mem:            460         154          60           3         245         291
Swap:          2103           0        2103

192.168.56.5 | CHANGED | rc=0 >>
              total        used        free      shared  buff/cache   available
Mem:            460         154          40           2         265         291
Swap:          2103           1        2102

192.168.56.6 | CHANGED | rc=0 >>
              total        used        free      shared  buff/cache   available
Mem:            460         154          63           3         242         290
Swap:          2103           0        2103
```

内存非常紧张，但由于我们在本地主机上运行三个虚拟机，因此我们需要保守一点。

第三，让我们确保每个服务器上的日期和时间同步：

```bash
❯ ansible multi -a "date"
192.168.56.4 | CHANGED | rc=0 >>
Thu Nov 16 02:15:06 UTC 2023

192.168.56.6 | CHANGED | rc=0 >>
Thu Nov 16 02:15:06 UTC 2023

192.168.56.5 | CHANGED | rc=0 >>
Thu Nov 16 02:15:06 UTC 2023
```

大多数应用程序的编写对每个服务器的时间抖动都有轻微的容忍度，但确保不同服务器上的时间尽可能接近总是一个好主意，最简单的方法是使用网络时间协议，这很容易配置。接下来我们将使用 Ansible 的模块来使该过程变得轻松。

::: tip
要获取特定服务器（或一组服务器）的所有环境详细信息（Ansible 行话中的“事实”）的详尽列表，请使用命令 `ansible [host-or-group] -m setup` 。这将提供有关服务器的每一分钟详细信息的列表（包括文件系统、内存、操作系统、网络接口......只要你能想到的，它就在列表中）。
:::

### 使用 Ansible 模块进行更改

我们要在服务器上安装 chrony 守护进程以保持时间同步。我们将使用 ansible 的 `dnf` 模块来执行相同的操作（就像我们之前在 playbook 示例中所做的那样，但这次使用临时命令）。

```bash
❯ ansible multi -b -m dnf -a "name=chrony state=present"
```

您应该看到三个“CHANGED”消息以及安装命令的输出。如果再次运行该命令，您将看到三个“成功”消息，因为该软件包已安装。

::: tip
`-b` 选项（`--become` 的别名）告诉 Ansible 使用 become 运行命令（基本上，使用 'sudo' 运行命令）。 这对于我们的 Vagrant VM 来说可以正常工作，但是如果您正在对服务器运行命令，而您的用户帐户需要密码才能进行权限升级，那么您还应该传入“-K”（“--ask-become-pass”的别名） `)，这样您就可以在 Ansible 需要时输入密码。
:::

现在我们将确保 chrony 守护进程已启动并设置为在启动时运行。我们可以使用两个单独的命令 `systemctl start chronyd` 和 `systemctl enable chronyd` ，但我们将使用 Ansible 的 service 模块。

```bash
❯ ansible multi -b -m service -a "name=chronyd state=started enabled=yes"
```

所有三台服务器都应显示成功消息，例如：

```bash
"changed": true,
"enabled": true,
"name": "chronyd",
"state": "started"
```

如果您再次运行完全相同的命令，一切都会相同，但 Ansible 会报告没有任何变化，因此 `"changed"` 值变为 `false` 。

当您使用 Ansible 的模块而不是普通的 shell 命令时，您可以使用 Ansible 提供的抽象和幂等性的功能。即使您正在运行 shell 命令，您也可以将它们包装在 Ansible 的 `shell` 或 `command` 模块中（如 `ansible multi -m shell -a "date"` ），但是对于这些类型的命令，有临时运行它们时通常不需要使用 Ansible 模块。

我们应该做的最后一件事是检查以确保我们的服务器与时间服务器上的官方时间紧密同步：

```bash
❯ ansible multi -b -a "chronyc tracking"
```

在我的测试中，我在所有三台服务器上的速度都在百分之四秒之内——对于我的目的来说足够接近了。

## 配置服务器组或单个服务器

现在我们已经能够让所有服务器达到可靠的基线（例如，所有服务器至少都有正确的时间），我们需要设置应用程序服务器，然后是数据库服务器。

由于我们在清单文件中设置了两个单独的组 app 和 db ，因此我们可以将命令仅定位到这些组中的服务器。

### 配置应用程序服务器

我们假设的 Web 应用程序使用 Django，因此我们需要确保安装了 Django 及其依赖项。 Django 不在官方 Rocky Linux dnf 存储库中，但我们可以使用 Pip 安装它：

```bash
❯ ansible app -b -m dnf -a "name=python3-pip state=present"
# 设置国内源
❯ ansible app -b -m shell -a "pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple"
❯ ansible app -b -m pip -a "executable=pip3 name=django<4 state=present"
```

检查以确保 Django 已安装并正常工作：

```bash
❯ ansible app -a "python3 -m django --version"
192.168.56.5 | CHANGED | rc=0 >>
3.2.23

192.168.56.4 | CHANGED | rc=0 >>
3.2.23
```

看起来它们在我们的应用服务器上运行正常。我们现在可以继续我们的数据库服务器。

::: tip
我们在本章中完成的几乎所有配置在 Ansible playbook 中都会更好（这将在本书的其余部分进行更深入的探讨）。本章演示了使用 Ansible 管理多个服务器（无论出于何种目的）是多么容易。即使您使用 shell 命令手动设置和配置服务器，使用 Ansible 也将为您节省大量时间，并帮助您以最安全、最高效的方式完成所有工作。
:::

### 配置数据库服务器

我们使用 Ansible 主清单中定义的“app”组配置应用程序服务器，并且可以使用类似定义的“db”组配置数据库服务器（当前“db”组只有一台服务器）。

让我们安装 MariaDB 并启动它：

```bash
❯ ansible db -b -m dnf -a "name=mariadb-server state=present"
❯ ansible db -b -m service -a "name=mariadb state=started enabled=yes"
```

然后配置系统防火墙，确保只有应用服务器可以访问数据库：

```bash
❯ ansible db -b -m dnf -a "name=firewalld state=present"
❯ ansible db -b -m service -a "name=firewalld state=started \
enabled=yes"
❯ ansible db -b -m firewalld -a "zone=database state=present permanent=yes"
❯ ansible db -b -m firewalld -a "source=192.168.56.0/24 \
zone=database state=enabled permanent=yes"
❯ ansible db -b -m firewalld -a "port=3306/tcp zone=database \
state=enabled permanent=yes"
```

如果您此时尝试从应用程序服务器（或您的主机）连接到数据库，您将无法连接，因为仍然需要设置 MariaDB。通常，您可以通过登录服务器并运行 `mysql_secure_installation` 来完成此操作。不过幸运的是，Ansible 可以通过其各种 `mysql_*` 模块控制 MariaDB 服务器。目前，我们需要允许一名用户从我们的应用服务器访问 MySQL。 MySQL 模块要求托管服务器上存在 PyMySQL 模块。

::: tip
为什么选择 MariaDB 而不是 MySQL？ RHEL 8 和 Rocky Linux 8 将 MariaDB 作为默认支持的 MySQL 兼容数据库服务器。 MariaDB 周围的一些工具仍然使用旧的“MySQL\*”命名语法，但如果您习惯使用 MySQL，那么 MariaDB 的工作方式类似。
:::

```bash
❯ ansible db -b -m dnf -a "name=python3-PyMySQL state=present"
❯ ansible db -b -m mysql_user -a "name=django host=% password=12345 \
priv=*.*:ALL state=present"
```

此时，您应该能够在应用程序服务器上创建或部署 Django 应用程序（例如使用 `django-admin startproject mysite` ，但我们稍后将介绍多服务器部署），然后将其指向数据库服务器使用用户名 `django` 和密码 `12345` 。

::: tip
这里使用的 MySQL 配置仅用于示例/开发目的！为了保护生产 MySQL 服务器的安全，您还应该采取其他一些措施，例如进一步限制允许访问端口 3306 的 IP 地址，以及其他小的清理。其中一些内容将在本书后面介绍，但是，与往常一样，您有责任保护您的服务器——确保您做得正确！
:::

### 仅对一台服务器进行更改

恭喜！您现在拥有一个运行 Django 和 MySQL 的小型 Web 应用程序环境。数量不多，应用程序服务器前面甚至没有负载均衡器来分散请求；但我们很快就配置好了一切，而且无需登录服务器。更令人印象深刻的是，您可以再次运行任何 ansible 命令（除了几个简单的 shell 命令之外），并且它们不会改变任何内容 --- 它们会返回 `"changed": false` ，让您安心请注意原始配置完好无损。

现在您的本地基础设施已经运行了一段时间，您注意到（当然是假设的）日志表明两个应用程序服务器之一的时间与其他服务器的时间不同步，可能是因为 chrony 时间同步守护进程崩溃了或者以某种方式被阻止。快速输入以下命令来检查 chronyd 的状态：

```bash
❯ ansible app -b -a "systemctl status chronyd"
```

然后，您在受影响的应用程序服务器上重新启动服务：

```bash
❯ ansible app -b -a "service chronyd restart" --limit "192.168.56.4"
```

在此命令中，我们使用 `--limit` 参数将命令限制为指定组中的特定主机。 `--limit` 将匹配精确的字符串或正则表达式（以 `~` 为前缀）。如果您只想将命令应用于 `.4` 服务器（假设您知道没有其他 IP 地址以 `.4` 结尾的服务器），则可以更简单地说明上述命令，以下命令可以工作一模一样：

```bash
# Limit hosts with a simple pattern (asterisk is a wildcard).
❯ ansible app -b -a "service chronyd restart" --limit "*.4"

# Limit hosts with a regular expression (prefix with a tilde).
❯ ansible app -b -a "service chronyd restart" --limit ~".*\.4"
```

在这些示例中，我们一直使用 IP 地址而不是主机名，但在许多现实场景中，您可能会使用像 `nyc-dev-1.example.com` 这样的主机名；能够匹配正则表达式通常很有帮助。

::: tip
尝试保留 `--limit` 选项以在单个服务器上运行命令。如果您经常发现自己使用 `--limit` 在同一组服务器上运行命令，请考虑将它们添加到清单文件中的组中。这样您就可以输入 `ansible [my-new-group-name] [command]` ，并节省一些击键次数。
:::

## 管理用户和组

在我的日常使用中，Ansible 的临时命令最常见的用途之一是用户和组管理。我不知道有多少次我不得不重新阅读手册页或进行 Google 搜索，只是为了记住我需要哪些参数来创建带有或不带有主文件夹的用户，将用户添加到某些组等。

Ansible 的 `user` 和 `group` 模块使任何 Linux 风格的事情都变得非常简单和标准。

首先，在应用服务器上为服务器管理员添加一个 `admin` 组：

```bash
❯ ansible app -b -m group -a "name=admin state=present"
```

`group` 模块非常简单；您可以通过设置 `state=absent` 删除组，通过 `gid=[gid]` 设置组 ID，并通过 `system=yes` 指示该组是系统组。

现在将用户 `johndoe` 添加到我刚刚创建的组的应用程序服务器中，并在 `/home/johndoe` （大多数 Linux 发行版的默认位置）中为他提供一个主文件夹。简单的：

```bash
❯ ansible app -b -m user -a "name=johndoe group=admin createhome=yes"
```

如果您想自动为新用户创建 SSH 密钥（如果尚不存在），您可以使用附加参数 `generate_ssh_key=yes` 运行相同的命令。您还可以设置：

- 具有 `uid=[uid]` 的用户的 UID
- 带有 `shell=[shell]` 的用户 shell
- 带有 `password=[encrypted-password]` 的用户密码

如果你想删除账户怎么办？

```bash
❯ ansible app -b -m user -a "name=johndoe state=absent remove=yes"
```

使用 Ansible 的 `user` 模块，您几乎可以使用 `useradd` 、 `userdel` 和 `usermod` 做任何事情，只是您可以更轻松地做到这一点。 [用户模块的官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html)非常详细地解释了所有可能性。

## 管理包

我们已经在示例 Rocky Linux 基础架构上使用了 `dnf` 模块来确保安装某些软件包。 Ansible 具有适用于任何风格的 Linux 的各种包管理模块，但还有一个通用的 `package` 模块，可用于更轻松地跨平台使用 Ansible。

如果你想在任何 Debian、RHEL、Fedora、Ubuntu、CentOS、FreeBSD 等系统上安装像 `git` 这样的通用包，你可以使用以下命令：

```bash
❯ ansible app -b -m package -a "name=git state=present"
```

`package` 的工作方式与 `dnf` 、 `apt` 和其他包管理模块非常相似。在本书的后面，我们将探讨处理多平台包管理的方法，其中包名称因操作系统而异。

## 管理文件和目录

简短的命令的另一个常见用途是远程文件管理。 Ansible 可以轻松地将文件从主机复制到远程服务器、创建目录、管理文件和目录权限和所有权以及删除文件或目录。

### 获取有关文件的信息

如果您需要检查文件的权限、MD5 或所有者，请使用 Ansible 的 `stat` 模块：

```bash
❯ ansible multi -m stat -a "path=/etc/environment"
```

这提供了与运行 `stat` 命令时获得的信息相同的信息，但以 JSON 形式传回信息，可以更轻松地解析该信息（或者稍后在剧本中用于有条件地执行或不执行操作）某些任务）。

### 将文件复制到服务器

您可能使用 `scp` 或 `rsync` 将文件和目录复制到远程服务器，虽然 Ansible 具有更高级的文件复制模块，例如 `rsync` ，但大多数文件复制操作可以通过 Ansible 的 `copy` 模块完成：

```bash
❯ ansible multi -m copy -a "src=/etc/hosts dest=/tmp/hosts"
```

`src` 可以是文件或目录。如果包含尾部斜杠，则仅将目录的内容复制到 `dest` 中。如果省略尾部斜杠，内容和目录本身将被复制到 `dest` 中。

`copy` 模块非常适合单文件副本，并且非常适合小目录。当您想要复制数百个文件时，尤其是在嵌套非常深的目录结构中，您应该考虑使用 Ansible 的 `unarchive` 模块生成文件的存档然后复制，或者使用 Ansible 的 `synchronize` 或 `rsync` 模块。

### 从服务器取回文件

`fetch` 模块的工作方式几乎与 `copy` 模块完全相同，只是方向相反。主要区别在于，文件将被复制到本地 dest ，其目录结构与您从中复制它们的主机相匹配。例如，使用以下命令从服务器获取主机文件：

```bash
❯ ansible multi -b -m fetch -a "src=/etc/hosts dest=/tmp"
```

默认情况下，Fetch 会将每个服务器中的 `/etc/hosts` 文件放入目标中具有主机名称（在我们的示例中为三个 IP 地址）的文件夹中，然后放入 `src` 。因此，数据库服务器的主机文件将以 `/tmp/192.168.56.6/etc/hosts` 结束。

您可以添加参数 `flat=yes` ，并将 `dest` 设置为 `dest=/tmp/` （添加尾部斜杠），以使 Ansible 直接将文件获取到 `/tmp` 目录。但是，文件名必须是唯一的才能工作，因此从多个主机复制文件时它没有那么有用。仅当您从单个主机复制文件时才使用 `flat=yes` 。

### 创建目录和文件

您可以使用 `file` 模块创建文件和目录（如 `touch` ）、管理文件和目录的权限和所有权、修改 SELinux 属性以及创建符号链接。

创建目录的方法如下：

```bash
❯ ansible multi -m file -a "dest=/tmp/test mode=644 state=directory"
```

以下是创建符号链接的方法（设置 state=link ）：

语法

```bash
ansible multi -m file -a "src=/src/file dest=/dest/symlink \
state=link"
```

示例

```bash
❯ ansible multi -m file -a "dest=/tmp/test mode=644 state=directory"
❯ ansible multi -m file -a "src=/tmp/test dest=/tmp/symlink \
state=link"
```

`src` 是符号链接的目标文件， `dest` 是符号链接本身所在的路径。

### 删除目录和文件

您可以将 `state` 设置为 `absent` 来删除文件、目录或符号链接。

```bash
❯ ansible multi -m file -a "dest=/tmp/symlink state=absent"
```

使用 Ansible 远程管理文件有许多简单的方法。我们在这里简要介绍了 `copy` 和 `file` 模块，但请务必阅读其他文件管理模块的文档，例如 `lineinfile` 、 `ini_file` 和 `unarchive` 。本书将在后面的章节中深入介绍这些附加模块（在处理剧本时）。

## 在后台运行操作

有些操作需要相当长的时间（几分钟甚至几小时）。例如，当您运行 `dnf update` 或 `apt-get update && apt-get dist-upgrade` 时，可能需要几分钟时间才能更新服务器上的所有包。

在这些情况下，您可以告诉 Ansible 异步运行命令，并轮询服务器以查看命令何时完成。当您只管理一台服务器时，这并没有多大帮助，但是如果您有很多服务器，Ansible 会在所有服务器上非常快速地启动命令（特别是如果您设置了更高的 `--forks` 值），然后轮询服务器的状态，直到它们都是最新的。

要在后台运行命令，请设置以下选项：

- `-B <seconds> `：让作业运行的最长时间（以秒为单位）。
- `-P <seconds> `：轮询服务器以获取更新的作业状态之间等待的时间（以秒为单位）。

::: tip
从 Ansible 2.0 开始，命令行上的异步轮询（通过“-P”标志）不再实时显示输出。 请关注问题[v2 异步事件未触发](https://github.com/ansible/ansible/issues/14681)中此错误的解决进展。 目前，您仍然可以在后台运行作业并单独获取作业状态信息，但无法实时查看轮询状态。
:::

### 使用异步作业异步更新服务器

让我们在所有服务器上运行 `dnf -y update` 以使它们保持最新状态。如果设置 `-P 0` ，Ansible 会在服务器上触发命令，然后将后台作业信息打印到屏幕上并退出：

```bash
❯ ansible multi -b -B 3600 -P 0 -a "dnf -y update"
```

当后台任务运行时，您可以使用 Ansible 的 `async_status` 模块检查其他位置的状态，只要您将 `ansible_job_id` 值作为 `jid` 传入即可:

```bash
❯ ansible multi -b -m async_status -a "jid=j258341105883.13799"
```

::: tip
对于不远程跟踪的任务，通常最好在**某处**记录任务的进度，并在失败时发送某种警报，尤其是在运行执行备份操作的后台任务时 ，或运行关键业务数据库维护任务时。
:::

您还可以通过在 play 上定义 `async` 和 `poll` 参数，在后台异步运行 Ansible playbook 中的任务。我们将在后面的章节中讨论剧本任务背景。

## 检查日志文件

有时，在调试应用程序错误或诊断中断或其他问题时，您需要检查服务器日志文件。任何常见的日志文件操作（例如使用 `tail` 、 `cat` 、 `grep` 等）都通过 ansible 命令进行，其中有一些注意事项：

1. 连续监视文件的操作（例如 `tail -f` ）无法通过 Ansible 进行，因为 Ansible 仅在操作完成后显示输出，并且您将无法发送 Control-C 命令来停止遵循该文件。有一天，async 模块可能会具有此功能，但目前还不可能。
2. 运行通过 Ansible 通过 stdout 返回大量数据的命令并不是一个好主意。如果您要捕获大于几 KB 的文件，您可能应该单独登录到服务器。
3. 如果您通过 Ansible 运行的命令重定向并过滤输出，则需要使用 `shell` 模块而不是 Ansible 的默认 `command` 模块（将 `-m shell` 添加到您的命令中） ）。

作为一个简单的示例，让我们查看每台服务器上消息日志文件的最后几行：

```bash
❯ ansible multi -b -a "tail /var/log/messages"
```

如警告中所述，如果您想使用 `grep` 之类的内容过滤消息日志，则不能使用 Ansible 的默认 `command` 模块，而是使用 `shell` ：

```bash
❯ ansible multi -b -m shell -a "tail /var/log/messages | \
grep ansible-command | wc -l"
```

该命令显示每台服务器上运行了多少个 ansible 命令（您得到的数字可能不同）。

## 管理 cron 作业

通过 `cron` 运行的定期任务由系统的 crontab 管理。通常，要更改服务器上的 cron 作业设置，您需要登录服务器，在 cron 作业所在的帐户下使用 `crontab -e` ，然后输入包含间隔和作业的条目。

Ansible 通过其 `cron` 模块使管理 cron 作业变得容易。如果您想每天凌晨 4 点在所有服务器上运行 shell 脚本，请添加以下 cron 作业：

```bash
❯ ansible multi -b -m cron -a "name='daily-cron-all-servers' \
hour=4 job='/path/to/daily-script.sh'"
```

Ansible 将为您未指定的所有值假定 `*` （有效值为 `day` 、 `hour` 、 `minute` 、 `month` ）。您还可以使用 `special_time=[value]` 指定特殊时间值，例如 `reboot` 、 `yearly` 或 `monthly` 。您还可以通过 `user=[user]` 设置作业运行的用户，并通过传递 `backup=yes` 创建当前 crontab 的备份。

如果我们想删除 cron 作业怎么办？很简单，使用相同的 `cron` 命令，并传递要删除的 cron 作业的名称和 `state=absent` ：

```bash
❯ ansible multi -b -m cron -a "name='daily-cron-all-servers' \
state=absent"
```

您还可以使用 Ansible 来管理自定义 crontab 文件；使用与之前使用的语法相同的语法，但使用以下命令指定 cron 文件的位置： `cron_file=cron_file_name` （其中 `cron_file_name` 是位于 `/etc/cron.d` 中的 cron 文件）。

::: tip
Ansible 通过在条目上方的行上添加注释（如 `#Ansible: daily-cron-all-servers` ）来表示 Ansible 管理的 crontab 条目。最好将内容保留在 crontab 本身中，并始终使用 Ansible 的 `cron` 模块通过临时命令或 playbook 来管理条目。
:::

## 部署版本控制的应用程序

对于简单的应用程序部署，您可能需要更新 `git checkout`，或将一段新的代码复制到一组服务器，然后运行命令来完成部署，Ansible 的 ad-hoc 模式可以提供帮助。对于更复杂的部署，请使用 Ansible playbook 和滚动更新功能（将在后面的章节中讨论）以确保零停机时间的成功部署。

在下面的示例中，我假设我们在一台或两台服务器中的目录 `/opt/myapp` 上运行一个简单的应用程序。该目录是从中央服务器或 GitHub 等服务克隆的 git 存储库，应用程序部署和更新是通过更新克隆，然后在 `/opt/myapp/scripts/update.sh` 运行 shell 脚本来完成的。

首先，在所有应用程序服务器上将 git checkout 更新到应用程序的新版本分支 1.2.4：

```bash
❯ ansible app -b -m git -a "repo=git://example.com/path/to/repo.git \
dest=/opt/myapp update=yes version=1.2.4"
```

Ansible 的 git 模块允许您使用 `version` 参数指定分支、标签甚至特定提交（在本例中，我们选择签出标签 `1.2.4` ，但是如果您运行命令再次使用分支名称，例如 `prod` ，Ansible 会很乐意这样做）。为了强制 Ansible 更新签出的副本，我们传入了 `update=yes` 。 `repo` 和 `dest` 选项应该是不言自明的。

如果您收到一条消息“无法找到所需的可执行 git”，则需要在服务器上安装 Git。为此，请运行临时命令 `ansible app -b -m package -a "name=git state=present"` 。

如果您收到一条消息，指出 Git 服务器有“未知的主机密钥”，请在命令中添加选项 `accept_hostkey=yes` ，或在运行此命令之前将主机密钥添加到服务器的 `known_hosts` 文件中。

然后，运行应用程序的 `update.sh` shell 脚本：

```bash
❯ ansible app -b -a "/opt/myapp/scripts/update.sh"
```

Ad-hoc 命令适用于简单的部署（如上面的示例），但如果您有复杂的应用程序或基础设施需求，您应该使用本书后面描述的 Ansible 更强大、更灵活的应用程序部署功能。特别请参阅本书后面的“滚动更新”部分。

## Ansible 的 SSH 的历史

Ansible 最大的功能之一是无需在其管理的服务器上运行任何额外的应用程序或守护进程即可运行。 Ansible 没有使用专有协议与服务器进行通信，而是使用标准且安全的 SSH 连接，该连接通常用于当今几乎所有运行的 Linux 服务器上的基本管理。

由于稳定、快速且安全的 SSH 连接是 Ansible 通信能力的核心，因此 Ansible 的 SSH 实现在过去几年中不断改进，并且至今仍在改进。

所有 Ansible 的 SSH 连接方法都通用的一件事是，Ansible 使用连接将一个或几个定义播放或命令的文件传输到远程服务器，然后运行播放/命令，然后删除传输的文件，并报告结果。快速、稳定且安全的 SSH 连接对于 Ansible 至关重要。

### Paramiko

一开始，Ansible 专门使用 paramiko（Python 的开源 SSH2 实现）。然而，作为单一语言（Python）的单一库，paramiko 的发展并没有跟上 OpenSSH（几乎无处不在的 SSH 标准实现）的发展，并且其性能和安全性比 OpenSSH 稍差。

Ansible 继续支持 paramiko 的使用，甚至选择它作为不支持 ControlPersist 的系统（如 RHEL 6）的默认选项——该选项仅出现在 OpenSSH 5.6 或更高版本中。 （ControlPersist 允许 SSH 连接持续存在，因此通过 SSH 运行的频繁命令不必一遍又一遍地进行初始握手，直到达到服务器 SSH 配置中设置的 ControlPersist 超时。）

### OpenSSH (default)

在 Ansible 1.3 中，Ansible 默认使用本机 OpenSSH 连接来连接到支持 ControlPersist 的服务器。 Ansible 从 0.5 版本开始就具有此功能，但直到 1.3 版本才默认具有此功能。

大多数本地 SSH 配置参数（如主机、密钥文件等）均受到尊重，但如果您需要通过端口 22（默认 SSH 端口）以外的端口进行连接，则应在清单文件中指定该端口 ( `ansible_ssh_port` 选项）或运行 `ansible` 命令时。

OpenSSH 比 paramiko 更快，也更可靠，但是有一些方法可以让 Ansible 更快。

## 通过管道传输更快的 OpenSSH

Ansible 的现代版本允许您提高 Ansible 默认 OpenSSH 实现的性能。

OpenSSH 传输的“管道”方法将直接通过 SSH 连接发送和执行大多数 Ansible 模块的命令，而不是复制文件、在远程服务器上运行它们，然后删除它们。

可以通过在 Ansible 配置文件的 `[ssh_connection]` 部分（ `ansible.cfg` ，稍后将更详细地介绍）下添加 `pipelining=True` 来启用这种连接方法。

::: tip
除非您删除或注释了 `/etc/sudoers` 中的 `Defaults requiretty` 选项，否则 `pipelining=True` 配置选项不会有太大帮助。大多数操作系统的默认配置中都对此进行了注释，但您可能需要仔细检查此设置以确保获得尽可能最快的连接！

如果您在运行“ansible”和“ansible-playbook”的主机上运行最新版本的 macOS、Ubuntu、带有 Cygwin 的 Windows 或大多数其他操作系统，则应该运行 OpenSSH 版本 5.6 或更高版本，该版本可以正常工作 与 Ansible 的所有 SSH 连接设置一起使用的“ControlPersist”设置完美配合。

如果运行 Ansible 的主机具有 RHEL 或衍生版本，您可能需要更新 OpenSSH 版本，以便它支持更快/持久的连接方法。 任何 OpenSSH 5.6 或更高版本都应该可以工作。 要安装更高版本，请从源代码编译，或使用不同的存储库（例如 [CentALT](http://mirror.neu.edu.cn/CentALT/readme.txt)) 和 `dnf update openssh`。
:::

## 总结

在本章中，您学习了如何使用 Vagrant 构建用于在本地工作站上进行测试的多服务器基础架构，并且无需登录到单个服务器即可配置、监控和管理该基础架构。您还了解了 Ansible 如何连接到远程服务器，以及如何使用 `ansible` 命令在许多服务器上快速并行或逐一执行任务。

到目前为止，您应该熟悉 Ansible 的基础知识，并且应该能够开始更有效地管理自己的基础设施。
