import type { Editor } from '@tiptap/react'

/**
 * Extracts the slash command query from text
 */
export const extractSlashQuery = (text: string): string | null => {
  const slashMatch = text.match(/\/(\w*)$/)
  return slashMatch ? slashMatch[1] : null
}

/**
 * Gets text before cursor position
 */
export const getTextBeforeCursor = (
  editor: Editor,
  from: number,
  maxLength: number = 50
): string => {
  return editor.state.doc.textBetween(Math.max(0, from - maxLength), from, '\n')
}

/**
 * Checks if slash menu should be triggered
 */
export const shouldTriggerSlashMenu = (textBefore: string): boolean => {
  return textBefore.trim() === ''
}

/**
 * Calculates slash menu position from editor view
 */
export const calculateSlashMenuPosition = (
  coords: { top: number; bottom: number; left: number; right: number },
  offset: number = 8
): { top: number; left: number } => {
  return {
    top: coords.bottom + offset,
    left: coords.left,
  }
}

/**
 * Removes slash command text from editor
 */
export const removeSlashText = (editor: Editor): void => {
  const { from } = editor.state.selection
  const textBefore = getTextBeforeCursor(editor, from)
  const slashMatch = textBefore.match(/\/(\w*)$/)

  if (slashMatch) {
    const slashPos = from - slashMatch[0].length
    editor.chain().focus().deleteRange({ from: slashPos, to: from }).run()
  }
}

/**
 * Checks if key should be handled by slash menu
 */
export const isSlashMenuNavigationKey = (key: string): boolean => {
  return ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(key)
}
