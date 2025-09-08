'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export type StatusType = 'stopped' | 'starting' | 'started' | 'executing' | 'completed' | 'failed'

interface StatusIndicatorProps {
  status: StatusType
  size?: 'sm' | 'md' | 'lg'
  withText?: boolean
  className?: string
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  withText = false,
  className
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'started':
      case 'completed':
        return {
          color: '#10b981',
          text: status.charAt(0).toUpperCase() + status.slice(1),
          icon: status === 'completed' ? 'check' : 'dot'
        }
      case 'stopped':
      case 'failed':
        return {
          color: '#ef4444',
          text: status.charAt(0).toUpperCase() + status.slice(1),
          icon: 'dot'
        }
      case 'starting':
      case 'executing':
        return {
          color: '#3b82f6',
          text: status.charAt(0).toUpperCase() + status.slice(1),
          icon: 'spinner'
        }
      default:
        return {
          color: '#6b7280',
          text: 'Unknown',
          icon: 'dot'
        }
    }
  }

  const getSizes = () => {
    switch (size) {
      case 'sm':
        return { dot: 'w-2 h-2', icon: 'w-3 h-3' }
      case 'md':
        return { dot: 'w-3 h-3', icon: 'w-4 h-4' }
      case 'lg':
        return { dot: 'w-4 h-4', icon: 'w-5 h-5' }
    }
  }

  const config = getStatusConfig()
  const sizes = getSizes()

  const renderIcon = () => {
    if (config.icon === 'spinner') {
      return (
        <svg className={cn('animate-spin', sizes.icon)} viewBox="0 0 14 14" fill="none">
          <circle 
            cx="7" 
            cy="7" 
            r="6" 
            fill="none" 
            stroke={config.color} 
            strokeWidth="1.5" 
            strokeDasharray="3.14 0" 
            strokeDashoffset="-0.7"
          />
          <circle 
            cx="7" 
            cy="7" 
            r="2" 
            fill="none" 
            stroke={config.color} 
            strokeWidth="4" 
            strokeDasharray="11.309733552923255 22.61946710584651" 
            strokeDashoffset="5.654866776461628" 
            transform="rotate(-90 7 7)"
          />
        </svg>
      )
    }

    if (config.icon === 'check') {
      return (
        <svg className={sizes.icon} viewBox="0 0 14 14" fill="none">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Zm3.152-9.636a.6.6 0 1 0-1.004-.657L9.181 9.71c-.252.384-.418.636-.558.813-.14.176-.2.205-.212.21a.48.48 0 0 1-.374-.003c-.012-.005-.072-.035-.209-.213a12.33 12.33 0 0 1-.544-.822l-.377-.595a.6.6 0 1 0-1.014.642l.377.595.015.024c.226.357.417.66.592.887.178.232.39.457.685.584.416.18.888.183 1.307.01.296-.122.512-.344.694-.573.178-.225.374-.524.606-.878l.015-.023 1.968-3.005Z" 
            fill={config.color}
          />
        </svg>
      )
    }

    return (
      <div 
        className={cn('rounded-full', sizes.dot)} 
        style={{ backgroundColor: config.color }}
      />
    )
  }

  if (withText) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {renderIcon()}
        <span style={{ color: config.color }}>
          {config.text}
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {renderIcon()}
    </div>
  )
}