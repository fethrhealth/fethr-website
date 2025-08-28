import type { Metadata } from 'next';
import { Typography } from '@/components/ui/typography';
import { DemoForm } from '@/components/forms/demo-form';

export const metadata: Metadata = {
  title: 'Request a Demo - FethrHealth',
  description: 'See how FethrHealth can transform your healthcare documentation. Schedule a personalized demo with our team.',
  openGraph: {
    title: 'Request a Demo - FethrHealth',
    description: 'See how FethrHealth can transform your healthcare documentation. Schedule a personalized demo with our team.',
    type: 'website',
  },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Typography 
            variant="display" 
            weight="bold" 
            as="h1" 
            className="mb-6"
          >
            See FethrHealth in action
          </Typography>
          <Typography 
            variant="bodyLarge" 
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover how our intelligent documentation platform can streamline your healthcare workflows 
            and improve patient outcomes. Schedule a personalized demo with our team.
          </Typography>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 lg:p-12">
            <div className="text-center mb-8">
              <Typography variant="title" weight="bold" className="mb-3">
                Request Your Demo
              </Typography>
              <Typography variant="body" className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours to schedule your personalized demo.
              </Typography>
            </div>

            <DemoForm />
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Typography variant="subheading" weight="bold">
                30-Minute Demo
              </Typography>
              <Typography variant="body" className="text-gray-600">
                Quick, focused session tailored to your specific use case and requirements.
              </Typography>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <Typography variant="subheading" weight="bold">
                Expert Guidance
              </Typography>
              <Typography variant="body" className="text-gray-600">
                Our healthcare documentation specialists will guide you through the platform.
              </Typography>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <Typography variant="subheading" weight="bold">
                Custom Solutions
              </Typography>
              <Typography variant="body" className="text-gray-600">
                See how FethrHealth can be configured for your specific workflow needs.
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}