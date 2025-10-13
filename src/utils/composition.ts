/**
 * Korean Syllable Composition
 * Handles syllable composition, complex medials, and complex finals
 */

import { 
  COMPLEX_MEDIAL_MAPPINGS,
  COMPLEX_FINAL_MAPPINGS,
  COMPLEX_FINAL_DECOMPOSITION
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
  
  const combination = first + second
  const result = COMPLEX_MEDIAL_MAPPINGS[combination]
  
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
  const combination = first + second
  const result = COMPLEX_FINAL_MAPPINGS[combination]
  
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
  const components = COMPLEX_FINAL_DECOMPOSITION[complexFinal]
  if (components) {
    console.log(`🔍 Decomposing complex final "${complexFinal}" to: "${components.first}" + "${components.second}"`)
    return components
  }
  console.log(`⚠️ "${complexFinal}" is not a complex final, returning null`)
  return null
}

// decomposeHangulSyllable function removed - no longer needed with simplified approach
