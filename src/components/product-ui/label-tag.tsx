'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface LabelTag {
  id: string
  name: string
  color: string
}

interface LabelTagProps {
  label: LabelTag
  size?: 'sm' | 'md'
  removable?: boolean
  onRemove?: (labelId: string) => void
  className?: string
}

export const LabelTag: React.FC<LabelTagProps> = ({
  label,
  size = 'sm',
  removable = false,
  onRemove,
  className
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1'
      case 'md':
        return 'text-sm px-3 py-1.5'
    }
  }

  const getDotSize = () => {
    switch (size) {
      case 'sm':
        return 'w-2 h-2'
      case 'md':
        return 'w-2.5 h-2.5'
    }
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border',
        getSizeClasses(),
        className
      )}
      style={{ 
        backgroundColor: `${label.color}20`, 
        borderColor: `${label.color}40` 
      }}
    >
      <div 
        className={cn('rounded-full', getDotSize())} 
        style={{ backgroundColor: label.color }}
      />
      <span className="text-gray-700">{label.name}</span>
      
      {removable && onRemove && (
        <button
          onClick={() => onRemove(label.id)}
          className="ml-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z" />
          </svg>
        </button>
      )}
    </div>
  )
}

// Multiple labels container component
interface LabelTagGroupProps {
  labels: LabelTag[]
  size?: 'sm' | 'md'
  removable?: boolean
  onRemove?: (labelId: string) => void
  className?: string
}

export const LabelTagGroup: React.FC<LabelTagGroupProps> = ({
  labels,
  size = 'sm',
  removable = false,
  onRemove,
  className
}) => {
  return (
    <div className={cn('flex gap-1 flex-wrap', className)} style={{ minWidth: '200px' }}>
      {labels.map(label => (
        <LabelTag
          key={label.id}
          label={label}
          size={size}
          removable={removable}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}