import React, { useMemo } from 'react'
import { DragHandle as DragHandleReact } from '@tiptap/extension-drag-handle-react'
import { GripVertical } from 'lucide-react'
import type { Editor } from '@tiptap/react'

interface DragHandleComponentProps {
  editor: Editor
}

const DragHandleComponent: React.FC<DragHandleComponentProps> = ({
  editor,
}) => {
  // Memoize tippyOptions to prevent re-initialization
  const tippyOptions = useMemo(
    () => ({
      placement: 'left' as const,
      zIndex: 50,
    }),
    []
  )

  return (
    <DragHandleReact editor={editor} tippyOptions={tippyOptions}>
      <GripVertical size={16} className="text-gray-600" />
    </DragHandleReact>
  )
}

export default DragHandleComponent
