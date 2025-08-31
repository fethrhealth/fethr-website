'use client'

import React from 'react';

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
  if (!visible) return null;

  return (
    <div className="border-[#EEEFF1] border-b">
      <div className="flex items-center justify-between pt-3 pr-[19px] pb-[11px] pl-4">
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
      </div>
    </div>
  );
};