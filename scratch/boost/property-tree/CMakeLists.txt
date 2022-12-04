# CMake build script
cmake_minimum_required(VERSION 3.25)

project(ReadIni)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

find_package(Boost REQUIRED COMPONENTS program_options)

include_directories("${PROJECT_SOURCE_DIR}" "${Boost_INCLUDE_DIRS}")

set(rdcfg_boost_dbg_libs 
    "${Boost_PROGRAM_OPTIONS_LIBRARY_DEBUG}")
set(rdcfg_boost_opt_libs 
    "${Boost_PROGRAM_OPTIONS_LIBRARY_RELEASE}")

# application
add_executable(read-ini 
    "${PROJECT_SOURCE_DIR}/read-ini.cpp")

target_link_libraries(read-ini
    debug "${rdcfg_boost_dbg_libs}"
    optimized "${rdcfg_boost_opt_libs}")

# install
install(TARGETS read-ini DESTINATION bin)
