'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ToolbarDividerProps {
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export const ToolbarDivider: React.FC<ToolbarDividerProps> = ({
  orientation = 'vertical',
  className
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={cn('w-full h-px bg-gray-200', className)} />
    )
  }

  return (
    <div className={cn('h-[20px] w-px border-r border-gray-200', className)} />
  )
}