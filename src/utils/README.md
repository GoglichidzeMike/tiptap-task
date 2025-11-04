# Utils Documentation

This directory contains utility functions and helpers for the TipTap editor application.

## File Import Utilities (`fileImport.ts`)

Handles file upload and validation for importing documents into the editor.

### Functions

#### `getAcceptedFileTypes(): string`
Returns a comma-separated string of accepted file types for HTML input elements.

**Example:**
```typescript
<input type="file" accept={getAcceptedFileTypes()} />
```

#### `isFileTypeSupported(file: File): boolean`
Validates if a file type is supported for import.

**Supported formats:**
- `.txt` (text/plain)
- `.doc` (application/msword)
- `.docx` (application/vnd.openxmlformats-officedocument.wordprocessingml.document)

**Example:**
```typescript
const file = event.target.files[0]
if (!isFileTypeSupported(file)) {
  console.error('Unsupported file type')
}
```

#### `readTextFile(file: File): Promise<string>`
Reads a text file and returns its content as a string.

**Example:**
```typescript
const content = await readTextFile(file)
console.log(content)
```

#### `readDocFile(file: File): Promise<string>`
Reads a DOC/DOCX file and returns its text content.

**Note:** Currently uses basic text reading. For production, consider using [mammoth.js](https://github.com/mwilliamson/mammoth.js) for proper DOC/DOCX parsing.

#### `importFile(file: File): Promise<string>`
Main function to import a file. Automatically detects file type and uses the appropriate reader.

**Features:**
- File type validation
- 5MB file size limit
- Automatic format detection

**Example:**
```typescript
try {
  const content = await importFile(file)
  console.log('File imported:', content)
} catch (error) {
  console.error('Import failed:', error.message)
}
```

#### `formatFileSize(bytes: number): string`
Formats file size in bytes to a human-readable string.

**Example:**
```typescript
formatFileSize(1024)       // "1 KB"
formatFileSize(1048576)    // "1 MB"
formatFileSize(5242880)    // "5 MB"
```

---

## Text to TipTap Converter (`textToTiptap.ts`)

Converts plain text into TipTap JSON format with intelligent parsing.

### Functions

#### `textToTiptapJson(text: string): object`
Converts plain text to TipTap document JSON format.

**Auto-detection features:**
- **Headings:** Detects ALL CAPS lines and Markdown-style `#` headings
- **Bullet lists:** Lines starting with `-`, `*`, or `•`
- **Numbered lists:** Lines starting with `1.`, `2)`, etc.
- **Paragraphs:** Regular text lines
- **Empty lines:** Preserved for spacing

**Example:**
```typescript
const text = `
# Welcome to My Document

This is a paragraph with regular text.

## Features
- Feature one
- Feature two
- Feature three

1. First step
2. Second step
3. Third step
`

const tiptapJson = textToTiptapJson(text)
// Returns TipTap JSON structure
```

**Output structure:**
```json
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [{ "type": "text", "text": "Welcome to My Document" }]
    },
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "This is a paragraph..." }]
    }
    // ... more content
  ]
}
```

#### Heading Detection

1. **ALL CAPS:** Lines that are entirely uppercase (< 60 chars) → H1
2. **Markdown:** `#` (H1), `##` (H2), `###` (H3), etc.

#### List Detection

- **Bullets:** Lines starting with `-`, `*`, or `•`
- **Numbered:** Lines starting with `1.`, `2)`, etc.
- **Nested:** Automatically groups consecutive list items

---

## Usage Example

Complete example of importing a file into the TipTap editor:

```typescript
import { importFile } from '@/utils/fileImport'
import { textToTiptapJson } from '@/utils/textToTiptap'
import { Editor } from '@tiptap/react'

async function handleFileImport(file: File, editor: Editor) {
  try {
    // Step 1: Read the file
    const textContent = await importFile(file)
    
    // Step 2: Convert to TipTap format
    const tiptapContent = textToTiptapJson(textContent)
    
    // Step 3: Set editor content
    editor.chain().focus().setContent(tiptapContent).run()
    
    console.log('File imported successfully!')
  } catch (error) {
    console.error('Import failed:', error.message)
  }
}
```

---

## Future Enhancements

### For DOC/DOCX files:
Consider adding [mammoth.js](https://github.com/mwilliamson/mammoth.js):

```bash
npm install mammoth
```

```typescript
import mammoth from 'mammoth'

export const readDocFile = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value
}
```

### For Markdown files:
Consider adding markdown parsing for better formatting support.

