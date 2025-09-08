'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export type PriorityLevel = 'none' | 'low' | 'medium' | 'high' | 'urgent'

interface PriorityIconProps {
  priority: PriorityLevel
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const PriorityIcon: React.FC<PriorityIconProps> = ({
  priority,
  size = 'md',
  className
}) => {
  const getSizes = () => {
    switch (size) {
      case 'sm':
        return { width: 12, height: 12 }
      case 'md':
        return { width: 16, height: 16 }
      case 'lg':
        return { width: 20, height: 20 }
    }
  }

  const { width, height } = getSizes()

  const renderIcon = () => {
    switch (priority) {
      case 'none':
        return (
          <svg width={width} height={height} viewBox="0 0 16 16" fill="currentColor" className={cn('text-gray-400', className)}>
            <rect x="1.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
            <rect x="6.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
            <rect x="11.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9" />
          </svg>
        )
      
      case 'low':
        return (
          <svg width={width} height={height} viewBox="0 0 16 16" fill="currentColor" className={cn('text-gray-500', className)}>
            <rect x="1.5" y="8" width="3" height="6" rx="1" />
            <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity="0.4" />
            <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4" />
          </svg>
        )
      
      case 'medium':
        return (
          <svg width={width} height={height} viewBox="0 0 16 16" fill="currentColor" className={cn('text-yellow-500', className)}>
            <rect x="1.5" y="8" width="3" height="6" rx="1" />
            <rect x="6.5" y="5" width="3" height="9" rx="1" />
            <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4" />
          </svg>
        )
      
      case 'high':
        return (
          <svg width={width} height={height} viewBox="0 0 16 16" fill="currentColor" className={cn('text-orange-500', className)}>
            <rect x="1.5" y="8" width="3" height="6" rx="1" />
            <rect x="6.5" y="5" width="3" height="9" rx="1" />
            <rect x="11.5" y="2" width="3" height="12" rx="1" />
          </svg>
        )
      
      case 'urgent':
        return (
          <svg width={width} height={height} viewBox="0 0 16 16" fill="#ef4444" className={className}>
            <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4L9 4L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" />
          </svg>
        )
      
      default:
        return (
          <div className={cn('rounded bg-gray-300', `w-${width/4} h-${height/4}`, className)} />
        )
    }
  }

  return renderIcon()
}