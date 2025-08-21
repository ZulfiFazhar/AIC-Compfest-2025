"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const SRC = "/pelindung/DepanTop.m3u8";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current!;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = SRC;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        liveDurationInfinity: true,
        maxBufferLength: 10,
      });
      hls.loadSource(SRC);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_evt, data) => {
        console.warn("HLS error:", data.type, data.details);
      });

      return () => hls.destroy();
    } else {
      video.src = SRC;
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <video
          ref={videoRef}
          className="w-full rounded-lg"
          autoPlay
          playsInline
          controls
          muted
        />
      </div>
    </main>
  );
}
