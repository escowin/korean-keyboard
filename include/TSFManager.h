/*
 * Korean Keyboard with Archaic Jamo Support
 * 
 * Copyright (c) 2024 Korean Keyboard Project Contributors
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
 * This header defines the TSFManager class for Windows Text Services
 * Framework integration with Korean keyboard input.
 * 
 * Contributors:
 * - Microsoft Windows Text Services Framework
 * - Korean linguistics research community
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

#pragma once

#include <windows.h>
#include <msctf.h>
#include <string>
#include <memory>
#include "JamoProcessor.h"

namespace KoreanKeyboard {

class TSFManager {
public:
    TSFManager();
    ~TSFManager();

    // Initialize TSF components
    HRESULT Initialize();
    
    // Cleanup TSF components
    void Cleanup();
    
    // Process key input
    HRESULT ProcessKeyInput(WPARAM wParam, LPARAM lParam);
    
    // Set archaic mode
    void SetArchaicMode(bool enabled);
    
    // Get current mode
    bool IsArchaicMode() const;
    
    // Handle function key combinations
    HRESULT HandleFunctionKey(WPARAM wParam, LPARAM lParam);

private:
    // Jamo processor
    std::unique_ptr<JamoProcessor> m_jamoProcessor;
    
    // State
    bool m_archaicMode;
    bool m_functionKeyPressed;
    std::wstring m_inputBuffer;
    
    // Insert text into active document
    HRESULT InsertText(const std::wstring& text);
    
    // Clear input buffer
    void ClearInputBuffer();
    
    // Process archaic key combination
    HRESULT ProcessArchaicKey(WPARAM wParam, LPARAM lParam);
    
    // Convert virtual key to archaic jamo
    wchar_t VirtualKeyToArchaicJamo(WPARAM wParam);
    
    // Check if key combination is for archaic input
    bool IsArchaicKeyCombination(WPARAM wParam, LPARAM lParam);
};

} // namespace KoreanKeyboard 