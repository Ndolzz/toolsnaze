import { ToolPageShell } from "@/components/tool-page-shell";
import { ImageMetadataWorkflow } from "@/components/image/image-metadata-workflow";

export const metadata = { title: "Image Metadata — NAZE TOOLS" };

export default function ImageMetadataPage() {
  return (
    <ToolPageShell
      title="Image Metadata"
      description="Lihat dimensi, rasio aspek, ukuran file, dan info lain dari sebuah gambar."
    >
      <ImageMetadataWorkflow />
    </ToolPageShell>
  );
}
