'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Logo } from '@/components/ui'
import { NAV_ITEMS } from '@/lib/constants'
import { Menu, ChevronDown } from 'lucide-react'
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
                    <Logo />
                  </Link>

                  {/* Desktop Navigation */}
                  <nav aria-label="Main" className="relative z-1 px-2.5">
                    <div className="relative">
                      <ul className="hidden items-center gap-x-1.5 lg:flex">
                        <li>
                          <button className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 disabled:pointer-events-none disabled:cursor-default h-9 gap-x-1.5 rounded-[10px] px-3 group select-none text-navbar bg-transparent hover:bg-secondary-background border-none">
                            <span>Platform</span>
                            <ChevronDown className="w-[18px] h-[18px] transition-[transform,translate] duration-400 ease-in-out group-data-open:translate-y-0.25 group-data-open:duration-150" />
                          </button>
                        </li>
                        <li>
                          <button className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 disabled:pointer-events-none disabled:cursor-default h-9 gap-x-1.5 rounded-[10px] px-3 group select-none text-navbar bg-transparent hover:bg-secondary-background border-none">
                            <span>Resources</span>
                            <ChevronDown className="w-[18px] h-[18px] transition-[transform,translate] duration-400 ease-in-out group-data-open:translate-y-0.25 group-data-open:duration-150" />
                          </button>
                        </li>
                        <li>
                          <Link
                            href="/customers"
                            className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 disabled:pointer-events-none disabled:cursor-default h-9 gap-x-1.5 rounded-[10px] px-3 text-navbar bg-transparent hover:bg-secondary-background border-none"
                          >
                            <span>Customers</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/pricing"
                            className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 disabled:pointer-events-none disabled:cursor-default h-9 gap-x-1.5 rounded-[10px] px-3 text-navbar bg-transparent hover:bg-secondary-background border-none"
                          >
                            <span>Pricing</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border text-base transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 disabled:pointer-events-none disabled:cursor-default size-9 rounded-[10px] lg:hidden -mr-3 bg-transparent hover:bg-secondary-background border-none"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="text-black-500 h-6 w-6" />
                </button>

                {/* Desktop Actions */}
                <div className="hidden gap-x-2.5 lg:flex">
                  <Button 
                    variant="outline" 
                    size="default"
                    className="h-9 gap-x-1.5 rounded-[10px] px-3 text-sm"
                  >
                    Sign in
                  </Button>
                  <Button 
                    variant="primary" 
                    size="default"
                    className="h-9 gap-x-1.5 rounded-[10px] px-3 text-sm"
                  >
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