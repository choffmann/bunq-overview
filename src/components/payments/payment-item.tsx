"use client";

import type { Payment } from "@/types/payment";

interface PaymentItemProps {
  payment: Payment;
  index?: number;
}

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "short",
});

export function PaymentItem({ payment, index = 0 }: PaymentItemProps) {
  const avatarImage =
    payment.counterparty_alias?.avatar?.image?.[0]?.urls?.[0]?.url;
  const amount = parseFloat(payment.amount.value);
  const isPositive = amount >= 0;
  const initial =
    payment.counterparty_alias?.display_name?.charAt(0)?.toUpperCase() || "?";

  const staggerClass = index < 8 ? `stagger-${index + 1}` : "";

  return (
    <div
      className={`flex items-center gap-3.5 px-4 py-3.5 hover:bg-[var(--gold-muted)] transition-colors duration-150 animate-fade-in-up ${staggerClass} border-b border-[var(--border-subtle)] last:border-b-0`}
    >
      {/* Avatar */}
      {avatarImage ? (
        <img
          src={avatarImage}
          alt=""
          className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[var(--border)]"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-xs font-semibold shrink-0 text-[var(--text-tertiary)] ring-1 ring-[var(--border)]">
          {initial}
        </div>
      )}

      {/* Name + Date */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium truncate leading-tight">
          {payment.counterparty_alias?.display_name}
        </p>
        <p className="text-[11px] text-[var(--text-tertiary)] mt-1">
          {dateFormat.format(new Date(payment.created))}
        </p>
      </div>

      {/* Amount */}
      <span
        className={`text-[13px] font-semibold tabular-nums whitespace-nowrap ${
          isPositive
            ? "text-[var(--positive)]"
            : "text-[var(--text-primary)]"
        }`}
      >
        {isPositive ? "+" : ""}
        {payment.amount.value} €
      </span>
    </div>
  );
}
