import React from 'react'

interface SlashMenuItemProps {
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  isSelected: boolean
  onClick: () => void
}

const SlashMenuItem: React.FC<SlashMenuItemProps> = ({
  title,
  description,
  icon: Icon,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      role="option"
      aria-selected={isSelected}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 text-left
        transition-colors rounded-md
        ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'}
      `}
    >
      <div
        className={`shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}
        >
          {title}
        </div>
        <div className="text-xs text-gray-500 truncate">{description}</div>
      </div>
    </button>
  )
}

export default SlashMenuItem
