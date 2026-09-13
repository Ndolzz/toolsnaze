import { ToolPageShell } from "@/components/tool-page-shell";
import { ImageConverterWorkflow } from "@/components/image/image-converter-workflow";

export const metadata = { title: "Image Converter — NAZE TOOLS" };

export default function ImageConverterPage() {
  return (
    <ToolPageShell
      title="Image Converter"
      description="Konversi gambar antar format JPG, PNG, WEBP, dan AVIF — diproses langsung di perangkat kamu."
    >
      <ImageConverterWorkflow />
    </ToolPageShell>
  );
}
