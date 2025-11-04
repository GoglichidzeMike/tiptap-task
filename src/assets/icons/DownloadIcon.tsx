import React from 'react'
import { cn } from '../../lib/utils'

export interface DownloadIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export const DownloadIcon: React.FC<DownloadIconProps> = ({
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
        d="M5 11L5 8C5 6.34314 6.34315 5 8 5L16 5C17.6569 5 19 6.34315 19 8L19 11M12 10L12 19M12 19L15 16M12 19L9 16"
        stroke="#363447"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

DownloadIcon.displayName = 'DownloadIcon'
