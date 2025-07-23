/*
 * Korean Keyboard with Archaic Jamo Support
 * 
 * Copyright (c) 2025 Korean Keyboard Project Contributors
 * 
 * This software is provided 'as-is', without any express or implied warranty.
 * In no event will the authors be held liable for any damages arising from
 * the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 
 * 3. This notice may not be removed or altered from any source distribution.
 * 
 * This module implements Korean jamo processing with support for archaic
 * Korean characters (옛한글) using comprehensive mapping system.
 * 
 * Contributors:
 * - Korean linguistics research community
 * - Unicode Consortium standards
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

import Foundation

// MARK: - Jamo Types

enum JamoType {
    case consonant
    case vowel
}

enum JamoPosition {
    case initial
    case medial
    case final
}

struct JamoCharacter {
    let unicode: String
    let type: JamoType
    let position: JamoPosition
    let name: String
    let isArchaic: Bool
}

// MARK: - Korean Jamo Processor

class KoreanJamoProcessor {
    
    // MARK: - Properties
    
    private var jamoMap: [String: JamoCharacter] = [:]
    private var shiftCombinations: [String: String] = [:]
    private var doublePressCombinations: [String: String] = [:]
    private var keyCombinations: [String: String] = [:]
    
    // MARK: - Initialization
    
    init() {
        initializeJamoMappings()
        initializeArchaicMappings()
    }
    
    // MARK: - Jamo Mappings
    
    private func initializeJamoMappings() {
        // Modern initial consonants (초성)
        jamoMap["ㄱ"] = JamoCharacter(unicode: "ᄀ", type: .consonant, position: .initial, name: "기역", isArchaic: false)
        jamoMap["ㄴ"] = JamoCharacter(unicode: "ᄂ", type: .consonant, position: .initial, name: "니은", isArchaic: false)
        jamoMap["ㄷ"] = JamoCharacter(unicode: "ᄃ", type: .consonant, position: .initial, name: "디귿", isArchaic: false)
        jamoMap["ㄹ"] = JamoCharacter(unicode: "ᄅ", type: .consonant, position: .initial, name: "리을", isArchaic: false)
        jamoMap["ㅁ"] = JamoCharacter(unicode: "ᄆ", type: .consonant, position: .initial, name: "미음", isArchaic: false)
        jamoMap["ㅂ"] = JamoCharacter(unicode: "ᄇ", type: .consonant, position: .initial, name: "비읍", isArchaic: false)
        jamoMap["ㅅ"] = JamoCharacter(unicode: "ᄉ", type: .consonant, position: .initial, name: "시옷", isArchaic: false)
        jamoMap["ㅇ"] = JamoCharacter(unicode: "ᄋ", type: .consonant, position: .initial, name: "이응", isArchaic: false)
        jamoMap["ㅈ"] = JamoCharacter(unicode: "ᄌ", type: .consonant, position: .initial, name: "지읒", isArchaic: false)
        jamoMap["ㅊ"] = JamoCharacter(unicode: "ᄎ", type: .consonant, position: .initial, name: "치읓", isArchaic: false)
        jamoMap["ㅋ"] = JamoCharacter(unicode: "ᄏ", type: .consonant, position: .initial, name: "키읔", isArchaic: false)
        jamoMap["ㅌ"] = JamoCharacter(unicode: "ᄐ", type: .consonant, position: .initial, name: "티읕", isArchaic: false)
        jamoMap["ㅍ"] = JamoCharacter(unicode: "ᄑ", type: .consonant, position: .initial, name: "피읖", isArchaic: false)
        jamoMap["ㅎ"] = JamoCharacter(unicode: "ᄒ", type: .consonant, position: .initial, name: "히읗", isArchaic: false)
        
        // Modern medial vowels (중성)
        jamoMap["ㅏ"] = JamoCharacter(unicode: "ᅡ", type: .vowel, position: .medial, name: "아", isArchaic: false)
        jamoMap["ㅐ"] = JamoCharacter(unicode: "ᅢ", type: .vowel, position: .medial, name: "애", isArchaic: false)
        jamoMap["ㅑ"] = JamoCharacter(unicode: "ᅣ", type: .vowel, position: .medial, name: "야", isArchaic: false)
        jamoMap["ㅒ"] = JamoCharacter(unicode: "ᅤ", type: .vowel, position: .medial, name: "얘", isArchaic: false)
        jamoMap["ㅓ"] = JamoCharacter(unicode: "ᅥ", type: .vowel, position: .medial, name: "어", isArchaic: false)
        jamoMap["ㅔ"] = JamoCharacter(unicode: "ᅦ", type: .vowel, position: .medial, name: "에", isArchaic: false)
        jamoMap["ㅕ"] = JamoCharacter(unicode: "ᅧ", type: .vowel, position: .medial, name: "여", isArchaic: false)
        jamoMap["ㅖ"] = JamoCharacter(unicode: "ᅨ", type: .vowel, position: .medial, name: "예", isArchaic: false)
        jamoMap["ㅗ"] = JamoCharacter(unicode: "ᅩ", type: .vowel, position: .medial, name: "오", isArchaic: false)
        jamoMap["ㅘ"] = JamoCharacter(unicode: "ᅪ", type: .vowel, position: .medial, name: "와", isArchaic: false)
        jamoMap["ㅙ"] = JamoCharacter(unicode: "ᅫ", type: .vowel, position: .medial, name: "왜", isArchaic: false)
        jamoMap["ㅚ"] = JamoCharacter(unicode: "ᅬ", type: .vowel, position: .medial, name: "외", isArchaic: false)
        jamoMap["ㅛ"] = JamoCharacter(unicode: "ᅭ", type: .vowel, position: .medial, name: "요", isArchaic: false)
        jamoMap["ㅜ"] = JamoCharacter(unicode: "ᅮ", type: .vowel, position: .medial, name: "우", isArchaic: false)
        jamoMap["ㅝ"] = JamoCharacter(unicode: "ᅯ", type: .vowel, position: .medial, name: "워", isArchaic: false)
        jamoMap["ㅞ"] = JamoCharacter(unicode: "ᅰ", type: .vowel, position: .medial, name: "웨", isArchaic: false)
        jamoMap["ㅟ"] = JamoCharacter(unicode: "ᅱ", type: .vowel, position: .medial, name: "위", isArchaic: false)
        jamoMap["ㅠ"] = JamoCharacter(unicode: "ᅲ", type: .vowel, position: .medial, name: "유", isArchaic: false)
        jamoMap["ㅡ"] = JamoCharacter(unicode: "ᅳ", type: .vowel, position: .medial, name: "으", isArchaic: false)
        jamoMap["ㅢ"] = JamoCharacter(unicode: "ᅴ", type: .vowel, position: .medial, name: "의", isArchaic: false)
        jamoMap["ㅣ"] = JamoCharacter(unicode: "ᅵ", type: .vowel, position: .medial, name: "이", isArchaic: false)
        
        // Archaic jamos
        jamoMap["ㆍ"] = JamoCharacter(unicode: "ᆞ", type: .vowel, position: .medial, name: "아래아", isArchaic: true)
        jamoMap["ㅿ"] = JamoCharacter(unicode: "ᅀ", type: .consonant, position: .initial, name: "반시옷", isArchaic: true)
        jamoMap["ㆆ"] = JamoCharacter(unicode: "ᅙ", type: .consonant, position: .initial, name: "여린히읗", isArchaic: true)
        jamoMap["ㅸ"] = JamoCharacter(unicode: "ᄫ", type: .consonant, position: .initial, name: "쌍비읍", isArchaic: true)
    }
    
    private func initializeArchaicMappings() {
        // Shift key combinations
        shiftCombinations["M"] = "ᅀ" // 반시옷
        shiftCombinations["H"] = "ᅙ" // 여린히읗
        shiftCombinations["A"] = "ᆞ" // 아래아
        shiftCombinations["K"] = "ᄼ" // 반치읓
        shiftCombinations["T"] = "ᄾ" // 반치읓
        shiftCombinations["C"] = "ᅎ" // 반치읓
        shiftCombinations["P"] = "ᅐ" // 반치읓
        shiftCombinations["U"] = "ᅔ" // 반치읓
        shiftCombinations["W"] = "ᅕ" // 반치읓
        
        // Double key presses
        doublePressCombinations["N"] = "ᄔ" // 쌍니은
        doublePressCombinations["O"] = "ᅇ" // 쌍이응
        doublePressCombinations["L"] = "ᄙ" // 쌍리을
        doublePressCombinations["H"] = "ᅘ" // 쌍히읗
        doublePressCombinations["K"] = "ᄽ" // 반치읓
        doublePressCombinations["C"] = "ᅏ" // 반치읓
        doublePressCombinations["P"] = "ᅑ" // 반치읓
        
        // Key combinations
        keyCombinations["BO"] = "ᄫ" // 쌍비읍
        keyCombinations["BBO"] = "ᄬ" // 쌍비읍
        keyCombinations["PO"] = "ᅗ" // 쌍비읍
        keyCombinations["MO"] = "ᄝ" // 쌍비읍
    }
    
    // MARK: - Public Methods
    
    func processInput(_ input: String) -> String {
        var result = ""
        var jamos: [JamoCharacter] = []
        
        // Parse input into jamos
        for char in input {
            if let jamo = jamoMap[String(char)] {
                jamos.append(jamo)
            }
        }
        
        // Determine positions and compose syllables
        for (index, jamo) in jamos.enumerated() {
            let position = determinePosition(jamos, index)
            let positionalUnicode = convertToPositionalUnicode(jamo, position)
            result += positionalUnicode
        }
        
        return result
    }
    
    func getShiftCombination(_ key: String) -> String? {
        return shiftCombinations[key]
    }
    
    func getDoublePressCombination(_ key: String) -> String? {
        return doublePressCombinations[key]
    }
    
    func getKeyCombination(_ key1: String, _ key2: String) -> String? {
        let combination = key1 + key2
        return keyCombinations[combination]
    }
    
    func isArchaicJamo(_ char: String) -> Bool {
        return jamoMap[char]?.isArchaic ?? false
    }
    
    // MARK: - Private Methods
    
    private func determinePosition(_ jamos: [JamoCharacter], _ index: Int) -> JamoPosition {
        if jamos[index].type == .vowel {
            return .medial
        }
        
        // For consonants, determine based on position in sequence
        if index == 0 {
            return .initial
        }
        
        // Check if previous character is a vowel
        if index > 0 && jamos[index - 1].type == .vowel {
            return .final
        }
        
        // Check if next character is a vowel
        if index + 1 < jamos.count && jamos[index + 1].type == .vowel {
            return .initial
        }
        
        return .final
    }
    
    private func convertToPositionalUnicode(_ jamo: JamoCharacter, _ position: JamoPosition) -> String {
        // For now, return the basic unicode
        // In a full implementation, this would convert to the appropriate positional form
        return jamo.unicode
    }
} 