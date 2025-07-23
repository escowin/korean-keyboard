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
    , m_altGrKeyPressed(false)
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
    m_altGrKeyPressed = false;
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
    // Initialize Microsoft Old Hangul keyboard mappings
    
    // Right Alt (AltGr) combinations for archaic characters
    m_archaicMappings[L"ALTGR+A"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+A", L'ㆍ', L"아래아 (AltGr + A)"};
    m_archaicMappings[L"ALTGR+S"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+S", L'ㅿ', L"반시옷 (AltGr + S)"};
    m_archaicMappings[L"ALTGR+H"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+H", L'ㆆ', L"여린히읗 (AltGr + H)"};
    m_archaicMappings[L"ALTGR+B"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+B", L'ㅸ', L"쌍비읍 (AltGr + B)"};
    
    // Additional Microsoft Old Hangul mappings
    m_archaicMappings[L"ALTGR+N"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+N", L'ᄔ', L"쌍니은 (AltGr + N)"};
    m_archaicMappings[L"ALTGR+O"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+O", L'ᅇ', L"쌍이응 (AltGr + O)"};
    m_archaicMappings[L"ALTGR+L"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+L", L'ᄙ', L"쌍리을 (AltGr + L)"};
    m_archaicMappings[L"ALTGR+K"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+K", L'ᄼ', L"반치읓 (AltGr + K)"};
    m_archaicMappings[L"ALTGR+T"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+T", L'ᄾ', L"반치읓 (AltGr + T)"};
    m_archaicMappings[L"ALTGR+C"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+C", L'ᅎ', L"반치읓 (AltGr + C)"};
    m_archaicMappings[L"ALTGR+P"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+P", L'ᅐ', L"반치읓 (AltGr + P)"};
    m_archaicMappings[L"ALTGR+U"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+U", L'ᅔ', L"반치읓 (AltGr + U)"};
    m_archaicMappings[L"ALTGR+W"] = {InputCombinationType::ALTGR_COMBO, L"ALTGR+W", L'ᅕ', L"반치읓 (AltGr + W)"};
    
    // Microsoft Old Hangul specific combinations
    m_archaicMappings[L"ALTGR+SHIFT+M"] = {InputCombinationType::ALTGR_SHIFT_COMBO, L"ALTGR+SHIFT+M", L'ᅀ', L"반시옷 (AltGr + Shift + M)"};
    m_archaicMappings[L"ALTGR+SHIFT+H"] = {InputCombinationType::ALTGR_SHIFT_COMBO, L"ALTGR+SHIFT+H", L'ᅙ', L"여린히읗 (AltGr + Shift + H)"};
    m_archaicMappings[L"ALTGR+SHIFT+A"] = {InputCombinationType::ALTGR_SHIFT_COMBO, L"ALTGR+SHIFT+A", L'ᆞ', L"아래아 (AltGr + Shift + A)"};
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
    
    // Handle AltGr key state (Right Alt)
    if (wParam == VK_RMENU) {
        m_altGrKeyPressed = isKeyDown;
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
    
    // Try AltGr combinations first (Microsoft Old Hangul style)
    if (m_altGrKeyPressed) {
        archaicChar = ProcessAltGrCombination(wParam);
    }
    
    // Try shift combinations
    if (!archaicChar && m_shiftKeyPressed) {
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

wchar_t TSFManager::ProcessAltGrCombination(WPARAM wParam) {
    std::wstring combo;
    
    // Check for AltGr + Shift combination
    if (m_shiftKeyPressed) {
        combo = L"ALTGR+SHIFT+";
        combo += static_cast<wchar_t>(wParam);
    } else {
        combo = L"ALTGR+";
        combo += static_cast<wchar_t>(wParam);
    }
    
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