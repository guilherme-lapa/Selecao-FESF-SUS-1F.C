import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variante = "primario" | "secundario" | "fantasma" | "perigo";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

const estilosPorVariante: Record<Variante, string> = {
  primario:
    "bg-neon text-base-900 hover:bg-neon-soft shadow-glow font-semibold",
  secundario:
    "bg-base-600 text-white hover:bg-base-700 border border-white/10",
  fantasma: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
  perigo: "bg-accent text-white hover:bg-accent-soft",
};

/** Botão genérico com variantes visuais. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variante = "primario", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${estilosPorVariante[variante]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
