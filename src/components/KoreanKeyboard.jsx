import React, { useState, useRef, useCallback } from 'react'
import { KEYBOARD_LAYOUT, getArchaicVariants } from '../utils/koreanKeyboard.js'

const KoreanKeyboard = ({ onKeyPress, onTextInput }) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false)
  const [popup, setPopup] = useState(null)
  const [currentKey, setCurrentKey] = useState(null)
  const longPressTimer = useRef(null)
  const longPressDelay = 500 // ms

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
        return <span className="korean-text">{key}</span>
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
  }, [])

  const handleKeyUp = useCallback((keyValue, event) => {
    event.preventDefault()
    
    // Clear long press timer
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
    setCurrentKey(null)
  }, [popup])

  const handleKeyClick = useCallback((keyValue, event) => {
    event.preventDefault()
    
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
  }, [popup])

  const processKeyPress = (keyValue) => {
    switch (keyValue) {
      case 'shift':
        setIsShiftPressed(!isShiftPressed)
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
          onTextInput(keyValue)
        }
    }
  }

  const showArchaicPopup = (keyValue, variants, keyElement) => {
    hideArchaicPopup() // Hide any existing popup
    
    const rect = keyElement.getBoundingClientRect()
    const popupElement = {
      keyValue,
      variants,
      position: {
        left: rect.left,
        bottom: window.innerHeight - rect.top + 10
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
            zIndex: 1000
          }}
        >
          {popup.variants.map((variant, index) => (
            <div
              key={index}
              className="archaic-variant"
              onClick={() => handleVariantClick(variant)}
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
