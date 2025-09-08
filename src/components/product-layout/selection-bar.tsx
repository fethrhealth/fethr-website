'use client'

import React from 'react'
import { ToolbarDivider } from '../product-ui'

interface SelectionAction {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'primary' | 'danger'
  disabled?: boolean
}

interface SelectionBarProps {
  selectedCount: number
  visible: boolean
  actions?: SelectionAction[]
  onClearSelection?: () => void
  className?: string
}

export const SelectionBar: React.FC<SelectionBarProps> = ({
  selectedCount,
  visible,
  actions = [],
  onClearSelection,
  className
}) => {
  const getActionButtonClass = (variant: SelectionAction['variant'] = 'default') => {
    const baseClass = 'flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors'
    
    switch (variant) {
      case 'primary':
        return `${baseClass} bg-blue-600 text-white hover:bg-blue-700`
      case 'danger':
        return `${baseClass} bg-red-600 text-white hover:bg-red-700`
      default:
        return `${baseClass} text-gray-700 hover:bg-gray-100`
    }
  }

  if (!visible || selectedCount === 0) {
    return null
  }

  return (
    <div className={`flex justify-center py-4 bg-white border-t border-gray-200 ${className}`}>
      <div className={`transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-4 min-w-max">
          {/* Selection count */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <span className="font-medium">{selectedCount}</span>
              <span>selected</span>
            </button>
            
            {onClearSelection && (
              <button 
                onClick={onClearSelection}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z" />
                </svg>
              </button>
            )}
          </div>

          <ToolbarDivider />

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <React.Fragment key={action.id}>
                <button
                  className={getActionButtonClass(action.variant)}
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  {action.icon}
                  {action.label}
                </button>
                
                {/* Add divider between action groups if specified */}
                {index < actions.length - 1 && action.variant !== actions[index + 1]?.variant && (
                  <ToolbarDivider />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}