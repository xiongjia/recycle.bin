---
tags: [index,tech]
---

# 📦 collection

Tools + Frameworks + others

## ⌨️ DEV

### C / C++

- [boost](tech/dev/boost.md) - boost 日常使用
- [abseil](https://abseil.io/) - [abseil-github](https://github.com/abseil/abseil-cpp); [abseil-blog](https://abseil.io/blog/)

## 🐼 DB

### Key-Value Database

- [Dragon Fly DB](https://dragonflydb.io/){:target="_blank"} - 类 redis ，看统计比 redis 快，占内存少

### Time series database

- [GrepTimeDb](https://github.com/GreptimeTeam/greptimedb){:target="_blank"} -  rust 实现的 TS DB

### [PostgreSQL](https://www.postgresql.org/){:target="_blank"} 系列

- [patroni](https://github.com/zalando/patroni){:target="_blank"} - python 实现 PG 集群配置工具 (依赖 ETCD )

### DB tools

- [dbeaver](https://dbeaver.io){:target="_blank"} - 支持各种数据库的管理工具。基于 Java, JDBC 用 Eclipse 改的界面。社区版本免费。

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
- Others: Yaml; Toml; xml; Plist (MacOS 里用的那个)

## 📚 Tutorials

- [web.dev/learn](https://web.dev/learn/){:target="_blank"} - 基础 html 教程
- [TypeScript Challenges](https://github.com/type-challenges/type-challenges){:target="_blank"} - TypeScript 练习
- [CS DIY](https://csdiy.wiki/){:target="_blank"} - Computer science 自学目录


## 🤖 Tools

- [trickle](https://github.com/mariusae/trickle){:target="_blank"} - 带宽限速
- [mitmproxy](https://mitmproxy.org/){:target="_blank"} - 解析 http / https 协议用的反向工程工具

## 🎮 Games

- [NS Emulator](https://github.com/Ryujinx/Ryujinx){:target="_blank"} - .NET 实现的 NS 模拟器。（好像已经停止维护了）
