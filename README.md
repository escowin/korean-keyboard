# Korean Archaic Keyboard for iOS

A comprehensive iOS keyboard extension that provides Korean input with support for archaic Korean characters (옛한글) using the Microsoft Old Hangul keyboard mapping system.

## Features

### 🎯 **Microsoft Old Hangul Keyboard Support**
- **16 archaic letters** following the Microsoft Old Hangul keyboard standard
- **AltGr-style combinations** for easy access to archaic characters
- **Unicode-compliant** implementation following Korean language standards

### ⌨️ **Microsoft Old Hangul Input Methods**

#### **AltGr Key Combinations**
- `AltGr + A` → ㆍ (아래아)
- `AltGr + S` → ㅿ (반시옷)
- `AltGr + H` → ㆆ (여린히읗)
- `AltGr + B` → ㅸ (쌍비읍)
- `AltGr + N` → ᄔ (쌍니은)
- `AltGr + O` → ᅇ (쌍이응)
- `AltGr + L` → ᄙ (쌍리을)
- `AltGr + K` → ᄼ (반치읓)
- `AltGr + T` → ᄾ (반치읓)
- `AltGr + C` → ᅎ (반치읓)
- `AltGr + P` → ᅐ (반치읓)
- `AltGr + U` → ᅔ (반치읓)
- `AltGr + W` → ᅕ (반치읓)

#### **AltGr + Shift Combinations**
- `AltGr + Shift + M` → ᅀ (반시옷)
- `AltGr + Shift + H` → ᅙ (여린히읗)
- `AltGr + Shift + A` → ᆞ (아래아)

### 🎨 **Modern iOS Design**
- **Native iOS keyboard appearance** with system colors and fonts
- **Responsive layout** supporting both iPhone and iPad
- **Accessibility support** for users with disabilities
- **Dark mode support** with automatic theme switching

### 🔧 **Technical Features**
- **Swift 5.0** implementation with modern iOS APIs
- **iOS 17.0+** support with latest keyboard extension features
- **Memory efficient** with optimized character processing
- **Fast response times** with efficient input handling

## Installation

### Prerequisites
- **Xcode 15.0+** with iOS 17.0+ SDK
- **iOS device** or **simulator** running iOS 17.0+
- **Apple Developer Account** (for device deployment)

### Build Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ios-keyboard
   ```

2. **Open in Xcode**
   ```bash
   open KoreanArchaicKeyboard.xcodeproj
   ```

3. **Configure signing**
   - Select your development team in project settings
   - Update bundle identifier if needed

4. **Build and run**
   - Select your target device/simulator
   - Press `Cmd + R` to build and run

### Installation on Device

1. **Build the project** in Xcode
2. **Install on device** via Xcode or TestFlight
3. **Enable keyboard** in iOS Settings:
   - Settings → General → Keyboard → Keyboards
   - Add New Keyboard → Korean Archaic
4. **Grant permissions** when prompted
5. **Switch to keyboard** using the globe button (🌐)

## Usage

### Basic Korean Input
- Type normally using the Korean jamo layout
- Characters automatically compose into syllables
- Standard Korean input works as expected

### Archaic Character Input

#### **Method 1: AltGr Combinations (Microsoft Old Hangul Style)**
1. Press and hold the **AltGr** button (Right Alt)
2. Press the corresponding letter key
3. Release both keys

#### **Method 2: AltGr + Shift Combinations**
1. Press and hold the **AltGr** button (Right Alt)
2. Press and hold the **Shift** button
3. Press the corresponding letter key
4. Release all keys

#### **Method 3: Archaic Mode**
1. Tap the **옛** button to enable archaic mode
2. Type normally - all input will be processed for archaic characters
3. Tap **옛** again to return to normal mode

### Keyboard Controls
- **⇧** - Shift key for capital letters and AltGr combinations
- **AltGr** - Right Alt key for archaic character combinations
- **⌫** - Backspace to delete characters
- **space** - Insert space character
- **return** - Insert newline
- **🌐** - Switch to next keyboard
- **옛** - Toggle archaic mode

## Architecture

### Core Components

#### **KoreanArchaicKeyboardViewController**
- Main keyboard controller implementing `UIInputViewController`
- Handles input processing and text insertion
- Manages keyboard state and mode switching

#### **KoreanJamoProcessor**
- Processes Korean jamo input and composition
- Implements archaic character mapping system
- Handles Unicode conversion and positioning

#### **KoreanArchaicKeyboardView**
- Custom keyboard UI implementation
- Provides touch interface for key input
- Manages visual feedback and state display

### Data Flow
1. **User Input** → Keyboard View
2. **Key Processing** → View Controller
3. **Jamo Processing** → Jamo Processor
4. **Text Output** → Text Document Proxy

## Development

### Project Structure
```
KoreanArchaicKeyboard/
├── KoreanArchaicKeyboardViewController.swift  # Main controller
├── KoreanJamoProcessor.swift                  # Jamo processing logic
├── KoreanArchaicKeyboard.swift                # Keyboard UI
├── Info.plist                                 # Extension configuration
└── KoreanArchaicKeyboard.xcodeproj/          # Xcode project
```

### Adding New Archaic Characters

1. **Update JamoProcessor.swift**
   ```swift
   // Add to initializeArchaicMappings()
   shiftCombinations["NEW_KEY"] = "NEW_UNICODE"
   ```

2. **Update keyboard layout** if needed
3. **Test thoroughly** with various input combinations

### Customization

#### **Keyboard Layout**
- Modify `KoreanArchaicKeyboardView.swift`
- Update key arrays in `createKeyRow()` methods
- Adjust button styling in `createKeyButton()`

#### **Input Methods**
- Extend `KoreanJamoProcessor.swift`
- Add new combination types
- Update processing logic in view controller

#### **Visual Design**
- Customize colors, fonts, and spacing
- Add custom button backgrounds
- Implement custom animations

## Testing

### Unit Tests
- Test jamo processing logic
- Verify archaic character mappings
- Validate input combination detection

### Integration Tests
- Test keyboard extension functionality
- Verify text insertion in various apps
- Test mode switching and state management

### User Testing
- Test on different iOS devices
- Verify accessibility features
- Test with various Korean text input scenarios

## Contributing

### Development Guidelines
- Follow Swift style guidelines
- Add comprehensive comments
- Include unit tests for new features
- Update documentation for changes

### Code Review Process
1. Create feature branch
2. Implement changes with tests
3. Submit pull request
4. Address review feedback
5. Merge after approval

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Korean linguistics research community** for character mappings
- **Unicode Consortium** for Korean character standards
- **Apple** for iOS Keyboard Extension framework
- **Contributors** who have helped improve this project

## Support

### Issues and Bug Reports
- Use GitHub Issues for bug reports
- Include device information and iOS version
- Provide steps to reproduce the issue

### Feature Requests
- Submit feature requests via GitHub Issues
- Include use case and expected behavior
- Consider implementation complexity

### Community
- Join discussions in GitHub Discussions
- Share tips and usage examples
- Help other users with questions

---

**Korean Archaic Keyboard** - Bringing the beauty of 옛한글 to modern iOS devices.
