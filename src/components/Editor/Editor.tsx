import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import { useDebouncedCallback } from '../../hooks/useDebounce'
import { useState, useEffect, useMemo } from 'react'
import { InitialEditorContent } from '../InitialEditorContent'
import { EditorToolbar } from '../EditorToolbar'
import { SlashMenu } from '../SlashMenu'

const Editor = () => {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashQuery, setSlashQuery] = useState('')
  const [slashMenuPosition, setSlashMenuPosition] = useState({
    top: 0,
    left: 0,
  })

  const debouncedLog = useDebouncedCallback((html: string, text: string) => {
    console.log('HTML:', html)
    console.log('Text:', text)
  }, 400)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {
          depth: 100,
          newGroupDelay: 300,
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: "Type '/' for commands...",
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose focus:outline-none max-w-none p-8',
      },
      handleKeyDown: (view, event) => {
        // Handle slash command trigger
        if (event.key === '/' && view.state.selection.empty) {
          console.log('slash pressed')
          const { from } = view.state.selection
          const $from = view.state.doc.resolve(from)

          // Check if we're at the start of a block or if the current node text is empty
          const textBefore = $from.parent.textContent
          console.log('textBefore:', textBefore)
          console.log('parent content size:', $from.parent.content.size)

          // Show menu if block is empty or only has whitespace
          if (textBefore.trim() === '') {
            console.log('showing slash menu')
            // We need to wait a tick for the slash to be inserted and get proper coords
            setTimeout(() => {
              const { from: newFrom } = view.state.selection
              const coords = view.coordsAtPos(newFrom)
              setSlashMenuPosition({
                top: coords.bottom + 8,
                left: coords.left,
              })
              setShowSlashMenu(true)
              setSlashQuery('')
            }, 0)
          }
        }

        // Handle slash menu navigation
        if (showSlashMenu) {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            // Let SlashMenu handle arrow keys
            event.preventDefault()
            return true
          }

          if (event.key === 'Enter') {
            // Let SlashMenu handle Enter
            event.preventDefault()
            return true
          }

          if (event.key === 'Escape') {
            setShowSlashMenu(false)
            setSlashQuery('')
            return true
          }

          if (event.key === 'Backspace' && slashQuery === '') {
            setShowSlashMenu(false)
            return false
          }
        }

        return false
      },
    },
    onUpdate: ({ editor }) => {
      if (!editor.isEmpty && showWelcome) {
        setShowWelcome(false)
      }

      // Track slash command query
      if (showSlashMenu) {
        const { from } = editor.state.selection
        const textBefore = editor.state.doc.textBetween(
          Math.max(0, from - 50),
          from,
          '\n'
        )

        const slashMatch = textBefore.match(/\/(\w*)$/)
        if (slashMatch) {
          setSlashQuery(slashMatch[1])
        } else {
          setShowSlashMenu(false)
          setSlashQuery('')
        }
      }

      debouncedLog(editor.getHTML(), editor.getText())
    },
    onCreate: ({ editor }) => {
      if (editor.isEmpty) {
        setShowWelcome(true)
      }
      // Clear initial history to avoid double undo on first action
      editor.commands.clearContent()
    },
    content: '',
  })

  useEffect(() => {
    if (editor && editor.isEmpty) {
      setShowWelcome(true)
    }
  }, [editor?.state.doc.content.size])

  const documentName = useMemo(() => {
    return editor?.state.doc.content.firstChild?.textContent ?? 'Untitled Doc'
  }, [editor?.state.doc.content.firstChild?.textContent])

  const handleCloseSlashMenu = () => {
    setShowSlashMenu(false)
    setSlashQuery('')

    // Remove the slash character
    if (editor) {
      const { from } = editor.state.selection
      const textBefore = editor.state.doc.textBetween(
        Math.max(0, from - 50),
        from,
        '\n'
      )

      const slashMatch = textBefore.match(/\/(\w*)$/)
      if (slashMatch) {
        const slashPos = from - slashMatch[0].length
        editor.chain().focus().deleteRange({ from: slashPos, to: from }).run()
      }
    }
  }

  return (
    <div className="relative w-full h-full bg-white rounded-lg border border-b-0 border-gray-200">
      {showWelcome && editor && (
        <InitialEditorContent
          editor={editor}
          onActionTaken={() => setShowWelcome(false)}
        />
      )}

      <EditorToolbar editor={editor} documentName={documentName} />
      <EditorContent editor={editor} className="h-full editor-container" />

      {showSlashMenu && editor && (
        <SlashMenu
          editor={editor}
          query={slashQuery}
          position={slashMenuPosition}
          onClose={handleCloseSlashMenu}
        />
      )}
    </div>
  )
}

export default Editor
