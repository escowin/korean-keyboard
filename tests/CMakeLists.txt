# Test application CMakeLists.txt
cmake_minimum_required(VERSION 3.16)

# Test executable
add_executable(TestJamoProcessor
    test_jamo_processor.cpp
)

add_executable(TestComprehensiveMapping
    test_comprehensive_mapping.cpp
)

# Link with the main library
target_link_libraries(TestJamoProcessor
    KoreanArchaicKeyboard
)

# Set output directory
set_target_properties(TestJamoProcessor PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Include directories
target_include_directories(TestJamoProcessor PRIVATE
    ${CMAKE_SOURCE_DIR}/include
) 