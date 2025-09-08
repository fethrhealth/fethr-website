'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  size?: 'sm' | 'md'
  disabled?: boolean
  className?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  size = 'md',
  disabled = false,
  className
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-[26px] text-xs px-2.5 py-1'
      case 'md':
        return 'h-8 text-sm px-3 py-2'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.currentTarget.value)
    }
  }

  return (
    <div className={cn('relative flex items-center', className)}>
      <svg 
        className="absolute left-2 text-gray-400 pointer-events-none"
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'flex items-center gap-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors pl-8',
          getSizeClasses(),
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      />
    </div>
  )
}