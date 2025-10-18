import React from 'react';
import Footer from '@/components/composite/footer';
import RedefineHero from '@/components/composite/redefine/redefine-hero';
import RedefineManifesto from '@/components/composite/redefine/redefine-manifesto';

export const metadata = {
  title: 'Redefining Healthcare Interoperability | Fethr Health',
  description: 'Healthcare deserves better than yesterday\'s interfaces. This is the nervous system of modern care.',
};

export default function RedefinePage() {
  return (
    <main className="min-h-screen bg-white">
      <RedefineHero />
      <RedefineManifesto />
      <Footer />
    </main>
  );
}