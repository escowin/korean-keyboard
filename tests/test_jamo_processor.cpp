#include <iostream>
#include <string>
#include <vector>
#include "../include/JamoProcessor.h"

using namespace KoreanKeyboard;

void TestJamoComposition() {
    std::cout << "=== Korean Archaic Jamo Processor Test ===\n\n";
    
    auto processor = std::make_unique<JamoProcessor>();
    
    // Test cases
    std::vector<std::pair<std::wstring, std::wstring>> testCases = {
        {L"ㆆㆍㄴ", L"ᅙᆞᆫ"},  // Archaic initial + archaic vowel + final
        {L"ㅸㅏㄴ", L"ᄫᅡᆫ"},  // Archaic initial + modern vowel + final
        {L"ㅿㅡㄹ", L"ᄼᅳᆯ"},  // Archaic initial + modern vowel + final
        {L"ㄱㅏㄴ", L"간"},   // Modern Korean
        {L"ㅎㅏㄴ", L"한"},   // Modern Korean
        {L"ㆍ", L"ㆍ"},       // Single archaic vowel
        {L"ㅿ", L"ㅿ"},       // Single archaic consonant
        {L"ㅏ", L"ㅏ"},       // Single modern vowel
        {L"ㄱ", L"ㄱ"},       // Single modern consonant
    };
    
    std::cout << "Testing jamo composition:\n";
    std::cout << "Input -> Expected Output\n";
    std::cout << "------------------------\n";
    
    for (const auto& testCase : testCases) {
        std::wstring input = testCase.first;
        std::wstring expected = testCase.second;
        std::wstring result = processor->processInput(input);
        
        std::wcout << L"'" << input << L"' -> '" << result << L"'";
        
        if (result == expected) {
            std::cout << " ✓ PASS";
        } else {
            std::cout << " ✗ FAIL (expected: '" << std::string(expected.begin(), expected.end()) << "')";
        }
        std::cout << "\n";
    }
    
    std::cout << "\n";
}

void TestArchaicJamoDetection() {
    std::cout << "=== Archaic Jamo Detection Test ===\n\n";
    
    auto processor = std::make_unique<JamoProcessor>();
    
    std::vector<wchar_t> testChars = {
        L'ㆍ', L'ㅿ', L'ㆆ', L'ㅸ',  // Archaic
        L'ㄱ', L'ㅏ', L'ㅎ', L'ㅡ'   // Modern
    };
    
    std::cout << "Testing archaic jamo detection:\n";
    std::cout << "Character -> Is Archaic\n";
    std::cout << "-------------------------\n";
    
    for (wchar_t ch : testChars) {
        bool isArchaic = processor->isArchaicJamo(ch);
        std::wcout << L"'" << ch << L"' -> " << (isArchaic ? "Yes" : "No") << "\n";
    }
    
    std::cout << "\n";
}

void TestJamoInfo() {
    std::cout << "=== Jamo Information Test ===\n\n";
    
    auto processor = std::make_unique<JamoProcessor>();
    
    std::vector<wchar_t> testChars = {
        L'ㆍ', L'ㅿ', L'ㆆ', L'ㅸ', L'ㄱ', L'ㅏ'
    };
    
    std::cout << "Testing jamo information:\n";
    std::cout << "Char -> Type -> Position -> Name -> Archaic\n";
    std::cout << "------------------------------------------------\n";
    
    for (wchar_t ch : testChars) {
        JamoCharacter info = processor->getJamoInfo(ch);
        
        std::wcout << L"'" << ch << L"' -> ";
        
        // Type
        switch (info.type) {
            case JamoType::CONSONANT:
                std::cout << "Consonant";
                break;
            case JamoType::VOWEL:
                std::cout << "Vowel";
                break;
        }
        
        std::cout << " -> ";
        
        // Position
        switch (info.position) {
            case JamoPosition::INITIAL:
                std::cout << "Initial";
                break;
            case JamoPosition::MEDIAL:
                std::cout << "Medial";
                break;
            case JamoPosition::FINAL:
                std::cout << "Final";
                break;
        }
        
        std::wcout << L" -> '" << info.name << L"' -> " << (info.isArchaic ? "Yes" : "No") << "\n";
    }
    
    std::cout << "\n";
}

void TestUnicodeRanges() {
    std::cout << "=== Unicode Range Test ===\n\n";
    
    std::cout << "Unicode ranges for Korean jamo:\n";
    std::cout << "Initial consonants: 0x1100 - 0x1112\n";
    std::cout << "Medial vowels: 0x1161 - 0x1175\n";
    std::cout << "Final consonants: 0x11A8 - 0x11C6\n";
    std::cout << "Syllable base: 0xAC00\n";
    std::cout << "Archaic jamos:\n";
    std::cout << "  ㆍ (아래아): 0x1197\n";
    std::cout << "  ㅿ (반시옷): 0x113F\n";
    std::cout << "  ㆆ (여린히읗): 0x1146\n";
    std::cout << "  ㅸ (쌍비읍): 0x1170\n\n";
}

int main() {
    // Set console to UTF-8 for proper Korean character display
    SetConsoleOutputCP(CP_UTF8);
    
    TestUnicodeRanges();
    TestArchaicJamoDetection();
    TestJamoInfo();
    TestJamoComposition();
    
    std::cout << "=== Test Complete ===\n";
    std::cout << "Press Enter to exit...";
    std::cin.get();
    
    return 0;
} 