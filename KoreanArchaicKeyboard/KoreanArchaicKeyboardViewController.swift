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
 * This iOS keyboard extension implements Korean jamo processing with support
 * for archaic Korean characters (옛한글) using comprehensive mapping system.
 * 
 * Contributors:
 * - Korean linguistics research community
 * - Unicode Consortium standards
 * - Apple iOS Keyboard Extension Framework
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

import UIKit
import Foundation

class KoreanArchaicKeyboardViewController: UIInputViewController {
    
    // MARK: - Properties
    
    private var keyboardView: KoreanArchaicKeyboardView!
    private var jamoProcessor: KoreanJamoProcessor!
    
    // Input state tracking
    private var inputBuffer: String = ""
    private var lastKeyTime: TimeInterval = 0
    private var keyHistory: [String] = []
    private var isShiftPressed: Bool = false
    
    // Constants
    private let doublePressTimeout: TimeInterval = 0.3
    private let maxKeyHistory = 10
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupKeyboard()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        keyboardView.delegate = self
    }
    
    // MARK: - Setup
    
    private func setupKeyboard() {
        jamoProcessor = KoreanJamoProcessor()
        
        // Create keyboard view
        keyboardView = KoreanArchaicKeyboardView(frame: view.bounds)
        keyboardView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(keyboardView)
        
        // Setup constraints
        NSLayoutConstraint.activate([
            keyboardView.topAnchor.constraint(equalTo: view.topAnchor),
            keyboardView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            keyboardView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            keyboardView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
    
    // MARK: - Input Processing
    
    private func processKeyInput(_ key: String) {
        let currentTime = Date().timeIntervalSince1970
        
        // Clear key history if too much time has passed
        if currentTime - lastKeyTime > doublePressTimeout {
            keyHistory.removeAll()
        }
        
        keyHistory.append(key)
        lastKeyTime = currentTime
        
        // Keep only recent keys
        if keyHistory.count > maxKeyHistory {
            keyHistory.removeFirst()
        }
        
        // Try to process archaic input combinations
        if let archaicChar = processArchaicCombination() {
            insertText(archaicChar)
            keyHistory.removeAll()
            return
        }
        
        // Process regular input
        if isArchaicMode() {
            inputBuffer += key
            let result = jamoProcessor.processInput(inputBuffer)
            if result != inputBuffer {
                // Replace the input buffer with the processed result
                let textDocumentProxy = self.textDocumentProxy
                for _ in 0..<inputBuffer.count {
                    textDocumentProxy.deleteBackward()
                }
                textDocumentProxy.insertText(result)
                inputBuffer = result
            }
        } else {
            // Standard Korean input
            insertText(key)
        }
    }
    
    private func processArchaicCombination() -> String? {
        let currentTime = Date().timeIntervalSince1970
        
        // Check for shift combinations
        if isShiftPressed && keyHistory.count >= 1 {
            let lastKey = keyHistory.last!
            if let archaicChar = jamoProcessor.getShiftCombination(lastKey) {
                return archaicChar
            }
        }
        
        // Check for double press combinations
        if keyHistory.count >= 2 {
            let lastTwo = Array(keyHistory.suffix(2))
            if lastTwo[0] == lastTwo[1] && currentTime - lastKeyTime < doublePressTimeout {
                if let archaicChar = jamoProcessor.getDoublePressCombination(lastTwo[0]) {
                    return archaicChar
                }
            }
        }
        
        // Check for key combinations
        if keyHistory.count >= 2 {
            let lastTwo = Array(keyHistory.suffix(2))
            if let archaicChar = jamoProcessor.getKeyCombination(lastTwo[0], lastTwo[1]) {
                return archaicChar
            }
        }
        
        return nil
    }
    
    private func isArchaicMode() -> Bool {
        // Check if we're in archaic mode (could be based on a toggle button)
        return keyboardView.isArchaicModeEnabled
    }
    
    private func insertText(_ text: String) {
        textDocumentProxy.insertText(text)
    }
    
    private func deleteBackward() {
        textDocumentProxy.deleteBackward()
        if !inputBuffer.isEmpty {
            inputBuffer.removeLast()
        }
    }
    
    private func clearInputBuffer() {
        inputBuffer.removeAll()
        keyHistory.removeAll()
    }
}

// MARK: - KoreanArchaicKeyboardViewDelegate

extension KoreanArchaicKeyboardViewController: KoreanArchaicKeyboardViewDelegate {
    
    func didTapKey(_ key: String) {
        processKeyInput(key)
    }
    
    func didTapShift() {
        isShiftPressed.toggle()
        keyboardView.updateShiftState(isShiftPressed)
    }
    
    func didTapBackspace() {
        deleteBackward()
    }
    
    func didTapSpace() {
        clearInputBuffer()
        insertText(" ")
    }
    
    func didTapReturn() {
        clearInputBuffer()
        textDocumentProxy.insertText("\n")
    }
    
    func didTapArchaicMode() {
        keyboardView.toggleArchaicMode()
        clearInputBuffer()
    }
    
    func didTapGlobe() {
        advanceToNextInputMode()
    }
} 