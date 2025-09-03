'use client'

import React, { useState } from 'react';

interface WorkflowHeaderProps {
  title: string;
  breadcrumb?: {
    parentTitle: string;
    parentIcon?: React.ReactNode;
  };
  visible?: boolean;
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({
  title,
  breadcrumb,
  visible = true
}) => {
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  if (!visible) return null;

  return (
    <div className="border-[#EEEFF1] border-b">
      <div className="flex items-center justify-between pt-3 pr-[19px] pb-[11px] pl-4">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center">
          {breadcrumb && (
            <>
              {breadcrumb.parentIcon || (
                <svg className="size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <g stroke="#75777C" strokeWidth="1.1" strokeLinecap="round">
                    <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" strokeLinejoin="round"></rect>
                    <rect x="8" y="8" width="4.5" height="4.5" rx="2.25" strokeLinejoin="round"></rect>
                    <path d="M2.5 8v1A2.5 2.5 0 0 0 5 11.5h1M11.5 6V5A2.5 2.5 0 0 0 9 2.5H8"></path>
                  </g>
                </svg>
              )}
              <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] text-[#75777C] mr-[7px] ml-[6px]">
                {breadcrumb.parentTitle}
              </span>
              <svg className="h-[22px] w-4" width="16" height="22" viewBox="0 0 16 24" fill="none">
                <path d="m6.5 16 3-10" stroke="#E6E7EA" strokeLinecap="round"></path>
              </svg>
            </>
          )}
          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-secondary-foreground">
            {title}
          </span>
        </div>

        {/* Right side - Environment + Action buttons */}
        <div className="flex items-center gap-x-3">
          {/* Environment Badge - Static Development */}
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border bg-green-100 text-green-600 border-green-200">
            Development
          </div>

          {/* Help Button - Updated icon from HelpDropdown */}
          <div className="relative">
            <button
              onClick={() => setShowHelpDropdown(!showHelpDropdown)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors"
            >
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </button>

            {/* Help Dropdown */}
            {showHelpDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowHelpDropdown(false)}
                />
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">
                      Keyboard shortcuts
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">
                      Contact support
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">
                      Feature request
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Notifications Button - Updated icon from NotificationsDropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors relative"
            >
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
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Notifications</h3>
                    <div className="text-sm text-gray-500">No new notifications</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* AI Assistant Button - Updated icon from AIAssistant */}
          <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path fillRule="evenodd" clipRule="evenodd" d="M23 1.78677L44.2132 23L23 44.2132L1.7868 23L23 1.78677ZM23 0.372559L23.7071 1.07967L44.9203 22.2929L45.6274 23L44.9203 23.7071L23.7071 44.9203L23 45.6274L22.2929 44.9203L1.07969 23.7071L0.372583 23L1.07969 22.2929L22.2929 1.07967L23 0.372559Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path fillRule="evenodd" clipRule="evenodd" d="M30 23C30 26.866 26.866 30 23 30C19.134 30 16 26.866 16 23C16 19.134 19.134 16 23 16C26.866 16 30 19.134 30 23ZM31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};