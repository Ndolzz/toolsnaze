import { ToolPageShell } from "@/components/tool-page-shell";
import { ImageOptimizerWorkflow } from "@/components/image/image-optimizer-workflow";

export const metadata = { title: "Image Optimizer — NAZE TOOLS" };

export default function ImageOptimizerPage() {
  return (
    <ToolPageShell
      title="Image Optimizer"
      description="Satu tombol — kami pilihkan format & kualitas yang seimbang secara otomatis untuk ukuran file terkecil yang wajar."
    >
      <ImageOptimizerWorkflow />
    </ToolPageShell>
  );
}
