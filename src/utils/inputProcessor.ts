/**
 * Korean Input Processor
 * Handles Korean input processing and syllable composition
 */

import { 
  isConsonant, 
  isVowel, 
  convertFinalToInitial,
  convertCompatibilityToHangulJamoByContext
} from './unicode.js'
import { 
  composeSyllable, 
  canFormComplexMedial, 
  canFormComplexFinal
} from './composition.js'

/**
 * Process Korean input and compose syllables using simplified Hangul Jamo approach
 * All characters (modern and archaic) are treated uniformly
 * @param input - Raw input string
 * @returns Processed string with composed syllables
 */
export function processKoreanInput(input: string): string {
  console.log('🔍 processKoreanInput (simplified) called with:', input)
  if (!input) return ''
  
  let result = ''
  let currentSyllable = { initial: '', medial: '', final: '' }
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    console.log(`🔍 Processing char ${i}: "${char}" (${isConsonant(char) ? 'consonant' : isVowel(char) ? 'vowel' : 'other'})`)
    
    // With simplified approach, we only handle individual jamo characters
    // Precomposed syllables should not occur in our input stream
    
    if (isConsonant(char)) {
      if (currentSyllable.initial && currentSyllable.medial) {
        // Korean orthography rule: consonant after medial becomes final (initial-medial-final)
        if (currentSyllable.final) {
          // Already have final, check if we can form a complex final
          const complexFinal = canFormComplexFinal(currentSyllable.final, char)
          if (complexFinal) {
            // Form complex final
            currentSyllable.final = complexFinal
            console.log(`   ✅ Formed complex final "${currentSyllable.final}" + "${char}" = "${complexFinal}"`)
          } else {
            // Cannot form complex final, complete current syllable and start new one
            console.log(`   ✅ Completing syllable with final, starting new with "${char}"`)
            result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
            // Convert to initial for new syllable
            const initialChar = convertCompatibilityToHangulJamoByContext(char, 'initial')
            currentSyllable = { initial: initialChar, medial: '', final: '' }
          }
        } else {
          // Korean orthography: consonant after medial → final form
          const finalChar = convertCompatibilityToHangulJamoByContext(char, 'final')
          console.log(`   ✅ Korean orthography: consonant after medial → final "${char}" → "${finalChar}"`)
          currentSyllable.final = finalChar
        }
      } else if (currentSyllable.initial && !currentSyllable.medial) {
        // We have initial but no medial, this could be a double consonant
        // For now, treat as new initial (could be enhanced for double consonants)
        console.log(`   ✅ No medial found, treating "${char}" as new initial`)
        result += currentSyllable.initial
        // Convert to initial for new syllable
        const initialChar = convertCompatibilityToHangulJamoByContext(char, 'initial')
        currentSyllable = { initial: initialChar, medial: '', final: '' }
      } else {
        // This is the initial consonant - convert to initial form
        const initialChar = convertCompatibilityToHangulJamoByContext(char, 'initial')
        console.log(`   ✅ Setting initial consonant "${char}" → "${initialChar}"`)
        currentSyllable.initial = initialChar
      }
    } else if (isVowel(char)) {
      if (currentSyllable.initial && currentSyllable.medial) {
        // We have initial + medial, check if we can form a complex medial
        const complexMedial = canFormComplexMedial(currentSyllable.medial, char)
        if (complexMedial) {
          // Replace the existing medial with the complex medial
          console.log(`   ✅ Forming complex medial: "${currentSyllable.medial}" + "${char}" = "${complexMedial}"`)
          currentSyllable.medial = complexMedial
        } else {
          // Cannot form complex medial, complete current syllable and start new one
          console.log(`   ✅ Cannot form complex medial, completing syllable and starting new with "${char}"`)
          result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
          
          // Korean orthography rule: medial after final → convert final to initial (initial-medial, initial-medial)
          if (currentSyllable.final) {
            const initialConsonant = convertFinalToInitial(currentSyllable.final)
            const medialChar = convertCompatibilityToHangulJamoByContext(char, 'auto')
            currentSyllable = { initial: initialConsonant, medial: medialChar, final: '' }
            console.log(`   ✅ Korean orthography: medial after final → final to initial "${currentSyllable.final}" → "${initialConsonant}"`)
          } else {
            const medialChar = convertCompatibilityToHangulJamoByContext(char, 'auto')
            currentSyllable = { initial: '', medial: medialChar, final: '' }
          }
        }
      } else if (currentSyllable.initial) {
        // Check if we can form a complex medial with existing medial
        if (currentSyllable.medial) {
          const complexMedial = canFormComplexMedial(currentSyllable.medial, char)
          if (complexMedial) {
            // Replace the existing medial with the complex medial
            console.log(`   ✅ Forming complex medial: "${currentSyllable.medial}" + "${char}" = "${complexMedial}"`)
            currentSyllable.medial = complexMedial
        } else {
          // Cannot form complex medial, complete current syllable and start new one
          console.log(`   ✅ Cannot form complex medial, completing syllable and starting new with "${char}"`)
          result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
          const medialChar = convertCompatibilityToHangulJamoByContext(char, 'auto')
          currentSyllable = { initial: '', medial: medialChar, final: '' }
        }
        } else {
          // Korean orthography rule: medial after final → convert final to initial (initial-medial, initial-medial)
          if (currentSyllable.final) {
            const initialConsonant = convertFinalToInitial(currentSyllable.final)
            const medialChar = convertCompatibilityToHangulJamoByContext(char, 'auto')
            currentSyllable = { initial: initialConsonant, medial: medialChar, final: '' }
            console.log(`   ✅ Korean orthography: medial after final → final to initial "${currentSyllable.final}" → "${initialConsonant}"`)
          } else {
            // This is the first medial vowel - convert to medial form
            const medialChar = convertCompatibilityToHangulJamoByContext(char, 'auto')
            console.log(`   ✅ Adding medial vowel "${char}" → "${medialChar}"`)
            currentSyllable.medial = medialChar
          }
        }
      } else {
        // Standalone vowel - convert to medial form
        const medialChar = convertCompatibilityToHangulJamoByContext(char, 'auto')
        console.log(`   ✅ Standalone vowel "${char}" → "${medialChar}"`)
        result += medialChar
      }
    } else {
      // Non-Korean character, complete current syllable if any
      console.log(`   ✅ Non-Korean character "${char}", completing syllable if any`)
      if (currentSyllable.initial) {
        result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
        currentSyllable = { initial: '', medial: '', final: '' }
      }
      result += char
    }
    
    console.log(`   Result so far: "${result}"`)
  }
  
  // Complete final syllable if any
  if (currentSyllable.initial) {
    console.log('🔍 Completing final syllable:', currentSyllable)
    result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
  }
  
  console.log('🔍 processKoreanInput result:', result)
  return result
}
