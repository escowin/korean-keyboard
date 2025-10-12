/**
 * Korean Syllable Composition
 * Handles syllable composition, complex medials, and complex finals
 */

import { 
  getInitialConsonantCode, 
  getMedialVowelCode, 
  getFinalConsonantCode,
  isArchaicMedialVowel,
  getArchaicSyllable,
  ARCHAIC_COMPLEX_MEDIAL_MAPPINGS
} from './unicode.js'

/**
 * Calculate Unicode for a Korean syllable block
 * @param initial - Initial consonant
 * @param medial - Medial vowel
 * @param final - Final consonant (optional)
 * @returns Composed syllable
 */
export function composeSyllable(initial: string, medial: string, final: string = ''): string {
  // Handle edge cases
  if (!initial && !medial && !final) return ''
  if (!initial && !medial) return final
  if (!initial && !final) return medial
  if (!medial && !final) return initial
  
  console.log('🔤 composeSyllable called with:', { initial, medial, final })
  
  // Check if this involves archaic jamo that needs special handling
  if (isArchaicMedialVowel(medial)) {
    console.log('   🏛️ Archaic medial vowel detected:', medial)
    const archaicSyllable = getArchaicSyllable(initial, medial, final)
    if (archaicSyllable) {
      console.log('   ✅ Found precomposed archaic syllable:', archaicSyllable)
      return archaicSyllable
    } else {
      console.log('   ⚠️ No precomposed form found, returning jamo as-is')
      return initial + medial + final
    }
  }
  
  // Get Unicode codes using the specific helper functions
  const initialCode = initial ? getInitialConsonantCode(initial) : null
  const medialCode = medial ? getMedialVowelCode(medial) : null
  const finalCode = final ? getFinalConsonantCode(final) : null
  
  console.log('   Unicode codes:', { initialCode, medialCode, finalCode })
  
  // If we don't have both initial and medial, return as-is
  if (!initialCode || !medialCode) {
    console.log('   Missing initial or medial, returning as-is')
    return initial + medial + final
  }
  
  // Validate that the initial consonant is in a valid range for composition
  // Standard range: 0x1100-0x1112, Extended range: 0x1113-0x1116 (for some archaic characters)
  if (initialCode < 0x1100 || initialCode > 0x1116) {
    console.log('   ❌ Initial consonant outside valid composition range:', initialCode, 'returning as-is')
    return initial + medial + final
  }
  
  console.log('   ✅ Initial consonant in valid range, proceeding with composition')
  
  // Base syllable: 가 (0xAC00)
  const base = 0xAC00
  const initialOffset = (initialCode - 0x1100) * 21 * 28
  const medialOffset = (medialCode - 0x1161) * 28
  const finalOffset = finalCode ? (finalCode - 0x11A8 + 1) : 0
  
  console.log('   📊 Composition calculation:')
  console.log('     base:', base, '(0xAC00)')
  console.log('     initialOffset:', initialOffset, '(initialCode - 0x1100) * 21 * 28')
  console.log('     medialOffset:', medialOffset, '(medialCode - 0x1161) * 28')
  console.log('     finalOffset:', finalOffset, finalCode ? '(finalCode - 0x11A8 + 1)' : '0')
  
  const syllableCode = base + initialOffset + medialOffset + finalOffset
  const result = String.fromCharCode(syllableCode)
  console.log('   🎯 Composed syllable:', result, 'code:', syllableCode, '(0x' + syllableCode.toString(16) + ')')
  
  // Debug specific case: ㅅㅗㅎ should be 솧
  if (initial === 'ㅅ' && medial === 'ㅗ' && final === 'ㅎ') {
    console.log('   🧪 DEBUG: ㅅㅗㅎ composition test')
    console.log('     Expected: 솧 (0x' + (0xAC00 + (0x1109 - 0x1100) * 21 * 28 + (0x1169 - 0x1161) * 28 + (0x11C2 - 0x11A8)).toString(16) + ')')
    console.log('     Actual: ' + result + ' (0x' + syllableCode.toString(16) + ')')
  }
  
  // Debug final consonant mapping
  if (final && finalCode) {
    console.log('   🔍 Final consonant mapping:', final, '->', finalCode, '(0x' + finalCode.toString(16) + ')')
  }
  
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

/**
 * Decompose a composed Hangul syllable into its components
 * @param syllable - Composed Hangul syllable
 * @returns Object with initial, medial, final components
 */
export function decomposeHangulSyllable(syllable: string): { initial: string, medial: string, final: string } {
  const code = syllable.charCodeAt(0)
  const base = 0xAC00
  const initialOffset = Math.floor((code - base) / (21 * 28))
  const medialOffset = Math.floor(((code - base) % (21 * 28)) / 28)
  const finalOffset = (code - base) % 28
  
  const initialCode = 0x1100 + initialOffset
  const medialCode = 0x1161 + medialOffset
  const finalCode = finalOffset > 0 ? 0x11A7 + finalOffset : null
  
  console.log(`🔍 Decomposing "${syllable}" (${code}):`)
  console.log(`   Offsets: initial=${initialOffset}, medial=${medialOffset}, final=${finalOffset}`)
  
  return {
    initial: String.fromCharCode(initialCode),
    medial: String.fromCharCode(medialCode),
    final: finalCode ? String.fromCharCode(finalCode) : ''
  }
}
