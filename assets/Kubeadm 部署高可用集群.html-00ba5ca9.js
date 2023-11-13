const l=JSON.parse('{"key":"v-29674fc9","path":"/kubernetes/tasks/Kubeadm%20%E9%83%A8%E7%BD%B2%E9%AB%98%E5%8F%AF%E7%94%A8%E9%9B%86%E7%BE%A4.html","title":"Kubeadm 部署高可用集群","lang":"zh-CN","frontmatter":{"order":1,"tags":["k8s安装"],"title":"Kubeadm 部署高可用集群","date":"2023-10-19T14:21:49.000Z","columns":[null],"categories":["sre","kubernetes","tasks"]},"headers":[{"level":2,"title":"1. 主机配置","slug":"_1-主机配置","link":"#_1-主机配置","children":[{"level":3,"title":"1.1 设置时间","slug":"_1-1-设置时间","link":"#_1-1-设置时间","children":[]},{"level":3,"title":"1.2 设置防火墙","slug":"_1-2-设置防火墙","link":"#_1-2-设置防火墙","children":[]},{"level":3,"title":"1.3 静态 host","slug":"_1-3-静态-host","link":"#_1-3-静态-host","children":[]},{"level":3,"title":"1.4 检查 mac 和 product_uuid","slug":"_1-4-检查-mac-和-product-uuid","link":"#_1-4-检查-mac-和-product-uuid","children":[]},{"level":3,"title":"1.5 配置 ssh 免密登录","slug":"_1-5-配置-ssh-免密登录","link":"#_1-5-配置-ssh-免密登录","children":[]},{"level":3,"title":"1.6 关闭 swap 内存","slug":"_1-6-关闭-swap-内存","link":"#_1-6-关闭-swap-内存","children":[]},{"level":3,"title":"1.7 关闭 selinux","slug":"_1-7-关闭-selinux","link":"#_1-7-关闭-selinux","children":[]},{"level":3,"title":"1.8 配置 netfilter 参数","slug":"_1-8-配置-netfilter-参数","link":"#_1-8-配置-netfilter-参数","children":[]},{"level":3,"title":"1.9 配置 ipvs","slug":"_1-9-配置-ipvs","link":"#_1-9-配置-ipvs","children":[]}]},{"level":2,"title":"2. CNI 组件选择","slug":"_2-cni-组件选择","link":"#_2-cni-组件选择","children":[{"level":3,"title":"2.1 Cilium","slug":"_2-1-cilium","link":"#_2-1-cilium","children":[]}]},{"level":2,"title":"3. 安装 container runtime","slug":"_3-安装-container-runtime","link":"#_3-安装-container-runtime","children":[{"level":3,"title":"3.1 修改 Linux 内核参数","slug":"_3-1-修改-linux-内核参数","link":"#_3-1-修改-linux-内核参数","children":[]},{"level":3,"title":"3.2 安装 containerd","slug":"_3-2-安装-containerd","link":"#_3-2-安装-containerd","children":[]},{"level":3,"title":"3.3 关于 CRI","slug":"_3-3-关于-cri","link":"#_3-3-关于-cri","children":[]},{"level":3,"title":"3.4 安装 cni-plugins","slug":"_3-4-安装-cni-plugins","link":"#_3-4-安装-cni-plugins","children":[]},{"level":3,"title":"3.5 配置 cgroup drivers","slug":"_3-5-配置-cgroup-drivers","link":"#_3-5-配置-cgroup-drivers","children":[]},{"level":3,"title":"3.6 关于 kubelet 的 cgroup driver","slug":"_3-6-关于-kubelet-的-cgroup-driver","link":"#_3-6-关于-kubelet-的-cgroup-driver","children":[]},{"level":3,"title":"3.7 安装 cri-tools","slug":"_3-7-安装-cri-tools","link":"#_3-7-安装-cri-tools","children":[]}]},{"level":2,"title":"4. 安装 kube 组件","slug":"_4-安装-kube-组件","link":"#_4-安装-kube-组件","children":[]},{"level":2,"title":"5. 高可用配置","slug":"_5-高可用配置","link":"#_5-高可用配置","children":[]},{"level":2,"title":"6. 初始化集群","slug":"_6-初始化集群","link":"#_6-初始化集群","children":[{"level":3,"title":"6.1 初始化集群配置","slug":"_6-1-初始化集群配置","link":"#_6-1-初始化集群配置","children":[]},{"level":3,"title":"6.2 初始化集群","slug":"_6-2-初始化集群","link":"#_6-2-初始化集群","children":[]},{"level":3,"title":"6.3 添加 worker 节点","slug":"_6-3-添加-worker-节点","link":"#_6-3-添加-worker-节点","children":[]}]},{"level":2,"title":"7. 安装 CNI","slug":"_7-安装-cni","link":"#_7-安装-cni","children":[{"level":3,"title":"7.1 安装 helm3","slug":"_7-1-安装-helm3","link":"#_7-1-安装-helm3","children":[]},{"level":3,"title":"7.2 安装 Cilium","slug":"_7-2-安装-cilium","link":"#_7-2-安装-cilium","children":[]},{"level":3,"title":"7.3 设置 Hubble 可观测性","slug":"_7-3-设置-hubble-可观测性","link":"#_7-3-设置-hubble-可观测性","children":[]},{"level":3,"title":"7.4 Service Map & Hubble UI","slug":"_7-4-service-map-hubble-ui","link":"#_7-4-service-map-hubble-ui","children":[]}]},{"level":2,"title":"8. 重置集群","slug":"_8-重置集群","link":"#_8-重置集群","children":[]}],"git":{"updatedTime":1698375987000},"filePathRelative":"kubernetes/tasks/Kubeadm 部署高可用集群.md"}');export{l as data};
