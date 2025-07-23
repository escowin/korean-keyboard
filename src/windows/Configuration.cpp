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
 * This module implements configuration management for Korean keyboard
 * settings and user preferences.
 * 
 * Contributors:
 * - Korean linguistics research community
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

#include "Configuration.h"
#include <fstream>
#include <sstream>
#include <algorithm>

namespace KoreanKeyboard {

// Default key mappings
const std::vector<KeyMapping> Configuration::DEFAULT_KEY_MAPPINGS = {
    {L'K', L'ㆍ', L"아래아 (아래아)"},
    {L'T', L'ㅿ', L"반시옷 (반시옷)"},
    {L'G', L'ㆆ', L"여린히읗 (여린히읗)"},
    {L'Q', L'ㅸ', L"쌍비읍 (쌍비읍)"}
};

Configuration::Configuration() {
    InitializeDefaults();
}

void Configuration::InitializeDefaults() {
    // Set default settings
    m_settings.modifierKey = ModifierKey::FN;
    m_settings.compositionStyle = CompositionStyle::IMMEDIATE;
    m_settings.visualFeedback = true;
    m_settings.archaicModeEnabled = true;
    m_settings.longPressDuration = 300;
    m_settings.hapticFeedback = true;
    m_settings.customModifierKey = L"";
    
    // Set default key mappings
    m_keyMappings = DEFAULT_KEY_MAPPINGS;
}

bool Configuration::LoadConfiguration(const std::wstring& filename) {
    std::wifstream file(filename.c_str());
    if (!file.is_open()) {
        return false;
    }
    
    std::wstring content((std::istreambuf_iterator<wchar_t>(file)),
                         std::istreambuf_iterator<wchar_t>());
    file.close();
    
    return ParseConfigurationFile(content);
}

bool Configuration::SaveConfiguration(const std::wstring& filename) {
    std::wofstream file(filename.c_str());
    if (!file.is_open()) {
        return false;
    }
    
    std::wstring content = GenerateConfigurationContent();
    file << content;
    file.close();
    
    return true;
}

const KeyboardSettings& Configuration::GetSettings() const {
    return m_settings;
}

void Configuration::UpdateSettings(const KeyboardSettings& settings) {
    if (ValidateSettings(settings)) {
        m_settings = settings;
    }
}

const std::vector<KeyMapping>& Configuration::GetArchaicKeyMappings() const {
    return m_keyMappings;
}

void Configuration::SetKeyMapping(wchar_t modernKey, wchar_t archaicJamo) {
    // Find existing mapping and update it
    for (auto& mapping : m_keyMappings) {
        if (mapping.modernKey == modernKey) {
            mapping.archaicJamo = archaicJamo;
            return;
        }
    }
    
    // Add new mapping
    m_keyMappings.push_back({modernKey, archaicJamo, L""});
}

wchar_t Configuration::GetArchaicJamoForKey(wchar_t key, ModifierKey modifier) const {
    // Check if modifier matches current settings
    if (modifier != m_settings.modifierKey) {
        return 0;
    }
    
    // Find mapping for the key
    for (const auto& mapping : m_keyMappings) {
        if (mapping.modernKey == key) {
            return mapping.archaicJamo;
        }
    }
    
    return 0;
}

void Configuration::ResetToDefaults() {
    InitializeDefaults();
}

bool Configuration::ValidateSettings(const KeyboardSettings& settings) const {
    // Validate long press duration
    if (settings.longPressDuration < 100 || settings.longPressDuration > 1000) {
        return false;
    }
    
    // Validate custom modifier key if using custom modifier
    if (settings.modifierKey == ModifierKey::CUSTOM && settings.customModifierKey.empty()) {
        return false;
    }
    
    return true;
}

bool Configuration::ParseConfigurationFile(const std::wstring& content) {
    std::wistringstream stream(content);
    std::wstring line;
    
    while (std::getline(stream, line)) {
        // Skip empty lines and comments
        if (line.empty() || line[0] == L'#') {
            continue;
        }
        
        // Parse key-value pairs
        size_t pos = line.find(L'=');
        if (pos != std::wstring::npos) {
            std::wstring key = line.substr(0, pos);
            std::wstring value = line.substr(pos + 1);
            
            // Trim whitespace
            key.erase(0, key.find_first_not_of(L" \t"));
            key.erase(key.find_last_not_of(L" \t") + 1);
            value.erase(0, value.find_first_not_of(L" \t"));
            value.erase(value.find_last_not_of(L" \t") + 1);
            
            // Parse settings
            if (key == L"modifier_key") {
                m_settings.modifierKey = StringToModifierKey(value);
            } else if (key == L"composition_style") {
                m_settings.compositionStyle = (value == L"immediate") ? 
                    CompositionStyle::IMMEDIATE : CompositionStyle::DELAYED;
            } else if (key == L"visual_feedback") {
                m_settings.visualFeedback = (value == L"true");
            } else if (key == L"archaic_mode_enabled") {
                m_settings.archaicModeEnabled = (value == L"true");
            } else if (key == L"long_press_duration") {
                m_settings.longPressDuration = std::stoi(value);
            } else if (key == L"haptic_feedback") {
                m_settings.hapticFeedback = (value == L"true");
            } else if (key == L"custom_modifier_key") {
                m_settings.customModifierKey = value;
            }
        }
    }
    
    return true;
}

std::wstring Configuration::GenerateConfigurationContent() const {
    std::wostringstream content;
    
    content << L"# Korean Archaic Keyboard Configuration\n";
    content << L"# Generated automatically\n\n";
    
    content << L"modifier_key=" << ModifierKeyToString(m_settings.modifierKey) << L"\n";
    content << L"composition_style=" << (m_settings.compositionStyle == CompositionStyle::IMMEDIATE ? L"immediate" : L"delayed") << L"\n";
    content << L"visual_feedback=" << (m_settings.visualFeedback ? L"true" : L"false") << L"\n";
    content << L"archaic_mode_enabled=" << (m_settings.archaicModeEnabled ? L"true" : L"false") << L"\n";
    content << L"long_press_duration=" << m_settings.longPressDuration << L"\n";
    content << L"haptic_feedback=" << (m_settings.hapticFeedback ? L"true" : L"false") << L"\n";
    content << L"custom_modifier_key=" << m_settings.customModifierKey << L"\n\n";
    
    content << L"# Key mappings\n";
    for (const auto& mapping : m_keyMappings) {
        content << L"key_mapping=" << mapping.modernKey << L"," << mapping.archaicJamo << L"\n";
    }
    
    return content.str();
}

std::wstring Configuration::ModifierKeyToString(ModifierKey key) const {
    switch (key) {
        case ModifierKey::FN:
            return L"fn";
        case ModifierKey::CTRL_ALT:
            return L"ctrl_alt";
        case ModifierKey::RIGHT_ALT:
            return L"right_alt";
        case ModifierKey::CUSTOM:
            return L"custom";
        default:
            return L"fn";
    }
}

ModifierKey Configuration::StringToModifierKey(const std::wstring& str) const {
    if (str == L"fn") {
        return ModifierKey::FN;
    } else if (str == L"ctrl_alt") {
        return ModifierKey::CTRL_ALT;
    } else if (str == L"right_alt") {
        return ModifierKey::RIGHT_ALT;
    } else if (str == L"custom") {
        return ModifierKey::CUSTOM;
    }
    
    return ModifierKey::FN; // Default
}

} // namespace KoreanKeyboard 