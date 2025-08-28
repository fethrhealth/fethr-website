import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoProps extends React.SVGAttributes<SVGElement> {
  size?: "sm" | "default" | "lg"
}

const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ className, size = "default", ...props }, ref) => {
    const sizes = {
      sm: "h-5 w-20",
      default: "h-6 w-24", 
      lg: "h-8 w-32"
    }

    return (
      <svg
        ref={ref}
        width="96"
        height="24"
        viewBox="0 0 96 24"
        fill="none"
        className={cn("text-primary-foreground", sizes[size], className)}
        {...props}
      >
        {/* F */}
        <path 
          d="M2 2h12v3H6v4h7v3H6v6H2V2Z" 
          fill="currentColor"
        />
        
        {/* e */}
        <path 
          d="M18 8c-3.5 0-6 2.5-6 6s2.5 6 6 6c2 0 3.8-1 4.8-2.5l-2.5-1.5c-0.6 0.8-1.4 1.2-2.3 1.2-1.7 0-3-1.3-3-3h8.2c0-3.5-2.4-6.2-5.2-6.2zm-2.8 4.8c0.3-1.5 1.5-2.5 2.8-2.5s2.5 1 2.8 2.5h-5.6z" 
          fill="currentColor"
        />
        
        {/* t */}
        <path 
          d="M32 5v3h-2v10h-3V8h-2V5h7z" 
          fill="currentColor"
        />
        
        {/* h */}
        <path 
          d="M36 2v16h3v-6c0-2 1.5-3.5 3.5-3.5S46 10 46 12v6h3V11c0-4-2.5-6.5-5.5-6.5-1.5 0-2.8 0.7-3.5 1.8V2h-4z" 
          fill="currentColor"
        />
        
        {/* r */}
        <path 
          d="M54 8.5v2.2c0.8-1.2 2.2-2 3.8-2 0.3 0 0.6 0 0.9 0.1v3.4c-0.4-0.1-0.8-0.2-1.2-0.2-2.2 0-3.5 1.8-3.5 4V18H51V8.5h3z" 
          fill="currentColor"
        />

        {/* Geometric accent - inspired by your favicon */}
        <circle 
          cx="68" 
          cy="12" 
          r="8" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
        <path 
          d="M65 9l2 2 4-4" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    )
  }
)
Logo.displayName = "Logo"

export { Logo }