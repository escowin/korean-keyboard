/**
 * Korean Syllable Composition
 * Handles syllable composition, complex medials, and complex finals
 */


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
  
  console.log('🔤 composeSyllable (simplified) called with:', {
    initial: `${initial} (U+${initial ? initial.charCodeAt(0).toString(16).toUpperCase() : 'N/A'})`,
    medial: `${medial} (U+${medial ? medial.charCodeAt(0).toString(16).toUpperCase() : 'N/A'})`,
    final: `${final} (U+${final ? final.charCodeAt(0).toString(16).toUpperCase() : 'N/A'})`
  })
  
  // Simply concatenate the components - browser will render as syllable block
  // This works for both modern and archaic Korean characters
  const result = initial + medial + final
  console.log('   🎯 Returning Hangul Jamo sequence:', `${result} (U+${result ? result.split('').map(c => c.charCodeAt(0).toString(16).toUpperCase()).join(', U+') : 'N/A'})`, '(browser will render as block)')
  
  return result
}

/**
 * Check if two vowels can form a complex medial (diphthong)
 * @param first - First vowel
 * @param second - Second vowel
 * @returns Complex medial character or null if not combinable
 */
export function canFormComplexMedial(first: string, second: string): string | null {
  console.log(`🔍 canFormComplexMedial called with: "${first}" (U+${first.charCodeAt(0).toString(16).toUpperCase()}) + "${second}" (U+${second.charCodeAt(0).toString(16).toUpperCase()})`)
  
  // Check for modern and archaic complex medials
  const complexMedials: { [key: string]: string } = {
    // Modern complex medials
    [String.fromCharCode(0x1169) + String.fromCharCode(0x314F)]: String.fromCharCode(0x116A),  // ㅗ + ㅏ = ᅪ (Hangul Jamo)
    [String.fromCharCode(0x1169) + String.fromCharCode(0x3150)]: String.fromCharCode(0x116B),  // ㅗ + ㅐ = ᅫ (Hangul Jamo)
    [String.fromCharCode(0x1169) + String.fromCharCode(0x3163)]: String.fromCharCode(0x116C),  // ㅗ + ㅣ = ᅬ (Hangul Jamo)
    [String.fromCharCode(0x116E) + String.fromCharCode(0x3153)]: String.fromCharCode(0x116F),  // ㅜ + ㅓ = ᅯ (Hangul Jamo)
    [String.fromCharCode(0x116E) + String.fromCharCode(0x3154)]: String.fromCharCode(0x1170),  // ㅜ + ㅔ = ᅰ (Hangul Jamo)
    [String.fromCharCode(0x116E) + String.fromCharCode(0x3163)]: String.fromCharCode(0x1171),  // ㅜ + ㅣ = ᅱ (Hangul Jamo)
    [String.fromCharCode(0x1173) + String.fromCharCode(0x3163)]: String.fromCharCode(0x1174),  // ㅡ + ㅣ = ᅴ (Hangul Jamo)
    
    // Archaic complex medials (ㆍ + vowel combinations)
    [String.fromCharCode(0x119E) + String.fromCharCode(0x314F)]: String.fromCharCode(0xD7C5),  // ᆞ + ㅏ = ퟅ (Hangul Jamo)
    [String.fromCharCode(0x119E) + String.fromCharCode(0x3153)]: String.fromCharCode(0x119F),  // ᆞ + ㅓ = ᆟ (Hangul Jamo)
    [String.fromCharCode(0x119E) + String.fromCharCode(0x3154)]: String.fromCharCode(0xD7C6),  // ᆞ + ㅔ = ퟆ (Hangul Jamo)
    [String.fromCharCode(0x119E) + String.fromCharCode(0x315C)]: String.fromCharCode(0x11A0),  // ᆞ + ㅜ = ᆠ (Hangul Jamo)
    [String.fromCharCode(0x119E) + String.fromCharCode(0x3163)]: String.fromCharCode(0x11A1)   // ᆞ + ㅣ = ᆡ (Hangul Jamo)
  }
  
  const combination = first + second
  const result = complexMedials[combination]
  
  if (result) {
    console.log(`🔗 Complex medial formed: "${first}" + "${second}" = "${result}" (U+${result.charCodeAt(0).toString(16).toUpperCase()})`)
    console.log(`   📊 Combination key: "${combination}" (U+${combination.split('').map(c => c.charCodeAt(0).toString(16).toUpperCase()).join(', U+')})`)
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
 * Decompose a complex final consonant into its component parts
 * @param complexFinal - Complex final consonant
 * @returns Object with first and second components, or null if not a complex final
 */
export function decomposeComplexFinal(complexFinal: string): { first: string, second: string } | null {
  const complexFinals: { [key: string]: { first: string, second: string } } = {
    // Modern complex finals (reverse mapping)
    [String.fromCharCode(0x11AA)]: { first: String.fromCharCode(0x11A8), second: String.fromCharCode(0x3145) }, // ㄳ → ㄱ + ㅅ
    [String.fromCharCode(0x11AC)]: { first: String.fromCharCode(0x11AB), second: String.fromCharCode(0x3148) }, // ㄵ → ㄴ + ㅈ
    [String.fromCharCode(0x11AD)]: { first: String.fromCharCode(0x11AB), second: String.fromCharCode(0x314E) }, // ㄶ → ㄴ + ㅎ
    [String.fromCharCode(0x11B0)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3131) }, // ㄺ → ㄹ + ㄱ
    [String.fromCharCode(0x11B1)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3141) }, // ㄻ → ㄹ + ㅁ
    [String.fromCharCode(0x11B2)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3142) }, // ㄼ → ㄹ + ㅂ
    [String.fromCharCode(0x11B3)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3145) }, // ㄽ → ㄹ + ㅅ
    [String.fromCharCode(0x11B4)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x314C) }, // ㄾ → ㄹ + ㅌ
    [String.fromCharCode(0x11B5)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x3147) }, // ㄿ → ㄹ + ㅍ
    [String.fromCharCode(0x11B6)]: { first: String.fromCharCode(0x11AF), second: String.fromCharCode(0x314E) }, // ㅀ → ㄹ + ㅎ
    [String.fromCharCode(0x11B9)]: { first: String.fromCharCode(0x11B8), second: String.fromCharCode(0x3145) }, // ㅄ → ㅂ + ㅅ
  }
  
  const components = complexFinals[complexFinal]
  if (components) {
    console.log(`🔍 Decomposing complex final "${complexFinal}" to: "${components.first}" + "${components.second}"`)
    return components
  }
  console.log(`⚠️ "${complexFinal}" is not a complex final, returning null`)
  return null
}

// decomposeHangulSyllable function removed - no longer needed with simplified approach
