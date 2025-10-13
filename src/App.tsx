import { useState, useEffect, useCallback } from 'react'
import KoreanKeyboard from './components/KoreanKeyboard.tsx'
import { processKoreanInput } from './utils/koreanKeyboard.js'
import type { Note } from './types/korean.js'
const iconSvg = '/korean-keyboard/icons/icon.svg'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(true)
  const [noteTitle, setNoteTitle] = useState<string>('')
  const [noteContent, setNoteContent] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTextareaFocused, setIsTextareaFocused] = useState<boolean>(false)
  const [cursorPosition, setCursorPosition] = useState<number>(0)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = loadNotes()
    setNotes(savedNotes)
    if (savedNotes.length > 0) {
      setCurrentNote(savedNotes[0])
      setNoteTitle(savedNotes[0].title || '')
      setNoteContent(savedNotes[0].content || '')
    } else {
      createNewNote()
    }
  }, [])


  // Auto-save when note content changes (but not during deletion)
  useEffect(() => {
    if (currentNote && !isDeleting) {
      const timer = setTimeout(() => {
        saveCurrentNote()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [noteTitle, noteContent, currentNote, isDeleting])

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                            (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
                            window.innerWidth <= 768
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const loadNotes = () => {
    try {
      const saved = localStorage.getItem('korean-notes')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading notes:', error)
      return []
    }
  }

  const saveNotes = (notesToSave: Note[]) => {
    try {
      localStorage.setItem('korean-notes', JSON.stringify(notesToSave))
    } catch (error) {
      console.error('Error saving notes:', error)
    }
  }

  const createNewNote = () => {
    // Set deletion flag to prevent auto-save during note creation
    setIsDeleting(true)
    
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const updatedNotes = [newNote, ...notes]
    setNotes(updatedNotes)
    setCurrentNote(newNote)
    setNoteTitle('')
    setNoteContent('')
    saveNotes(updatedNotes)
    
    // Clear deletion flag after a short delay
    setTimeout(() => {
      setIsDeleting(false)
    }, 100)
  }

  const selectNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId)
    if (note) {
      setCurrentNote(note)
      setNoteTitle(note.title || '')
      setNoteContent(note.content || '')
    }
  }

  const saveCurrentNote = () => {
    if (currentNote) {
      const updatedNote = {
        ...currentNote,
        title: noteTitle,
        content: noteContent,
        updatedAt: new Date().toISOString()
      }
      
      const updatedNotes = notes.map(n => 
        n.id === currentNote.id ? updatedNote : n
      )
      
      setNotes(updatedNotes)
      setCurrentNote(updatedNote)
      saveNotes(updatedNotes)
    }
  }

  const deleteCurrentNote = () => {
    if (currentNote && confirm('Are you sure you want to delete this note?')) {
      // Set deletion flag to prevent auto-save during deletion
      setIsDeleting(true)
      
      // Filter out the current note
      const updatedNotes = notes.filter(n => n.id !== currentNote.id)
      
      // Update state atomically
      setNotes(updatedNotes)
      
      // Select next note or create new one
      if (updatedNotes.length > 0) {
        const nextNote = updatedNotes[0]
        setCurrentNote(nextNote)
        setNoteTitle(nextNote.title || '')
        setNoteContent(nextNote.content || '')
      } else {
        // Create new note if no notes remain
        const newNote = {
          id: Date.now().toString(),
          title: '',
          content: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        const notesWithNew = [newNote]
        setNotes(notesWithNew)
        setCurrentNote(newNote)
        setNoteTitle('')
        setNoteContent('')
        saveNotes(notesWithNew)
      }
      
      // Save the updated notes (without the deleted note)
      saveNotes(updatedNotes)
      
      // Clear deletion flag after a short delay to ensure state is settled
      setTimeout(() => {
        setIsDeleting(false)
      }, 100)
    }
  }

  const toggleKeyboard = () => {
    setIsKeyboardVisible(!isKeyboardVisible)
  }

  const handleKeyboardKey = useCallback((key: string) => {
    if (key === 'backspace') {
      setNoteContent(prev => {
        const textarea = document.querySelector('#note-content') as HTMLTextAreaElement
        if (textarea) {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd
          
          console.log('🔍 SIMPLE: Backspace pressed at position:', start, 'to', end)
          
          if (start === end && start > 0) {
            // Simple backspace: remove one character
            const newContent = prev.substring(0, start - 1) + prev.substring(end)
            const composedContent = processKoreanInput(newContent)
            console.log('🔍 SIMPLE: Backspace result:', composedContent)
            return composedContent
          } else if (start !== end) {
            // Delete selection
            const newContent = prev.substring(0, start) + prev.substring(end)
            const composedContent = processKoreanInput(newContent)
            console.log('🔍 SIMPLE: Delete selection result:', composedContent)
            return composedContent
          }
        }
        return prev
      })
    } else if (key === 'arrow-left') {
      // Move cursor left
      const textarea = document.querySelector('#note-content') as HTMLTextAreaElement
      if (textarea) {
        const currentPos = textarea.selectionStart
        if (currentPos > 0) {
          const newPos = currentPos - 1
          setTimeout(() => {
            textarea.setSelectionRange(newPos, newPos)
            textarea.focus()
            setCursorPosition(newPos)
          }, 0)
        }
      }
    } else if (key === 'arrow-right') {
      // Move cursor right
      const textarea = document.querySelector('#note-content') as HTMLTextAreaElement
      if (textarea) {
        const currentPos = textarea.selectionStart
        const maxPos = textarea.value.length
        if (currentPos < maxPos) {
          const newPos = currentPos + 1
          setTimeout(() => {
            textarea.setSelectionRange(newPos, newPos)
            textarea.focus()
            setCursorPosition(newPos)
          }, 0)
        }
      }
    }
  }, [])

  const handleKeyboardText = useCallback((text: string) => {
    console.log('🔍 handleKeyboardText called with:', text)
    
    setNoteContent(prev => {
      const textarea = document.querySelector('#note-content') as HTMLTextAreaElement
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const before = prev.substring(0, start)
        const after = prev.substring(end)
        
        // Process the input with unified approach - all characters treated the same
        const rawContent = before + text + after
        const composedContent = processKoreanInput(rawContent)
        console.log('🔍 Raw content:', rawContent)
        console.log('🔍 Composed content:', composedContent)
        
        // Set cursor position after state update
        setTimeout(() => {
          const newPosition = start + text.length
          textarea.setSelectionRange(newPosition, newPosition)
          textarea.focus()
          setCursorPosition(newPosition)
        }, 0)
        
        return composedContent
      }
      return prev + text
    })
  }, [])

  // Handle textarea focus - manage keyboard visibility
  const handleTextareaFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsTextareaFocused(true)
    if (isMobile) {
      // Ensure our custom keyboard is visible
      setIsKeyboardVisible(true)
      // Small delay to prevent native keyboard
      setTimeout(() => {
        e.target.blur()
      }, 10)
    }
  }, [isMobile])

  // Handle textarea blur
  const handleTextareaBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Only blur if it's not a click on our custom keyboard
    const relatedTarget = e.relatedTarget as Element | null
    if (relatedTarget && relatedTarget.closest('.keyboard-container')) {
      // If clicking on keyboard, prevent blur and refocus
      setTimeout(() => {
        e.target.focus()
      }, 0)
    } else {
      // Actually blurring, update focus state
      setIsTextareaFocused(false)
    }
  }, [])

  // Handle textarea click - ensure keyboard is visible on mobile
  const handleTextareaClick = useCallback((e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (isMobile) {
      // Ensure our custom keyboard is visible when clicking on textarea
      setIsKeyboardVisible(true)
    }
    // Update cursor position
    const textarea = e.currentTarget
    setCursorPosition(textarea.selectionStart)
  }, [isMobile])


  // Handle overlay click - prevent native keyboard
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // Ensure our custom keyboard is visible and textarea appears focused
    setIsKeyboardVisible(true)
    setIsTextareaFocused(true)
  }, [])

  // Handle overlay touch - prevent native keyboard
  const handleOverlayTouch = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // Ensure our custom keyboard is visible and textarea appears focused
    setIsKeyboardVisible(true)
    setIsTextareaFocused(true)
  }, [])

  // Handle title input focus - manage keyboard visibility
  const handleTitleFocus = useCallback((_e: React.FocusEvent<HTMLInputElement>) => {
    // Ensure our custom keyboard is visible on mobile
    if (isMobile) {
      setIsKeyboardVisible(true)
    }
  }, [isMobile])

  // Handle title input blur
  const handleTitleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    // Only blur if it's not a click on our custom keyboard
    const relatedTarget = e.relatedTarget as Element | null
    if (relatedTarget && relatedTarget.closest('.keyboard-container')) {
      // If clicking on keyboard, prevent blur and refocus
      setTimeout(() => {
        e.target.focus()
      }, 0)
    }
  }, [])

  // Handle title input click - ensure keyboard is visible on mobile
  const handleTitleClick = useCallback((_e: React.MouseEvent<HTMLInputElement>) => {
    if (isMobile) {
      // Ensure our custom keyboard is visible when clicking on title input
      setIsKeyboardVisible(true)
    }
  }, [isMobile])


  const renderNotesList = () => {
    if (notes.length === 0) {
      return <div className="empty-notes">No notes yet. Create your first note!</div>
    }
    
    return notes.map(note => (
      <div 
        key={note.id}
        className={`note-item ${note.id === currentNote?.id ? 'note-item--active' : ''}`}
        onClick={() => selectNote(note.id)}
      >
        <div className="note-item-title">{note.title || 'Untitled Note'}</div>
        <div className="note-item-preview">
          {note.content.substring(0, 50)}{note.content.length > 50 ? '...' : ''}
        </div>
        <div className="note-item-date">
          {/* change to YYYY-MM-DD */}
          {new Date(note.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </div>
      </div>
    ))
  }

  return (
    <div className="note-app">
      <header className="app-header">
        <div className="app-title-container">
          <img src={iconSvg} alt="Old Korean Notetaker" className="app-icon" />
          <h1 className="app-title">옛정음필기</h1>
        </div>
        <div className="header-actions">
          <button className="button button--secondary" onClick={createNewNote}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            New Note
          </button>
          <button className="button button--secondary" onClick={toggleKeyboard}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zm-3-3h2v2H8V8zm0 3h2v2H8v-2zm-1 2H3v-2h4v2zm0-4H3V8h4v2zm0-4H3V4h4v2zm5 7h2v2h-2v-2zm0-3h2v2h-2v-2zm0-3h2v2h-2V8zm7 5v2h-4v-2h4zm0-4v2h-4V8h4zm0-4v2h-4V4h4z"/>
            </svg>
            {isKeyboardVisible ? 'Hide' : 'Show'} Keyboard
          </button>
        </div>
      </header>
      
      <main className="app-content">
        <section className="notes-sidebar">
          <div className="notes-list">
            {renderNotesList()}
          </div>
        </section>
        
        <section className="note-editor-container">
          <header className="note-editor-header">
            <div className="title-input-container">
              <input 
                type="text" 
                className="input note-title" 
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                onFocus={handleTitleFocus}
                onBlur={handleTitleBlur}
                onClick={handleTitleClick}
                placeholder="Untitled Note"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
            <div className="note-actions">
              <button className="button button--secondary" onClick={saveCurrentNote}>
                Save
              </button>
              <button className="button button--secondary" onClick={deleteCurrentNote}>
                Delete
              </button>
            </div>
          </header>
          
          <article className="note-editor">
            <div className={`textarea-container ${isTextareaFocused ? 'textarea-focused' : ''}`}>
              <textarea 
                className="note-textarea korean-text" 
                id="note-content"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                onFocus={handleTextareaFocus}
                onBlur={handleTextareaBlur}
                onClick={handleTextareaClick}
                placeholder="Start typing your note here..."
                rows={10}
                inputMode="none"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {isMobile && (
                <div 
                  className="textarea-overlay"
                  onClick={handleOverlayClick}
                  onTouchStart={handleOverlayTouch}
                />
              )}
              {isTextareaFocused && (
                <div className="cursor-indicator">
                  <span className="cursor-text">{noteContent.substring(0, cursorPosition)}</span>
                  <span className="cursor-blink">|</span>
                </div>
              )}
            </div>
          </article>
        </section>
      </main>
      
      <div className={`keyboard-container ${isKeyboardVisible ? 'keyboard-visible' : 'keyboard-hidden'}`}>
        <div className="keyboard-wrapper">
          <KoreanKeyboard 
            onKeyPress={handleKeyboardKey}
            onTextInput={handleKeyboardText}
          />
        </div>
      </div>
    </div>
  )
}

export default App
