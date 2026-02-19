"use client";

import { useBunqPayments, type PaymentWeek } from "@/hooks/use-bunq-payments";
import { PaymentItem } from "./payment-item";
import { PaymentSkeleton } from "./payment-skeleton";

interface PaymentsListProps {
  accountId?: number;
}

function formatRelativeWeek(week: number): string {
  if (week === 0) return "Diese Woche";
  if (week === 1) return "Letzte Woche";
  return `Vor ${week} Wochen`;
}

export function PaymentsList({ accountId }: PaymentsListProps) {
  const { payments, isLoading } = useBunqPayments(accountId);

  if (isLoading) return <PaymentSkeleton />;

  if (!payments || payments.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <p className="text-sm text-[var(--text-tertiary)]">
          Keine Einträge vorhanden
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto scrollbar-none">
      {payments.map((group: PaymentWeek) => (
        <div key={group.week}>
          {/* Week subheader */}
          <div className="sticky top-0 z-10 glass border-b border-[var(--border)]">
            <div className="flex justify-between items-center px-4 py-2.5 max-w-screen-md mx-auto">
              <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[var(--text-tertiary)]">
                {formatRelativeWeek(group.week)}
              </span>
              <span className="text-[11px] font-semibold tabular-nums text-gold">
                {group.amount} €
              </span>
            </div>
          </div>

          {/* Payment items */}
          <div>
            {group.payments.map((payment, i) => (
              <PaymentItem key={payment.id} payment={payment} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
