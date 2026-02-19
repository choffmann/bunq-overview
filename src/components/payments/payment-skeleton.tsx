export function PaymentSkeleton() {
  return (
    <div className="px-4 py-4 space-y-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-3.5 animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
        >
          <div className="w-10 h-10 rounded-full animate-shimmer shrink-0" />
          <div className="flex-1 space-y-2.5">
            <div className="h-3 w-3/5 rounded-md animate-shimmer" />
            <div className="h-2.5 w-1/4 rounded-md animate-shimmer" />
          </div>
          <div className="h-3 w-14 rounded-md animate-shimmer" />
        </div>
      ))}
    </div>
  );
}
