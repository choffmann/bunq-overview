"use client";

import { useSession } from "next-auth/react";

export function AccountInfo() {
  const { data: session } = useSession();

  const initial = session?.user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold overflow-hidden shadow-[var(--shadow-md)]">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full balance-card flex items-center justify-center text-white">
            <span className="relative z-10">{initial}</span>
          </div>
        )}
      </div>
      <h2 className="font-display text-lg font-semibold mt-3 tracking-tight">
        {session?.user?.name || "Benutzer"}
      </h2>
      <p className="text-[12px] text-[var(--text-tertiary)]">
        {session?.user?.email}
      </p>
    </div>
  );
}
