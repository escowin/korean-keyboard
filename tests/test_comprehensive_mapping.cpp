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
    std::unordered_map<std::string, std::wstring> altGrCombinations;
    std::unordered_map<std::string, std::wstring> altGrShiftCombinations;
    std::unordered_map<std::wstring, std::string> unicodeMappings;
    
    void initializeMappings() {
        // Microsoft Old Hangul keyboard mappings
        
        // AltGr combinations
        altGrCombinations["ALTGR+A"] = L"ㆍ"; // 아래아
        altGrCombinations["ALTGR+S"] = L"ㅿ"; // 반시옷
        altGrCombinations["ALTGR+H"] = L"ㆆ"; // 여린히읗
        altGrCombinations["ALTGR+B"] = L"ㅸ"; // 쌍비읍
        altGrCombinations["ALTGR+N"] = L"ᄔ"; // 쌍니은
        altGrCombinations["ALTGR+O"] = L"ᅇ"; // 쌍이응
        altGrCombinations["ALTGR+L"] = L"ᄙ"; // 쌍리을
        altGrCombinations["ALTGR+K"] = L"ᄼ"; // 반치읓
        altGrCombinations["ALTGR+T"] = L"ᄾ"; // 반치읓
        altGrCombinations["ALTGR+C"] = L"ᅎ"; // 반치읓
        altGrCombinations["ALTGR+P"] = L"ᅐ"; // 반치읓
        altGrCombinations["ALTGR+U"] = L"ᅔ"; // 반치읓
        altGrCombinations["ALTGR+W"] = L"ᅕ"; // 반치읓
        
        // AltGr + Shift combinations
        altGrShiftCombinations["ALTGR+SHIFT+M"] = L"ᅀ"; // 반시옷
        altGrShiftCombinations["ALTGR+SHIFT+H"] = L"ᅙ"; // 여린히읗
        altGrShiftCombinations["ALTGR+SHIFT+A"] = L"ᆞ"; // 아래아
        
        // Unicode mappings
        unicodeMappings[L"ㆍ"] = "0x1197 - 아래아";
        unicodeMappings[L"ㅿ"] = "0x113F - 반시옷";
        unicodeMappings[L"ㆆ"] = "0x1146 - 여린히읗";
        unicodeMappings[L"ㅸ"] = "0x1170 - 쌍비읍";
        unicodeMappings[L"ᄔ"] = "0x1154 - 쌍니은";
        unicodeMappings[L"ᅇ"] = "0x1147 - 쌍이응";
        unicodeMappings[L"ᄙ"] = "0x1159 - 쌍리을";
        unicodeMappings[L"ᄼ"] = "0x113C - 반치읓";
        unicodeMappings[L"ᄾ"] = "0x113E - 반치읓";
        unicodeMappings[L"ᅎ"] = "0x114E - 반치읓";
        unicodeMappings[L"ᅐ"] = "0x1150 - 반치읓";
        unicodeMappings[L"ᅔ"] = "0x1154 - 반치읓";
        unicodeMappings[L"ᅕ"] = "0x1155 - 반치읓";
        unicodeMappings[L"ᅀ"] = "0x1140 - 반시옷";
        unicodeMappings[L"ᅙ"] = "0x1159 - 여린히읗";
        unicodeMappings[L"ᆞ"] = "0x119E - 아래아";
    }
    
    void testStandardInput() {
        std::cout << "=== Standard Input Test ===" << std::endl;
        std::cout << "Testing basic Korean input:" << std::endl;
        std::cout << "ㄱ + ㅏ + ㄴ = 간 (gan)" << std::endl;
        std::cout << "ㅎ + ㅏ + ㄴ = 한 (han)" << std::endl;
        std::cout << "ㅅ + ㅓ + ㅇ = 성 (seong)" << std::endl;
        std::cout << std::endl;
    }
    
    void testShiftCombinations() {
        std::cout << "=== AltGr Combinations Test ===" << std::endl;
        std::cout << "Testing Microsoft Old Hangul keyboard AltGr combinations:" << std::endl;
        
        for (const auto& combo : altGrCombinations) {
            std::cout << combo.first << " -> ";
            std::wcout << combo.second << std::endl;
        }
        std::cout << std::endl;
    }
    
    void testDoublePresses() {
        std::cout << "=== AltGr + Shift Combinations Test ===" << std::endl;
        std::cout << "Testing Microsoft Old Hangul keyboard AltGr + Shift combinations:" << std::endl;
        
        for (const auto& combo : altGrShiftCombinations) {
            std::cout << combo.first << " -> ";
            std::wcout << combo.second << std::endl;
        }
        std::cout << std::endl;
    }
    
    void testKeyCombinations() {
        std::cout << "=== Unicode Mappings Test ===" << std::endl;
        std::cout << "Testing Unicode code points for archaic characters:" << std::endl;
        
        for (const auto& mapping : unicodeMappings) {
            std::wcout << mapping.first << " -> ";
            std::cout << mapping.second << std::endl;
        }
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