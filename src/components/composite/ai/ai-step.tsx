'use client'

import React from 'react';

interface AIStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    icon?: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
  };
  status: 'inactive' | 'running' | 'completed';
  showConnectionPoint?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  delay?: number;
}

export const AIStep: React.FC<AIStepProps> = ({
  title,
  description,
  icon,
  badge,
  status,
  showConnectionPoint = true,
  width = 302,
  height = 80,
  style,
  delay
}) => {
  const getStatusBadge = () => {
    if (status === 'running') {
      return (
        <span className="font-medium text-[#232529] text-[12px] leading-4 inline-flex items-center text-nowrap border px-[5px] py-px border-[#E8DDFE] bg-[#F5F0FF] gap-x-[5px] rounded-md pr-1.5">
          <svg className="size-3 animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1.5a4.5 4.5 0 1 1-3.182 7.682" stroke="#9162F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="font-medium text-[12px] leading-4 text-[#9162F9]">Running</span>
        </span>
      );
    }

    if (status === 'completed') {
      return (
        <span className="font-medium text-[#232529] text-[12px] leading-4 inline-flex items-center text-nowrap border px-[5px] py-px border-[#C7F4D3] bg-[#DDF9E4] gap-x-[5px] rounded-md pr-1.5">
          <svg className="size-3" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 5.727 3.742 6.9c.442.699.663 1.048.947 1.17a1 1 0 0 0 .778.007c.286-.118.512-.464.965-1.156L9 3" stroke="#0FC27B" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="font-medium text-[12px] leading-4 text-[#0FC27B]">Completed</span>
        </span>
      );
    }

    return null;
  };

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, (delay || 0) * 2000); // Convert delay to milliseconds (0.5s intervals)

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="relative transition-opacity duration-300"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        opacity: isVisible ? 1 : 0,
        ...style
      }}
    >
      {/* Status Badge */}
      <div className="absolute right-0 flex bottom-[calc(100%+8px)]">
        {getStatusBadge()}
      </div>

      {/* Step SVG Border */}
      <svg className="isolate h-full w-full overflow-visible">
        <g strokeWidth="1px">
          {/* Base border */}
          <path
            d="M 151 0.5 L 289.5 0.5 A 12 12 0 0 1 301.5 12 L 301.5 12.5 L 301.5 67.5 A 12 12 0 0 1 289.5 79.5 L 290 79.5 L 12.5 79.5 A 12 12 0 0 1 0.5 68 L 0.5 68.5 L 0.5 12 L 0.5 0.5 L 12.5 0.5 Z"
            fill="white"
            stroke="#E6E7EA"
          />
          {/* Connection point */}
          {showConnectionPoint && (
            <circle
              cx="151"
              cy="79.5"
              r="5"
              fill="white"
              stroke={status === 'completed' ? '#0FC27B' : '#266DF0'}
            />
          )}
        </g>
      </svg>

      {/* Step Content */}
      <div className="absolute flex flex-col inset-[0.5px] p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1.5">
            {icon}
            <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{title}</span>
          </div>
          {badge && (
            <span className={`font-medium text-[12px] leading-4 inline-flex items-center text-nowrap rounded-lg border px-[5px] py-px gap-x-1 pr-[6px] ${badge.bgColor || 'border-[#EEEFF1] bg-[#F4F5F6]'
              } ${badge.textColor || 'text-[#5C5E63]'
              } ${badge.borderColor || 'border-[#EEEFF1]'
              }`}>
              {badge.icon}
              <span>{badge.text}</span>
            </span>
          )}
        </div>
        <hr className="border-[#E6E7EA] mt-[11px] mb-[8px]" />
        <span className="font-medium text-[12px] leading-4 text-[#75777C]">{description}</span>
      </div>
    </div>
  );
};