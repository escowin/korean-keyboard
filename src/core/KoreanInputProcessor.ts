/**
 * Core Korean Input Processor
 * Extracted logic for Korean character processing and syllable composition
 * This can be shared across platforms (web, iOS, Windows, Linux)
 */

import type { 
  KoreanCharacter, 
  SyllableComposition,
  KoreanInputResult,
  KoreanInputError,
  KoreanInputErrorDetails,
  CompositionState,
  KoreanPosition,
  KoreanCharacterType
} from '../types/korean.js';

import { 
  UNICODE_RANGES, 
  VARIANT_MAPPINGS,
  composeSyllable,
  isConsonant,
  isVowel
} from '../utils/koreanKeyboard.js';

export class KoreanInputProcessor {
  private compositionState: CompositionState;
  private errorHandler?: (error: KoreanInputErrorDetails) => void;

  constructor(errorHandler?: (error: KoreanInputErrorDetails) => void) {
    this.compositionState = {
      currentSyllable: { initial: '', medial: '', final: '' },
      buffer: '',
      isComposing: false,
      lastChar: null
    };
    this.errorHandler = errorHandler;
  }

  /**
   * Process a single character input
   * @param char - The character to process
   * @returns Processing result
   */
  public processCharacter(char: string): KoreanInputResult {
    try {
      if (!char) {
        return this.createResult('', false, 0);
      }

      const result = this.composeCharacter(char);
      return this.createResult(result, this.hasKorean(result), this.countSyllables(result));
    } catch (error) {
      this.handleError(KoreanInputError.COMPOSITION_FAILED, `Failed to process character: ${char}`, char);
      return this.createResult(char, false, 0);
    }
  }

