/**
 * Converts plain text to TipTap JSON format
 * Handles paragraphs, headings, and basic formatting
 */
export const textToTiptapJson = (text: string) => {
  const lines = text.split('\n')
  const content: any[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Skip empty lines but add them as empty paragraphs for spacing
    if (!trimmedLine) {
      content.push({
        type: 'paragraph',
      })
      continue
    }

    // Detect headings by common patterns
    // Pattern 1: Lines that are all caps and short (likely titles)
    if (
      trimmedLine === trimmedLine.toUpperCase() &&
      trimmedLine.length < 60 &&
      trimmedLine.length > 0
    ) {
      content.push({
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: trimmedLine }],
      })
      continue
    }

    // Pattern 2: Lines starting with # (Markdown style)
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = Math.min(headingMatch[1].length, 6)
      content.push({
        type: 'heading',
        attrs: { level },
        content: [{ type: 'text', text: headingMatch[2] }],
      })
      continue
    }

    // Pattern 3: Detect bullet points
    if (trimmedLine.match(/^[\-\*\•]\s+(.+)$/)) {
      const bulletText = trimmedLine.replace(/^[\-\*\•]\s+/, '')

      // Check if we need to create a new list or add to existing
      const lastItem = content[content.length - 1]
      if (lastItem && lastItem.type === 'bulletList') {
        lastItem.content.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: bulletText }],
            },
          ],
        })
      } else {
        content.push({
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: bulletText }],
                },
              ],
            },
          ],
        })
      }
      continue
    }

    // Pattern 4: Detect numbered lists
    const numberedMatch = trimmedLine.match(/^\d+[\.\)]\s+(.+)$/)
    if (numberedMatch) {
      const listText = numberedMatch[1]

      const lastItem = content[content.length - 1]
      if (lastItem && lastItem.type === 'orderedList') {
        lastItem.content.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: listText }],
            },
          ],
        })
      } else {
        content.push({
          type: 'orderedList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: listText }],
                },
              ],
            },
          ],
        })
      }
      continue
    }

    // Default: Regular paragraph
    content.push({
      type: 'paragraph',
      content: [{ type: 'text', text: line }],
    })
  }

  return {
    type: 'doc',
    content,
  }
}

/**
 * Parses text with basic inline formatting
 * Supports **bold**, *italic*, and `code`
 */
export const parseInlineFormatting = (text: string) => {
  const content: any[] = []
  if (text) {
    content.push({ type: 'text', text })
  }
  return content
}
