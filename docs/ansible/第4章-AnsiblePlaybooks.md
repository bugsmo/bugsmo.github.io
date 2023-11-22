---
order: 4
tags:
  - ansible教程
title: 第 4 章 - Ansible Playbooks
date: 2023-11-15 17:46:47
categories:
  - ansible
columns:
  -
---

# 第 4 章 - Ansible Playbooks

## Plays

与许多其他配置管理解决方案一样，Ansible 使用比喻来描述其配置文件。它们被称为“playbooks”，它们列出了将针对特定服务器或一组服务器运行的任务集（用 Ansible 术语来说是“plays”）。在美式橄榄球中，一支球队遵循一套预先写好的战术手册，作为他们执行一系列比赛以试图赢得比赛的基础。在 Ansible 中，您可以编写 playbook（一系列指令，描述将服务器置于特定配置状态的步骤），然后在您的服务器上播放。

Playbook 使用 [YAML](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html) 编写，这是一种简单的人类可读语法，流行用于定义配置。 Playbook 可以包含在其他 Playbook 中，并且某些元数据和选项会导致不同的 Play 或 Playbook 在不同服务器上的不同场景中运行。

仅 Ad-hoc 命令就使 Ansible 成为一个强大的工具； playbooks 将 Ansible 变成了一流的服务器配置和配置管理工具。

Ansible 吸引大多数 DevOps 人员的原因是，可以轻松地将 shell 脚本（或一次性 shell 命令）直接转换为 Ansible 脚本。考虑以下脚本，该脚本在 RHEL/CentOS 服务器上安装 Apache：

::: tabs

@tab **Shell Script**

```bash
# Install Apache.
dnf install --quiet -y httpd httpd-devel
# Copy configuration files.
cp httpd.conf /etc/httpd/conf/httpd.conf
cp httpd-vhosts.conf /etc/httpd/conf/httpd-vhosts.conf
# Start Apache and configure it to run at boot.
service httpd start
chkconfig httpd on
```

要运行 shell 脚本（在本例中是一个名为 shell-script.sh 且内容如上的文件），您可以直接从命令行调用它：

```bash
# (From the same directory in which the shell script resides).
❯ ./shell-script.sh
```

@tab **Ansible Playbook**

```yaml
---
- hosts: all

  tasks:
    - name: Install Apache.
      command: dnf install --quiet -y httpd httpd-devel
    - name: Copy configuration files.
      command: >
        cp httpd.conf /etc/httpd/conf/httpd.conf
    - command: >
        cp httpd-vhosts.conf /etc/httpd/conf/httpd-vhosts.conf
    - name: Start Apache and configure it to run at boot.
      command: service httpd start
    - command: chkconfig httpd on
```

要运行 Ansible Playbook（在本例中为名为 `playbook.yml` 且内容如上的文件），您可以使用 `ansible-playbook` 命令调用它：

```bash
# (From the same directory in which the playbook resides).
❯ ansible-playbook playbook.yml
```

:::

Ansible 的强大之处在于，如果您知道如何编写标准 shell 命令（您多年来一直使用的相同命令），那么您可以快速过渡到使用 playbook，然后当您有时间时，重建您的配置以利用 Ansible 的有用功能。

在上面的剧本中，我们使用 Ansible 的 `command` 模块来运行标准 shell 命令。我们还为每个任务提供了一个“名称”，因此当我们运行剧本时，该任务在屏幕或日志中具有人类可读的输出。命令模块还有一些其他技巧（我们稍后会看到），但就目前而言，请放心，shell 脚本会直接转换为 Ansible 剧本，没有太多麻烦。

::: tip
紧跟在 command: 模块指令后面的大于号 ( > ) 告诉 YAML `自动将下一组缩进行引用为一个长字符串，每行用空格分隔` 。在某些情况下，它有助于提高任务的可读性。使用有效的 YAML 语法描述配置的方法有多种。

本书使用三种不同的任务格式化技术： 对于需要一两个简单参数的任务，使用 Ansible 的简写语法（例如`dnf: name=apache2 state=present`）。 对于`command`或`shell`的大多数使用，如果输入较长的命令，则使用上面提到的`>`技术。 对于需要许多参数的任务，使用 YAML 对象表示法——将每个键和变量放在自己的行上。 这有助于提高可读性，并允许版本控制系统轻松区分逐行更改。
:::

上面的 playbook 的执行方式与 shell 脚本完全相同，但是您可以通过使用 Ansible 的一些内置模块来处理繁重的工作，从而大大改进事情：

::: tabs
@tab 修订后的 Ansible Playbook - 现在具有幂等性！

```yaml
---
- hosts: all
  become: yes

  tasks:
    - name: Install Apache.
      dnf:
        name:
          - httpd
          - httpd-devel
        state: present

    - name: Copy configuration files.
      copy:
        src: "{{ item.src }}"
        dest: "{{ item.dest }}"
        owner: root
        group: root
        mode: 0644
      with_items:
        - src: httpd.conf
          dest: /etc/httpd/conf/httpd.conf
        - src: httpd-vhosts.conf
          dest: /etc/httpd/conf/httpd-vhosts.conf

    - name: Make sure Apache is started now and at boot.
      service:
        name: httpd
        state: started
        enabled: yes
```

:::

现在我们已经取得进展了。让我引导您完成这个简单的剧本：

1. 第一行 `---` 是我们如何将此文档标记为使用 YAML 语法（例如在 HTML 文档顶部使用 `<html>` ，或在 PHP 代码块的顶部使用 `<?php` 。 ）
2. 第二行 `- hosts: all` 定义第一个（在本例中是唯一的）play，并告诉 Ansible 在它知道的 `all` 主机上运行该 play。
3. 第三行 `become: yes` 告诉 Ansible 通过 `sudo` 运行所有命令，因此这些命令将以 `root` 用户身份运行。
4. 第五行 `tasks:` 告诉 Ansible 接下来是作为此操作一部分运行的任务列表。
5. 第一个任务以 `name: Install Apache.` 开始。 `name` 不是一个对您的服务器执行某些操作的模块；相反，它是一种为后续任务提供人类可读的描述的方式。看到 `Install Apache` 比看到 `dnf name=httpd state=present` 更人性化，但是如果您完全删除 `name` 行，那不会导致任何问题。

