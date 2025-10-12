/**
 * Korean Input Processor
 * Handles Korean input processing and syllable composition
 */

import type { CompositionState } from '../types/korean.js'
import { 
  isConsonant, 
  isVowel, 
  isComposedHangulSyllable, 
  convertFinalToInitial 
} from './unicode.js'
import { 
  composeSyllable, 
  canFormComplexMedial, 
  canFormComplexFinal, 
  decomposeHangulSyllable 
} from './composition.js'

// Global composition state for Korean input
let compositionState: CompositionState = {
  currentSyllable: { initial: '', medial: '', final: '' },
  buffer: '',
  isComposing: false,
  lastChar: null
}

/**
 * Reset the composition state
 */
export function resetCompositionState(): void {
  compositionState = {
    currentSyllable: { initial: '', medial: '', final: '' },
    buffer: '',
    isComposing: false,
    lastChar: null
  }
}

/**
 * Get the current composition state
 */
export function getCompositionState(): CompositionState {
  return { ...compositionState }
}

/**
 * Process a single Korean character and update composition state
 * @param char - Single Korean character to process
 * @returns Object with processed text and composition status
 */
export function processKoreanCharacter(char: string): { text: string; isComposing: boolean; completedSyllable?: string } {
  console.log('🔤 processKoreanCharacter called with:', char)
  console.log('   Current composition state:', compositionState)
  console.log('   Is consonant:', isConsonant(char))
  console.log('   Is vowel:', isVowel(char))
  
  if (!char) return { text: '', isComposing: false }
  
  // Handle non-Korean characters
  if (!isConsonant(char) && !isVowel(char)) {
    console.log('   Non-Korean character, completing composition')
    // Complete any pending composition
    const result = completeCurrentComposition()
    resetCompositionState()
    console.log('   Completed composition result:', result)
    return { text: result + char, isComposing: false }
  }
  
  compositionState.lastChar = char
  compositionState.isComposing = true
  
  if (isConsonant(char)) {
    console.log('   Processing as consonant')
    return processConsonant(char)
  } else if (isVowel(char)) {
    console.log('   Processing as vowel')
    return processVowel(char)
  }
  
  return { text: '', isComposing: false }
}

/**
 * Process a consonant character
 */
function processConsonant(char: string): { text: string; isComposing: boolean; completedSyllable?: string } {
  const { currentSyllable } = compositionState
  console.log('   Processing consonant:', char, 'current syllable:', currentSyllable)
  
  // Check if this is a valid consonant for syllable composition (modern or archaic)
  if (!isConsonant(char)) {
    console.log('   Not a valid consonant, completing composition')
    // Not a consonant, complete any pending composition first
    const completedText = completeCurrentComposition()
    resetCompositionState()
    return { text: completedText + char, isComposing: false }
  }
  
  if (currentSyllable.initial && currentSyllable.medial) {
    // We have initial + medial, this could be final consonant
    if (currentSyllable.final) {
      // Already have final, complete current syllable and start new one
      const completedSyllable = composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
      compositionState.currentSyllable = { initial: char, medial: '', final: '' }
      return { text: completedSyllable, isComposing: true, completedSyllable }
    } else {
      // This is the final consonant
      compositionState.currentSyllable.final = char
      return { text: '', isComposing: true }
    }
  } else if (currentSyllable.initial && !currentSyllable.medial) {
    // We have initial but no medial, this new consonant should complete the previous syllable
    const completedSyllable = completeCurrentComposition()
    resetCompositionState()
    compositionState.currentSyllable = { initial: char, medial: '', final: '' }
    return { text: completedSyllable, isComposing: true, completedSyllable }
  } else {
    // This is the initial consonant
    compositionState.currentSyllable.initial = char
    return { text: '', isComposing: true }
  }
}

/**
 * Process a vowel character
 */
function processVowel(char: string): { text: string; isComposing: boolean; completedSyllable?: string } {
  const { currentSyllable } = compositionState
  
  if (currentSyllable.initial && currentSyllable.medial) {
    // We have initial + medial, complete current syllable and start new one
    const completedSyllable = composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
    compositionState.currentSyllable = { initial: '', medial: char, final: '' }
    return { text: completedSyllable, isComposing: true, completedSyllable }
  } else if (currentSyllable.initial) {
    // This is the medial vowel
    compositionState.currentSyllable.medial = char
    return { text: '', isComposing: true }
  } else {
    // Standalone vowel
    return { text: char, isComposing: false }
  }
}

/**
 * Complete the current composition and return the result
 */
export function completeCurrentComposition(): string {
  const { currentSyllable } = compositionState
  if (currentSyllable.initial) {
    return composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
  }
  return ''
}

/**
 * Get the current composition display (what should be shown in the textarea)
 */
