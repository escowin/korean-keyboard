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
 * This header defines the JamoProcessor class for Korean jamo processing
 * with support for archaic Korean characters (옛한글).
 * 
 * Contributors:
 * - Korean linguistics research community
 * - Unicode Consortium standards
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

#pragma once

#include <string>
#include <vector>
#include <unordered_map>
#include <memory>

namespace KoreanKeyboard {

enum class JamoType {
    CONSONANT,
    VOWEL
};

enum class JamoPosition {
    INITIAL,    // 초성
    MEDIAL,     // 중성
    FINAL       // 종성
};

struct JamoCharacter {
    wchar_t unicode;
    JamoType type;
    JamoPosition position;
    std::wstring name;
    bool isArchaic;
};

class JamoProcessor {
public:
    JamoProcessor();
    ~JamoProcessor() = default;

    // Process input string and return composed syllables
    std::wstring processInput(const std::wstring& input);
    
    // Parse individual jamo characters
    std::vector<JamoCharacter> parseJamo(const std::wstring& input);
    
    // Compose syllable from jamo sequence
    std::wstring composeSyllable(const std::vector<JamoCharacter>& jamos);
    
    // Check if character is archaic
    bool isArchaicJamo(wchar_t ch);
    
    // Get jamo information
    JamoCharacter getJamoInfo(wchar_t ch);
    
    // Validate jamo combination
    bool isValidCombination(const std::vector<JamoCharacter>& jamos);

private:
    // Initialize jamo mappings
    void initializeJamoMappings();
    
    // Determine position based on sequence
    JamoPosition determinePosition(const std::vector<JamoCharacter>& jamos, size_t index);
    
    // Convert jamo to appropriate Unicode position
    wchar_t convertToPositionalUnicode(const JamoCharacter& jamo, JamoPosition position);

    // Jamo mappings
    std::unordered_map<wchar_t, JamoCharacter> jamoMap;
    
    // Archaic jamo definitions
    static const std::vector<wchar_t> archaicJamos;
    
    // Unicode ranges
    static const wchar_t INITIAL_CONSONANT_START = 0x1100;
    static const wchar_t INITIAL_CONSONANT_END = 0x1112;
    static const wchar_t MEDIAL_VOWEL_START = 0x1161;
    static const wchar_t MEDIAL_VOWEL_END = 0x1175;
    static const wchar_t FINAL_CONSONANT_START = 0x11A8;
    static const wchar_t FINAL_CONSONANT_END = 0x11C6;
    
    // Syllable base
    static const wchar_t SYLLABLE_BASE = 0xAC00;
};

} // namespace KoreanKeyboard 