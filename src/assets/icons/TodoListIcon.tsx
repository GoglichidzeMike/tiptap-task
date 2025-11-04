import React from 'react'
import { cn } from '../../lib/utils'

export interface TodoListIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export const TodoListIcon: React.FC<TodoListIconProps> = ({
  size = 24,
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M12.8 4H11.2C8.20021 4 6.70032 4 5.64886 4.76393C5.30928 5.01065 5.01065 5.30928 4.76393 5.64886C4 6.70032 4 8.20021 4 11.2V12.8C4 15.7998 4 17.2997 4.76393 18.3511C5.01065 18.6907 5.30928 18.9893 5.64886 19.2361C6.70032 20 8.20021 20 11.2 20H12.8C15.7998 20 17.2997 20 18.3511 19.2361C18.6907 18.9893 18.9893 18.6907 19.2361 18.3511C20 17.2997 20 15.7998 20 12.8V11.2C20 8.20021 20 6.70032 19.2361 5.64886C18.9893 5.30928 18.6907 5.01065 18.3511 4.76393C17.2997 4 15.7998 4 12.8 4Z"
        fill="#FFDBA1"
      />
      <path
        d="M9 12L11 14L15 10M11.2 20H12.8C15.7998 20 17.2997 20 18.3511 19.2361C18.6907 18.9893 18.9893 18.6907 19.2361 18.3511C20 17.2997 20 15.7998 20 12.8V11.2C20 8.20021 20 6.70032 19.2361 5.64886C18.9893 5.30928 18.6907 5.01065 18.3511 4.76393C17.2997 4 15.7998 4 12.8 4H11.2C8.20021 4 6.70032 4 5.64886 4.76393C5.30928 5.01065 5.01065 5.30928 4.76393 5.64886C4 6.70032 4 8.20021 4 11.2V12.8C4 15.7998 4 17.2997 4.76393 18.3511C5.01065 18.6907 5.30928 18.9893 5.64886 19.2361C6.70032 20 8.20021 20 11.2 20Z"
        stroke="#8F7448"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

TodoListIcon.displayName = 'TodoListIcon'
