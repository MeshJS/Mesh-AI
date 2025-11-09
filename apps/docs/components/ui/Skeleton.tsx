export function Skeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`rounded bg-fd-muted-foreground/10 ${i === 0 ? 'h-4 w-3/4' : 'h-3 w-full'}`}
        />
      ))}
    </div>
  );
}
