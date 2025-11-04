import type { Editor } from '@tiptap/react'
import {
  AIStarIcon,
  BellIcon,
  DownloadIcon,
  LupeIcon,
  TodoListIcon,
} from '../../assets/icons'
import InitialEditorContentSection from './components/InitialEditorContentSection'
import InitialEditorContentItem from './components/InitialEditorContentItem'
import { TemplateDialog } from '../TemplateDialog'
import { useState } from 'react'

interface InitialEditorContentProps {
  editor: Editor
  onActionTaken: () => void
}

const InitialEditorContent = ({
  editor,
  onActionTaken,
}: InitialEditorContentProps) => {
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false)

  const handleAskAI = () => {
    alert('Ask AI - Coming soon!')
  }

  const handleResearch = () => {
    alert('Make Research - Coming soon!')
  }

  const handleCreateTodoList = () => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'taskList',
        content: [
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Task 1' }],
              },
            ],
          },
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Task 2' }],
              },
            ],
          },
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Task 3' }],
              },
            ],
          },
        ],
      })
      .run()

    onActionTaken()
  }

  const handleTemplates = () => {
    setShowTemplatesDialog(true)
  }

  const handleSelectTemplate = (templateContent: any) => {
    editor.chain().focus().setContent(templateContent).run()
    setShowTemplatesDialog(false)
    onActionTaken()
  }

  const handleImport = () => {
    alert('File Import - Coming soon!')
  }

  return (
    <div className="absolute inset-0 z-10 flex items-start justify-center pt-16 bg-background pointer-events-none">
      <div className="w-full max-w-md px-6 pointer-events-auto">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-primary mb-2">
            Untitled doc
          </h1>
          <input
            className="text-sm text-secondary/40 focus:outline-none"
            placeholder="Write, or '/' for commands"
          />
        </div>

        <InitialEditorContentSection title="AI Prompts & Shortcuts">
          <InitialEditorContentItem
            icon={<AIStarIcon size={24} />}
            title="Ask AI"
            onClick={handleAskAI}
          />
          <InitialEditorContentItem
            icon={<LupeIcon size={24} />}
            title="Make Research"
            onClick={handleResearch}
          />
          <InitialEditorContentItem
            icon={<TodoListIcon size={24} />}
            title="Create To-Do List"
            onClick={handleCreateTodoList}
          />
        </InitialEditorContentSection>

        <InitialEditorContentSection title="Other Options">
          <InitialEditorContentItem
            icon={<BellIcon size={24} />}
            title="Templates"
            onClick={handleTemplates}
          />
          <InitialEditorContentItem
            icon={<DownloadIcon size={24} />}
            title="Import"
            onClick={handleImport}
          />
        </InitialEditorContentSection>
      </div>

      <TemplateDialog
        open={showTemplatesDialog}
        onOpenChange={setShowTemplatesDialog}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  )
}

export default InitialEditorContent
