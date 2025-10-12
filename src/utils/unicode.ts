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
  [String.fromCharCode(0x3138)]: String.fromCharCode(0x1105), // ㄹ → ᄅ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x1106), // ㅁ → ᄆ
  [String.fromCharCode(0x3142)]: String.fromCharCode(0x1107), // ㅂ → ᄇ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x1109), // ㅅ → ᄉ
  [String.fromCharCode(0x3146)]: String.fromCharCode(0x110A), // ㅆ → ᄊ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x110B), // ㅇ → ᄋ
  [String.fromCharCode(0x3148)]: String.fromCharCode(0x110C), // ㅈ → ᄌ
  [String.fromCharCode(0x3149)]: String.fromCharCode(0x110E), // ㅊ → ᄎ
  [String.fromCharCode(0x314A)]: String.fromCharCode(0x110F), // ㅋ → ᄏ
  [String.fromCharCode(0x314B)]: String.fromCharCode(0x1110), // ㅌ → ᄐ
  [String.fromCharCode(0x314C)]: String.fromCharCode(0x1111), // ㅍ → ᄑ
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x1112), // ㅎ → ᄒ
  [String.fromCharCode(0x314E)]: String.fromCharCode(0x1112), // ㅎ → ᄒ (alternative Unicode)
}

// Mapping from Compatibility Jamo to Hangul Jamo Final consonants
export const COMPATIBILITY_TO_HANGUL_JAMO_FINAL: { [key: string]: string } = {
  // Regular final consonants
  [String.fromCharCode(0x3131)]: String.fromCharCode(0x11A8), // ㄱ → ᆨ
  [String.fromCharCode(0x3132)]: String.fromCharCode(0x11A9), // ㄲ → ᆩ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x11AB), // ㄴ → ᆫ
  [String.fromCharCode(0x3137)]: String.fromCharCode(0x11AE), // ㄷ → ᆮ
  [String.fromCharCode(0x3138)]: String.fromCharCode(0x11AF), // ㄹ → ᆯ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x11B7), // ㅁ → ᆷ
  [String.fromCharCode(0x3142)]: String.fromCharCode(0x11B8), // ㅂ → ᆸ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x11BA), // ㅅ → ᆺ
  [String.fromCharCode(0x3146)]: String.fromCharCode(0x11BB), // ㅆ → ᆻ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x11BC), // ㅇ → ᆼ
  [String.fromCharCode(0x3148)]: String.fromCharCode(0x11BD), // ㅈ → ᆽ
  [String.fromCharCode(0x3149)]: String.fromCharCode(0x11BE), // ㅊ → ᆾ
  [String.fromCharCode(0x314A)]: String.fromCharCode(0x11BF), // ㅋ → ᆿ
  [String.fromCharCode(0x314B)]: String.fromCharCode(0x11C0), // ㅌ → ᇀ
  [String.fromCharCode(0x314C)]: String.fromCharCode(0x11C1), // ㅍ → ᇁ
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x11C2), // ㅎ → ᇂ
}

// Archaic consonant mappings (Compatibility Jamo to Hangul Jamo)
export const ARCHAIC_CONSONANT_MAPPINGS: { [key: string]: { initial: string, final?: string } } = {
  // Archaic consonants with both initial and final forms
  [String.fromCharCode(0x3165)]: { initial: String.fromCharCode(0x1114), final: String.fromCharCode(0x11FF) }, // ㅥ → ᄔ / ᇿ
  [String.fromCharCode(0x3171)]: { initial: String.fromCharCode(0x111D), final: String.fromCharCode(0x11E2) }, // ㅱ → ᄝ / ᇢ
  [String.fromCharCode(0x3178)]: { initial: String.fromCharCode(0x112B), final: String.fromCharCode(0x11E6) }, // ㅸ → ᄫ / ᇦ
  [String.fromCharCode(0x317F)]: { initial: String.fromCharCode(0x1140), final: String.fromCharCode(0x11EB) }, // ㅿ → ᅀ / ᇫ
  [String.fromCharCode(0x3181)]: { initial: String.fromCharCode(0x114C), final: String.fromCharCode(0x11F0) }, // ㆁ → ᅌ / ᇰ
  [String.fromCharCode(0x3184)]: { initial: String.fromCharCode(0x1157), final: String.fromCharCode(0x11F4) }, // ㆄ → ᅗ / ᇴ
  [String.fromCharCode(0x3186)]: { initial: String.fromCharCode(0x1159), final: String.fromCharCode(0x11F9) }, // ㆆ → ᅙ / ᇹ
  
  // Archaic consonants without final forms
  [String.fromCharCode(0x3179)]: { initial: String.fromCharCode(0x112C) }, // ㅹ → ᄬ
  [String.fromCharCode(0x3180)]: { initial: String.fromCharCode(0x1147) }, // ㆀ → ᅇ
  [String.fromCharCode(0x3185)]: { initial: String.fromCharCode(0x1158) }, // ㆅ → ᅘ
  
  // Archaic consonants that only exist as initial
  [String.fromCharCode(0x113C)]: { initial: String.fromCharCode(0x113C) }, // ᄼ → ᄼ
  [String.fromCharCode(0x113D)]: { initial: String.fromCharCode(0x113D) }, // ᄽ → ᄽ
  [String.fromCharCode(0x113E)]: { initial: String.fromCharCode(0x113E) }, // ᄾ → ᄾ
  [String.fromCharCode(0x113F)]: { initial: String.fromCharCode(0x113F) }, // ᄿ → ᄿ
  [String.fromCharCode(0x114E)]: { initial: String.fromCharCode(0x114E) }, // ᅎ → ᅎ
  [String.fromCharCode(0x114F)]: { initial: String.fromCharCode(0x114F) }, // ᅏ → ᅏ
  [String.fromCharCode(0x1150)]: { initial: String.fromCharCode(0x1150) }, // ᅐ → ᅐ
  [String.fromCharCode(0x1151)]: { initial: String.fromCharCode(0x1151) }, // ᅑ → ᅑ
  [String.fromCharCode(0xA97C)]: { initial: String.fromCharCode(0xA97C) }, // ꥼ → ꥼ
}

