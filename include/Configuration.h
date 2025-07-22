#pragma once

#include <string>
#include <unordered_map>
#include <vector>

namespace KoreanKeyboard {

enum class ModifierKey {
    FN,
    CTRL_ALT,
    RIGHT_ALT,
    CUSTOM
};

enum class CompositionStyle {
    IMMEDIATE,
    DELAYED
};

struct KeyboardSettings {
    ModifierKey modifierKey;
    CompositionStyle compositionStyle;
    bool visualFeedback;
    bool archaicModeEnabled;
    int longPressDuration;
    bool hapticFeedback;
    std::wstring customModifierKey;
};

struct KeyMapping {
    wchar_t modernKey;
    wchar_t archaicJamo;
    std::wstring description;
};

class Configuration {
public:
    Configuration();
    ~Configuration() = default;

    // Load configuration from file
    bool LoadConfiguration(const std::wstring& filename);
    
    // Save configuration to file
    bool SaveConfiguration(const std::wstring& filename);
    
    // Get current settings
    const KeyboardSettings& GetSettings() const;
    
    // Update settings
    void UpdateSettings(const KeyboardSettings& settings);
    
    // Get key mapping for archaic jamos
    const std::vector<KeyMapping>& GetArchaicKeyMappings() const;
    
    // Set custom key mapping
    void SetKeyMapping(wchar_t modernKey, wchar_t archaicJamo);
    
    // Get archaic jamo for a key combination
    wchar_t GetArchaicJamoForKey(wchar_t key, ModifierKey modifier) const;
    
    // Reset to default settings
    void ResetToDefaults();
    
    // Validate settings
    bool ValidateSettings(const KeyboardSettings& settings) const;

private:
    // Current settings
    KeyboardSettings m_settings;
    
    // Key mappings
    std::vector<KeyMapping> m_keyMappings;
    
    // Default archaic key mappings
    static const std::vector<KeyMapping> DEFAULT_KEY_MAPPINGS;
    
    // Initialize default settings
    void InitializeDefaults();
    
    // Parse configuration file
    bool ParseConfigurationFile(const std::wstring& content);
    
    // Generate configuration file content
    std::wstring GenerateConfigurationContent() const;
    
    // Convert modifier key to string
    std::wstring ModifierKeyToString(ModifierKey key) const;
    
    // Convert string to modifier key
    ModifierKey StringToModifierKey(const std::wstring& str) const;
};

} // namespace KoreanKeyboard 