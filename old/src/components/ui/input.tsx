import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11.5 w-full rounded-[10px] border border-[#D3D8DF] bg-white-100 px-[13px] py-[10px] text-base text-secondary-foreground placeholder:text-black-700 transition-all duration-300 ease-out hover:border-[#B8BFC9] hover:shadow-[0px_1px_4px_rgba(56,62,71,0.1)] focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }