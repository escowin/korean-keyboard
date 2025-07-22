#include "TSFManager.h"
#include <msctf.h>
#include <ole2.h>
#include <algorithm>

namespace KoreanKeyboard {

TSFManager::TSFManager()
    : m_pThreadMgr(nullptr)
    , m_pDocumentMgr(nullptr)
    , m_pContext(nullptr)
    , m_clientId(0)
    , m_archaicMode(false)
    , m_functionKeyPressed(false)
    , m_jamoProcessor(std::make_unique<JamoProcessor>())
{
}

TSFManager::~TSFManager() {
    Cleanup();
}

HRESULT TSFManager::Initialize() {
    HRESULT hr = S_OK;
    
    // Initialize COM
    hr = CoInitialize(nullptr);
    if (FAILED(hr)) {
        return hr;
    }
    
    // Initialize TSF thread manager
    hr = InitializeThreadManager();
    if (FAILED(hr)) {
        CoUninitialize();
        return hr;
    }
    
    // Initialize document manager
    hr = InitializeDocumentManager();
    if (FAILED(hr)) {
        Cleanup();
        return hr;
    }
    
    // Create context
    hr = CreateContext();
    if (FAILED(hr)) {
        Cleanup();
        return hr;
    }
    
    return S_OK;
}

void TSFManager::Cleanup() {
    if (m_pContext) {
        m_pContext->Release();
        m_pContext = nullptr;
    }
    
    if (m_pDocumentMgr) {
        m_pDocumentMgr->Release();
        m_pDocumentMgr = nullptr;
    }
    
    if (m_pThreadMgr) {
        m_pThreadMgr->Release();
        m_pThreadMgr = nullptr;
    }
    
    m_clientId = 0;
    CoUninitialize();
}

HRESULT TSFManager::InitializeThreadManager() {
    HRESULT hr = CoCreateInstance(
        CLSID_TF_ThreadMgr,
        nullptr,
        CLSCTX_INPROC_SERVER,
        IID_ITfThreadMgr,
        (void**)&m_pThreadMgr
    );
    
    if (SUCCEEDED(hr)) {
        hr = m_pThreadMgr->Activate(&m_clientId);
    }
    
    return hr;
}

HRESULT TSFManager::InitializeDocumentManager() {
    if (!m_pThreadMgr) {
        return E_FAIL;
    }
    
    return m_pThreadMgr->CreateDocumentMgr(&m_pDocumentMgr);
}

HRESULT TSFManager::CreateContext() {
    if (!m_pDocumentMgr) {
        return E_FAIL;
    }
    
    return m_pDocumentMgr->CreateContext(
        m_clientId,
        0,
        nullptr,
        &m_pContext,
        &m_editCookie
    );
}

HRESULT TSFManager::ProcessKeyInput(WPARAM wParam, LPARAM lParam) {
    // Check for function key press
    if (wParam == VK_FN || (lParam & 0x1000000)) { // Extended key bit
        m_functionKeyPressed = true;
        return S_OK;
    }
    
    // Check for archaic key combination
    if (IsArchaicKeyCombination(wParam, lParam)) {
        return ProcessArchaicKey(wParam, lParam);
    }
    
    // Handle regular key input
    if (wParam >= 'A' && wParam <= 'Z') {
        wchar_t ch = static_cast<wchar_t>(wParam);
        
        // Convert to lowercase for processing
        ch = towlower(ch);
        
        // Add to input buffer
        m_inputBuffer += ch;
        
        // Process the input
        std::wstring result = m_jamoProcessor->processInput(m_inputBuffer);
        
        // Insert the result
        HRESULT hr = InsertText(result);
        if (SUCCEEDED(hr)) {
            ClearInputBuffer();
        }
        
        return hr;
    }
    
    // Handle space key to commit current input
    if (wParam == VK_SPACE) {
        if (!m_inputBuffer.empty()) {
            std::wstring result = m_jamoProcessor->processInput(m_inputBuffer);
            HRESULT hr = InsertText(result);
            if (SUCCEEDED(hr)) {
                ClearInputBuffer();
            }
            return hr;
        }
    }
    
    // Handle backspace
    if (wParam == VK_BACK) {
        if (!m_inputBuffer.empty()) {
            m_inputBuffer.pop_back();
            return S_OK;
        }
    }
    
    return S_OK;
}

HRESULT TSFManager::HandleFunctionKey(WPARAM wParam, LPARAM lParam) {
    // Toggle archaic mode with Fn + Space
    if (wParam == VK_SPACE && m_functionKeyPressed) {
        m_archaicMode = !m_archaicMode;
        m_functionKeyPressed = false;
        return S_OK;
    }
    
    // Toggle archaic mode with Ctrl + Alt + A
    if (wParam == 'A' && (GetKeyState(VK_CONTROL) & 0x8000) && (GetKeyState(VK_MENU) & 0x8000)) {
        m_archaicMode = !m_archaicMode;
        return S_OK;
    }
    
    return S_OK;
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
        
        // Insert the result
        HRESULT hr = InsertText(result);
        if (SUCCEEDED(hr)) {
            ClearInputBuffer();
        }
        
        return hr;
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
    if (!m_pContext || text.empty()) {
        return E_FAIL;
    }
    
    // Get the composition interface
    ITfComposition* pComposition = nullptr;
    HRESULT hr = m_pContext->GetComposition(m_editCookie, &pComposition);
    
    if (SUCCEEDED(hr) && pComposition) {
        // Insert text into composition
        ITfRange* pRange = nullptr;
        hr = pComposition->GetRange(&pRange);
        
        if (SUCCEEDED(hr) && pRange) {
            // Set text in the range
            hr = pRange->SetText(m_editCookie, 0, text.c_str(), text.length());
            pRange->Release();
        }
        
        pComposition->Release();
    }
    
    return hr;
}

void TSFManager::ClearInputBuffer() {
    m_inputBuffer.clear();
}

} // namespace KoreanKeyboard 