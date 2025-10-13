/**
 * Korean Unicode Utilities
 * Unified table-based approach for all Korean characters
 * All characters convert from Hangul Compatibility to Hangul Jamo Area
 */

import type { KoreanUnicodeRanges } from '../types/korean.js';

// Type definitions for the character tables
type CharacterData = {
  initial?: number | null
  final?: number | null
  medial?: number | null
  compatibility?: number | null
}

type CharacterTable = { [key: string]: CharacterData }

// Unified Korean character table - all characters treated equally
// Based on official Unicode charts: consonant and vowel sort order
const KOREAN_CHARACTER_TABLE: {
  consonants: CharacterTable
  vowels: CharacterTable
} = {
  // Consonants (자음) - following official consonant sort order
  consonants: {
    'ㄱ': { initial: 0x1100, final: 0x11A8, compatibility: 0x3131 },
    'ㄲ': { initial: 0x1101, final: 0x11A9, compatibility: 0x3132 },
    'ㄴ': { initial: 0x1102, final: 0x11AB, compatibility: 0x3134 },
    'ㄷ': { initial: 0x1103, final: 0x11AE, compatibility: 0x3137 },
    'ㄸ': { initial: 0x1104, final: 0xD7CD, compatibility: 0x3138 },
    'ㄹ': { initial: 0x1105, final: 0x11AF, compatibility: 0x3139 },
    'ㅁ': { initial: 0x1106, final: 0x11B7, compatibility: 0x3141 },
    'ㅂ': { initial: 0x1107, final: 0x11B8, compatibility: 0x3142 },
    'ㅃ': { initial: 0x1108, final: 0xD7E6, compatibility: 0x3143 },
    'ㅅ': { initial: 0x1109, final: 0x11BA, compatibility: 0x3145 },
    'ㅆ': { initial: 0x110A, final: 0x11BB, compatibility: 0x3146 },
    'ㅇ': { initial: 0x110B, final: 0x11BC, compatibility: 0x3147 },
    'ㅈ': { initial: 0x110C, final: 0x11BD, compatibility: 0x3148 },
    'ㅉ': { initial: 0x110D, final: 0xD7F9, compatibility: 0x3149 },
    'ㅊ': { initial: 0x110E, final: 0x11BE, compatibility: 0x314A },
    'ㅋ': { initial: 0x110F, final: 0x11BF, compatibility: 0x314B },
    'ㅌ': { initial: 0x1110, final: 0x11C0, compatibility: 0x314C },
    'ㅍ': { initial: 0x1111, final: 0x11C1, compatibility: 0x314D },
    'ㅎ': { initial: 0x1112, final: 0x11C2, compatibility: 0x314E },
    
    // Archaic consonants (treated equally)
    'ㅥ': { initial: 0x1114, final: 0x11FF, compatibility: 0x3165 },
    'ᄙ': { initial: 0x1119, final: null, compatibility: null },
    'ㅱ': { initial: 0x111D, final: 0x11E2, compatibility: 0x3171 },
    'ㅸ': { initial: 0x112B, final: 0x11E6, compatibility: 0x3178 },
    'ㅹ': { initial: 0x112C, final: null, compatibility: 0x3179 },
    'ᄼ': { initial: 0x113C, final: null, compatibility: null },
    'ᄽ': { initial: 0x113D, final: null, compatibility: null },
    'ᄾ': { initial: 0x113E, final: null, compatibility: null },
    'ᄿ': { initial: 0x113F, final: null, compatibility: null },
    'ㅿ': { initial: 0x1140, final: 0x11EB, compatibility: 0x317F },
    'ㆀ': { initial: 0x1147, final: null, compatibility: 0x3180 },
    'ㆁ': { initial: 0x114C, final: 0x11F0, compatibility: 0x3181 },
    'ᅎ': { initial: 0x114E, final: null, compatibility: null },
    'ᅏ': { initial: 0x114F, final: null, compatibility: null },
    'ᅐ': { initial: 0x1150, final: null, compatibility: null },
    'ᅑ': { initial: 0x1151, final: null, compatibility: null },
    'ᅔ': { initial: 0x1154, final: null, compatibility: null },
    'ᅕ': { initial: 0x1155, final: null, compatibility: null },
    'ㆄ': { initial: 0x1157, final: 0x11F4, compatibility: 0x3184 },
    'ㆅ': { initial: 0x1158, final: null, compatibility: 0x3185 },
    'ㆆ': { initial: 0x1159, final: 0x11F9, compatibility: 0x3186 },
    'ꥼ': { initial: 0xA97C, final: null, compatibility: null }
  },
  
  // Vowels (모음) - following official vowel sort order
  vowels: {
    'ㅏ': { medial: 0x1161, compatibility: 0x314F },
    'ㅐ': { medial: 0x1162, compatibility: 0x3150 },
    'ㅑ': { medial: 0x1163, compatibility: 0x3151 },
    'ㅒ': { medial: 0x1164, compatibility: 0x3152 },
    'ㅓ': { medial: 0x1165, compatibility: 0x3153 },
    'ㅔ': { medial: 0x1166, compatibility: 0x3154 },
    'ㅕ': { medial: 0x1167, compatibility: 0x3155 },
    'ㅖ': { medial: 0x1168, compatibility: 0x3156 },
    'ㅗ': { medial: 0x1169, compatibility: 0x3157 },
    'ㅘ': { medial: 0x116A, compatibility: 0x3158 },
    'ㅙ': { medial: 0x116B, compatibility: 0x3159 },
    'ㅚ': { medial: 0x116C, compatibility: 0x315A },
    'ㅛ': { medial: 0x116D, compatibility: 0x315B },
    'ㅜ': { medial: 0x116E, compatibility: 0x315C },
    'ㅝ': { medial: 0x116F, compatibility: 0x315D },
    'ㅞ': { medial: 0x1170, compatibility: 0x315E },
    'ㅟ': { medial: 0x1171, compatibility: 0x315F },
    'ㅠ': { medial: 0x1172, compatibility: 0x3160 },
    'ㅡ': { medial: 0x1173, compatibility: 0x3161 },
    'ㅢ': { medial: 0x1174, compatibility: 0x3162 },
    'ㅣ': { medial: 0x1175, compatibility: 0x3163 },
    
    // Archaic vowels (treated equally)
    'ㆍ': { medial: 0x119E, compatibility: 0x318D },
    'ᆢ': { medial: 0x11A2, compatibility: null },
    'ᆟ': { medial: 0x119F, compatibility: null }, // ㆍ + ㅓ
    'ᆠ': { medial: 0x11A0, compatibility: null }, // ㆍ + ㅜ
    'ᆡ': { medial: 0x11A1, compatibility: null }, // ㆍ + ㅣ
    'ퟅ': { medial: 0xD7C5, compatibility: null }, // ㆍ + ㅏ
    'ퟆ': { medial: 0xD7C6, compatibility: null }  // ㆍ + ㅔ
  }
}

