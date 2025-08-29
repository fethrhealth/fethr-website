import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Typography variants optimized for ABCFavorit with theme support
// ABCFavorit has Regular (400) and ExtendedBold (700) weights
const typographyVariants = cva('', {
  variants: {
    variant: {
      // Display variants - using ABCFavorit ExtendedBold for impact
      display: 'font-sans text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl',
      
      // Headline variants - using ABCFavorit ExtendedBold for hierarchy
      headline: 'font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl',
      title: 'font-sans text-2xl font-bold leading-tight text-foreground md:text-3xl',
      subtitle: 'font-sans text-xl font-bold leading-snug text-foreground md:text-2xl',
      
      // Content variants - using ABCFavorit Regular for readability
      heading: 'font-sans text-lg font-normal leading-snug text-foreground',
      subheading: 'font-sans text-base font-normal leading-snug text-foreground',
      body: 'font-sans text-base font-normal leading-relaxed text-foreground',
      bodyLarge: 'font-sans text-lg font-normal leading-relaxed text-foreground',
      
      // Detail variants - using ABCFavorit Regular with theme-aware colors
      detail: 'font-sans text-sm font-normal leading-normal text-neutral-600 dark:text-neutral-400',
      caption: 'font-sans text-xs font-normal leading-normal text-neutral-500 dark:text-neutral-500',
      overline: 'font-sans text-xs font-normal leading-normal tracking-wide uppercase text-neutral-500 dark:text-neutral-500',
      
      // Interactive variants - strategic use of bold for emphasis with theme support
      link: 'font-sans text-base font-normal leading-relaxed text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline-offset-4 hover:underline',
      button: 'font-sans text-sm font-bold leading-none text-current',
      
      // Code variant - using Geist Mono with theme-aware background
      code: 'font-mono text-sm font-normal leading-normal bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-foreground',
      
      // Muted variant with theme support
      muted: 'font-sans text-sm font-normal leading-normal text-neutral-500 dark:text-neutral-500'
    },
    
    // Weight override - optimized for ABCFavorit's available weights
    weight: {
      normal: 'font-normal',  // ABCFavorit Regular (400)
      bold: 'font-bold'       // ABCFavorit ExtendedBold (700)
      // Note: removed medium/semibold since ABCFavorit only has 400 and 700
    },
    
    // Optional color override with theme support
    textColor: {
      default: '',
      muted: 'text-neutral-500 dark:text-neutral-500',
      subtle: 'text-neutral-600 dark:text-neutral-400', 
      primary: 'text-primary-600 dark:text-primary-400',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      white: 'text-white'
    }
  },
  defaultVariants: {
    variant: 'body',
    textColor: 'default'
  }
});

// Define the allowed HTML elements
type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'a' | 'button';

// Get the variant props but rename color to avoid conflict
type VariantPropsType = VariantProps<typeof typographyVariants>;

interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /**
   * Typography variant - semantic naming based on function
   */
  variant?: VariantPropsType['variant'];
  
  /**
   * Font weight override - optimized for ABCFavorit (normal=400, bold=700)
   */
  weight?: VariantPropsType['weight'];
  
  /**
   * Text color override (renamed from 'color' to avoid conflicts)
   */
  textColor?: VariantPropsType['textColor'];
  
  /**
   * The HTML element to render
   */
  as?: TypographyElement;
  
  /**
   * Whether the text should be truncated with ellipsis
   */
  truncate?: boolean;
  
  /**
   * Optional href for links (when as="a")
   */
  href?: string;
}

/**
 * Typography component - The immutable spine of your design system
 * 
 * Optimized for ABCFavorit fonts with full theme support:
 * - Regular (400): Body text, details, readable content
 * - ExtendedBold (700): Headlines, titles, emphasis
 * 
 * This component abstracts typography by FUNCTION rather than appearance.
 * Use semantic variant names like 'headline', 'body', 'detail' instead of 
 * appearance-based names like 'large', 'bold', 'gray'.
 * 
 * Theme Support: All variants automatically adapt to light/dark/classic-dark themes
 * 
 * @example
 * ```tsx
 * <Typography variant="headline" as="h1">Page Title</Typography>
 * <Typography variant="body">Regular paragraph text</Typography> 
 * <Typography variant="detail" textColor="muted">Supporting information</Typography>
 * <Typography variant="link" as="a" href="#">Link text</Typography>
 * <Typography variant="button" weight="bold">Call to Action</Typography>
 * ```
 */
export const Typography = forwardRef<any, TypographyProps>(
  ({ 
    variant, 
    weight,
    textColor,
    as: Component = 'p', 
    className, 
    truncate = false,
    children,
    href,
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({ variant, weight, textColor }),
          truncate && 'truncate',
          className
        )}
        href={href}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

// Export variant types for use in other components
export type TypographyVariant = VariantPropsType['variant'];
export type TypographyTextColor = VariantPropsType['textColor'];
export type TypographyWeight = VariantPropsType['weight'];
export { type TypographyElement };