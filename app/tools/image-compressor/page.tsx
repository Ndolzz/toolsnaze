import { ToolPageShell } from "@/components/tool-page-shell";
import { ImageCompressorWorkflow } from "@/components/image/image-compressor-workflow";

export const metadata = { title: "Image Compressor — NAZE TOOLS" };

export default function ImageCompressorPage() {
  return (
    <ToolPageShell
      title="Image Compressor"
      description="Perkecil ukuran file gambar tanpa merusak kualitas — diproses langsung di perangkat kamu, file tidak diunggah ke server."
    >
      <ImageCompressorWorkflow />
    </ToolPageShell>
  );
}
