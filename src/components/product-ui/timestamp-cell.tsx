'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TimestampCellProps {
  timestamp: string | Date
  format?: 'full' | 'relative' | 'short'
  className?: string
}

export const TimestampCell: React.FC<TimestampCellProps> = ({
  timestamp,
  format = 'full',
  className
}) => {
  const formatTimestamp = (timestamp: string | Date): string => {
    if (!timestamp) return ''
    
    const date = new Date(timestamp)
    
    switch (format) {
      case 'full':
        return date.toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      
      case 'short':
        return date.toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      
      case 'relative':
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)
        
        if (minutes < 1) return 'just now'
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        if (days < 7) return `${days}d ago`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      
      default:
        return date.toLocaleString()
    }
  }

  return (
    <span className={cn('text-sm text-gray-500', className)} style={{ minWidth: '200px' }}>
      {formatTimestamp(timestamp)}
    </span>
  )
}