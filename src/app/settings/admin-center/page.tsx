"use client";

import { RotateCcw } from "lucide-react";
import { useNotify } from "@/components/providers/notification-provider";

export default function AdminCenterPage() {
  const notify = useNotify();

  const handleResetTokens = async () => {
    try {
      const res = await fetch("/api/bunq/admin/reset-tokens", { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      notify("Tokens wurden erfolgreich zurückgesetzt");
    } catch {
      notify("Fehler beim Zurücksetzen der Tokens");
    }
  };

  const handleResetSession = async () => {
    try {
      const res = await fetch("/api/bunq/admin/reset-session", { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      notify("Session wurde erfolgreich zurückgesetzt");
    } catch {
      notify("Fehler beim Zurücksetzen der Session");
    }
  };

  return (
    <div className="py-4 animate-fade-in-up">
      <div className="px-4 mb-2">
        <h3 className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--text-tertiary)]">
          Aktionen
        </h3>
      </div>
      <div className="mx-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)]">
        <button
          onClick={handleResetTokens}
          className="flex items-center w-full px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150"
        >
          <RotateCcw size={18} strokeWidth={1.5} className="mr-3.5 text-gold" />
          <span className="text-[13px] font-medium">Tokens zurücksetzen</span>
        </button>
        <div className="h-px bg-[var(--border)] mx-4" />
        <button
          onClick={handleResetSession}
          className="flex items-center w-full px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150"
        >
          <RotateCcw size={18} strokeWidth={1.5} className="mr-3.5 text-gold" />
          <span className="text-[13px] font-medium">Session zurücksetzen</span>
        </button>
      </div>
    </div>
  );
}
