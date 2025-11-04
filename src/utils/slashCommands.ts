import { Heading1, Heading2, Heading3, List, ListOrdered, ListTodo, Type, Quote, Code } from 'lucide-react'

export interface SlashCommand {
  id: string
  title: string
  description: string
  icon: any
  command: (editor: any) => void
  aliases?: string[]
}

export const slashCommands: SlashCommand[] = [
  {
    id: 'paragraph',
    title: 'Paragraph',
    description: 'Start writing with plain text',
    icon: Type,
    command: (editor) => {
      editor.chain().focus().setParagraph().run()
    },
    aliases: ['p', 'text'],
  },
  {
    id: 'heading1',
    title: 'Heading 1',
    description: 'Large section heading',
    icon: Heading1,
    command: (editor) => {
      editor.chain().focus().setHeading({ level: 1 }).run()
    },
    aliases: ['h1', 'title'],
  },
  {
    id: 'heading2',
    title: 'Heading 2',
    description: 'Medium section heading',
    icon: Heading2,
    command: (editor) => {
      editor.chain().focus().setHeading({ level: 2 }).run()
    },
    aliases: ['h2', 'subtitle'],
  },
  {
    id: 'heading3',
    title: 'Heading 3',
    description: 'Small section heading',
    icon: Heading3,
    command: (editor) => {
      editor.chain().focus().setHeading({ level: 3 }).run()
    },
    aliases: ['h3'],
  },
  {
    id: 'bulletList',
    title: 'Bullet List',
    description: 'Create a simple bullet list',
    icon: List,
    command: (editor) => {
      editor.chain().focus().toggleBulletList().run()
    },
    aliases: ['ul', 'unordered', 'bullet'],
  },
  {
    id: 'numberedList',
    title: 'Numbered List',
    description: 'Create a numbered list',
    icon: ListOrdered,
    command: (editor) => {
      editor.chain().focus().toggleOrderedList().run()
    },
    aliases: ['ol', 'ordered', '1.'],
  },
  {
    id: 'todoList',
    title: 'To-Do List',
    description: 'Track tasks with a checklist',
    icon: ListTodo,
    command: (editor) => {
      editor.chain().focus().toggleTaskList().run()
    },
    aliases: ['todo', 'task', 'checkbox', 'check'],
  },
  {
    id: 'blockquote',
    title: 'Quote',
    description: 'Capture a quote',
    icon: Quote,
    command: (editor) => {
      editor.chain().focus().toggleBlockquote().run()
    },
    aliases: ['quote', 'blockquote'],
  },
  {
    id: 'codeBlock',
    title: 'Code Block',
    description: 'Display code with syntax highlighting',
    icon: Code,
    command: (editor) => {
      editor.chain().focus().setCodeBlock().run()
    },
    aliases: ['code', 'codeblock', '```'],
  },
]

/**
 * Filters slash commands based on search query
 */
export const filterCommands = (query: string): SlashCommand[] => {
  const searchQuery = query.toLowerCase().trim()
  
  if (!searchQuery) {
    return slashCommands
  }

  return slashCommands.filter((command) => {
    // Search in title
    if (command.title.toLowerCase().includes(searchQuery)) {
      return true
    }
    
    // Search in description
    if (command.description.toLowerCase().includes(searchQuery)) {
      return true
    }
    
    // Search in aliases
    if (command.aliases?.some((alias) => alias.toLowerCase().includes(searchQuery))) {
      return true
    }
    
    return false
  })
}

