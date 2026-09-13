import { ToolPageShell } from "@/components/tool-page-shell";
import { ImageCropperWorkflow } from "@/components/image/image-cropper-workflow";

export const metadata = { title: "Image Cropper — NAZE TOOLS" };

export default function ImageCropperPage() {
  return (
    <ToolPageShell
      title="Image Cropper"
      description="Potong bagian gambar yang kamu butuhkan — seret langsung di atas preview."
    >
      <ImageCropperWorkflow />
    </ToolPageShell>
  );
}
