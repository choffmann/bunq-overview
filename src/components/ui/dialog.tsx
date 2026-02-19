"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function Dialog({ open, onClose, title, children, actions }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-[var(--card)] shadow-[var(--shadow-lg)] border border-[var(--border)] animate-scale-in overflow-hidden">
        {/* Gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="flex items-center justify-between p-5 pb-0">
          <h2 className="font-display text-base font-semibold tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 rounded-xl hover:bg-[var(--gold-muted)] transition-colors duration-200"
          >
            <X size={16} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {actions && (
          <div className="flex justify-end gap-2 px-5 pb-5">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
