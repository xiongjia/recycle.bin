# Boost.serialization

[serialization docs (boost 1.80)](https://www.boost.org/doc/libs/1_80_0/libs/serialization/doc/index.html)

## Build

- Requitments: CMake > 3.25; Boost > 1.80  
- Build commands:

    ```bash
    mkdir build
    cd build
    cmake ../
    make
    ```

## Files

- main.cpp - the test functions
- CMakeLists.txt - CMake build script

## notes

- the test saves `srcData` to `mydata.dat` and load it from `mydata.dat` file to `destData`
- Boost.serialization supports other formats as well (e.g. binary, xml)

## Reference

- [Boost docs](https://www.boost.org/doc/)
- [serialization docs (boost 1.80)](https://www.boost.org/doc/libs/1_80_0/libs/serialization/doc/index.html)
