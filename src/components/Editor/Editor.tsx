import { useEditor, EditorContent } from '@tiptap/react'
import { useDebouncedCallback } from '../../hooks/useDebounce'
import { useState, useEffect } from 'react'
import { InitialEditorContent } from '../InitialEditorContent'
import { EditorToolbar } from '../EditorToolbar'
import { SlashMenu } from '../SlashMenu'
import {
  getEditorExtensions,
  getEditorAttributes,
} from '../../utils/editorConfig'
import {
  createKeyDownHandler,
  createUpdateHandler,
  createCreateHandler,
} from '../../utils/editorHandlers'
import { removeSlashText } from '../../utils/editorHelpers'

const Editor = () => {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashQuery, setSlashQuery] = useState('')
  const [slashMenuPosition, setSlashMenuPosition] = useState({
    top: 0,
    left: 0,
  })

  const debouncedLog = useDebouncedCallback(
    (html: string, text: string, json: Record<string, unknown>) => {
      console.log('HTML:', html)
      console.log('Text:', text)
      console.log('JSON:', json)
    },
    300
  )

  const editor = useEditor({
    extensions: getEditorExtensions(),
    autofocus: true,
    editorProps: {
      attributes: getEditorAttributes(),
      handleKeyDown: createKeyDownHandler({
        showSlashMenu,
        slashQuery,
        setShowSlashMenu,
        setSlashQuery,
        setSlashMenuPosition,
      }),
    },
    onUpdate: createUpdateHandler(
      {
        showSlashMenu,
        slashQuery,
        setShowSlashMenu,
        setSlashQuery,
        setSlashMenuPosition,
      },
      showWelcome,
      setShowWelcome,
      debouncedLog
    ),
    onCreate: createCreateHandler(setShowWelcome),
    content: '',
  })

  useEffect(() => {
    if (editor && editor.isEmpty) {
      setShowWelcome(true)
    }
  }, [editor, editor?.state.doc.content.size])

  const handleCloseSlashMenu = () => {
    setShowSlashMenu(false)
    setSlashQuery('')

    if (editor) {
      removeSlashText(editor)
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
      <EditorToolbar editor={editor} />
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
