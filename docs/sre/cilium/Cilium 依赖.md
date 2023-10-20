---
tags:
  - Cilium
columns:
  - null
title: Cilium 依赖
date: 2023-10-16 17:12:50
categories:
  - cilium
---

# Cilium 依赖

## 依赖确认

[Cilium 依赖确认](https://docs.cilium.io/en/stable/operations/system_requirements/)

cilium 和其他的 cni 组件最大的不同在于其底层使用了 ebpf 技术，而该技术对于 Linux 的系统内核版本有较高的要求，完全的要求可以查看官网的详细链接，这里我们着重看内核版本、内核参数这两个部分。

## Linux 内核版本选择

默认情况下我们可以参考 cilium 官方给出的一个系统要求总结。因为我们是在 k8s 集群中部署（使用容器），因此只需要关注 Linux 内核版本和 etcd 版本即可。根据经验我们可以知道 1.23.6 版本的 k8s 默认使用的 etcd 版本是 3.5.+，因此重点就来到了 Linux 内核版本这里。

| Requirement            | Minimum Version                | In cilium container |
| :--------------------- | :----------------------------- | ------------------: |
| Linux kernel           | >= 4.19.57 or >= 4.18 on RHEL8 |                  no |
| Key-Value store (etcd) | >= 3.1.0                       |                  no |
| clang+LLVM             | >= 10.0                        |                 yes |
| iproute2               | >= 5.9.0                       |                 yes |

::: tip
This requirement is only needed if you run cilium-agent natively. If you are using the Cilium container image cilium/cilium, clang+LLVM is included in the container image.

iproute2 is only needed if you run cilium-agent directly on the host machine. iproute2 is included in the cilium/cilium container image.
:::

毫无疑问 CentOS7 内置的默认内核版本 3.10.x 版本的内核是无法满足需求的，但是在升级内核之前，我们再看看其他的一些要求。

cilium 官方还给出了一份列表描述了各项[高级功能](https://docs.cilium.io/en/stable/operations/system_requirements/#advanced-features)对内核版本的要求：

| Cilium Feature                                                                                                            | Minimum Kernel Version |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| [Bandwidth Manager](https://docs.cilium.io/en/stable/network/kubernetes/bandwidth-manager/#bandwidth-manager)             | >= 5.1                 |
| [Egress Gateway](https://docs.cilium.io/en/stable/network/egress-gateway/#egress-gateway)                                 | >= 5.2                 |
| VXLAN Tunnel Endpoint (VTEP) Integration                                                                                  | >= 5.2                 |
| [WireGuard Transparent Encryption](https://docs.cilium.io/en/stable/security/network/encryption-wireguard/#encryption-wg) | >= 5.6                 |
| Full support for [Session Affinity](https://docs.cilium.io/en/stable/network/kubernetes/kubeproxy-free/#session-affinity) | >= 5.7                 |
| BPF-based proxy redirection                                                                                               | >= 5.7                 |
| Socket-level LB bypass in pod netns                                                                                       | >= 5.7                 |
| L3 devices                                                                                                                | >= 5.8                 |
| BPF-based host routing                                                                                                    | >= 5.10                |
| IPv6 BIG TCP support                                                                                                      | >= 5.19                |
| IPv4 BIG TCP support                                                                                                      | >= 6.3                 |

可以看到如果需要满足上面所有需求的话，需要内核版本高于 6.3，本着学习测试研究作死的精神，反正都升级了，干脆就升级到新一些的版本吧。这里我们可以直接使用 elrepo 源来升级内核到较新的内核版本。
