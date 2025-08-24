'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { DemoFormData, FormErrors } from '@/types';
import { validateDemoFormData, hasValidationErrors } from '@/lib/validations';

interface DemoFormProps {
  className?: string;
}

const companySizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-1,000 employees',
  '1,000+ employees'
];

export function DemoForm({ className }: DemoFormProps) {
  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    workEmail: '',
    companySize: '',
    howCanWeHelp: ''
  });

  const [errors, setErrors] = useState<FormErrors<DemoFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (field: keyof DemoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateDemoFormData(formData);
    setErrors(validationErrors);
    
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          throw new Error(data.error || 'Something went wrong');
        }
        return;
      }

      // Success!
      setIsSubmitted(true);
    } catch (error) {
      console.error('Demo form submission error:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show success state
  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <Typography variant="title" weight="bold" className="text-green-900 mb-2">
          Thank you for your interest!
        </Typography>
        <Typography variant="body" className="text-green-700">
          We'll be in touch soon to schedule your demo and discuss how FethrHealth can help your organization.
        </Typography>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={errors.fullName}
          disabled={isLoading}
          size="lg"
        />

        {/* Work Email */}
        <Input
          label="Work Email"
          type="email"
          placeholder="Enter your work email address"
          value={formData.workEmail}
          onChange={(e) => handleInputChange('workEmail', e.target.value)}
          error={errors.workEmail}
          disabled={isLoading}
          size="lg"
        />

        {/* Company Size */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Company Size
          </label>
          <select
            value={formData.companySize}
            onChange={(e) => handleInputChange('companySize', e.target.value)}
            disabled={isLoading}
            className={`w-full h-12 px-4 text-base rounded-md border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.companySize
                ? 'border-red-500 focus-visible:ring-red-500'
                : 'border-neutral-300 bg-white text-foreground focus-visible:ring-primary-500 hover:border-neutral-400 focus:border-primary-500'
            }`}
          >
            <option value="">Select company size</option>
            {companySizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.companySize && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.companySize}
            </p>
          )}
        </div>

        {/* How Can We Help */}
        <Textarea
          label="How can we help?"
          placeholder="Tell us about your documentation needs, current challenges, or what you'd like to see in a demo..."
          value={formData.howCanWeHelp}
          onChange={(e) => handleInputChange('howCanWeHelp', e.target.value)}
          error={errors.howCanWeHelp}
          disabled={isLoading}
          size="lg"
          rows={4}
        />

        {/* Submit Error */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <Typography variant="body" className="text-red-700">
              {submitError}
            </Typography>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? 'Submitting...' : 'Request Demo'}
        </Button>

        {/* Privacy note */}
        <Typography variant="detail" textColor="muted" className="text-center">
          We'll only use this information to contact you about your demo request.
          By submitting, you agree to our{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700 underline">
            Privacy Policy
          </a>
          .
        </Typography>
      </form>
    </div>
  );
}