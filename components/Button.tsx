import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className,disabled, type="button", ...props }, ref)=>{
    return (
        <button
            ref={ref}
            className={twMerge(`w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 transition text-black font-bold hover:opacity-75` , className)}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </button>)
})
 
Button.displayName = 'Button';

export default Button;