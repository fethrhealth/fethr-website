import { NextRequest, NextResponse } from 'next/server'
import { WaitlistFormData } from '@/types'

const ATTIO_API_URL = process.env.ATTIO_API_URL || 'https://api.attio.com'
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

    // Submit to Attio CRM
    const attioResponse = await fetch(`${ATTIO_API_URL}/v2/objects/people/records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ATTIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [{ email_address: data.email }],
            tags: ['fethr-waitlist'],
            notes: `Waitlist signup from Fethr website at ${new Date().toISOString()}`
          }
        }
      }),
    })

    // Handle Attio API response
    if (!attioResponse.ok) {
      const errorData = await attioResponse.json().catch(() => ({}))
      console.error('Attio API error:', errorData)
      
      // Handle duplicate email
      if (attioResponse.status === 409) {
        return NextResponse.json({
          success: false,
          error: 'This email is already on our waitlist!'
        }, { status: 409 })
      }
      
      return NextResponse.json({
        success: false,
        error: 'Failed to join waitlist. Please try again.'
      }, { status: 500 })
    }

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