import {
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  forwardRef,
} from "react";

const baseCampo =
  "w-full rounded-lg border border-white/10 bg-base-800 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-neon/60 focus:ring-1 focus:ring-neon/40";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rotulo?: string;
}

/** Campo de texto rotulado e reutilizável. */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ rotulo, id, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {rotulo && (
          <label htmlFor={id} className="text-xs font-medium text-white/60">
            {rotulo}
          </label>
        )}
        <input ref={ref} id={id} className={`${baseCampo} ${className}`} {...props} />
      </div>
    );
  },
);
Input.displayName = "Input";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  rotulo?: string;
}

/** Campo de seleção rotulado e reutilizável. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ rotulo, id, className = "", children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {rotulo && (
          <label htmlFor={id} className="text-xs font-medium text-white/60">
            {rotulo}
          </label>
        )}
        <select ref={ref} id={id} className={`${baseCampo} ${className}`} {...props}>
          {children}
        </select>
      </div>
    );
  },
);
Select.displayName = "Select";
