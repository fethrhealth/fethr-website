import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoProps extends React.SVGAttributes<SVGElement> {
  size?: "sm" | "default" | "lg"
  label?: string
}

const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ className, size = "default", label = "fethr", ...props }, ref) => {
    const sizes = {
      sm: "h-5 w-20",
      default: "h-6 w-24",
      lg: "h-8 w-32",
    } as const

    return (
      <svg
        ref={ref}
        viewBox="0 0 420 120"
        fill="none"
        className={cn("text-primary-foreground", sizes[size], className)}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <text
          x="0"
          y="92"
          fill="currentColor"
          fontSize="100"
          style={{
            fontFamily:
              'Inter, "SF Pro Display", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
            fontWeight: 900,
            letterSpacing: "-2px",
          }}
        >
          fethr
        </text>
      </svg>
    )
  }
)

Logo.displayName = "Logo"

export { Logo }