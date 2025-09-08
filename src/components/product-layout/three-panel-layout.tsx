'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ThreePanelLayoutProps {
  leftPanel?: React.ReactNode
  leftPanelVisible?: boolean
  leftPanelWidth?: string
  children: React.ReactNode
  rightPanel?: React.ReactNode
  rightPanelVisible?: boolean
  rightPanelWidth?: string
  rightPanelExiting?: boolean
  className?: string
}

export const ThreePanelLayout: React.FC<ThreePanelLayoutProps> = ({
  leftPanel,
  leftPanelVisible = true,
  leftPanelWidth = '237px',
  children,
  rightPanel,
  rightPanelVisible = false,
  rightPanelWidth = '300px',
  rightPanelExiting = false,
  className
}) => {
  const getGridTemplate = () => {
    if (!rightPanelVisible) {
      return leftPanelVisible 
        ? `[${leftPanelWidth}_1fr]`
        : '[1fr]'
    }
    
    return leftPanelVisible 
      ? `[${leftPanelWidth}_1fr_${rightPanelWidth}]`
      : `[1fr_${rightPanelWidth}]`
  }

  return (
    <div 
      className={cn('relative grid h-full w-full', className)}
      style={{ gridTemplateColumns: getGridTemplate() }}
    >
      {/* Left Panel */}
      {leftPanelVisible && leftPanel && (
        <div className="shrink-0">
          {leftPanel}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col h-full flex-1 min-w-0">
        {children}
      </div>

      {/* Right Panel */}
      {rightPanel && (
        <div className={cn(
          'relative hidden h-full overflow-hidden lg:flex lg:flex-col border-[#EEEFF1] border-l bg-white-100 transition-all duration-1000 ease-out',
          rightPanelVisible ? 'translate-x-0 opacity-100' : 
          rightPanelExiting ? 'translate-x-full opacity-0' : 
          'translate-x-full opacity-0'
        )}>
          {rightPanel}
        </div>
      )}
    </div>
  )
}