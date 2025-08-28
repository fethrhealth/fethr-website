'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface WaitlistSignupProps {
  className?: string;
}

export function WaitlistSignup({ className }: WaitlistSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    
    if (!validateEmail(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage({ 
        type: 'success', 
        text: 'Thanks! You\'re now on our waitlist.' 
      });
      setEmail(''); // Clear the form on success
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-y-2 max-md:flex-col max-md:items-center mt-6 w-full gap-x-2 ${className}`}>
      {/* Desktop Form */}
      <form 
        onSubmit={handleSubmit} 
        className="hidden md:flex items-center gap-x-2"
      >
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (message) setMessage(null); // Clear message on input change
          }}
          className={`w-80 ${message?.type === 'error' ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-300' : ''} ${message?.type === 'success' ? 'border-green-primary focus-visible:border-green-primary focus-visible:ring-green-300' : ''}`}
          disabled={isLoading}
          aria-label="Email address for waitlist"
        />
        
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 rounded-[10px] bg-blue-450 text-white border border-blue-450 hover:bg-[#1e5ed1] hover:border-[#1e5ed1] active:bg-[#1a54c1] active:duration-50 h-9 px-3 text-button gap-x-1.5 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <div 
                className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                role="status"
                aria-label="Loading"
              />
              Joining...
            </>
          ) : (
            'Join Waitlist'
          )}
        </button>
      </form>

      {/* Mobile Form */}
      <form 
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col gap-2 md:hidden"
      >
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (message) setMessage(null); // Clear message on input change
          }}
          className={`${message?.type === 'error' ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-300' : ''} ${message?.type === 'success' ? 'border-green-primary focus-visible:border-green-primary focus-visible:ring-green-300' : ''}`}
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 rounded-[10px] bg-blue-450 text-white border border-blue-450 hover:bg-[#1e5ed1] hover:border-[#1e5ed1] active:bg-[#1a54c1] active:duration-50 h-11.5 px-3.5 text-base gap-x-2 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {isLoading && (
              <div 
                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-100 transition-opacity duration-150"
                role="status"
                aria-label="Loading"
              />
            )}
          </div>
          <span className={`transition-opacity duration-150 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            Join Waitlist
          </span>
        </button>
      </form>

      {/* Status Messages */}
      {message && (
        <div className="w-full max-w-xs mt-2 md:mt-0 md:absolute md:top-full md:left-1/2 md:transform md:-translate-x-1/2">
          <p className={`text-sm text-center ${
            message.type === 'error' ? 'text-red-500' : 'text-green-primary'
          }`}>
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
}