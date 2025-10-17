'use client'

import React from 'react';

interface WorkflowConnectorProps {
  type: 'vertical' | 'horizontal' | 'branch-left' | 'branch-right' | 'branch-down';
  status: 'inactive' | 'active';
  label?: string;
  height?: number;
  width?: number;
  animate?: boolean;
  delay?: number;

}

export const WorkflowConnector: React.FC<WorkflowConnectorProps> = ({
  type,
  status,
  label,
  height = 71,
  width = 12,
  animate = false,
  delay
}) => {
  const getConnectorPath = () => {
    const [isVisible, setIsVisible] = React.useState(false);


    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, (delay || 0) * 2000); // Convert delay to milliseconds (0.5s intervals)

      return () => clearTimeout(timer);
    }, [delay]);

    switch (type) {
      case 'vertical':
        return (
          <svg className="-translate-x-1/2 absolute top-0 left-0 col-start-5 row-start-2 row-end-2 h-[71px] w-3" viewBox="0 0 12 71" fill="none" style={{ opacity: isVisible ? 1 : 0, }}>
            <path d="M6 8 L6 35 L6 65" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round"></path>
            {status === 'active' && (
              <path d="M6 8 L6 65" stroke="#54D490" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                {animate && (
                  <>
                    <animate
                      attributeName="stroke-dasharray"
                      values="0,60;60,0"
                      dur="0.5s"
                      fill="freeze"
                      begin="0s"
                    />
                    <animate
                      attributeName="stroke"
                      values="#D1D3D6;#54D490"
                      dur="0.5s"
                      fill="freeze"
                      begin="0s"
                    />
                  </>
                )}
              </path>
            )}
            <path d="M6 66L1 61" stroke={status === 'active' ? '#54D490' : '#D1D3D6'} strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M6 66L11 61" stroke={status === 'active' ? '#54D490' : '#D1D3D6'} strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        );

      case 'branch-left':
        return (
          <div className="absolute top-0 left-0 col-start-2 col-end-5 row-start-6 row-end-7 h-full w-full">
            <svg className="h-full w-full overflow-visible" fill="none">
              <g strokeWidth="1px">
                <path d="M 328 8 L 328 44 L 21 44 A 21 21 0 0 0 0 65 L 0 83" stroke="#D1D3D6"></path>
                <path d="M-5 78 L0 83" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M5 78 L0 83" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
            {label && (
              <span className="font-medium text-[12px] leading-4 inline-flex items-center text-nowrap rounded-lg border px-[5px] py-px -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 border-[#EEEFF1] bg-[#F4F5F6] text-[#5C5E63]">
                {label}
              </span>
            )}
          </div>
        );

      case 'branch-right':
        return (
          <div className="absolute top-0 left-0 col-start-5 col-end-8 row-start-6 row-end-7 h-full w-full">
            <svg className="h-full w-full overflow-visible" fill="none">
              <g strokeWidth="1px">
                <path d="M 0 44 L 307 44 A 21 21 0 0 1 328 65 L 328 83" stroke="#D1D3D6"></path>
                <path d="M 323 78  L 328 83" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M 333 78 L 328 83" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
            {label && (
              <span className="font-medium text-[12px] leading-4 inline-flex items-center text-nowrap rounded-lg border px-[5px] py-px -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 border-[#EEEFF1] bg-[#F4F5F6] text-[#5C5E63]">
                {label}
              </span>
            )}
          </div>
        );

      case 'branch-down':
        return (
          <div className="absolute top-0 left-0 col-start-5 col-end-6 row-start-6 row-end-7 h-full w-full">
            <svg className="-translate-x-1/2 absolute top-1/2 left-0 overflow-visible h-[44px] w-[12px]" viewBox="0 0 12 44" fill="none">
              <path d="M 6 1 L 6 38" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M 6 39 L 1 34" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M 6 39 L 11 34" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            {label && (
              <span className="font-medium text-[12px] leading-4 inline-flex items-center text-nowrap rounded-lg border px-[5px] py-px -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-0 border-[#EEEFF1] bg-[#F4F5F6] text-[#5C5E63]">
                {label}
              </span>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return getConnectorPath();
};