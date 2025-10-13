/**
 * Korean Unicode Utilities
 * Handles Unicode ranges, mappings, and character type detection
 */

import type { KoreanUnicodeRanges } from '../types/korean.js';

// Mapping from final consonants to their corresponding initial consonants
export const FINAL_TO_INITIAL_MAPPING: { [key: string]: string } = {
  [String.fromCharCode(0x11A8)]: String.fromCharCode(0x1100), // ᆨ → ᄀ (ㄱ)
  [String.fromCharCode(0x11B0)]: String.fromCharCode(0x1100), // ᆰ → ᄀ (ㄱ)
  [String.fromCharCode(0x11A9)]: String.fromCharCode(0x1101), // ᆩ → ᄁ (ㄲ)
  [String.fromCharCode(0x11AB)]: String.fromCharCode(0x1102), // ᆫ → ᄂ (ㄴ)
  [String.fromCharCode(0x11AE)]: String.fromCharCode(0x1103), // ᆮ → ᄃ (ㄷ)
  [String.fromCharCode(0xD7CD)]: String.fromCharCode(0x1103), // ퟍ → ᄃ (ㄷ)
  [String.fromCharCode(0x11AF)]: String.fromCharCode(0x1105), // ᆯ → ᄅ (ㄹ)
  [String.fromCharCode(0x11B7)]: String.fromCharCode(0x1106), // ᆷ → ᄆ (ㅁ)
  [String.fromCharCode(0x11B1)]: String.fromCharCode(0x1106), // ᆱ → ᄆ (ㅁ)
  [String.fromCharCode(0x11B8)]: String.fromCharCode(0x1107), // ᆸ → ᄇ (ㅂ)
  [String.fromCharCode(0x11B2)]: String.fromCharCode(0x1107), // ᆲ → ᄇ (ㅂ)
  [String.fromCharCode(0xD7E6)]: String.fromCharCode(0x1107), // ퟦ → ᄇ (ㅂ)
  [String.fromCharCode(0x11BA)]: String.fromCharCode(0x1109), // ᆺ → ᄉ (ㅅ)
  [String.fromCharCode(0x11AA)]: String.fromCharCode(0x1109), // ᆪ → ᄉ (ㅅ)
  [String.fromCharCode(0x11B3)]: String.fromCharCode(0x1109), // ᆳ → ᄉ (ㅅ)
  [String.fromCharCode(0x11B9)]: String.fromCharCode(0x1109), // ᆹ → ᄉ (ㅅ)
  [String.fromCharCode(0x11BB)]: String.fromCharCode(0x1109), // ᆻ → ᄉ (ㅅ)
  [String.fromCharCode(0x11BC)]: String.fromCharCode(0x110B), // ᆼ → ᄋ (ㅇ)
  [String.fromCharCode(0x11BD)]: String.fromCharCode(0x110C), // ᆽ → ᄌ (ㅈ)
  [String.fromCharCode(0x11AC)]: String.fromCharCode(0x110C), // ᆬ → ᄌ (ㅈ)
  [String.fromCharCode(0x11BE)]: String.fromCharCode(0x110E), // ᆾ → ᄎ (ㅊ)
  [String.fromCharCode(0x11BF)]: String.fromCharCode(0x110F), // ᆿ → ᄏ (ㅋ)
  [String.fromCharCode(0x11C0)]: String.fromCharCode(0x1110), // ᇀ → ᄐ (ㅌ)
  [String.fromCharCode(0x11B4)]: String.fromCharCode(0x1110), // ᆴ → ᄐ (ㅌ)
  [String.fromCharCode(0x11C1)]: String.fromCharCode(0x1111), // ᇁ → ᄑ (ㅍ)
  [String.fromCharCode(0x11B5)]: String.fromCharCode(0x1111), // ᆵ → ᄑ (ㅍ)
  [String.fromCharCode(0x11C2)]: String.fromCharCode(0x1112), // ᇂ → ᄒ (ㅎ)
  [String.fromCharCode(0x11AD)]: String.fromCharCode(0x1112), // ᆭ → ᄒ (ㅎ)
  [String.fromCharCode(0x11B6)]: String.fromCharCode(0x1112), // ᆶ → ᄒ (ㅎ)
}

