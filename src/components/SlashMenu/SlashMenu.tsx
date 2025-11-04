import React, { useState, useEffect, useRef, useCallback } from 'react'
import type { Editor } from '@tiptap/react'
import SlashMenuItem from './components/SlashMenuItem'
import {
  slashCommands,
  filterCommands,
  type SlashCommand,
} from '../../utils/slashCommands'

interface SlashMenuProps {
  editor: Editor
  query: string
  position: { top: number; left: number }
  onClose: () => void
}

const SlashMenu: React.FC<SlashMenuProps> = ({
  editor,
  query,
  position,
  onClose,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filteredCommands, setFilteredCommands] =
    useState<SlashCommand[]>(slashCommands)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = filterCommands(query)
    setFilteredCommands(filtered)
    setSelectedIndex(0)
  }, [query])

  const executeCommand = useCallback(
    (command: SlashCommand) => {
      command.command(editor)

      // Insert placeholder text if available
      if (command.placeholder) {
        editor.commands.insertContent(command.placeholder)
        // Select the placeholder text so user can start typing immediately
        const { from } = editor.state.selection
        editor.commands.setTextSelection({
          from: from - command.placeholder.length,
          to: from,
        })
      }

      onClose()
    },
    [editor, onClose]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex(
          prev => (prev - 1 + filteredCommands.length) % filteredCommands.length
        )
      } else if (event.key === 'Enter') {
        event.preventDefault()
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex])
        }
      } else if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filteredCommands, onClose, executeCommand])

  if (filteredCommands.length === 0) {
    return (
      <div
        ref={menuRef}
        className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[320px]"
        style={{ top: position.top, left: position.left }}
      >
        <p className="text-sm text-gray-500">No results found</p>
      </div>
    )
  }

  return (
    <div
      ref={menuRef}
      role="listbox"
      aria-label="Slash command menu"
      className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[320px] max-h-[400px] overflow-y-auto"
      style={{ top: position.top, left: position.left }}
    >
      <div className="px-2 space-y-1">
        {filteredCommands.map((command, index) => (
          <SlashMenuItem
            key={command.id}
            title={command.title}
            description={command.description}
            icon={command.icon}
            isSelected={index === selectedIndex}
            onClick={() => executeCommand(command)}
          />
        ))}
      </div>
    </div>
  )
}

export default SlashMenu
