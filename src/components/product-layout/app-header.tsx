'use client'

import React from 'react'
import { EnvironmentBadge, ActionButton, Dropdown } from '../product-ui'
import type { EnvironmentType, DropdownItem } from '../product-ui'

interface Breadcrumb {
  title: string
  icon?: React.ReactNode
}

interface AppHeaderProps {
  title: string
  breadcrumb?: Breadcrumb
  environment?: EnvironmentType
  showHelp?: boolean
  showNotifications?: boolean
  showAI?: boolean
  hasNotifications?: boolean
  helpItems?: DropdownItem[]
  notificationItems?: DropdownItem[]
  onAIClick?: () => void
  className?: string
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  breadcrumb,
  environment = 'development',
  showHelp = true,
  showNotifications = true,
  showAI = true,
  hasNotifications = false,
  helpItems = [
    { id: 'shortcuts', label: 'Keyboard shortcuts' },
    { id: 'support', label: 'Contact support' },
    { id: 'feature', label: 'Feature request' }
  ],
  notificationItems = [
    { id: 'empty', label: 'No new notifications' }
  ],
  onAIClick,
  className
}) => {
  const defaultIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#75777C" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" ry="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  )

  return (
    <div className={`border-[#EEEFF1] border-b ${className}`}>
      <div className="flex items-center justify-between pt-3 pr-[19px] pb-[11px] pl-4">
        {/* Left side - Breadcrumb and Title */}
        <div className="flex items-center">
          {breadcrumb && (
            <>
              {breadcrumb.icon || defaultIcon}
              <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] text-[#75777C] mr-[7px] ml-[6px]">
                {breadcrumb.title}
              </span>
              <svg className="h-[22px] w-4" width="16" height="22" viewBox="0 0 16 24" fill="none">
                <path d="m6.5 16 3-10" stroke="#E6E7EA" strokeLinecap="round" />
              </svg>
            </>
          )}
          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-secondary-foreground">
            {title}
          </span>
        </div>

        {/* Right side - Environment + Actions */}
        <div className="flex items-center gap-x-3">
          <EnvironmentBadge environment={environment} />
          
          {showHelp && (
            <Dropdown
              trigger={<ActionButton variant="help" size="md" />}
              items={helpItems}
              align="right"
              width={192}
            />
          )}
          
          {showNotifications && (
            <Dropdown
              trigger={
                <ActionButton 
                  variant="notifications" 
                  size="md" 
                  hasNotification={hasNotifications}
                />
              }
              items={notificationItems}
              align="right"
              width={320}
            />
          )}
          
          {showAI && (
            <ActionButton 
              variant="ai" 
              size="md" 
              onClick={onAIClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}