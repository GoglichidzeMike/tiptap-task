import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'

/**
 * Returns the configured TipTap extensions
 */
export const getEditorExtensions = () => {
  return [
    StarterKit.configure({
      history: {
        depth: 100,
        newGroupDelay: 300,
      },
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Placeholder.configure({
      placeholder: "Type '/' for commands...",
      emptyEditorClass: 'is-editor-empty',
    }),
  ]
}

/**
 * Returns the editor props configuration
 */
export const getEditorAttributes = () => {
  return {
    class: 'prose prose-sm sm:prose focus:outline-none max-w-none p-8',
  }
}

