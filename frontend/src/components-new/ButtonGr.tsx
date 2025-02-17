import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const ButtonGr = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", size = "md", variant = "primary", children, ...props },
    ref
  ) => {
    const baseStyles = "rounded-full font-medium ";

    const sizes: Record<ButtonSize, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2 text-base",
      lg: "px-8 py-3 text-base",
    };

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md ",
      secondary:
        "border border-gray-200 text-gray-700 hover:border-purple-300 transition-colors",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonGr.displayName = "ButtonGr";

export default ButtonGr;
