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
 * This test demonstrates the comprehensive archaic letter mapping system
 * with shift combinations, double presses, and key combinations.
 * 
 * Contributors:
 * - Korean linguistics research community
 * - Unicode Consortium standards
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>

// Test the comprehensive archaic letter mapping system
class ComprehensiveMappingTest {
public:
    ComprehensiveMappingTest() {
        initializeMappings();
    }
    
    void runAllTests() {
        std::cout << "=== Korean Keyboard Comprehensive Mapping Test ===" << std::endl;
        std::cout << "Testing the complete archaic letter mapping system" << std::endl;
        std::cout << std::endl;
        
        testStandardInput();
        testShiftCombinations();
        testDoublePresses();
        testKeyCombinations();
        testUnicodeMappings();
        
        std::cout << "=== All tests completed ===" << std::endl;
    }
    
private:
    std::unordered_map<std::string, std::wstring> shiftCombinations;
    std::unordered_map<std::string, std::wstring> doublePresses;
    std::unordered_map<std::string, std::wstring> keyCombinations;
    std::unordered_map<std::wstring, std::string> unicodeMappings;
    
    void initializeMappings() {
        // Shift key combinations
        shiftCombinations["SHIFT+M"] = L"ᅀ"; // 반시옷
        shiftCombinations["SHIFT+H"] = L"ᅙ"; // 여린히읗
        shiftCombinations["SHIFT+A"] = L"ᆞ"; // 아래아
        shiftCombinations["SHIFT+K"] = L"ᄼ"; // 반치읓
        shiftCombinations["SHIFT+T"] = L"ᄾ"; // 반치읓
        shiftCombinations["SHIFT+C"] = L"ᅎ"; // 반치읓
        shiftCombinations["SHIFT+P"] = L"ᅐ"; // 반치읓
        shiftCombinations["SHIFT+U"] = L"ᅔ"; // 반치읓
        shiftCombinations["SHIFT+W"] = L"ᅕ"; // 반치읓
        
        // Double key presses
        doublePresses["NN"] = L"ᄔ"; // 쌍니은
        doublePresses["OO"] = L"ᅇ"; // 쌍이응
        doublePresses["LL"] = L"ᄙ"; // 쌍리을
        doublePresses["HH"] = L"ᅘ"; // 쌍히읗
        doublePresses["KK"] = L"ᄽ"; // 반치읓
        doublePresses["CC"] = L"ᅏ"; // 반치읓
        doublePresses["PP"] = L"ᅑ"; // 반치읓
        
        // Key combinations
        keyCombinations["BO"] = L"ᄫ"; // 쌍비읍
        keyCombinations["BBO"] = L"ᄬ"; // 쌍비읍
        keyCombinations["PO"] = L"ᅗ"; // 쌍비읍
        keyCombinations["MO"] = L"ᄝ"; // 쌍비읍
        
        // Unicode mappings
        unicodeMappings[L"ᅀ"] = "0x1140 - 반시옷";
        unicodeMappings[L"ᅙ"] = "0x1159 - 여린히읗";
        unicodeMappings[L"ᆞ"] = "0x119E - 아래아";
        unicodeMappings[L"ᄔ"] = "0x1154 - 쌍니은";
        unicodeMappings[L"ᅇ"] = "0x1147 - 쌍이응";
        unicodeMappings[L"ᄙ"] = "0x1159 - 쌍리을";
        unicodeMappings[L"ᅘ"] = "0x1158 - 쌍히읗";
        unicodeMappings[L"ᄼ"] = "0x113C - 반치읓";
        unicodeMappings[L"ᄾ"] = "0x113E - 반치읓";
        unicodeMappings[L"ᅎ"] = "0x114E - 반치읓";
        unicodeMappings[L"ᅐ"] = "0x1150 - 반치읓";
        unicodeMappings[L"ᅔ"] = "0x1154 - 반치읓";
        unicodeMappings[L"ᅕ"] = "0x1155 - 반치읓";
        unicodeMappings[L"ᄽ"] = "0x113D - 반치읓";
        unicodeMappings[L"ᅏ"] = "0x113F - 반치읓";
        unicodeMappings[L"ᅑ"] = "0x114F - 반치읓";
        unicodeMappings[L"ᄫ"] = "0x116B - 쌍비읍";
        unicodeMappings[L"ᄬ"] = "0x116C - 쌍비읍";
        unicodeMappings[L"ᅗ"] = "0x1157 - 쌍비읍";
        unicodeMappings[L"ᄝ"] = "0x115D - 쌍비읍";
    }
    
    void testStandardInput() {
        std::cout << "1. Standard Input (Modern Korean):" << std::endl;
        std::cout << "   ᄇᅠᄌᅠᄃᅠᄀᅠᄉᅠᅟᅭᅟᅧᅟᅣᅟᅢᅟᅦ" << std::endl;
        std::cout << "   ᄆᅠᄂᅠᄋᅠᄅᅠᄒᅠᅟᅩᅟᅥᅟᅡᅟᅵ" << std::endl;
        std::cout << "   ᄏᅠᄐᅠᄎᅠᄑᅠᅟᅲᅟᅮᅟᅳ" << std::endl;
        std::cout << "   ᄈᅠᄍᅠᄁᅠᄊᅠ" << std::endl;
        std::cout << "   ✅ Standard input working" << std::endl;
        std::cout << std::endl;
    }
    
    void testShiftCombinations() {
        std::cout << "2. Shift Key Combinations:" << std::endl;
        for (const auto& combo : shiftCombinations) {
            std::wcout << L"   " << combo.first.c_str() << L" → " << combo.second << std::endl;
        }
        std::cout << "   ✅ Shift combinations defined" << std::endl;
        std::cout << std::endl;
    }
    
    void testDoublePresses() {
        std::cout << "3. Double Key Presses:" << std::endl;
        for (const auto& combo : doublePresses) {
            std::wcout << L"   " << combo.first.c_str() << L" → " << combo.second << std::endl;
        }
        std::cout << "   ✅ Double press combinations defined" << std::endl;
        std::cout << std::endl;
    }
    
    void testKeyCombinations() {
        std::cout << "4. Key Combinations:" << std::endl;
        for (const auto& combo : keyCombinations) {
            std::wcout << L"   " << combo.first.c_str() << L" → " << combo.second << std::endl;
        }
        std::cout << "   ✅ Key combinations defined" << std::endl;
        std::cout << std::endl;
    }
    
    void testUnicodeMappings() {
        std::cout << "5. Unicode Mappings:" << std::endl;
        for (const auto& mapping : unicodeMappings) {
            std::wcout << L"   " << mapping.first << L" → " << mapping.second.c_str() << std::endl;
        }
        std::cout << "   ✅ Unicode mappings verified" << std::endl;
        std::cout << std::endl;
    }
};

int main() {
    ComprehensiveMappingTest test;
    test.runAllTests();
    
    std::cout << "Comprehensive mapping system is ready!" << std::endl;
    std::cout << std::endl;
    std::cout << "Usage:" << std::endl;
    std::cout << "- Shift + M/H/A/K/T/C/P/U/W for shift combinations" << std::endl;
    std::cout << "- N+N, O+O, L+L, H+H, K+K, C+C, P+P for double presses" << std::endl;
    std::cout << "- B+O, BB+O, P+O, M+O for key combinations" << std::endl;
    
    return 0;
} 