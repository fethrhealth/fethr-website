'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export type EnvironmentType = 'development' | 'staging' | 'production'

interface EnvironmentBadgeProps {
  environment: EnvironmentType
  className?: string
}

export const EnvironmentBadge: React.FC<EnvironmentBadgeProps> = ({
  environment,
  className
}) => {
  const getEnvironmentConfig = () => {
    switch (environment) {
      case 'development':
        return {
          text: 'Development',
          bgColor: 'bg-green-100',
          textColor: 'text-green-600',
          borderColor: 'border-green-200'
        }
      case 'staging':
        return {
          text: 'Staging',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-600',
          borderColor: 'border-yellow-200'
        }
      case 'production':
        return {
          text: 'Production',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        }
      default:
        return {
          text: environment,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200'
        }
    }
  }

  const config = getEnvironmentConfig()

  return (
    <div className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border',
      config.bgColor,
      config.textColor,
      config.borderColor,
      className
    )}>
      {config.text}
    </div>
  )
}