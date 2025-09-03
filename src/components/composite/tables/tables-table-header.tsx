'use client'

import React from 'react'

export function TablesTableHeader() {
  const columns = [
    {
      key: 'id',
      label: 'id',
      type: 'uuid',
      isPrimaryKey: true
    },
    {
      key: 'standardRace',
      label: 'standard race',
      type: 'text',
      isPrimaryKey: false
    },
    {
      key: 'cerner',
      label: 'Cerner',
      type: 'text',
      isPrimaryKey: false
    },
    {
      key: 'epic',
      label: 'Epic',
      type: 'text',
      isPrimaryKey: false
    },
    {
      key: 'eclinicalworks',
      label: 'eClinicalWorks',
      type: 'text',
      isPrimaryKey: false
    },
    {
      key: 'athena',
      label: 'Athena',
      type: 'text',
      isPrimaryKey: false
    }
  ]

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="flex" style={{ height: '35px' }}>
        {/* Checkbox column */}
        <div className="w-[65px] flex items-center justify-center border-r border-gray-200">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        
        {columns.map((column, index) => (
          <div 
            key={column.key}
            className={`flex items-center justify-between px-4 py-2 border-r border-gray-200 ${
              index === columns.length - 1 ? 'border-r-0' : ''
            } bg-gray-50 flex-1`}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {column.isPrimaryKey && (
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
                  className="text-green-600 shrink-0"
                >
                  <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path>
                  <path d="m21 2-9.6 9.6"></path>
                  <circle cx="7.5" cy="15.5" r="5.5"></circle>
                </svg>
              )}
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-xs text-gray-900 uppercase tracking-wider truncate">
                  {column.label}
                </span>
                <span className="text-gray-500 font-normal text-xs normal-case">
                  {column.type}
                </span>
              </div>
            </div>
            <button className="opacity-50 flex items-center justify-center p-1 hover:bg-gray-200 rounded transition-colors shrink-0">
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
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}