export function getCurrentCompositionDisplay(): string {
  const { currentSyllable } = compositionState
  console.log('📺 getCurrentCompositionDisplay called, current syllable:', currentSyllable)
  console.log('📺 Composition state:', compositionState)
  
  if (currentSyllable.initial) {
    // If we have a complete syllable, compose it
    if (currentSyllable.medial) {
      const composed = composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
      console.log('   ✅ Composed syllable:', composed)
      return composed
    } else {
      // Show the initial consonant as-is while composing
      console.log('   🔤 Showing initial consonant:', currentSyllable.initial)
      return currentSyllable.initial
    }
  }
  console.log('   ❌ No composition to display')
  return ''
}

/**
 * Process Korean input and compose syllables (legacy function for backward compatibility)
 * @param input - Raw input string
 * @returns Processed string with composed syllables
 */
export function processKoreanInput(input: string): string {
  console.log('🔍 processKoreanInput called with:', input)
  if (!input) return ''
  
  let result = ''
  let currentSyllable = { initial: '', medial: '', final: '' }
  let previousFinalConsonant = ''
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    // console.log(`🔍 Processing char ${i}: "${char}" (${isConsonant(char) ? 'consonant' : isVowel(char) ? 'vowel' : isComposedHangulSyllable(char) ? 'composed-syllable' : 'other'})`)
    // console.log(`   Current syllable:`, currentSyllable)
    
    if (isComposedHangulSyllable(char)) {
      // Handle composed Hangul syllable
      console.log(`   ✅ Composed syllable "${char}", decomposing and handling`)
      
      // Complete any current syllable first
      if (currentSyllable.initial) {
        result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
        currentSyllable = { initial: '', medial: '', final: '' }
        previousFinalConsonant = ''
      }
      
      // Decompose the syllable
      const decomposed = decomposeHangulSyllable(char)
      console.log(`   📝 Decomposed "${char}" to:`, decomposed)
      
      // If it has no final, we can potentially add a final consonant OR another vowel to form complex medial
      if (!decomposed.final) {
        // This syllable can accept a final consonant or another vowel for complex medial
        currentSyllable = decomposed
        console.log(`   ✅ Syllable "${char}" can accept final consonant or complex medial vowel`)
      } else {
        // This syllable already has a final, check if there are more characters to process
        if (i < input.length - 1) {
          // There are more characters, check if next character can form complex final
          const nextChar = input[i + 1]
          const complexFinal = canFormComplexFinal(decomposed.final, nextChar)
          if (complexFinal) {
            // Form complex final and skip the next character
            currentSyllable = { initial: decomposed.initial, medial: decomposed.medial, final: complexFinal }
            console.log(`   ✅ Formed complex final "${decomposed.final}" + "${nextChar}" = "${complexFinal}"`)
            i++ // Skip the next character since we used it
        } else {
          // Cannot form complex final, check if next character is a vowel
          if (i < input.length - 1 && isVowel(input[i + 1])) {
            // Next character is a vowel, complete current syllable and store final consonant
            result += char
            previousFinalConsonant = decomposed.final
            console.log(`   ✅ Syllable "${char}" complete, storing final consonant "${decomposed.final}" for next syllable`)
          } else {
            // No vowel follows, complete current syllable
            result += char
            previousFinalConsonant = ''
            console.log(`   ✅ Syllable "${char}" already complete, adding to result`)
          }
        }
      } else {
        // No more characters, complete current syllable
        result += char
        console.log(`   ✅ Syllable "${char}" already complete, adding to result`)
      }
      }
    } else if (isConsonant(char)) {
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
          currentSyllable = { initial: '', medial: char, final: '' }
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
        // Check if we have a previous final consonant to use as initial
        if (previousFinalConsonant) {
          // Convert final consonant to initial consonant
          const initialConsonant = convertFinalToInitial(previousFinalConsonant)
          // Start new syllable with converted initial consonant
          currentSyllable = { initial: initialConsonant, medial: char, final: '' }
          previousFinalConsonant = ''
          console.log(`   ✅ Starting new syllable with converted initial "${currentSyllable.initial}" + "${char}"`)
        } else {
          // Standalone vowel
          console.log(`   ✅ Standalone vowel "${char}"`)
          result += char
        }
      }
    } else {
      // Non-Korean character, complete current syllable if any
      console.log(`   ✅ Non-Korean character "${char}", completing syllable if any`)
      if (currentSyllable.initial) {
        result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
        currentSyllable = { initial: '', medial: '', final: '' }
        previousFinalConsonant = ''
      }
      result += char
    }
    
    console.log(`   Result so far: "${result}"`)
    console.log(`   Updated syllable:`, currentSyllable)
  }
  
  // Complete final syllable if any
  if (currentSyllable.initial) {
    console.log('🔍 Completing final syllable:', currentSyllable)
    result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
  }
  
  console.log('🔍 processKoreanInput result:', result)
  return result
}
