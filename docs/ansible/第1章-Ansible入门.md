---
order: 1
tags:
  - ansible教程
title: 第 1 章 - Ansible 入门
date: 2023-11-15 14:42:19
categories:
  - ansible
columns:
  -
---

# 第 1 章 - Ansible 入门

## Ansible 和基础设施管理

### 关于复杂的 shell 脚本

许多开发人员和系统管理员通过 SSH 登录服务器、进行更改和注销来管理服务器。其中一些更改将被记录下来，有些则不会。如果管理员需要对许多服务器进行相同的更改（例如，更改配置文件中的一个值），则管理员将手动登录每台服务器并重复进行此更改。

如果服务器的生命周期中只有一两次更改，并且服务器非常简单（仅运行一个进程，具有一种配置和一个非常简单的防火墙），并且如果每一项更改都被彻底记录下来，则此过程不会有问题的。

但对于几乎所有现有公司来说，服务器都更加复杂——大多数运行数十个、有时数百个不同的应用程序或应用程序容器。大多数服务器都有复杂的防火墙和数十个经过调整的配置文件。即使有了变更文档，手动过程通常也会导致某些服务器或某些步骤被遗忘。

如果这些公司的管理员想要设置一台与当前正在运行的服务器完全相同的新服务器，他们将需要花费大量时间检查所有已安装的软件包，记录配置、版本和设置；他们会花费大量不必要的时间手动重新安装、更新和调整所有内容，以使新服务器的运行方式接近旧服务器的运行方式。

一些管理员可能会使用 shell 脚本来尝试达到某种程度的理智，但我还没有看到一个复杂的 shell 脚本可以在同步多个服务器的配置和部署新代码的同时正确处理所有边缘情况。

### 配置管理

