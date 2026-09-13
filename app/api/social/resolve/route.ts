import { NextResponse } from "next/server";
import {
  InvalidUrlError,
  ProviderNotConfiguredError,
  UnsupportedPlatformError,
} from "@/lib/social/types";
import { resolveSocialVideo } from "@/lib/social/registry";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body permintaan tidak valid." }, { status: 400 });
  }

  const url = typeof body === "object" && body !== null ? (body as { url?: unknown }).url : null;

  if (typeof url !== "string" || url.length === 0 || url.length > 2048) {
    return NextResponse.json({ error: "URL wajib diisi." }, { status: 400 });
  }

  try {
    const info = await resolveSocialVideo(url);
    return NextResponse.json({ data: info });
  } catch (err) {
    if (err instanceof InvalidUrlError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (err instanceof UnsupportedPlatformError) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }
    if (err instanceof ProviderNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    // Detail teknis tak terduga hanya masuk log server, bukan ke client.
    console.error("[social/resolve] unexpected error:", err);
    return NextResponse.json(
      { error: "Unable to process this link. Please try again." },
      { status: 500 },
    );
  }
}
