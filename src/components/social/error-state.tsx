import { RotateCcw } from "lucide-react";

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="animate-fade-in rounded-md border border-danger/20 bg-danger/5 p-5">
      <p className="font-body text-body text-ink-900 dark:text-ink-0">
        Unable to process this link.
      </p>
      <p className="mt-1 font-body text-body-sm text-ink-600 dark:text-ink-400">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-ink-100 px-4 py-2 font-body text-button text-ink-900 transition duration-fast ease-standard hover:bg-ink-50 active:scale-[0.98] dark:border-white/10 dark:text-ink-0 dark:hover:bg-white/5"
      >
        <RotateCcw size={14} />
        Try again
      </button>
    </div>
  );
}
