# CMake build script
# Zeratul - A simple socks proxy. (Boost ASIO)
cmake_minimum_required(VERSION 3.25)

project(zeratul)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

find_package(Boost REQUIRED COMPONENTS
    thread date_time system chrono log log_setup filesystem regex)

add_definitions(-DBOOST_LOG_DYN_LINK)

include_directories("${Boost_INCLUDE_DIRS}"
  "${PROJECT_SOURCE_DIR}/src")

set(zeratul_dbg_libs
  "${Boost_REGEX_LIBRARY_DEBUG}"
  "${Boost_FILESYSTEM_LIBRARY_DEBUG}"
  "${Boost_LOG_LIBRARY_DEBUG}"
  "${Boost_LOG_SETUP_LIBRARY_DEBUG}"
  "${Boost_DATE_TIME_LIBRARY_DEBUG}"
  "${Boost_SYSTEM_LIBRARY_DEBUG}"
  "${Boost_CHRONO_LIBRARY_DEBUG}"
  "${Boost_THREAD_LIBRARY_DEBUG}")

set(zeratul_opt_libs
  "${Boost_REGEX_LIBRARY_RELEASE}"
  "${Boost_FILESYSTEM_LIBRARY_RELEASE}"
  "${Boost_LOG_LIBRARY_RELEASE}"
  "${Boost_LOG_SETUP_LIBRARY_RELEASE}"
  "${Boost_DATE_TIME_LIBRARY_RELEASE}"
  "${Boost_SYSTEM_LIBRARY_RELEASE}"
  "${Boost_CHRONO_LIBRARY_RELEASE}"
  "${Boost_THREAD_LIBRARY_RELEASE}") 

add_library(libzeratul STATIC
  "${PROJECT_SOURCE_DIR}/z_types.hxx"
  "${PROJECT_SOURCE_DIR}/z_misc.hxx"
  "${PROJECT_SOURCE_DIR}/z_misc.cxx"
  "${PROJECT_SOURCE_DIR}/zeratul.hxx"
  "${PROJECT_SOURCE_DIR}/zeratul.cxx")

add_executable(zeratul
  "${PROJECT_SOURCE_DIR}/main.cxx")

target_link_libraries(zeratul
  debug "${zeratul_dbg_libs}"
  optimized "${zeratul_opt_libs}"
  libzeratul)
