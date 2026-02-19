"use client";

import { Info } from "lucide-react";

interface BalanceCardProps {
  balance?: string;
  onInfoClick: () => void;
}

export function BalanceCard({ balance, onInfoClick }: BalanceCardProps) {
  if (!balance) {
    return (
      <div className="w-full max-w-sm h-[160px] rounded-2xl animate-shimmer" />
    );
  }

  return (
    <div className="balance-card w-full max-w-sm rounded-2xl p-7 text-white shadow-[var(--shadow-lg)] animate-fade-in-up">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
            Kontostand
          </p>
          <button
            onClick={onInfoClick}
            className="p-1.5 -m-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
            aria-label="Kontoinformationen"
          >
            <Info size={16} className="text-white/30" />
          </button>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="font-display text-[42px] font-bold tracking-tight leading-none">
            {balance}
          </p>
          <span className="text-base font-normal text-white/30">EUR</span>
        </div>
        {/* Gold accent divider */}
        <div className="mt-6 h-px bg-gradient-to-r from-gold/25 via-gold/10 to-transparent" />
      </div>
    </div>
  );
}
