#include "TSFManager.h"
#include "JamoProcessor.h"
#include <windows.h>
#include <msctf.h>
#include <memory>

namespace KoreanKeyboard {

TSFManager::TSFManager() 
    : m_archaicMode(false)
    , m_functionKeyPressed(false)
    , m_jamoProcessor(std::make_unique<JamoProcessor>()) {
    m_inputBuffer.clear();
}

TSFManager::~TSFManager() {
    Cleanup();
}

HRESULT TSFManager::Initialize() {
    // Simplified initialization - just set up basic state
    m_archaicMode = false;
    m_functionKeyPressed = false;
    m_inputBuffer.clear();
    return S_OK;
}

void TSFManager::Cleanup() {
    // Simplified cleanup
    m_inputBuffer.clear();
}

HRESULT TSFManager::ProcessKeyInput(WPARAM wParam, LPARAM lParam) {
    // Check for function key combinations
    if (IsArchaicKeyCombination(wParam, lParam)) {
        return ProcessArchaicKey(wParam, lParam);
    }
    
    // Handle regular input
    if (m_archaicMode) {
        // In archaic mode, process all input through jamo processor
        wchar_t ch = static_cast<wchar_t>(wParam);
        if (ch >= 32 && ch <= 126) { // Basic ASCII range
            m_inputBuffer += ch;
            
            // Process the input
            std::wstring result = m_jamoProcessor->processInput(m_inputBuffer);
            
            // For now, just clear buffer after processing
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

wchar_t TSFManager::VirtualKeyToArchaicJamo(WPARAM wParam) {
    // Map virtual keys to archaic jamos based on spec
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

void TSFManager::ClearInputBuffer() {
    m_inputBuffer.clear();
}

} // namespace KoreanKeyboard 