# Korean Keyboard - Bugs & Issues Tracking

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Status:** Active Development

## 🚨 Critical Issues

### 1. Final Jamo Composition Failure
**Priority:** High  
**Status:** Open  
**Description:** Keyboard handles initial + medial correctly, but fails with initial + medial + final. The final consonant becomes the initial for the next syllable block.

**Expected Behavior:**
- `ㅅㅗㅎ` should compose to `솧` (one syllable block)
- Final consonant should complete the current syllable

**Actual Behavior:**
- `ㅅㅗㅎ` results in `솗ㅎ` or similar incorrect composition
- Final consonant `ㅎ` becomes initial for next block
- Syllable composition is broken for 3-character sequences

**Technical Details:**
- Issue in `processKoreanInput` function logic
- Problem likely in consonant handling when `currentSyllable.final` exists
- May be related to Unicode composition algorithm
- Affects all final consonants, not just specific ones

**Test Cases:**
- `ㅅㅗㅎ` → should be `솧`
- `ㄱㅏㄴ` → should be `간`
- `ㅂㅏㅁ` → should be `밤`

---

## 🔧 Major Issues

### 3. Complex Medial Jamo Not Supported
**Priority:** Medium  
**Status:** Open  
**Description:** App can handle simple initial + medial combinations, but fails with complex medial vowels (diphthongs).

**Expected Behavior:**
- `ㅅㅗㅏ` should compose to `솨` (complex medial)
- Complex vowels like `ㅘ`, `ㅙ`, `ㅚ`, `ㅝ`, `ㅞ`, `ㅟ`, `ㅢ` should work

**Actual Behavior:**
- Complex medials are not properly composed
- Results in separate characters instead of single syllable
- May be treating complex vowels as separate inputs

**Technical Details:**
- Issue likely in `MEDIAL_VOWELS` Unicode mapping
- Complex vowels have different Unicode ranges
- May need special handling for diphthong composition

**Test Cases:**
- `ㅅㅗㅏ` → should be `솨`
- `ㄱㅗㅏ` → should be `과`
- `ㅂㅜㅓ` → should be `붜`

---

### 4. Variant Popup Positioning
**Priority:** Medium  
**Status:** Open  
**Description:** Long-press variant popup has correct height relative to the pressed key, but is positioned too far to the right.

**Expected Behavior:**
- Popup should appear directly above the pressed key
- Centered horizontally over the key
- Close proximity for easy selection

**Actual Behavior:**
- Popup appears too far to the right of the key
- Horizontal positioning is incorrect
- Makes variant selection difficult

**Technical Details:**
- Issue in `showArchaicPopup` function in `KoreanKeyboard.tsx`
- `calculatedLeft` calculation is incorrect
- May be related to `popupWidth` calculation
- Affects all variant popups (consonants and vowels)

**Code Location:**
```typescript
// In KoreanKeyboard.tsx - showArchaicPopup function
const calculatedLeft = rect.left + (rect.width / 2) - (popupWidth / 2)
```

---

## 🏛️ Archaic Jamo Issues

### 5. Archaic Jamo Block Composition
**Priority:** Medium  
**Status:** Open  
**Description:** Archaic jamo characters are incorrectly mapped and/or not mapped at all to compose syllabic blocks.

**Expected Behavior:**
- Archaic characters should compose into syllable blocks
- `ㅿㅏㄴ` should compose to `ᅀᅡᆫ`
- Historical Korean characters should work like modern ones

**Actual Behavior:**
- Archaic characters don't compose properly
- May result in Chinese characters or incorrect mappings
- Unicode composition fails for historical jamo

**Technical Details:**
- Issue in `ARCHAIC_INITIAL_CONSONANTS` mapping
- May be related to Unicode range validation in `composeSyllable`
- Range `0x1100-0x1116` may not include all archaic characters
- Need to investigate Microsoft Old Hangul IME approach

**Investigation Needed:**
- Research Microsoft Old Hangul IME implementation
- Check Unicode ranges for archaic characters
- Verify composition algorithm for historical jamo

---

## 🔍 Research & Investigation

### 6. Microsoft Old Hangul IME Analysis
**Priority:** Low  
**Status:** Research  
**Description:** Need to investigate how Microsoft Old Hangul IME handles archaic jamo composition.

**Research Goals:**
- Understand Microsoft's approach to archaic character composition
- Learn how they map jamo keys to compose blocks with archaic jamo
- Identify best practices for historical Korean character input

**Resources:**
- [Microsoft Old Hangul IME Documentation](https://learn.microsoft.com/en-us/globalization/input/korean-ime#using-the-microsoft-old-hangul-ime-for-historical-jamo)
- [Microsoft Globalization GitHub](https://github.com/MicrosoftDocs/globalization/blob/main/globalization/input/korean-ime.md)
- Unicode standards for Hangul Jamo
- Korean language computing standards

**Expected Outcomes:**
- Improved archaic character support
- Better Unicode mapping strategy
- Enhanced composition algorithm

---

## 📊 Issue Summary

| Issue | Priority | Status | Complexity | Impact |
|-------|----------|--------|------------|---------|
| Final Jamo Composition | High | Open | Medium | High |
| Complex Medial Jamo | Medium | Open | Medium | Medium |
| Variant Popup Position | Medium | Open | Low | Low |
| Archaic Jamo Blocks | Medium | Open | High | Medium |
| Microsoft IME Research | Low | Research | High | Low |

## 🎯 Next Steps

1. **Immediate (This Week):**
   - Debug final jamo composition with detailed logging
   - Test and verify all reported issues
   - Fix final jamo composition logic

2. **Short Term (Next 2 Weeks):**
   - Correct variant popup positioning
   - Implement complex medial jamo support
   - Test composition with various Korean input scenarios

3. **Medium Term (Next Month):**
   - Research Microsoft Old Hangul IME
   - Implement proper archaic jamo composition
   - Comprehensive testing of all Korean input scenarios

4. **Long Term (Future):**
   - Full archaic character support
   - Advanced Korean input features
   - Performance optimization

## 🧪 Testing Strategy

### Test Cases for Each Issue

**Final Jamo Composition:**
- `ㅅㅗㅎ` → `솧`
- `ㄱㅏㄴ` → `간`
- `ㅂㅏㅁ` → `밤`
- `ㅈㅏㅇ` → `장`

**Complex Medial Jamo:**
- `ㅅㅗㅏ` → `솨`
- `ㄱㅗㅏ` → `과`
- `ㅂㅜㅓ` → `붜`
- `ㅁㅜㅣ` → `뮈`

**Archaic Jamo:**
- `ㅿㅏㄴ` → `ᅀᅡᆫ`
- `ㆍㅏㄴ` → `ᅟᅡᆫ`
- `ㅸㅏㄴ` → `ᅘᅡᆫ`

## 📝 Notes

- All issues should be tested across different browsers
- Unicode composition algorithm needs thorough review
- Consider implementing a test suite for Korean input scenarios
- Console logging is working correctly (user had console filter set to 'errors' only)

---

**Document Maintainer:** Development Team  
**Review Cycle:** Weekly during active development  
**Last Review:** December 2024
