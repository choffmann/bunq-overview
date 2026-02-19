"use client";

import { useState } from "react";
import { AppBar } from "@/components/layout/app-bar";
import { SideDrawer } from "@/components/layout/side-drawer";
import { BalanceView } from "@/components/balance/balance-view";
import { PaymentsList } from "@/components/payments/payments-list";
import { useBunqAccount } from "@/hooks/use-bunq-account";

export default function OverviewPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { monetaryAccount, isFetching } = useBunqAccount();

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">
      <AppBar
        title="Übersicht"
        variant="menu"
        onMenuClick={() => setDrawerOpen(true)}
        loading={isFetching}
      />
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1 flex flex-col max-w-screen-md mx-auto w-full min-h-0">
        {monetaryAccount && (
          <>
            <div className="shrink-0 pb-3">
              <BalanceView monetaryAccount={monetaryAccount} />
            </div>
            <PaymentsList accountId={monetaryAccount.id} />
          </>
        )}
      </main>
    </div>
  );
}
