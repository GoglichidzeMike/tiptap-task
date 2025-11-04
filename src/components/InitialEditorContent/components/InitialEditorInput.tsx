import React, { useState, useMemo } from 'react'
import type { Editor } from '@tiptap/react'
import { filterCommands } from '../../../utils/slashCommands'
import SlashMenuItem from '../../SlashMenu/components/SlashMenuItem'

interface InitialEditorInputProps {
  editor: Editor
  onStartTyping: () => void
}

const InitialEditorInput: React.FC<InitialEditorInputProps> = ({
  editor,
  onStartTyping,
}) => {
  const [showLocalSlashMenu, setShowLocalSlashMenu] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = useMemo(
    () => filterCommands(inputValue.slice(1)),
    [inputValue]
  )

  const handleSlashCommand = (command: any) => {
    // Execute the command on the editor
    command.command(editor)
    // Close welcome screen
    onStartTyping()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setSelectedIndex(0) // Reset selection when query changes

    // Check if user typed /
    if (value === '/') {
      setShowLocalSlashMenu(true)
    } else if (value.startsWith('/')) {
      // Keep menu open while typing query
      setShowLocalSlashMenu(true)
    } else {
      setShowLocalSlashMenu(false)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle slash menu navigation
    if (showLocalSlashMenu) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(
          (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
        )
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          handleSlashCommand(filteredCommands[selectedIndex])
          setShowLocalSlashMenu(false)
          setInputValue('')
        }
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        setShowLocalSlashMenu(false)
        setInputValue('')
        return
      }
    }

    // If user types any regular character (not /), transfer to editor
    if (e.key.length === 1 && e.key !== '/' && !showLocalSlashMenu) {
      onStartTyping()
      editor.commands.focus()
      editor.commands.insertContent(e.key)
      e.preventDefault()
    }
  }

  return (
    <div className="relative">
      <input
        className="text-sm text-secondary/40 focus:outline-none w-full"
        placeholder="Write, or '/' for commands"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        autoFocus
      />

      {/* Local Slash Menu */}
      {showLocalSlashMenu && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[320px] max-w-[400px] max-h-[400px] overflow-y-auto z-50">
          <div className="px-2 space-y-1">
            {filteredCommands.map((command, index) => (
              <SlashMenuItem
                key={command.id}
                title={command.title}
                description={command.description}
                icon={command.icon}
                isSelected={index === selectedIndex}
                onClick={() => {
                  handleSlashCommand(command)
                  setShowLocalSlashMenu(false)
                  setInputValue('')
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default InitialEditorInput