// Legacy mapping for backward compatibility (will be deprecated)
export const COMPATIBILITY_TO_HANGUL_JAMO: { [key: string]: string } = {
  // Archaic initial consonants (Compatibility Jamo to Hangul Jamo)
  [String.fromCharCode(0x317F)]: String.fromCharCode(0x1140), // △ → ᅀ (archaic initial consonant)
  [String.fromCharCode(0x3186)]: String.fromCharCode(0x1159), // ㆆ → ᅙ (archaic initial consonant)
  [String.fromCharCode(0x3181)]: String.fromCharCode(0x114C), // ㆁ → ᅌ (archaic initial consonant)
  [String.fromCharCode(0xA97C)]: String.fromCharCode(0xA97C), // ꥼ → ꥼ (archaic initial consonant)
  [String.fromCharCode(0x3171)]: String.fromCharCode(0x111D), // ㅱ → ᄝ (archaic initial consonant)
  [String.fromCharCode(0x3165)]: String.fromCharCode(0x1114), // ㅥ → ᄔ (archaic initial consonant)
  [String.fromCharCode(0x3180)]: String.fromCharCode(0x1147), // ㆀ → ᅇ (archaic initial consonant)
  [String.fromCharCode(0x1119)]: String.fromCharCode(0x1119), // ᄙ → ᄙ (archaic initial consonant)
  [String.fromCharCode(0x3185)]: String.fromCharCode(0x1158), // ㆅ → ᅘ (archaic initial consonant)
  [String.fromCharCode(0x3178)]: String.fromCharCode(0x112B), // ㅸ → ᄫ (archaic initial consonant)
  [String.fromCharCode(0x3179)]: String.fromCharCode(0x112C), // ㅹ → ᄬ (archaic initial consonant)
  [String.fromCharCode(0x111C)]: String.fromCharCode(0x111C), // ᄼ → ᄼ (archaic initial consonant)
  [String.fromCharCode(0x111E)]: String.fromCharCode(0x111E), // ᄾ → ᄾ (archaic initial consonant)
  [String.fromCharCode(0x111D)]: String.fromCharCode(0x111D), // ᄽ → ᄽ (archaic initial consonant)
  [String.fromCharCode(0x111F)]: String.fromCharCode(0x111F), // ᄿ → ᄿ (archaic initial consonant)
  [String.fromCharCode(0x114E)]: String.fromCharCode(0x114E), // ᅎ → ᅎ (archaic initial consonant)
  [String.fromCharCode(0x1150)]: String.fromCharCode(0x1150), // ᅐ → ᅐ (archaic initial consonant)
  [String.fromCharCode(0x114F)]: String.fromCharCode(0x114F), // ᅏ → ᅏ  (archaic initial consonant)
  [String.fromCharCode(0x1151)]: String.fromCharCode(0x1151), // ᅑ → ᅑ (archaic initial consonant)
  
  // Medial vowels
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
  
  // Archaic medial vowels
  [String.fromCharCode(0x318D)]: String.fromCharCode(0x119E), // ㆍ → ᆞ (archaic medial vowel)
  [String.fromCharCode(0x11A2)]: String.fromCharCode(0x11A2), // ᆢ → ᆢ (archaic medial vowel)
  
  // Initial consonants (prefer initial forms for compatibility jamo)
  [String.fromCharCode(0x3131)]: String.fromCharCode(0x1100), // ㄱ → ᄀ
  [String.fromCharCode(0x3132)]: String.fromCharCode(0x1101), // ㄲ → ᄁ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x1102), // ㄴ → ᄂ
  [String.fromCharCode(0x3137)]: String.fromCharCode(0x1103), // ㄷ → ᄃ
  [String.fromCharCode(0x3138)]: String.fromCharCode(0x1105), // ㄹ → ᄅ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x1106), // ㅁ → ᄆ
  [String.fromCharCode(0x3142)]: String.fromCharCode(0x1107), // ㅂ → ᄇ
  [String.fromCharCode(0x3143)]: String.fromCharCode(0x1108), // ㅃ → ᄈ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x1109), // ㅅ → ᄉ
  [String.fromCharCode(0x3146)]: String.fromCharCode(0x110A), // ㅆ → ᄊ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x110B), // ㅇ → ᄋ
  [String.fromCharCode(0x3148)]: String.fromCharCode(0x110C), // ㅈ → ᄌ
  [String.fromCharCode(0x3149)]: String.fromCharCode(0x110E), // ㅊ → ᄎ
  [String.fromCharCode(0x314A)]: String.fromCharCode(0x110F), // ㅋ → ᄏ
  [String.fromCharCode(0x314B)]: String.fromCharCode(0x1110), // ㅌ → ᄐ
  [String.fromCharCode(0x314C)]: String.fromCharCode(0x1111), // ㅍ → ᄑ
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x1112), // ㅎ → ᄒ
  
  // Archaic final consonants
  [String.fromCharCode(0x11EB)]: String.fromCharCode(0x11EB), // ᇫ → ᇫ (archaic final consonant)
  [String.fromCharCode(0x25B2)]: String.fromCharCode(0x11EB), // ▲ → ᇫ (triangle to archaic final consonant)
}

