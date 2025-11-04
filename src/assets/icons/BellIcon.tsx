import React from 'react'
import { cn } from '../../lib/utils'

export interface UserIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export const BellIcon: React.FC<UserIconProps> = ({
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
        d="M2.5 18C2.5 16.8954 3.39543 16 4.5 16H19.5C20.6046 16 21.5 16.8954 21.5 18C21.5 19.1046 20.6046 20 19.5 20H4.5C3.39543 20 2.5 19.1046 2.5 18Z"
        fill="white"
      />
      <path
        d="M12.9996 5.5C12.9996 6.05228 12.5519 6.5 11.9996 6.5C11.4473 6.5 10.9996 6.05228 10.9996 5.5C10.9996 4.94772 11.4473 4.5 11.9996 4.5C12.5519 4.5 12.9996 4.94772 12.9996 5.5Z"
        fill="white"
      />
      <path
        d="M4.5 16H19.5H20V15C20 10.5817 16.4183 7 12 7C7.58172 7 4 10.5817 4 15V16H4.5Z"
        fill="#292556"
        fillOpacity="0.18"
      />
      <path
        d="M12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM12 7C16.4183 7 20 10.5817 20 15V16H4V15C4 10.5817 7.58172 7 12 7ZM19.5 16H4.5M19.5 16H4.5M19.5 16C20.6046 16 21.5 16.8954 21.5 18C21.5 19.1046 20.6046 20 19.5 20H4.5C3.39543 20 2.5 19.1046 2.5 18C2.5 16.8954 3.39543 16 4.5 16"
        stroke="#363447"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

BellIcon.displayName = 'BellIcon'
