# Korean Keyboard with Archaic Jamo Support - Technical Specification

## Overview

A keyboard application that enables typing in Korean with support for archaic Korean jamo/letters (옛한글) using the Microsoft Old Hangul keyboard mapping system. The application will handle both modern Korean input and archaic character composition, automatically mapping input sequences to appropriate Unicode syllabic blocks based on character positioning rules.

## Core Features

### 1. Archaic Korean Letters Support
The keyboard will support the following archaic Korean letters following the Microsoft Old Hangul keyboard standard:
- **ㆍ** (아래아) - archaic vowel
- **ㅿ** (반시옷) - archaic consonant
- **ㆆ** (여린히읗) - archaic consonant  
- **ㅸ** (쌍비읍) - archaic consonant
- **ᄔ** (쌍니은) - archaic consonant
- **ᅇ** (쌍이응) - archaic consonant
- **ᄙ** (쌍리을) - archaic consonant
- **ᄼ, ᄾ, ᅎ, ᅐ, ᅔ, ᅕ** (반치읓 series) - archaic consonants
- **ᅀ, ᅙ, ᆞ** (additional variants) - archaic characters

### 2. Syllabic Block Composition
The application will algorithmically compose syllabic blocks from individual jamo input:
- Input: `ㆆㆍㄴ` → Output: `ᅙᆞᆫ`
- Input: `ㅸㅏㄴ` → Output: `ᄫᅡᆫ`
- Input: `ㅿㅡㄹ` → Output: `ᅀᅳᆯ`

### 3. Position-Aware Mapping
The system will automatically determine character positioning:
- **Initial position** (초성): First consonant in a syllable
- **Medial position** (중성): Vowel in a syllable  
- **Final position** (종성): Final consonant in a syllable

## Technical Architecture

### Platform Support
1. **Phase 1**: Windows Keyboard Extension
2. **Phase 2**: Mobile Applications (iOS & Android)
3. **Phase 3**: Web-based Input Method (browser extension)

### Windows Implementation

#### Input Method Framework
- **Technology**: Windows Text Services Framework (TSF)
- **Language**: C++ with COM interfaces
- **Architecture**: IME (Input Method Editor) component

#### Key Mapping System - Microsoft Old Hangul Keyboard
```
Archaic Letter Input Combinations:
ㆍ = [AltGr] + [A] (아래아)
ㅿ = [AltGr] + [S] (반시옷)
ㆆ = [AltGr] + [H] (여린히읗)
ㅸ = [AltGr] + [B] (쌍비읍)
ᄔ = [AltGr] + [N] (쌍니은)
ᅇ = [AltGr] + [O] (쌍이응)
ᄙ = [AltGr] + [L] (쌍리을)
ᄼ = [AltGr] + [K] (반치읓)
ᄾ = [AltGr] + [T] (반치읓)
ᅎ = [AltGr] + [C] (반치읓)
ᅐ = [AltGr] + [P] (반치읓)
ᅔ = [AltGr] + [U] (반치읓)
ᅕ = [AltGr] + [W] (반치읓)

Additional Combinations:
ᅀ = [AltGr] + [Shift] + [M] (반시옷)
ᅙ = [AltGr] + [Shift] + [H] (여린히읗)
ᆞ = [AltGr] + [Shift] + [A] (아래아)
```

### Mobile Implementation

#### iOS (Phase 2)
- **Framework**: UIKit with Custom Keyboard Extension
- **Language**: Swift
- **Input Method**: Custom keyboard extension
- **Long-press behavior**: Show archaic letter options on long-press of modern equivalents

#### Android (Phase 2)  
- **Framework**: Android Input Method Service (IMS)
- **Language**: Kotlin/Java
- **Input Method**: Custom IME
- **Long-press behavior**: Popup menu with archaic letter variants

## Detailed Technical Specifications

### Unicode Mapping Rules

#### Initial Consonants (초성)
- Modern: ㄱ(1100), ㄴ(1102), ㄷ(1103), ㄹ(1105), ㅁ(1106), ㅂ(1107), ㅅ(1109), ㅇ(110B), ㅈ(110C), ㅊ(110E), ㅋ(110F), ㅌ(1110), ㅍ(1111), ㅎ(1112)
- Archaic: ㅸ(1170), ㅿ(113F), ㆆ(1146)

#### Medial Vowels (중성)
- Modern: ㅏ(1161), ㅐ(1162), ㅑ(1163), ㅒ(1164), ㅓ(1165), ㅔ(1166), ㅕ(1167), ㅖ(1168), ㅗ(1169), ㅘ(116A), ㅙ(116B), ㅚ(116C), ㅛ(116D), ㅜ(116E), ㅝ(116F), ㅞ(1170), ㅟ(1171), ㅠ(1172), ㅡ(1173), ㅢ(1174), ㅣ(1175)
- Archaic: ㆍ(1197)

