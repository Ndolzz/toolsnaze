import {
  Share2,
  Image as ImageIcon,
  Clapperboard,
  Music2,
  FileText,
  Sparkles,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type CategoryId =
  | "social"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "ai"
  | "developer"
  | "utility";

export interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  { id: "social", label: "Social Video", icon: Share2 },
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "video", label: "Video", icon: Clapperboard },
  { id: "audio", label: "Audio", icon: Music2 },
  { id: "document", label: "PDF & Documents", icon: FileText },
  { id: "ai", label: "AI", icon: Sparkles },
  { id: "developer", label: "Developer", icon: Terminal },
  { id: "utility", label: "Utilities", icon: Wrench },
];

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  /** kata kunci tambahan supaya pencarian menemukan tool lewat sinonim/istilah umum */
  keywords: string[];
  /** diisi begitu halaman/fungsi tool ini sudah benar-benar dibangun */
  href?: string;
}

export const TOOLS: Tool[] = [
  // Social Video
  {
    slug: "social-video-downloader",
    name: "Social Video Downloader",
    description: "Unduh video dari berbagai platform sosial lewat tautan.",
    category: "social",
    keywords: ["download", "unduh", "tiktok", "instagram", "youtube", "reels"],
    href: "/tools/social-video-downloader",
  },
  {
    slug: "video-to-mp3",
    name: "Video → MP3",
    description: "Ambil audio dari video sosial menjadi file MP3.",
    category: "social",
    keywords: ["ekstrak audio", "audio dari video", "mp3"],
  },
  {
    slug: "video-to-gif",
    name: "Video → GIF",
    description: "Ubah potongan video menjadi GIF yang bisa dibagikan.",
    category: "social",
    keywords: ["gif", "video ke gif", "animasi"],
  },
  {
    slug: "thumbnail-extractor",
    name: "Thumbnail Extractor",
    description: "Ambil gambar thumbnail dari sebuah video.",
    category: "social",
    keywords: ["thumbnail", "cover", "frame"],
    href: "/tools/thumbnail-extractor",
  },
  {
    slug: "video-metadata",
    name: "Video Metadata",
    description: "Lihat judul, durasi, resolusi, ukuran, dan format video sosial.",
    category: "social",
    keywords: ["metadata", "info video", "durasi", "resolusi"],
    href: "/tools/video-metadata",
  },

  // Image
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Perkecil ukuran file gambar tanpa merusak kualitas.",
    category: "image",
    keywords: ["kompres gambar", "perkecil ukuran", "compress image"],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Ubah dimensi gambar sesuai kebutuhan.",
    category: "image",
    keywords: ["resize", "ubah ukuran gambar"],
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    description: "Konversi gambar antar format JPG, PNG, WEBP, dan AVIF.",
    category: "image",
    keywords: ["jpg", "png", "webp", "avif", "convert image", "konversi gambar"],
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    description: "Hapus latar belakang gambar secara otomatis.",
    category: "image",
    keywords: ["hapus background", "remove bg", "transparan"],
  },

  // Video
  {
    slug: "video-compressor",
    name: "Video Compressor",
    description: "Perkecil ukuran file video untuk berbagi lebih cepat.",
    category: "video",
    keywords: ["compress video", "kompres video", "perkecil video"],
  },
  {
    slug: "video-converter",
    name: "Video Converter",
    description: "Konversi video antar format populer.",
    category: "video",
    keywords: ["convert video", "mp4", "mov", "mkv"],
  },
  {
    slug: "video-trimmer",
    name: "Video Trimmer",
    description: "Potong bagian video yang tidak diperlukan.",
    category: "video",
    keywords: ["potong video", "trim", "cut video"],
  },
  {
    slug: "video-merger",
    name: "Video Merger",
    description: "Gabungkan beberapa video menjadi satu file.",
    category: "video",
    keywords: ["gabung video", "merge", "join video"],
  },

  // Audio
  {
    slug: "audio-converter",
    name: "Audio Converter",
    description: "Konversi audio antar format MP3, WAV, OGG, dan lainnya.",
    category: "audio",
    keywords: ["convert audio", "mp3", "wav", "ogg"],
  },
  {
    slug: "audio-compressor",
    name: "Audio Compressor",
    description: "Perkecil ukuran file audio.",
    category: "audio",
    keywords: ["compress audio", "kompres audio"],
  },
  {
    slug: "audio-to-text",
    name: "Audio → Text",
    description: "Ubah rekaman suara menjadi teks.",
    category: "audio",
    keywords: ["transkrip", "speech to text", "audio ke teks"],
  },

  // PDF & Document
  {
    slug: "image-to-pdf",
    name: "Image → PDF",
    description: "Gabungkan gambar menjadi satu file PDF.",
    category: "document",
    keywords: ["gambar ke pdf", "jpg to pdf"],
  },
  {
    slug: "pdf-compressor",
    name: "PDF Compressor",
    description: "Perkecil ukuran file PDF.",
    category: "document",
    keywords: ["compress pdf", "kompres pdf"],
  },
  {
    slug: "pdf-merger",
    name: "PDF Merger",
    description: "Gabungkan beberapa file PDF menjadi satu.",
    category: "document",
    keywords: ["gabung pdf", "merge pdf"],
  },
  {
    slug: "ocr",
    name: "OCR",
    description: "Ubah teks dalam gambar/scan menjadi teks yang bisa disalin.",
    category: "document",
    keywords: ["ocr", "scan ke teks", "extract text"],
  },

  // AI
  {
    slug: "ai-image-upscaler",
    name: "Image Upscaler",
    description: "Tingkatkan resolusi gambar menggunakan AI.",
    category: "ai",
    keywords: ["upscale", "perbesar gambar", "ai"],
  },
  {
    slug: "ai-text-summarizer",
    name: "Text Summarizer",
    description: "Ringkas teks panjang menjadi poin-poin utama.",
    category: "ai",
    keywords: ["ringkas", "summarize", "rangkuman"],
  },
  {
    slug: "ai-translator",
    name: "Translator",
    description: "Terjemahkan teks antar bahasa.",
    category: "ai",
    keywords: ["terjemahan", "translate", "bahasa"],
  },

  // Developer
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Rapikan dan validasi struktur JSON.",
    category: "developer",
    keywords: ["json", "format json", "validate json"],
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode dan decode teks ke/dari Base64.",
    category: "developer",
    keywords: ["base64", "encode", "decode"],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Buat UUID acak untuk kebutuhan development.",
    category: "developer",
    keywords: ["uuid", "guid", "generate id"],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Baca isi payload token JWT.",
    category: "developer",
    keywords: ["jwt", "token", "decode token"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Uji pola regular expression terhadap teks.",
    category: "developer",
    keywords: ["regex", "regular expression", "pattern"],
  },

  // Utility
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Buat kode QR dari teks atau tautan.",
    category: "utility",
    keywords: ["qr code", "barcode", "generate qr"],
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Konversi satuan panjang, berat, suhu, dan lainnya.",
    category: "utility",
    keywords: ["konversi satuan", "convert unit"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Buat kata sandi acak yang kuat.",
    category: "utility",
    keywords: ["password", "generate password", "kata sandi"],
  },
];

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return TOOLS;

  const terms = q.split(/\s+/).filter(Boolean);

  return TOOLS.map((tool) => {
    const haystack = [tool.name, tool.description, ...tool.keywords]
      .join(" ")
      .toLowerCase();
    const score = terms.reduce(
      (acc, term) => acc + (haystack.includes(term) ? 1 : 0),
      0,
    );
    return { tool, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.tool);
}
