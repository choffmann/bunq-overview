import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  children: ReactNode;
}

const variants = {
  primary: "btn-gold",
  outline:
    "border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--gold-muted)] hover:border-[var(--text-tertiary)]",
  ghost: "text-[var(--text-primary)] hover:bg-[var(--gold-muted)]",
  danger: "bg-[var(--negative)] text-white hover:brightness-110 shadow-sm",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
