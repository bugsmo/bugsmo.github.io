---
order: 2
tags:
  - ansible教程
title: 第 2 章 - 本地基础设施开发：Ansible 和 Vagrant
date: 2023-11-15 16:27:51
categories:
  - ansible
columns:
  -
---

# 第 2 章 - 本地基础设施开发：Ansible 和 Vagrant

## 使用本地虚拟机进行原型设计和测试

Ansible 可以很好地与您可以连接的任何服务器（远程或本地）配合使用。为了加快 Ansible playbook 的测试和开发以及一般测试，在本地工作是一个非常好的主意。基础设施的本地开发和测试比在远程/实时机器上进行更安全、更快速——尤其是在生产环境中！

在过去的十年中，测试驱动开发（TDD）以一种或另一种形式已经成为许多软件行业的规范。基础设施开发直到最近才得到组织化，最佳实践表明基础设施（对于在其上运行的软件变得越来越重要）也应该进行彻底的测试。

对软件的更改可以手动或以某种自动化方式进行测试；现在有一些系统与 Ansible 以及其他部署和配置管理工具集成，也允许进行一定量的基础设施测试。即使它只是在将配置更改应用到生产之前在本地测试配置更改，这种方法也比软件开发世界中所谓的“牛仔编码”（直接在生产环境中工作，而不是记录文档）好一千倍或者将更改封装在代码中，并且无法回滚到以前的版本。

过去十年见证了许多虚拟化工具的发展，这些工具允许灵活且非常强大的基础设施模拟，所有这些都可以从您的本地工作站进行！它使我们能够一次又一次地使用配置文件，或者将服务器更新的顺序调整到完美，而不必担心破坏重要的服务器。如果您使用本地虚拟机，则无需停机即可重建服务器；只需在新虚拟机上重新运行配置，几分钟之内即可恢复并运行 — 无人知晓。

