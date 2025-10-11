import React, { useState, useRef, useCallback, useEffect } from 'react'
import { KEYBOARD_LAYOUT, getArchaicVariants, getShiftedCharacter } from '../utils/koreanKeyboard.js'

const KoreanKeyboard = ({ onKeyPress, onTextInput }) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false)
  const [popup, setPopup] = useState(null)
  const [currentKey, setCurrentKey] = useState(null)
  const longPressTimer = useRef(null)
  const longPressDelay = 500 // ms

  // Handle clicking outside popup to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popup && !event.target.closest('.archaic-popup') && !event.target.closest('.key')) {
        hideArchaicPopup()
      }
    }

    if (popup) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [popup])

  const getKeyClass = (key) => {
    const classes = ['key']
    
    if (key === 'shift') classes.push('key--shift')
    if (key === 'backspace') classes.push('key--backspace')
    if (key === 'space') classes.push('key--space')
    if (key === 'enter') classes.push('key--enter')
    if (key === '123') classes.push('key--numbers')
    if (key === 'emoji') classes.push('key--emoji')
    if (isShiftPressed && key === 'shift') classes.push('key--active')
    
    return classes.join(' ')
  }

  const getKeyContent = (key) => {
    switch (key) {
      case 'shift':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l8 8h-5v10h-6V10H4l8-8z"/>
          </svg>
        )
      case 'backspace':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
          </svg>
        )
      case 'space':
        return <span>스페이스</span>
      case 'enter':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7h-2z"/>
          </svg>
        )
      case '123':
        return <span>123</span>
      case 'emoji':
        return <span>😊</span>
      default:
        // Show shifted character if shift is pressed and mapping exists
        const displayChar = isShiftPressed ? getShiftedCharacter(key) : key
        console.log('🎨 Displaying key:', key, 'as:', displayChar, 'shift state:', isShiftPressed)
        return <span className="korean-text">{displayChar}</span>
    }
  }

  const handleKeyDown = useCallback((keyValue, event) => {
    event.preventDefault()
    setCurrentKey(keyValue)
    
    // Start long press timer for characters with archaic variants
    const variants = getArchaicVariants(keyValue)
    if (variants.length > 1) {
      longPressTimer.current = setTimeout(() => {
        showArchaicPopup(keyValue, variants, event.target)
      }, longPressDelay)
    }
    
    // Don't process the key immediately - wait for click or key up
  }, [])

  const handleKeyUp = useCallback((keyValue, event) => {
    event.preventDefault()
    
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    
    // Don't process key press automatically - only on click
    // This prevents immediate input on hover
    setCurrentKey(null)
  }, [])

  const handleKeyClick = useCallback((keyValue, event) => {
    event.preventDefault()
    console.log('🖱️ handleKeyClick called with:', keyValue, 'current shift state:', isShiftPressed)
    
    // Clear any existing timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    
    // Hide popup if it exists
    if (popup) {
      hideArchaicPopup()
      return
    }
    
    // Handle key press
    processKeyPress(keyValue)
  }, [popup, isShiftPressed])

  const processKeyPress = (keyValue) => {
    console.log('🔑 processKeyPress called with:', keyValue, 'current shift state:', isShiftPressed)
    switch (keyValue) {
      case 'shift':
        // Toggle shift state using functional update to avoid stale closure
        console.log('🔄 Shift key pressed, toggling shift state')
        setIsShiftPressed(prev => {
          const newState = !prev
          console.log('   Toggling from', prev, 'to', newState)
          return newState
        })
        break
      case 'backspace':
        onKeyPress('backspace')
        break
      case 'space':
        onTextInput(' ')
        break
      case 'enter':
        onTextInput('\n')
        break
      case '123':
        // Switch to numbers/symbols (placeholder)
        console.log('Switch to numbers')
        break
      case 'emoji':
        // Show emoji picker (placeholder)
        console.log('Show emoji picker')
        break
      default:
        if (keyValue && keyValue.length === 1) {
          // Use shifted character if shift is pressed
          const inputChar = isShiftPressed ? getShiftedCharacter(keyValue) : keyValue
          console.log('📝 Input character:', keyValue, 'shifted to:', inputChar, 'shift state:', isShiftPressed)
          onTextInput(inputChar)
          
          // Reset shift after typing a character (like traditional keyboard)
          if (isShiftPressed) {
            console.log('🔄 Resetting shift after character input')
            setIsShiftPressed(false)
          }
        }
    }
  }

  const showArchaicPopup = (keyValue, variants, keyElement) => {
    hideArchaicPopup() // Hide any existing popup
    
    const rect = keyElement.getBoundingClientRect()
    const popupWidth = variants.length * 40 + 20 // Approximate width
    // Center the popup directly above the key
    const calculatedLeft = rect.left + (rect.width / 2) - (popupWidth / 2)
    const calculatedBottom = window.innerHeight - rect.top + rect.height + 5
    
    console.log('🎯 Popup positioning for key:', keyValue)
    console.log('   Key rect:', { left: rect.left, top: rect.top, width: rect.width, height: rect.height })
    console.log('   Calculated position:', { left: calculatedLeft, bottom: calculatedBottom })
    console.log('   Window size:', { width: window.innerWidth, height: window.innerHeight })
    
    const popupElement = {
      keyValue,
      variants,
      position: {
        left: calculatedLeft,
        bottom: calculatedBottom
      }
    }
    
    setPopup(popupElement)
  }

  const hideArchaicPopup = () => {
    setPopup(null)
  }

  const handleVariantClick = (variant) => {
    onTextInput(variant)
    hideArchaicPopup()
    setCurrentKey(null)
  }

  const renderRow = (keys, rowClass) => {
    return (
      <div className={`keyboard-row ${rowClass}`}>
        {keys.map((key, index) => (
          <div
            key={`${rowClass}-${index}`}
            className={getKeyClass(key)}
            data-key={key}
            onMouseDown={(e) => handleKeyDown(key, e)}
            onMouseUp={(e) => handleKeyUp(key, e)}
            onMouseLeave={(e) => handleKeyUp(key, e)}
            onTouchStart={(e) => handleKeyDown(key, e)}
            onTouchEnd={(e) => handleKeyUp(key, e)}
            onClick={(e) => handleKeyClick(key, e)}
          >
            {getKeyContent(key)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="korean-keyboard">
      <div className="keyboard-container">
        {renderRow(KEYBOARD_LAYOUT.row1, 'row1')}
        {renderRow(KEYBOARD_LAYOUT.row2, 'row2')}
        {renderRow(KEYBOARD_LAYOUT.row3, 'row3')}
        {renderRow(KEYBOARD_LAYOUT.row4, 'row4')}
      </div>
      
      {/* Archaic popup */}
      {popup && (
        <div 
          className="archaic-popup"
          style={{
            position: 'fixed',
            left: `${popup.position.left}px`,
            bottom: `${popup.position.bottom}px`,
            zIndex: 1000,
            display: 'flex',
            gap: '4px',
            padding: '8px',
            backgroundColor: 'var(--color-background-secondary, #2a2a2a)',
            border: '1px solid var(--color-border, #444)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          {popup.variants.map((variant, index) => (
            <div
              key={index}
              className="archaic-variant"
              onClick={() => handleVariantClick(variant)}
              style={{
                padding: '8px 12px',
                backgroundColor: 'var(--color-background-primary, #333)',
                border: '1px solid var(--color-border, #555)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px',
                minWidth: '32px',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-accent, #007acc)'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-background-primary, #333)'
                e.target.style.color = 'inherit'
              }}
            >
              <span className="korean-text">{variant}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default KoreanKeyboard
