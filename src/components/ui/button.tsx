import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'google'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const variants = {
      primary: 'bg-primary text-white hover:bg-blue-700 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95',
      secondary: 'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 active:scale-95',
      outline: 'border-2 border-primary text-primary hover:bg-blue-50 bg-transparent active:scale-95',
      ghost: 'text-gray-600 hover:bg-gray-100 bg-transparent',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20 hover:shadow-lg active:scale-95',
      google: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow active:scale-95'
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs font-bold',
      md: 'px-6 py-3 text-sm font-bold',
      lg: 'px-10 py-4 text-base font-extrabold tracking-tight',
      icon: 'h-10 w-10 p-2'
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-50 disabled:pointer-events-none gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
