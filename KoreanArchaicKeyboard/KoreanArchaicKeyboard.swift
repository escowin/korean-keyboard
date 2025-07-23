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
 * This module implements the keyboard view for the iOS keyboard extension
 * with support for Korean archaic characters.
 * 
 * Contributors:
 * - Korean linguistics research community
 * - Apple iOS Keyboard Extension Framework
 * 
 * Version: 1.0.0
 * Build Date: 2025
 */

import UIKit

// MARK: - Keyboard View Delegate

protocol KoreanArchaicKeyboardViewDelegate: AnyObject {
    func didTapKey(_ key: String)
    func didTapShift()
    func didTapBackspace()
    func didTapSpace()
    func didTapReturn()
    func didTapArchaicMode()
    func didTapGlobe()
}

// MARK: - Korean Archaic Keyboard View

class KoreanArchaicKeyboardView: UIView {
    
    // MARK: - Properties
    
    weak var delegate: KoreanArchaicKeyboardViewDelegate?
    
    private var isArchaicModeEnabled: Bool = false
    private var isShiftPressed: Bool = false
    
    // Keyboard layout
    private var keyButtons: [UIButton] = []
    private var shiftButton: UIButton!
    private var backspaceButton: UIButton!
    private var spaceButton: UIButton!
    private var returnButton: UIButton!
    private var archaicModeButton: UIButton!
    private var globeButton: UIButton!
    
    // MARK: - Initialization
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupKeyboard()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupKeyboard()
    }
    
    // MARK: - Setup
    
    private func setupKeyboard() {
        backgroundColor = UIColor.systemGray6
        
        // Create keyboard rows
        createFirstRow()
        createSecondRow()
        createThirdRow()
        createFourthRow()
        
        // Setup constraints
        setupConstraints()
    }
    
    private func createFirstRow() {
        let firstRowKeys = ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"]
        let firstRow = createKeyRow(keys: firstRowKeys)
        addSubview(firstRow)
    }
    
    private func createSecondRow() {
        let secondRowKeys = ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"]
        let secondRow = createKeyRow(keys: secondRowKeys)
        addSubview(secondRow)
    }
    
    private func createThirdRow() {
        let thirdRowKeys = ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"]
        let thirdRow = createKeyRow(keys: thirdRowKeys)
        addSubview(thirdRow)
        
        // Add shift button
        shiftButton = createKeyButton(title: "⇧", action: #selector(shiftTapped))
        thirdRow.addSubview(shiftButton)
    }
    
    private func createFourthRow() {
        let fourthRow = UIStackView()
        fourthRow.axis = .horizontal
        fourthRow.distribution = .fillEqually
        fourthRow.spacing = 4
        fourthRow.translatesAutoresizingMaskIntoConstraints = false
        addSubview(fourthRow)
        
        // Globe button
        globeButton = createKeyButton(title: "🌐", action: #selector(globeTapped))
        fourthRow.addArrangedSubview(globeButton)
        
        // Archaic mode button
        archaicModeButton = createKeyButton(title: "옛", action: #selector(archaicModeTapped))
        fourthRow.addArrangedSubview(archaicModeButton)
        
        // Space button
        spaceButton = createKeyButton(title: "space", action: #selector(spaceTapped))
        spaceButton.titleLabel?.font = UIFont.systemFont(ofSize: 14)
        fourthRow.addArrangedSubview(spaceButton)
        
        // Return button
        returnButton = createKeyButton(title: "return", action: #selector(returnTapped))
        returnButton.titleLabel?.font = UIFont.systemFont(ofSize: 14)
        fourthRow.addArrangedSubview(returnButton)
        
        // Backspace button
        backspaceButton = createKeyButton(title: "⌫", action: #selector(backspaceTapped))
        fourthRow.addArrangedSubview(backspaceButton)
    }
    
    private func createKeyRow(keys: [String]) -> UIStackView {
        let row = UIStackView()
        row.axis = .horizontal
        row.distribution = .fillEqually
        row.spacing = 4
        row.translatesAutoresizingMaskIntoConstraints = false
        
        for key in keys {
            let button = createKeyButton(title: key, action: #selector(keyTapped(_:)))
            button.tag = keyButtons.count
            keyButtons.append(button)
            row.addArrangedSubview(button)
        }
        
        return row
    }
    
    private func createKeyButton(title: String, action: Selector) -> UIButton {
        let button = UIButton(type: .system)
        button.setTitle(title, for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        button.backgroundColor = UIColor.systemGray5
        button.layer.cornerRadius = 4
        button.layer.borderWidth = 0.5
        button.layer.borderColor = UIColor.systemGray4.cgColor
        button.addTarget(self, action: action, for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false
        
        // Set minimum height
        button.heightAnchor.constraint(equalToConstant: 44).isActive = true
        
        return button
    }
    
    private func setupConstraints() {
        // This would set up proper constraints for all keyboard rows
        // For brevity, using a simplified layout
    }
    
    // MARK: - Actions
    
    @objc private func keyTapped(_ sender: UIButton) {
        guard sender.tag < keyButtons.count else { return }
        let key = keyButtons[sender.tag].title(for: .normal) ?? ""
        delegate?.didTapKey(key)
    }
    
    @objc private func shiftTapped() {
        delegate?.didTapShift()
    }
    
    @objc private func backspaceTapped() {
        delegate?.didTapBackspace()
    }
    
    @objc private func spaceTapped() {
        delegate?.didTapSpace()
    }
    
    @objc private func returnTapped() {
        delegate?.didTapReturn()
    }
    
    @objc private func archaicModeTapped() {
        delegate?.didTapArchaicMode()
    }
    
    @objc private func globeTapped() {
        delegate?.didTapGlobe()
    }
    
    // MARK: - Public Methods
    
    func updateShiftState(_ isPressed: Bool) {
        isShiftPressed = isPressed
        shiftButton.backgroundColor = isPressed ? UIColor.systemBlue : UIColor.systemGray5
        shiftButton.setTitleColor(isPressed ? UIColor.white : UIColor.label, for: .normal)
    }
    
    func toggleArchaicMode() {
        isArchaicModeEnabled.toggle()
        archaicModeButton.backgroundColor = isArchaicModeEnabled ? UIColor.systemOrange : UIColor.systemGray5
        archaicModeButton.setTitleColor(isArchaicModeEnabled ? UIColor.white : UIColor.label, for: .normal)
    }
} 