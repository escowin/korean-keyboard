/**
 * Korean Syllable Composition
 * Handles syllable composition, complex medials, and complex finals
 */

import { 
  ARCHAIC_COMPLEX_MEDIAL_MAPPINGS
} from './unicode.js'

/**
 * Compose Korean syllable as Hangul Jamo sequence
 * Simplified approach: always return Hangul Jamo sequences and let browser render as blocks
 * @param initial - Initial consonant
 * @param medial - Medial vowel
 * @param final - Final consonant (optional)
 * @returns Hangul Jamo sequence that browser will render as syllable block
 */
export function composeSyllable(initial: string, medial: string, final: string = ''): string {
  // Handle edge cases
  if (!initial && !medial && !final) return ''
  if (!initial && !medial) return final
  if (!initial && !final) return medial
  if (!medial && !final) return initial
  
  console.log('🔤 composeSyllable (simplified) called with:', { initial, medial, final })
  
  // Simply concatenate the components - browser will render as syllable block
  // This works for both modern and archaic Korean characters
  const result = initial + medial + final
  console.log('   🎯 Returning Hangul Jamo sequence:', result, '(browser will render as block)')
  
  return result
}

/**
 * Check if two vowels can form a complex medial (diphthong)
 * @param first - First vowel
 * @param second - Second vowel
 * @returns Complex medial character or null if not combinable
 */
export function canFormComplexMedial(first: string, second: string): string | null {
  console.log(`🔍 canFormComplexMedial called with: "${first}" + "${second}"`)
  
  // Check for archaic complex medials first (ㆍ + vowel combinations)
  const archaicCombination = first + second
  const archaicResult = ARCHAIC_COMPLEX_MEDIAL_MAPPINGS[archaicCombination]
  if (archaicResult) {
    console.log(`🏛️ Archaic complex medial formed: "${first}" + "${second}" = "${archaicResult}"`)
    return archaicResult
  }
  
  // Check for modern complex medials
  const complexMedials: { [key: string]: string } = {
    [String.fromCharCode(0x1169) + String.fromCharCode(0x314F)]: 'ㅘ',  // ㅗ + ㅏ = ㅘ (using actual decomposition chars)
    [String.fromCharCode(0x1169) + String.fromCharCode(0x3150)]: 'ㅙ',  // ㅗ + ㅐ = ㅙ
    [String.fromCharCode(0x1169) + String.fromCharCode(0x3163)]: 'ㅚ',  // ㅗ + ㅣ = ㅚ
    [String.fromCharCode(0x116C) + String.fromCharCode(0x314E)]: 'ㅝ',  // ㅜ + ㅓ = ㅝ
    [String.fromCharCode(0x116C) + String.fromCharCode(0x3151)]: 'ㅞ',  // ㅜ + ㅔ = ㅞ
    [String.fromCharCode(0x116C) + String.fromCharCode(0x3163)]: 'ㅟ',  // ㅜ + ㅣ = ㅟ
    [String.fromCharCode(0x1173) + String.fromCharCode(0x3163)]: 'ㅢ'   // ㅡ + ㅣ = ㅢ
  }
  
  const combination = first + second
  const result = complexMedials[combination]
  
  if (result) {
    console.log(`🔗 Complex medial formed: "${first}" + "${second}" = "${result}"`)
  }
  
  return result || null
}

/**
 * Check if two consonants can form a complex final consonant
 * @param first - First consonant (current final)
 * @param second - Second consonant (new input)
 * @returns Complex final character or null if not combinable
 */
export function canFormComplexFinal(first: string, second: string): string | null {
  const complexFinals: { [key: string]: string } = {
    // moern complex finals
    [String.fromCharCode(0x11A8) + String.fromCharCode(0x3145)]: 'ᆪ',  // ㄱ + ㅅ = ㄳ (using Compatibility Jamo)
    [String.fromCharCode(0x11AB) + String.fromCharCode(0x3148)]: 'ᆬ',  // ㄴ + ㅈ = ㄵ
    [String.fromCharCode(0x11AB) + String.fromCharCode(0x314E)]: 'ᆭ',  // ㄴ + ㅎ = ㄶ
    [String.fromCharCode(0x11AF) + String.fromCharCode(0x3131)]: 'ᆰ',  // ㄹ + ㄱ = ㄺ
    [String.fromCharCode(0x11AF) + String.fromCharCode(0x3141)]: 'ᆱ',  // ㄹ + ㅁ = ㄻ
    [String.fromCharCode(0x11AF) + String.fromCharCode(0x3142)]: 'ᆲ',  // ㄹ + ㅂ = ㄼ
    [String.fromCharCode(0x11AF) + String.fromCharCode(0x3145)]: 'ᆳ',  // ㄹ + ㅅ = ㄽ
    [String.fromCharCode(0x11AF) + String.fromCharCode(0x314C)]: 'ᆴ',  // ㄹ + ㅌ = ㄾ
    [String.fromCharCode(0x11AF) + String.fromCharCode(0x3147)]: 'ᆵ',  // ㄹ + ㅍ = ㄿ
    [String.fromCharCode(0x11AF) + String.fromCharCode(0x314E)]: 'ᆶ',  // ㄹ + ㅎ = ㅀ
    [String.fromCharCode(0x11B8) + String.fromCharCode(0x3145)]: 'ᆹ',  // ㅂ + ㅅ = ㅄ
  }
  
  const combination = first + second
  const result = complexFinals[combination]
  
  if (result) {
    console.log(`🔗 Complex final formed: "${first}" + "${second}" = "${result}"`)
  }
  
  return result || null
}

// decomposeHangulSyllable function removed - no longer needed with simplified approach
