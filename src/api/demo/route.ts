import { NextRequest, NextResponse } from 'next/server';
import { validateDemoFormData, sanitizeString, sanitizeEmail } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { fullName, workEmail, companySize, howCanWeHelp } = body;

    // Validate input
    const errors = validateDemoFormData({ fullName, workEmail, companySize, howCanWeHelp });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please fix the form errors',
          errors 
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      fullName: sanitizeString(fullName),
      workEmail: sanitizeEmail(workEmail),
      companySize: sanitizeString(companySize),
      howCanWeHelp: sanitizeString(howCanWeHelp)
    };

    // TODO: Replace this with your CRM integration
    // For now, just log the data and return success
    console.log('Demo form submission:', {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    });

    /*
    // Example: Future CRM integration might look like this:
    
    const crmResponse = await fetch('https://api.yourcrm.com/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRM_API_KEY}`
      },
      body: JSON.stringify({
        name: sanitizedData.fullName,
        email: sanitizedData.workEmail,
        company_size: sanitizedData.companySize,
        message: sanitizedData.howCanWeHelp,
        source: 'website_demo_form',
        tags: ['demo_request', 'website_lead']
      })
    });

    if (!crmResponse.ok) {
      throw new Error('Failed to submit to CRM');
    }
    */

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Thanks! We\'ll be in touch soon to schedule your demo.',
      data: {
        submittedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Demo form API error:', error);
    
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