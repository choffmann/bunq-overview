"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/components/layout/app-bar";
import { SideDrawer } from "@/components/layout/side-drawer";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar
        title="Einstellungen"
        variant="back"
        onMenuClick={() => router.back()}
      />
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1 max-w-screen-md mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
