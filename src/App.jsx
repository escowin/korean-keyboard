import React, { useState, useEffect, useCallback } from 'react'
import KoreanKeyboard from './components/KoreanKeyboard.jsx'
import { processKoreanInput } from './utils/koreanKeyboard.js'

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')

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

  // Auto-save when note content changes
  useEffect(() => {
    if (currentNote) {
      const timer = setTimeout(() => {
        saveCurrentNote()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [noteTitle, noteContent, currentNote])

  const loadNotes = () => {
    try {
      const saved = localStorage.getItem('korean-notes')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading notes:', error)
      return []
    }
  }

  const saveNotes = (notesToSave) => {
    try {
      localStorage.setItem('korean-notes', JSON.stringify(notesToSave))
    } catch (error) {
      console.error('Error saving notes:', error)
    }
  }

  const createNewNote = () => {
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
  }

  const selectNote = (noteId) => {
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
      const updatedNotes = notes.filter(n => n.id !== currentNote.id)
      setNotes(updatedNotes)
      
      if (updatedNotes.length > 0) {
        setCurrentNote(updatedNotes[0])
        setNoteTitle(updatedNotes[0].title || '')
        setNoteContent(updatedNotes[0].content || '')
      } else {
        createNewNote()
      }
      
      saveNotes(updatedNotes)
    }
  }

  const toggleKeyboard = () => {
    setIsKeyboardVisible(!isKeyboardVisible)
  }

  const handleKeyboardKey = useCallback((key) => {
    if (key === 'backspace') {
      setNoteContent(prev => {
        const textarea = document.querySelector('#note-content')
        if (textarea) {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd
          
          if (start === end && start > 0) {
            return prev.substring(0, start - 1) + prev.substring(end)
          } else if (start !== end) {
            return prev.substring(0, start) + prev.substring(end)
          }
        }
        return prev
      })
    }
  }, [])

  const handleKeyboardText = useCallback((text) => {
    setNoteContent(prev => {
      const textarea = document.querySelector('#note-content')
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const before = prev.substring(0, start)
        const after = prev.substring(end)
        
        // Process Korean input for syllable composition
        const processedText = processKoreanInput(text)
        const newContent = before + processedText + after
        
        // Update cursor position after React re-renders
        setTimeout(() => {
          const newPosition = start + processedText.length
          textarea.setSelectionRange(newPosition, newPosition)
          textarea.focus()
        }, 0)
        
        return newContent
      }
      return prev + text
    })
  }, [])

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
          {new Date(note.updatedAt).toLocaleDateString()}
        </div>
      </div>
    ))
  }

  return (
    <div className="note-app">
      <div className="app-header">
        <h1 className="app-title">Korean Notes</h1>
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
      </div>
      
      <div className="app-content">
        <div className="notes-sidebar">
          <div className="notes-list">
            {renderNotesList()}
          </div>
        </div>
        
        <div className="note-editor-container">
          <div className="note-editor-header">
            <input 
              type="text" 
              className="input note-title" 
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Untitled Note" 
            />
            <div className="note-actions">
              <button className="button button--secondary" onClick={saveCurrentNote}>
                Save
              </button>
              <button className="button button--secondary" onClick={deleteCurrentNote}>
                Delete
              </button>
            </div>
          </div>
          
          <div className="note-editor">
            <textarea 
              className="note-textarea korean-text" 
              id="note-content"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Start typing your note here..."
              rows="10"
            />
          </div>
        </div>
      </div>
      
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
