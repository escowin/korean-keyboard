/**
 * Korean Input Processor
 * Handles Korean input processing and syllable composition
 */

import { 
  isConsonant, 
  isVowel, 
  convertFinalToInitial
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
        // We have initial + medial, this could be final consonant
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
            currentSyllable = { initial: char, medial: '', final: '' }
          }
        } else {
          // This is the final consonant
          console.log(`   ✅ Adding final consonant "${char}"`)
          currentSyllable.final = char
        }
      } else if (currentSyllable.initial && !currentSyllable.medial) {
        // We have initial but no medial, this could be a double consonant
        // For now, treat as new initial (could be enhanced for double consonants)
        console.log(`   ✅ No medial found, treating "${char}" as new initial`)
        result += currentSyllable.initial
        currentSyllable = { initial: char, medial: '', final: '' }
      } else {
        // This is the initial consonant
        console.log(`   ✅ Setting initial consonant "${char}"`)
        currentSyllable.initial = char
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
          
          // If we had a final consonant, convert it to initial for the new syllable
          if (currentSyllable.final) {
            const initialConsonant = convertFinalToInitial(currentSyllable.final)
            currentSyllable = { initial: initialConsonant, medial: char, final: '' }
            console.log(`   ✅ Converted final "${currentSyllable.final}" to initial "${initialConsonant}" for new syllable`)
          } else {
            currentSyllable = { initial: '', medial: char, final: '' }
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
            currentSyllable = { initial: '', medial: char, final: '' }
          }
        } else {
          // This is the first medial vowel
          console.log(`   ✅ Adding medial vowel "${char}"`)
          currentSyllable.medial = char
        }
      } else {
        // Standalone vowel - with simplified approach, we don't need to handle previous final consonants
        console.log(`   ✅ Standalone vowel "${char}"`)
        result += char
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
