'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export function Navbar() {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Typography 
                variant="heading" 
                weight="bold" 
                className="text-foreground text-xl"
              >
                FethrHealth
              </Typography>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Product Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProductOpen(!isProductOpen)}
                  onMouseEnter={() => setIsProductOpen(true)}
                  onMouseLeave={() => setIsProductOpen(false)}
                  className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Typography variant="body">Product</Typography>
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform ${isProductOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isProductOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
                    onMouseEnter={() => setIsProductOpen(true)}
                    onMouseLeave={() => setIsProductOpen(false)}
                  >
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Features
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Integrations
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      API
                    </Link>
                  </div>
                )}
              </div>

              {/* Solutions */}
              <Link href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                <Typography variant="body">Solutions</Typography>
              </Link>

              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Typography variant="body">Resources</Typography>
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isResourcesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                  >
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Blog
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Documentation
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Support
                    </Link>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <Link href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                <Typography variant="body">Pricing</Typography>
              </Link>
            </div>
          </div>
          
          {/* Right side - Auth + Demo button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
              <Typography variant="body">Sign in</Typography>
            </Link>
            <a href="https://fethrhealth.com/demo" target="_blank" rel="noopener noreferrer">
            <Button 
                variant="outline" 
                size="sm"
                leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                }
            >
                Get a demo
            </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="#" className="text-gray-700 hover:text-primary-600">
                <Typography variant="body">Product</Typography>
              </Link>
              <Link href="#" className="text-gray-700 hover:text-primary-600">
                <Typography variant="body">Solutions</Typography>
              </Link>
              <Link href="#" className="text-gray-700 hover:text-primary-600">
                <Typography variant="body">Resources</Typography>
              </Link>
              <Link href="#" className="text-gray-700 hover:text-primary-600">
                <Typography variant="body">Pricing</Typography>
              </Link>
              <hr className="border-gray-200" />
              <Link href="#" className="text-gray-700 hover:text-primary-600">
                <Typography variant="body">Sign in</Typography>
              </Link>
              <a href="https://fethrhealth.com/demo" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button 
                  variant="outline" 
                  size="sm"
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  }
                  fullWidth
                >
                  Get a demo
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}