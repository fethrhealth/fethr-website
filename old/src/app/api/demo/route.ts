import { NextRequest, NextResponse } from 'next/server'
import { DemoFormData } from '@/types'

const ATTIO_API_URL = process.env.ATTIO_API_URL || 'https://api.attio.com'
const ATTIO_API_KEY = process.env.ATTIO_API_KEY

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data: DemoFormData = await request.json()

    // Validate input
    if (!data.email || !data.name) {
      return NextResponse.json(
        { success: false, error: 'Email and name are required' },
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
            first_name: data.name.split(' ')[0],
            last_name: data.name.split(' ').slice(1).join(' ') || '',
            ...(data.company && { company_name: data.company }),
            tags: ['fethr-demo-request'],
            notes: `Demo request from Fethr website at ${new Date().toISOString()}${data.message ? `\n\nMessage: ${data.message}` : ''}`
          }
        }
      }),
    })

    // Handle Attio API response
    if (!attioResponse.ok) {
      const errorData = await attioResponse.json().catch(() => ({}))
      console.error('Attio API error:', errorData)
      
      return NextResponse.json({
        success: false,
        error: 'Failed to submit demo request. Please try again.'
      }, { status: 500 })
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Demo request submitted successfully! We\'ll contact you within 24 hours.'
    })

  } catch (error) {
    console.error('Demo API error:', error)
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