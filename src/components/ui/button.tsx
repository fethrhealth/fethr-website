import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 rounded-[10px] border",
  {
    variants: {
      variant: {
        primary: "bg-blue-450 text-white border-blue-450 hover:bg-[#1e5ed1] hover:border-[#1e5ed1] active:bg-[#1a54c1] active:duration-50",
        secondary: "bg-transparent text-primary-foreground border-weak-stroke hover:bg-secondary-background hover:border-strong-stroke active:bg-[#f5f5f5] active:duration-50",
        outline: "bg-transparent text-primary-foreground border-weak-stroke hover:bg-secondary-background hover:border-strong-stroke active:bg-[#f5f5f5] active:duration-50",
        ghost: "bg-transparent text-primary-foreground hover:bg-secondary-background active:bg-[#f5f5f5] active:duration-50 border-transparent",
        custom: "bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-border)] hover:bg-[var(--btn-bg-hover)] hover:border-[var(--btn-border-hover)] active:bg-[var(--btn-bg-active)] active:duration-50"
      },
      size: {
        default: "h-9 px-3 text-button gap-x-1.5",
        sm: "h-8 px-2.5 text-sm gap-x-1",
        lg: "h-11.5 px-3.5 text-base gap-x-2",
        navbar: "h-9 px-3 gap-x-1.5"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  colors?: {
    bg: string
    text: string
    border: string
    bgHover: string
    borderHover: string
    bgActive: string
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, colors, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Apply navbar button font styling and custom colors
    const customStyle = {
      ...(size === 'navbar' && {
        fontFamily: '"Inter", "Inter Fallback"',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
      }),
      ...(colors && variant === 'custom' && {
        '--btn-bg': colors.bg,
        '--btn-text': colors.text,
        '--btn-border': colors.border,
        '--btn-bg-hover': colors.bgHover,
        '--btn-border-hover': colors.borderHover,
        '--btn-bg-active': colors.bgActive,
      }),
      ...style
    } as React.CSSProperties

    return (
      <Comp
        className={cn(buttonVariants({ variant: colors ? 'custom' : variant, size, className }))}
        style={customStyle}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }