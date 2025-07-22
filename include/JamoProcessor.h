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