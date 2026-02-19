"use client";

import { useState } from "react";
import { BalanceCard } from "./balance-card";
import { AccountInfoDialog } from "./account-info-dialog";
import type { MonetaryAccountBank } from "@/types/monetary-account";

interface BalanceViewProps {
  monetaryAccount?: MonetaryAccountBank;
}

export function BalanceView({ monetaryAccount }: BalanceViewProps) {
  const [showDialog, setShowDialog] = useState(false);

  const iban =
    monetaryAccount?.alias.find((a) => a.type === "IBAN")?.value ||
    "Keine IBAN vorhanden";

  return (
    <div className="flex justify-center px-4 pt-3">
      <BalanceCard
        balance={monetaryAccount?.balance.value}
        onInfoClick={() => setShowDialog(true)}
      />
      <AccountInfoDialog
        open={showDialog}
        iban={iban}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}
