# Korean Keyboard PWA

A Progressive Web App (PWA) notetaking application with a built-in Korean keyboard that supports archaic Korean letters (옛한글). The app features a Dubeolsik (두벌식; 2-set) keyboard layout with long-press functionality to access archaic character variants.

## Features

### 🎯 **Korean Keyboard with Archaic Letters**
- **Dubeolsik Layout**: Standard Korean keyboard layout based on the 2-set system
- **Long-press Support**: Hold down keys to access archaic character variants
- **Syllable Composition**: Automatic composition of Korean syllable blocks
- **Complex Medials & Finals**: Support for diphthongs and consonant clusters
- **Archaic Letters**: Support for 16+ archaic Korean characters including:
  - ㅸ (쌍비읍), ㅿ (반시옷), ㆆ (여린히읗)
  - ᅎ, ᅏ, ᅐ, ᅑ (반치읓 series)
  - ᄔ (쌍니은), ᅇ (쌍이응), ᄙ (쌍리을)
  - And more...
- **Future Features**: Hanja conversion

### 📝 **Notetaking Features**
- **Rich Text Editor**: Full-featured text editor with Korean input support
- **Note Management**: Create, edit, save, and delete notes
- **Auto-save**: Automatic saving of notes with 2-second debounce
- **Local Storage**: All notes stored locally in browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Bug-free Deletion**: Proper note deletion without saving deleted notes

### 📱 **Progressive Web App**
- **Offline Support**: Works without internet connection
- **Installable**: Can be installed as a native app on any device
- **Fast Loading**: Optimized for quick startup and smooth performance
- **Cross-platform**: Works on Windows, macOS, Linux, iOS, and Android
- **GitHub Pages Deployment**: Automatic deployment with GitHub Actions

## Keyboard Layout

The keyboard follows the standard Dubeolsik layout:

```
Row 1: ㅿ ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ
Row 2: ㆆ ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ㆍ
Row 3: ⇧ ㆁ ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ ⌫
Row 4: 123 😊 스페이스 ↵
```

### Long-press Character Variants

Hold down any key to see available variants:

- **ㅂ**: ㅂ ㅃ ㅸ ㅹ
- **ㅈ**: ㅈ ㅉ ᅎ ᅏ ᅐ ᅑ
- **ㄷ**: ㄷ ㄸ
- **ㄱ**: ㄱ ㄲ
- **ㅅ**: ㅅ ㅆ
- **ㅊ**: ㅊ ᄼ ᄾ
- And more...

## Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:escowin/archaic-korean-keyboard.git
   cd archaic-korean-keyboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   - Copy the `dist/` folder to your web server
   - Ensure HTTPS is enabled for PWA functionality

### PWA Installation

1. **On Desktop**:
   - Open the app in Chrome, Edge, or Firefox
   - Click the install button in the address bar
   - Or use the browser menu: "Install Korean Keyboard PWA"

2. **On Mobile**:
   - Open the app in Safari (iOS) or Chrome (Android)
   - Tap "Add to Home Screen" when prompted
   - Or use the browser menu: "Add to Home Screen"

## Usage

### Basic Notetaking

1. **Create a new note**: Click the "New Note" button
2. **Edit title**: Click on the title field and type
3. **Write content**: Use the text area to write your notes
4. **Save**: Notes are automatically saved, or click "Save" manually
5. **Delete**: Click "Delete" to remove a note

### Korean Input

1. **Standard Korean**: Type normally using the keyboard
2. **Variant Letters**: 
   - Hold down any key for 500ms to see variants
   - Tap the desired archaic character
   - Characters automatically compose into syllables
3. **Syllable Composition**: The app automatically combines jamo into proper Korean syllables

### Keyboard Controls

- **⇧**: Shift key for accessing shifted characters and archaic variants
- **⌫**: Backspace to delete characters
- **스페이스**: Insert space
- **↵**: Insert newline
- **123**: Switch to numbers/symbols (planned feature)
- **😊**: Hanja conversion (planned feature - may replace emoji)
- **Hide/Show Keyboard**: Toggle keyboard visibility

## Technical Details

### Architecture

