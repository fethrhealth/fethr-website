'use client'

import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface ProductTabBarProps {
  tabs: Tab[];
  activeTab: number;
  previousTab?: number;
  progress: number;
  isAutoPlaying: boolean;
  onTabClick: (index: number) => void;
  onTabHover?: (index: number) => void;
  onTabLeave?: (index: number) => void;
}

export const ProductTabBar: React.FC<ProductTabBarProps> = ({
  tabs,
  activeTab,
  previousTab,
  progress,
  isAutoPlaying,
  onTabClick,
  onTabHover,
  onTabLeave
}) => {
  return (
    <div className="grid w-full grid-cols-2 gap-x-px bg-subtle-stroke lg:grid-cols-4">
      {tabs.map((tab, index) => (
        <div key={tab.id} className="relative w-full overflow-hidden">
          <button
            onClick={() => onTabClick(index)}
            className={`
              flex h-16 w-full items-center justify-center border-subtle-stroke border-b px-4 
              font-medium text-[15px] leading-5 cursor-pointer transition-colors duration-150 ease-out
              ${activeTab === index
                ? 'bg-[#FAFAFB]'
                : 'bg-primary-background'
              }
            `}
            style={{
              color: activeTab === index ? '#232529' : '#1C1D1F'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== index && onTabHover) {
                onTabHover(index);
                e.currentTarget.style.color = '#232529';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== index && onTabLeave) {
                onTabLeave(index);
                e.currentTarget.style.color = '#1C1D1F';
              }
            }}
          >
            {tab.label}
          </button>

          {/* Progress bar */}
          {activeTab === index && isAutoPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E4E7EC]">
              <div
                className="h-full bg-[#1C1D1F]"
                style={{
                  width: `${progress}%`
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};