  /**
   * Process a complete input string
   * @param input - The input string to process
   * @returns Processing result
   */
  public processInput(input: string): KoreanInputResult {
    try {
      if (!input) {
        return this.createResult('', false, 0);
      }

      let result = '';
      let syllablesComposed = 0;
      let hasKoreanChars = false;

      for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const charResult = this.processCharacter(char);
        
        result += charResult.processedText;
        syllablesComposed += charResult.syllablesComposed;
        hasKoreanChars = hasKoreanChars || charResult.hasKorean;
      }

      // Complete any pending syllable
      if (this.compositionState.currentSyllable.initial) {
        const finalSyllable = this.completeSyllable();
        result += finalSyllable;
        if (finalSyllable) syllablesComposed++;
      }

      return this.createResult(result, hasKoreanChars, syllablesComposed);
    } catch (error) {
      this.handleError(KoreanInputError.COMPOSITION_FAILED, `Failed to process input: ${input}`);
      return this.createResult(input, false, 0);
    }
  }

  /**
   * Get archaic variants for a character
   * @param char - Base character
   * @returns Array of variants
   */
  public getArchaicVariants(char: string): string[] {
    return VARIANT_MAPPINGS[char] || [char];
  }

  /**
   * Check if a character has archaic variants
   * @param char - Character to check
   * @returns Whether the character has variants
   */
  public hasArchaicVariants(char: string): boolean {
    const variants = this.getArchaicVariants(char);
    return variants.length > 1;
  }

  /**
   * Get character metadata
   * @param char - Character to analyze
   * @returns Character metadata
   */
  public getCharacterInfo(char: string): KoreanCharacter | null {
    if (!char || char.length !== 1) return null;

    const isConsonantChar = isConsonant(char);
    const isVowelChar = isVowel(char);
    
    if (!isConsonantChar && !isVowelChar) return null;

    return {
      char,
      unicode: char.charCodeAt(0),
      type: isConsonantChar ? 'consonant' : 'vowel',
      position: this.determinePosition(char),
      isArchaic: this.isArchaicCharacter(char),
      archaicVariants: this.getArchaicVariants(char)
    };
  }

  /**
   * Reset the composition state
   */
  public reset(): void {
    this.compositionState = {
      currentSyllable: { initial: '', medial: '', final: '' },
      buffer: '',
      isComposing: false,
      lastChar: null
    };
  }

  /**
   * Get current composition state
   * @returns Current state
   */
  public getState(): CompositionState {
    return { ...this.compositionState };
  }

  /**
   * Set error handler
   * @param handler - Error handler function
   */
  public setErrorHandler(handler: (error: KoreanInputErrorDetails) => void): void {
    this.errorHandler = handler;
  }

  // Private methods

  private composeCharacter(char: string): string {
    if (isConsonant(char)) {
      return this.handleConsonant(char);
    } else if (isVowel(char)) {
      return this.handleVowel(char);
    } else {
      // Non-Korean character, complete current syllable
      const result = this.completeSyllable() + char;
      this.reset();
      return result;
    }
  }

  private handleConsonant(char: string): string {
    const { currentSyllable } = this.compositionState;

    if (currentSyllable.initial && currentSyllable.medial) {
      // We have initial + medial, this could be final consonant
      if (currentSyllable.final) {
        // Already have final, complete current syllable and start new one
        const result = this.completeSyllable();
        this.startNewSyllable(char);
        return result;
      } else {
        // This is the final consonant
        currentSyllable.final = char;
        return '';
      }
    } else if (currentSyllable.initial && !currentSyllable.medial) {
      // We have initial but no medial, this could be a double consonant
      // For now, treat as new initial (could be enhanced for double consonants)
      const result = currentSyllable.initial;
      this.startNewSyllable(char);
      return result;
    } else {
      // This is the initial consonant
      currentSyllable.initial = char;
      return '';
    }
  }

  private handleVowel(char: string): string {
    const { currentSyllable } = this.compositionState;

    if (currentSyllable.initial && currentSyllable.medial) {
      // We have initial + medial, complete current syllable and start new one
      const result = this.completeSyllable();
      this.startNewSyllable('', char);
      return result;
    } else if (currentSyllable.initial) {
      // This is the medial vowel
      currentSyllable.medial = char;
      return '';
    } else {
      // Standalone vowel
      return char;
    }
  }

  private completeSyllable(): string {
    const { currentSyllable } = this.compositionState;
    
    if (currentSyllable.initial) {
      const result = composeSyllable(
        currentSyllable.initial, 
        currentSyllable.medial, 
        currentSyllable.final
      );
      this.reset();
      return result;
    }
    
    return '';
  }

  private startNewSyllable(initial: string, medial: string = ''): void {
    this.compositionState.currentSyllable = {
      initial,
      medial,
      final: ''
    };
  }

  private determinePosition(char: string): KoreanPosition {
    if (isConsonant(char)) {
      return 'initial'; // Default, could be enhanced
    } else if (isVowel(char)) {
      return 'medial';
    }
    return 'initial'; // Fallback
  }

  private isArchaicCharacter(char: string): boolean {
    // Check if character is in archaic mappings
    for (const variants of Object.values(VARIANT_MAPPINGS)) {
      if (variants.includes(char) && variants[0] !== char) {
        return true;
      }
    }
    return false;
  }

  private hasKorean(text: string): boolean {
    return /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/.test(text);
  }

  private countSyllables(text: string): number {
    return (text.match(/[\uAC00-\uD7AF]/g) || []).length;
  }

  private createResult(processedText: string, hasKorean: boolean, syllablesComposed: number): KoreanInputResult {
    return {
      processedText,
      hasKorean,
      syllablesComposed
    };
  }

  private handleError(error: KoreanInputError, message: string, character?: string, position?: number): void {
    const errorDetails: KoreanInputErrorDetails = {
      error,
      message,
      character,
      position,
      context: 'KoreanInputProcessor'
    };

    if (this.errorHandler) {
      this.errorHandler(errorDetails);
    } else {
      console.error('Korean Input Error:', errorDetails);
    }
  }
}

// Export a default instance
export const koreanInputProcessor = new KoreanInputProcessor();