// Mapping from Compatibility Jamo to Hangul Jamo Initial consonants
export const COMPATIBILITY_TO_HANGUL_JAMO_INITIAL: { [key: string]: string } = {
  // Regular initial consonants
  [String.fromCharCode(0x3131)]: String.fromCharCode(0x1100), // ㄱ → ᄀ
  [String.fromCharCode(0x3132)]: String.fromCharCode(0x1101), // ㄲ → ᄁ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x1102), // ㄴ → ᄂ
  [String.fromCharCode(0x3137)]: String.fromCharCode(0x1103), // ㄷ → ᄃ
  [String.fromCharCode(0x3138)]: String.fromCharCode(0x1104), // ㄸ → ᄄ
  [String.fromCharCode(0x3139)]: String.fromCharCode(0x1105), // ㄹ → ᄅ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x1106), // ㅁ → ᄆ
  [String.fromCharCode(0x3142)]: String.fromCharCode(0x1107), // ㅂ → ᄇ
  [String.fromCharCode(0x3143)]: String.fromCharCode(0x1108), // ㅃ → ᄈ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x1109), // ㅅ → ᄉ
  [String.fromCharCode(0x3146)]: String.fromCharCode(0x110A), // ㅆ → ᄊ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x110B), // ㅇ → ᄋ
  [String.fromCharCode(0x3148)]: String.fromCharCode(0x110C), // ㅈ → ᄌ
  [String.fromCharCode(0x3149)]: String.fromCharCode(0x110D), // ㅉ → ᄍ
  [String.fromCharCode(0x314A)]: String.fromCharCode(0x110E), // ㅊ → ᄎ
  [String.fromCharCode(0x314B)]: String.fromCharCode(0x110F), // ㅋ → ᄏ
  [String.fromCharCode(0x314C)]: String.fromCharCode(0x1110), // ㅌ → ᄐ
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x1111), // ㅍ → ᄑ
  [String.fromCharCode(0x314E)]: String.fromCharCode(0x1112), // ㅎ → ᄒ
  
  // Archaic initial consonants
  [String.fromCharCode(0x3165)]: String.fromCharCode(0x1114), // ㅥ → ᄔ
  [String.fromCharCode(0x3171)]: String.fromCharCode(0x111D), // ㅱ → ᄝ
  [String.fromCharCode(0x3178)]: String.fromCharCode(0x112B), // ㅸ → ᄫ
  [String.fromCharCode(0x3179)]: String.fromCharCode(0x112C), // ㅹ → ᄬ
  [String.fromCharCode(0x317F)]: String.fromCharCode(0x1140), // ㅿ → ᅀ
  [String.fromCharCode(0x3180)]: String.fromCharCode(0x1147), // ㆀ → ᅇ
  [String.fromCharCode(0x3181)]: String.fromCharCode(0x114C), // ㆁ → ᅌ
  [String.fromCharCode(0x3184)]: String.fromCharCode(0x1157), // ㆄ → ᅗ
  [String.fromCharCode(0x3185)]: String.fromCharCode(0x1158), // ㆅ → ᅘ
  [String.fromCharCode(0x3186)]: String.fromCharCode(0x1159), // ㆆ → ᅙ
}

