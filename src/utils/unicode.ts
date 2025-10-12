/**
 * Korean Unicode Utilities
 * Handles Unicode ranges, mappings, and character type detection
 */

import type { KoreanUnicodeRanges } from '../types/korean.js';

// Mapping from final consonants to their corresponding initial consonants
export const FINAL_TO_INITIAL_MAPPING: { [key: string]: string } = {
  // Basic consonants
  [String.fromCharCode(0x11A8)]: String.fromCharCode(0x1100), // ᆨ → ᄀ (ㄱ)
  [String.fromCharCode(0x11A9)]: String.fromCharCode(0x1101), // ᆩ → ᄁ (ㄲ)
  [String.fromCharCode(0x11AA)]: String.fromCharCode(0x1102), // ᆪ → ᄂ (ㄴ)
  [String.fromCharCode(0x11AB)]: String.fromCharCode(0x1102), // ᆫ → ᄂ (ㄴ)
  [String.fromCharCode(0x11AC)]: String.fromCharCode(0x1103), // ᆬ → ᄃ (ㄷ)
  [String.fromCharCode(0x11AD)]: String.fromCharCode(0x1104), // ᆭ → ᄄ (ㄸ)
  [String.fromCharCode(0x11AE)]: String.fromCharCode(0x1105), // ᆮ → ᄅ (ㄹ)
  [String.fromCharCode(0x11AF)]: String.fromCharCode(0x1105), // ᆯ → ᄅ (ㄹ)
  [String.fromCharCode(0x11B0)]: String.fromCharCode(0x1106), // ᆰ → ᄆ (ㅁ)
  [String.fromCharCode(0x11B1)]: String.fromCharCode(0x1107), // ᆱ → ᄇ (ㅂ)
  [String.fromCharCode(0x11B2)]: String.fromCharCode(0x1108), // ᆲ → ᄈ (ㅃ)
  [String.fromCharCode(0x11B3)]: String.fromCharCode(0x1109), // ᆳ → ᄉ (ㅅ)
  [String.fromCharCode(0x11B4)]: String.fromCharCode(0x110A), // ᆴ → ᄊ (ㅆ)
  [String.fromCharCode(0x11B5)]: String.fromCharCode(0x110B), // ᆵ → ᄋ (ㅇ)
  [String.fromCharCode(0x11B6)]: String.fromCharCode(0x110C), // ᆶ → ᄌ (ㅈ)
  [String.fromCharCode(0x11B7)]: String.fromCharCode(0x110D), // ᆷ → ᄍ (ㅉ)
  [String.fromCharCode(0x11B8)]: String.fromCharCode(0x110E), // ᆸ → ᄎ (ㅊ)
  [String.fromCharCode(0x11B9)]: String.fromCharCode(0x110F), // ᆹ → ᄏ (ㅋ)
  [String.fromCharCode(0x11BA)]: String.fromCharCode(0x1110), // ᆺ → ᄐ (ㅌ)
  [String.fromCharCode(0x11BB)]: String.fromCharCode(0x1111), // ᆻ → ᄑ (ㅍ)
  [String.fromCharCode(0x11BC)]: String.fromCharCode(0x1112), // ᆼ → ᄒ (ㅎ)
  [String.fromCharCode(0x11BD)]: String.fromCharCode(0x1112), // ᆽ → ᄒ (ㅎ)
  [String.fromCharCode(0x11BE)]: String.fromCharCode(0x1112), // ᆾ → ᄒ (ㅎ)
  [String.fromCharCode(0x11BF)]: String.fromCharCode(0x1112), // ᆿ → ᄒ (ㅎ)
  [String.fromCharCode(0x11C0)]: String.fromCharCode(0x1112), // ᇀ → ᄒ (ㅎ)
  [String.fromCharCode(0x11C1)]: String.fromCharCode(0x1112), // ᇁ → ᄒ (ㅎ)
  [String.fromCharCode(0x11C2)]: String.fromCharCode(0x1112), // ᇂ → ᄒ (ㅎ)
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
    'ㅸ': 0x1170, 'ㅿ': 0x113F, 'ㆆ': 0x1146, 'ᅎ': 0x114E, 'ᅏ': 0x114F, 
    'ᅐ': 0x1150, 'ᅑ': 0x1151, 'ᄔ': 0x1114, 'ᅇ': 0x1115, 'ᄙ': 0x1116, 
    'ᄼ': 0x113C, 'ᄾ': 0x113E, 'ᅙ': 0x1155
  },
  
  // Medial vowels (중성)
  MEDIAL_VOWELS: {
    'ㅏ': 0x1161, 'ㅐ': 0x1162, 'ㅑ': 0x1163, 'ㅒ': 0x1164, 'ㅓ': 0x1165,
    'ㅔ': 0x1166, 'ㅕ': 0x1167, 'ㅖ': 0x1168, 'ㅗ': 0x1169, 'ㅘ': 0x116A,
    'ㅙ': 0x116B, 'ㅚ': 0x116C, 'ㅛ': 0x116D, 'ㅜ': 0x116E, 'ㅝ': 0x116F,
    'ㅞ': 0x1170, 'ㅟ': 0x1171, 'ㅠ': 0x1172, 'ㅡ': 0x1173, 'ㅢ': 0x1174,
    'ㅣ': 0x1175, 'ㆍ': 0x1197, 'ᆢ': 0x11A2
  },
  
  // Final consonants (종성) - Correct Unicode mappings
  FINAL_CONSONANTS: {
    'ㄱ': 0x11A8, 'ㄲ': 0x11A9, 'ㄳ': 0x11AA, 'ㄴ': 0x11AB, 'ㄵ': 0x11AC,
    'ㄶ': 0x11AD, 'ㄷ': 0x11AE, 'ㄸ': 0x11AE, 'ㄹ': 0x11AF, 'ㄺ': 0x11B0, 
    'ㄻ': 0x11B1, 'ㄼ': 0x11B2, 'ㄽ': 0x11B3, 'ㄾ': 0x11B4, 'ㄿ': 0x11B5, 
    'ㅀ': 0x11B6, 'ㅁ': 0x11B7, 'ㅂ': 0x11B8, 'ㅃ': 0x11B8, 'ㅄ': 0x11B9, 
    'ㅅ': 0x11BA, 'ㅆ': 0x11BB, 'ㅇ': 0x11BC, 'ㅈ': 0x11BD, 'ㅉ': 0x11BD, 
    'ㅊ': 0x11BE, 'ㅋ': 0x11BF, 'ㅌ': 0x11C0, 'ㅍ': 0x11C1, 'ㅎ': 0x11C2,
    'ㅸ': 0x11B9, 'ㅿ': 0x11BF, 'ㆆ': 0x11C7
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
 * Check if a character is a Korean consonant (modern or archaic)
 * @param char - Character to check
 * @returns Whether the character is a Korean consonant
 */
export function isConsonant(char: string): boolean {
  return char in UNICODE_RANGES.INITIAL_CONSONANTS || char in UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS
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
  return char in UNICODE_RANGES.MEDIAL_VOWELS
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
  // Try modern initial consonants first
  if (UNICODE_RANGES.INITIAL_CONSONANTS[char]) {
    return UNICODE_RANGES.INITIAL_CONSONANTS[char]
  }
  // Try archaic initial consonants
  if (UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS[char]) {
    return UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS[char]
  }
  // If not found, return the character's Unicode code directly
  const code = char.charCodeAt(0)
  console.log(`🔍 getInitialConsonantCode: "${char}" not in mappings, using direct code: ${code}`)
  return code
}

/**
 * Get the Unicode code for a medial vowel
 * @param char - Jamo character
 * @returns Unicode code or null if not found
 */
export function getMedialVowelCode(char: string): number | null {
  if (UNICODE_RANGES.MEDIAL_VOWELS[char]) {
    return UNICODE_RANGES.MEDIAL_VOWELS[char]
  }
  // If not found, return the character's Unicode code directly
  const code = char.charCodeAt(0)
  console.log(`🔍 getMedialVowelCode: "${char}" not in mappings, using direct code: ${code}`)
  return code
}

/**
 * Get the Unicode code for a final consonant
 * @param char - Jamo character
 * @returns Unicode code or null if not found
 */
export function getFinalConsonantCode(char: string): number | null {
  if (UNICODE_RANGES.FINAL_CONSONANTS[char]) {
    return UNICODE_RANGES.FINAL_CONSONANTS[char]
  }
  // If not found, return the character's Unicode code directly
  const code = char.charCodeAt(0)
  console.log(`🔍 getFinalConsonantCode: "${char}" not in mappings, using direct code: ${code}`)
  return code
}
