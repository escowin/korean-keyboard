@echo off
echo Setting up Korean Keyboard Development Environment
echo =================================================

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Warning: Some components may require administrator privileges.
    echo Consider running this script as administrator for full setup.
    echo.
)

echo Step 1: Checking current development tools...
echo.

REM Check for Visual Studio
echo Checking for Visual Studio...
where cl >nul 2>&1
if %errorLevel% equ 0 (
    echo ✓ Visual Studio C++ compiler found
    cl 2>&1 | findstr "Microsoft" >nul
    if %errorLevel% equ 0 (
        echo ✓ Visual Studio C++ tools are properly configured
    ) else (
        echo ⚠ Visual Studio found but C++ tools may not be configured
    )
) else (
    echo ✗ Visual Studio C++ compiler not found
    echo   Please install Visual Studio 2019 or later with C++ development tools
    echo   Download: https://visualstudio.microsoft.com/downloads/
)

echo.

REM Check for CMake
echo Checking for CMake...
where cmake >nul 2>&1
if %errorLevel% equ 0 (
    echo ✓ CMake found
    cmake --version
) else (
    echo ✗ CMake not found
    echo   Please install CMake 3.16 or later
    echo   Download: https://cmake.org/download/
)

echo.

REM Check for Git
echo Checking for Git...
where git >nul 2>&1
if %errorLevel% equ 0 (
    echo ✓ Git found
    git --version
) else (
    echo ✗ Git not found
    echo   Please install Git
    echo   Download: https://git-scm.com/download/win
)

echo.

REM Check for Python (for some build tools)
echo Checking for Python...
where python >nul 2>&1
if %errorLevel% equ 0 (
    echo ✓ Python found
    python --version
) else (
    echo ⚠ Python not found (optional, but recommended for some tools)
)

echo.

echo Step 2: Creating development directory structure...
echo.

REM Create necessary directories
if not exist "build" mkdir build
if not exist "bin" mkdir bin
if not exist "lib" mkdir lib
if not exist "docs\api" mkdir docs\api
if not exist "tools" mkdir tools

echo ✓ Development directories created

echo.

echo Step 3: Setting up build configuration...
echo.

REM Create a basic build configuration
echo Creating build configuration...
(
echo # Build configuration for Korean Keyboard
echo BUILD_TYPE=Release
echo CMAKE_GENERATOR=Visual Studio 16 2019
echo CMAKE_ARCHITECTURE=x64
echo ENABLE_TESTS=ON
echo ENABLE_DOCUMENTATION=ON
) > build_config.txt

echo ✓ Build configuration created

echo.

echo Step 4: Setting up environment variables...
echo.

REM Set environment variables for the project
set KOREAN_KEYBOARD_ROOT=%CD%
set KOREAN_KEYBOARD_BUILD=%CD%\build
set KOREAN_KEYBOARD_BIN=%CD%\bin

echo ✓ Environment variables set:
echo   KOREAN_KEYBOARD_ROOT=%KOREAN_KEYBOARD_ROOT%
echo   KOREAN_KEYBOARD_BUILD=%KOREAN_KEYBOARD_BUILD%
echo   KOREAN_KEYBOARD_BIN=%KOREAN_KEYBOARD_BIN%

echo.

echo Step 5: Creating development tools...
echo.

REM Create a development helper script
(
echo @echo off
echo echo Korean Keyboard Development Helper
echo echo =================================
echo echo.
echo echo Available commands:
echo echo   build    - Build the project
echo echo   test     - Run tests
echo echo   clean    - Clean build files
echo echo   install  - Install keyboard extension
echo echo   docs     - Generate documentation
echo echo.
echo if "%%1"=="build" goto build
echo if "%%1"=="test" goto test
echo if "%%1"=="clean" goto clean
echo if "%%1"=="install" goto install
echo if "%%1"=="docs" goto docs
echo goto help
echo.
echo :build
echo echo Building Korean Keyboard...
echo cd build
echo cmake .. -G "Visual Studio 16 2019" -A x64
echo cmake --build . --config Release
echo goto end
echo.
echo :test
echo echo Running tests...
echo cd build\bin\Release
echo TestJamoProcessor.exe
echo goto end
echo.
echo :clean
echo echo Cleaning build files...
echo if exist build rmdir /s /q build
echo mkdir build
echo goto end
echo.
echo :install
echo echo Installing keyboard extension...
echo install.bat
echo goto end
echo.
echo :docs
echo echo Generating documentation...
echo echo Documentation generation not yet implemented
echo goto end
echo.
echo :help
echo echo Usage: dev.bat [command]
echo echo.
echo echo Commands:
echo echo   build    - Build the project
echo echo   test     - Run tests
echo echo   clean    - Clean build files
echo echo   install  - Install keyboard extension
echo echo   docs     - Generate documentation
echo.
echo :end
) > dev.bat

