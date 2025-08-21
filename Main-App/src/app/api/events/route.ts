// app/api/events/route.ts
export const runtime = "nodejs";

export async function GET() {
  const FLASK_SSE = process.env.FLASK_SSE_URL || "http://localhost:8000/events";
  const upstream = await fetch(FLASK_SSE, { cache: "no-store" });

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const encoder = new TextEncoder();
      // SSE headers
      controller.enqueue(encoder.encode("retry: 2000\n\n"));
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        controller.enqueue(value);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
