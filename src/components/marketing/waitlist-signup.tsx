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
    
    console.log('🎯 FRONTEND: Form submitted with email:', email);
    
    if (!email.trim()) {
      console.log('❌ FRONTEND: Empty email validation failed');
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    
    if (!validateEmail(email)) {
      console.log('❌ FRONTEND: Email validation failed');
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    console.log('✅ FRONTEND: Validation passed, making API call');
    setIsLoading(true);
    setMessage(null);

    try {
      console.log('🚀 FRONTEND: Calling fetch to /api/waitlist');
      console.log('🚀 FRONTEND: Request body:', JSON.stringify({ email }));
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📊 FRONTEND: Response received');
      console.log('📊 FRONTEND: Response status:', response.status);
      console.log('📊 FRONTEND: Response ok:', response.ok);
      console.log('📊 FRONTEND: Response url:', response.url);

      const responseText = await response.text();
      console.log('📄 FRONTEND: Raw response text:', responseText);
      console.log('📄 FRONTEND: Response length:', responseText.length);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ FRONTEND: Parsed JSON data:', data);
      } catch (parseError) {
        console.error('💥 FRONTEND: JSON parse error:', parseError);
        console.error('💥 FRONTEND: Text that failed to parse:', responseText);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        console.error('❌ FRONTEND: Response not ok:', response.status, data);
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('🎉 FRONTEND: Success! Setting success message');
      setMessage({ 
        type: 'success', 
        text: 'Thanks! You\'re now on our waitlist.' 
      });
      setEmail(''); // Clear the form on success
      
    } catch (error) {
      console.error('💥 FRONTEND: Catch block - error occurred:', error);
      console.error('💥 FRONTEND: Error type:', typeof error);
      console.error('💥 FRONTEND: Error message:', error instanceof Error ? error.message : 'Unknown error');
      
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Something went wrong. Please try again.' 
      });
    } finally {
      console.log('🏁 FRONTEND: Finally block - setting loading to false');
      setIsLoading(false);
    }
  };

  console.log('🔄 FRONTEND: WaitlistSignup component rendering, current state:', { 
    email, 
    isLoading, 
    message: message?.type 
  });

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              console.log('📝 FRONTEND: Email input changed to:', e.target.value);
              setEmail(e.target.value);
            }}
            variant={message?.type === 'error' ? 'error' : 'default'}
            size="lg"
            disabled={isLoading}
            className="w-full"
            aria-label="Email address for waitlist"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="sm:flex-shrink-0 min-w-[140px] inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 text-base"
          style={{
            backgroundColor: 'rgb(48, 127, 152)',
            color: 'white',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'rgb(42, 111, 133)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'rgb(48, 127, 152)';
            }
          }}
          onClick={() => console.log('🖱️  FRONTEND: Button clicked!')}
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