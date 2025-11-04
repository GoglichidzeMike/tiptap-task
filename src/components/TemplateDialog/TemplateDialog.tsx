import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { templates } from '../../templates'

interface TemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectTemplate: (templateContent: any) => void
}

const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  onOpenChange,
  onSelectTemplate,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a pre-made template to quickly start your document
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {templates.map(template => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.content)}
              className="flex flex-col items-start p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TemplateDialog
