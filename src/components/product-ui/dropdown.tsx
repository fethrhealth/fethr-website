'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface DropdownItem {
  id: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  danger?: boolean
}

export interface DropdownSection {
  title?: string
  items: DropdownItem[]
}

interface DropdownProps {
  trigger: React.ReactNode
  items?: DropdownItem[]
  sections?: DropdownSection[]
  width?: number
  align?: 'left' | 'right'
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  sections,
  width = 192,
  align = 'right',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const renderContent = () => {
    if (sections) {
      return sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.title && (
            <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
              {section.title}
            </div>
          )}
          <div className="py-1">
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick?.()
                  setIsOpen(false)
                }}
                disabled={item.disabled}
                className={cn(
                  'w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 transition-colors',
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  item.danger && 'text-red-600 hover:bg-red-50'
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
          {sectionIndex < sections.length - 1 && (
            <div className="border-t border-gray-100" />
          )}
        </div>
      ))
    }

    if (items) {
      return (
        <div className="py-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick?.()
                setIsOpen(false)
              }}
              disabled={item.disabled}
              className={cn(
                'w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 transition-colors',
                item.disabled && 'opacity-50 cursor-not-allowed',
                item.danger && 'text-red-600 hover:bg-red-50'
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )
    }

    return (
      <div className="p-4 text-sm text-gray-500">
        No items available
      </div>
    )
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors"
      >
        {trigger}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div 
            className={cn(
              'absolute top-full mt-1 bg-white border border-gray-200 shadow-lg rounded-lg z-50',
              align === 'right' ? 'right-0' : 'left-0'
            )}
            style={{ width: `${width}px` }}
          >
            {renderContent()}
          </div>
        </>
      )}
    </div>
  )
}