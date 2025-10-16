'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { NAV_ITEMS } from '@/lib/constants'
import { Menu, ChevronDown } from 'lucide-react'
import { MobileMenu } from './mobile-menu'
import Logo from '@/assets/logo.svg'
import Image from 'next/image'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Outer navbar - 1520.8x67.8 */}
      <div className="sticky top-0 z-10">
        {/* Header component - 1520.8x67 */}
        <header className="bg-primary-background/95 border-b border-subtle-stroke backdrop-blur-md">
          {/* Container div - 1392x67 with 24px left/right padding */}
          <div className="container-custom">
            {/* Nav element - 1392x36 with 16px top, 15px bottom padding */}
            <nav className="pt-4 pb-[15px]">
              {/* Inner div - 1392x36 no padding */}
              <div className="flex items-center justify-between h-9">

                {/* Inner flex grow div - 1201.490x36 (doesn't contain buttons) */}
                <div className="flex grow items-center gap-x-9">
                  {/* Logo link - 103x28 with -6px margins, 6px left/right padding */}
                  <Link href="/" className="-mx-1.5 rounded-xl px-1.5">
                    <Image src={Logo} alt="navbar logo" width={50} />
                  </Link>

                  {/* Nav element - 419.188x36 */}
                  <nav aria-label="Main" className="relative z-1">
                    {/* Div inside nav - same dimensions */}
                    <div className="relative">
                      {/* UL inside - same dimensions */}
                      <ul className="hidden items-center gap-x-1.5 lg:flex">
                        {/* Each li - 104.613x36 */}
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

                {/* Div containing buttons - 190.5x36 */}
                <div className="hidden gap-x-2.5 lg:flex">
                  <a
                    href="https://app.fethr.com/"
                    className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 disabled:pointer-events-none disabled:cursor-default button-outline h-9 gap-x-1.5 rounded-[10px] px-3 text-sm has-[>svg:last-child,>img:last-child]:pr-2 has-[>svg:first-child,>img:first-child]:pl-2 max-lg:h-11.5 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-lg:has-[>svg:last-child,>img:last-child]:pr-3 max-lg:has-[>svg:first-child,>img:first-child]:pl-3"
                  >
                    Sign in
                  </a>
                  <a
                    href="https://app.fethr.com/welcome/sign-in"
                    className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 disabled:pointer-events-none disabled:cursor-default button-primary h-9 gap-x-1.5 rounded-[10px] px-3 text-sm has-[>svg:last-child,>img:last-child]:pr-2 has-[>svg:first-child,>img:first-child]:pl-2 max-lg:h-11.5 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-lg:has-[>svg:last-child,>img:last-child]:pr-3 max-lg:has-[>svg:first-child,>img:first-child]:pl-3"
                  >
                    Start for free
                  </a>
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