'use client'

import React, { useState, useRef } from 'react'

export function MonitorFilters() {
  const [appliedFilters] = useState([
    {
      type: 'status',
      values: ['stopped'],
      operator: 'is'
    }
  ])

  const renderStatusIcon = (status: string, size: number = 12) => {
    const color = status === 'stopped' ? '#ef4444' : '#10b981'
    return <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
  }

  const getFilterDisplayName = (filter: any): string => {
    if (filter.type === 'status' && filter.values[0] === 'stopped') {
      return 'Stopped'
    }
    return filter.values[0]
  }

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2 p-3">
        {/* Filter button */}
        <button className="flex items-center gap-2 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors h-[26px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
          </svg>
          <span>Filter</span>
        </button>

        {/* Sort dropdown */}
        <button className="flex items-center gap-2 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors h-[26px]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="8" x2="21" y1="6" y2="6"></line>
            <line x1="8" x2="21" y1="12" y2="12"></line>
            <line x1="8" x2="21" y1="18" y2="18"></line>
            <line x1="3" x2="3.01" y1="6" y2="6"></line>
            <line x1="3" x2="3.01" y1="12" y2="12"></line>
            <line x1="3" x2="3.01" y1="18" y2="18"></line>
          </svg>
          <span>Sort</span>
        </button>

        {/* Divider */}
        <div className="h-[20px] w-px border-r border-gray-200"></div>

        {/* Refresh Button (replacing Insert) */}
        <button className="flex items-center gap-2 px-2.5 py-1 text-xs bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors h-[26px]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>Refresh</span>
        </button>

        {/* Divider */}
        <div className="h-[20px] w-px border-r border-gray-200"></div>

        {/* Active filters - showing stopped status */}
        {appliedFilters.map((filter, index) => (
          <div key={index} className="flex items-center bg-white border border-gray-200 rounded text-xs overflow-hidden">
            {/* Filter type section */}
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 border-r border-gray-200">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="w-4 h-4 text-gray-600">
                <path d="M13.9408 7.91426L11.9576 7.65557C11.9855 7.4419 12 7.22314 12 7C12 6.77686 11.9855 6.5581 11.9576 6.34443L13.9408 6.08573C13.9799 6.38496 14 6.69013 14 7C14 7.30987 13.9799 7.61504 13.9408 7.91426ZM13.4688 4.32049C13.2328 3.7514 12.9239 3.22019 12.5538 2.73851L10.968 3.95716C11.2328 4.30185 11.4533 4.68119 11.6214 5.08659L13.4688 4.32049ZM11.2615 1.4462L10.0428 3.03204C9.69815 2.76716 9.31881 2.54673 8.91341 2.37862L9.67951 0.531163C10.2486 0.767153 10.7798 1.07605 11.2615 1.4462ZM7.91426 0.0591659L7.65557 2.04237C7.4419 2.01449 7.22314 2 7 2C6.77686 2 6.5581 2.01449 6.34443 2.04237L6.08574 0.059166C6.38496 0.0201343 6.69013 0 7 0C7.30987 0 7.61504 0.0201343 7.91426 0.0591659ZM4.32049 0.531164L5.08659 2.37862C4.68119 2.54673 4.30185 2.76716 3.95716 3.03204L2.73851 1.4462C3.22019 1.07605 3.7514 0.767153 4.32049 0.531164ZM1.4462 2.73851L3.03204 3.95716C2.76716 4.30185 2.54673 4.68119 2.37862 5.08659L0.531164 4.32049C0.767153 3.7514 1.07605 3.22019 1.4462 2.73851ZM0.0591659 6.08574C0.0201343 6.38496 0 6.69013 0 7C0 7.30987 0.0201343 7.61504 0.059166 7.91426L2.04237 7.65557C2.01449 7.4419 2 7.22314 2 7C2 6.77686 2.01449 6.5581 2.04237 6.34443L0.0591659 6.08574ZM0.531164 9.67951L2.37862 8.91341C2.54673 9.31881 2.76716 9.69815 3.03204 10.0428L1.4462 11.2615C1.07605 10.7798 0.767153 10.2486 0.531164 9.67951ZM2.73851 12.5538L3.95716 10.968C4.30185 11.2328 4.68119 11.4533 5.08659 11.6214L4.32049 13.4688C3.7514 13.2328 3.22019 12.9239 2.73851 12.5538ZM6.08574 13.9408L6.34443 11.9576C6.5581 11.9855 6.77686 12 7 12C7.22314 12 7.4419 11.9855 7.65557 11.9576L7.91427 13.9408C7.61504 13.9799 7.30987 14 7 14C6.69013 14 6.38496 13.9799 6.08574 13.9408ZM9.67951 13.4688L8.91341 11.6214C9.31881 11.4533 9.69815 11.2328 10.0428 10.968L11.2615 12.5538C10.7798 12.9239 10.2486 13.2328 9.67951 13.4688ZM12.5538 11.2615L10.968 10.0428C11.2328 9.69815 11.4533 9.31881 11.6214 8.91341L13.4688 9.67951C13.2328 10.2486 12.924 10.7798 12.5538 11.2615Z" />
              </svg>
              <span className="text-gray-700 capitalize">{filter.type}</span>
            </div>
            
            {/* Operator section */}
            <div className="px-2 py-1 text-gray-600 border-r border-gray-200 text-xs">
              {filter.operator || 'is'}
            </div>

            {/* Value section */}
            <div className="px-2 py-1 text-gray-600 text-xs flex items-center gap-1 flex-1">
              <div className="flex items-center gap-1">
                {renderStatusIcon(filter.values[0], 12)}
                <span>{getFilterDisplayName(filter)}</span>
              </div>
            </div>

            {/* Remove button */}
            <button className="px-2 py-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 border-l border-gray-200">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z" />
              </svg>
            </button>
          </div>
        ))}

        {/* Clear All button */}
        <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors">
          <span>Clear All</span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z" />
          </svg>
        </button>

        {/* Spacer to push search to the right */}
        <div className="flex-1"></div>

        {/* Search Connectors button */}
        <button className="flex items-center gap-2 px-2.5 py-1 text-xs bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors h-[26px]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <span>Search Connectors</span>
        </button>
      </div>
    </div>
  )
}