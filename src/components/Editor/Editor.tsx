import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import { useDebouncedCallback } from '../../hooks/useDebounce'
import { useState, useEffect } from 'react'
import { InitialEditorContent } from '../InitialEditorContent'

const Editor = () => {
  const [showWelcome, setShowWelcome] = useState(true)

  const debouncedLog = useDebouncedCallback((html: string, text: string) => {
    console.log('HTML:', html)
    console.log('Text:', text)
  }, 400)

  const editor = useEditor({
    extensions: [
      StarterKit,
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
    },
    onUpdate: ({ editor }) => {
      // Hide welcome when user starts typing
      if (!editor.isEmpty && showWelcome) {
        setShowWelcome(false)
      }

      // Debounced logging
      debouncedLog(editor.getHTML(), editor.getText())
    },
    onCreate: ({ editor }) => {
      // Show welcome if editor is empty on creation
      if (editor.isEmpty) {
        setShowWelcome(true)
      }
    },
    content: '',
  })

  // Watch for editor becoming empty again
  useEffect(() => {
    if (editor && editor.isEmpty) {
      setShowWelcome(true)
    }
  }, [editor?.state.doc.content.size])

  return (
    <div className="relative w-full h-full bg-white rounded-lg border border-gray-200">
      {showWelcome && editor && (
        <InitialEditorContent
          editor={editor}
          onActionTaken={() => setShowWelcome(false)}
        />
      )}

      {/* Main Editor Content */}
      <EditorContent editor={editor} className="h-full" />
    </div>
  )
}

export default Editor
