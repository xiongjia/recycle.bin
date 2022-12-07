# Boost.pool

[pool docs (boost 1.80)](https://www.boost.org/doc/libs/1_80_0/libs/pool/doc/html/index.html)

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

- `class TestAllocator` is a user define allocator.
- `mem_pool_tests()` is memory pool test function.
- `obj_pool_tests()` is object memory pool test function.
- `singleton_pool()` is signleton memory pool test function.

## Reference

- [Boost docs](https://www.boost.org/doc/)
- [pool docs (boost 1.80)](https://www.boost.org/doc/libs/1_80_0/libs/pool/doc/html/index.html)
