import { ToolPageShell } from "@/components/tool-page-shell";
import { SocialToolWorkflow } from "@/components/social/social-tool-workflow";

export const metadata = { title: "Video Metadata — NAZE TOOLS" };

export default function VideoMetadataPage() {
  return (
    <ToolPageShell
      title="Video Metadata"
      description="Tempel tautan video sosial untuk melihat judul, durasi, resolusi, ukuran file, dan format-nya."
    >
      <SocialToolWorkflow fields={["title", "duration", "resolution", "size", "format"]} />
    </ToolPageShell>
  );
}
