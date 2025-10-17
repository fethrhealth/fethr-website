'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui'
import { useWaitlist } from '@/hooks/use-waitlist'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const { isLoading, message, isSuccess, error, submitForm, reset } = useWaitlist()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission
    await submitForm({ email })
  }

  // Reset form after successful submission
  React.useEffect(() => {
    if (isSuccess) {
      setEmail('')
      // Reset the success state after 1 second
      const timer = setTimeout(() => {
        reset()
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isSuccess, reset])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error || message) {
      reset()
    }
  }

  // Envelope icon matching Attio's structure
  const envelopeIcon = (
    <svg height="14px" width="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )

  return (
    <div className="flex items-center justify-center mt-6 w-full">
      {/* Desktop Form - Fixed height container with absolute error positioning */}
      <div className="hidden sm:block relative" style={{ height: '34px' }}>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2.5"
          noValidate
        >
          <Input
            type="email"
            placeholder="Enter your work email address"
            value={email}
            onChange={handleEmailChange}
            disabled={isLoading || isSuccess}
            icon={envelopeIcon}
            realTimeValidation={true}
            containerClassName="w-[300px] h-[34px]"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 button-primary h-[34px] gap-x-1.5 rounded-[10px] px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: '"Inter", "Inter Fallback"',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px'
            }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                </svg>
                Joining...
              </>
            ) : isSuccess ? (
              'Joined!'
            ) : (
              'Join Waitlist'
            )}
          </button>
        </form>

        {/* Error message positioned absolutely outside of form flow */}
        {error && (
          <div
            className="absolute left-0 text-sm whitespace-nowrap"
            style={{
              top: '42px',
              color: 'rgb(246, 83, 81)'
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Mobile Form */}
      <div className="flex w-full max-w-xs flex-col gap-2 sm:hidden">
        <form onSubmit={handleSubmit} noValidate>
          <Input
            type="email"
            placeholder="Enter your work email address"
            value={email}
            onChange={handleEmailChange}
            disabled={isLoading || isSuccess}
            icon={envelopeIcon}
            realTimeValidation={true}
          />

          {error && (
            <div className="text-sm mt-2" style={{ color: 'rgb(246, 83, 81)' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-400 ease-in-out hover:duration-150 active:duration-50 button-primary h-11.5 gap-x-2 rounded-[10px] px-3.5 text-base w-full mt-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                </svg>
                Joining...
              </>
            ) : isSuccess ? (
              'Joined Waitlist!'
            ) : (
              'Join Waitlist'
            )}
          </button>
        </form>
      </div>

      {/* Success Messages */}
      {(message && !error) && (
        <div className="w-full max-w-xs mt-2 absolute top-full left-1/2 transform -translate-x-1/2">
          <p className="text-sm text-green-primary text-center">{message}</p>
        </div>
      )}
    </div>
  )
}