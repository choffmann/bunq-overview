"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { Payment } from "@/types/payment";
import type { ApiResponse } from "@/lib/bunq/types";

export interface PaymentWeek {
  week: number;
  payments: Payment[];
  amount: string;
}

export interface MonthlySummary {
  income: number;
  expenses: number;
  net: number;
  transactionCount: number;
  month: string;
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

function calculateMonthlySummary(payments: Payment[]): MonthlySummary {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthFormatter = new Intl.DateTimeFormat("de-DE", {
    month: "long",
    year: "numeric",
  });

  const thisMonthPayments = payments.filter((p) => {
    const d = new Date(p.created);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  let income = 0;
  let expenses = 0;

  for (const p of thisMonthPayments) {
    const val = parseFloat(p.amount.value);
    if (val >= 0) income += val;
    else expenses += Math.abs(val);
  }

  return {
    income,
    expenses,
    net: income - expenses,
    transactionCount: thisMonthPayments.length,
    month: monthFormatter.format(now),
  };
}

async function fetchPayments(accountId: number, count: number): Promise<Payment[]> {
  const res = await fetch(`/api/bunq/payments?accountId=${accountId}&count=${count}`);
  if (!res.ok) throw new Error("Failed to fetch payments");
  const data: ApiResponse<Payment[]> = await res.json();
  if (data.error) throw new Error(data.error.error_description);
  return data.data || [];
}

export function useBunqPayments(accountId?: number) {
  const [count, setCount] = useState(50);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["payments", accountId, count],
    queryFn: () => fetchPayments(accountId!, count),
    enabled: !!accountId,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const allPayments = data || [];

  const weeks = useMemo(() => splitToWeeks(allPayments), [allPayments]);
  const monthly = useMemo(() => calculateMonthlySummary(allPayments), [allPayments]);

  const loadMore = () => setCount((prev) => prev + 50);
  const hasMore = allPayments.length === count;

  return {
    payments: weeks,
    allPayments,
    monthly,
    isLoading,
    isFetching,
    error,
    loadMore,
    hasMore,
  };
}
