import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "secondary"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-blue-450 text-white border-blue-450",
      success: "bg-green-primary text-white border-green-primary",
      warning: "bg-orange-500 text-white border-orange-500",
      error: "bg-red-500 text-white border-red-500",
      secondary: "bg-secondary-background text-secondary-foreground border-weak-stroke"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-[10px] border px-1.5 py-1 text-[10px] font-normal leading-[7px] tracking-normal transition-colors",
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }