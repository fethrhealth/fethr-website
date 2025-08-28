'use client'

import React, { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { useWaitlist } from '@/hooks/use-waitlist'
import { Loader2 } from 'lucide-react'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const { isLoading, message, isSuccess, error, submitForm, reset } = useWaitlist()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitForm({ email })
    if (isSuccess) {
      setEmail('')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error || message) {
      reset()
    }
  }

  return (
    <div className="flex items-center justify-center gap-y-2 max-md:flex-col max-md:items-center mt-6 w-full gap-x-2">
      {/* Desktop Form */}
      <form 
        onSubmit={handleSubmit}
        className="hidden md:flex items-center gap-x-2"
      >
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading || isSuccess}
          className={`w-80 ${error ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-300' : ''} ${isSuccess ? 'border-green-primary focus-visible:border-green-primary focus-visible:ring-green-300' : ''}`}
        />
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isLoading || !email.trim() || isSuccess}
          className="whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Joining...
            </>
          ) : isSuccess ? (
            'Joined!'
          ) : (
            'Join Waitlist'
          )}
        </Button>
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
          onChange={handleEmailChange}
          disabled={isLoading || isSuccess}
          className={`${error ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-300' : ''} ${isSuccess ? 'border-green-primary focus-visible:border-green-primary focus-visible:ring-green-300' : ''}`}
        />
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          disabled={isLoading || !email.trim() || isSuccess}
          className="relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin opacity-100 transition-opacity duration-150" />
            )}
          </div>
          <span className={`transition-opacity duration-150 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {isSuccess ? 'Joined Waitlist!' : 'Join Waitlist'}
          </span>
        </Button>
      </form>

      {/* Status Messages */}
      {(message || error) && (
        <div className="w-full max-w-xs mt-2 md:mt-0 md:absolute md:top-full md:left-1/2 md:transform md:-translate-x-1/2">
          {message && (
            <p className="text-sm text-green-primary text-center">{message}</p>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
        </div>
      )}
    </div>
  )
}