"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Moon,
  Sun,
  Wrench,
  User,
  InfoIcon,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { AccountInfo } from "@/components/account/account-info";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const userId = (session as any)?.user?.id;
  const showAdmin = !!process.env.NEXT_PUBLIC_ADMIN_USER_ID
    ? userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID
    : true;

  return (
    <div className="animate-fade-in-up">
      <AccountInfo />

      <div className="mx-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)]">
        {/* Dark Mode */}
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150"
        >
          {theme === "dark" ? (
            <Sun size={18} strokeWidth={1.5} className="mr-3.5 text-gold" />
          ) : (
            <Moon size={18} strokeWidth={1.5} className="mr-3.5 text-[var(--text-tertiary)]" />
          )}
          <span className="text-[13px] font-medium flex-1 text-left">
            Dark Mode
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

        <div className="h-px bg-[var(--border)] mx-4" />

        <Link
          href="/settings/overview"
          className="flex items-center px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150"
        >
          <Wrench size={18} strokeWidth={1.5} className="mr-3.5 text-[var(--text-tertiary)]" />
          <span className="text-[13px] font-medium flex-1">Übersicht</span>
          <ChevronRight size={16} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
        </Link>

        <div className="h-px bg-[var(--border)] mx-4" />

        <Link
          href="/settings/profile"
          className="flex items-center px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150"
        >
          <User size={18} strokeWidth={1.5} className="mr-3.5 text-[var(--text-tertiary)]" />
          <span className="text-[13px] font-medium flex-1">Profil</span>
          <ChevronRight size={16} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
        </Link>

        <div className="h-px bg-[var(--border)] mx-4" />

        <Link
          href="/settings/info"
          className="flex items-center px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150"
        >
          <InfoIcon size={18} strokeWidth={1.5} className="mr-3.5 text-[var(--text-tertiary)]" />
          <span className="text-[13px] font-medium flex-1">Info</span>
          <ChevronRight size={16} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
        </Link>

        {showAdmin && (
          <>
            <div className="h-px bg-[var(--border)] mx-4" />
            <Link
              href="/settings/admin-center"
              className="flex items-center px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150"
            >
              <ShieldCheck size={18} strokeWidth={1.5} className="mr-3.5 text-gold" />
              <span className="text-[13px] font-medium flex-1">
                Admin Center
              </span>
              <ChevronRight size={16} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
            </Link>
          </>
        )}
      </div>

      {/* Version info */}
      <div className="flex flex-col items-center mt-8 mb-6 gap-1">
        <span className="text-[10px] text-[var(--text-tertiary)] tabular-nums">
          {process.env.NEXT_PUBLIC_COMMIT_HASH || "dev"} · {process.env.NEXT_PUBLIC_BRANCH || "local"}
        </span>
        <a
          href="https://github.com/choffmann/bunq-overview"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-[var(--text-tertiary)] hover:text-gold transition-colors duration-200"
        >
          github.com/choffmann/bunq-overview
        </a>
      </div>
    </div>
  );
}
