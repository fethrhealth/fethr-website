'use client'

import React from 'react';

const RedefineHero: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center">
      <header className="relative z-1 flex min-h-[calc(100vh-var(--site-header-height))] w-full max-w-4xl flex-col justify-center px-6 pb-32 pt-20">
        <p className="text-[12px] font-semibold tracking-wider uppercase leading-[14px]" style={{ color: 'rgb(164, 173, 186)' }}>
          / Redefining Integration
        </p>
        
        <div className="pt-20">
          <div className="flex flex-nowrap items-baseline gap-2">
            <p className="text-[40px] leading-[44px] font-semibold text-gray-900 whitespace-nowrap">
              Integration
            </p>
            <div className="inline-flex items-baseline text-[40px] leading-[44px] font-serif italic whitespace-nowrap">
              <p>/ˌɪn-tə-ˈɡrā-shən/</p>
            </div>
            <div className="inline-flex items-baseline text-[40px] leading-[44px] font-serif italic whitespace-nowrap">
              <p>abbr.</p>
            </div>
          </div>
          
          <h1 className="pt-2 text-[40px] leading-[44px] font-semibold">
            <span className="text-gray-900">Frictionless</span>{' '}
            <span className="text-gray-900">data</span>{' '}
            <span className="text-gray-900">exchange.</span>
          </h1>
        </div>
      </header>
    </div>
  );
};

export default RedefineHero;