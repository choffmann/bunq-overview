"use client";

import { Menu, ChevronLeft } from "lucide-react";

interface AppBarProps {
  title: string;
  variant?: "menu" | "back";
  onMenuClick: () => void;
  loading?: boolean;
}

export function AppBar({
  title,
  variant = "menu",
  onMenuClick,
  loading = false,
}: AppBarProps) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-[var(--border)]">
      <div className="flex items-center h-14 px-4 max-w-screen-md mx-auto">
        <button
          onClick={onMenuClick}
          className="mr-3 p-2 -ml-2 rounded-xl hover:bg-[var(--gold-muted)] active:scale-95 transition-all duration-200"
          aria-label={variant === "menu" ? "Menu" : "Back"}
        >
          {variant === "menu" ? (
            <Menu size={20} strokeWidth={1.5} className="text-[var(--text-secondary)]" />
          ) : (
            <ChevronLeft size={20} strokeWidth={1.5} className="text-[var(--text-secondary)]" />
          )}
        </button>
        <h1 className="text-base font-semibold tracking-tight truncate flex-1 font-display">
          {title}
        </h1>
      </div>
      {loading && (
        <div className="h-[2px] w-full overflow-hidden">
          <div className="h-full w-1/4 bg-gold rounded-full animate-loading-bar" />
        </div>
      )}
    </header>
  );
}