// Complex combinations table
const COMPLEX_COMBINATIONS = {
  medials: {
    // Modern complex medials
    'ㅗㅏ': { result: 'ㅘ', medial: 0x116A },
    'ㅗㅐ': { result: 'ㅙ', medial: 0x116B },
    'ㅗㅣ': { result: 'ㅚ', medial: 0x116C },
    'ㅜㅓ': { result: 'ㅝ', medial: 0x116F },
    'ㅜㅔ': { result: 'ㅞ', medial: 0x1170 },
    'ㅜㅣ': { result: 'ㅟ', medial: 0x1171 },
    'ㅡㅣ': { result: 'ㅢ', medial: 0x1174 },
    
    // Archaic complex medials
    'ㆍㅏ': { result: 'ퟅ', medial: 0xD7C5 },
    'ㆍㅓ': { result: 'ᆟ', medial: 0x119F },
    'ㆍㅔ': { result: 'ퟆ', medial: 0xD7C6 },
    'ㆍㅜ': { result: 'ᆠ', medial: 0x11A0 },
    'ㆍㅣ': { result: 'ᆡ', medial: 0x11A1 }
  },
  
  finals: {
    // Complex final combinations
    'ㄱㅅ': { result: 'ㄳ', final: 0x11AA },
    'ㄴㅈ': { result: 'ㄵ', final: 0x11AC },
    'ㄴㅎ': { result: 'ㄶ', final: 0x11AD },
    'ㄹㄱ': { result: 'ㄺ', final: 0x11B0 },
    'ㄹㅁ': { result: 'ㄻ', final: 0x11B1 },
    'ㄹㅂ': { result: 'ㄼ', final: 0x11B2 },
    'ㄹㅅ': { result: 'ㄽ', final: 0x11B3 },
    'ㄹㅌ': { result: 'ㄾ', final: 0x11B4 },
    'ㄹㅍ': { result: 'ㄿ', final: 0x11B5 },
    'ㄹㅎ': { result: 'ㅀ', final: 0x11B6 },
    'ㅂㅅ': { result: 'ㅄ', final: 0x11B9 }
  }
}

// Helper function to get character by Unicode code
function getCharByCode(code: number): string {
  return String.fromCharCode(code)
}

