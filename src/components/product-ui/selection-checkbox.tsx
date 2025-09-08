'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export type SelectionState = 'unselected' | 'selected' | 'indeterminate' | 'hidden'

interface SelectionCheckboxProps {
  state: SelectionState
  onChange?: (checked: boolean) => void
  disabled?: boolean
  animated?: boolean
  className?: string
}

export const SelectionCheckbox: React.FC<SelectionCheckboxProps> = ({
  state,
  onChange,
  disabled = false,
  animated = false,
  className
}) => {
  const getOpacity = () => {
    switch (state) {
      case 'hidden':
        return 'opacity-0'
      case 'unselected':
        return 'opacity-20'
      case 'selected':
        return 'opacity-100'
      case 'indeterminate':
        return 'opacity-40'
      default:
        return 'opacity-20'
    }
  }

  const isChecked = state === 'selected' || state === 'indeterminate'

  return (
    <div className={cn(
      'flex items-center justify-center transition-opacity duration-300',
      getOpacity(),
      animated && 'transition-all duration-300',
      className
    )}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled || state === 'hidden'}
        className={cn(
          'w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500',
          disabled && 'cursor-not-allowed',
          state === 'indeterminate' && 'indeterminate:bg-blue-600'
        )}
      />
    </div>
  )
}