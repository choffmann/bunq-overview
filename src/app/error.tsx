"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Etwas ist schief gelaufen</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          {error.message}
        </p>
        <Button onClick={reset}>Erneut versuchen</Button>
      </div>
    </div>
  );
}
