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
 * This software implements Korean keyboard functionality with support for
 * archaic Korean jamo (옛한글) characters including ㆍ, ㅿ, ㆆ, and ㅸ.
 * 
 * Contributors:
 * - Korean linguistics research community
 * - Unicode Consortium standards
 * - Microsoft Windows Text Services Framework
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

#include <windows.h>
#include <msctf.h>
#include <memory>
#include <wincrypt.h>
#include "TSFManager.h"
#include "JamoProcessor.h"

using namespace KoreanKeyboard;

// Global TSF manager instance
std::unique_ptr<TSFManager> g_tsfManager;

// DLL entry point
BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved) {
    switch (ul_reason_for_call) {
        case DLL_PROCESS_ATTACH:
            // Initialize TSF manager
            g_tsfManager = std::make_unique<TSFManager>();
            if (FAILED(g_tsfManager->Initialize())) {
                return FALSE;
            }
            break;
            
        case DLL_PROCESS_DETACH:
            // Cleanup TSF manager
            if (g_tsfManager) {
                g_tsfManager->Cleanup();
                g_tsfManager.reset();
            }
            break;
            
        case DLL_THREAD_ATTACH:
        case DLL_THREAD_DETACH:
            break;
    }
    return TRUE;
}

// Export functions for TSF integration
extern "C" {

// Initialize the keyboard extension
__declspec(dllexport) HRESULT InitializeKoreanArchaicKeyboard() {
    if (!g_tsfManager) {
        return E_FAIL;
    }
    return S_OK;
}

// Process keyboard input
__declspec(dllexport) HRESULT ProcessKoreanInput(WPARAM wParam, LPARAM lParam) {
    if (!g_tsfManager) {
        return E_FAIL;
    }
    return g_tsfManager->ProcessKeyInput(wParam, lParam);
}

// Handle function key combinations
__declspec(dllexport) HRESULT HandleKoreanFunctionKey(WPARAM wParam, LPARAM lParam) {
    if (!g_tsfManager) {
        return E_FAIL;
    }
    return g_tsfManager->HandleFunctionKey(wParam, lParam);
}

// Set archaic mode
__declspec(dllexport) void SetKoreanArchaicMode(BOOL enabled) {
    if (g_tsfManager) {
        g_tsfManager->SetArchaicMode(enabled != 0);
    }
}

// Get archaic mode status
__declspec(dllexport) BOOL IsKoreanArchaicMode() {
    if (g_tsfManager) {
        return g_tsfManager->IsArchaicMode() ? TRUE : FALSE;
    }
    return FALSE;
}

// Test function for development
__declspec(dllexport) HRESULT TestKoreanComposition(const wchar_t* input, wchar_t* output, int outputSize) {
    if (!input || !output || outputSize <= 0) {
        return E_INVALIDARG;
    }
    
    auto processor = std::make_unique<JamoProcessor>();
    std::wstring result = processor->processInput(input);
    
    if (result.length() >= static_cast<size_t>(outputSize)) {
        return HRESULT_FROM_WIN32(ERROR_INSUFFICIENT_BUFFER);
    }
    
    wcscpy_s(output, outputSize, result.c_str());
    return S_OK;
}

} // extern "C" 