// Mapping from complex final consonants to their component parts
export const COMPLEX_FINAL_TO_COMPONENTS: { [key: string]: { first: string, second: string } } = {
  // Modern complex finals
  [String.fromCharCode(0x11B0)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3131) }, // ㄺ → ㄹ + ㄱ
  [String.fromCharCode(0x11B1)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3141) }, // ㄻ → ㄹ + ㅁ
  [String.fromCharCode(0x11B2)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3142) }, // ㄼ → ㄹ + ㅂ
  [String.fromCharCode(0x11AA)]: { first: String.fromCharCode(0x11A8), second: String.fromCharCode(0x3145) }, // ㄳ → ㄱ + ㅅ
  [String.fromCharCode(0x11B3)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3145) }, // ㄽ → ㄹ + ㅅ
  [String.fromCharCode(0x11B9)]: { first: String.fromCharCode(0x11B8), second: String.fromCharCode(0x3145) }, // ㅄ → ㅂ + ㅅ
  [String.fromCharCode(0x11AC)]: { first: String.fromCharCode(0x11AB), second: String.fromCharCode(0x3148) }, // ㄵ → ㄴ + ㅈ
  [String.fromCharCode(0x11B4)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3137) }, // ㄾ → ㄹ + ㅌ
  [String.fromCharCode(0x11B5)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3147) }, // ㄿ → ㄹ + ㅍ
  [String.fromCharCode(0x11AD)]: { first: String.fromCharCode(0x11AB), second: String.fromCharCode(0x314E) }, // ㄶ → ㄴ + ㅎ
  [String.fromCharCode(0x11B6)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x314E) }, // ㅀ → ㄹ + ㅎ
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
 * Decompose a complex final consonant into its component parts
 * @param complexFinal - Complex final consonant
 * @returns Object with first and second components, or null if not a complex final
 */
export function decomposeComplexFinal(complexFinal: string): { first: string, second: string } | null {
  const components = COMPLEX_FINAL_TO_COMPONENTS[complexFinal]
  if (components) {
    console.log(`🔍 Decomposing complex final "${complexFinal}" to: "${components.first}" + "${components.second}"`)
    return components
  }
  console.log(`⚠️ "${complexFinal}" is not a complex final, returning null`)
  return null
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
    
    // Fallback to legacy mapping
    const hangulChar = COMPATIBILITY_TO_HANGUL_JAMO[char]
    return hangulChar || char // Return original if no mapping exists
  }).join('')
}

/**
 * Convert Compatibility Jamo to Hangul Jamo with context awareness
 * Determines whether to use initial or final forms based on surrounding characters
 */
