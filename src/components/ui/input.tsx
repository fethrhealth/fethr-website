import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  // Base styles - always applied
  'w-full rounded-md border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
  {
    variants: {
      variant: {
        // Default - neutral styling with theme awareness
        default: 'border-neutral-300 bg-white text-foreground focus-visible:ring-primary-500 hover:border-neutral-400 focus:border-primary-500 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500 dark:focus:border-primary-400 dark:focus-visible:ring-primary-400',
        
        // Success state
        success: 'border-green-500 bg-white text-foreground focus-visible:ring-green-500 dark:bg-neutral-900',
        
        // Error state
        error: 'border-red-500 bg-white text-foreground focus-visible:ring-red-500 dark:bg-neutral-900'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm', 
        lg: 'h-12 px-4 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Error message to display below the input
   */
  error?: string;
  
  /**
   * Success message to display below the input
   */
  success?: string;
  
  /**
   * Loading state - shows spinner
   */
  loading?: boolean;
  
  /**
   * Label for the input field
   */
  label?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
}

/**
 * Input component with full theme support and validation states
 * 
 * Automatically adapts colors for light/dark/classic-dark themes.
 * Includes error/success states and loading indicators.
 * 
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" />
 * <Input variant="error" error="Please enter a valid email" />
 * <Input variant="success" success="Email looks good!" />
 * <Input loading label="Email Address" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    variant,
    size,
    error,
    success,
    loading = false,
    label,
    helperText,
    disabled,
    ...props 
  }, ref) => {
    // Determine variant based on error/success states
    const effectiveVariant = error ? 'error' : success ? 'success' : variant;
    
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            className={cn(
              inputVariants({ variant: effectiveVariant, size: size }),
              loading && 'pr-10', // Make room for spinner
              className
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div 
                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-50"
                role="status"
                aria-label="Loading"
              />
            </div>
          )}
        </div>
        
        {/* Helper text, success, or error message */}
        {(error || success || helperText) && (
          <div className="mt-1.5 text-sm">
            {error && (
              <p className="text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-green-600 dark:text-green-400">
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-neutral-600 dark:text-neutral-400">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Export types for use in other components
export type InputVariant = VariantProps<typeof inputVariants>['variant'];
export type InputSize = VariantProps<typeof inputVariants>['size'];