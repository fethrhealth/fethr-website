'use client'

import React, { useState, useEffect } from 'react'

// MonitorHeader component
const MonitorHeader = () => (
  <div className="border-[#EEEFF1] border-b">
    <div className="flex items-center justify-between pt-3 pr-[19px] pb-[11px] pl-4">
      <div className="flex items-center">
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
          className="lucide lucide-monitor"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" ry="2"></rect>
          <line x1="8" x2="16" y1="21" y2="21"></line>
          <line x1="12" x2="12" y1="17" y2="21"></line>
        </svg>
        <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] text-[#75777C] mr-[7px] ml-[6px]">Monitor</span>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border bg-green-100 text-green-600 border-green-200">
          Development
        </div>
        <div className="relative">
          <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-gray-600"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </button>
        </div>
        <div className="relative">
          <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-gray-600"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
        <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors">
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 46 46" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="text-gray-600"
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M23 1.78677L44.2132 23L23 44.2132L1.7868 23L23 1.78677ZM23 0.372559L23.7071 1.07967L44.9203 22.2929L45.6274 23L44.9203 23.7071L23.7071 44.9203L23 45.6274L22.2929 44.9203L1.07969 23.7071L0.372583 23L1.07969 22.2929L22.2929 1.07967L23 0.372559Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            />
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M30 23C30 26.866 26.866 30 23 30C19.134 30 16 26.866 16 23C16 19.134 19.134 16 23 16C26.866 16 30 19.134 30 23ZM31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
)

