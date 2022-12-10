# CMake build script
cmake_minimum_required(VERSION 3.25)

project(ProgSerializationTest)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

find_package(Boost REQUIRED COMPONENTS serialization)

include_directories("${PROJECT_SOURCE_DIR}" "${Boost_INCLUDE_DIRS}")

set(ProgSerialization_dbg_libs
    "${Boost_SERIALIZATION_LIBRARY_DEBUG}")

set(ProgSerialization_opt_libs 
    "${Boost_SERIALIZATION_LIBRARY_RELEASE}")

add_executable(ProgSerialization
    "${PROJECT_SOURCE_DIR}/main.cpp")

target_link_libraries(ProgSerialization
    debug "${ProgSerialization_dbg_libs}"
    optimized "${ProgSerialization_opt_libs}")
