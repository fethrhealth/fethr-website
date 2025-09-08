'use client'

import React, { useState, useEffect } from 'react'

// Mock table data structure
interface TableSchema {
  id: string
  name: string
  type: string
  description: string
  recordCount: number
  lastUpdated: string
  status: 'active' | 'inactive' | 'syncing'
  source: string
}

interface TablesGridProps {
  tablesAnimationPhase?: 'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out'
}

const mockTables: TableSchema[] = [
  {
    id: '1',
    name: 'Patients',
    type: 'Core Entity',
    description: 'Patient demographic and identification data',
    recordCount: 45672,
    lastUpdated: '2024-01-20T10:30:00Z',
    status: 'active',
    source: 'Epic EMR'
  },
  {
    id: '2',
    name: 'Encounters',
    type: 'Transactional',
    description: 'Patient visit and episode records',
    recordCount: 128934,
    lastUpdated: '2024-01-20T10:25:00Z',
    status: 'syncing',
    source: 'Epic EMR'
  },
  {
    id: '3',
    name: 'Lab Results',
    type: 'Clinical Data',
    description: 'Laboratory test results and observations',
    recordCount: 234567,
    lastUpdated: '2024-01-20T10:20:00Z',
    status: 'active',
    source: 'Cerner Lab System'
  },
  {
    id: '4',
    name: 'Medications',
    type: 'Clinical Data',
    description: 'Prescription and medication administration records',
    recordCount: 67890,
    lastUpdated: '2024-01-20T10:15:00Z',
    status: 'inactive',
    source: 'Epic EMR'
  },
  {
    id: '5',
    name: 'Procedures',
    type: 'Clinical Data',
    description: 'Medical procedures and interventions',
    recordCount: 34567,
    lastUpdated: '2024-01-20T10:10:00Z',
    status: 'active',
    source: 'PACS System'
  }
]

export const TablesGrid: React.FC<TablesGridProps> = ({ 
  tablesAnimationPhase = 'content-fading-in' 
}) => {
  const [tables] = useState<TableSchema[]>(mockTables)
  const [showRows, setShowRows] = useState(false)
  const [showCards, setShowCards] = useState(false)

  useEffect(() => {
    if (tablesAnimationPhase === 'content-fading-in') {
      const timer = setTimeout(() => {
        setShowRows(true)
        // Add slight delay before cards appear
        setTimeout(() => setShowCards(true), 200)
      }, 100)
      
      return () => clearTimeout(timer)
    } else if (tablesAnimationPhase === 'hidden') {
      setShowRows(false)
      setShowCards(false)
    }
  }, [tablesAnimationPhase])

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 rounded-full bg-green-500" />
      case 'syncing':
        return (
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        )
      case 'inactive':
        return <div className="w-2 h-2 rounded-full bg-gray-400" />
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-300" />
    }
  }

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const formatTimestamp = (timestamp: string): string => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Stats Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 transition-all duration-500 ${
        showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M3 3v16a2 2 0 0 0 2 2h16" />
              <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Total Tables</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{tables.length}</span>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Active Tables</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {tables.filter(t => t.status === 'active').length}
          </span>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <path d="M12 2v20m8-10H4" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Total Records</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {formatCount(tables.reduce((sum, table) => sum + table.recordCount, 0))}
          </span>
        </div>
      </div>

      {/* Tables Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${
        showRows ? 'opacity-100' : 'opacity-0'
      }`}>
        {tables.map((table, index) => (
          <div
            key={table.id}
            className={`
              bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer
              ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{
              transitionDelay: showCards ? `${index * 100}ms` : '0ms'
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getStatusIndicator(table.status)}
                <h3 className="font-medium text-gray-900">{table.name}</h3>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {table.type}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {table.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Records:</span>
                <span className="font-medium">{formatCount(table.recordCount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Source:</span>
                <span className="font-medium">{table.source}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Updated:</span>
                <span className="font-medium text-xs">
                  {formatTimestamp(table.lastUpdated)}
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                table.status === 'active' 
                  ? 'bg-green-100 text-green-700'
                  : table.status === 'syncing'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {getStatusIndicator(table.status)}
                {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}