import { ToolPageShell } from "@/components/tool-page-shell";
import { SocialToolWorkflow } from "@/components/social/social-tool-workflow";
import { SUPPORTED_PLATFORM_LABELS } from "@/lib/social/registry";

export const metadata = { title: "Social Video Downloader — NAZE TOOLS" };

export default function SocialVideoDownloaderPage() {
  return (
    <ToolPageShell
      title="Social Video Downloader"
      description={`Tempel tautan video dari ${SUPPORTED_PLATFORM_LABELS.join(", ")}, lalu proses untuk melihat detail dan mengunduhnya.`}
    >
      <SocialToolWorkflow />
    </ToolPageShell>
  );
}
