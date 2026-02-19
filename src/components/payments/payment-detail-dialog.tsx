"use client";

import { Dialog } from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Payment } from "@/types/payment";

interface PaymentDetailDialogProps {
  payment: Payment | null;
  open: boolean;
  onClose: () => void;
}

const fullDateFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function DetailRow({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex justify-between items-start gap-3 py-2.5 border-b border-[var(--border-subtle)] last:border-b-0">
      <span className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--text-tertiary)] shrink-0 pt-0.5">
        {label}
      </span>
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-[13px] text-right truncate">
          {value}
        </span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="p-1 rounded-lg hover:bg-[var(--gold-muted)] transition-colors shrink-0"
          >
            {copied ? (
              <Check size={12} className="text-[var(--positive)]" />
            ) : (
              <Copy size={12} className="text-[var(--text-tertiary)]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function PaymentDetailDialog({ payment, open, onClose }: PaymentDetailDialogProps) {
  if (!payment) return null;

  const amount = parseFloat(payment.amount.value);
  const isPositive = amount >= 0;
  const avatarImage = payment.counterparty_alias?.avatar?.image?.[0]?.urls?.[0]?.url;
  const initial = payment.counterparty_alias?.display_name?.charAt(0)?.toUpperCase() || "?";

  return (
    <Dialog open={open} onClose={onClose} title="Zahlungsdetails">
      {/* Header with avatar + amount */}
      <div className="flex items-center gap-4 mb-5">
        {avatarImage ? (
          <img
            src={avatarImage}
            alt=""
            className="w-12 h-12 rounded-full object-cover ring-1 ring-[var(--border)]"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-sm font-semibold text-[var(--text-tertiary)] ring-1 ring-[var(--border)]">
            {initial}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-display text-[15px] font-semibold truncate">
            {payment.counterparty_alias?.display_name}
          </p>
          <p
            className={`font-display text-[22px] font-bold tracking-tight ${
              isPositive ? "text-[var(--positive)]" : "text-[var(--text-primary)]"
            }`}
          >
            {isPositive ? "+" : ""}{payment.amount.value} €
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-xl bg-[var(--bg-secondary)] p-3.5">
        <DetailRow label="Datum" value={fullDateFormat.format(new Date(payment.created))} />
        <DetailRow label="Beschreibung" value={payment.description || "—"} />
        {payment.counterparty_alias?.iban && (
          <DetailRow label="IBAN" value={payment.counterparty_alias.iban} copyable />
        )}
        <DetailRow label="Typ" value={payment.type} />
        {payment.sub_type && (
          <DetailRow label="Sub-Typ" value={payment.sub_type} />
        )}
        {payment.balance_after_mutation && (
          <DetailRow
            label="Saldo danach"
            value={`${payment.balance_after_mutation.value} €`}
          />
        )}
      </div>
    </Dialog>
  );
}
