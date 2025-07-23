@echo off
echo Korean Keyboard Development Helper
echo =================================
echo.
echo Available commands:
echo   build    - Build the project
echo   test     - Run tests
echo   clean    - Clean build files
echo   install  - Install keyboard extension
echo   docs     - Generate documentation
echo.
if "%1"=="build" goto build
if "%1"=="test" goto test
if "%1"=="clean" goto clean
if "%1"=="install" goto install
if "%1"=="docs" goto docs
goto help

:build
echo Building Korean Keyboard...
cd build
cmake .. -G "Visual Studio 16 2019" -A x64
cmake --build . --config Release
goto end

:test
echo Running tests...
cd build\bin\Release
TestJamoProcessor.exe
goto end

:clean
echo Cleaning build files...
if exist build rmdir /s /q build
mkdir build
goto end

:install
echo Installing keyboard extension...
install.bat
goto end

:docs
echo Generating documentation...
echo Documentation generation not yet implemented
goto end

:help
echo Usage: dev.bat [command]
echo.
echo Commands:
echo   build    - Build the project
echo   test     - Run tests
echo   clean    - Clean build files
echo   install  - Install keyboard extension
echo   docs     - Generate documentation

:end