// Generate mappings from the unified table
function generateMappings() {
  const initialMappings: { [key: string]: string } = {}
  const finalMappings: { [key: string]: string } = {}
  const vowelMappings: { [key: string]: string } = {}
  const finalToInitialMappings: { [key: string]: string } = {}
  
  // Generate consonant mappings
  Object.entries(KOREAN_CHARACTER_TABLE.consonants).forEach(([, data]) => {
    if (data.compatibility !== null && data.compatibility !== undefined) {
      const compatibilityChar = getCharByCode(data.compatibility)
      if (data.initial !== null && data.initial !== undefined) {
        initialMappings[compatibilityChar] = getCharByCode(data.initial)
      }
      if (data.final !== null && data.final !== undefined) {
        finalMappings[compatibilityChar] = getCharByCode(data.final)
        // Create final to initial mapping
        if (data.initial !== null && data.initial !== undefined) {
          finalToInitialMappings[getCharByCode(data.final)] = getCharByCode(data.initial)
        }
      }
    }
  })
  
  // Generate vowel mappings
  Object.entries(KOREAN_CHARACTER_TABLE.vowels).forEach(([, data]) => {
    if (data.compatibility !== null && data.compatibility !== undefined && 
        data.medial !== null && data.medial !== undefined) {
      const compatibilityChar = getCharByCode(data.compatibility)
      vowelMappings[compatibilityChar] = getCharByCode(data.medial)
    }
  })
  
  return {
    initialMappings,
    finalMappings,
    vowelMappings,
    finalToInitialMappings
  }
}

// Generate complex mappings
function generateComplexMappings() {
  const complexMedialMappings: { [key: string]: string } = {}
  const complexFinalMappings: { [key: string]: string } = {}
  const complexFinalDecomposition: { [key: string]: { first: string, second: string } } = {}
  
  // Generate complex medial mappings
  Object.entries(COMPLEX_COMBINATIONS.medials).forEach(([combination, data]) => {
    const [first, second] = combination.split('')
    const firstData = KOREAN_CHARACTER_TABLE.vowels[first]
    const secondData = KOREAN_CHARACTER_TABLE.vowels[second]
    
    if (firstData?.medial && secondData?.compatibility) {
      const firstChar = getCharByCode(firstData.medial)
      const secondChar = getCharByCode(secondData.compatibility)
      const key = firstChar + secondChar
      complexMedialMappings[key] = getCharByCode(data.medial)
    }
  })
  
  // Generate complex final mappings
  Object.entries(COMPLEX_COMBINATIONS.finals).forEach(([combination, data]) => {
    const [first, second] = combination.split('')
    const firstData = KOREAN_CHARACTER_TABLE.consonants[first]
    const secondData = KOREAN_CHARACTER_TABLE.consonants[second]
    
    if (firstData?.final && secondData?.compatibility && firstData?.initial) {
      const firstChar = getCharByCode(firstData.final)
      const secondChar = getCharByCode(secondData.compatibility)
      const key = firstChar + secondChar
      complexFinalMappings[key] = getCharByCode(data.final)
      
      // Create decomposition mapping
      complexFinalDecomposition[getCharByCode(data.final)] = {
        first: getCharByCode(firstData.final),
        second: getCharByCode(firstData.initial)
      }
    }
  })
  
  return {
    complexMedialMappings,
    complexFinalMappings,
    complexFinalDecomposition
  }
}

// Generate all mappings
const mappings = generateMappings()
const complexMappings = generateComplexMappings()

// Export the generated mappings
export const COMPATIBILITY_TO_HANGUL_JAMO_INITIAL = mappings.initialMappings
export const COMPATIBILITY_TO_HANGUL_JAMO_FINAL = mappings.finalMappings
export const COMPATIBILITY_TO_HANGUL_JAMO_VOWEL = mappings.vowelMappings
export const FINAL_TO_INITIAL_MAPPING = mappings.finalToInitialMappings
export const COMPLEX_MEDIAL_MAPPINGS = complexMappings.complexMedialMappings
export const COMPLEX_FINAL_MAPPINGS = complexMappings.complexFinalMappings
export const COMPLEX_FINAL_DECOMPOSITION = complexMappings.complexFinalDecomposition

// Generate UNICODE_RANGES from the unified table for backward compatibility
function generateUnicodeRanges(): KoreanUnicodeRanges {
  const initialConsonants: { [key: string]: number } = {}
  const archaicInitialConsonants: { [key: string]: number } = {}
  const medialVowels: { [key: string]: number } = {}
  const finalConsonants: { [key: string]: number } = {}
  
  // Generate consonant ranges
  Object.entries(KOREAN_CHARACTER_TABLE.consonants).forEach(([char, data]) => {
    if (data.initial !== null && data.initial !== undefined) {
      if (data.compatibility !== null && data.compatibility !== undefined) {
        initialConsonants[char] = data.initial
      } else {
        archaicInitialConsonants[char] = data.initial
      }
    }
    if (data.final !== null && data.final !== undefined) {
      finalConsonants[char] = data.final
    }
  })
  
  // Generate vowel ranges
  Object.entries(KOREAN_CHARACTER_TABLE.vowels).forEach(([char, data]) => {
    if (data.medial !== null && data.medial !== undefined) {
      medialVowels[char] = data.medial
    }
  })
  
  return {
    INITIAL_CONSONANTS: initialConsonants,
    ARCHAIC_INITIAL_CONSONANTS: archaicInitialConsonants,
    MEDIAL_VOWELS: medialVowels,
    FINAL_CONSONANTS: finalConsonants
  }
}

export const UNICODE_RANGES = generateUnicodeRanges()

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


