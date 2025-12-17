import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const buttonVariants = ({ variant = "primary", size = "md" }: { variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive", size?: "sm" | "md" | "lg" } = {}) => {
    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg",
        secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md",
        outline: "border-2 border-primary text-primary hover:bg-primary/10",
        ghost: "text-foreground/80 hover:text-primary hover:bg-primary/5",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
    };

    return cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95",
        variants[variant],
        sizes[size]
    );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    buttonVariants({ variant, size }),
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
