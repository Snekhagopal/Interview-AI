"use client";

import type { RefObject } from "react";

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>;
};

export function CameraPanel({ videoRef }: Props) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-secondary aspect-[4/3]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs text-foreground">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        Live
      </div>
    </div>
  );
}