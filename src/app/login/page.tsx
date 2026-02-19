"use client";

import { signIn } from "next-auth/react";
import { Shield } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-5 py-8 relative overflow-hidden">
      {/* Atmospheric gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="login-orb-1 absolute -top-[25%] -right-[15%] w-[550px] h-[550px] rounded-full bg-gold/[0.07] blur-[150px]" />
        <div className="login-orb-2 absolute -bottom-[20%] -left-[15%] w-[450px] h-[450px] rounded-full bg-gold/[0.04] blur-[130px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Login card */}
        <div className="rounded-3xl bg-[var(--card)] px-8 pt-12 pb-10 shadow-[var(--shadow-lg)] border border-[var(--border)] relative overflow-hidden">
          {/* Gold accent line at top */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="animate-logo w-20 h-20 mb-7 rounded-[18px] overflow-hidden shadow-[var(--shadow-md)] ring-1 ring-white/10">
              <img
                src="/icons/logo-96.png"
                alt="bunq"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h1 className="animate-fade-in-up stagger-1 font-display text-[26px] font-bold tracking-tight">
              Wie gehts BUNQ?
            </h1>
            <p className="animate-fade-in-up stagger-2 text-[14px] text-[var(--text-secondary)] mt-2">
              Deine Kontoübersicht
            </p>

            {/* Sign in button */}
            <button
              onClick={() => signIn("keycloak", { callbackUrl: "/" })}
              className="animate-fade-in-up stagger-3 btn-gold w-full mt-10 py-3.5 rounded-2xl text-[15px] tracking-tight cursor-pointer"
            >
              Anmelden
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="animate-fade-in-up stagger-4 flex items-center justify-center gap-1.5 mt-5">
          <Shield size={11} className="text-[var(--text-tertiary)]" />
          <p className="text-[11px] text-[var(--text-tertiary)] tracking-wide">
            Gesichert mit Keycloak
          </p>
        </div>
      </div>
    </div>
  );
}
