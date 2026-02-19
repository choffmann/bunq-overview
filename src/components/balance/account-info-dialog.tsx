"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const BUNQ_BIC = "BUNQDE82XXX";

interface AccountInfoDialogProps {
  open: boolean;
  iban: string;
  onClose: () => void;
}

export function AccountInfoDialog({
  open,
  iban,
  onClose,
}: AccountInfoDialogProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} title="Kontoinformationen">
      <div className="space-y-3">
        <div className="rounded-xl bg-[var(--bg-secondary)] p-4 border border-[var(--border)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)] mb-2 font-semibold">
            IBAN
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-sm tracking-wider">{iban}</p>
            <button
              onClick={() => copyToClipboard(iban, "iban")}
              className="p-2 rounded-lg hover:bg-[var(--gold-muted)] transition-colors duration-200 shrink-0"
            >
              {copied === "iban" ? (
                <Check size={14} className="text-[var(--positive)]" />
              ) : (
                <Copy size={14} className="text-[var(--text-tertiary)]" />
              )}
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-[var(--bg-secondary)] p-4 border border-[var(--border)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)] mb-2 font-semibold">
            BIC
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-sm tracking-wider">{BUNQ_BIC}</p>
            <button
              onClick={() => copyToClipboard(BUNQ_BIC, "bic")}
              className="p-2 rounded-lg hover:bg-[var(--gold-muted)] transition-colors duration-200 shrink-0"
            >
              {copied === "bic" ? (
                <Check size={14} className="text-[var(--positive)]" />
              ) : (
                <Copy size={14} className="text-[var(--text-tertiary)]" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button variant="ghost" onClick={onClose}>
          Schließen
        </Button>
      </div>
    </Dialog>
  );
}
