# CMake build script 
cmake_minimum_required(VERSION 3.25)

project(ProtoBufExample)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_BUILD_TYPE debug)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

include(FindProtobuf)
find_package(Protobuf REQUIRED)

include_directories("${PROJECT_SOURCE_DIR}"
    "${PROTOBUF_INCLUDE_DIRS}")

add_executable(protobuf-example-cc
    "${PROJECT_SOURCE_DIR}/protobuf-example.cpp"
    "${PROJECT_SOURCE_DIR}/addressbook.pb.cc")

target_link_libraries(protobuf-example-cc 
    "${PROTOBUF_LIBRARIES}")

# install
install(TARGETS protobuf-example-cc DESTINATION bin)
