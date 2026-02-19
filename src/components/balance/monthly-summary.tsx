"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import type { MonthlySummary as MonthlySummaryType } from "@/hooks/use-bunq-payments";

interface MonthlySummaryProps {
  summary: MonthlySummaryType;
}

export function MonthlySummary({ summary }: MonthlySummaryProps) {
  const formatAmount = (val: number) =>
    val.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="animate-fade-in-up stagger-2 px-4">
      <div className="rounded-2xl bg-[var(--card)] border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] p-4">
        {/* Month label */}
        <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[var(--text-tertiary)] mb-3">
          {summary.month} &middot; {summary.transactionCount} Bewegungen
        </p>

        {/* Income / Expenses row */}
        <div className="flex items-center gap-3">
          {/* Income */}
          <div className="flex-1 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--positive)]/10 flex items-center justify-center shrink-0">
              <TrendingUp size={14} className="text-[var(--positive)]" />
            </div>
            <div>
              <p className="text-[11px] text-[var(--text-tertiary)] leading-none mb-1">Einnahmen</p>
              <p className="font-display text-[16px] font-bold tracking-tight leading-none text-[var(--positive)]">
                +{formatAmount(summary.income)}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-9 bg-[var(--border-subtle)]" />

          {/* Expenses */}
          <div className="flex-1 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--negative)]/10 flex items-center justify-center shrink-0">
              <TrendingDown size={14} className="text-[var(--negative)]" />
            </div>
            <div>
              <p className="text-[11px] text-[var(--text-tertiary)] leading-none mb-1">Ausgaben</p>
              <p className="font-display text-[16px] font-bold tracking-tight leading-none text-[var(--negative)]">
                -{formatAmount(summary.expenses)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
