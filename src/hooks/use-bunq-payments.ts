"use client";

import { useQuery } from "@tanstack/react-query";
import type { Payment } from "@/types/payment";
import type { ApiResponse } from "@/lib/bunq/types";

export interface PaymentWeek {
  week: number;
  payments: Payment[];
  amount: string;
}

function calculateWeeksDiff(paymentDate: Date): number {
  const today = new Date();
  const currentDay = today.getDay();
  const daysUntilMonday = (currentDay + 6) % 7;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysUntilMonday);
  lastMonday.setHours(0, 0, 0, 0);

  const paymentDateMidnight = new Date(paymentDate);
  paymentDateMidnight.setHours(0, 0, 0, 0);

  return Math.ceil(
    (lastMonday.getTime() - paymentDateMidnight.getTime()) /
      (1000 * 60 * 60 * 24 * 7)
  );
}

function splitToWeeks(payments: Payment[]): PaymentWeek[] {
  const map = new Map<number, Payment[]>();

  for (const payment of payments) {
    const week = calculateWeeksDiff(new Date(payment.created));
    const existing = map.get(week) || [];
    map.set(week, [...existing, payment]);
  }

  return Array.from(map).map(([week, payments]) => {
    let amount = 0;
    for (const p of payments) {
      const val = parseFloat(p.amount.value);
      if (val < 0) amount += val * -1;
    }
    return { week, payments, amount: amount.toFixed(2) };
  });
}

async function fetchPayments(accountId: number): Promise<Payment[]> {
  const res = await fetch(`/api/bunq/payments?accountId=${accountId}`);
  if (!res.ok) throw new Error("Failed to fetch payments");
  const data: ApiResponse<Payment[]> = await res.json();
  if (data.error) throw new Error(data.error.error_description);
  return (data.data || []).slice(0, 50);
}

export function useBunqPayments(accountId?: number) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["payments", accountId],
    queryFn: () => fetchPayments(accountId!),
    enabled: !!accountId,
    staleTime: 5 * 60 * 1000,
  });

  return { payments: splitToWeeks(data || []), isLoading, isFetching, error };
}
