import React from 'react'

interface ToolbarButtonProps {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  title: string
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  disabled = false,
  children,
  title,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      p-2 rounded-md transition-colors
      hover:bg-gray-100
      disabled:opacity-30 disabled:cursor-not-allowed
      text-gray-600
    `}
  >
    {children}
  </button>
)

export default ToolbarButton
