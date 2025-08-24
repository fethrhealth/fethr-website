import { NextRequest, NextResponse } from 'next/server';
import { validateWaitlistData, sanitizeEmail } from '@/lib/validations';
import { AttioPersonRecord } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { email } = body;

    // Validate input
    const errors = validateWaitlistData({ email });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: errors.email || 'Invalid input',
          errors 
        },
        { status: 400 }
      );
    }

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(email);

    // Check for Attio API key
    const attioApiKey = process.env.ATTIO_API_KEY;
    if (!attioApiKey) {
      console.error('ATTIO_API_KEY not configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Server configuration error' 
        },
        { status: 500 }
      );
    }

    // Prepare Attio API request
    const attioData: AttioPersonRecord = {
      data: {
        values: {
          name: '', // Leave name blank as requested
          email_addresses: [sanitizedEmail]
        }
      }
    };

    // Submit to Attio CRM
    const attioResponse = await fetch('https://api.attio.com/v2/objects/people/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${attioApiKey}`
      },
      body: JSON.stringify(attioData)
    });

    // Handle Attio response
    if (!attioResponse.ok) {
      const attioError = await attioResponse.text();
      console.error('Attio API error:', attioResponse.status, attioError);
      
      // Check for common error cases
      if (attioResponse.status === 401) {
        console.error('Attio API key is invalid');
        return NextResponse.json(
          { 
            success: false, 
            error: 'Authentication failed with CRM service' 
          },
          { status: 500 }
        );
      } else if (attioResponse.status === 409) {
        // Email might already exist - treat as success for user experience
        return NextResponse.json({
          success: true,
          message: 'Thanks! You\'re now on our waitlist.'
        });
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to submit to waitlist. Please try again.' 
          },
          { status: 500 }
        );
      }
    }

    // Success response
    const attioResult = await attioResponse.json();
    console.log('Attio success:', attioResult);

    return NextResponse.json({
      success: true,
      message: 'Thanks! You\'re now on our waitlist.',
      data: { email: sanitizedEmail }
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}