#### Final Consonants (종성)
- Modern: ㄱ(11A8), ㄴ(11AB), ㄷ(11AE), ㄹ(11AF), ㅁ(11B7), ㅂ(11B8), ㅅ(11BA), ㅇ(11BC), ㅈ(11BD), ㅊ(11C0), ㅋ(11C1), ㅌ(11C2), ㅍ(11C3), ㅎ(11C6)
- Archaic: ㅸ(11B9), ㅿ(11BF), ㆆ(11C7)

### Syllabic Block Composition Algorithm

#### Step 1: Input Parsing
1. Parse input string into individual jamo characters
2. Identify character type (consonant/vowel)
3. Determine intended position based on sequence

#### Step 2: Position Assignment
1. First consonant → Initial position
2. Vowel → Medial position  
3. Second consonant → Final position
4. Validate position assignments

#### Step 3: Unicode Calculation
```cpp
uint32_t calculateSyllable(uint32_t initial, uint32_t medial, uint32_t final) {
    // Base syllable: AC00 (가)
    uint32_t base = 0xAC00;
    
    // Calculate offsets
    uint32_t initialOffset = (initial - 0x1100) * 21 * 28;
    uint32_t medialOffset = (medial - 0x1161) * 28;
    uint32_t finalOffset = final - 0x11A7;
    
    return base + initialOffset + medialOffset + finalOffset;
}
```

### User Interface Specifications

#### Windows Keyboard Layout
- **Default Mode**: Standard Korean input
- **Archaic Mode**: Toggle with [Fn] + [Space] or [Ctrl] + [Alt] + [A]
- **Visual Indicators**: Status bar showing current mode
- **Input Preview**: Show composed syllable before insertion

#### Mobile Interface
- **Long-press Duration**: 300ms to show archaic variants
- **Popup Layout**: 3x2 grid showing modern + archaic options
- **Swipe Gestures**: Swipe up on key for archaic variants
- **Haptic Feedback**: Tactile response for mode changes

### Configuration Options

#### User Preferences
- **Modifier Key**: Customizable (Fn, Ctrl+Alt, Right Alt, etc.)
- **Input Mode**: Toggle between modern-only and archaic-enabled
- **Composition Style**: Immediate vs. delayed composition
- **Visual Feedback**: Enable/disable input preview

#### Keyboard Layout Customization
- **Key Mapping**: User-defined archaic letter assignments
- **Shortcuts**: Custom keyboard shortcuts for common archaic sequences
- **Auto-completion**: Smart suggestions for archaic character combinations

## Development Phases

### Phase 1: Windows Keyboard Extension (Months 1-3)
- [ ] Windows TSF implementation
- [ ] Basic archaic letter input
- [ ] Syllabic composition algorithm
- [ ] User interface and configuration
- [ ] Testing and debugging

### Phase 2: Mobile Applications (Months 4-6)
- [ ] iOS keyboard extension
- [ ] Android IME implementation
- [ ] Long-press functionality
- [ ] Cross-platform consistency

### Phase 3: Advanced Features (Months 7-9)
- [ ] Web browser extension
- [ ] Advanced composition rules
- [ ] User dictionary and learning
- [ ] Performance optimization

## Testing Strategy

### Unit Testing
- Jamo parsing and validation
- Unicode composition algorithm
- Position assignment logic
- Key mapping functionality

### Integration Testing
- Windows TSF integration
- Mobile keyboard extensions
- Cross-platform compatibility
- Performance under load

### User Acceptance Testing
- Typing speed and accuracy
- User interface usability
- Configuration flexibility
- Error handling and recovery

## Performance Requirements

### Response Time
- **Key Input**: < 50ms latency
- **Composition**: < 100ms for syllabic blocks
- **Mode Switching**: < 200ms

### Memory Usage
- **Windows Extension**: < 10MB RAM
- **Mobile Apps**: < 15MB RAM
- **Dictionary**: < 5MB for user data

### Compatibility
- **Windows**: Windows 10/11 (64-bit)
- **iOS**: iOS 14.0+
- **Android**: Android 8.0+ (API 26+)

## Security Considerations

### Input Validation
- Sanitize all user input
- Validate Unicode ranges
- Prevent buffer overflow attacks

### Privacy
- No data collection without consent
- Local storage for user preferences
- Optional cloud sync with encryption

## References

- [Hangul Jamo Unicode Block](https://en.wikipedia.org/wiki/Hangul_Jamo_(Unicode_block))
- [Korean Language and Computers](https://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_in_Unicode)
- [Windows Text Services Framework](https://docs.microsoft.com/en-us/windows/win32/tsf/text-services-framework)
- [Unicode Hangul Syllables](https://www.unicode.org/charts/PDF/UAC00.pdf)
- [Korean Input Method Standards](https://www.unicode.org/reports/tr11/)