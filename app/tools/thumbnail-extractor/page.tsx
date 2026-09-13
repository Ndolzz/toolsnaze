import { ToolPageShell } from "@/components/tool-page-shell";
import { SocialToolWorkflow } from "@/components/social/social-tool-workflow";

export const metadata = { title: "Thumbnail Extractor — NAZE TOOLS" };

export default function ThumbnailExtractorPage() {
  return (
    <ToolPageShell
      title="Thumbnail Extractor"
      description="Tempel tautan video sosial untuk mengambil gambar thumbnail-nya."
    >
      <SocialToolWorkflow fields={["thumbnail", "title", "download"]} />
    </ToolPageShell>
  );
}
