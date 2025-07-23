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
 * Korean characters (옛한글) and syllabic composition algorithms.
 * 
 * Contributors:
 * - Korean linguistics research community
 * - Unicode Consortium standards
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

#include "JamoProcessor.h"
#include <algorithm>
#include <stdexcept>

namespace KoreanKeyboard {

// Define archaic jamos - Microsoft Old Hangul keyboard mapping
const std::vector<wchar_t> JamoProcessor::archaicJamos = {
    0x1197, // ㆍ (아래아)
    0x113F, // ㅿ (반시옷)
    0x1146, // ㆆ (여린히읗)
    0x1170, // ㅸ (쌍비읍)
    0x1154, // ᄔ (쌍니은)
    0x1147, // ᅇ (쌍이응)
    0x1159, // ᄙ (쌍리을)
    0x113C, // ᄼ (반치읓)
    0x113E, // ᄾ (반치읓)
    0x114E, // ᅎ (반치읓)
    0x1150, // ᅐ (반치읓)
    0x1154, // ᅔ (반치읓)
    0x1155, // ᅕ (반치읓)
    0x1140, // ᅀ (반시옷)
    0x1159, // ᅙ (여린히읗)
    0x119E  // ᆞ (아래아)
};

JamoProcessor::JamoProcessor() {
    initializeJamoMappings();
}

void JamoProcessor::initializeJamoMappings() {
    // Modern initial consonants (초성)
    jamoMap[L'ㄱ'] = {0x1100, JamoType::CONSONANT, JamoPosition::INITIAL, L"기역", false};
    jamoMap[L'ㄴ'] = {0x1102, JamoType::CONSONANT, JamoPosition::INITIAL, L"니은", false};
    jamoMap[L'ㄷ'] = {0x1103, JamoType::CONSONANT, JamoPosition::INITIAL, L"디귿", false};
    jamoMap[L'ㄹ'] = {0x1105, JamoType::CONSONANT, JamoPosition::INITIAL, L"리을", false};
    jamoMap[L'ㅁ'] = {0x1106, JamoType::CONSONANT, JamoPosition::INITIAL, L"미음", false};
    jamoMap[L'ㅂ'] = {0x1107, JamoType::CONSONANT, JamoPosition::INITIAL, L"비읍", false};
    jamoMap[L'ㅅ'] = {0x1109, JamoType::CONSONANT, JamoPosition::INITIAL, L"시옷", false};
    jamoMap[L'ㅇ'] = {0x110B, JamoType::CONSONANT, JamoPosition::INITIAL, L"이응", false};
    jamoMap[L'ㅈ'] = {0x110C, JamoType::CONSONANT, JamoPosition::INITIAL, L"지읒", false};
    jamoMap[L'ㅊ'] = {0x110E, JamoType::CONSONANT, JamoPosition::INITIAL, L"치읓", false};
    jamoMap[L'ㅋ'] = {0x110F, JamoType::CONSONANT, JamoPosition::INITIAL, L"키읔", false};
    jamoMap[L'ㅌ'] = {0x1110, JamoType::CONSONANT, JamoPosition::INITIAL, L"티읕", false};
    jamoMap[L'ㅍ'] = {0x1111, JamoType::CONSONANT, JamoPosition::INITIAL, L"피읖", false};
    jamoMap[L'ㅎ'] = {0x1112, JamoType::CONSONANT, JamoPosition::INITIAL, L"히읗", false};

    // Modern medial vowels (중성)
    jamoMap[L'ㅏ'] = {0x1161, JamoType::VOWEL, JamoPosition::MEDIAL, L"아", false};
    jamoMap[L'ㅐ'] = {0x1162, JamoType::VOWEL, JamoPosition::MEDIAL, L"애", false};
    jamoMap[L'ㅑ'] = {0x1163, JamoType::VOWEL, JamoPosition::MEDIAL, L"야", false};
    jamoMap[L'ㅒ'] = {0x1164, JamoType::VOWEL, JamoPosition::MEDIAL, L"얘", false};
    jamoMap[L'ㅓ'] = {0x1165, JamoType::VOWEL, JamoPosition::MEDIAL, L"어", false};
    jamoMap[L'ㅔ'] = {0x1166, JamoType::VOWEL, JamoPosition::MEDIAL, L"에", false};
    jamoMap[L'ㅕ'] = {0x1167, JamoType::VOWEL, JamoPosition::MEDIAL, L"여", false};
    jamoMap[L'ㅖ'] = {0x1168, JamoType::VOWEL, JamoPosition::MEDIAL, L"예", false};
    jamoMap[L'ㅗ'] = {0x1169, JamoType::VOWEL, JamoPosition::MEDIAL, L"오", false};
    jamoMap[L'ㅘ'] = {0x116A, JamoType::VOWEL, JamoPosition::MEDIAL, L"와", false};
    jamoMap[L'ㅙ'] = {0x116B, JamoType::VOWEL, JamoPosition::MEDIAL, L"왜", false};
    jamoMap[L'ㅚ'] = {0x116C, JamoType::VOWEL, JamoPosition::MEDIAL, L"외", false};
    jamoMap[L'ㅛ'] = {0x116D, JamoType::VOWEL, JamoPosition::MEDIAL, L"요", false};
    jamoMap[L'ㅜ'] = {0x116E, JamoType::VOWEL, JamoPosition::MEDIAL, L"우", false};
    jamoMap[L'ㅝ'] = {0x116F, JamoType::VOWEL, JamoPosition::MEDIAL, L"워", false};
    jamoMap[L'ㅞ'] = {0x1170, JamoType::VOWEL, JamoPosition::MEDIAL, L"웨", false};
    jamoMap[L'ㅟ'] = {0x1171, JamoType::VOWEL, JamoPosition::MEDIAL, L"위", false};
    jamoMap[L'ㅠ'] = {0x1172, JamoType::VOWEL, JamoPosition::MEDIAL, L"유", false};
    jamoMap[L'ㅡ'] = {0x1173, JamoType::VOWEL, JamoPosition::MEDIAL, L"으", false};
    jamoMap[L'ㅢ'] = {0x1174, JamoType::VOWEL, JamoPosition::MEDIAL, L"의", false};
    jamoMap[L'ㅣ'] = {0x1175, JamoType::VOWEL, JamoPosition::MEDIAL, L"이", false};

    // Modern final consonants (종성)
    jamoMap[L'ㄱ'] = {0x11A8, JamoType::CONSONANT, JamoPosition::FINAL, L"기역", false};
    jamoMap[L'ㄴ'] = {0x11AB, JamoType::CONSONANT, JamoPosition::FINAL, L"니은", false};
    jamoMap[L'ㄷ'] = {0x11AE, JamoType::CONSONANT, JamoPosition::FINAL, L"디귿", false};
    jamoMap[L'ㄹ'] = {0x11AF, JamoType::CONSONANT, JamoPosition::FINAL, L"리을", false};
    jamoMap[L'ㅁ'] = {0x11B7, JamoType::CONSONANT, JamoPosition::FINAL, L"미음", false};
    jamoMap[L'ㅂ'] = {0x11B8, JamoType::CONSONANT, JamoPosition::FINAL, L"비읍", false};
    jamoMap[L'ㅅ'] = {0x11BA, JamoType::CONSONANT, JamoPosition::FINAL, L"시옷", false};
    jamoMap[L'ㅇ'] = {0x11BC, JamoType::CONSONANT, JamoPosition::FINAL, L"이응", false};
    jamoMap[L'ㅈ'] = {0x11BD, JamoType::CONSONANT, JamoPosition::FINAL, L"지읒", false};
    jamoMap[L'ㅊ'] = {0x11C0, JamoType::CONSONANT, JamoPosition::FINAL, L"치읓", false};
    jamoMap[L'ㅋ'] = {0x11C1, JamoType::CONSONANT, JamoPosition::FINAL, L"키읔", false};
    jamoMap[L'ㅌ'] = {0x11C2, JamoType::CONSONANT, JamoPosition::FINAL, L"티읕", false};
    jamoMap[L'ㅍ'] = {0x11C3, JamoType::CONSONANT, JamoPosition::FINAL, L"피읖", false};
    jamoMap[L'ㅎ'] = {0x11C6, JamoType::CONSONANT, JamoPosition::FINAL, L"히읗", false};

    // Archaic jamos - Microsoft Old Hangul keyboard mapping
    jamoMap[L'ㆍ'] = {0x1197, JamoType::VOWEL, JamoPosition::MEDIAL, L"아래아", true};
    jamoMap[L'ㅿ'] = {0x113F, JamoType::CONSONANT, JamoPosition::INITIAL, L"반시옷", true};
    jamoMap[L'ㆆ'] = {0x1146, JamoType::CONSONANT, JamoPosition::INITIAL, L"여린히읗", true};
    jamoMap[L'ㅸ'] = {0x1170, JamoType::CONSONANT, JamoPosition::INITIAL, L"쌍비읍", true};
    
    // Additional Microsoft Old Hangul characters
    jamoMap[L'ᄔ'] = {0x1154, JamoType::CONSONANT, JamoPosition::INITIAL, L"쌍니은", true};
    jamoMap[L'ᅇ'] = {0x1147, JamoType::CONSONANT, JamoPosition::INITIAL, L"쌍이응", true};
    jamoMap[L'ᄙ'] = {0x1159, JamoType::CONSONANT, JamoPosition::INITIAL, L"쌍리을", true};
    jamoMap[L'ᄼ'] = {0x113C, JamoType::CONSONANT, JamoPosition::INITIAL, L"반치읓", true};
    jamoMap[L'ᄾ'] = {0x113E, JamoType::CONSONANT, JamoPosition::INITIAL, L"반치읓", true};
    jamoMap[L'ᅎ'] = {0x114E, JamoType::CONSONANT, JamoPosition::INITIAL, L"반치읓", true};
    jamoMap[L'ᅐ'] = {0x1150, JamoType::CONSONANT, JamoPosition::INITIAL, L"반치읓", true};
    jamoMap[L'ᅔ'] = {0x1154, JamoType::CONSONANT, JamoPosition::INITIAL, L"반치읓", true};
    jamoMap[L'ᅕ'] = {0x1155, JamoType::CONSONANT, JamoPosition::INITIAL, L"반치읓", true};
    jamoMap[L'ᅀ'] = {0x1140, JamoType::CONSONANT, JamoPosition::INITIAL, L"반시옷", true};
    jamoMap[L'ᅙ'] = {0x1159, JamoType::CONSONANT, JamoPosition::INITIAL, L"여린히읗", true};
    jamoMap[L'ᆞ'] = {0x119E, JamoType::VOWEL, JamoPosition::MEDIAL, L"아래아", true};
}

std::wstring JamoProcessor::processInput(const std::wstring& input) {
    std::wstring result;
    std::vector<JamoCharacter> jamos = parseJamo(input);
    
    // Group jamos into syllables
    std::vector<JamoCharacter> currentSyllable;
    
    for (const auto& jamo : jamos) {
        if (jamo.type == JamoType::CONSONANT && !currentSyllable.empty() && 
            currentSyllable.back().type == JamoType::CONSONANT) {
            // Start new syllable
            if (!currentSyllable.empty()) {
                result += composeSyllable(currentSyllable);
                currentSyllable.clear();
            }
        }
        currentSyllable.push_back(jamo);
    }
    
    // Compose final syllable
    if (!currentSyllable.empty()) {
        result += composeSyllable(currentSyllable);
    }
    
    return result;
}

std::vector<JamoCharacter> JamoProcessor::parseJamo(const std::wstring& input) {
    std::vector<JamoCharacter> jamos;
    
    for (wchar_t ch : input) {
        auto it = jamoMap.find(ch);
        if (it != jamoMap.end()) {
            jamos.push_back(it->second);
        }
    }
    
    // Determine positions based on sequence
    for (size_t i = 0; i < jamos.size(); ++i) {
        jamos[i].position = determinePosition(jamos, i);
    }
    
    return jamos;
}

JamoPosition JamoProcessor::determinePosition(const std::vector<JamoCharacter>& jamos, size_t index) {
    if (jamos[index].type == JamoType::VOWEL) {
        return JamoPosition::MEDIAL;
    }
    
    // For consonants, determine based on position in sequence
    if (index == 0) {
        return JamoPosition::INITIAL;
    }
    
    // Check if previous character is a vowel
    if (index > 0 && jamos[index - 1].type == JamoType::VOWEL) {
        return JamoPosition::FINAL;
    }
    
    // Check if next character is a vowel
    if (index + 1 < jamos.size() && jamos[index + 1].type == JamoType::VOWEL) {
        return JamoPosition::INITIAL;
    }
    
    return JamoPosition::FINAL;
}

std::wstring JamoProcessor::composeSyllable(const std::vector<JamoCharacter>& jamos) {
    if (jamos.empty()) {
        return L"";
    }
    
    if (!isValidCombination(jamos)) {
        // Return individual jamos if invalid combination
        std::wstring result;
        for (const auto& jamo : jamos) {
            result += jamo.unicode;
        }
        return result;
    }
    
    // Find initial consonant, medial vowel, and final consonant
    wchar_t initial = 0, medial = 0, final = 0;
    
    for (const auto& jamo : jamos) {
        switch (jamo.position) {
            case JamoPosition::INITIAL:
                initial = convertToPositionalUnicode(jamo, JamoPosition::INITIAL);
                break;
            case JamoPosition::MEDIAL:
                medial = convertToPositionalUnicode(jamo, JamoPosition::MEDIAL);
                break;
            case JamoPosition::FINAL:
                final = convertToPositionalUnicode(jamo, JamoPosition::FINAL);
                break;
        }
    }
    
    // Calculate syllable Unicode
    if (initial && medial) {
        uint32_t initialOffset = (initial - INITIAL_CONSONANT_START) * 21 * 28;
        uint32_t medialOffset = (medial - MEDIAL_VOWEL_START) * 28;
        uint32_t finalOffset = final ? (final - FINAL_CONSONANT_START + 1) : 0;
        
        wchar_t syllable = SYLLABLE_BASE + initialOffset + medialOffset + finalOffset;
        return std::wstring(1, syllable);
    }
    
    // Fallback: return individual jamos
    std::wstring result;
    for (const auto& jamo : jamos) {
        result += jamo.unicode;
    }
    return result;
}

wchar_t JamoProcessor::convertToPositionalUnicode(const JamoCharacter& jamo, JamoPosition position) {
    // For archaic jamos, use their specific Unicode values
    if (jamo.isArchaic) {
        return jamo.unicode;
    }
    
    // For modern jamos, convert to appropriate position
    switch (position) {
        case JamoPosition::INITIAL:
            return jamo.unicode;
        case JamoPosition::MEDIAL:
            return jamo.unicode;
        case JamoPosition::FINAL:
            // Convert initial consonant to final consonant
            if (jamo.unicode >= INITIAL_CONSONANT_START && jamo.unicode <= INITIAL_CONSONANT_END) {
                return jamo.unicode + 0x8; // Offset to final consonant range
            }
            return jamo.unicode;
    }
    
    return jamo.unicode;
}

bool JamoProcessor::isArchaicJamo(wchar_t ch) {
    return std::find(archaicJamos.begin(), archaicJamos.end(), ch) != archaicJamos.end();
}

JamoCharacter JamoProcessor::getJamoInfo(wchar_t ch) {
    auto it = jamoMap.find(ch);
    if (it != jamoMap.end()) {
        return it->second;
    }
    
    // Return default character
    return {ch, JamoType::CONSONANT, JamoPosition::INITIAL, L"", false};
}

bool JamoProcessor::isValidCombination(const std::vector<JamoCharacter>& jamos) {
    if (jamos.empty()) {
        return false;
    }
    
    // Must have at least initial consonant and medial vowel
    bool hasInitial = false, hasMedial = false;
    
    for (const auto& jamo : jamos) {
        if (jamo.position == JamoPosition::INITIAL) {
            hasInitial = true;
        } else if (jamo.position == JamoPosition::MEDIAL) {
            hasMedial = true;
        }
    }
    
    return hasInitial && hasMedial;
}

} // namespace KoreanKeyboard 