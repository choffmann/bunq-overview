"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, Trash2 } from "lucide-react";
import { AccountInfo } from "@/components/account/account-info";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="animate-fade-in-up">
      <AccountInfo />

      <div className="mx-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150"
        >
          <LogOut size={18} strokeWidth={1.5} className="mr-3.5 text-[var(--text-tertiary)]" />
          <span className="text-[13px] font-medium">Abmelden</span>
        </button>

        <div className="h-px bg-[var(--border)] mx-4" />

        <button
          onClick={() => setShowDeleteDialog(true)}
          className="flex items-center w-full px-4 py-3.5 hover:bg-[var(--negative)]/5 transition-colors duration-150"
        >
          <Trash2 size={18} strokeWidth={1.5} className="mr-3.5 text-[var(--negative)]" />
          <span className="text-[13px] font-medium text-[var(--negative)]">
            Account löschen
          </span>
        </button>
      </div>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Account löschen"
        actions={
          <>
            <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
              Abbrechen
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteDialog(false)}>
              <Trash2 size={14} />
              Löschen
            </Button>
          </>
        }
      >
        <p className="text-[13px] text-[var(--text-secondary)]">
          Möchtest du dein Account wirklich löschen? Diese Aktion kann nicht
          rückgängig gemacht werden.
        </p>
      </Dialog>
    </div>
  );
}
