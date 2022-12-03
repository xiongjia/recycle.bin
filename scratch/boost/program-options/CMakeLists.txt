# CMake build script 
cmake_minimum_required(VERSION 3.25)

project(ProgOpts)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

find_package(Boost REQUIRED COMPONENTS 
    program_options)

include_directories("${PROJECT_SOURCE_DIR}"
    "${Boost_INCLUDE_DIRS}")

set(progopts_boost_dbg_libs 
    "${Boost_PROGRAM_OPTIONS_LIBRARY_DEBUG}")
set(progopts_boost_opt_libs 
    "${Boost_PROGRAM_OPTIONS_LIBRARY_RELEASE}")

# application
add_executable(prog-opts
    "${PROJECT_SOURCE_DIR}/program-options.cpp")

target_link_libraries(prog-opts
    debug "${progopts_boost_dbg_libs}"
    optimized "${progopts_boost_opt_libs}")

# install
install(TARGETS prog-opts DESTINATION bin)

