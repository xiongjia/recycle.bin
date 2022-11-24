---
tags: [index,tech]
---

# 📦 collection

Tools + Frameworks + others

## ⌨️ DEV

### Frameworks

- [boost](tech/dev/boost.md) - boost 日常使用

## 🐼 DB

### Key-Value Database

- [Dragon Fly DB](https://dragonflydb.io/) - 类 redis ，看统计比 redis 快，占内存少

### Time series database

- [GrepTimeDb](https://github.com/GreptimeTeam/greptimedb) -  rust 实现的 TS DB

### [PostgreSQL](https://www.postgresql.org/) 系列

- [patroni](https://github.com/zalando/patroni) - python 实现 PG 集群配置工具 (依赖 ETCD )

### DB tools

- [dbeaver](https://dbeaver.io) - 支持各种数据库的管理工具。基于 Java, JDBC 用 Eclipse 改的界面。社区版本免费。

## 🛠️ Dev-Ops

- [ntfy](https://ntfy.sh/) - 通知系统
- [gotify](https://gotify.net/) - 通知系统
- 分发部署系统: saltstack, ansible, puppet, chef, rudder, fabric, Terraform

## ☎️ RPC

- [ZMQ](https://zeromq.org/) - [zmq-github](https://github.com/zeromq) 不需要额外部署 (Zero)
- [d-bus](https://github.com/freedesktop/dbus) - IPC 通信
- [gRPC](https://grpc.io/) - HTTP2 + protobuf
- [RSocket](https://rsocket.io/) - 有浏览器支持
- [thrift](https://thrift.apache.org/)
- [avro](https://avro.apache.org/)

## 🍎 Serialization Frameworks

- [protobuf](https://github.com/protocolbuffers/protobuf) - 速度比较快
- [msgpack](https://msgpack.org/) - 和 JSON 差不多。压缩版 JSON
- [pickle](https://docs.python.org/3/library/pickle.html) - Python 自带。二进制序列号格式
- [cbor](https://cbor.io/) - binary object, 能用的库不多
- [bson](https://bsonspec.org/) - binary json , MongoDB 里用的就是 bson
- [Json Lines](https://jsonlines.org/) - JSON 改良
- [thrift](https://thrift.apache.org/) - RPC 库里用的
- [FlatBuffers](https://google.github.io/flatbuffers/) - 为游戏开发设计。（应该是不做数据压缩，解析更快，但比较耗内存和带宽)
- [parquet](https://parquet.apache.org/) - Columnar storage for Hadoop workloads. (Binary)
- [srsly](https://github.com/explosion/srsly) - python 的库
- [Java Object Serialization](https://docs.oracle.com/javase/8/docs/technotes/guides/serialization/index.html) - JDK / JRE 自带
- [ion](https://amzn.github.io/ion-docs/) - Amazone 开发
- [npy](https://numpy.org/devdocs/reference/generated/numpy.lib.format.html) - Python NumPy 自带
- [Json LD](https://json-ld.org/) - 改良版 JSON ，适合重复数据多
- [gobs](https://pkg.go.dev/encoding/gob) - golang 自带
- Others: Yaml; Toml; xml; Plist (MacOS 里用的那个)

## 📚 Tutorials

- [web.dev/learn](https://web.dev/learn/) - 基础 html 教程
- [TypeScript Challenges](https://github.com/type-challenges/type-challenges) - TypeScript 练习
- [CS DIY](https://csdiy.wiki/) - Computer science 自学目录

## 🎮 Games

- [NS Emulator](https://github.com/Ryujinx/Ryujinx) - .NET 实现的 NS 模拟器。（好像已经停止维护了）
