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
 * This module implements Windows Text Services Framework (TSF) integration
 * for Korean keyboard input with archaic jamo support.
 * 
 * Contributors:
 * - Microsoft Windows Text Services Framework
 * - Korean linguistics research community
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

#include "TSFManager.h"
#include "JamoProcessor.h"
#include <windows.h>
#include <msctf.h>
#include <memory>

namespace KoreanKeyboard {

TSFManager::TSFManager() 
    : m_archaicMode(false)
    , m_functionKeyPressed(false)
    , m_shiftKeyPressed(false)
    , m_lastKeyTime(0)
    , m_jamoProcessor(std::make_unique<JamoProcessor>()) {
    m_inputBuffer.clear();
    m_keyHistory.clear();
    InitializeArchaicMappings();
}

TSFManager::~TSFManager() {
    Cleanup();
}

HRESULT TSFManager::Initialize() {
    // Simplified initialization - just set up basic state
    m_archaicMode = false;
    m_functionKeyPressed = false;
    m_shiftKeyPressed = false;
    m_inputBuffer.clear();
    m_keyHistory.clear();
    m_lastKeyTime = 0;
    return S_OK;
}

void TSFManager::Cleanup() {
    // Simplified cleanup
    m_inputBuffer.clear();
    m_keyHistory.clear();
}

void TSFManager::InitializeArchaicMappings() {
    // Initialize comprehensive archaic input mappings based on user's system
    
    // Shift key combinations
    m_archaicMappings[L"SHIFT+M"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+M", L'ᅀ', L"반시옷 (Shift + M)"};
    m_archaicMappings[L"SHIFT+H"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+H", L'ᅙ', L"여린히읗 (Shift + H)"};
    m_archaicMappings[L"SHIFT+A"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+A", L'ᆞ', L"아래아 (Shift + A)"};
    
    // Double key presses
    m_archaicMappings[L"NN"] = {InputCombinationType::DOUBLE_PRESS, L"NN", L'ᄔ', L"쌍니은 (N + N)"};
    m_archaicMappings[L"OO"] = {InputCombinationType::DOUBLE_PRESS, L"OO", L'ᅇ', L"쌍이응 (O + O)"};
    m_archaicMappings[L"LL"] = {InputCombinationType::DOUBLE_PRESS, L"LL", L'ᄙ', L"쌍리을 (L + L)"};
    m_archaicMappings[L"HH"] = {InputCombinationType::DOUBLE_PRESS, L"HH", L'ᅘ', L"쌍히읗 (H + H)"};
    
    // Shift + key combinations for 반치읓 series
    m_archaicMappings[L"SHIFT+K"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+K", L'ᄼ', L"반치읓 (Shift + K)"};
    m_archaicMappings[L"SHIFT+T"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+T", L'ᄾ', L"반치읓 (Shift + T)"};
    m_archaicMappings[L"SHIFT+C"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+C", L'ᅎ', L"반치읓 (Shift + C)"};
    m_archaicMappings[L"SHIFT+P"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+P", L'ᅐ', L"반치읓 (Shift + P)"};
    m_archaicMappings[L"SHIFT+U"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+U", L'ᅔ', L"반치읓 (Shift + U)"};
    m_archaicMappings[L"SHIFT+W"] = {InputCombinationType::SHIFT_COMBO, L"SHIFT+W", L'ᅕ', L"반치읓 (Shift + W)"};
    
    // Double key presses for 반치읓 series
    m_archaicMappings[L"KK"] = {InputCombinationType::DOUBLE_PRESS, L"KK", L'ᄽ', L"반치읓 (K + K)"};
    m_archaicMappings[L"CC"] = {InputCombinationType::DOUBLE_PRESS, L"CC", L'ᅏ', L"반치읓 (C + C)"};
    m_archaicMappings[L"PP"] = {InputCombinationType::DOUBLE_PRESS, L"PP", L'ᅑ', L"반치읓 (P + P)"};
    
    // Key combinations for 쌍비읍 series
    m_archaicMappings[L"BO"] = {InputCombinationType::KEY_COMBO, L"BO", L'ᄫ', L"쌍비읍 (B + O)"};
    m_archaicMappings[L"BBO"] = {InputCombinationType::KEY_COMBO, L"BBO", L'ᄬ', L"쌍비읍 (BB + O)"};
    m_archaicMappings[L"PO"] = {InputCombinationType::KEY_COMBO, L"PO", L'ᅗ', L"쌍비읍 (P + O)"};
    m_archaicMappings[L"MO"] = {InputCombinationType::KEY_COMBO, L"MO", L'ᄝ', L"쌍비읍 (M + O)"};
}

HRESULT TSFManager::ProcessKeyInput(WPARAM wParam, LPARAM lParam) {
    // Track key state
    bool isKeyDown = (lParam & 0x80000000) == 0;
    bool isKeyUp = (lParam & 0x80000000) != 0;
    
    // Handle shift key state
    if (wParam == VK_SHIFT) {
        m_shiftKeyPressed = isKeyDown;
        return S_OK;
    }
    
    // Only process key down events
    if (!isKeyDown) {
        return S_OK;
    }
    
    // Add to key history
    DWORD currentTime = GetTickCount();
    if (currentTime - m_lastKeyTime > DOUBLE_PRESS_TIMEOUT) {
        m_keyHistory.clear();
    }
    m_keyHistory.push_back(wParam);
    m_lastKeyTime = currentTime;
    
    // Keep only recent keys
    if (m_keyHistory.size() > MAX_KEY_HISTORY) {
        m_keyHistory.erase(m_keyHistory.begin());
    }
    
    // Check for archaic key combinations
    wchar_t archaicChar = 0;
    
    // Try shift combinations first
    if (m_shiftKeyPressed) {
        archaicChar = ProcessShiftCombination(wParam);
    }
    
    // Try double press combinations
    if (!archaicChar) {
        archaicChar = ProcessDoublePress(wParam);
    }
    
    // Try key combinations
    if (!archaicChar) {
        archaicChar = ProcessKeyCombination(wParam);
    }
    
    // If we found an archaic character, process it
    if (archaicChar) {
        m_inputBuffer += archaicChar;
        std::wstring result = m_jamoProcessor->processInput(m_inputBuffer);
        ClearInputBuffer();
        return S_OK;
    }
    
    // Handle regular input
    if (m_archaicMode) {
        wchar_t ch = static_cast<wchar_t>(wParam);
        if (ch >= 32 && ch <= 126) { // Basic ASCII range
            m_inputBuffer += ch;
            std::wstring result = m_jamoProcessor->processInput(m_inputBuffer);
            ClearInputBuffer();
            return S_OK;
        }
    }
    
    return S_OK;
}

HRESULT TSFManager::HandleFunctionKey(WPARAM wParam, LPARAM lParam) {
    // Handle function key state
    switch (wParam) {
        case VK_F1:
        case VK_F2:
        case VK_F3:
        case VK_F4:
        case VK_F5:
        case VK_F6:
        case VK_F7:
        case VK_F8:
        case VK_F9:
        case VK_F10:
        case VK_F11:
        case VK_F12:
            m_functionKeyPressed = (lParam & 0x80000000) == 0; // Key down
            return S_OK;
            
        default:
            return S_OK;
    }
}

void TSFManager::SetArchaicMode(bool enabled) {
    m_archaicMode = enabled;
}

bool TSFManager::IsArchaicMode() const {
    return m_archaicMode;
}

HRESULT TSFManager::ProcessArchaicKey(WPARAM wParam, LPARAM lParam) {
    wchar_t archaicJamo = VirtualKeyToArchaicJamo(wParam);
    
    if (archaicJamo != 0) {
        m_inputBuffer += archaicJamo;
        
        // Process the input
        std::wstring result = m_jamoProcessor->processInput(m_inputBuffer);
        
        // For now, just clear buffer after processing
        ClearInputBuffer();
        
        return S_OK;
    }
    
    return S_OK;
}

wchar_t TSFManager::ProcessShiftCombination(WPARAM wParam) {
    std::wstring combo = L"SHIFT+";
    combo += static_cast<wchar_t>(wParam);
    
    auto it = m_archaicMappings.find(combo);
    if (it != m_archaicMappings.end()) {
        return it->second.result;
    }
    
    return 0;
}

wchar_t TSFManager::ProcessDoublePress(WPARAM wParam) {
    if (m_keyHistory.size() < 2) {
        return 0;
    }
    
    // Check if the same key was pressed twice
    if (m_keyHistory[m_keyHistory.size() - 1] == wParam && 
        m_keyHistory[m_keyHistory.size() - 2] == wParam) {
        
        std::wstring combo;
        combo += static_cast<wchar_t>(wParam);
        combo += static_cast<wchar_t>(wParam);
        
        auto it = m_archaicMappings.find(combo);
        if (it != m_archaicMappings.end()) {
            return it->second.result;
        }
    }
    
    return 0;
}

wchar_t TSFManager::ProcessKeyCombination(WPARAM wParam) {
    if (m_keyHistory.size() < 2) {
        return 0;
    }
    
    // Check for key combinations (e.g., B+O, P+O, M+O)
    std::wstring combo;
    for (size_t i = m_keyHistory.size() - 2; i < m_keyHistory.size(); ++i) {
        combo += static_cast<wchar_t>(m_keyHistory[i]);
    }
    
    auto it = m_archaicMappings.find(combo);
    if (it != m_archaicMappings.end()) {
        return it->second.result;
    }
    
    return 0;
}

wchar_t TSFManager::VirtualKeyToArchaicJamo(WPARAM wParam) {
    // Legacy function key mapping (kept for backward compatibility)
    switch (wParam) {
        case 'K': // Fn + K for ㆍ (아래아)
            return L'ㆍ';
        case 'T': // Fn + T for ㅿ (반시옷)
            return L'ㅿ';
        case 'G': // Fn + G for ㆆ (여린히읗)
            return L'ㆆ';
        case 'Q': // Fn + Q for ㅸ (쌍비읍)
            return L'ㅸ';
        default:
            return 0;
    }
}

bool TSFManager::IsArchaicKeyCombination(WPARAM wParam, LPARAM lParam) {
    // Check if function key is pressed
    if (!m_functionKeyPressed && !m_archaicMode) {
        return false;
    }
    
    // Check for specific archaic key combinations
    switch (wParam) {
        case 'K': // Fn + K
        case 'T': // Fn + T
        case 'G': // Fn + G
        case 'Q': // Fn + Q
            return true;
        default:
            return false;
    }
}

HRESULT TSFManager::InsertText(const std::wstring& text) {
    // Simplified text insertion - just return success for now
    // In a real implementation, this would use TSF APIs to insert text
    return S_OK;
}

bool TSFManager::IsKeyPressed(int virtualKey) {
    return (GetAsyncKeyState(virtualKey) & 0x8000) != 0;
}

std::wstring TSFManager::GetCurrentKeyCombination() {
    std::wstring combo;
    for (WPARAM key : m_keyHistory) {
        combo += static_cast<wchar_t>(key);
    }
    return combo;
}

void TSFManager::ClearInputBuffer() {
    m_inputBuffer.clear();
}

} // namespace KoreanKeyboard 