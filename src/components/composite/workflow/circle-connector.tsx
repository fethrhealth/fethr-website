'use client'

import React from 'react';

interface CircleConnectorProps {
    isMoving: boolean;
}

export const CircleConnector: React.FC<CircleConnectorProps> = ({ isMoving }) => {
    return (
        <div className="relative h-[71px] w-3">
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-3" viewBox="0 0 12 71" fill="none">
                {/* Static line */}
                <path d="M6 8 L6 65" stroke="#D1D3D6" strokeLinecap="round" strokeDasharray="4 4" />

                {/* Arrow */}
                <path d="M6 66L1 61" stroke="#D1D3D6" strokeLinecap="round" />
                <path d="M6 66L11 61" stroke="#D1D3D6" strokeLinecap="round" />

                {/* Animated circle */}
                {isMoving && (
                    <circle
                        cx="6"
                        cy="8"
                        r="3"
                        fill="#407FF2"
                        className="animate-moveDown"
                    >
                        <animateMotion
                            path="M0 0 L0 57"
                            dur="1s"
                            fill="freeze"
                        />
                    </circle>
                )}
            </svg>
            <style jsx>{`
        @keyframes moveDown {
          from { transform: translateY(0); }
          to { transform: translateY(57px); }
        }
        .animate-moveDown {
          animation: moveDown 1s linear forwards;
        }
      `}</style>
        </div>
    );
};
