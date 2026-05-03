import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side proxy — forwards all /api/proxy/* requests to the real backend.
 * This sidesteps CORS completely: the browser only ever talks to its own origin
 * (memodroom.com), and this server-side route forwards on to server.reelin.ai.
 *
 * Env var priority (all checked server-side, never exposed to browser):
 *   MEMODROOM_API_URL            (server-only, preferred)
 *   NEXT_PUBLIC_MEMODROOM_API_URL
 *   NEXT_PUBLIC_API_URL
 */
const BACKEND = (
  process.env.MEMODROOM_API_URL ||
  process.env.NEXT_PUBLIC_MEMODROOM_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  ""
).replace(/\/$/, "");

async function proxy(
  req: NextRequest,
  { params }: { params: { path: string[] } }
): Promise<NextResponse> {
  if (!BACKEND) {
    return NextResponse.json(
      { success: false, error: "API URL not configured" },
      { status: 502 }
    );
  }

  // Rebuild target URL preserving query string
  const reqUrl = new URL(req.url);
  const targetUrl = `${BACKEND}/${params.path.join("/")}${reqUrl.search}`;

  const contentType = req.headers.get("content-type") ?? "";
  const forwardHeaders: Record<string, string> = {};

  let body: BodyInit | undefined;

  if (req.method !== "GET" && req.method !== "HEAD") {
    if (contentType.includes("multipart/form-data")) {
      // Pass FormData directly — fetch sets the correct Content-Type + boundary
      body = await req.formData();
    } else {
      // JSON or other text body
      const text = await req.text();
      if (text) {
        body = text;
        if (contentType) forwardHeaders["content-type"] = contentType;
      }
    }
  }

  try {
    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body,
    });

    const json = await upstream.json();
    return NextResponse.json(json, { status: upstream.status });
  } catch (err) {
    console.error("[proxy] upstream error:", err);
    return NextResponse.json(
      { success: false, error: "Backend unreachable" },
      { status: 502 }
    );
  }
}

export const GET    = proxy;
export const POST   = proxy;
export const PATCH  = proxy;
export const PUT    = proxy;
export const DELETE = proxy;
