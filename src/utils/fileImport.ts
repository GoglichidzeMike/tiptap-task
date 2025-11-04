/**
 * Supported file types for import
 */
export const SUPPORTED_FILE_TYPES = {
  TEXT: ['text/plain', '.txt'] as const,
  DOC: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.doc',
    '.docx',
  ] as const,
}

/**
 * Get accepted file types string for input element
 */
export const getAcceptedFileTypes = (): string => {
  return [...SUPPORTED_FILE_TYPES.TEXT, ...SUPPORTED_FILE_TYPES.DOC].join(',')
}

/**
 * Validates if a file type is supported
 */
export const isFileTypeSupported = (file: File): boolean => {
  const fileType = file.type
  const fileName = file.name.toLowerCase()

  // Check MIME type
  const textTypes = SUPPORTED_FILE_TYPES.TEXT as readonly string[]
  const docTypes = SUPPORTED_FILE_TYPES.DOC as readonly string[]

  if (textTypes.includes(fileType) || docTypes.includes(fileType)) {
    return true
  }

  // Check file extension
  return (
    fileName.endsWith('.txt') ||
    fileName.endsWith('.doc') ||
    fileName.endsWith('.docx')
  )
}

/**
 * Reads a text file and returns its content
 */
export const readTextFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = event => {
      const text = event.target?.result as string
      resolve(text)
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}

/**
 * Reads a DOC/DOCX file and returns its text content
 * Note: For .doc/.docx files, this is a simplified approach
 * A production app would use a library like mammoth.js
 */
export const readDocFile = async (file: File): Promise<string> => {
  // For now, we'll attempt to read as text
  // In production, you'd want to use mammoth.js or similar
  try {
    const text = await readTextFile(file)
    return text
  } catch (error) {
    throw new Error(
      'DOC/DOCX files require additional processing. Please convert to .txt or use a specialized library.'
    )
  }
}

/**
 * Main function to import a file and return its content
 */
export const importFile = async (file: File): Promise<string> => {
  if (!isFileTypeSupported(file)) {
    throw new Error(
      `Unsupported file type: ${file.type || 'unknown'}. Please upload .txt, .doc, or .docx files.`
    )
  }

  // Check file size (limit to 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit')
  }

  const fileName = file.name.toLowerCase()

  if (fileName.endsWith('.txt')) {
    return await readTextFile(file)
  } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
    return await readDocFile(file)
  } else {
    // Fallback to text reading
    return await readTextFile(file)
  }
}

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
