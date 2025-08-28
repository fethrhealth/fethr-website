'use client'

import React from 'react'
import { WaitlistForm } from './waitlist-form'

export function HeroSection() {
  return (
    <section className="flex w-full max-w-screen flex-col items-center justify-center overflow-x-clip bg-linear-to-b from-[#FAFAFB] to-[#FFFFFF] relative">
      <div className="container-custom">
        <div className="relative w-full max-w-[1392px] border-subtle-stroke lg:border-x" style={{height: 'calc(200vh + 1678px)'}}>
          {/* This creates the same height structure as Attio */}
        </div>
        
        {/* Mobile gradient line */}
        <svg width="100%" height="1" className="text-subtle-stroke absolute inset-x-0 bottom-0 lg:hidden">
          <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Hero Content - Positioned absolutely like Attio */}
      <div className="absolute inset-x-0 top-0 overflow-x-clip border-subtle-stroke border-b bg-primary-background">
        <div className="container-custom">
          <div className="relative grid">
            {/* Grid lines - exact Attio structure */}
            <div className="absolute top-0 bottom-0 row-start-1 row-end-5 hidden w-px bg-[#EAEDF1] lg:block"></div>
            <div className="absolute top-0 right-0 bottom-0 col-start-2 row-start-1 row-end-5 hidden w-px bg-[#EAEDF1] lg:block"></div>

            {/* Hero Content */}
            <div className="flex flex-col items-center relative mt-30 mb-20 max-xl:mt-25 max-lg:mt-20 max-lg:mb-0">
              {/* Main Headline */}
              <h1 className="mt-3 text-center text-hero md:text-hero lg:mt-6">
                Intelligent <br />healthcare automation.
              </h1>
              
              {/* Subtitle */}
              <p className="mt-3 max-w-[460px] text-center text-hero-sub [text-wrap:pretty] lg:mt-6">
                Fethr is the AI-native healthcare integration engine that builds, scales, and grows your company to the next level.
              </p>

              {/* Waitlist Form */}
              <div className="relative">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}