// Mapping from Compatibility Jamo to Hangul Jamo Final consonants
export const COMPATIBILITY_TO_HANGUL_JAMO_FINAL: { [key: string]: string } = {
  // Regular final consonants
  [String.fromCharCode(0x3131)]: String.fromCharCode(0x11A8), // ㄱ → ᆨ
  [String.fromCharCode(0x3132)]: String.fromCharCode(0x11A9), // ㄲ → ᆩ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x11AB), // ㄴ → ᆫ
  [String.fromCharCode(0x3137)]: String.fromCharCode(0x11AE), // ㄷ → ᆮ
  [String.fromCharCode(0x3138)]: String.fromCharCode(0xD7CD), // ㄸ → ퟍ
  [String.fromCharCode(0x3139)]: String.fromCharCode(0x11AF), // ㄹ → ᆯ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x11B7), // ㅁ → ᆷ
  [String.fromCharCode(0x3142)]: String.fromCharCode(0x11B8), // ㅂ → ᆸ
  [String.fromCharCode(0x3143)]: String.fromCharCode(0xD7E6), // ㅃ → ퟦ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x11BA), // ㅅ → ᆺ
  [String.fromCharCode(0x3146)]: String.fromCharCode(0x11BB), // ㅆ → ᆻ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x11BC), // ㅇ → ᆼ
  [String.fromCharCode(0x3148)]: String.fromCharCode(0x11BD), // ㅈ → ᆽ
  [String.fromCharCode(0x3149)]: String.fromCharCode(0xD7F9), // ㅉ → ퟹ
  [String.fromCharCode(0x314A)]: String.fromCharCode(0x11BE), // ㅊ → ᆾ
  [String.fromCharCode(0x314B)]: String.fromCharCode(0x11BF), // ㅋ → ᆿ
  [String.fromCharCode(0x314C)]: String.fromCharCode(0x11C0), // ㅌ → ᇀ
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x11C1), // ㅍ → ᇁ
  [String.fromCharCode(0x314E)]: String.fromCharCode(0x11C2), // ㅎ → ᇂ
  
  // Archaic final consonants (only those that have final forms)
  [String.fromCharCode(0x3165)]: String.fromCharCode(0x11FF), // ㅥ → ᇿ
  [String.fromCharCode(0x3171)]: String.fromCharCode(0x11E2), // ㅱ → ᇢ
  [String.fromCharCode(0x3178)]: String.fromCharCode(0x11E6), // ㅸ → ᇦ
  [String.fromCharCode(0x317F)]: String.fromCharCode(0x11EB), // ㅿ → ᇫ
  [String.fromCharCode(0x3181)]: String.fromCharCode(0x11F0), // ㆁ → ᇰ
  [String.fromCharCode(0x3184)]: String.fromCharCode(0x11F4), // ㆄ → ᇴ
  [String.fromCharCode(0x3186)]: String.fromCharCode(0x11F9), // ㆆ → ᇹ
}

