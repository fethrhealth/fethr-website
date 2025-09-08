'use client'

import React, { useState, useEffect } from 'react'

interface AIChatPanelProps {
  visible: boolean
  exiting: boolean
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({ visible, exiting }) => {
  const [typingText, setTypingText] = useState('')
  const [showChatMessage, setShowChatMessage] = useState(false)
  
  const fullText = "I want to send orders from Epic to Cerner"
  
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] AIChatPanel useEffect - visible:`, visible, 'exiting:', exiting)
    
    if (visible && !exiting) {
      console.log(`[${new Date().toISOString()}] Starting new animation sequence`)
      
      // Reset all states
      setTypingText('')
      setShowChatMessage(false)
      
      // 0s-1s: Text fades in completely
      const textAppearTimeout = setTimeout(() => {
        console.log(`[${new Date().toISOString()}] Setting full text immediately`)
        setTypingText(fullText)
      }, 100) // Small delay to ensure state is reset
      
      // 2.5s: Show chat message
      const chatMessageTimeout = setTimeout(() => {
        console.log(`[${new Date().toISOString()}] Showing chat message`)
        setShowChatMessage(true)
      }, 2500)
      
      // Cleanup function
      return () => {
        console.log(`[${new Date().toISOString()}] Cleaning up AIChatPanel timeouts`)
        clearTimeout(textAppearTimeout)
        clearTimeout(chatMessageTimeout)
      }
    } else {
      console.log(`[${new Date().toISOString()}] Resetting AIChatPanel state`)
      setTypingText('')
      setShowChatMessage(false)
    }
  }, [visible, exiting])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {!showChatMessage ? (
        // Welcome State
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center max-w-xl w-full">
            <h2 className="text-2xl mb-6 text-gray-900">How can I assist you?</h2>
            
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <button className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-transparent border-gray-300 hover:border-gray-400 focus-visible:outline-blue-600 text-xs rounded-full py-2 px-3 text-gray-600 hover:text-gray-800">
                <span className="truncate">Create a sample HL7 message</span>
              </button>
              <button className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-transparent border-gray-300 hover:border-gray-400 focus-visible:outline-blue-600 text-xs rounded-full py-2 px-3 text-gray-600 hover:text-gray-800">
                <span className="truncate">Build an interface</span>
              </button>
              <button className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-transparent border-gray-300 hover:border-gray-400 focus-visible:outline-blue-600 text-xs rounded-full py-2 px-3 text-gray-600 hover:text-gray-800">
                <span className="truncate">Upload mapping document into table</span>
              </button>
              <button className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-transparent border-gray-300 hover:border-gray-400 focus-visible:outline-blue-600 text-xs rounded-full py-2 px-3 text-gray-600 hover:text-gray-800">
                <span className="truncate">Create interface documentation</span>
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              Click on an example above or type your own question below
            </div>
          </div>
        </div>
      ) : (
        // Chat Messages
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-900">
              <div className="whitespace-pre-wrap break-words">
                {fullText}
              </div>
              <div className="text-xs mt-1 text-gray-500">
                Just now
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="relative">
          <textarea
            value={typingText}
            placeholder="Ask me anything..."
            className={`
              flex w-full rounded-md border border-gray-300 pl-12 pr-12 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white resize-none box-border overflow-hidden transition-opacity duration-1000
              ${typingText ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ 
              minHeight: '80px',
              maxHeight: '200px'
            }}
            readOnly
          />
          
          {/* Left side tools */}
          <div className="absolute left-2 bottom-2 flex items-center gap-1">
            <div className="rounded-md border border-gray-300 p-1">
              <button className="inline-flex items-center justify-center w-6 h-6 rounded transition-all duration-200 ease-out outline-none text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Send button */}
          <div className="absolute right-2 bottom-2">
            <button
              className={`
                relative inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ease-out outline-none
                ${showChatMessage 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
              disabled={!showChatMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}