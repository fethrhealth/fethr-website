'use client'

import React from 'react'
import Link from 'next/link'
import { Button, Logo } from '@/components/ui'
import { NAV_ITEMS } from '@/lib/constants'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className="fixed right-0 top-0 h-full w-80 bg-primary-background shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-subtle-stroke">
            <Logo size="sm" />
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary-background rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-4 py-3 text-navbar hover:bg-secondary-background rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-subtle-stroke space-y-2">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={onClose}
            >
              Sign in
            </Button>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={onClose}
            >
              Start for free
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}