# CMake build script
cmake_minimum_required(VERSION 3.25)

project(ProgPoolTest)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

find_package(Boost REQUIRED COMPONENTS system thread date_time chrono)

include_directories("${PROJECT_SOURCE_DIR}" "${Boost_INCLUDE_DIRS}")

set(progpool_dbg_libs
    "${Boost_SYSTEM_LIBRARY_DEBUG}"
    "${Boost_DATE_TIME_LIBRARY_DEBUG}"
    "${Boost_CHRONO_LIBRARY_DEBUG}"
    "${Boost_THREAD_LIBRARY_DEBUG}")
set(proglpool_opt_libs
    "${Boost_SYSTEM_LIBRARY_RELEASE}"
    "${Boost_DATE_TIME_LIBRARY_RELEASE}"
    "${Boost_CHRONO_LIBRARY_RELEASE}"
    "${Boost_THREAD_LIBRARY_RELEASE}")

add_executable(ProgPool
    "${PROJECT_SOURCE_DIR}/main.cpp")

target_link_libraries(ProgPool)

target_link_libraries(ProgPool
    debug "${progpool_dbg_libs}"
    optimized "${proglpool_opt_libs}")

# install
install(TARGETS ProgPool DESTINATION bin)
