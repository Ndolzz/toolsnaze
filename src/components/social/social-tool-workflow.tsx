"use client";

import { useResolveSocialVideo } from "@/lib/social/use-resolve-social-video";
import { SocialUrlForm } from "@/components/social/social-url-form";
import { IndeterminateProgress } from "@/components/ui/indeterminate-progress";
import { ErrorState } from "@/components/social/error-state";
import { ResultCard, type ResultCardProps } from "@/components/social/result-card";

export function SocialToolWorkflow({ fields }: { fields?: ResultCardProps["fields"] }) {
  const { status, data, error, process, retry } = useResolveSocialVideo();

  return (
    <div className="space-y-6">
      <SocialUrlForm onSubmit={process} loading={status === "loading"} />

      {status === "loading" && <IndeterminateProgress label="Processing…" />}
      {status === "error" && error && <ErrorState message={error} onRetry={retry} />}
      {status === "success" && data && <ResultCard info={data} fields={fields} />}
    </div>
  );
}
