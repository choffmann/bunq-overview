"use client";

export default function InfoPage() {
  return (
    <div className="py-4 animate-fade-in-up">
      {/* App Info */}
      <div className="px-4 mb-2">
        <h3 className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--text-tertiary)]">
          App Info
        </h3>
      </div>
      <div className="mx-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-[13px] font-medium">App Name</span>
          <span className="text-[13px] text-[var(--text-secondary)]">
            Wie gehts BUNQ?
          </span>
        </div>
        <div className="h-px bg-[var(--border)] mx-4" />
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-[13px] font-medium">App Icon</span>
          <div className="w-6 h-6 rounded-md overflow-hidden">
            <img src="/icons/logo-96.png" height={24} width={24} alt="logo" />
          </div>
        </div>
      </div>

      {/* Build Info */}
      <div className="px-4 mb-2 mt-6">
        <h3 className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--text-tertiary)]">
          Build Info
        </h3>
      </div>
      <div className="mx-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-[13px] font-medium">Commit</span>
          <span className="text-[13px] text-[var(--text-secondary)] font-mono">
            {process.env.NEXT_PUBLIC_COMMIT_HASH || "dev"}
          </span>
        </div>
        <div className="h-px bg-[var(--border)] mx-4" />
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-[13px] font-medium">Branch</span>
          <span className="text-[13px] text-[var(--text-secondary)] font-mono">
            {process.env.NEXT_PUBLIC_BRANCH || "local"}
          </span>
        </div>
        <div className="h-px bg-[var(--border)] mx-4" />
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-[13px] font-medium">Build Datum</span>
          <span className="text-[13px] text-[var(--text-secondary)]">
            {process.env.NEXT_PUBLIC_BUILD_TIME || "dev"}
          </span>
        </div>
      </div>
    </div>
  );
}