// Mapping from Compatibility Jamo to Hangul Jamo Vowels
export const COMPATIBILITY_TO_HANGUL_JAMO_VOWEL: { [key: string]: string } = {
  // Regular vowels
  [String.fromCharCode(0x314F)]: String.fromCharCode(0x1161), // ㅏ → ᅡ
  [String.fromCharCode(0x3150)]: String.fromCharCode(0x1162), // ㅐ → ᅢ
  [String.fromCharCode(0x3151)]: String.fromCharCode(0x1163), // ㅑ → ᅣ
  [String.fromCharCode(0x3152)]: String.fromCharCode(0x1164), // ㅒ → ᅤ
  [String.fromCharCode(0x3153)]: String.fromCharCode(0x1165), // ㅓ → ᅥ
  [String.fromCharCode(0x3154)]: String.fromCharCode(0x1166), // ㅔ → ᅦ
  [String.fromCharCode(0x3155)]: String.fromCharCode(0x1167), // ㅕ → ᅧ
  [String.fromCharCode(0x3156)]: String.fromCharCode(0x1168), // ㅖ → ᅨ
  [String.fromCharCode(0x3157)]: String.fromCharCode(0x1169), // ㅗ → ᅩ
  [String.fromCharCode(0x3158)]: String.fromCharCode(0x116A), // ㅘ → ᅪ
  [String.fromCharCode(0x3159)]: String.fromCharCode(0x116B), // ㅙ → ᅫ
  [String.fromCharCode(0x315A)]: String.fromCharCode(0x116C), // ㅚ → ᅬ
  [String.fromCharCode(0x315B)]: String.fromCharCode(0x116D), // ㅛ → ᅭ
  [String.fromCharCode(0x315C)]: String.fromCharCode(0x116E), // ㅜ → ᅮ
  [String.fromCharCode(0x315D)]: String.fromCharCode(0x116F), // ㅝ → ᅯ
  [String.fromCharCode(0x315E)]: String.fromCharCode(0x1170), // ㅞ → ᅰ
  [String.fromCharCode(0x315F)]: String.fromCharCode(0x1171), // ㅟ → ᅱ
  [String.fromCharCode(0x3160)]: String.fromCharCode(0x1172), // ㅠ → ᅲ
  [String.fromCharCode(0x3161)]: String.fromCharCode(0x1173), // ㅡ → ᅳ
  [String.fromCharCode(0x3162)]: String.fromCharCode(0x1174), // ㅢ → ᅴ
  [String.fromCharCode(0x3163)]: String.fromCharCode(0x1175), // ㅣ → ᅵ
  
  // Archaic vowels
  [String.fromCharCode(0x318D)]: String.fromCharCode(0x119E), // ㆍ → ᆞ
  [String.fromCharCode(0x318E)]: String.fromCharCode(0x11A1), // ㆎ → ᆡ
  
  // Archaic complex medials (precomposed forms)
  [String.fromCharCode(0xD7C5)]: String.fromCharCode(0xD7C5), // ퟅ → ퟅ (ㆍ + ㅏ)
  [String.fromCharCode(0x119F)]: String.fromCharCode(0x119F), // ᆟ → ᆟ (ㆍ + ㅓ)
  [String.fromCharCode(0xD7C6)]: String.fromCharCode(0xD7C6), // ퟆ → ퟆ (ㆍ + ㅔ)
  [String.fromCharCode(0x11A0)]: String.fromCharCode(0x11A0), // ᆠ → ᆠ (ㆍ + ㅜ)
  [String.fromCharCode(0x11A1)]: String.fromCharCode(0x11A1), // ᆡ → ᆡ (ㆍ + ㅣ)
}