服务器配置工具 [Vagrant](https://www.vagrantup.com) 和本地虚拟化环境 [VirtualBox](https://www.virtualbox.org/) 是测试基础架构和 本地单独的服务器配置。 这两个应用程序都是免费且开源的，并且可以在 Mac、Linux 或 Windows 主机上正常运行。

我们将设置 Vagrant 和 VirtualBox，以便使用 Ansible 进行轻松测试以配置新服务器。

## 您的第一个本地服务器：设置 Vagrant

要开始使用第一个本地虚拟服务器，您需要下载并安装 Vagrant 和 VirtualBox，并设置一个简单的 Vagrantfile，该文件将描述虚拟服务器。

1. 下载并安装 Vagrant 和 VirtualBox（适合您操作系统的版本）：

- [Download Vagrant](https://www.vagrantup.com/downloads.html)
- [Download VirtualBox](https://www.virtualbox.org/wiki/Downloads)（安装时，请确保安装了命令行工具，以便 Vagrant 可以使用它）

2. 在硬盘上的某个位置创建一个新文件夹，用于保存 Vagrantfile 和配置说明。

3. 打开终端或 PowerShell 窗口，然后导航到刚刚创建的文件夹。

4. 使用 [`vagrant box add`](https://www.vagrantup.com/docs/boxes.html) 命令添加 Rocky Linux 8.x 64-bit `box`：
   `vagrant box add geerlingguy/rockylinux8`
   （注：HashiCorp 的 [Vagrant Cloud](https://app.vagrantup.com/boxes/search) 拥有不同预制 Linux boxes 的完整列表。另外，请查看 Vagrant 的 [Boxes] 中的“官方”Vagrant Ubuntu boxes 文档](https://www.vagrantup.com/docs/boxes.html)。

5. 创建默认虚拟服务器配置：
   `vagrant init geerlingguy/rockylinux8`

6. 启动 Rocky Linux 服务器：
   `vagrant up`

Vagrant 下载了预构建的 64 位 Rocky Linux 8 虚拟机映像（您可以[构建自己的](https://www.vagrantup.com/docs/providers/virtualbox/boxes.html）虚拟机“boxes”， 如果您愿意），使用默认 Vagrantfile 中定义的配置将映像加载到 VirtualBox（现在位于您之前创建的文件夹中），然后启动虚拟机。

管理这个虚拟服务器非常简单：`vagrant halt` 将关闭虚拟机，`vagrant up`将其恢复，`vagrant destroy`将从 VirtualBox 中完全删除机器。 再次简单的`vagrant up`将从您最初下载的基础框中重新创建它。

现在您已经有了一个正在运行的服务器，您可以像使用任何其他服务器一样使用它，并且可以通过 SSH 连接。 要连接，请从 Vagrantfile 所在的文件夹中输入`vagrant ssh`。 如果您想手动连接或从其他应用程序连接，请输入`vagrant ssh-config`以获取所需的 SSH 详细信息。

## 将 Ansible 与 Vagrant 结合使用

Vagrant 调出预配置框的能力本身就很方便，但您可以使用 VirtualBox（或 VMWare 或 Parallels）GUI 以相同的效率完成类似的操作。 Vagrant 还有其他一些技巧：

- [**Network interface management**](https://www.vagrantup.com/docs/networking): 您可以将端口转发到虚拟机、共享公共网络连接或使用专用网络进行虚拟机间和仅主机通信。
- [**Shared folder management**](https://www.vagrantup.com/docs/synced-folders): Vagrant 使用 NFS 或 VirtualBox 中的（慢得多）本机文件夹共享在主机和虚拟机之间设置共享。
- [**Multi-machine management**](https://www.vagrantup.com/docs/multi-machine): Vagrant 能够在一个 Vagrantfile 中配置和控制多个虚拟机。这很重要，因为正如文档中所述，“从历史上看，运行复杂的环境是通过将它们扁平化到一台机器上来完成的。问题在于它是一个不准确的生产设置模型，其行为有很大不同。”
- [**Provisioning**](https://www.vagrantup.com/docs/provisioning): 第一次运行 `vagrant up` 时，Vagrant 会使用您在 Vagrantfile 中配置的任何配置程序自动配置新创建的 VM。您还可以在创建 VM 后运行 `vagrant provision` 以再次显式运行配置程序。

这最后一个功能对我们来说是最重要的。 Ansible 是与 Vagrant 集成的众多配置程序之一（其他包括基本 shell 脚本、Chef、Docker、Puppet 和 Salt）。当您调用 `vagrant provision` （或第一次调用 vagrant up ）时，Vagrant 将 VM 传递给 Ansible，并告诉 Ansible 运行已定义的 Ansible playbook。稍后我们将详细介绍 Ansible 剧本，但现在，我们将编辑 Vagrantfile 以使用 Ansible 来配置我们的虚拟机。

打开我们之前使用 `vagrant init` 命令时创建的 Vagrantfile。在最后的`end`之前添加以下几行（如果您想知道，Vagrantfiles 使用 Ruby 语法）：

```ruby
# Provisioning configuration for Ansible.
config.vm.provision "ansible" do |ansible|
  ansible.playbook = "playbook.yml"
end
```

这是一个非常基本的配置，可帮助您开始将 Ansible 与 Vagrant 结合使用。还有[许多其他 Ansible 选项](https://developer.hashicorp.com/vagrant/docs/provisioning/ansible_intro)

一旦我们深入使用 Ansible，您就可以使用。现在，我们只想设置一个非常基本的剧本——您创建的一个简单文件，用于告诉 Ansible 如何配置您的虚拟机。

## 您的第一个 Ansible 剧本

现在让我们创建 Ansible `playbook.yml` 文件。在与 Vagrantfile 相同的文件夹中创建一个空文本文件，并放入以下内容：

```yaml
---
- hosts: all
  become: yes

  tasks:
    - name: Ensure chrony (for time synchronization) is installed.
      dnf:
        name: chrony
        state: present

    - name: Ensure chrony is running.
      service:
        name: chronyd
        state: started
        enabled: yes
```

稍后我将介绍这本剧本的作用。现在，让我们在虚拟机上运行该剧本。确保您与 Vagrantfile 和新的 playbook.yml 文件位于同一目录中，然后输入 `vagrant provision` 。您应该看到您定义的每个“任务”的状态消息，然后回顾一下 Ansible 在您的虚拟机上执行的操作，如下所示：

::: details

```bash
==> default: Running provisioner: ansible...
Vagrant gathered an unknown Ansible version:

and falls back on the compatibility mode '1.8'.

Alternatively, the compatibility mode can be specified in your Vagrantfile:
https://www.vagrantup.com/docs/provisioning/ansible_common.html#compatibility_mode

    default: Running ansible-playbook...

PLAY [all] **********************************\***********************************

TASK [Gathering Facts] ****************************\*****************************
ok: [default]

TASK [Ensure chrony (for time synchronization) is installed.] ********\*\*********
ok: [default]

TASK [Ensure chrony is running.] **********************\*\*\***********************
ok: [default]

PLAY RECAP **********************************\***********************************
default : ok=3 changed=0 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
```

:::

Ansible 只是采用您定义的简单剧本，解析 YAML 语法，并通过 SSH 运行一堆命令来按照您指定的方式配置服务器。让我们逐步浏览一下剧本：

```yaml
---
```

第一行是一个标记，显示文档的其余部分将采用 YAML 格式（阅读 YAML 简介）).

```yaml
- hosts: all
```

此行告诉 Ansible 该剧本适用于哪些主机。 `all` 在这里起作用，因为 Vagrant 无形地使用自己的 Ansible 清单文件（而不是使用手动创建的 hosts.ini 文件），该文件仅定义 Vagrant VM。

```yaml
become: yes
```

由于我们需要特权访问来安装 chrony 和修改系统配置，因此这一行告诉 Ansible 使用 `sudo` 来执行 playbook 中的所有任务（您告诉 Ansible 使用 `sudo` 来扮演 root 用户）。

```yaml
tasks:
```

此行之后的所有任务将在所有主机上运行（或者，在我们的例子中，是我们的一个虚拟机）。

```yaml
- name: Ensure chrony (for time synchronization) is installed.
  dnf:
    name: chrony
    state: present
```

该命令相当于运行 `dnf install chrony` ，但更加智能；它将检查 chrony 是否已安装，如果没有，则安装它。这相当于以下 shell 脚本：

```bash
if ! rpm -qa | grep -qw chrony; then
    dnf install -y chrony
fi
```

然而，上面的脚本仍然不如 Ansible 的 `dnf` 命令那么健壮。如果安装了名称中包含 `chrony` 的其他软件包，但没有安装 `chrony` ，该怎么办？该脚本需要额外的调整和复杂性来匹配简单的 Ansible dnf 命令，特别是在我们更深入地探索 dnf 模块（或 Debian 风格的 Linux 的 `apt` 模块，或 `package` 用于与操作系统无关的软件包安装）。

```yaml
- name: Ensure chrony is running.
  service:
    name: chronyd
    state: started
    enabled: yes
```

最后一项任务检查并确保 `chronyd` 服务已启动并运行，并将其设置为在系统引导时启动。具有相同效果的 shell 脚本如下：

```bash
# Start chronyd if it's not already running.
if ps aux | grep -q "[c]hronyd"
then
    echo "chronyd is running." > /dev/null
else
    systemctl start chronyd.service > /dev/null
    echo "Started chronyd."
fi
# Make sure chronyd is enabled on system startup.
systemctl enable chronyd.service
```

您可以看到在 shell 脚本领域事情是如何开始变得复杂的！而且这个 shell 脚本仍然不如 Ansible 那样强大。为了保持幂等性并处理错误情况，您必须使用基本 shell 脚本完成比使用 Ansible 更多的工作。

我们可以更简洁（并展示 Ansible 强大的简单性），忽略 Ansible 的自记录 `name` 参数和简写 `key=value` 语法，从而产生以下剧本：

```yaml
---
- hosts: all
  become: yes
  tasks:
    - dnf: name=chrony state=present
    - service: name=chronyd state=started enabled=yes
```

就像代码和配置文件一样，Ansible 中的文档（例如，使用 `name` 参数和/或向 YAML 添加注释来执行复杂的任务）并不是绝对必要的。然而，我坚信完整（但简洁）的文档，因此我总是通过为每个任务提供 `name` 来记录我的任务将做什么。当您运行剧本时，这也很有帮助，因此您可以以人类可读的格式查看正在发生的情况。

## 清理

完成 Rocky Linux Vagrant VM 的实验后，您可以通过运行 `vagrant destroy` 将其从系统中删除。如果您想再次重建虚拟机，请运行 `vagrant up` 。如果您像我一样，您很快就会使用 Vagrant 和 Ansible 每周构建和重建数百个虚拟机和容器！

## 总结

您的工作站正在成为“一体化基础设施”，现在您可以确保您的基础设施与在其上运行的代码一样经过良好的测试。通过一个小示例，您可以了解简单但功能强大的 Ansible 剧本。稍后我们将更深入地研究 Ansible 剧本，同时我们还将进一步探索 Vagrant。
