# Boost.property_tree

[property_tree docs (boost 1.80)](https://www.boost.org/doc/libs/1_80_0/doc/html/property_tree.html)

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

- read-ini.cpp - the test functions
- CMakeLists.txt - CMake build script



## notes

- Handle the unicode problems
- Test command `read-ini -f <ini-filename>`

```ini
# The samp ini file
[app]
string=test str
number=101
```

## Reference

- [Boost docs](https://www.boost.org/doc/)
- [property_tree docs (boost 1.80)](https://www.boost.org/doc/libs/1_80_0/doc/html/property_tree.html)
