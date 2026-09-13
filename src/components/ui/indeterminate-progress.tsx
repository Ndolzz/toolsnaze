export function IndeterminateProgress({ label }: { label: string }) {
  return (
    <div role="status" aria-live="polite" className="animate-fade-in">
      <div className="h-1 w-full overflow-hidden rounded-pill bg-ink-100 dark:bg-white/10">
        <div className="animate-indeterminate h-full w-1/3 rounded-pill bg-naze-500" />
      </div>
      <p className="mt-2 font-body text-body-sm text-ink-600 dark:text-ink-400">{label}</p>
    </div>
  );
}
