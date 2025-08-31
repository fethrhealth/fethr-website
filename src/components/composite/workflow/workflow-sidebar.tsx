'use client'

import React from 'react';

interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface RecordItem {
  label: string;
  color: string;
  onClick?: () => void;
}

interface WorkflowSidebarProps {
  visible: boolean;
  companyName: string;
  navigationItems: NavigationItem[];
  recordItems: RecordItem[];
  showQuickActions?: boolean;
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  visible,
  companyName,
  navigationItems,
  recordItems,
  showQuickActions = true
}) => {
  return (
    <div className={`
      hidden lg:flex lg:flex-col border-[#EEEFF1] border-r bg-[#FBFBFB]
      ${visible ? 'block' : 'hidden'}
    `}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-x-6 border-[#EEEFF1] border-b pt-3 pr-[15px] pb-[11px] pl-3">
        <div className="flex items-center">
          <div className="size-6 bg-gray-300 rounded-full"></div>
          <div className="ml-2 font-semibold text-[16px] text-secondary-foreground leading-5 tracking-[-0.32px]">
            {companyName}
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
          {/* Main Navigation */}
          <div className="flex flex-col">
            <ul className="flex flex-col gap-px">
              {navigationItems.map((item, index) => (
                <div key={index} className="flex w-full flex-col">
                  <div 
                    className={`flex items-center gap-x-1.5 rounded-[9px] px-2 py-1 cursor-pointer ${
                      item.active ? 'bg-[#F4F5F6]' : 'hover:bg-gray-50'
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

          {/* Records Section */}
          {recordItems.length > 0 && (
            <div className="flex flex-col">
              <div className="flex items-center gap-x-1.5 px-2 py-1.5">
                <svg width="14" height="14" fill="none">
                  <path d="m4 5.5 3 3 3-3" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="font-medium text-[12px] leading-4 text-[#75777C]">Records</span>
              </div>
              <ul className="flex flex-col gap-px">
                {recordItems.map((record, index) => (
                  <div key={index} className="flex w-full flex-col">
                    <div 
                      className="flex items-center gap-x-1.5 rounded-[9px] px-2 py-1 cursor-pointer hover:bg-gray-50"
                      onClick={record.onClick}
                    >
                      <div className={`size-[14px] ${record.color} rounded`}></div>
                      <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{record.label}</span>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};