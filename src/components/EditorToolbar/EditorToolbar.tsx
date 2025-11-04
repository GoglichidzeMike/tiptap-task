import React, { useState } from 'react'
import type { Editor } from '@tiptap/react'
import { Undo, Redo, Pin, MoreVertical, Minimize2, PinOff } from 'lucide-react'
import ToolbarButton from './components/ToolbarButton'

interface EditorToolbarProps {
  editor: Editor | null
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  const [pinned, setPinned] = useState(false)
  if (!editor) {
    return null
  }

  const Divider = () => <div className="w-px h-6 bg-gray-300 mx-1" />

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (⌘Z)"
        >
          <Undo size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (⌘⇧Z)"
        >
          <Redo size={18} />
        </ToolbarButton>

        <Divider />

        <p className="px-2 py-1 text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none focus:bg-gray-50 rounded-md min-w-[150px] max-w-[300px]">
          Untitled Doc
        </p>
      </div>

      <div className="flex items-center gap-1">
        <ToolbarButton onClick={() => setPinned(!pinned)} title="Pin document">
          {pinned ? <Pin size={18} /> : <PinOff size={18} />}
        </ToolbarButton>
        <ToolbarButton onClick={() => {}} title="More options">
          <MoreVertical size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => {}} title="Minimize">
          <Minimize2 size={18} />
        </ToolbarButton>
      </div>
    </div>
  )
}

export default EditorToolbar
