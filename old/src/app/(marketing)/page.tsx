import type { Metadata } from 'next';
import { HeroSection } from '@/components/marketing/hero-section';

export const metadata: Metadata = {
  title: 'FethrHealth - Intelligent Healthcare Documentation',
  description: 'Create beautiful, AI-optimized healthcare documentation that automatically adapts to your users and drives conversion',
  keywords: ['healthcare', 'documentation', 'AI', 'medical', 'docs', 'intelligent', 'platform'],
  openGraph: {
    title: 'FethrHealth - Intelligent Healthcare Documentation',
    description: 'Create beautiful, AI-optimized healthcare documentation that automatically adapts to your users and drives conversion',
    type: 'website',
    siteName: 'FethrHealth',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FethrHealth - Intelligent Healthcare Documentation',
    description: 'Create beautiful, AI-optimized healthcare documentation that automatically adapts to your users and drives conversion',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      {/* Add more sections here as needed:
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      */}
    </>
  );
}