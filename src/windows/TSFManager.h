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
 * This header defines the TSFManager class for Windows Text Services Framework
 * integration with Korean keyboard input and archaic jamo support.
 * 
 * Contributors:
 * - Microsoft Windows Text Services Framework
 * - Korean linguistics research community
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

#pragma once

#include <string>
#include <memory>
#include <unordered_map>
#include <vector>

// Forward declarations
struct ITfThreadMgr;
struct ITfDocumentMgr;
struct ITfContext;

namespace KoreanKeyboard {

class JamoProcessor;

// Input combination types for archaic letters
enum class InputCombinationType {
    SINGLE_KEY,      // Single key press
    SHIFT_COMBO,     // Shift + key
    DOUBLE_PRESS,    // Same key pressed twice
    KEY_COMBO        // Two different keys pressed together
};

// Input combination structure
struct InputCombination {
    InputCombinationType type;
    std::wstring keys;  // Keys involved in the combination
    wchar_t result;     // Resulting archaic character
    std::wstring description;
};

class TSFManager {
public:
    TSFManager();
    ~TSFManager();

    // Initialize TSF manager
    HRESULT Initialize();
    
    // Cleanup resources
    void Cleanup();
    
    // Process keyboard input
    HRESULT ProcessKeyInput(WPARAM wParam, LPARAM lParam);
    
    // Handle function keys
    HRESULT HandleFunctionKey(WPARAM wParam, LPARAM lParam);
    
    // Set archaic mode
    void SetArchaicMode(bool enabled);
    
    // Check if archaic mode is enabled
    bool IsArchaicMode() const;
    
    // Insert text into active document
    HRESULT InsertText(const std::wstring& text);
    
    // Clear input buffer
    void ClearInputBuffer();

private:
    // Process archaic key combinations
    HRESULT ProcessArchaicKey(WPARAM wParam, LPARAM lParam);
    
    // Convert virtual key to archaic jamo
    wchar_t VirtualKeyToArchaicJamo(WPARAM wParam);
    
    // Check if key combination is for archaic input
    bool IsArchaicKeyCombination(WPARAM wParam, LPARAM lParam);
    
    // Initialize archaic input mappings
    void InitializeArchaicMappings();
    
    // Process shift key combinations
    wchar_t ProcessShiftCombination(WPARAM wParam);
    
    // Process double key presses
    wchar_t ProcessDoublePress(WPARAM wParam);
    
    // Process key combinations
    wchar_t ProcessKeyCombination(WPARAM wParam);
    
    // Check for key state
    bool IsKeyPressed(int virtualKey);
    
    // Get current key combination
    std::wstring GetCurrentKeyCombination();

    // TSF interfaces
    ITfThreadMgr* m_pThreadMgr;
    ITfDocumentMgr* m_pDocumentMgr;
    ITfContext* m_pContext;
    
    // State management
    bool m_archaicMode;
    bool m_functionKeyPressed;
    bool m_shiftKeyPressed;
    std::wstring m_inputBuffer;
    
    // Key tracking for combinations
    std::vector<WPARAM> m_keyHistory;
    DWORD m_lastKeyTime;
    
    // Jamo processor
    std::unique_ptr<JamoProcessor> m_jamoProcessor;
    
    // Archaic input mappings
    std::unordered_map<std::wstring, InputCombination> m_archaicMappings;
    
    // Constants
    static const DWORD DOUBLE_PRESS_TIMEOUT = 300; // milliseconds
    static const size_t MAX_KEY_HISTORY = 10;
};

} // namespace KoreanKeyboard 