幸运的是，有一些工具可以帮助您避免使用这些复杂的服务器——这些服务器是唯一配置的，并且不可能从头开始重新创建，因为它们是在没有文档的情况下手动配置的。像 [CFEngine](https://cfengine.com/)、 [Puppet](http://puppetlabs.com/) 和 [Chef](http://www.getchef.com/chef/) 这样的工具在 2000 年代中后期变得非常流行。

但许多开发人员和系统管理员坚持使用 shell 脚本和命令行配置是有原因的：它简单易用，而且他们拥有多年使用 bash 和命令行工具的经验。为什么要抛弃所有这些并学习新的配置语言和方法？

开始使用 Ansible。 Ansible 是由了解命令行的开发人员和系统管理员构建（并不断改进）的，他们希望制作一个工具来帮助他们管理服务器，就像过去一样，但以可重复和集中的方式管理服务器。管理方式。 Ansible 还有其他技巧，使其成为参与 DevOps 的人们（不仅仅是运营方面）真正的瑞士军刀。

Ansible 的最大优势之一是它能够逐字运行常规 shell 命令，因此您可以采用现有脚本和命令，并在时间允许的情况下将它们转换为幂等剧本。对于那些熟悉命令行但从未精通 Puppet 或 Chef 等更复杂的工具（两者都需要至少对 Ruby 和/或自定义语言有一点了解才可以开始）的人（比如我）来说，Ansible 就像呼吸新鲜空气。

Ansible 的工作原理是将更改推送到所有服务器（默认情况下），并且不需要在服务器上安装额外的软件（因此不需要额外的内存占用，也不需要管理额外的守护进程），这与大多数其他配置管理工具不同。

::: tip

**幂等性**是运行一个操作的能力，该操作无论运行一次还是多次都会产生相同的结果（[来源](http://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning)）。

配置管理工具的一个重要功能是，无论您运行一次还是一千次，它都能够确保维护相同的配置。 许多 shell 脚本如果运行多次会产生意想不到的后果，但 Ansible 会一遍又一遍地将相同的配置部署到服务器，并且在第一次部署后不会进行任何更改。

事实上，Ansible 模块和命令的几乎每个方面都是幂等的，对于那些不是幂等的，Ansible 允许您定义何时应运行给定命令，以及什么构成更改或失败的命令，因此您可以轻松维护 所有服务器上的幂等配置。
:::

## 安装 Ansible

Ansible 唯一真正的依赖项是 Python。安装 Python 后，运行 Ansible 的最简单方法是使用 `pip` ，这是一个简单的 Python 包管理器。

如果您使用的是 Mac，安装 Ansible 就是小菜一碟：

1. 检查是否安装了 `pip` ( `which pip` )。如果没有，请安装它： `sudo easy_install pip`
2. 安装 Ansible： `pip install ansible`

您还可以通过 [Homebrew](https://brew.sh/) 安装 Ansible with `brew install ansible` 。 无论哪种方式（ pip 或 brew ）都可以，但请确保使用安装 Ansible 的同一方式来更新 Ansible！

如果您运行的是 Linux，那么您很可能已经安装了 Ansible 的依赖项，但我们将介绍最常见的安装方法。

如果您安装了 `python-pip` 和 `python-devel` （在 Debian/Ubuntu 上为 `python-dev` ），请使用 pip 安装 Ansible（假设您还安装了安装了“开发工具”包，因此您可以使用 `gcc`、 `make` 等）：

```bash
pip install ansible
```

使用 pip 允许您使用 `pip install --upgrade ansible` 升级 Ansible。

### Fedora/Red Hat Enterprise Linux

在基于 RPM 的操作系统上安装 Ansible 的最简单方法是使用官方 dnf 包。如果您运行的是 Red Hat Enterprise Linux (RHEL) 或 CentOS/Rocky/Alma Linux，则需要在安装 Ansible 之前安装 EPEL 的 RPM（有关说明，请参阅下面的信息部分）：

```bash
dnf -y install ansible
```

在基于 RPM 的系统上，可以通过 [EPEL 存储库](https://fedoraproject.org/wiki/EPEL) 使用`python-pip`和`ansible`。 如果运行命令`dnf repolist | grep epel`（查看 EPEL 存储库是否已经可用）并且没有结果，您需要使用以下命令安装它：

```bash
# 如果您使用的是 RHEL/CentOS 6：
rpm -ivh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm

# 如果您使用的是 RHEL/CentOS 7：
yum 安装 epel-release

# 如果您使用的是 RHEL 8+/Fedora：
dnf 安装 epel-release
```

### Debian/Ubuntu

在 Debian 或 Ubuntu 系统上安装 Ansible 最简单的方法是使用官方 apt 软件包。

```bash
sudo apt-add-repository -y ppa:ansible/ansible
sudo apt-get update
sudo apt-get install -y ansible
```

::: tip
如果您收到类似`sudo：add-apt-repository：找不到命令`的错误，则您可能缺少`software-properties-common`包。 使用以下命令安装它：

```bash
sudo apt-get install software-properties-common
```

:::

安装 Ansible 后，通过在命令行中输入 `ansible --version` 确保其正常工作。您应该看到当前安装的版本信息：

```bash
ansible --version
ansible [core 2.15.6]
  config file = None
  configured module search path = ['/Users/mac/.ansible/plugins/modules', '/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/local/lib/python3.10/site-packages/ansible
  ansible collection location = /Users/mac/.ansible/collections:/usr/share/ansible/collections
  executable location = /usr/local/bin/ansible
  python version = 3.10.10 (main, Feb 16 2023, 03:01:39) [Clang 13.0.0 (clang-1300.0.29.30)] (/usr/local/opt/python@3.10/bin/python3.10)
  jinja version = 3.1.2
  libyaml = True
```

::: tip
**Python 3 怎么样？** 如果您同时安装了 Python 2 和 Python 3，并且 `pip` 是旧版 Python 2 版本的 `pip` 的别名，您应该考虑安装 Python 3 和 `pip3`，并使用 那个版本代替。 Ansible 与 Python 3 完全兼容，除非您在非常旧的系统上运行且没有可用的 Python 3，否则您应该使用 Python 3。
:::

## 创建基本清单文件

Ansible 使用清单文件（基本上是服务器列表）与您的服务器进行通信。就像将 IP 地址与域名相匹配的主机文件（位于 /etc/hosts ）一样，Ansible 清单文件将服务器（IP 地址或域名）与组相匹配。清单文件可以做更多的事情，但现在，我们只用一台服务器创建一个简单的文件。在 test project 文件夹中创建一个名为 hosts.ini 的文件：

```bash
mkdir test-project
cd test-project
touch hosts.ini
```

::: tip
清单文件名不必遵循任何特定的命名约定。我经常使用文件名 hosts.ini 作为 Ansible 的默认`ini-style`语法，但有时我也将文件称为 `inventory` （没有文件扩展名）。
:::

使用 `nano`、`vim` 或任何您想要的编辑器编辑此主机文件。将以下内容放入文件中：

```text
[example]
www.example.com
```

其中 `example` 是您正在管理的服务器组， `www.example.com` 是该组中服务器的域名（或 IP 地址）。如果您在此服务器上没有使用端口 22 进行 SSH，则需要将其添加到地址，例如 `www.example.com:2222` ，因为 Ansible 默认使用端口 22 并且不会从您的 ssh 配置中获取此值文件。

::: tip
第一个示例假设您设置了一台可以测试的服务器； 如果您还没有可以连接的备用服务器，您可能需要使用 DigitalOcean、Amazon Web Services、Linode 或其他按小时计费的服务创建小型虚拟机。 这样，您在学习 Ansible 时就可以使用完整的服务器环境——并且当您完成测试时，删除服务器，您只需支付几美分！

将上例中的`www.example.com`替换为您的服务器的名称或 IP 地址。

您还可以将清单放置在 Ansible 的全局清单文件`/etc/ansible/hosts`中，如果没有指定其他清单，任何 playbook 都将默认为该文件。 但是，该文件需要`sudo`权限，并且通常最好与 Ansible 项目一起维护清单。
:::

## 运行您的第一个简短的 Ansible 命令

现在您已经安装了 Ansible 并创建了清单文件，是时候运行命令来查看一切是否正常了！在终端中输入以下内容（我们将做一些安全的事情，这样就不会在服务器上进行任何更改）：

```bash
ansible -i hosts.ini example -m ping -u [username]
```

其中 `[username]` 是您用来登录服务器的用户。如果一切正常，您应该会看到一条显示 `www.example.com | SUCCESS >>` 的消息，然后是 ping 的结果。如果不起作用，请再次运行该命令并在末尾添加 `-vvvv` 以查看详细输出。很可能您没有正确配置 SSH 密钥 — 如果您使用 `ssh username@www.example.com` 登录并且该命令有效，则上述 Ansible 命令也应该有效。

::: tip
Ansible 假设您使用无密码（基于密钥）登录 SSH（例如，您通过输入 `ssh username@example.com` 登录，并且不必输入密码）。 如果您仍在使用用户名和密码登录远程服务器，或者需要了解 Linux 远程身份验证和安全最佳实践的入门知识，请阅读 [第 11 章 - 服务器安全和 Ansible](./第11章-服务器安全和Ansible)。 如果您坚持使用密码，请将 `--ask-pass` (`-k`) 标志添加到 Ansible 命令中（您可能还需要安装 `sshpass` 软件包才能正常工作）。 整本书都是在假设无密码身份验证的情况下编写的，因此每次运行命令或剧本时都需要牢记这一点。

需要了解基于 SSH 密钥的身份验证的入门知识吗？ 请阅读 Ubuntu 关于 [SSH/OpenSSH/Keys](https://help.ubuntu.com/community/SSH/OpenSSH/Keys) 的社区文档。
:::

让我们运行一个更有用的命令：

```bash
ansible -i hosts.ini example -a "free -h" -u [username]
```

在此示例中，我们可以快速查看`example`组中所有服务器（目前只有一台）的内存使用情况（以人类可读的格式）。 此类命令有助于快速查找值超出正常范围的服务器。 我经常使用`free -h`（查看内存统计信息）、`df -h`（查看磁盘使用统计信息）等命令来确保我的服务器没有运行异常。 虽然最好在 [Nagios](http://www.nagios.org/)、[Munin](http://munin-monitoring.org/) 或 [Cacti](http ://www.cacti.net/），使用一个简单的命令和一个终端窗口来检查所有服务器上的这些统计数据也很不错！

## 总结

就是这样！您刚刚了解了配置管理和 Ansible，安装了它，告诉了它有关您的服务器的信息，并通过 Ansible 在该服务器上运行了几个命令。如果您还没有印象深刻，那也没关系——您只看到了冰山一角。
