'use client'

import React from 'react'
import { WaitlistForm } from './waitlist-form'

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[460px] flex flex-col items-center justify-center overflow-x-clip bg-gradient-to-b from-[#FAFAFB] to-[#FFFFFF] border-subtle-stroke border-b">
      <div className="container-custom w-full h-full flex items-center justify-center">
        <div className="relative grid w-full">
          {/* Hero Content */}
          <div className="flex flex-col items-center relative py-20 max-xl:py-16 max-lg:py-12">
            {/* Main Headline */}
            <h1 className="mt-3 text-center text-hero md:text-hero lg:mt-6">
              Intelligent <br />healthcare automation.
            </h1>
            
            {/* Subtitle */}
            <p className="mt-3 max-w-[800px] text-center text-hero-sub [text-wrap:pretty] lg:mt-6">
              Fethr is the AI-native automation platform for healthcare organizations.
            </p>

            {/* Waitlist Form */}
            <div className="relative mt-6">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}