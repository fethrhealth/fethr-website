'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { WaitlistSignup } from './waitlist-signup';
import { Carousel } from './carousel';

export function HeroSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col space-y-8">
            {/* Main headline */}
            <div className="space-y-6">
              <h1 
                className="gitbook-heading"
                style={{
                  fontSize: '40px',
                  lineHeight: '42px',
                  letterSpacing: '-0.05em',
                  color: 'rgb(38, 41, 48)'
                }}
              >
                Intelligent healthcare automation{' '}
                <span style={{ color: 'rgb(48,127,152)' }}>
                  your users will love
                </span>
              </h1>
              
              <p 
                className="gitbook-body"
                style={{
                  fontSize: '16px',
                  lineHeight: '26px',
                  color: 'rgb(38, 41, 48)',
                  maxWidth: '90%' // Constrain width to match GitBook's text wrapping
                }}
              >
                Build beautiful, AI-optimized workflows that automatically connect healthcare systems and streamline clinical processes
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Waitlist signup - replaces "Start for free" */}
              <div className="flex-1 sm:max-w-md">
                <WaitlistSignup />
              </div>
              
              {/* Demo button - matches GitBook's secondary button */}
              <Button 
                variant="outline" 
                size="lg"
                className="sm:flex-shrink-0 border border-gray-300 bg-white hover:bg-gray-50"
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                }
              >
                <a href="https://fethrhealth.com/demo" target="_blank" rel="noopener noreferrer">
                  Get a demo
                </a>
              </Button>
            </div>

 
          </div>

          {/* Right side - Carousel */}
          <div className="relative">
            {/* <Carousel /> */}
          </div>
        </div>
      </div>
    </section>
  );
}