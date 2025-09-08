'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number // 0-100
  height?: number
  animated?: boolean
  color?: string
  backgroundColor?: string
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 2,
  animated = true,
  color = '#1C1D1F',
  backgroundColor = '#E4E7EC',
  className
}) => {
  return (
    <div 
      className={cn('w-full overflow-hidden', className)}
      style={{ height: `${height}px`, backgroundColor }}
    >
      <div 
        className={cn(
          'h-full transition-all ease-linear',
          animated ? 'duration-75' : 'duration-0'
        )}
        style={{ 
          width: `${Math.max(0, Math.min(100, progress))}%`,
          backgroundColor: color
        }}
      />
    </div>
  )
}