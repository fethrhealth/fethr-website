'use client'

import React from 'react';

interface WorkflowCanvasProps {
  currentRun?: string;
  visible?: boolean;
  children?: React.ReactNode;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  currentRun,
  visible = true,
  children
}) => {
  if (!visible) return null;

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Grid Background */}
      <div className="bg-[#BABBBC] absolute inset-0">
        <div className="h-full w-full bg-[#FBFBFB]" style={{
          maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 1px, rgb(0, 0, 0) 1px), linear-gradient(rgba(0, 0, 0, 0) 1px, rgb(0, 0, 0) 1px)',
          maskPosition: '5px 5px',
          maskSize: '10px 10px'
        }}></div>
      </div>
      
      <div className="relative z-10 h-full">
        {/* Run Badge */}
        {currentRun && (
          <div className="absolute top-4 left-4">
            <span className="font-medium text-[#232529] text-[12px] leading-4 inline-flex items-center text-nowrap border px-[5px] py-px gap-x-[5px] rounded-md pr-1.5 border-[#E8DDFE] bg-[#F5F0FF]">
              <span className="font-medium text-[12px] leading-4 text-[#9162F9]">{currentRun}</span>
            </span>
          </div>
        )}

        {/* Canvas Content */}
        {children}
      </div>
    </div>
  );
};