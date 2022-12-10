# CMake build script
cmake_minimum_required(VERSION 3.25)

project(ProgUnitTest)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

find_package(Boost REQUIRED COMPONENTS unit_test_framework)

# enable boost static flag
unset(Boost_LIBRARIES)
set(Boost_USE_STATIC ON)
set(Boost_USE_STATIC_LIBS ON)
set(Boost_USE_MULTITHREADED ON)
set(Boost_USE_STATIC_RUNTIME ON)

include_directories("${PROJECT_SOURCE_DIR}" "${Boost_INCLUDE_DIRS}")

set(progunittest_boost_dbg_libs 
  "${Boost_UNIT_TEST_FRAMEWORK_LIBRARY_DEBUG}")
set(progunittest_boost_opt_libs 
  "${Boost_UNIT_TEST_FRAMEWORK_LIBRARY_RELEASE}")

add_library(progunittest STATIC my_lib.cpp)

add_executable(prog-unittest
  "${PROJECT_SOURCE_DIR}/my_lib_test.cpp")

target_link_libraries(prog-unittest
  debug "${progunittest_boost_dbg_libs}"
  optimized "${progunittest_boost_opt_libs}"
  progunittest)
