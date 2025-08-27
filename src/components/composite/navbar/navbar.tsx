'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { NAV_ITEMS } from '@/lib/constants'
import { Menu, X } from 'lucide-react'
import { MobileMenu } from './mobile-menu'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-10">
        <header className="bg-primary-background/95 border-b border-subtle-stroke backdrop-blur-md">
          <div className="container-custom">
            <nav className="pt-2 pb-[7px] lg:pt-4 lg:pb-[15px]">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex grow items-center gap-x-9">
                  <Link href="/" className="-mx-1.5 rounded-xl px-1.5">
                    <div className="text-primary-foreground font-inter-display font-bold text-2xl">
                      Fethr
                    </div>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav aria-label="Main" className="relative z-1 px-2.5">
                    <div className="relative">
                      <ul className="hidden items-center gap-x-1.5 lg:flex">
                        {NAV_ITEMS.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 disabled:pointer-events-none disabled:cursor-default h-9 gap-x-1.5 rounded-[10px] px-3 text-[15px] bg-transparent text-primary-foreground hover:bg-secondary-background border-none"
                            >
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="p-3 lg:hidden -mr-3"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6 text-black-500" />
                </button>

                {/* Desktop Actions */}
                <div className="hidden gap-x-2.5 lg:flex">
                  <Button variant="outline" size="default">
                    Sign in
                  </Button>
                  <Button variant="primary" size="default">
                    Start for free
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  )
}