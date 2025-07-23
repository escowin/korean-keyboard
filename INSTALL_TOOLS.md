# Development Tools Installation Guide

This guide will help you install all the required tools for developing the Korean Keyboard project.

## Required Tools

### 1. Visual Studio 2019 or Later

**Download**: https://visualstudio.microsoft.com/downloads/

**Installation Steps**:
1. Download Visual Studio Community (free) or Professional/Enterprise
2. Run the installer
3. Select the following workloads:
   - **Desktop development with C++**
   - **Windows 10/11 SDK**
   - **CMake tools for Visual Studio**
4. Click Install
5. Wait for installation to complete

**Verification**:
```bash
# Open Developer Command Prompt and run:
cl
# Should show Microsoft C++ compiler version
```

### 2. CMake 3.16 or Later

**Option A: Install via Visual Studio (Recommended)**
- Install "CMake tools for Visual Studio" workload in Visual Studio
- CMake will be automatically available

**Option B: Standalone Installation**
1. Download from: https://cmake.org/download/
2. Choose "Windows x64 Installer"
3. Run installer
4. **Important**: Check "Add CMake to the system PATH"
5. Complete installation

**Verification**:
```bash
cmake --version
# Should show CMake version 3.16 or later
```

### 3. Git

**Download**: https://git-scm.com/download/win

**Installation Steps**:
1. Download Git for Windows
2. Run installer
3. Use default settings (recommended)
4. Complete installation

**Verification**:
```bash
git --version
# Should show Git version
```

## Optional Tools

### 4. Visual Studio Code (Recommended)

**Download**: https://code.visualstudio.com/

**Installation Steps**:
1. Download VS Code
2. Run installer
3. Complete installation
4. Install recommended extensions:
   - C/C++ (ms-vscode.cpptools)
   - CMake Tools (ms-vscode.cmake-tools)
   - C/C++ Extension Pack

### 5. Python 3.7+ (Optional)

**Download**: https://www.python.org/downloads/

**Installation Steps**:
1. Download Python 3.7 or later
2. Run installer
3. **Important**: Check "Add Python to PATH"
4. Complete installation

**Verification**:
```bash
python --version
# Should show Python version
```

## Automated Installation

### Using Chocolatey (Windows Package Manager)

If you prefer automated installation:

1. **Install Chocolatey**:
   ```powershell
   # Run PowerShell as Administrator
   Set-ExecutionPolicy Bypass -Scope Process -Force
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
   iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

2. **Install tools**:
   ```powershell
   # Install CMake
   choco install cmake -y
   
   # Install Git
   choco install git -y
   
   # Install Python (optional)
   choco install python -y
   
   # Install VS Code (optional)
   choco install vscode -y
   ```

### Using Our Setup Script

Run our PowerShell setup script with automatic tool installation:

```powershell
# Run as Administrator
.\setup_dev_environment.ps1 -InstallTools
```

## Environment Setup

### 1. Set Up Development Environment

Run our setup script:

```bash
# Batch version
setup_dev_environment.bat

# PowerShell version (recommended)
.\setup_dev_environment.ps1
```

### 2. Verify Installation

```bash
# Verify build environment
verify_build.bat

# Or manually test compilation
g++ -o test_compile test_core.cpp -std=c++17
./test_compile
```

### 3. Build the Project

```bash
# Build the complete project
dev.bat build

# Run tests
dev.bat test

# Install keyboard extension (as administrator)
dev.bat install
```

## Troubleshooting

### Common Issues

#### Visual Studio Not Found
**Problem**: `cl` command not found
**Solution**:
1. Install Visual Studio with C++ development tools
2. Use "Developer Command Prompt" instead of regular command prompt
3. Or add Visual Studio to PATH

#### CMake Not Found
**Problem**: `cmake` command not found
**Solution**:
1. Install CMake and add to PATH
2. Or install "CMake tools for Visual Studio" workload
3. Restart command prompt after installation

#### Build Failures
**Problem**: Compilation errors
**Solution**:
1. Check Visual Studio installation includes C++ tools
2. Verify CMake version (3.16+)
3. Use Developer Command Prompt
4. Check build logs in `build/` directory

#### Permission Issues
**Problem**: Access denied errors
**Solution**:
1. Run command prompt as Administrator
2. Check Windows Defender/antivirus settings
3. Verify file permissions

### Getting Help

1. **Check build logs**: Look in `build/` directory for detailed error messages
2. **Verify tools**: Run verification scripts to check tool installation
3. **Check documentation**: See `docs/DEVELOPMENT.md` for detailed setup guide
4. **Common solutions**: Most issues are resolved by using Developer Command Prompt

## Next Steps

After installing all tools:

1. **Set up development environment**:
   ```bash
   .\setup_dev_environment.ps1
   ```

2. **Build the project**:
   ```bash
   dev.bat build
   ```

3. **Run tests**:
   ```bash
   dev.bat test
   ```

4. **Start developing**:
   - Open `korean-keyboard.code-workspace` in VS Code
   - Or use your preferred IDE
   - Make changes and test with `dev.bat build`

## System Requirements

- **OS**: Windows 10/11 (64-bit)
- **RAM**: 8GB minimum, 16GB recommended
- **Disk Space**: 10GB free space
- **Processor**: Multi-core processor (Intel i5/AMD Ryzen 5 or better)

## Support

If you encounter issues:

1. Check this guide for common solutions
2. Verify all tools are properly installed
3. Use Developer Command Prompt for Visual Studio tools
4. Check build logs for specific error messages
5. Ensure you have administrator privileges when needed 