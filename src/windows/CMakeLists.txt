cmake_minimum_required(VERSION 3.16)
project(KoreanArchaicKeyboard VERSION 1.0.0 LANGUAGES CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Windows-specific settings
if(WIN32)
    set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS ON)
    add_definitions(-DUNICODE -D_UNICODE)
    add_definitions(-DWIN32_LEAN_AND_MEAN)
endif()

# Find required packages
find_package(PkgConfig REQUIRED)

# Include directories
include_directories(${CMAKE_SOURCE_DIR}/include)
include_directories(${CMAKE_SOURCE_DIR}/src)

# Source files
set(SOURCES
    main.cpp
    TSFManager.cpp
    JamoProcessor.cpp
    UnicodeMapper.cpp
    KeyboardLayout.cpp
    Configuration.cpp
)

# Create the DLL
add_library(KoreanArchaicKeyboard SHARED ${SOURCES})

# Link libraries
target_link_libraries(KoreanArchaicKeyboard
    ole32
    oleaut32
    uuid
    msctf
    user32
    kernel32
)

# Set output directory
set_target_properties(KoreanArchaicKeyboard PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
    LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib
    ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib
)

# Installation
install(TARGETS KoreanArchaicKeyboard
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
)

# Add test subdirectory
add_subdirectory(../../tests ${CMAKE_BINARY_DIR}/tests) 