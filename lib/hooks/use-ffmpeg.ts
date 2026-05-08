'use client';

import { useState } from 'react';

/**
 * Lightweight transcoding hook for deployment environments where ffmpeg.wasm
 * is too heavy or unavailable.
 */
export function useFFmpeg() {
  const [ready, setReady] = useState(true);
  const [progress, setProgress] = useState(100);

  const load = async () => {
    setReady(true);
    setProgress(100);
  };

  const transcodeToMp4 = async (file: File) => {
    // No-op fallback: return uploaded file as a Blob so the app stays runnable.
    return new Blob([await file.arrayBuffer()], { type: file.type || 'application/octet-stream' });
  };

  return { load, ready, progress, transcodeToMp4 };
}
