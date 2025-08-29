import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  button?: {
    text: string
    onClick: () => void
    disabled?: boolean
    loading?: boolean
  }
  error?: string
  focusColor?: 'primary' | 'error' | string
  containerClassName?: string
  realTimeValidation?: boolean
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, button, error, focusColor = 'primary', containerClassName, realTimeValidation = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isValid, setIsValid] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    
    const getValidationState = (value: string) => {
      if (!realTimeValidation || !hasValue) return 'default'
      if (type === 'email') {
        return EMAIL_REGEX.test(value) ? 'valid' : 'invalid'
      }
      return 'default'
    }

    const validationState = getValidationState(props.value as string || '')

    const getBoxShadow = () => {
      if (error) return 'rgb(255, 184, 184) 0px 0px 0px 1px'
      if (validationState === 'invalid') return 'rgb(255, 184, 184) 0px 0px 0px 1px'
      if (validationState === 'valid') return 'rgb(38, 109, 240) 0px 0px 0px 1px'
      if (isFocused) return 'rgb(38, 109, 240) 0px 0px 0px 1px'
      return 'rgb(238, 239, 241) 0px 0px 0px 1px inset'
    }

    const getBorderColor = () => {
      if (error || validationState === 'invalid') return 'rgb(246, 83, 81)'
      return 'transparent'
    }

    const inputElement = (
      <div 
        className={cn(
          "relative inline-flex flex-1 flex-row items-center gap-1.5 transition-all",
          button ? "h-[34px] min-h-[34px]" : "h-11.5",
          containerClassName
        )}
        style={{
          borderRadius: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          boxShadow: getBoxShadow(),
          transitionDuration: '140ms',
          fontFamily: 'Inter',
          letterSpacing: '-0.02em',
          fontWeight: 500,
          lineHeight: '20px',
          fontSize: '14px',
          color: 'rgb(92, 94, 99)'
        }}
        data-size={button ? "34" : "46"}
        data-state={error || validationState === 'invalid' ? 'error' : validationState === 'valid' ? 'valid' : isFocused ? 'focused' : 'default'}
        data-readonly="false"
        data-prefix={!!icon}
        data-suffix={!!button}
        data-focused={isFocused}
      >
        {/* Icon container */}
        {icon && (
          <label 
            htmlFor={props.id}
            className="flex items-center justify-center flex-shrink-0"
          >
            <span aria-hidden="true" className="text-black-400 flex items-center">
              {icon}
            </span>
          </label>
        )}
        
        {/* Input field */}
        <input
          type={type}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0)
            if (realTimeValidation && type === 'email') {
              setIsValid(EMAIL_REGEX.test(e.target.value))
            }
            props.onChange?.(e)
          }}
          className={cn(
            "flex-1 bg-transparent outline-none border-none text-base text-secondary-foreground placeholder:text-black-700 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          style={{
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            fontWeight: 'inherit',
            letterSpacing: 'inherit',
            color: 'inherit'
          }}
          {...props}
        />
        
        {/* Integrated button */}
        {button && (
          <button
            type="submit"
            disabled={button.disabled || button.loading}
            onClick={button.onClick}
            className={cn(
              "flex-shrink-0 px-2 py-1 rounded-[8px] text-sm font-medium transition-all duration-200 ease-out",
              "bg-black-100 text-white border border-black-100",
              "hover:bg-black-200 hover:border-black-200", 
              "active:bg-black-300 active:border-black-300 active:duration-50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200",
              "min-w-fit whitespace-nowrap"
            )}
            style={{
              fontFamily: '"Inter", "Inter Fallback"',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              backgroundColor: button.disabled ? '#9ca3af' : '#1c1d1f'
            }}
          >
            {button.loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                </svg>
                <span className="text-xs">Loading...</span>
              </div>
            ) : (
              button.text
            )}
          </button>
        )}
      </div>
    )

    // Wrap in form if it has a button
    if (button) {
      return (
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            button.onClick()
          }}
          className="w-full"
        >
          {inputElement}
          {error && (
            <div className="mt-2 text-sm" style={{ color: 'rgb(246, 83, 81)' }}>
              {error}
            </div>
          )}
        </form>
      )
    }

    return (
      <>
        {inputElement}
        {error && (
          <div className="mt-2 text-sm" style={{ color: 'rgb(246, 83, 81)' }}>
            {error}
          </div>
        )}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }