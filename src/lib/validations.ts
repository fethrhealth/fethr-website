import { WaitlistData, DemoFormData, FormErrors } from '@/types';

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return emailRegex.test(email.trim());
}

/**
 * Validate waitlist form data
 */
export function validateWaitlistData(data: WaitlistData): FormErrors<WaitlistData> {
  const errors: FormErrors<WaitlistData> = {};

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  return errors;
}

/**
 * Validate demo form data
 */
export function validateDemoFormData(data: DemoFormData): FormErrors<DemoFormData> {
  const errors: FormErrors<DemoFormData> = {};

  // Full name validation
  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  // Work email validation
  if (!data.workEmail || !data.workEmail.trim()) {
    errors.workEmail = 'Work email is required';
  } else if (!isValidEmail(data.workEmail)) {
    errors.workEmail = 'Please enter a valid email address';
  }

  // Company size validation
  if (!data.companySize || !data.companySize.trim()) {
    errors.companySize = 'Company size is required';
  }

  // How can we help validation
  if (!data.howCanWeHelp || !data.howCanWeHelp.trim()) {
    errors.howCanWeHelp = 'Please tell us how we can help';
  } else if (data.howCanWeHelp.trim().length < 10) {
    errors.howCanWeHelp = 'Please provide more details (at least 10 characters)';
  }

  return errors;
}

/**
 * Check if form has any validation errors
 */
export function hasValidationErrors<T>(errors: FormErrors<T>): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Sanitize string input (basic XSS prevention)
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML chars
    .substring(0, 1000); // Limit length
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  return email
    .trim()
    .toLowerCase()
    .substring(0, 254); // RFC 5321 email length limit
}