// Unicode ranges for Korean characters
export const UNICODE_RANGES: KoreanUnicodeRanges = {
  // Initial consonants (초성) - Modern Korean only
  INITIAL_CONSONANTS: {
    'ㄱ': 0x1100, 'ㄲ': 0x1101, 'ㄴ': 0x1102, 'ㄷ': 0x1103, 'ㄸ': 0x1104,
    'ㄹ': 0x1105, 'ㅁ': 0x1106, 'ㅂ': 0x1107, 'ㅃ': 0x1108, 'ㅅ': 0x1109,
    'ㅆ': 0x110A, 'ㅇ': 0x110B, 'ㅈ': 0x110C, 'ㅉ': 0x110D, 'ㅊ': 0x110E,
    'ㅋ': 0x110F, 'ㅌ': 0x1110, 'ㅍ': 0x1111, 'ㅎ': 0x1112
  },
  
  // Archaic initial consonants (some can be used in syllable composition)
  ARCHAIC_INITIAL_CONSONANTS: {
    'ㅥ': 0x1114, 'ᄙ': 0x1119, 'ㅱ': 0x111D, 'ㅸ': 0x112B, 'ㅹ': 0x112C, 
    'ᄼ': 0x113C, 'ᄽ': 0x113D, 'ᄾ': 0x113E, 'ᄿ': 0x113F, 'ㅿ': 0x1140, 
    'ㆀ': 0x1147, 'ㆁ': 0x114C, 'ᅎ': 0x114E, 'ᅏ': 0x114F, 'ᅐ': 0x1150, 
    'ᅑ': 0x1151, 'ᅔ': 0x1154, 'ᅕ': 0x1155, 'ㆄ': 0x1157, 'ㆅ': 0x1158, 
    'ㆆ': 0x1159, 'ꥼ': 0xA97C
  },
  
  // Medial vowels (중성)
  MEDIAL_VOWELS: {
    'ㅏ': 0x1161, 'ㅐ': 0x1162, 'ㅑ': 0x1163, 'ㅒ': 0x1164, 'ㅓ': 0x1165,
    'ㅔ': 0x1166, 'ㅕ': 0x1167, 'ㅖ': 0x1168, 'ㅗ': 0x1169, 'ㅘ': 0x116A,
    'ㅙ': 0x116B, 'ㅚ': 0x116C, 'ㅛ': 0x116D, 'ㅜ': 0x116E, 'ㅝ': 0x116F,
    'ㅞ': 0x1170, 'ㅟ': 0x1171, 'ㅠ': 0x1172, 'ㅡ': 0x1173, 'ㅢ': 0x1174,
    'ㅣ': 0x1175, 'ㆍ': 0x1196, 'ᆢ': 0x11A2, 'ퟅ': 0xD7C5, 'ᆟ': 0x119F,
    'ퟆ': 0xD7C6, 'ᆠ': 0x11A0, 'ᆡ': 0x11A1
  },
  
  // Final consonants (종성) - Correct Unicode mappings
  FINAL_CONSONANTS: {
    'ㄱ': 0x11A8, 'ㄲ': 0x11A9, 'ㄳ': 0x11AA, 'ㄴ': 0x11AB, 'ㄵ': 0x11AC,
    'ㄶ': 0x11AD, 'ㄷ': 0x11AE, 'ㄸ': 0x11AE, 'ㄹ': 0x11AF, 'ㄺ': 0x11B0, 
    'ㄻ': 0x11B1, 'ㄼ': 0x11B2, 'ㄽ': 0x11B3, 'ㄾ': 0x11B4, 'ㄿ': 0x11B5, 
    'ㅀ': 0x11B6, 'ㅁ': 0x11B7, 'ㅂ': 0x11B8, 'ㅃ': 0x11B8, 'ㅄ': 0x11B9, 
    'ㅅ': 0x11BA, 'ㅆ': 0x11BB, 'ㅇ': 0x11BC, 'ㅈ': 0x11BD, 'ㅉ': 0x11BD, 
    'ㅊ': 0x11BE, 'ㅋ': 0x11BF, 'ㅌ': 0x11C0, 'ㅍ': 0x11C1, 'ㅎ': 0x11C2,

    // Archaic finals: note, not every archaic jamo has a final position
    'ㅥ': 0x11FF, 'ㅱ': 0x11E2, 'ㅸ': 0x11E6, 'ㅿ': 0x11EB, 'ㆁ': 0x11F0, 
    'ㆄ': 0x11F4, 'ㆆ': 0x11C2,
  }
}

/**
 * Convert a final consonant to its corresponding initial consonant
 * @param finalConsonant - Final consonant character
 * @returns Corresponding initial consonant or the original character if no mapping exists
 */
export function convertFinalToInitial(finalConsonant: string): string {
  const initialConsonant = FINAL_TO_INITIAL_MAPPING[finalConsonant]
  if (initialConsonant) {
    console.log(`🔄 Converting final "${finalConsonant}" to initial "${initialConsonant}"`)
    return initialConsonant
  }
  console.log(`⚠️ No mapping found for final consonant "${finalConsonant}", using as-is`)
  return finalConsonant
}

/**
 * Convert Compatibility Jamo to Hangul Jamo based on context
 * @param char - Compatibility Jamo character
 * @param context - Current syllable context: 'initial', 'final', or 'auto'
 * @returns Hangul Jamo character in the appropriate form
 */
