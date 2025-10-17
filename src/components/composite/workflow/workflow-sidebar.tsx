'use client'

import React from 'react';

import Image from 'next/image'

interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface WorkflowSidebarProps {
  visible: boolean;
  companyName: string;
  showQuickActions?: boolean;
  activeItem?: 'workflows' | 'tables' | 'monitor' | 'logs' | 'schemas' | 'integrations' | 'plugins' | 'credentials' | 'usage' | 'billing' | 'settings';
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  visible,
  companyName,
  showQuickActions = true,
  activeItem = 'workflows'
}) => {
  // Monitoring section items
  const monitoringItems: NavigationItem[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor">
          <path d="M5 4.75h14a1.25 1.25 0 0 1 1.25 1.25v10a1.25 1.25 0 0 1-1.25 1.25H5A1.25 1.25 0 0 1 3.75 16V6a1.25 1.25 0 0 1 1.25-1.25Z" />
          <path d="M7 10v4" />
          <path d="M12 8v6" />
          <path d="M17 9v5" />
          <path d="M8 20h8" />
        </svg>
      ),
      label: 'Monitor',
      active: activeItem === 'monitor'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      ),
      label: 'Logs',
      active: activeItem === 'logs'
    }
  ];

  // Tools & Analytics section items
  const toolsAnalyticsItems: NavigationItem[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-table-editor">
          <path d="M2.9707 15.3494L20.9707 15.355M20.9405 9.61588H2.99699M8.77661 9.61588V21.1367M20.9405 5.85547V19.1367C20.9405 20.2413 20.0451 21.1367 18.9405 21.1367H4.99699C3.89242 21.1367 2.99699 20.2413 2.99699 19.1367V5.85547C2.99699 4.7509 3.89242 3.85547 4.99699 3.85547H18.9405C20.0451 3.85547 20.9405 4.7509 20.9405 5.85547Z" />
        </svg>
      ),
      label: 'Tables',
      active: activeItem === 'tables'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      ),
      label: 'Schemas',
      active: activeItem === 'schemas'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks">
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
        </svg>
      ),
      label: 'Integrations',
      active: activeItem === 'integrations'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-connection-link">
          <path d="M22.6 2.7L21.2 1.3L18.2 4.3L16.4 2.5C15.7 1.7 14.4 1.7 13.6 2.5L10.8 5.3L18.6 13.1L21.4 10.3C22.2 9.6 22.2 8.3 21.4 7.5L19.6 5.7L22.6 2.7Z" />
          <path d="M15.6 13.3L12.8 16.2L14.2 17.6L11.4 20.4C10.7 21.2 9.4 21.2 8.6 20.4L6.8 18.6L2.8 22.6L1.4 21.2L5.4 17.2L3.6 15.4C2.8 14.7 2.8 13.4 3.6 12.6L6.4 9.8L7.9 11.2L10.7 8.4L12.1 9.8L9.3 12.6L11.4 14.7L14.2 11.9L15.6 13.3Z" />
        </svg>
      ),
      label: 'Plugins',
      active: activeItem === 'plugins'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-lock">
          <path d="M12 22C6.84 20.74 3 15.55 3 10V5L12 1L21 5V10C21 15.55 17.16 20.74 12 22Z" />
          <circle cx="12" cy="9" r="1.5" />
          <path d="M12 10.5V18" />
        </svg>
      ),
      label: 'Credentials',
      active: activeItem === 'credentials'
    },
    {
      icon: (
        <svg width="14" height="14" fill="#75777C" viewBox="0 0 16 16">
          <path fillRule="evenodd" clipRule="evenodd" d="M5 2C5 1.44772 4.55228 1 4 1H2C1.44772 1 1 1.44772 1 2V4C1 4.55228 1.44772 5 2 5H4C4.55228 5 5 4.55228 5 4V2Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M6 4.24988C6.15698 4.45881 6.25 4.71854 6.25 5V11C6.25 12.5188 7.48122 13.75 9 13.75H10V12.25H9C8.30964 12.25 7.75 11.6904 7.75 11V8.45015C8.12503 8.64186 8.54989 8.75 9 8.75H10V7.25H9C8.30964 7.25 7.75 6.69036 7.75 6V5C7.75 3.83401 7.02434 2.8375 6 2.43747V4.24988Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M11 7C11 6.44772 11.4477 6 12 6H14C14.5523 6 15 6.44772 15 7V9C15 9.55229 14.5523 10 14 10H12C11.4477 10 11 9.55229 11 9V7Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M11 12C11 11.4477 11.4477 11 12 11H14C14.5523 11 15 11.4477 15 12V14C15 14.5523 14.5523 15 14 15H12C11.4477 15 11 14.5523 11 14V12Z" />
        </svg>
      ),
      label: 'Workflows',
      active: activeItem === 'workflows'
    }
  ];

  // Billing section items
  const billingItems: NavigationItem[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-area">
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
        </svg>
      ),
      label: 'Usage',
      active: activeItem === 'usage'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 17.5v-11" />
        </svg>
      ),
      label: 'Billing',
      active: activeItem === 'billing'
    }
  ];

  // Settings section items
  const settingsItems: NavigationItem[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      label: 'Settings',
      active: activeItem === 'settings'
    }
  ];

  return (
    <div className={`
      hidden lg:flex lg:flex-col border-[#EEEFF1] border-r bg-[#FBFBFB]
      ${visible ? 'block' : 'hidden'}
    `}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-x-6 border-[#EEEFF1] border-b pt-3 pr-[15px] pb-[11px] pl-3">
        <div className="flex items-center gap-7">
          <div className='flex items-end'>
            <Image src="/assets/icon.webp" alt="icon" width={30} height={30} />

            <span className='text-sm'>Fethr Health</span>
          </div>

          <svg className="ml-[5px]" width="18" height="18" fill="none">
            <path d="M5.25 7.125 9 10.875l3.75-3.75" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        <svg width="18" height="18" fill="none">
          <g stroke="#75777C" strokeWidth="1.2">
            <rect x="1.5" y="2.5" width="15" height="13" rx="3"></rect>
            <path d="M7.8 2.725v12.5"></path>
            <path d="M3.975 5.425h1.35M3.975 7.674h1.35" strokeLinecap="round" strokeLinejoin="round"></path>
          </g>
        </svg>
      </div>

      {/* Sidebar Content */}
      <div className="pt-[10px] pr-[7px] pl-2 flex-1">
        {/* Quick Actions */}
        {showQuickActions && (
          <div className="flex gap-x-2 px-0.5 mb-2.5">
            <div className="rounded-sm bg-primary-background lg:rounded-lg shadow-[0px_0px_2px_0px_#E0E0E0,0px_2px_4px_-2px_rgba(24,39,75,0.02),0px_4px_4px_-2px_rgba(24,39,75,0.06)] flex flex-1 items-center justify-between py-1 pr-1 pl-1.5">
              <div className="flex items-center gap-x-1">
                <svg width="14" height="14" fill="none">
                  <rect x="2" y="1" width="10" height="12" rx="2.5" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></rect>
                  <path d="M5.333 3.166v4.667m0-1.667 1.053-1m0 0 2.105-2m-2.105 2 2.28 2.667" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">Quick actions</span>
              </div>
              <div className="flex min-w-[20px] justify-center rounded-md border border-[#E6E7EA] p-[3px]">
                <span className="text-center font-normal text-[#75777C] text-[11px] leading-3 tracking-[0.22px]">⌘K</span>
              </div>
            </div>
            <div className="rounded-sm bg-primary-background lg:rounded-lg shadow-[0px_0px_2px_0px_#E0E0E0,0px_2px_4px_-2px_rgba(24,39,75,0.02),0px_4px_4px_-2px_rgba(24,39,75,0.06)] flex items-center gap-x-1.5 py-1 pr-1 pl-1.5">
              <svg width="14" height="14" fill="none">
                <path d="M12.313 12.313 9.467 9.467M1.313 6.054a4.741 4.741 0 1 1 9.482 0 4.741 4.741 0 0 1-9.482 0Z" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <div className="flex min-w-[20px] justify-center rounded-md border border-[#E6E7EA] p-[3px]">
                <span className="text-center font-normal text-[#75777C] text-[11px] leading-3 tracking-[0.22px]">/</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex flex-col gap-[9px]">
          {/* Monitoring Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1.5 px-2 py-1.5">
              <span className="font-medium text-[12px] leading-4 text-[#75777C]">Monitoring</span>
            </div>
            <ul className="flex flex-col gap-px">
              {monitoringItems.map((item, index) => (
                <div key={index} className="flex w-full flex-col">
                  <div
                    className={`flex items-center gap-x-1.5 rounded-[9px] px-2 py-1 cursor-pointer ${item.active ? 'bg-[#F4F5F6]' : 'hover:bg-gray-50'
                      }`}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{item.label}</span>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          {/* Separator */}
          <div className="shrink-0 bg-[#EEEFF1] h-[1px] w-[calc(100%-1rem)] mx-auto" />

          {/* Tools & Analytics Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1.5 px-2 py-1.5">
              <span className="font-medium text-[12px] leading-4 text-[#75777C]">Tools & Analytics</span>
            </div>
            <ul className="flex flex-col gap-px">
              {toolsAnalyticsItems.map((item, index) => (
                <div key={index} className="flex w-full flex-col">
                  <div
                    className={`flex items-center gap-x-1.5 rounded-[9px] px-2 py-1 cursor-pointer ${item.active ? 'bg-[#F4F5F6]' : 'hover:bg-gray-50'
                      }`}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{item.label}</span>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          {/* Separator */}
          <div className="shrink-0 bg-[#EEEFF1] h-[1px] w-[calc(100%-1rem)] mx-auto" />

          {/* Billing Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1.5 px-2 py-1.5">
              <span className="font-medium text-[12px] leading-4 text-[#75777C]">Billing</span>
            </div>
            <ul className="flex flex-col gap-px">
              {billingItems.map((item, index) => (
                <div key={index} className="flex w-full flex-col">
                  <div
                    className={`flex items-center gap-x-1.5 rounded-[9px] px-2 py-1 cursor-pointer ${item.active ? 'bg-[#F4F5F6]' : 'hover:bg-gray-50'
                      }`}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{item.label}</span>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          {/* Separator */}
          <div className="shrink-0 bg-[#EEEFF1] h-[1px] w-[calc(100%-1rem)] mx-auto" />

          {/* Settings Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1.5 px-2 py-1.5">
              <span className="font-medium text-[12px] leading-4 text-[#75777C]">Settings</span>
            </div>
            <ul className="flex flex-col gap-px">
              {settingsItems.map((item, index) => (
                <div key={index} className="flex w-full flex-col">
                  <div
                    className={`flex items-center gap-x-1.5 rounded-[9px] px-2 py-1 cursor-pointer ${item.active ? 'bg-[#F4F5F6]' : 'hover:bg-gray-50'
                      }`}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{item.label}</span>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};