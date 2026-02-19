"use client";

import { useQuery } from "@tanstack/react-query";
import type { MonetaryAccountBank } from "@/types/monetary-account";
import type { ApiResponse } from "@/lib/bunq/types";

async function fetchAccount(): Promise<MonetaryAccountBank> {
  const res = await fetch("/api/bunq/account");
  if (!res.ok) throw new Error("Failed to fetch account");
  const data: ApiResponse<MonetaryAccountBank> = await res.json();
  if (data.error) throw new Error(data.error.error_description);
  return data.data!;
}

export function useBunqAccount() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["monetaryBankAccount"],
    queryFn: fetchAccount,
    staleTime: 5 * 60 * 1000,
  });

  return { monetaryAccount: data, isLoading, isFetching, error };
}
