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
      console.error('Waitlist signup error:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant={message?.type === 'error' ? 'error' : 'default'}
            size="lg"
            disabled={isLoading}
            className="w-full"
            aria-label="Email address for waitlist"
          />
        </div>
        
        {/* Plain button with inline styles to ensure visibility */}
        <button
          type="submit"
          disabled={isLoading}
          className="sm:flex-shrink-0 min-w-[140px] inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 text-base"
          style={{
            backgroundColor: 'rgb(48, 127, 152)', // Your primary color
            color: 'white',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'rgb(42, 111, 133)'; // Darker shade for hover
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'rgb(48, 127, 152)'; // Back to normal
            }
          }}
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
            <>
              Join waitlist
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>
      
      {/* Status message */}
      {message && (
        <div className={`mt-3 text-sm ${
          message.type === 'error' 
            ? 'text-red-600' 
            : 'text-green-600'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}