- 我们使用 `dnf` 模块来安装 Apache。我们可以向 Ansible 准确描述我们想要的内容，而不是命令 `dnf -y install httpd httpd-devel` 。 Ansible 将获取我们提供的软件包列表。我们告诉 dnf 确保使用 `state: present` 安装软件包，但我们也可以使用 `state: latest` 确保安装最新版本，或使用 `state: absent` 确保安装软件包未安装。

6. 第二个任务再次以人类可读的名称开始（如果您愿意，可以省略该名称）。

- 我们使用 `copy` 模块将文件从源（在我们的本地工作站上）复制到目标（被管理的服务器）。我们还可以传递更多变量，例如文件元数据，包括所有权和权限（ `owner` 、 `group` 和 `mode` ）。
- Ansible 允许使用 `with_items` 将变量列表传递到任务中：定义一个项目列表，每个项目都将传递到 `play` 中，使用 `item` 变量引用（例如 `{{ item }}` ）。
- 在本例中，我们使用包含用于变量替换的 dict（字典）的项目列表；定义字典列表中的每个元素，每个列表项的格式如下：

```yaml
- var1: value
  var2: value
```

该列表可以包含任意多个变量，甚至是深度嵌套的字典。当您引用剧中的变量时，您可以使用点来访问项目中的变量，因此 `{{ item.var1 }}` 将访问第一个变量。在我们的示例中， `item.src` 访问每个项目中的 `src` 。

7. 第三个任务还使用名称以人类可读的格式来描述它。

- 我们使用 `service` 模块来描述特定服务的所需状态，在本例中为 `httpd` ，Apache 的 http 守护进程。我们希望它运行，所以我们设置 `state: started` ，并且我们希望它在系统启动时运行，所以我们说 `enabled: yes` （相当于运行 `chkconfig httpd on` ）。

通过这种 playbook 格式，Ansible 可以跟踪我们所有服务器上所有内容的状态。如果您第一次运行该 playbook，它将通过确保 Apache 已安装并正在运行以及您的自定义配置已就位来配置服务器。

更好的是，第二次运行它时（如果服务器处于正确的状态），除了告诉您没有任何更改之外，它实际上不会执行任何操作。因此，通过这本简短的手册，您可以配置并确保 Apache Web 服务器的正确配置。此外，使用 `--check` 选项运行 playbook（请参阅下面的下一节）可验证配置是否与 playbook 中定义的内容匹配，而无需在服务器上实际运行任务。

如果您想要更新配置或安装另一个 httpd 软件包，请在本地更新配置文件或将软件包添加到 `dnf` 的 `name` 列表中，然后再次运行 playbook。无论您拥有一台还是一千台服务器，它们的所有配置都将更新以匹配您的剧本，Ansible 会告诉您是否有任何变化（您不会在单个生产服务器上进行临时更改，是吗？ ）。

## 使用 ansible-playbook 运行 Playbook

如果我们运行上面示例中的 playbook（设置为在 all 主机上运行），则 playbook 将针对 Ansible 库存文件中定义的每个主机运行（请参阅[第 1 章的基本清单文件示例](./第1章-Ansible入门)） 。

### 将 playbook 限制为特定主机和组

您可以通过更改 `hosts:` 定义将 playbook 限制为特定组或单个主机。该值可以设置为 `all` 主机、清单中定义的 `group` 主机、多组主机（例如 `webservers`,`dbservers` ）、单个主机（例如 `atl.example.com` ），或主机的混合物。您甚至可以进行通配符匹配，例如 `*.example.com` ，以匹配顶级域的所有子域。

您还可以通过 ansible-playbook 命令限制运行 playbook 的主机：

```bash
ansible-playbook playbook.yml --limit webservers
```

在这种情况下（假设您的清单文件包含`webservers`组），即使剧本设置为`hosts: all`，或者除了`webservers`组中定义的内容之外还包括主机，它也只会在`webservers`中定义的主机上运行。

您还可以将剧本限制为一台特定主机：

```bash
ansible-playbook playbook.yml --limit xyz.example.com
```

如果您想在实际运行 playbook 之前查看将受其影响的主机列表，请使用 `--list-hosts` ：

```bash
ansible-playbook playbook.yml --list-hosts
```

运行它应该给出如下输出：

```bash
playbook: playbook.yml

  play #1 (all): all	TAGS: []
    pattern: ['all']
    hosts (3):
      192.168.56.5
      192.168.56.6
      192.168.56.4
```

### 使用 ansible-playbook 设置用户和 sudo 选项

如果在 playbook 中没有与 `hosts` 一起定义 `remote_user` ，Ansible 会假设您将以特定主机的清单文件中定义的用户身份进行连接，然后将回退到您的本地用户帐户名。您可以使用 `--user` ( `-u` ) 选项显式定义用于远程 play 的远程用户：

```bash
ansible-playbook playbook.yml --user=johndoe
```

在某些情况下，您需要将 sudo 密码传递到远程服务器以通过 `sudo` 执行命令。在这些情况下，您需要使用 `--ask-become-pass` ( `-K` ) 选项。您还可以显式强制 playbook 中的所有任务将 sudo 与 `--become` ( `-b` ) 一起使用。最后，您可以使用 `--become-user` 选项为通过 `sudo` （默认为 root）运行的任务定义 sudo 用户。

例如，以下命令将使用 sudo 运行我们的示例 playbook，以 sudo 用户 `janedoe` 身份执行任务，Ansible 将提示您输入 sudo 密码：

```bash
ansible-playbook playbook.yml --become --become-user=janedoe \
--ask-become-pass
```

如果您没有使用基于密钥的身份验证来连接到您的服务器（请阅读我在[第 1 章](./第1章-Ansible入门)中关于这样做的安全影响的警告），您可以使用 `--ask-pass` 。

### ansible-playbook 的其他选项

`ansible-playbook` 命令还允许使用其他一些常见选项：

- `--inventory=PATH` ( `-i PATH` )：定义自定义清单文件（默认为默认 Ansible 清单文件，通常位于 `/etc/ansible/hosts` ）。
- `--verbose` ( `-v` )：详细模式（显示所有输出，包括成功选项的输出）。您可以传入 `-vvvv` 来提供每一个细节。
- `--extra-vars=VARS` ( `-e VARS` )：定义要在 playbook 中使用的变量，采用 `"key=value,key=value"` 格式。
- `--forks=NUM` ( `-f NUM` )：forks 数（整数）。将其设置为大于 5 的数字以增加 Ansible 将同时运行任务的服务器数量。
- `--connection=TYPE` ( `-c TYPE` )：将使用的连接类型（默认为 `ssh` ；有时您可能想要使用 `local` 在本地计算机上运行剧本，或通过 cron 在远程服务器上运行）。
- `--check` ：在检查模式下运行 playbook（`Dry Run`）；剧本中定义的所有任务都将针对所有主机进行检查，但实际上不会运行任何任务。

