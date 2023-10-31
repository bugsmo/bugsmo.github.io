---
order: 1
tags:
  - skywalking
title: Helm 部署 Skywalking
date: 2023-10-26 15:41:59
categories:
  - skywalking
columns:
  -
---

# Helm 部署 Skywalking

## 前提条件

[Github 地址](https://github.com/apache/skywalking-helm)

- 安装 helm3
- 安装 k8s

## 容器时区配置

容器使用的时区不是东八区

```dockerfile
FROM skywalking.docker.scarf.sh/apache/skywalking-oap-server:9.2.0
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone
```

构建镜像

```bash
docker build -t harbor.dev.cn/library/skywalking-oap-server:9.2.0 .

docker push harbor.dev.cn/library/skywalking-oap-server:9.2.0
```

## 基于已有 es 安装

### helm 下载 skywalking

通过 helm 拉取 skywalking 包到本地。

```bash
export REPO=skywalking
helm repo add ${REPO} https://apache.jfrog.io/artifactory/skywalking-helm
helm search repo skywalking
helm pull ${REPO}/skywalking
tar xf skywalking-4.3.0.tgz
cd skywalking
```

## 配置 values-my-es.yaml

- ui 版本需配合 oap 版本
- es 版本是 oap 指定版本
- 镜像仓库是私人的，需替换为自己的私有镜像仓库

```yaml
oap:
  image:
    repository: harbor.dev.cn/library/skywalking-oap-server
    tag: 9.2.0
  storageType: elasticsearch

ui:
  image:
    repository: harbor.dev.cn/library/skywalking-ui
    tag: 9.2.0
  service:
    type: NodePort
    externalPort: 80
    internalPort: 8080
    nodePort: 31234

elasticsearch:
  enabled: false
  config: # For users of an existing elasticsearch cluster,takes effect when `elasticsearch.enabled` is false
    host: elasticsearch # service.namespace
    port:
      http: 9200
    #user: "es用户" # [optional]
    #password: "密码" # [optional]
```

## 部署

- skywalking-skywalking 影响到 deployment 和 service 的名字

```bash
helm install skywalking-skywalking -f values-my-es.yaml -n dev --create-namespace .
```

查看创建的 deployment

```bash
kubectl -n dev get deployment |grep skywalking

skywalking-skywalking-oap                 2/2     2            2           22m
skywalking-skywalking-ui                  1/1     1            1           22m
```

查看创建的 service

```bash
kubectl -n dev get svc |grep skywalking

skywalking-skywalking-oap                 ClusterIP   10.96.226.167   <none>        11800/TCP,12800/TCP             23m
skywalking-skywalking-ui                  NodePort    10.96.59.215    <none>        80:31231/TCP                    23m
```

## Skywalking 索引

查看 Skywalking 在 elasticsearch 创建的索引。

```bash
curl http://es:9200/_cat/indices?v
health status index                         uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   sw_segment-20231026           lMIkLU11QfmzpoFcy32DGg   5   0        275            0    366.7kb        366.7kb
green  open   sw_metrics-all-20231026       gGHhLA0sS_2FWRHPRCXGtQ   1   1        334          207    326.3kb        163.1kb
green  open   sw_records-all-20231026       qas52I9HTWyS_UYZekDu9A   1   1          0            0       460b           230b
green  open   sw_browser_error_log-20231026 -TQeJhUDTtiran5zg3PMPA   5   0          0            0      1.1kb          1.1kb
green  open   sw_zipkin_span-20231026       gNTwpVpsRhWN3JoE76XP2A   5   0          0            0      1.1kb          1.1kb
green  open   sw_log-20231026               n3WQXqGNQUqoNlBFL9nd6Q   5   0          0            0      1.1kb          1.1kb
green  open   sw_ui_template                TcWeSgCWSDuKQheyRxMn4w   1   1         46            0    578.3kb        289.1kb
```

## Java Agent

- java agent [下载地址](https://mirror.bjtu.edu.cn/apache/skywalking/java-agent/)

```bash
wget https://mirror.bjtu.edu.cn/apache/skywalking/java-agent/9.0.0/apache-skywalking-java-agent-9.0.0.tgz

tar xf apache-skywalking-java-agent-9.0.0.tgz
```

## 制作 Java Agent 镜像

```bash
vim Dockerfile
```

```Dockerfile
FROM busybox:latest

ENV LANG=C.UTF-8
WORKDIR /
ADD skywalking-agent/ /usr/skywalking/agent/
```

开始构建镜像

```bash
docker build -t harbor.cn/library/apache-skywalking-java-agent:9.0.0 .

docker push harbor.cn/library/apache-skywalking-java-agent:9.0.0
```

## SideCar 模式接入 SkyWalking 服务

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: PROJECT_NAME
  name: PROJECT_NAME
  namespace: NAMESPACE
spec:
  progressDeadlineSeconds: 600
  replicas: REPLICAS_NUM
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: PROJECT_NAME
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: PROJECT_NAME
    spec:
      initContainers:
        - image: harbor.cn/library/apache-skywalking-java-agent:9.0.0
          name: sw-agent-sidecar
          imagePullPolicy: IfNotPresent
          command: ["sh"]
          args:
            [
              "-c",
              "mkdir -p /skywalking/agent && cp -r /usr/skywalking/agent/* /skywalking/agent",
            ]
          volumeMounts:
            - mountPath: /skywalking/agent
              name: sw-agent
      containers:
        - env:
            - name: JAVA_OPTS
              valueFrom:
                configMapKeyRef:
                  key: JAVA_OPTS
                  name: jvm-config
            - name: JAVA_TOOL_OPTIONS
              value: -javaagent:/usr/skywalking/agent/skywalking-agent.jar
            - name: SW_AGENT_NAME
              value: PROJECT_NAME
            - name: SW_AGENT_COLLECTOR_BACKEND_SERVICES
              ## FQDN: servicename.namespacename.svc.cluster.local
              value: skywalking-skywalking-oap:11800
          image: "harbor.mdos.cn/BRANCH_NAME/PROJECT_NAME:TAG_VERSION"
          imagePullPolicy: IfNotPresent
          name: PROJECT_NAME
          ports:
            - containerPort: PORT
              name: http
              protocol: TCP
          startupProbe:
            tcpSocket:
              port: PORT
            initialDelaySeconds: 20
            failureThreshold: 30
            periodSeconds: 2
          readinessProbe:
            httpGet:
              path: /v1/healthy
              port: PORT
              scheme: HTTP
            initialDelaySeconds: 2
            periodSeconds: 2
            timeoutSeconds: 2
            failureThreshold: 2
          livenessProbe:
            tcpSocket:
              port: PORT
            initialDelaySeconds: 2
            periodSeconds: 2
            timeoutSeconds: 2
            failureThreshold: 2
          resources:
            limits:
              cpu: 2
              memory: 1024Mi
            requests:
              cpu: 500m
              memory: 1024Mi
          volumeMounts:
            - mountPath: /usr/skywalking/agent
              name: sw-agent
      volumes:
        - name: sw-agent
          emptyDir: {}
      dnsPolicy: ClusterFirst
      imagePullSecrets:
        - name: harbor-secret
      restartPolicy: Always
      schedulerName: default-scheduler
      terminationGracePeriodSeconds: 30
```
