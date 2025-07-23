#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <cstdint>
#include <windows.h>

// Simple test implementation of the core jamo processing logic
class SimpleJamoProcessor {
public:
    enum class JamoType { CONSONANT, VOWEL };
    enum class JamoPosition { INITIAL, MEDIAL, FINAL };
    
    struct JamoCharacter {
        wchar_t unicode;
        JamoType type;
        JamoPosition position;
        std::wstring name;
        bool isArchaic;
    };
    
    SimpleJamoProcessor() {
        initializeJamoMappings();
    }
    
    std::wstring processInput(const std::wstring& input) {
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
    
    bool isArchaicJamo(wchar_t ch) {
        return std::find(archaicJamos.begin(), archaicJamos.end(), ch) != archaicJamos.end();
    }
    
    JamoCharacter getJamoInfo(wchar_t ch) {
        auto it = jamoMap.find(ch);
        if (it != jamoMap.end()) {
            return it->second;
        }
        return {ch, JamoType::CONSONANT, JamoPosition::INITIAL, L"", false};
    }

private:
    std::unordered_map<wchar_t, JamoCharacter> jamoMap;
    std::vector<wchar_t> archaicJamos = {0x1197, 0x113F, 0x1146, 0x1170};
    
    void initializeJamoMappings() {
        // Modern initial consonants
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
        
        // Modern medial vowels
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
        
        // Modern final consonants
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
        
        // Archaic jamos
        jamoMap[L'ㆍ'] = {0x1197, JamoType::VOWEL, JamoPosition::MEDIAL, L"아래아", true};
        jamoMap[L'ㅿ'] = {0x113F, JamoType::CONSONANT, JamoPosition::INITIAL, L"반시옷", true};
        jamoMap[L'ㆆ'] = {0x1146, JamoType::CONSONANT, JamoPosition::INITIAL, L"여린히읗", true};
        jamoMap[L'ㅸ'] = {0x1170, JamoType::CONSONANT, JamoPosition::INITIAL, L"쌍비읍", true};
    }
    
    std::vector<JamoCharacter> parseJamo(const std::wstring& input) {
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
    
    JamoPosition determinePosition(const std::vector<JamoCharacter>& jamos, size_t index) {
        if (jamos[index].type == JamoType::VOWEL) {
            return JamoPosition::MEDIAL;
        }
        
        if (index == 0) {
            return JamoPosition::INITIAL;
        }
        
        if (index > 0 && jamos[index - 1].type == JamoType::VOWEL) {
            return JamoPosition::FINAL;
        }
        
        if (index + 1 < jamos.size() && jamos[index + 1].type == JamoType::VOWEL) {
            return JamoPosition::INITIAL;
        }
        
        return JamoPosition::FINAL;
    }
    
    std::wstring composeSyllable(const std::vector<JamoCharacter>& jamos) {
        if (jamos.empty()) {
            return L"";
        }
        
        if (!isValidCombination(jamos)) {
            std::wstring result;
            for (const auto& jamo : jamos) {
                result += jamo.unicode;
            }
            return result;
        }
        
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
        
        if (initial && medial) {
            uint32_t initialOffset = (initial - 0x1100) * 21 * 28;
            uint32_t medialOffset = (medial - 0x1161) * 28;
            uint32_t finalOffset = final ? (final - 0x11A7 + 1) : 0;
            
            wchar_t syllable = 0xAC00 + initialOffset + medialOffset + finalOffset;
            return std::wstring(1, syllable);
        }
        
        std::wstring result;
        for (const auto& jamo : jamos) {
            result += jamo.unicode;
        }
        return result;
    }
    
    wchar_t convertToPositionalUnicode(const JamoCharacter& jamo, JamoPosition position) {
        if (jamo.isArchaic) {
            return jamo.unicode;
        }
        
        switch (position) {
            case JamoPosition::INITIAL:
                return jamo.unicode;
            case JamoPosition::MEDIAL:
                return jamo.unicode;
            case JamoPosition::FINAL:
                if (jamo.unicode >= 0x1100 && jamo.unicode <= 0x1112) {
                    return jamo.unicode + 0x8;
                }
                return jamo.unicode;
        }
        
        return jamo.unicode;
    }
    
    bool isValidCombination(const std::vector<JamoCharacter>& jamos) {
        if (jamos.empty()) {
            return false;
        }
        
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
};

void TestJamoComposition() {
    std::cout << "=== Korean Archaic Jamo Processor Test ===\n\n";
    
    SimpleJamoProcessor processor;
    
    // Test cases
    std::vector<std::pair<std::wstring, std::wstring>> testCases = {
        {L"ㆆㆍㄴ", L"ᅙᆞᆫ"},  // Archaic initial + archaic vowel + final
        {L"ㅸㅏㄴ", L"ᄫᅡᆫ"},  // Archaic initial + modern vowel + final
        {L"ㅿㅡㄹ", L"ᅀᅳᆯ"},  // Archaic initial + modern vowel + final
        {L"ㄱㅏㄴ", L"간"},   // Modern Korean
        {L"ㅎㅏㄴ", L"한"},   // Modern Korean
        {L"ㆍ", L"ㆍ"},       // Single archaic vowel
        {L"ㅿ", L"ㅿ"},       // Single archaic consonant
        {L"ㅏ", L"ㅏ"},       // Single modern vowel
        {L"ㄱ", L"ㄱ"},       // Single modern consonant
    };
    
    std::cout << "Testing jamo composition:\n";
    std::cout << "Input -> Expected Output -> Actual Output\n";
    std::cout << "----------------------------------------\n";
    
    int passed = 0, total = testCases.size();
    
    for (const auto& testCase : testCases) {
        std::wstring input = testCase.first;
        std::wstring expected = testCase.second;
        std::wstring result = processor.processInput(input);
        
        std::wcout << L"'" << input << L"' -> '" << expected << L"' -> '" << result << L"'";
        
        if (result == expected) {
            std::cout << " ✓ PASS";
            passed++;
        } else {
            std::cout << " ✗ FAIL";
        }
        std::cout << "\n";
    }
    
    std::cout << "\nResults: " << passed << "/" << total << " tests passed\n";
    std::cout << "Success rate: " << (passed * 100 / total) << "%\n\n";
}

void TestArchaicJamoDetection() {
    std::cout << "=== Archaic Jamo Detection Test ===\n\n";
    
    SimpleJamoProcessor processor;
    
    std::vector<wchar_t> testChars = {
        L'ㆍ', L'ㅿ', L'ㆆ', L'ㅸ',  // Archaic
        L'ㄱ', L'ㅏ', L'ㅎ', L'ㅡ'   // Modern
    };
    
    std::cout << "Testing archaic jamo detection:\n";
    std::cout << "Character -> Is Archaic\n";
    std::cout << "-------------------------\n";
    
    for (wchar_t ch : testChars) {
        bool isArchaic = processor.isArchaicJamo(ch);
        std::wcout << L"'" << ch << L"' -> " << (isArchaic ? "Yes" : "No") << "\n";
    }
    
    std::cout << "\n";
}

int main() {
    // Set console to UTF-8 for proper Korean character display
    SetConsoleOutputCP(CP_UTF8);
    
    TestArchaicJamoDetection();
    TestJamoComposition();
    
    std::cout << "=== Test Complete ===\n";
    std::cout << "Press Enter to exit...";
    std::cin.get();
    
    return 0;
} 