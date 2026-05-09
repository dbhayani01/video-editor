'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useEditorStore } from '@/lib/state/editor-store';

export function PreviewCanvas() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = useEditorStore((s) => s.media);
  const selectedMediaId = useEditorStore((s) => s.selectedMediaId);
  const selectedClipIds = useEditorStore((s) => s.selectedClipIds);
  const timeline = useEditorStore((s) => s.timeline);
  const setPreviewTime = useEditorStore((s) => s.setPreviewTime);
  const previewTime = useEditorStore((s) => s.previewTime);
  const isPlaying = useEditorStore((s) => s.isPlaying);
  const setIsPlaying = useEditorStore((s) => s.setIsPlaying);

  const activeMediaId = selectedMediaId ?? timeline.find((c) => c.id === selectedClipIds[0])?.mediaId;
  const activeMedia = useMemo(() => media.find((m) => m.id === activeMediaId), [media, activeMediaId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      void video.play();
      return;
    }
    video.pause();
  }, [isPlaying]);

  return (
    <section className="glass rounded-2xl p-4">
      <h3 className="mb-3 font-semibold">Preview</h3>
      {activeMedia?.type === 'video' ? (
        <div className="rounded-xl border border-white/10 bg-black p-2">
          <video
            ref={videoRef}
            src={activeMedia.url}
            controls
            className="h-auto w-full rounded"
            onTimeUpdate={(e) => setPreviewTime(e.currentTarget.currentTime)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
          <p className="mt-2 text-xs text-slate-300">Current time: {previewTime.toFixed(2)}s</p>
        </div>
      ) : (
        <div className="flex h-[450px] items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-slate-300">
          Upload and select a video to preview.
        </div>
      )}
    </section>
  );
}