// MonitorFilters component
const MonitorFilters = () => {
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

interface MonitorInterface {
  id: string
  name: string
  type: string
  status: 'stopped' | 'starting' | 'started'
  application: string
  direction: 'INBOUND' | 'OUTBOUND'
  hostIp: string
  port: number
  priority: 'urgent' | 'high' | 'medium' | 'low' | 'none'
  lastMessage: string
  queuedMessages: number
  labels: Array<{
    id: string
    name: string
    color: string
  }>
}

// Mock data - all interfaces start as stopped
const mockInterfaces: MonitorInterface[] = [
  {
    id: '1',
    name: 'Patient Data Sync',
    type: 'HL7',
    status: 'stopped',
    application: 'Epic EMR',
    direction: 'INBOUND',
    hostIp: '192.168.1.100',
    port: 6661,
    priority: 'high',
    lastMessage: '2024-01-20T10:30:00Z',
    queuedMessages: 0,
    labels: [
      { id: '1', name: 'Production', color: '#10b981' },
      { id: '2', name: 'Critical', color: '#ef4444' }
    ]
  },
  {
    id: '2',
    name: 'Lab Results Feed',
    type: 'FHIR',
    status: 'stopped',
    application: 'Cerner',
    direction: 'OUTBOUND',
    hostIp: '192.168.1.101',
    port: 443,
    priority: 'medium',
    lastMessage: '2024-01-20T09:15:00Z',
    queuedMessages: 0,
    labels: [
      { id: '3', name: 'Development', color: '#3b82f6' }
    ]
  },
  {
    id: '3',
    name: 'Insurance Verification',
    type: 'HTTP',
    status: 'stopped',
    application: 'Custom Portal',
    direction: 'INBOUND',
    hostIp: '192.168.1.102',
    port: 9090,
    priority: 'low',
    lastMessage: '2024-01-20T11:45:00Z',
    queuedMessages: 0,
    labels: []
  },
  {
    id: '4',
    name: 'Radiology Interface',
    type: 'HL7',
    status: 'stopped',
    application: 'PACS System',
    direction: 'INBOUND',
    hostIp: '192.168.1.103',
    port: 6661,
    priority: 'urgent',
    lastMessage: '2024-01-20T12:00:00Z',
    queuedMessages: 0,
    labels: [
      { id: '1', name: 'Production', color: '#10b981' },
      { id: '4', name: 'Radiology', color: '#8b5cf6' }
    ]
  },
  {
    id: '5',
    name: 'Pharmacy Orders',
    type: 'FHIR',
    status: 'stopped',
    application: 'Epic EMR',
    direction: 'OUTBOUND',
    hostIp: '192.168.1.104',
    port: 443,
    priority: 'medium',
    lastMessage: '2024-01-20T08:30:00Z',
    queuedMessages: 0,
    labels: [
      { id: '5', name: 'Pharmacy', color: '#f59e0b' }
    ]
  },
  {
    id: '6',
    name: 'Billing Interface',
    type: 'TCP/IP',
    status: 'stopped',
    application: 'Revenue System',
    direction: 'OUTBOUND',
    hostIp: '192.168.1.105',
    port: 8443,
    priority: 'none',
    lastMessage: '2024-01-19T16:45:00Z',
    queuedMessages: 0,
    labels: [
      { id: '6', name: 'Finance', color: '#14b8a6' }
    ]
  }
]

interface MonitorContentProps {
  monitorAnimationPhase?: 'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out'
}

export default function MonitorContent({ monitorAnimationPhase = 'content-fading-in' }: MonitorContentProps) {
  const [interfaces, setInterfaces] = useState<MonitorInterface[]>(mockInterfaces)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [showRows, setShowRows] = useState(false)
  const [showSelection, setShowSelection] = useState(false)
  const [showSelectionBar, setShowSelectionBar] = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false)
  const [rowsFullyLoaded, setRowsFullyLoaded] = useState(false)

  const logWithTime = (message: string) => {
    const timestamp = new Date().toISOString()
    const perfTime = performance.now().toFixed(1)
    console.log(`[${timestamp}] [${perfTime}ms] ${message}`)
  }

  // Hook 1: When animation phase changes to content-fading-in, start showing rows
  useEffect(() => {
    if (monitorAnimationPhase === 'content-fading-in') {
      logWithTime('🎬 PHASE: content-fading-in - Starting row animation')
      const timer = setTimeout(() => {
        logWithTime('📋 HOOK 1: Setting showRows to true')
        setShowRows(true)
      }, 100)
      
      return () => clearTimeout(timer)
    } else if (monitorAnimationPhase === 'hidden') {
      logWithTime('🔄 PHASE: hidden - Resetting all states')
      setShowRows(false)
      setShowSelection(false)
      setShowSelectionBar(false)
      setButtonPressed(false)
      setSelectedRows(new Set())
      setInterfaces(mockInterfaces)
      setRowsFullyLoaded(false)
    }
  }, [monitorAnimationPhase])

  // Hook 2: When rows are shown, wait for diagonal loading to complete, then mark as fully loaded
  useEffect(() => {
    if (showRows) {
      logWithTime('📋 HOOK 2: Rows showing, waiting for diagonal loading to complete...')
      // Wait for the last row (index 5) with delay 750ms + transition duration 300ms = ~1100ms
      const timer = setTimeout(() => {
        logWithTime('✅ HOOK 2: All rows loaded - setting rowsFullyLoaded to true')
        setRowsFullyLoaded(true)
      }, 1100)
      
      return () => clearTimeout(timer)
    }
  }, [showRows])

  // Hook 3: When rows are fully loaded, immediately select and highlight rows 1 & 2
  useEffect(() => {
    if (rowsFullyLoaded && !showSelection) {
      logWithTime('🎯 HOOK 3: Rows fully loaded - selecting and highlighting rows 1 & 2')
      setShowSelection(true)
      setSelectedRows(new Set(['1', '2']))
      logWithTime('✅ HOOK 3: Rows selected and highlighted')
    }
  }, [rowsFullyLoaded, showSelection])

  // Hook 4: When selection is shown, show the selection bar immediately
  useEffect(() => {
    if (showSelection && selectedRows.size > 0) {
      logWithTime('📊 HOOK 4: Selection visible with selected rows - showing selection bar immediately')
      logWithTime(`📊 HOOK 4: Current state - showSelection: ${showSelection}, selectedRows.size: ${selectedRows.size}, showSelectionBar: ${showSelectionBar}`)
      setShowSelectionBar(true)
      logWithTime('✅ HOOK 4: Selection bar set to visible')
    }
  }, [showSelection, selectedRows.size])

  // Debug hook to track selection bar state
  useEffect(() => {
    logWithTime(`🔍 SELECTION BAR STATE: showSelectionBar=${showSelectionBar}, selectedRows.size=${selectedRows.size}, condition=${showSelectionBar && selectedRows.size > 0}`)
  }, [showSelectionBar, selectedRows.size])

  // Hook 5: When selection bar is shown, automatically "press" the button
  useEffect(() => {
    if (showSelectionBar && !buttonPressed) {
      logWithTime('🔘 HOOK 5: Selection bar visible - auto-pressing button')
      const timer = setTimeout(() => {
        logWithTime('👆 HOOK 5: Button press triggered')
        triggerAutomatedButtonClick()
      }, 500) // Wait a bit for user to see the selection bar
      
      return () => clearTimeout(timer)
    }
  }, [showSelectionBar, buttonPressed])

  // Function to handle starting selected interfaces
  const handleStartAll = () => {
    logWithTime(`🚀 START ALL: Button clicked! Selected rows: [${Array.from(selectedRows).join(', ')}]`)
    setButtonPressed(true)
    
    // Start the selected interfaces
    setInterfaces(current => {
      const updated = current.map(intf => {
        const shouldStart = selectedRows.has(intf.id)
        logWithTime(`🔧 ${intf.name} (id: ${intf.id}): ${shouldStart ? 'STARTING' : 'unchanged'}`)
        return shouldStart 
          ? { ...intf, status: 'starting' as const }
          : intf
      })
      logWithTime(`✅ Interfaces set to starting: [${updated.filter(i => i.status === 'starting').map(i => i.name).join(', ')}]`)
      return updated
    })

    // Change to started status after a brief delay
    setTimeout(() => {
      logWithTime('🎯 FINAL: Setting starting interfaces to started')
      setInterfaces(current => {
        const updated = current.map(intf => 
          intf.status === 'starting'
            ? { ...intf, status: 'started' as const }
            : intf
        )
        logWithTime(`🎉 COMPLETE: Final status: [${updated.map(i => `${i.name}:${i.status}`).join(', ')}]`)
        return updated
      })
    }, 500)
  }

  // Function to simulate the automated button click during animation
  const triggerAutomatedButtonClick = () => {
    logWithTime('🤖 AUTO-CLICK: Triggering automated button press')
    handleStartAll()
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
      second: '2-digit',
      hour12: true,
    })
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'started': return '#10b981'
      case 'stopped': return '#ef4444'
      case 'starting': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status: string) => {
    const color = getStatusColor(status)
    
    if (status === 'starting') {
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin">
          <circle cx="7" cy="7" r="6" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3.14 0" strokeDashoffset="-0.7"></circle>
          <circle className="progress" cx="7" cy="7" r="2" fill="none" stroke={color} strokeWidth="4" strokeDasharray="11.309733552923255 22.61946710584651" strokeDashoffset="5.654866776461628" transform="rotate(-90 7 7)"></circle>
        </svg>
      )
    }
    
    return <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'none':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
            <rect x="6.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
            <rect x="11.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
          </svg>
        )
      case 'urgent':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#ef4444">
            <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4L9 4L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"></path>
          </svg>
        )
      case 'high':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
            <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
            <rect x="11.5" y="2" width="3" height="12" rx="1"></rect>
          </svg>
        )
      case 'medium':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
            <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
            <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4"></rect>
          </svg>
        )
      case 'low':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
            <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity="0.4"></rect>
            <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4"></rect>
          </svg>
        )
      default:
        return <div className="w-3 h-3 rounded bg-gray-300"></div>
    }
  }

  return (
    <>
      {/* Header */}
      <MonitorHeader />
      
      {/* Filters */}
      <MonitorFilters />
      
      {/* Main Table Area */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="h-9">
              <th className="w-12 px-4 py-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Connector Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Queued
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Message
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Labels
              </th>
            </tr>
          </thead>
          <tbody className={`bg-white ${showRows ? 'divide-y divide-gray-200' : ''}`}>
            {interfaces.map((intf, index) => {
              const isSelected = selectedRows.has(intf.id)
              const rowClass = `transition-all duration-300 ${
                isSelected 
                  ? 'bg-blue-50 hover:bg-blue-100' 
                  : 'bg-white hover:bg-gray-50'
              } ${
                showRows ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`
              
              // Diagonal loading animation
              const animationDelay = `${index * 150}ms`

              return (
                <tr
                  key={intf.id}
                  className={rowClass}
                  style={{
                    animationDelay: showRows ? animationDelay : '0ms',
                    transitionDelay: showRows ? animationDelay : '0ms'
                  }}
                >
                  {/* Selection checkbox */}
                  <td className="w-12 px-4 py-3">
                    <div className={`flex items-center justify-center transition-opacity duration-300 ${
                      showSelection ? (isSelected ? 'opacity-100' : 'opacity-40') : 
                      showRows ? 'opacity-20' : 'opacity-0'
                    }`}>
                      <input
                        type="checkbox"
                        checked={isSelected && showSelection}
                        readOnly
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(intf.status)}
                      <span style={{ color: getStatusColor(intf.status) }}>
                        {intf.status.charAt(0).toUpperCase() + intf.status.slice(1)}
                      </span>
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {intf.name}
                  </td>

                  {/* Queued Messages */}
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {intf.queuedMessages}
                  </td>

                  {/* Last Message */}
                  <td className="px-4 py-3 text-sm text-gray-500" style={{ minWidth: '200px' }}>
                    {formatTimestamp(intf.lastMessage)}
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {intf.type}
                  </td>

                  {/* Application */}
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {intf.application}
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-3 text-sm">
                    {getPriorityIcon(intf.priority)}
                  </td>

                  {/* Labels */}
                  <td className="px-4 py-3 text-sm" style={{ minWidth: '200px' }}>
                    <div className="flex gap-1 flex-wrap">
                      {intf.labels.map(label => (
                        <div
                          key={label.id}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border"
                          style={{ backgroundColor: `${label.color}20`, borderColor: `${label.color}40` }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }}></div>
                          <span className="text-gray-700">{label.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Selection Bar - positioned directly after table */}
        {showSelectionBar && (
          <div className="flex justify-center py-4 bg-white border-t border-gray-200">
            <div className={`transition-all duration-300 ${
              showSelectionBar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-4 min-w-max">
                {/* Selection count */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                    <span className="font-medium">{selectedRows.size}</span>
                    <span>selected</span>
                  </button>
                  
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path>
                    </svg>
                  </button>
                </div>

                <div className="h-6 w-px bg-gray-200"></div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    className={`flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-all duration-200 ${
                      buttonPressed ? 'scale-95 bg-gray-200' : ''
                    }`}
                    onClick={handleStartAll}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                    Start All
                  </button>

                  <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                    Stop All
                  </button>

                  <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                      <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                    </svg>
                    Restart All
                  </button>

                  <div className="h-6 w-px bg-gray-200"></div>

                  <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
                      <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
                      <rect x="11.5" y="2" width="3" height="12" rx="1"></rect>
                    </svg>
                    Priority
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3.204 5h9.592L8 10.481 3.204 5z"/>
                    </svg>
                  </button>

                  <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M12 11.5V13H5.132v-1.5H12Zm1.5-1.5V6a1.5 1.5 0 0 0-1.346-1.492L12 4.5H5.133a.5.5 0 0 0-.303.103l-.08.076-2.382 2.834a.5.5 0 0 0-.11.234l-.008.087v.331a.5.5 0 0 0 .118.321l2.382 2.835a.5.5 0 0 0 .383.179V13l-.22-.012a2 2 0 0 1-1.16-.54l-.15-.16L1.218 9.45a2 2 0 0 1-.46-1.11L.75 8.165v-.331a2 2 0 0 1 .363-1.147l.106-.14 2.383-2.834a2 2 0 0 1 1.312-.701L5.134 3H12a3 3 0 0 1 3 3v4a3 3 0 0 1-3.002 3v-1.5c.778 0 1.417-.59 1.494-1.347L13.5 10Z"/>
                      <path d="M5.5 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
                    </svg>
                    Labels
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3.204 5h9.592L8 10.481 3.204 5z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}