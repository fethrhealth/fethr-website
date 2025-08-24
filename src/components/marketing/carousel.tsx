'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Product docs',
    description: 'Interactive product documentation interface',
    image: '/images/carousel-1.webp', // Replace with your actual image
    icon: '📖'
  },
  {
    id: 2,
    title: 'API docs',
    description: 'Comprehensive API documentation',
    image: '/images/carousel-2.webp', // Replace with your actual image
    icon: '🔧'
  },
  {
    id: 3,
    title: 'Help center',
    description: 'Customer support documentation',
    image: '/images/carousel-3.webp', // Replace with your actual image
    icon: '❓'
  },
  {
    id: 4,
    title: 'Changelog',
    description: 'Product update announcements',
    image: '/images/carousel-4.webp', // Replace with your actual image
    icon: '📝'
  }
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(current => (current + 1) % carouselItems.length);
          return 0;
        }
        return prev + 1;
      });
    }, 100); // Update progress every 100ms (10 seconds total)

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  return (
    <div className="relative">
      {/* Main carousel container */}
      <div 
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background placeholder - shows when images are loading */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-6xl">
            {carouselItems[currentIndex].icon}
          </div>
        </div>

        {/* Carousel images */}
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={item.image}
              alt={`${item.title} - ${item.description}`}
              fill
              className="object-cover"
              priority={index === 0} // Only prioritize first image
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        ))}

        {/* Content overlay - similar to GitBook's floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top left floating card */}
          <div className="absolute left-4 top-4 rounded-lg bg-white/95 backdrop-blur-sm p-3 shadow-lg">
            <div className="h-2 w-20 rounded bg-primary-500 mb-2"></div>
            <div className="h-1.5 w-16 rounded bg-gray-300 mb-1"></div>
            <div className="h-1.5 w-12 rounded bg-gray-300"></div>
          </div>
          
          {/* Bottom right status indicator */}
          <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 backdrop-blur-sm p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-medium text-gray-700">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation indicators */}
      <div className="flex justify-center space-x-3 mt-6">
        {carouselItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleIndicatorClick(index)}
            className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white shadow-lg border border-gray-200 w-20 h-20' 
                : 'bg-gray-100 hover:bg-gray-200 w-12 h-12'
            }`}
            aria-label={`Go to ${item.title}`}
          >
            {/* Progress ring for active indicator */}
            {index === currentIndex && (
              <svg 
                className="absolute inset-0 w-full h-full -rotate-90" 
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="57"
                  stroke="rgb(243, 244, 245)"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="57"
                  stroke="rgba(38, 41, 48, 0.5)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="358.14"
                  strokeDashoffset={358.14 - (progress / 100) * 358.14}
                  strokeLinecap="round"
                  className="transition-all duration-100"
                />
              </svg>
            )}
            
            {/* Icon */}
            <div className={`text-2xl transition-all duration-300 ${
              index === currentIndex ? 'scale-100' : 'scale-75'
            }`}>
              {item.icon}
            </div>
            
            {/* Title tooltip for active item */}
            {index === currentIndex && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-1 shadow-lg border border-gray-200 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-700">
                  {item.title}
                </span>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}