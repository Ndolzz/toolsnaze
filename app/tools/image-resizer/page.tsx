import { ToolPageShell } from "@/components/tool-page-shell";
import { ImageResizerWorkflow } from "@/components/image/image-resizer-workflow";

export const metadata = { title: "Image Resizer — NAZE TOOLS" };

export default function ImageResizerPage() {
  return (
    <ToolPageShell
      title="Image Resizer"
      description="Ubah dimensi gambar sesuai kebutuhan — diproses langsung di perangkat kamu."
    >
      <ImageResizerWorkflow />
    </ToolPageShell>
  );
}
