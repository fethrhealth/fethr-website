'use client'

import React from 'react'
import { StatusIndicator, PriorityIcon, SelectionCheckbox, TimestampCell, LabelTagGroup } from '../../product-ui'

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

interface MonitorRowProps {
  interface: MonitorInterface
  index: number
  isSelected: boolean
  showRows: boolean
  showSelection: boolean
  onSelectionChange?: (id: string, selected: boolean) => void
}

export const MonitorRow: React.FC<MonitorRowProps> = ({
  interface: intf,
  index,
  isSelected,
  showRows,
  showSelection,
  onSelectionChange
}) => {
  const getSelectionState = () => {
    if (!showSelection) return showRows ? 'unselected' : 'hidden'
    return isSelected ? 'selected' : 'unselected'
  }

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
      className={rowClass}
      style={{
        animationDelay: showRows ? animationDelay : '0ms',
        transitionDelay: showRows ? animationDelay : '0ms'
      }}
    >
      {/* Selection checkbox */}
      <td className="w-12 px-4 py-3">
        <SelectionCheckbox
          state={getSelectionState()}
          onChange={(checked) => onSelectionChange?.(intf.id, checked)}
          animated
        />
      </td>

      {/* Status */}
      <td className="px-4 py-3 text-sm">
        <StatusIndicator 
          status={intf.status}
          withText
        />
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
      <td className="px-4 py-3">
        <TimestampCell timestamp={intf.lastMessage} />
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
        <PriorityIcon priority={intf.priority} />
      </td>

      {/* Labels */}
      <td className="px-4 py-3 text-sm">
        <LabelTagGroup labels={intf.labels} />
      </td>
    </tr>
  )
}