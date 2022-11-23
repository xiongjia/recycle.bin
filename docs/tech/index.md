---
tags: [index,tech]
---

# 📦 collection

Tools + Frameworks + others

## Serialization Frameworks

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
- [gob](https://pkg.go.dev/encoding/gob) - golang 自带
- Others: Yaml; Toml; Plist (MacOS 里用的那个)