export function convertCompatibilityToHangulJamoContextAware(text: string): string {
  return text.split('').map((char, index) => {
    // Check if this character should be a final consonant
    const shouldBeFinal = shouldBeFinalConsonant(text, index)
    
    // Check if it's an archaic consonant first
    const archaicMapping = ARCHAIC_CONSONANT_MAPPINGS[char]
    if (archaicMapping) {
      if (shouldBeFinal && archaicMapping.final) {
        return archaicMapping.final
      } else {
        return archaicMapping.initial
      }
    }
    
    // Handle regular compatibility jamo
    if (shouldBeFinal) {
      const finalChar = COMPATIBILITY_TO_HANGUL_JAMO_FINAL[char]
      if (finalChar) return finalChar
    } else {
      const initialChar = COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char]
      if (initialChar) return initialChar
    }
    
    // Fallback to legacy mapping
    const hangulChar = COMPATIBILITY_TO_HANGUL_JAMO[char]
    return hangulChar || char
  }).join('')
}

/**
 * Determine if a character at a given position should be a final consonant
 */
function shouldBeFinalConsonant(text: string, index: number): boolean {
  const char = text[index]
  
  // Check if it's a regular compatibility jamo
  const isRegularJamo = COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char]
  // Check if it's an archaic consonant
  const isArchaicConsonant = ARCHAIC_CONSONANT_MAPPINGS[char]
  
  // If it's neither, return false
  if (!isRegularJamo && !isArchaicConsonant) return false
  
  // For archaic consonants, check if they have a final form
  if (isArchaicConsonant && !isArchaicConsonant.final) {
    // This archaic consonant doesn't have a final form, so it can't be final
    return false
  }
  
  // Look at the previous character to determine context
  if (index > 0) {
    const prevChar = text[index - 1]
    const prevCode = prevChar.charCodeAt(0)
    
    // If previous character is a medial vowel (including archaic), this should be final
    if ((prevCode >= 0x1161 && prevCode <= 0x1175) || // Modern medial vowels
        (prevCode >= 0x1196 && prevCode <= 0x11A1)) { // Archaic medial vowels
      return true
    }
    
    // If previous character is an initial consonant (including archaic), this should also be final
    if ((prevCode >= 0x1100 && prevCode <= 0x1116) || // Modern initial consonants
        (prevCode >= 0x1113 && prevCode <= 0x1116) || // Extended initial consonants
        (prevCode >= 0x1114 && prevCode <= 0x1159) || // Archaic initial consonants
        (prevCode >= 0x113C && prevCode <= 0x113F) || // Additional archaic initials
        (prevCode >= 0x114E && prevCode <= 0x1151) || // More archaic initials
        prevCode === 0xA97C) { // ꥼ
      return true
    }
  }
  
  // Default to initial consonant
  return false
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
  // Medial vowels mapping (already correct in the existing mapping)
  const hangulChar = COMPATIBILITY_TO_HANGUL_JAMO[char]
  return hangulChar || char
}

/**
 * Check if a character is a Compatibility Jamo that should be converted
 */
export function isCompatibilityJamo(char: string): boolean {
  return char in COMPATIBILITY_TO_HANGUL_JAMO
}

/**
 * Check if a character is an archaic jamo (cannot be composed using standard formula)
 */
export function isArchaicJamo(char: string): boolean {
  // Archaic medial vowels that cannot be composed using standard formula
  const archaicMedials = ['ㆍ', 'ᆢ', 'ퟅ', 'ᆟ', 'ퟆ', 'ᆠ', 'ᆡ']
  
  // Archaic initial consonants
  const archaicInitials = Object.keys(UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS)
  
  return archaicMedials.includes(char) || archaicInitials.includes(char)
}

/**
 * Check if a medial vowel is archaic (cannot use standard composition)
 */
export function isArchaicMedialVowel(char: string): boolean {
  const archaicMedials = ['ㆍ', 'ᆢ', 'ퟅ', 'ᆟ', 'ퟆ', 'ᆠ', 'ᆡ']
  return archaicMedials.includes(char)
}

/**
 * Get precomposed archaic syllables for common combinations
 */
export function getArchaicSyllable(initial: string, medial: string, final: string = ''): string | null {
  // Map common archaic combinations to their precomposed forms
  const archaicSyllables: { [key: string]: string } = {
    // ㅎ + ㆍ = ᄒᆞ (precomposed)
    'ㅎㆍ': 'ᄒᆞ',
    'ㅎㆍㅇ': 'ᄒᆞᆼ', // if there's a final consonant
    // ㅂ + ㆍ = ᄇᆞ (precomposed)
    'ㅂㆍ': 'ᄇᆞ',
    'ㅂㆍㅇ': 'ᄇᆞᆼ', // if there's a final consonant
  }
  
  const key = initial + medial + final
  return archaicSyllables[key] || null
}