还有一些其他选项和配置变量对于充分利用 ansible-playbook 非常重要，但这应该足以让您开始在自己的服务器或虚拟机上运行本章中的 Playbook。。

::: tip
本章的其余部分使用更真实的 Ansible Playbook。 本章中的所有示例都在 [Ansible for DevOps GitHub 存储库](https://github.com/geerlingguy/ansible-for-devops) 中，您可以将该存储库克隆到您的计算机（或在线浏览代码） 更轻松地跟随。 GitHub 存储库包含每个示例的 Vagrantfiles，因此您可以使用 Vagrant 在本地主机上构建服务器。
:::

## 真实的 Playbook: Rocky Linux Node.js 应用服务器

第一个示例虽然对于可能想要将简单的静态网页发布到笨重的旧 Apache 服务器的人很有帮助，但并不能很好地代表现实世界的场景。我将通过更复杂的 Playbook 来展示，这些 Playbook 可以完成许多不同的事情，其中大部分实际上用于管理当今的生产基础设施。

第一个剧本将使用 Node.js 配置 Rocky Linux 服务器，并安装并启动一个简单的 Node.js 应用程序。服务器将具有非常简单的架构：

![Node.js app on Rocky Linux.](https://assets.moweilong.com/img/4-playbook-nodejs.svg)

首先，我们需要创建一个 YAML 文件（本例中为 `playbook.yml` ）来包含我们的 playbook。让我们把事情简单化：

```yaml
---
- hosts: all
  become: yes

  vars:
    node_apps_location: /usr/local/opt/node

  tasks:
```

首先，定义一组将运行该 playbook 的主机 ( `all` )（请参阅上面有关将 playbook 限制为特定组和主机的部分），然后告诉 Ansible 以 root 权限运行该 playbook (因为我们需要安装和配置系统包）。

接下来，我们可以直接在 playbook 中定义 `vars` （playbook 变量）；在本例中，我们添加 `node_apps_location` 变量，以便我们可以使用它来识别 Node.js 应用程序的位置。

最后，剧本需要在主机上执行一些操作，因此我们添加一个 `tasks` 部分，我们很快就会填充该部分。

### 添加额外的存储库

添加额外的软件包存储库（dnf 或 apt）是许多管理员在服务器上进行任何其他工作之前要做的一件事，以确保某些软件包可用，或者版本高于基本安装中的软件包。

在下面的 shell 脚本中，我们想要添加 EPEL 和 Remi 存储库，这样我们就可以获得一些软件包，例如 Node.js 或其他必要软件的更高版本（这些示例假设您作为 root 用户正在运行 Rocky Linux)

```bash
# Install EPEL repo.
dnf install -y epel-release

# Import Remi GPG key.
wget https://rpms.remirepo.net/RPM-GPG-KEY-remi2018 \
  -O /etc/pki/rpm-gpg/RPM-GPG-KEY-remi2018
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-remi2018

# Install Remi repo.
rpm -Uvh --quiet \
  https://rpms.remirepo.net/enterprise/remi-release-8.rpm

# Install Node.js (npm plus all its dependencies).
dnf --enablerepo=epel -y install npm
```

此 shell 脚本使用 rpm 命令安装 EPEL 存储库、导入 Remi 存储库 GPG 密钥、添加 Remi 存储库，最后安装 Node.js。 对于简单的部署（或手动）来说它工作正常，但如果结果已经实现（即，已添加两个存储库及其 GPG 密钥），则运行所有这些命令（其中一些命令可能会花费时间，或者如果您的连接不稳定或损坏，则完全停止您的脚本）是愚蠢的。

::: tip
如果您想跳过几个步骤，您可以跳过添加 GPG 密钥，而只需使用 `--nogpgcheck` 运行命令（或者，在 Ansible 中，设置 dnf 模块的 `disable_gpg_check` 参数到 `yes` ），但最好启用此功能。 GPG 代表 GNU Privacy Guard，这是开发人员和软件包分发者可以签署其软件包的一种方式（这样您就知道它来自原作者，并且没有被修改或损坏）。除非您确实知道自己在做什么，否则请勿禁用 GPG 密钥检查等安全设置。
:::

Ansible 使事情变得更加健壮。尽管下面的内容稍微冗长一些，但它以更结构化的方式执行相同的操作，这更容易理解，并且可以使用变量和我们稍后讨论的其他漂亮的 Ansible 功能：

```yaml
- name: Install EPEL repo.
  dnf: name=epel-release state=present

- name: Import Remi GPG key.
  rpm_key:
    key: "https://rpms.remirepo.net/RPM-GPG-KEY-remi2018"
    state: present

- name: Install Remi repo.
  dnf:
    name: "https://rpms.remirepo.net/enterprise/remi-release-8.rpm"
    state: present

- name: Ensure firewalld is stopped (since this is for testing).
  service: name=firewalld state=stopped

- name: Install Node.js and npm.
  dnf: name=npm state=present enablerepo=epel

- name: Install Forever (to run our Node.js app).
  npm: name=forever global=yes state=present
```

让我们逐步浏览一下这个剧本：

1. `dnf` 安装 EPEL 存储库（并自动导入其 GPG 密钥）。
2. `rpm_key` 是一个非常简单的 Ansible 模块，它从 URL 或文件获取并导入 RPM 密钥，或者已存在的密钥的密钥 id，并确保该密钥存在或不存在（ `state` 参数）。我们正在为 Remi 的存储库导入一把密钥。
3. 我们可以使用 `dnf` 模块安装额外的 dnf 存储库。只需将 URL 传递给 repo `.rpm` 文件，Ansible 就会处理剩下的事情。
4. 由于该服务器仅用于测试目的，因此我们禁用系统防火墙，因此它不会干扰测试（使用 `service` 模块）。
5. 如果 Node.js 不存在，`dnf` 会安装 Node.js（以及 Node 的包管理器 `npm` 所需的所有包），并允许通过 `enablerepo` 参数搜索 EPEL 存储库（您也可以使用 `disablerepo` 显式禁用存储库）。
6. 由于现在已安装 NPM，我们使用 Ansible 的 `npm` 模块来安装 Node.js 实用程序 `forever` ，以启动我们的应用程序并保持其运行。将 `global` 设置为 `yes` 告诉 NPM 在 `/usr/lib/node_modules/` 中安装 `forever` 节点模块，以便所有用户和 Node.js 都可以使用它系统上的应用程序。

我们开始设置一个漂亮的小型 Node.js 应用服务器。让我们设置一个小型 Node.js 应用程序来响应端口 80 上的 HTTP 请求。

::: tip
您可能想知道为什么这些 YAML 剧本中有时使用引号，有时不使用引号。我通常在以下场景中对参数使用引号：

1. 如果我在行的开头或结尾有一个 Jinja 变量（例如 `{{ variable_here }}` ）；否则，由于大括号，YAML 会将该行解析为嵌套对象。
2. 字符串中是否有任何冒号 ( `:` )（例如 URL）。

确保正确引用内容的最简单方法是在代码编辑器中使用 YAML 语法突出显示。
:::

### 部署 Node.js 应用程序

下一步是在我们的服务器上安装一个简单的 Node.js 应用程序。首先，我们将通过在与 `playbook.yml` 相同的文件夹中创建一个新文件夹 `app` 来创建一个非常简单的 Node.js 应用程序。在此文件夹中创建一个新文件 `app.js` ，其中包含以下内容：

```js
// Load the express module.
var express = require("express");
var app = express();

// Respond to requests for / with 'Hello World'.
app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Listen on port 80 (like a true web server).
app.listen(80, () => console.log("Express server started successfully."));
```

不用担心语法或 Node.js 的事实。我们只需要一个简单的示例来部署。此示例可以用 Python、Perl、Java、PHP 或其他语言编写，但由于 Node 是一种在轻量级环境中运行的简单语言 (JavaScript)，因此在测试事物或压测服务器时，它是一种易于使用的语言。

由于这个小应用程序依赖于 Express（Node 的 http 框架），因此我们还需要通过与 `app.js` 位于同一文件夹中的 `package.json` 文件告诉 NPM 这种依赖关系：

```json
{
  "name": "examplenodeapp",
  "description": "Example Express Node.js app.",
  "author": "Jeff Geerling <geerlingguy@mac.com>",
  "dependencies": {
    "express": "4.x"
  },
  "engine": "node >= 10.0.2"
}
```

我们需要将整个应用程序复制到服务器，然后让 NPM 下载所需的依赖项（在本例中为 express ），因此将这些任务添加到您的 playbook 中：

```yaml
- name: Ensure Node.js app folder exists.
  file: "path={{ node_apps_location }} state=directory"

- name: Copy example Node.js app to server.
  copy: "src=app dest={{ node_apps_location }}"

- name: Install app dependencies defined in package.json.
  npm: path={{ node_apps_location }}/app
```

首先，我们使用 `file` 模块确保应用程序安装目录存在。

::: tip
这些任务中使用的 `{{ node_apps_location }}` 变量是在我们的剧本顶部的 `vars` 部分下定义的，但它也可以在您的清单中被覆盖，或者在调用 `ansible-playbook` 时使用 `--extra-vars` 选项在命令行上被覆盖。
:::

其次，我们使用 Ansible 的 `copy` 命令将整个应用程序文件夹复制到服务器，该命令可以智能地区分单个文件或文件目录，并递归目录，类似于递归 scp 或 rsync。

::: tip
Ansible 的 `copy` 模块非常适合单个或小组文件，并自动递归目录。如果您要复制数百个文件或深层嵌套的目录结构， `copy` 将陷入困境。在这些情况下，请考虑使用 `synchronize` 或 `rsync` 模块复制完整目录，或使用 `unarchive` 复制存档并将其扩展到适当的位置服务器。
:::

第三，我们再次使用 `npm` ，这一次，除了应用程序的路径之外，没有任何额外的参数。这告诉 NPM 解析 package.json 文件并确保所有依赖项都存在。

我们快完成了！最后一步是启动应用程序。

### 启动 Node.js 应用程序

我们现在将使用 `forever` （我们之前安装的）来启动应用程序。

```yaml
- name: Check list of running Node.js apps.
  command: /usr/local/bin/forever list
  register: forever_list
  changed_when: false

- name: Start example Node.js app.
  command: "/usr/local/bin/forever start {{ node_apps_location }}/app/app.js"
  when: "forever_list.stdout.find(node_apps_location + '/app/app.js') == -1"
```

在第一个任务中，我们做了两项新事情：

1. `register` 创建一个新变量 `forever_list`，用于下一个任务以确定何时运行该任务。 `register` 将定义命令的输出（stdout、stderr）存储在传递给它的变量名中。
2. `changed_when` 明确告诉 Ansible 此任务何时导致服务器发生更改。在这种情况下，我们知道 `forever list` 命令永远不会更改服务器，因此我们只需说 `false`。当命令运行时，服务器永远不会更改。

第二个任务实际上使用 Forever 启动应用程序。我们也可以通过调用 `node {{ node_apps_location }}/app/app.js` 来启动应用程序，但我们无法轻松控制该过程，并且我们还需要使用 `nohup` 和 `&` 以避免 Ansible 挂在这个任务上。

Forever 跟踪它管理的 Node 应用程序，我们使用 Forever 的 `list` 选项来打印正在运行的应用程序列表。我们第一次运行这个剧本时，列表显然是空的——但在以后的运行中，如果应用程序正在运行，我们不想启动它的另一个实例。为了避免这种情况，我们用 when 告诉 Ansible 何时启动应用程序。具体来说，我们告诉 Ansible 仅当应用程序的路径不在 `forever list` 输出中时启动应用程序。

### Node.js 应用服务器总结

此时，您已经有了一个完整的剧本，它将安装一个简单的 Node.js 应用程序，该应用程序通过`Hello World!`响应端口 80 上的 HTTP 请求。

要在服务器上运行 playbook（在我们的例子中，我们可以通过 Vagrant 或手动设置一个新的 VirtualBox VM 进行测试），请使用以下命令（通过命令传入 `node_apps_location` 变量） ）：

```bash
$ ansible-playbook playbook.yml \
--extra-vars="node_apps_location=/usr/local/opt/node"
```

Playbook 完成服务器配置和应用部署后，在浏览器中访问 `http://hostname/` （或使用 `curl` 或 `wget` 请求站点），然后您应该看到以下内容：

![](https://assets.moweilong.com/img/4-nodejs-home.svg)

简单，但非常强大。我们用不到 50 行 YAML 就配置了整个 Node.js 应用程序服务器！

::: tip
整个示例 Node.js 应用服务器手册位于本书的代码存储库中，网址为：[https://github.com/geerlingguy/ansible-for-devops](https://github.com/geerlingguy/ansible-for-devops) ，在`nodejs`目录中。
:::

## 现实世界的 playbook: 带有 Drupal 的 Ubuntu LAMP 服务器

此时，您应该熟悉 Ansible playbook 以及用于定义它们的 YAML 语法。到目前为止，大多数示例都假设您正在使用 Fedora 或 RHEL 衍生服务器。 Ansible 也可以与其他风格的 Linux 和类似 BSD 的系统很好地配合。在以下示例中，我们将使用 Ubuntu 设置传统的 LAMP（Linux、Apache、MySQL 和 PHP）服务器来运行 Drupal 网站。

![Drupal LAMP server.](https://assets.moweilong.com/img/4-playbook-drupal.svg)

### 包含变量文件，并发现 pre_tasks 和 handlers

为了使我们的剧本更加高效和可读，让我们通过指示 Ansible 从单独的 `vars.yml` 文件加载变量来开始 playbook（名为 `playbook.yml` ）：

```yaml
---
- hosts: all
  become: yes

  vars_files:
    - vars.yml
```

使用一个或多个包含的变量文件可以清理您的主 playbook 文件，并让您将所有可配置变量组织到一处。目前，我们没有任何变量要添加；我们稍后将定义 `vars.yml` 的内容。现在，创建空文件，然后继续执行剧本的下一部分 `pre_tasks` ：

```text
  pre_tasks:
    - name: Update apt cache if needed.
      apt: update_cache=yes cache_valid_time=3600
```

Ansible 允许您分别使用 `pre_tasks` 和 `post_tasks` 在主任务运行任务之前或之后定义（ `tasks`）或角色（在 roles:中定义——我们稍后会讨论角色）。 在这种情况下，我们需要确保在运行 playbook 的其余部分之前更新 apt 缓存，以便我们的服务器上拥有最新的软件包版本。 我们使用 Ansible 的 apt 模块，并告诉它如果自上次更新以来已经超过 3600 秒（1 小时）则更新缓存。

解决这个问题后，我们将在剧本中添加另一个新部分 `handlers` ：

```text
  handlers:
    - name: restart apache
      service: name=apache2 state=restarted
```

`handlers` 是特殊类型的任务，您可以通过将 `notify` 选项添加到该组中的任何任务来在游戏结束时运行。仅当通知处理程序的任务之一对服务器进行更改（并且未失败）时才会调用处理程序，并且仅在 play 结束时才会通知它。

要从任务中调用此处理程序，请将选项 `notify: restart apache` 添加到 play 中的任何任务。我们定义了这个处理程序，以便我们可以在配置更改后重新启动 apache2 服务，这将在下面解释。

::: tip
就像变量一样，处理程序和任务可以放置在单独的文件中并包含在您的 playbook 中以保持整洁（我们将在第 6 章中讨论这一点）。不过，为了简单起见，本章中的示例显示在单个 playbook 文件中。稍后我们将讨论不同的 playbook 组织方法。

默认情况下，当任务失败时，Ansible 将停止所有 playbook 执行，并且不会通知任何可能需要触发的处理程序。在某些情况下，这会导致意想不到的副作用。如果您想确保处理程序始终在任务使用 `notify` 调用处理程序后运行，即使在 playbook 失败的情况下，请将 `--force-handlers` 添加到您的 `ansible-playbook` 命令中。
:::

### 基本 LAMP 服务器设置

构建依赖于 LAMP 堆栈的应用程序服务器的第一步是构建其实际的 LAMP 部分。这是最简单的过程，但对于我们的特定服务器仍然需要一些额外的工作。我们想要安装 Apache、MySQL 和 PHP，但我们还需要一些其他依赖项。

```text
  tasks:
    - name: Get software for apt repository management.
      apt:
        state: present
        name:
          - python3-apt
          - python3-pycurl

    - name: Add ondrej repository for later versions of PHP.
      apt_repository: repo='ppa:ondrej/php' update_cache=yes

    - name: "Install Apache, MySQL, PHP, and other dependencies."
      apt:
        state: present
        name:
          - acl
          - git
          - curl
          - unzip
          - sendmail
          - apache2
          - php8.2-common
          - php8.2-cli
          - php8.2-dev
          - php8.2-gd
          - php8.2-curl
          - php8.2-opcache
          - php8.2-xml
          - php8.2-mbstring
          - php8.2-pdo
          - php8.2-mysql
          - php8.2-apcu
          - libpcre3-dev
          - libapache2-mod-php8.2
          - python3-mysqldb
          - mysql-server

    - name: Disable the firewall (since this is for local dev only).
      service: name=ufw state=stopped

    - name: "Start Apache, MySQL, and PHP."
      service: "name={{ item }} state=started enabled=yes"
      with_items:
        - apache2
        - mysql
```

在本手册中，我们从常见的 LAMP 设置开始：

1. 安装几个帮助程序库，使 Python 能够更精确地管理 apt（ `apt_repository` 模块需要 `python3-apt` 和 `python3-pycurl` 来完成其工作）。
2. 安装额外的 `apt` PPA，以允许安装比默认系统存储库中可用版本更高的 PHP 版本。
3. 安装 LAMP 服务器所需的所有软件包（包括 Drupal 所需的所有 PHP 扩展）。
4. 出于测试目的，完全禁用防火墙。如果在生产服务器或任何暴露于 Internet 的服务器上，您应该使用限制性防火墙，仅允许访问端口 22、80、443 和其他必要端口。
5. 启动所有必需的服务，并确保它们能够在系统启动时启动。

### 配置 Apache

下一步是配置 Apache，以便它能够与 Drupal 一起正常工作。开箱即用时，Apache 可能未启用 mod_rewrite。为了解决这种情况，您可以使用命令 `sudo a2enmod rewrite` ，但 Ansible 有一个方便的 `apache2_module` 模块，可以使用幂等性执行相同的操作。

我们还需要添加一个 VirtualHost 条目来为 Apache 提供站点的文档根目录并为站点提供其他选项。

```text
    - name: Enable Apache rewrite module (required for Drupal).
      apache2_module: name=rewrite state=present
      notify: restart apache

    - name: Add Apache virtualhost for Drupal.
      template:
        src: "templates/drupal.test.conf.j2"
        dest: "/etc/apache2/sites-available/{{ domain }}.test.conf"
        owner: root
        group: root
        mode: 0644
      notify: restart apache

    - name: Enable the Drupal site.
      command: >
        a2ensite {{ domain }}.test
        creates=/etc/apache2/sites-enabled/{{ domain }}.test.conf
      notify: restart apache

    - name: Disable the default site.
      command: >
        a2dissite 000-default
        removes=/etc/apache2/sites-enabled/000-default.conf
      notify: restart apache
```

第一个命令通过将所有必需的 Apache 模块从 `/etc/apache2/mods-available` 符号链接到 `/etc/apache2/mods-enabled` 来启用它们。

第二个命令将我们在 `templates` 文件夹中定义的 Jinja 模板复制到 Apache 的 `sites-available` 文件夹，并具有正确的所有者和权限。此外，我们 `notify` `restart apache` 处理程序，因为复制到新的 VirtualHost 意味着 Apache 需要重新启动才能接受更改。

让我们看看我们的 Jinja 模板（由文件名末尾的额外 `.j2` 表示）， `drupal.test.conf.j2`：

```jinja2
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName {{ domain }}.test
    ServerAlias www.{{ domain }}.test
    DocumentRoot {{ drupal_core_path }}/web
    <Directory "{{ drupal_core_path }}/web">
        Options FollowSymLinks Indexes
        AllowOverride All
    </Directory>
</VirtualHost>
```

这是一个相当标准的 Apache VirtualHost 定义，但我们混合了一些 Jinja 模板变量。在 Jinja 模板中打印变量的语法与我们在 Ansible playbook 中使用的语法相同——变量名称周围有两个括号 (像这样： `{{ variable }}` ）。

我们需要两个变量（ `drupal_core_path` 和 `domain` ），因此将它们添加到我们之前创建的空 `vars.yml` 文件中：

```yaml
---
# The path where Drupal will be downloaded and installed.
drupal_core_path: "/var/www/drupal"

# The resulting domain will be [domain].test (with .test appended).
domain: "drupal"
```

现在，当 Ansible 执行将此模板复制到位的操作时，Jinja 模板会将变量名称替换为值 `/var/www/drupal` 和 `drupal` （或您想要的任何值！ ）。

最后两个任务（第 76-86 行）启用我们刚刚添加的 VirtualHost，并删除我们不再需要的默认 VirtualHost 定义。

### 使用 lineinfile 配置 PHP

我们在本书前面讨论文件管理和临时任务执行时简要提到了 `lineinfile` 。修改 PHP 的配置是展示 `lineinfile` 简单性和实用性的完美方法：

```text
    - name: Adjust OpCache memory setting.
      lineinfile:
        dest: "/etc/php/8.2/apache2/conf.d/10-opcache.ini"
        regexp: "^opcache.memory_consumption"
        line: "opcache.memory_consumption = 96"
        state: present
      notify: restart apache
```

Ansible 的 `lineinfile` 模块执行一项简单的任务：确保文件中存在（或不存在）特定的文本行。

在此示例中，我们需要调整 PHP 的默认 `opcache.memory_consumption` 选项，以便可以将 Drupal 代码库编译到 PHP 的系统内存中，从而加快页面加载时间。

首先，我们在 `dest` 参数中告诉 `lineinfile` 文件的位置。然后，我们给出一个正则表达式（Python 样式）来定义该行的外观（在本例中，该行以确切的短语“opcache.memory_conclusion”开头）。接下来，我们准确地告诉 `lineinfile` 结果行应该是什么样子。最后，我们明确声明我们希望存在此行（使用 `state` 参数）。

Ansible 将采用正则表达式，并查看是否有匹配的行。如果有，Ansible 将确保该行与 line 参数匹配。如果没有，Ansible 将添加 line 参数中定义的行。仅当 Ansible 必须添加或更改行以匹配 line 时，它才会报告更改。

### 配置 MySQL

下一步是创建数据库和用户（以我们之前指定的域命名）供 Drupal 安装使用。

```text
    - name: Create a MySQL database for Drupal.
      mysql_db: "db={{ domain }} state=present"

    - name: Create a MySQL user for Drupal.
      mysql_user:
        name: "{{ domain }}"
        password: "1234"
        priv: "{{ domain }}.*:ALL"
        host: localhost
        state: present
```

::: tip
Ansible 可与许多开箱即用的数据库配合使用（MongoDB、MySQL/MariaDB、PostgreSQL、Redis 等）。就 MySQL 而言，Ansible 使用 MySQLdb Python 包 ( `python3-mysqldb` ) 来管理与数据库服务器的连接，并采用默认 root 帐户凭据（“root”作为用户名，没有密码）。显然，保留此默认值是一个坏主意！在生产服务器上，第一步应该是更改 root 帐户密码，将 root 帐户限制为 localhost，并删除任何不必要的数据库用户。

如果您使用不同的凭据，则可以将 `.my.cnf` 文件添加到包含数据库凭据的远程用户主目录，以允许 Ansible 连接到 MySQL 数据库，而无需在 Ansible playbook 或变量文件中保留密码。否则，您可以提示运行 Ansible playbook 的用户输入 MySQL 用户名和密码。这个使用提示的选项将在本书后面讨论。
:::

### 安装 Composer

如果我们愿意，我们可以从 Drupal.org 手动下载 Drupal，然后使用浏览器运行安装向导，但这就是您在学习使用 Ansible 实现自动化之前要做的事情！

相反，我们将设置 Drupal 代码库并通过自动化安装 Drupal。 Drupal 使用 Composer 来配置其代码库并管理 PHP 依赖项，因此第一步是在服务器上安装 Composer。

```text
    - name: Download Composer installer.
      get_url:
        url: https://getcomposer.org/installer
        dest: /tmp/composer-installer.php
        mode: 0755

    - name: Run Composer installer.
      command: >
        php composer-installer.php
        chdir=/tmp
        creates=/usr/local/bin/composer

    - name: Move Composer into globally-accessible location.
      command: >
        mv /tmp/composer.phar /usr/local/bin/composer
        creates=/usr/local/bin/composer
```

前两个命令下载并运行 Composer 基于 php 的安装程序，该安装程序在 `/tmp` 中生成 `composer.phar` PHP 应用程序存档。然后将此存档复制（使用 `mv` shell 命令）到位置 `/usr/local/bin/composer` ，以便我们可以使用 composer 命令安装所有 Drush 的依赖项。后两个命令设置为仅在 `/usr/local/bin/composer` 文件尚不存在时运行（使用 `creates` 参数）。

::: tip
为什么使用 `shell` 而不是 `command` ？ Ansible 的 `command` 模块是在主机上运行命令的首选选项（当 Ansible 模块无法满足要求时），并且它适用于大多数场景。但是， command 不会通过远程 shell `/bin/sh` 运行命令，因此诸如 `<` 、 `>` 、 `|` 以及 `$HOME` 等本地环境变量将不起作用。 `shell` 允许您将命令输出通过管道传递给其他命令、访问本地环境等。

还有另外两个模块可以帮助远程执行 shell 命令： `script` 执行 shell 脚本（尽管将 shell 脚本转换为幂等 Ansible playbook 几乎总是一个更好的主意！），以及 `raw` 通过 SSH 执行原始命令（仅应在无法使用其他选项之一的情况下使用）。

最好为每项任务使用 Ansible 模块。如果您必须求助于常规命令行命令，请先尝试 `command` 模块。如果您需要上述选项，请使用 `shell` 。 `script` 或 `raw` 的使用应该非常罕见，并且不会在本书中讨论。
:::

### 使用 Composer 创建 Drupal 项目

现在我们已经有了 Composer，我们可以使用 Composer 的 `create-project` 命令创建一个 Drupal 项目。此命令将 Drupal 核心及其所有建议的依赖项下载到服务器上的文件夹中：

```text
    - name: Ensure Drupal directory exists.
      file:
        path: "{{ drupal_core_path }}"
        state: directory
        owner: www-data
        group: www-data

    - name: Check if Drupal project already exists.
      stat:
        path: "{{ drupal_core_path }}/composer.json"
      register: drupal_composer_json

    - name: Create Drupal project.
      composer:
        command: create-project
        arguments: drupal/recommended-project "{{ drupal_core_path }}"
        working_dir: "{{ drupal_core_path }}"
        no_dev: true
      become_user: www-data
      when: not drupal_composer_json.stat.exists
```

首先，我们必须确保存储 Drupal 的目录存在，并且由 Apache 用户 `www-data` 拥有。

接下来，为了实现幂等性，我们将通过查看目录中是否存在 `composer.json` 文件（Composer 为任何新 PHP 项目创建的文件）来检查项目是否已存在。

最后，如果该文件尚不存在，我们将使用 Ansible 的 `composer` 模块来创建 Drupal 项目。 `no_dev` 选项告诉 Composer 不要安装任何 Drupal 开发依赖项，例如在生产服务器上可能没有帮助的测试工具。

`composer` 任务相当于直接运行以下 Composer 命令：

```bash
composer create-project drupal/recommended-project /var/www/drupal --no-dev
```

我们在此任务中使用了 Ansible 的 `become_user` 功能，因此它以 Apache 用户 `www-data` 身份运行。 Drupal 将通过 Apache 访问，如果我们以默认 `root` 用户创建项目，则 Apache Web 服务器将无法访问某些文件，从而导致错误。

### 使用 Drush 安装 Drupal

Drupal 有一个命令行伴侣 Drush。 Drush 是独立于 Drupal 开发的，并提供了一整套 CLI 命令来管理 Drupal。与大多数现代 PHP 工具一样，Drush 可以通过 Composer 安装，因此我们可以使用 `require` 命令通过 Ansible 的 `composer` 模块将 Drush 添加到我们的 Drupal 项目中。

一旦安装了 Drush，我们就可以使用它来安装 Drupal：

```text
    - name: Add drush to the Drupal site with Composer.
      composer:
        command: require
        arguments: drush/drush:11.*
        working_dir: "{{ drupal_core_path }}"
      become_user: www-data
      when: not drupal_composer_json.stat.exists

    - name: Install Drupal.
      command: >
        vendor/bin/drush si -y --site-name="{{ drupal_site_name }}"
        --account-name=admin
        --account-pass=admin
        --db-url=mysql://{{ domain }}:1234@localhost/{{ domain }}
        --root={{ drupal_core_path }}/web
        chdir={{ drupal_core_path }}
        creates={{ drupal_core_path }}/web/sites/default/settings.php
      notify: restart apache
      become_user: www-data
```

在此任务中添加 `when` 条件也意味着 Drush 仅在项目初始化时添加到项目中。您可以删除 `when` 并每次运行该任务，但 `composer require` （与 `composer install` 不同）可能需要一段时间才能完成，因此最好不要运行它项目初始化后。

要安装 Drupal，我们使用 Drush 的 `si` 命令（ `site-install` 的缩写）来运行 Drupal 的安装（它配置数据库（并创建一个我们可以使用的 `sites/default/settings.php` 文件）对于幂等性），运行一些维护，并配置站点的默认设置）。我们传入了 `domain` 变量，并添加了 `drupal_site_name` ，因此将该变量添加到您的 `vars.yml` 文件中：

```yaml
# Your Drupal site name.
drupal_site_name: "Drupal Test"
```

安装站点后，我们还重新启动 Apache（再次使用 `notify` ，就像我们在更新 Apache 的配置时所做的那样）。最后，我们使用 `become_user` 运行这两个任务，以便所有创建的文件都能在 Apache 中正常工作。

### Drupal LAMP 服务总结

要在服务器上运行 playbook（通过本地虚拟机进行测试或在另一台服务器上），请使用以下命令：

```bash
ansible-playbook playbook.yml
```

playbook 完成后，如果您访问 `http://drupal.test/` 服务器（假设您已将 drupal.test 指向您的服务器或虚拟机的 IP 地址），您将看到 Drupal 的默认主页，您可以使用`admin`/`admin`登录。 （显然，您需要在生产服务器上设置安全密码！）。

![Drupal's default home page.](https://assets.moweilong.com/img/4-playbook-drupal-home.svg)

运行 Apache、MySQL 和 PHP 的类似服务器配置可用于运行除 Drupal 之外的许多流行的 Web 框架和 CMS，包括 Symfony、Wordpress、Joomla、Laravel 等。

::: tip
整个示例 Drupal LAMP 服务器手册位于本书的代码存储库中，网址为 [https://github.com/geerlingguy/ansible-for-devops](https://github.com/geerlingguy/ansible-for-devops)，位于 `drupal` 目录。
:::

## 现实世界的 playbook: 带有 Solr 的 Ubuntu 服务器

Apache Solr 是一款快速且可扩展的搜索服务器，针对全文搜索、单词突出显示、分面搜索、快速索引等进行了优化。它是一个非常流行的搜索服务器，并且使用 Ansible 来安装和配置非常容易。在以下示例中，我们将使用 Ubuntu 20.04 和 Java 在至少具有 512 MB RAM 的服务器或虚拟机上设置 Apache Solr。

![Apache Solr Server.](https://assets.moweilong.com/img/4-playbook-solr.svg)

### 包含变量文件以及更多 pre_tasks

就像前面的 LAMP 服务器示例一样，我们将通过告诉 Ansible 我们的变量将位于单独的 `vars.yml` 文件中来开始此剧本（再次命名为 `playbook.yml` ）：

```yaml
---
- hosts: all
  become: true

  vars_files:
    - vars.yml
```

让我们一边思考一边快速创建 `vars.yml` 文件。在与 Solr playbook 相同的文件夹中创建文件，并添加以下内容：

```yaml
---
download_dir: /tmp
solr_dir: /opt/solr
solr_version: 8.6.0
solr_checksum: sha512:6b0d618069e37215f305d9a61a3e65be2b9cfc32a3689ea6a25be2f220b1ecc96a644ecc31c81e335a2dfa0bc8b7d0f2881ca192c36fd435cdd832fd309a9ddb
```

这些变量定义了我们在下载和安装 Apache Solr 时使用的两个路径，以及用于下载 Apache Solr 源代码的版本和文件下载校验和。

回到我们的剧本，在 `vars_files` 之后，我们还需要确保 apt 缓存是最新的，使用 `pre_tasks` 就像前面的例子一样：

```text
  pre_tasks:
    - name: Update apt cache if needed.
      apt: update_cache=true cache_valid_time=3600
```

### 安装 Java

在 Ubuntu 上安装 Java 非常简单，因为它位于默认的 apt 存储库中。我们只需要确保安装了正确的包：

```text
  tasks:
    - name: Install Java.
      apt: name=openjdk-11-jdk state=present
```

这很容易！我们使用 `apt` 模块来安装 `openjdk-11-jdk` 。

### 安装 Apache Solr

Ubuntu 的 LTS 版本包含 Apache Solr 的软件包，但它安装的是旧版本，因此我们将从源安装最新版本的 Solr。第一步是下载源：

```text
    - name: Download Solr.
      get_url:
        url: "https://archive.apache.org/dist/lucene/solr/\
{{ solr_version }}/solr-{{ solr_version }}.tgz"
        dest: "{{ download_dir }}/solr-{{ solr_version }}.tgz"
        checksum: "{{ solr_checksum }}"
```

从远程服务器下载文件时， `get_url` 模块比原始 `wget` 或 `curl` 命令提供更大的灵活性和便利性。

您必须传递 `get_url` 、 `url` （要下载的文件的源）和 `dest` （要下载文件的位置）。如果您将目录传递给 `dest` 参数，Ansible 会将文件放入其中，但始终会在后续运行 playbook 时重新下载该文件（如果已更改，则覆盖现有下载）。为了避免这种额外的开销，我们提供了下载文件的完整路径。

为了让您安心，我们还使用 `checksum` 这个可选参数；如果您正在下载对应用程序的功能和安全性至关重要的文件或存档，最好检查该文件以确保它正是您所期望的。 `checksum` 将下载文件中数据的哈希值与您指定的哈希值（在 Apache Solr 网站上随下载一起提供）进行比较。如果校验和与提供的哈希不匹配，Ansible 将失败并丢弃新下载的（无效）文件。

我们需要扩展 Solr 存档，以便可以在内部运行安装程序，并且可以使用 `creates` 选项使此操作具有幂等性：

```text
    - name: Expand Solr.
      unarchive:
        src: "{{ download_dir }}/solr-{{ solr_version }}.tgz"
        dest: "{{ download_dir }}"
        remote_src: true
        creates: "{{ download_dir }}/solr-{{ solr_version }}/\
README.txt"
```

::: tip
如果您阅读 `unarchive` 模块的文档，您可能会注意到可以通过设置 `src` 将 `get_url` 和 `unarchive` 任务合并为一个任务到文件 URL。这样做可以节省剧本中的一个步骤，并且通常是首选，但在 Apache Solr 的情况下，必须存在原始 `.tgz` 存档才能完成安装，因此我们仍然需要这两项任务。
:::

现在源已存在，运行 Apache Solr 安装脚本（在 Solr 存档的 `bin` 目录中提供）以完成 Solr 安装：

```text
    - name: Run Solr installation script.
      command: >
        {{ download_dir }}/solr-{{ solr_version }}/bin/install_solr_service.sh
        {{ download_dir }}/solr-{{ solr_version }}.tgz
        -i /opt
        -d /var/solr
        -u solr
        -s solr
        -p 8983
        creates={{ solr_dir }}/bin/solr
```

在此示例中，传递给安装程序的选项是硬编码的（例如 `-p 8983` 告诉 Apache Solr 在端口 `8983` 上运行），这工作正常，但如果您要为许多不同类型的 Solr 服务器重用此 playbook，您可能应该使用 `vars.yml` 中定义的变量来配置其中许多选项。这个练习留给读者。

最后，我们需要一个在剧本末尾运行的任务，以确保 Apache Solr 已启动，并将在系统启动时启动：

```text
    - name: Ensure solr is started and enabled on boot.
      service: name=solr state=started enabled=yes
```

使用 `ansible-playbook playbook.yml` 运行 playbook，几分钟后（取决于服务器的互联网连接速度），您应该能够通过 `http://solr.test:8983/solr` 访问 Solr 管理界面（其中`solr.test`是您服务器的主机名或 IP 地址）：

![Solr Admin page.](https://assets.moweilong.com/img/4-playbook-solr-admin.svg)

### Apache Solr 服务总结

我们在部署 Apache Solr 时使用的配置允许多核设置，因此您可以通过管理界面添加更多`search cores`（只要目录和核心架构配置在文件系统中就位），并且具有多个索引适用于多个网站和应用程序。

与上面类似的剧本被用作 [托管 Apache Solr](https://hostedapachesolr.com/) 基础设施的一部分，这是我运行的一项服务，为 Drupal 网站托管 Apache Solr 搜索核心。

::: tip
整个示例 Apache Solr 服务器手册位于本书的代码存储库中，网址为 [https://github.com/geerlingguy/ansible-for-devops](https://github.com/geerlingguy/ansible-for-devops)， `solr` 目录。
:::
