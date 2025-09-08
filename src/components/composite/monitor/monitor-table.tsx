'use client'

import React, { useState, useEffect } from 'react'
import { MonitorRow } from './monitor-row'
import { SelectionCheckbox } from '../../product-ui'

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

interface MonitorTableProps {
  monitorAnimationPhase?: 'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out'
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

export const MonitorTable: React.FC<MonitorTableProps> = ({ 
  monitorAnimationPhase = 'content-fading-in' 
}) => {
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
      setShowSelectionBar(true)
      logWithTime('✅ HOOK 4: Selection bar set to visible')
    }
  }, [showSelection, selectedRows.size])

  // Hook 5: When selection bar is shown, automatically "press" the button
  useEffect(() => {
    if (showSelectionBar && !buttonPressed) {
      logWithTime('🔘 HOOK 5: Selection bar visible - auto-pressing button')
      const timer = setTimeout(() => {
        logWithTime('👆 HOOK 5: Button press triggered')
        triggerAutomatedButtonClick()
      }, 500)
      
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

  return (
    <div className="flex-1 overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr className="h-9">
            <th className="w-12 px-4 py-2">
              <SelectionCheckbox
                state="unselected"
                onChange={() => {}}
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
          {interfaces.map((intf, index) => (
            <MonitorRow
              key={intf.id}
              interface={intf}
              index={index}
              isSelected={selectedRows.has(intf.id)}
              showRows={showRows}
              showSelection={showSelection}
            />
          ))}
        </tbody>
      </table>

      {/* Selection Bar */}
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
                    <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z" />
                  </svg>
                </button>
              </div>

              <div className="h-6 w-px bg-gray-200" />

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  className={`flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-all duration-200 ${
                    buttonPressed ? 'scale-95 bg-gray-200' : ''
                  }`}
                  onClick={handleStartAll}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                  Start All
                </button>

                <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  Stop All
                </button>

                <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                  </svg>
                  Restart All
                </button>

                <div className="h-6 w-px bg-gray-200" />

                <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1.5" y="8" width="3" height="6" rx="1" />
                    <rect x="6.5" y="5" width="3" height="9" rx="1" />
                    <rect x="11.5" y="2" width="3" height="12" rx="1" />
                  </svg>
                  Priority
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.204 5h9.592L8 10.481 3.204 5z" />
                  </svg>
                </button>

                <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12 11.5V13H5.132v-1.5H12Zm1.5-1.5V6a1.5 1.5 0 0 0-1.346-1.492L12 4.5H5.133a.5.5 0 0 0-.303.103l-.08.076-2.382 2.834a.5.5 0 0 0-.11.234l-.008.087v.331a.5.5 0 0 0 .118.321l2.382 2.835a.5.5 0 0 0 .383.179V13l-.22-.012a2 2 0 0 1-1.16-.54l-.15-.16L1.218 9.45a2 2 0 0 1-.46-1.11L.75 8.165v-.331a2 2 0 0 1 .363-1.147l.106-.14 2.383-2.834a2 2 0 0 1 1.312-.701L5.134 3H12a3 3 0 0 1 3 3v4a3 3 0 0 1-3.002 3v-1.5c.778 0 1.417-.59 1.494-1.347L13.5 10Z" />
                    <path d="M5.5 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                  </svg>
                  Labels
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.204 5h9.592L8 10.481 3.204 5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}