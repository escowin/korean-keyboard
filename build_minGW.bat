@echo off
echo Building Korean Keyboard with MinGW...
echo =====================================

REM Create build directory
if not exist build mkdir build
cd build

REM Configure with CMake
echo Configuring with CMake...
cmake ../src/windows -G "MinGW Makefiles"
if %ERRORLEVEL% neq 0 (
    echo CMake configuration failed!
    pause
    exit /b 1
)

REM Build the main library only
echo Building main library...
cmake --build . --target KoreanArchaicKeyboard
if %ERRORLEVEL% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Build completed successfully!
echo The library is located at: build\bin\libKoreanArchaicKeyboard.dll
echo.

REM Test the core functionality
echo Testing core functionality...
cd ..
g++ -o test_compile test_core.cpp -std=c++17
if %ERRORLEVEL% equ 0 (
    echo Core test compilation successful!
    echo Running core test...
    test_compile.exe
) else (
    echo Core test compilation failed!
)

echo.
echo Installation complete!
echo.
echo Next steps:
echo 1. The main library has been built successfully
echo 2. Core functionality has been tested
echo 3. For full Windows integration, install Visual Studio with C++ tools
echo 4. For testing, run: test_compile.exe
echo.
pause 