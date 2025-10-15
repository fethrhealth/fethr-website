import { NextRequest, NextResponse } from 'next/server'
import { WaitlistFormData } from '@/types'

const ATTIO_API_URL = process.env.ATTIO_API_URL
const ATTIO_API_KEY = process.env.ATTIO_API_KEY

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data: WaitlistFormData = await request.json()

    // Validate input
    if (!data.email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if Attio API key is configured
    if (!ATTIO_API_KEY) {
      console.error('Attio API key not configured')
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Submit to Attio CRM - Correct payload structure from Postman
    const attioPayload = {
      data: {
        values: {
          email_addresses: [data.email]
        }
      }
    }

    console.log('Sending to Attio:', JSON.stringify(attioPayload, null, 2))

    const attioResponse = await fetch(`${ATTIO_API_URL}/v2/objects/people/records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ATTIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attioPayload),
    })

    // Handle Attio API response
    if (!attioResponse.ok) {
      const errorText = await attioResponse.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      console.error('Attio API error:', {
        status: attioResponse.status,
        statusText: attioResponse.statusText,
        error: errorData
      })
      
      // Handle uniqueness conflict (person already exists) - treat as success
      if (attioResponse.status === 400 && errorData?.code === 'uniqueness_conflict') {
        console.log('Email already exists in Attio, treating as success')
        return NextResponse.json({
          success: true,
          message: 'You\'re already on our waitlist! We\'ll be in touch soon.'
        })
      }
      
      // Handle other 409 conflicts
      if (attioResponse.status === 409 || errorText.includes('already exists')) {
        return NextResponse.json({
          success: true,
          message: 'You\'re already on our waitlist! We\'ll be in touch soon.'
        })
      }
      
      // Handle validation errors
      if (attioResponse.status === 400) {
        return NextResponse.json({
          success: false,
          error: errorData?.message || 'Invalid email format'
        }, { status: 400 })
      }
      
      return NextResponse.json({
        success: false,
        error: 'Failed to join waitlist. Please try again.'
      }, { status: 500 })
    }

    const result = await attioResponse.json()
    console.log('Attio success response:', result)

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist! We\'ll be in touch soon.'
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}