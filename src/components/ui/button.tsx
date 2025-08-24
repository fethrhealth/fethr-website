import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles - always applied
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary - uses your theme primary colors
        primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300',
        
        // Secondary - neutral background with theme awareness
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:ring-neutral-400',
        
        // Outline - bordered button with theme colors
        outline: 'border border-primary-500 bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950 dark:focus-visible:ring-primary-400',
        
        // Ghost - minimal button with theme hover states
        ghost: 'text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-400',
        
        // Destructive - error/delete actions with theme support
        destructive: 'bg-error text-white hover:bg-red-600 focus-visible:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700',
        
        // Success - positive actions
        success: 'bg-success text-white hover:bg-green-600 focus-visible:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700',
        
        // Warning - caution actions
        warning: 'bg-warning text-white hover:bg-yellow-600 focus-visible:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700'
      },
      size: {
        sm: 'h-8 px-4 text-xs rounded-md',      // Increased from px-3
        md: 'h-10 px-6 text-sm rounded-md',     // Increased from px-4 
        lg: 'h-12 px-8 text-base rounded-lg',   // Increased from px-6
        xl: 'h-14 px-10 text-lg rounded-lg'     // Increased from px-8
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a child element (for complex button content)
   */
  asChild?: boolean;
  
  /**
   * Show loading spinner and disable interaction
   */
  loading?: boolean;
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;
}

/**
 * Button component with full theme support and accessibility features
 * 
 * Automatically adapts colors for light/dark/classic-dark themes.
 * Uses your design system's primary colors and semantic colors.
 * 
 * @example
 * ```tsx
 * <Button>Default Primary</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="outline" size="lg">Large Outline</Button>
 * <Button loading>Loading...</Button>
 * <Button leftIcon={<PlusIcon />}>Add Item</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div 
            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            role="status"
            aria-label="Loading"
          />
        )}
        {leftIcon && !loading && <span className="mr-2 flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

// Export types for use in other components
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];