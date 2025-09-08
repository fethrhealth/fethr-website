'use client'

import React from 'react'
import { ProgressBar } from '../product-ui'

interface Tab {
  id: string
  label: string
}

interface TabBarProps {
  tabs: Tab[]
  activeTab: number
  progress?: number
  showProgress?: boolean
  onTabClick: (index: number) => void
  onTabHover?: (index: number) => void
  onTabLeave?: (index: number) => void
  className?: string
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  progress = 0,
  showProgress = false,
  onTabClick,
  onTabHover,
  onTabLeave,
  className
}) => {
  return (
    <div className={`grid w-full grid-cols-2 gap-x-px bg-subtle-stroke lg:grid-cols-4 ${className}`}>
      {tabs.map((tab, index) => (
        <div key={tab.id} className="relative w-full overflow-hidden">
          <button
            onClick={() => onTabClick(index)}
            className={`
              flex h-16 w-full items-center justify-center border-subtle-stroke border-b px-4 
              font-medium text-[15px] leading-5 cursor-pointer transition-colors duration-150 ease-out
              ${activeTab === index 
                ? 'bg-[#FAFAFB]' 
                : 'bg-primary-background'
              }
            `}
            style={{
              color: activeTab === index ? '#232529' : '#1C1D1F'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== index && onTabHover) {
                onTabHover(index)
                e.currentTarget.style.color = '#232529'
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== index && onTabLeave) {
                onTabLeave(index)
                e.currentTarget.style.color = '#1C1D1F'
              }
            }}
          >
            {tab.label}
          </button>
          
          {/* Progress bar */}
          {activeTab === index && showProgress && (
            <div className="absolute bottom-0 left-0 right-0">
              <ProgressBar
                progress={progress}
                height={2}
                color="#1C1D1F"
                backgroundColor="#E4E7EC"
                animated
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}