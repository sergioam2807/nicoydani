import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * "Hoja de estilos Tailwind" reutilizable: define las variantes una vez
 * aquí y úsalas como <Button variant="accent" size="lg" /> en cualquier
 * parte de la app. Cambiar esta definición actualiza todos los botones.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 rounded-full disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500",
  {
    variants: {
      variant: {
        primary: "bg-brand-600 text-paper hover:bg-brand-700",
        accent: "bg-accent-500 text-paper hover:bg-accent-600",
        outline:
          "border border-brand-400 text-brand-700 hover:bg-brand-50 bg-transparent",
        ghost: "text-brand-700 hover:bg-brand-50 bg-transparent",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";
