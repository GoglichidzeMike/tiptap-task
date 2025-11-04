import React from 'react'
import { cn } from '../../lib/utils'

export interface LupeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export const LupeIcon: React.FC<LupeIconProps> = ({
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
        d="M4 11.3837C4 15.4615 7.30538 18.7673 11.3828 18.7673C13.4218 18.7673 15.2679 17.9406 16.6039 16.6039C17.9395 15.2678 18.7655 13.4222 18.7655 11.3837C18.7655 7.30578 15.4602 4 11.3828 4C7.30538 4 4 7.30578 4 11.3837Z"
        fill="#B4D8FF"
      />
      <path
        d="M20 20L16.6039 16.6039M16.6039 16.6039C17.9395 15.2678 18.7655 13.4222 18.7655 11.3837C18.7655 7.30578 15.4602 4 11.3828 4C7.30538 4 4 7.30578 4 11.3837C4 15.4615 7.30538 18.7673 11.3828 18.7673C13.4218 18.7673 15.2679 17.9406 16.6039 16.6039Z"
        stroke="#5E52C6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

LupeIcon.displayName = 'LupeIcon'
