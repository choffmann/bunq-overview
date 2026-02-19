"use client";

import { X } from "lucide-react";

interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

export function Toast({ message, open, onClose }: ToastProps) {
  if (!open) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 animate-slide-up-toast">
      <div className="flex items-center gap-3 rounded-2xl bg-[var(--card)] px-5 py-3.5 shadow-[var(--shadow-lg)] border border-[var(--border)]">
        <span className="text-[13px]">{message}</span>
        <button
          onClick={onClose}
          className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 shrink-0"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