echo ✓ Development helper script created (dev.bat)

echo.

echo Step 6: Creating VS Code configuration...
echo.

REM Create VS Code workspace
if not exist ".vscode" mkdir .vscode

(
echo {
echo   "folders": [
echo     {
echo       "name": "Korean Keyboard",
echo       "path": "."
echo     }
echo   ],
echo   "settings": {
echo     "cmake.configureOnOpen": true,
echo     "cmake.buildDirectory": "${workspaceFolder}/build",
echo     "cmake.generator": "Visual Studio 16 2019",
echo     "cmake.preferredGenerators": [
echo       "Visual Studio 16 2019"
echo     ],
echo     "files.associations": {
echo       "*.h": "cpp",
echo       "*.cpp": "cpp",
echo       "*.hpp": "cpp"
echo     },
echo     "C_Cpp.default.configurationProvider": "ms-vscode.cmake-tools"
echo   },
echo   "extensions": {
echo     "recommendations": [
echo       "ms-vscode.cpptools",
echo       "ms-vscode.cmake-tools",
echo       "ms-vscode.cpptools-extension-pack"
echo     ]
echo   }
echo }
) > korean-keyboard.code-workspace

echo ✓ VS Code workspace configuration created

echo.

echo Step 7: Creating development documentation...
echo.

(
echo # Development Environment Setup
echo.
echo ## Prerequisites
echo.
echo ### Required Tools
echo - **Visual Studio 2019 or later** with C++ development tools
echo - **CMake 3.16 or later**
echo - **Git** for version control
echo.
echo ### Optional Tools
echo - **VS Code** with C++ extensions
echo - **Python 3.7+** for additional build tools
echo.
echo ## Environment Variables
echo.
echo The following environment variables are set:
echo - `KOREAN_KEYBOARD_ROOT`: Project root directory
echo - `KOREAN_KEYBOARD_BUILD`: Build directory
echo - `KOREAN_KEYBOARD_BIN`: Binary output directory
echo.
echo ## Quick Start
echo.
echo 1. **Build the project**:
echo    ```bash
echo    dev.bat build
echo    ```
echo.
echo 2. **Run tests**:
echo    ```bash
echo    dev.bat test
echo    ```
echo.
echo 3. **Install keyboard extension**:
echo    ```bash
echo    dev.bat install
echo    ```
echo.
echo ## Development Workflow
echo.
echo 1. Make changes to source code
echo 2. Run `dev.bat build` to compile
echo 3. Run `dev.bat test` to verify changes
echo 4. Commit changes to git
echo 5. Run `dev.bat install` to test installation
echo.
echo ## Troubleshooting
echo.
echo ### Common Issues
echo.
echo **CMake not found**:
echo - Install CMake from https://cmake.org/download/
echo - Add CMake to your system PATH
echo.
echo **Visual Studio not found**:
echo - Install Visual Studio 2019+ with C++ development tools
echo - Run from Visual Studio Developer Command Prompt
echo.
echo **Build failures**:
echo - Check compiler version compatibility
echo - Verify all dependencies are installed
echo - Check build logs in the `build` directory
echo.
) > docs\DEVELOPMENT.md

echo ✓ Development documentation created

echo.

echo Step 8: Creating build verification script...
echo.

(
echo @echo off
echo echo Verifying build environment...
echo echo.
echo.
echo REM Check if we can compile a simple test
echo echo Compiling test program...
echo g++ -o build\test_compile test_core.cpp -std=c++17
echo if %%ERRORLEVEL%% neq 0 (
echo   echo ✗ Compilation test failed
echo   echo Please check your C++ compiler installation
echo   exit /b 1
echo )
echo.
echo echo ✓ Compilation test passed
echo.
echo REM Run the test
echo echo Running test program...
echo build\test_compile.exe
echo if %%ERRORLEVEL%% neq 0 (
echo   echo ✗ Test execution failed
echo   exit /b 1
echo )
echo.
echo echo ✓ Test execution passed
echo echo.
echo echo Build environment is ready!
echo echo You can now run: dev.bat build
) > verify_build.bat

echo ✓ Build verification script created

echo.

echo Step 9: Final verification...
echo.

echo Running build verification...
call verify_build.bat

echo.

echo ================================================
echo Development Environment Setup Complete!
echo ================================================
echo.
echo Next steps:
echo 1. Install Visual Studio 2019+ with C++ tools (if not already installed)
echo 2. Install CMake 3.16+ (if not already installed)
echo 3. Run: dev.bat build
echo 4. Run: dev.bat test
echo 5. Run: dev.bat install (as administrator)
echo.
echo For more information, see docs\DEVELOPMENT.md
echo.
pause 