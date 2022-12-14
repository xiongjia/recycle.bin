---
tags: [index,tech]
---

# 📦 collection

Tools + Frameworks + others

## ⌨️ DEV

### C / C++

- [boost](tech/dev/boost.md) - boost 日常使用
- [abseil](https://abseil.io/) - [abseil-github](https://github.com/abseil/abseil-cpp); [abseil-blog](https://abseil.io/blog/)

### Java

- [jodd](https://github.com/oblac/jodd){:target="_blank"} - 各种工具库的独立实现，不一定最好但都比较小巧。
- [byte-buddy](https://github.com/raphw/byte-buddy){:target="_blank"} - Runtime code generation

## 🐼 DB

### Key-Value Database

- [Dragon Fly DB](https://dragonflydb.io/){:target="_blank"} - 类 redis ，看统计比 redis 快，占内存少

### Time series database

- [GrepTimeDb](https://github.com/GreptimeTeam/greptimedb){:target="_blank"} -  rust 实现的 TS DB

### SQLite

- [SQLite](https://www.sqlite.org/){:target="_blank"} ; [SQLite Docs](https://www.sqlite.org/docs.html){:target="_blank"}
- [SQLite Github mirror](https://github.com/sqlite/sqlite){:target="_blank"}
- [SQLite 源代码解析](https://huili.github.io/sqlite/sqliteintro.html){:target="_blank"}
- [rqlite](https://github.com/rqlite/rqlite){:target="_blank"} - Golang 封装 raft + SQLite 实现的分布式数据库

### [PostgreSQL](https://www.postgresql.org/){:target="_blank"} 系列

- [patroni](https://github.com/zalando/patroni){:target="_blank"} - python 实现 PG 集群配置工具 (依赖 ETCD )

### DB tools

- [dbeaver](https://dbeaver.io){:target="_blank"} - 支持各种数据库的管理工具。基于 Java, JDBC 用 Eclipse 改的界面。社区版本免费。

## 🐥 distributed systems

### Services discovery

- [zookeeper](https://github.com/apache/zookeeper){:target="_blank"}
- [etcd](https://github.com/etcd-io/etcd){:target="_blank"}
- [nacos](https://github.com/alibaba/nacos){:target="_blank"} - 安全漏洞多，最好只内网用用

## 🛠️ Dev-Ops

- [ntfy](https://ntfy.sh/){:target="_blank"} - 通知系统
- [gotify](https://gotify.net/){:target="_blank"} - 通知系统
- 分发部署系统: saltstack, ansible, puppet, chef, rudder, fabric, Terraform

## ☎️ RPC

- [ZMQ](https://zeromq.org/){:target="_blank"} - [zmq-github](https://github.com/zeromq) 不需要额外部署 (Zero)
- [d-bus](https://github.com/freedesktop/dbus){:target="_blank"} - IPC 通信
- [gRPC](https://grpc.io/){:target="_blank"} - HTTP2 + protobuf
- [RSocket](https://rsocket.io/){:target="_blank"} - 有浏览器支持
- [thrift](https://thrift.apache.org/){:target="_blank"}
- [avro](https://avro.apache.org/){:target="_blank"}

## 🍎 Serialization Frameworks

- [protobuf](tech/dev/protobuf.md) - 速度比较快
- [msgpack](https://msgpack.org/){:target="_blank"} - 和 JSON 差不多。压缩版 JSON
- [pickle](https://docs.python.org/3/library/pickle.html){:target="_blank"} - Python 自带。二进制序列号格式
- [cbor](https://cbor.io/){:target="_blank"} - binary object, 能用的库不多
- [bson](https://bsonspec.org/){:target="_blank"} - binary json , MongoDB 里用的就是 bson
- [Json Lines](https://jsonlines.org/){:target="_blank"} - JSON 改良
- [thrift](https://thrift.apache.org/){:target="_blank"} - RPC 库里用的
- [FlatBuffers](https://google.github.io/flatbuffers/){:target="_blank"} - 为游戏开发设计。（应该是不做数据压缩，解析更快，但比较耗内存和带宽)
- [parquet](https://parquet.apache.org/){:target="_blank"} - Columnar storage for Hadoop workloads. (Binary)
- [srsly](https://github.com/explosion/srsly){:target="_blank"} - python 的库
- [Java Object Serialization](https://docs.oracle.com/javase/8/docs/technotes/guides/serialization/index.html){:target="_blank"} - JDK / JRE 自带
- [ion](https://amzn.github.io/ion-docs/){:target="_blank"} - Amazone 开发
- [npy](https://numpy.org/devdocs/reference/generated/numpy.lib.format.html){:target="_blank"} - Python NumPy 自带
- [Json LD](https://json-ld.org/){:target="_blank"} - 改良版 JSON ，适合重复数据多
- [gobs](https://pkg.go.dev/encoding/gob){:target="_blank"} - golang 自带
- Boost.Serialization - Boost 的一个模块，只适合 c++ [Boost.Serialization 1.8](https://www.boost.org/doc/libs/1_80_0/libs/serialization/doc/index.html){:target="_blank"}
- Others: Yaml; Toml; xml; Plist (MacOS 里用的那个)

## 📺 Entertainment

### media system

- [jellyfin](https://jellyfin.org/){:target="_blank"} - .NET 实现的流管理
- [emby](https://emby.media/){:target="_blank"} - .NET 实现的流管理
- [plex](https://www.plex.tv/){:target="_blank"}
- [TMM](https://www.tinymediamanager.org/){:target="_blank"}
- [kodi](https://kodi.tv/){:target="_blank"}; [kodi-github](https://github.com/xbmc){:target="_blank"}

### trackers / radarr

- [Sonarr](https://github.com/Sonarr/Sonarr){:target="_blank"} - 自动下载找源 (电视剧管理与自动下载)
- [Radarr](https://github.com/Radarr/Radarr){:target="_blank"} - sonarr 复刻 (电影管理与自动下载)
- [Jackett](https://github.com/Jackett/Jackett){:target="_blank"} - 找源工具

### Movie DB

- [imdb](https://www.imdb.com/){:target="_blank"} - 缺少开放接口
- [omdbapi](https://www.omdbapi.com/){:target="_blank"} - 基本不维护
- [tmdb](https://www.themoviedb.org/){:target="_blank"} - 目前看最开放

## 📚 Tutorials

- [web.dev/learn](https://web.dev/learn/){:target="_blank"} - 基础 html 教程
- [TypeScript Challenges](https://github.com/type-challenges/type-challenges){:target="_blank"} - TypeScript 练习
- [CS DIY](https://csdiy.wiki/){:target="_blank"} - Computer science 自学目录

## 🤖 Tools

- [trickle](https://github.com/mariusae/trickle){:target="_blank"} - 带宽限速
- [mitmproxy](https://mitmproxy.org/){:target="_blank"} - 解析 http / https 协议用的反向工程工具
- [ttar](https://github.com/ideaship/ttar){:target="_blank"} - 文本文件打包工具
- [flameshot](https://github.com/flameshot-org/flameshot){:target="_blank"} - 截屏工具
- [go-guerrilla](https://github.com/flashmob/go-guerrilla){:target="_blank"} - Mini SMTP server written in golang
- [coreutils rust](https://github.com/uutils/coreutils){:target="_blank"} - unix core utils 的 rust 实现版本

## 👀 Monitoring tool

### Prometheus 系

- [node_exporter](https://github.com/prometheus/node_exporter){:target="_blank"} - Exporter for machine metrics
- [alertmanager](https://github.com/prometheus/alertmanager){:target="_blank"} - Prometheus Alertmanager
- [ethtool golang](github.com/safchain/ethtool){:target="_blank"} - ethtool 的 golang 实现 Prometheus 内部调用
- [proc fs](https://github.com/prometheus/procfs){:target="_blank"} - golang 实现的 proc fs 解析工具。 Prometheus 内部组件

### Application Performance Monitoring

- [skywalking](https://github.com/apache/skywalking){:target="_blank"}
- [pinpoint](https://github.com/pinpoint-apm/pinpoint){:target="_blank"}

### Misc

- [sysstat](https://github.com/sysstat/sysstat){:target="_blank"} - Performance monitoring tools for Linux
- [Server Status Rust](https://github.com/zdz/ServerStatus-Rust){:target="_blank"} - Rust 实现的服务器监测
- [uptime kuma](https://github.com/louislam/uptime-kuma){:target="_blank"} - A fancy self-hosted monitoring tool
- [vnStat](https://github.com/vergoh/vnstat){:target="_blank"} - a network traffic monitor for Linux and BSD
- [btop](https://github.com/aristocratos/bpytop){:target="_blank"} - 改良版本 top

## 🐵 github

### github tools

- [Open Source Software Insight](https://ossinsight.io/){:target="_blank"} - github 的一些统计
- [giscus](https://giscus.app/){:target="_blank"} - 基于 github discussions 做的 BLOG 留言系统
- [utteranc](https://utteranc.es/){:target="_blank"} - 基于 github issue 做的 BLOG 留言系统

### ENU

- [awesome english book](https://github.com/hehonghui/awesome-english-ebooks){:target="_blank"}

## 🎮 Games

- [NS Emulator](https://github.com/Ryujinx/Ryujinx){:target="_blank"} - .NET 实现的 NS 模拟器。（好像已经停止维护了）
