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
    // TSF interfaces
    ITfThreadMgr* m_pThreadMgr;
    ITfDocumentMgr* m_pDocumentMgr;
    ITfContext* m_pContext;
    TfClientId m_clientId;
    
    // Jamo processor
    std::unique_ptr<JamoProcessor> m_jamoProcessor;
    
    // State
    bool m_archaicMode;
    bool m_functionKeyPressed;
    std::wstring m_inputBuffer;
    
    // Initialize TSF thread manager
    HRESULT InitializeThreadManager();
    
    // Initialize TSF document manager
    HRESULT InitializeDocumentManager();
    
    // Create TSF context
    HRESULT CreateContext();
    
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