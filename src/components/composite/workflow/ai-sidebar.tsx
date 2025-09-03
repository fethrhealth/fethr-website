'use client'

import React, { useState, useEffect } from 'react';

interface AISidebarProps {
  visible: boolean;
  exiting: boolean;
}

export const AISidebar: React.FC<AISidebarProps> = ({ visible, exiting }) => {
  const [typingText, setTypingText] = useState('');
  const [showFile, setShowFile] = useState(false);
  const [fileDropped, setFileDropped] = useState(false);
  const [showChatMessage, setShowChatMessage] = useState(false);
  
  const fullText = "I want to send orders from Epic to Cerner";
  
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] AISidebar useEffect - visible:`, visible, 'exiting:', exiting);
    
    if (visible && !exiting) {
      console.log(`[${new Date().toISOString()}] Starting new animation sequence`);
      
      // Reset all states
      setTypingText('');
      setShowFile(false);
      setFileDropped(false);
      setShowChatMessage(false);
      
      // 0s-1s: Text fades in completely
      console.log(`[${new Date().toISOString()}] Phase 1: Text appearing (0-1s)`);
      const textAppearTimeout = setTimeout(() => {
        console.log(`[${new Date().toISOString()}] Setting full text immediately`);
        setTypingText(fullText);
      }, 100); // Small delay to ensure state is reset
      
      // 1s-2.5s: File drag animation
      const fileDragTimeout = setTimeout(() => {
        console.log(`[${new Date().toISOString()}] Phase 2: File drag starting (1s)`);
        setShowFile(true);
      }, 1000);
      
      // 2.5s: File drops
      const fileDropTimeout = setTimeout(() => {
        console.log(`[${new Date().toISOString()}] Phase 2: File dropping (2.5s)`);
        setFileDropped(true);
        setShowChatMessage(true);
      }, 2500);
      
      // Cleanup function
      return () => {
        console.log(`[${new Date().toISOString()}] Cleaning up AISidebar timeouts`);
        clearTimeout(textAppearTimeout);
        clearTimeout(fileDragTimeout);
        clearTimeout(fileDropTimeout);
      };
    } else {
      console.log(`[${new Date().toISOString()}] Resetting AISidebar state`);
      setTypingText('');
      setShowFile(false);
      setFileDropped(false);
      setShowChatMessage(false);
    }
  }, [visible, exiting]);

  return (
    <div className={`
      relative hidden h-full overflow-hidden lg:flex lg:flex-col border-[#EEEFF1] border-l bg-white
      ${visible ? 'block' : 'hidden'}
    `}>
      
      {/* AI Sidebar Header */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-x-4 px-3 h-[46px]">
          <div className="text-sm flex-1 flex items-center">
            <div className="text-blue-600 flex justify-center items-center relative mr-3" style={{ width: '20px', height: '20px' }}>
              <svg width="20" height="20" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M23 1.78677L44.2132 23L23 44.2132L1.7868 23L23 1.78677ZM23 0.372559L23.7071 1.07967L44.9203 22.2929L45.6274 23L44.9203 23.7071L23.7071 44.9203L23 45.6274L22.2929 44.9203L1.07969 23.7071L0.372583 23L1.07969 22.2929L22.2929 1.07967L23 0.372559Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path fillRule="evenodd" clipRule="evenodd" d="M30 23C30 26.866 26.866 30 23 30C19.134 30 16 26.866 16 23C16 19.134 19.134 16 23 16C26.866 16 30 19.134 30 23ZM31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="text-gray-400">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M16 3.549L7.12 20.600" />
              </svg>
            </span>
            <button className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-gray-700 hover:bg-gray-100 shadow-none focus-visible:outline-blue-600 border-transparent text-xs px-2.5 py-1 h-[26px] max-w-64 truncate">
              <span className="truncate">New Chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-gray-700 hover:bg-gray-100 shadow-none focus-visible:outline-blue-600 border-transparent text-xs h-7 w-7 p-0 pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </button>
            <button className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-gray-700 hover:bg-gray-100 shadow-none focus-visible:outline-blue-600 border-transparent text-xs h-7 w-7 p-0 pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-gray-700 hover:bg-gray-100 shadow-none focus-visible:outline-blue-600 border-transparent text-xs h-7 w-7 p-0 pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
      </div>

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
          
          {/* File Drop Animation - REMOVED */}
          
          {/* File Card when dropped - REMOVED */}
          
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
                  <path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z"/>
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
  );
};