export function convertCompatibilityToHangulJamoByContext(char: string, context: 'initial' | 'final' | 'auto' = 'auto'): string {
  // Check if it's a consonant
  if (char in COMPATIBILITY_TO_HANGUL_JAMO_INITIAL || char in COMPATIBILITY_TO_HANGUL_JAMO_FINAL) {
    if (context === 'initial') {
      return COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char] || char
    } else if (context === 'final') {
      return COMPATIBILITY_TO_HANGUL_JAMO_FINAL[char] || char
    } else {
      // Auto context: default to initial for consonants
      return COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char] || char
    }
  }
  
  // Check if it's a vowel
  if (char in COMPATIBILITY_TO_HANGUL_JAMO_VOWEL) {
    return COMPATIBILITY_TO_HANGUL_JAMO_VOWEL[char]
  }
  
  // Return as-is if no mapping found
  return char
}


/**
 * Check if a character is a Korean consonant (modern or archaic)
 * @param char - Character to check
 * @returns Whether the character is a Korean consonant
 */
export function isConsonant(char: string): boolean {
  // Check if it's a Compatibility Jamo consonant
  if (char in UNICODE_RANGES.INITIAL_CONSONANTS || 
      char in UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS ||
      char in UNICODE_RANGES.FINAL_CONSONANTS) {
    return true
  }
  
  // Check if it's a Hangul Jamo consonant (U+1100-U+11FF)
  const code = char.charCodeAt(0)
  return (code >= 0x1100 && code <= 0x1112) || // Initial consonants
         (code >= 0x1114 && code <= 0x1159) || // Archaic initial consonants  
         (code >= 0x11A8 && code <= 0x11C2) || // Final consonants
         (code >= 0x11E2 && code <= 0x11FF)    // Archaic final consonants
}

/**
 * Check if a character is a modern Korean consonant (can be used in syllable composition)
 * @param char - Character to check
 * @returns Whether the character is a modern Korean consonant
 */
export function isModernConsonant(char: string): boolean {
  return char in UNICODE_RANGES.INITIAL_CONSONANTS
}

/**
 * Check if a character is a Korean vowel
 * @param char - Character to check
 * @returns Whether the character is a Korean vowel
 */
export function isVowel(char: string): boolean {
  // Check if it's a Compatibility Jamo vowel
  if (char in UNICODE_RANGES.MEDIAL_VOWELS) {
    return true
  }
  
  // Check if it's a Hangul Jamo vowel (U+1161-U+1175, U+119E-U+11A2)
  const code = char.charCodeAt(0)
  return (code >= 0x1161 && code <= 0x1175) || // Regular medial vowels
         (code >= 0x119E && code <= 0x11A2) || // Archaic medial vowels
         (code >= 0xD7C5 && code <= 0xD7C6)    // Extended archaic vowels
}

/**
 * Check if a character is a composed Hangul syllable
 * @param char - Character to check
 * @returns True if the character is a composed Hangul syllable
 */
export function isComposedHangulSyllable(char: string): boolean {
  const code = char.charCodeAt(0)
  // Hangul Syllables range: 0xAC00-0xD7AF
  return code >= 0xAC00 && code <= 0xD7AF
}

/**
 * Get the Unicode code for an initial consonant
 * @param char - Jamo character
 * @returns Unicode code or null if not found
 */
export function getInitialConsonantCode(char: string): number | null {
  // First convert Compatibility Jamo to Hangul Jamo if needed
  const convertedChar = convertToHangulJamoInitial(char)
  
  // Try modern initial consonants first
  if (UNICODE_RANGES.INITIAL_CONSONANTS[convertedChar]) {
    return UNICODE_RANGES.INITIAL_CONSONANTS[convertedChar]
  }
  // Try archaic initial consonants
  if (UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS[convertedChar]) {
    return UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS[convertedChar]
  }
  // If not found, return the converted character's Unicode code directly
  const code = convertedChar.charCodeAt(0)
  console.log(`🔍 getInitialConsonantCode: "${char}" -> "${convertedChar}", using code: ${code}`)
  return code
}

