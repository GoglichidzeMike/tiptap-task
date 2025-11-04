import React, { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import {
  getAcceptedFileTypes,
  importFile,
  formatFileSize,
} from '../../utils/fileImport'
import { textToTiptapJson } from '../../utils/textToTiptap'

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImportContent: (content: Record<string, unknown>) => void
}

const ImportDialog: React.FC<ImportDialogProps> = ({
  open,
  onOpenChange,
  onImportContent,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      setError('Please select a file')
      return
    }

    setIsImporting(true)
    setError(null)

    try {
      const textContent = await importFile(selectedFile)
      const tiptapContent = textToTiptapJson(textContent)
      onImportContent(tiptapContent)
      onOpenChange(false)
      setSelectedFile(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import file')
    } finally {
      setIsImporting(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onOpenChange(false)
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const file = event.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Document</DialogTitle>
          <DialogDescription>
            Upload a .txt or .doc/.docx file to populate your editor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={getAcceptedFileTypes()}
              onChange={handleFileSelect}
              className="hidden"
            />

            {selectedFile ? (
              <div className="space-y-2">
                <div className="text-lg font-semibold text-gray-700">
                  {selectedFile.name}
                </div>
                <div className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setSelectedFile(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Choose different file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-4xl">📁</div>
                <div className="text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </div>
                <div className="text-sm text-gray-500">
                  .txt, .doc, or .docx (max 5MB)
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isImporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!selectedFile || isImporting}
            >
              {isImporting ? 'Importing...' : 'Import'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImportDialog
