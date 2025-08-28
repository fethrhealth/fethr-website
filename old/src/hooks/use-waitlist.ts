import { useState } from 'react'
import { submitToWaitlist, handleApiError } from '@/lib/api'
import { validateEmail } from '@/lib/utils'
import { WaitlistFormData } from '@/types'

export function useWaitlist() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const submitForm = async (data: WaitlistFormData) => {
    // Reset previous states
    setError('')
    setMessage('')
    setIsSuccess(false)

    // Validate email
    if (!data.email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(data.email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const result = await submitToWaitlist(data)
      
      if (result.success) {
        setIsSuccess(true)
        setMessage(result.message || 'Successfully joined the waitlist!')
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setMessage('')
    setIsSuccess(false)
    setError('')
  }

  return {
    isLoading,
    message,
    isSuccess,
    error,
    submitForm,
    reset
  }
}