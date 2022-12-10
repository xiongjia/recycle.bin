# CMake build script
cmake_minimum_required(VERSION 3.25)

project(ProgLogTest)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

find_package(Boost REQUIRED COMPONENTS
  log log_setup system filesystem date_time thread chrono)

add_definitions(-DBOOST_LOG_DYN_LINK)
include_directories("${PROJECT_SOURCE_DIR}" "${Boost_INCLUDE_DIRS}")

set(proglog_dbg_libs
  "${Boost_LOG_LIBRARY_DEBUG}"
  "${Boost_LOG_SETUP_LIBRARY_DEBUG}"
  "${Boost_THREAD_LIBRARY_DEBUG}"
  "${Boost_DATE_TIME_LIBRARY_DEBUG}"
  "${Boost_CHRONO_LIBRARY_DEBUG}"
  "${Boost_FILESYSTEM_LIBRARY_DEBUG}"
  "${Boost_SYSTEM_LIBRARY_DEBUG}")

set(proglog_opt_libs 
  "${Boost_LOG_LIBRARY_RELEASE}"
  "${Boost_LOG_SETUP_LIBRARY_RELEASE}"
  "${Boost_THREAD_LIBRARY_RELEASE}"
  "${Boost_DATE_TIME_LIBRARY_RELEASE}"
  "${Boost_CHRONO_LIBRARY_RELEASE}"
  "${Boost_FILESYSTEM_LIBRARY_RELEASE}"
  "${Boost_SYSTEM_LIBRARY_RELEASE}")

add_executable(prog-log "${PROJECT_SOURCE_DIR}/main.cpp")

target_link_libraries(prog-log
    debug "${proglog_dbg_libs}"
    optimized "${proglog_opt_libs}")

# install
install(TARGETS prog-log DESTINATION bin)