/**
 * Get the Unicode code for a medial vowel
 * @param char - Jamo character
 * @returns Unicode code or null if not found
 */
export function getMedialVowelCode(char: string): number | null {
  // First convert Compatibility Jamo to Hangul Jamo if needed
  const convertedChar = convertToHangulJamoMedial(char)
  
  if (UNICODE_RANGES.MEDIAL_VOWELS[convertedChar]) {
    return UNICODE_RANGES.MEDIAL_VOWELS[convertedChar]
  }
  // If not found, return the converted character's Unicode code directly
  const code = convertedChar.charCodeAt(0)
  console.log(`🔍 getMedialVowelCode: "${char}" -> "${convertedChar}", using code: ${code}`)
  return code
}

/**
 * Get the Unicode code for a final consonant
 * @param char - Jamo character
 * @returns Unicode code or null if not found
 */
export function getFinalConsonantCode(char: string): number | null {
  // First convert Compatibility Jamo to Hangul Jamo if needed
  const convertedChar = convertToHangulJamoFinal(char)
  
  if (UNICODE_RANGES.FINAL_CONSONANTS[convertedChar]) {
    return UNICODE_RANGES.FINAL_CONSONANTS[convertedChar]
  }
  // If not found, return the converted character's Unicode code directly
  const code = convertedChar.charCodeAt(0)
  console.log(`🔍 getFinalConsonantCode: "${char}" -> "${convertedChar}", using code: ${code}`)
  return code
}

/**
 * Convert Compatibility Jamo to Hangul Jamo for proper rendering
 * This ensures archaic jamo render as combined blocks instead of separate characters
 * @param text - Text to convert
 * @param preferInitial - If true, prefer initial consonant forms; if false, prefer final consonant forms
 */
export function convertCompatibilityToHangulJamo(text: string, preferInitial: boolean = true): string {
  return text.split('').map(char => {
    // Try the appropriate mapping based on preference
    if (preferInitial) {
      const initialChar = COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char]
      if (initialChar) return initialChar
    } else {
      const finalChar = COMPATIBILITY_TO_HANGUL_JAMO_FINAL[char]
      if (finalChar) return finalChar
    }
    
    // Fallback to vowel mapping
    const vowelChar = COMPATIBILITY_TO_HANGUL_JAMO_VOWEL[char]
    if (vowelChar) return vowelChar
    
    // Return original if no mapping exists
    return char
  }).join('')
}


/**
 * Convert Compatibility Jamo to Hangul Jamo for initial consonants
 * @param char - Compatibility Jamo character
 * @returns Hangul Jamo character or original if no mapping exists
 */
export function convertToHangulJamoInitial(char: string): string {
  return COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char] || char
}

/**
 * Convert Compatibility Jamo to Hangul Jamo for final consonants
 * @param char - Compatibility Jamo character
 * @returns Hangul Jamo character or original if no mapping exists
 */
export function convertToHangulJamoFinal(char: string): string {
  return COMPATIBILITY_TO_HANGUL_JAMO_FINAL[char] || char
}

/**
 * Convert Compatibility Jamo to Hangul Jamo for medial vowels
 * @param char - Compatibility Jamo character
 * @returns Hangul Jamo character or original if no mapping exists
 */
export function convertToHangulJamoMedial(char: string): string {
  // Use the dedicated vowel mapping
  const vowelChar = COMPATIBILITY_TO_HANGUL_JAMO_VOWEL[char]
  return vowelChar || char
}

/**
 * Check if a character is a Compatibility Jamo that should be converted
 */
export function isCompatibilityJamo(char: string): boolean {
  return char in COMPATIBILITY_TO_HANGUL_JAMO_INITIAL ||
         char in COMPATIBILITY_TO_HANGUL_JAMO_FINAL ||
         char in COMPATIBILITY_TO_HANGUL_JAMO_VOWEL
}

