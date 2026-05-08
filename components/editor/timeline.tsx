'use client';

import { useEditorStore } from '@/lib/state/editor-store';

export function Timeline() {
  const clips = useEditorStore((s) => s.timeline);
  const zoom = useEditorStore((s) => s.zoom);
  const setZoom = useEditorStore((s) => s.setZoom);

  return (
    <section className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Timeline</h3>
        <input type="range" min={0.5} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
      </div>
      <div className="relative h-36 overflow-auto rounded-lg bg-slate-900/80 p-3">
        {clips.length === 0 ? <p className="text-slate-400">Drop media here to create tracks.</p> : clips.map((clip) => (
          <div key={clip.id} className="mb-2 rounded-md bg-indigo-500/50 p-2" style={{ width: `${(clip.end - clip.start) * 80 * zoom}px` }}>
            Clip {clip.id.slice(0, 4)} • Track {clip.track}
          </div>
        ))}
      </div>
    </section>
  );
}
