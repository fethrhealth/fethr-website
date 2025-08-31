'use client'

import React from 'react';

interface WorkflowToolbarProps {
  activeView: 'editor' | 'runs';
  runCount: number;
  isLive: boolean;
  onViewChange?: (view: 'editor' | 'runs') => void;
  visible?: boolean;
}

export const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  activeView,
  runCount,
  isLive,
  onViewChange,
  visible = true
}) => {
  if (!visible) return null;

  return (
    <div className="border-[#EEEFF1] border-b">
      <div className="flex items-center justify-between pt-2.5 pr-4 pb-[9px] pl-3">
        <div className="flex items-center gap-x-[5px]">
          <div 
            className={`flex items-center gap-x-1.5 py-[3px] pr-1.5 pl-[5px] cursor-pointer ${
              activeView === 'editor' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
            onClick={() => onViewChange?.('editor')}
          >
            <svg className="size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></rect>
              <path d="M2.5 8v2.5a1 1 0 0 0 1 1v0M8 2.5h2.5a1 1 0 0 1 1 1v0" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round"></path>
              <path d="M10.705 5.808a1.052 1.052 0 0 1 1.487 1.487l-3.77 3.77c-.349.35-.524.524-.722.666a3.001 3.001 0 0 1-.563.32c-.224.096-.464.156-.944.276L5.5 12.5l.173-.693c.12-.48.18-.72.277-.944a3 3 0 0 1 .319-.563c.142-.198.317-.373.667-.723l3.769-3.769Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] text-[#75777C]">Editor</span>
          </div>
          <div 
            className={`flex items-center border-[#EEEFF1] bg-[#FBFBFB] gap-x-1.5 rounded-lg border py-[3px] pr-[4px] pl-[5px] cursor-pointer ${
              activeView === 'runs' ? 'bg-[#F4F5F6]' : ''
            }`}
            onClick={() => onViewChange?.('runs')}
          >
            <svg className="size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="4.5" width="10" height="5" rx="2" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></rect>
              <path d="M7 12.5v-1M7 2.5v-1" stroke="#232529" strokeWidth="1.1" strokeLinecap="round"></path>
            </svg>
            <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">Runs</span>
            <span className="font-medium inline-flex items-center justify-center border-[#EEEFF1] bg-[#F4F5F6] text-center min-w-4 border px-[3px] text-[#5C5E63] mt-px h-[14px] rounded-sm text-[10px] leading-[14px] tracking-[-0.2px]">
              {runCount}
            </span>
          </div>
        </div>
        <div className="flex gap-x-2">
          {isLive && (
            <div className="flex items-center border-[#C7F4D3] bg-[#DDF9E4] gap-x-1.5 rounded-lg border py-[1px] pr-1.5 pl-[5px]">
              <div className="size-2 rounded-full bg-[#0FC27B]"></div>
              <span className="font-medium text-[12px] leading-4 text-[#075A39]">Live</span>
            </div>
          )}
          {/* Slider Button */}
          <div className="rounded-full bg-[#0F6BE9] p-px pl-1.5 lg:p-0.5 lg:pl-3">
            <div className="size-2 rounded-full bg-white-100 lg:size-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};