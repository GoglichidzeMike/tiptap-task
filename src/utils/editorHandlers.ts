import type { Editor as TiptapEditor } from '@tiptap/react'
import {
  shouldTriggerSlashMenu,
  calculateSlashMenuPosition,
  isSlashMenuNavigationKey,
} from './editorHelpers'

interface SlashMenuState {
  showSlashMenu: boolean
  slashQuery: string
  setShowSlashMenu: (show: boolean) => void
  setSlashQuery: (query: string) => void
  setSlashMenuPosition: (position: { top: number; left: number }) => void
}

/**
 * Creates the keydown handler for the editor
 */
export const createKeyDownHandler = (slashState: SlashMenuState) => {
  return (view: any, event: KeyboardEvent) => {
    const { showSlashMenu, slashQuery, setShowSlashMenu, setSlashQuery, setSlashMenuPosition } =
      slashState

    // Handle slash command trigger
    if (event.key === '/' && view.state.selection.empty) {
      const { from } = view.state.selection
      const $from = view.state.doc.resolve(from)
      const textBefore = $from.parent.textContent

      if (shouldTriggerSlashMenu(textBefore)) {
        setTimeout(() => {
          const { from: newFrom } = view.state.selection
          const coords = view.coordsAtPos(newFrom)
          setSlashMenuPosition(calculateSlashMenuPosition(coords))
          setShowSlashMenu(true)
          setSlashQuery('')
        }, 0)
      }
    }

    // Handle slash menu navigation
    if (showSlashMenu) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        return true
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        return true
      }

      if (event.key === 'Escape') {
        setShowSlashMenu(false)
        setSlashQuery('')
        return true
      }

      if (event.key === 'Backspace' && slashQuery === '') {
        setShowSlashMenu(false)
        return false
      }
    }

    return false
  }
}

/**
 * Creates the update handler for the editor
 */
export const createUpdateHandler = (
  slashState: SlashMenuState,
  showWelcome: boolean,
  setShowWelcome: (show: boolean) => void,
  onLog: (html: string, text: string, json: any) => void
) => {
  return ({ editor }: { editor: TiptapEditor }) => {
    if (!editor.isEmpty && showWelcome) {
      setShowWelcome(false)
    }

    // Track slash command query
    if (slashState.showSlashMenu) {
      const { from } = editor.state.selection
      const textBefore = editor.state.doc.textBetween(
        Math.max(0, from - 50),
        from,
        '\n'
      )

      const slashMatch = textBefore.match(/\/(\w*)$/)
      if (slashMatch) {
        slashState.setSlashQuery(slashMatch[1])
      } else {
        slashState.setShowSlashMenu(false)
        slashState.setSlashQuery('')
      }
    }

    onLog(editor.getHTML(), editor.getText(), editor.getJSON())
  }
}

/**
 * Creates the create handler for the editor
 */
export const createCreateHandler = (setShowWelcome: (show: boolean) => void) => {
  return ({ editor }: { editor: TiptapEditor }) => {
    if (editor.isEmpty) {
      setShowWelcome(true)
    }
    // Clear initial history to avoid double undo on first action
    editor.commands.clearContent()
  }
}

