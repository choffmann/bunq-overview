"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Loader2, Search, X } from "lucide-react";
import { useBunqPayments, type PaymentWeek } from "@/hooks/use-bunq-payments";
import { PaymentItem } from "./payment-item";
import { PaymentSkeleton } from "./payment-skeleton";
import { PaymentDetailDialog } from "./payment-detail-dialog";
import { MonthlySummary } from "@/components/balance/monthly-summary";
import type { Payment } from "@/types/payment";

interface PaymentsListProps {
  accountId?: number;
}

function formatRelativeWeek(week: number): string {
  if (week === 0) return "Diese Woche";
  if (week === 1) return "Letzte Woche";
  return `Vor ${week} Wochen`;
}

export function PaymentsList({ accountId }: PaymentsListProps) {
  const { payments, allPayments, monthly, isLoading, isFetching, loadMore, hasMore } =
    useBunqPayments(accountId);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const handleCloseSearch = () => {
    setSearch("");
    setSearchOpen(false);
  };

  const filteredWeeks = useMemo(() => {
    if (!search.trim()) return payments;

    const q = search.toLowerCase();
    return payments
      .map((group: PaymentWeek) => ({
        ...group,
        payments: group.payments.filter((p) => {
          const name = p.counterparty_alias?.display_name?.toLowerCase() || "";
          const desc = p.description?.toLowerCase() || "";
          const amount = p.amount.value;
          return name.includes(q) || desc.includes(q) || amount.includes(q);
        }),
      }))
      .filter((group) => group.payments.length > 0);
  }, [payments, search]);

  if (isLoading) return <PaymentSkeleton />;

  if (!allPayments || allPayments.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <p className="text-sm text-[var(--text-tertiary)]">
          Keine Einträge vorhanden
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Monthly summary */}
      <div className="shrink-0 pb-3">
        <MonthlySummary summary={monthly} />
      </div>

      {/* Section header: Zahlungen + search toggle */}
      <div className="shrink-0 flex items-center justify-between px-4 pb-2">
        <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[var(--text-tertiary)]">
          Zahlungen
        </p>
        <button
          onClick={() => searchOpen ? handleCloseSearch() : setSearchOpen(true)}
          className="p-1.5 -mr-1 rounded-xl hover:bg-[var(--gold-muted)] transition-colors duration-200 cursor-pointer"
          aria-label={searchOpen ? "Suche schließen" : "Suche öffnen"}
        >
          {searchOpen ? (
            <X size={15} className="text-[var(--text-tertiary)]" />
          ) : (
            <Search size={15} className="text-[var(--text-tertiary)]" />
          )}
        </button>
      </div>

      {/* Collapsible search */}
      <div
        className={`shrink-0 overflow-hidden transition-all duration-250 ease-out ${
          searchOpen ? "max-h-12 opacity-100 mb-1" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4">
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, Beschreibung oder Betrag..."
            className="w-full h-9 px-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Payments */}
      <div className="flex-1 overflow-auto scrollbar-none">
        {filteredWeeks.map((group: PaymentWeek) => (
          <div key={group.week}>
            {/* Week subheader */}
            <div className="sticky top-0 z-10 glass border-b border-[var(--border)]">
              <div className="flex justify-between items-center px-4 py-2 max-w-screen-md mx-auto">
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
                <PaymentItem
                  key={payment.id}
                  payment={payment}
                  index={i}
                  onClick={() => setSelectedPayment(payment)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Load more */}
        {hasMore && !search && (
          <div className="flex justify-center py-5 pb-8">
            <button
              onClick={loadMore}
              disabled={isFetching}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border-subtle)] text-[12px] font-semibold text-[var(--text-secondary)] hover:bg-[var(--gold-muted)] hover:border-gold/20 active:scale-[0.97] transition-all duration-200 shadow-[var(--shadow-sm)] cursor-pointer"
            >
              {isFetching ? (
                <Loader2 size={14} className="animate-spin text-gold" />
              ) : (
                <ChevronDown size={14} className="text-gold" />
              )}
              Mehr laden
            </button>
          </div>
        )}

        {/* Search empty state */}
        {search && filteredWeeks.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <p className="text-[13px] text-[var(--text-tertiary)]">
              Keine Ergebnisse für &ldquo;{search}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Detail dialog */}
      <PaymentDetailDialog
        payment={selectedPayment}
        open={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  );
}
