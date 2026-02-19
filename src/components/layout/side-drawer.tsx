"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutList,
  Settings,
  LogOut,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SideDrawer({ open, onClose }: SideDrawerProps) {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    onClose();
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-[var(--card)] border-r border-[var(--border)] shadow-[var(--shadow-lg)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* User header */}
        <div className="p-5 pb-4">
          <div className="flex items-center justify-between mb-5">
            <div className="w-11 h-11 rounded-full balance-card flex items-center justify-center text-sm font-bold text-white shadow-[var(--shadow-sm)]">
              <span className="relative z-10">
                {session?.user?.name?.charAt(0)?.toUpperCase() || "?"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-xl hover:bg-[var(--gold-muted)] transition-all duration-200"
            >
              <X size={16} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
            </button>
          </div>
          <p className="text-sm font-semibold truncate">
            {session?.user?.name || "Benutzer"}
          </p>
          <p className="text-[11px] text-[var(--text-tertiary)] truncate mt-0.5">
            {session?.user?.email}
          </p>
        </div>

        <div className="h-px bg-[var(--border)] mx-4" />

        {/* Navigation */}
        <nav className="p-3 space-y-0.5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--gold-muted)] transition-all duration-200 active:scale-[0.98]"
          >
            <LayoutList size={18} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
            <span className="text-[13px] font-medium">Übersicht</span>
          </Link>
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--gold-muted)] transition-all duration-200 active:scale-[0.98]"
          >
            <Settings size={18} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
            <span className="text-[13px] font-medium">Einstellungen</span>
          </Link>

          <div className="h-px bg-[var(--border)] !my-2.5" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--negative)]/8 transition-all duration-200 active:scale-[0.98] w-full text-left"
          >
            <LogOut size={18} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
            <span className="text-[13px] font-medium">Abmelden</span>
          </button>
        </nav>

        {/* Theme toggle at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[var(--border)]">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--gold-muted)] transition-all duration-200 w-full"
          >
            {theme === "dark" ? (
              <Sun size={18} strokeWidth={1.5} className="text-gold" />
            ) : (
              <Moon size={18} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
            )}
            <span className="text-[13px] font-medium flex-1 text-left">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
            <div
              className={`w-9 h-5 rounded-full transition-colors duration-200 ${
                theme === "dark" ? "bg-gold" : "bg-[var(--border)]"
              } relative`}
            >
              <div
                className={`absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  theme === "dark" ? "translate-x-[17px]" : "translate-x-[3px]"
                }`}
              />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
