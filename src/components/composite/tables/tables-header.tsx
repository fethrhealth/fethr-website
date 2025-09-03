'use client'

import React from 'react'

export function TablesHeader() {
  return (
    <div className="border-[#EEEFF1] border-b">
      <div className="flex items-center justify-between pt-3 pr-[19px] pb-[11px] pl-4">
        <div className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#75777C" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-table-editor"
          >
            <path d="M2.9707 15.3494L20.9707 15.355M20.9405 9.61588H2.99699M8.77661 9.61588V21.1367M20.9405 5.85547V19.1367C20.9405 20.2413 20.0451 21.1367 18.9405 21.1367H4.99699C3.89242 21.1367 2.99699 20.2413 2.99699 19.1367V5.85547C2.99699 4.7509 3.89242 3.85547 4.99699 3.85547H18.9405C20.0451 3.85547 20.9405 4.7509 20.9405 5.85547Z"></path>
          </svg>
          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] text-[#75777C] mr-[7px] ml-[6px]">Tables</span>
          <svg className="h-[22px] w-4" width="16" height="22" viewBox="0 0 16 24" fill="none">
            <path d="m6.5 16 3-10" stroke="#E6E7EA" strokeLinecap="round"></path>
          </svg>
          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-secondary-foreground">Race</span>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border bg-green-100 text-green-600 border-green-200">
            Development
          </div>
          <div className="relative">
            <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-gray-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
            </button>
          </div>
          <div className="relative">
            <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-gray-600"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          </div>
          <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 46 46" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-gray-600"
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M23 1.78677L44.2132 23L23 44.2132L1.7868 23L23 1.78677ZM23 0.372559L23.7071 1.07967L44.9203 22.2929L45.6274 23L44.9203 23.7071L23.7071 44.9203L23 45.6274L22.2929 44.9203L1.07969 23.7071L0.372583 23L1.07969 22.2929L22.2929 1.07967L23 0.372559Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M30 23C30 26.866 26.866 30 23 30C19.134 30 16 26.866 16 23C16 19.134 19.134 16 23 16C26.866 16 30 19.134 30 23ZM31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}