- **Frontend**: React 19.2.0 with TypeScript 5.9.3
- **Build Tool**: Vite 5.0.0 for fast development and optimized builds
- **PWA**: Service Worker for offline functionality
- **Storage**: LocalStorage for note persistence
- **Styling**: CSS with custom properties and utility classes
- **Deployment**: GitHub Pages with GitHub Actions CI/CD

### Korean Input Processing

The app implements a sophisticated Korean input system:

1. **Jamo Recognition**: Identifies consonants and vowels
2. **Position Detection**: Determines initial, medial, and final positions
3. **Syllable Composition**: Uses Unicode algorithms to compose syllables
4. **Complex Medials**: Supports diphthongs (ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ)
5. **Complex Finals**: Supports consonant clusters (ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, etc.)
6. **Archaic Support**: Maps archaic characters to proper Unicode ranges
7. **Final-to-Initial Transition**: Properly handles final consonants becoming initials

### Unicode Support

- **Initial Consonants**: 0x1100-0x1112, 0x113F, 0x1146, 0x114E-0x1151, 0x1155, 0x1170
- **Medial Vowels**: 0x1161-0x1175, 0x1197
- **Final Consonants**: 0x11A8-0x11C7
- **Syllable Blocks**: 0xAC00-0xD7AF

## Browser Support

- **Chrome**: 88+ (recommended)
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 8+

## Development

### Project Structure

```
korean-keyboard/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── favicon.svg            # App icon
├── src/
│   ├── components/
│   │   └── KoreanKeyboard.tsx # Keyboard component
│   ├── utils/
│   │   ├── koreanKeyboard.ts  # Main Korean input utilities
│   │   ├── unicode.ts         # Unicode mappings and conversions
│   │   ├── keyboardLayout.ts  # Keyboard layout and variants
│   │   ├── composition.ts     # Syllable composition logic
│   │   └── inputProcessor.ts  # Input processing pipeline
│   ├── types/
│   │   └── korean.ts          # TypeScript type definitions
│   ├── styles/
│   │   ├── main.css           # Base styles
│   │   ├── keyboard.css       # Keyboard styles
│   │   └── noteapp.css        # App styles
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point
├── docs/
│   ├── development-plan.md    # Development roadmap
│   └── bugs-issues.md         # Issue tracking
├── package.json
├── vite.config.mjs
├── tsconfig.json
└── README.md
```

### Adding New Features

1. **New Archaic Characters**:
   - Add to `VARIANT_MAPPINGS` in `keyboardLayout.ts`
   - Update Unicode ranges in `unicode.ts`
   - Test composition logic

2. **Keyboard Layout Changes**:
   - Modify `KEYBOARD_LAYOUT` in `keyboardLayout.ts`
   - Update CSS styles in `keyboard.css`
   - Test responsive design

3. **New App Features**:
   - Add components in `src/components/`
   - Update styles in `src/styles/`
   - Modify `App.tsx` for integration

4. **Future Features**:
   - **123 Button**: Implement number/symbol input modes
   - **Hanja Conversion**: Replace emoji button with Hanja functionality
   - **Middle Korean**: Implement Hunminjeongeum-style input system

### Code Style

- **TypeScript**: Strict type checking with comprehensive interfaces
- **React**: Functional components with hooks
- **CSS**: Utility-first approach with custom properties
- **Naming**: BEM methodology for CSS classes
- **Comments**: Comprehensive documentation for Korean input logic

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes with tests
4. Commit: `git commit -m 'Add new feature'`
5. Push: `git push origin feature/new-feature`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Korean linguistics community** for character mappings and standards
- **Unicode Consortium** for Korean character specifications
- **Wikipedia** for comprehensive Hangul documentation
- **Contributors** who help improve this project

## Support

### Issues and Bug Reports
- Use GitHub Issues for bug reports
- Include browser information and steps to reproduce
- Provide screenshots for UI issues

### Feature Requests
- Submit feature requests via GitHub Issues
- Include use case and expected behavior
- Consider implementation complexity

### Community
- Join discussions in GitHub Discussions
- Share tips and usage examples
- Help other users with questions

---

**Korean Keyboard PWA** - Bringing the beauty of 옛한글 to modern web applications.

*Last updated: December 2024*