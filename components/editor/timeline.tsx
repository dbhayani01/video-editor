'use client';

import { useEditorStore } from '@/lib/state/editor-store';

export function Timeline() {
  const clips = useEditorStore((s) => s.timeline);
  const zoom = useEditorStore((s) => s.zoom);
  const setZoom = useEditorStore((s) => s.setZoom);
  const selected = useEditorStore((s) => s.selectedClipIds);
  const selectClip = useEditorStore((s) => s.selectClip);
  const updateClip = useEditorStore((s) => s.updateClip);

  return (
    <section className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Timeline</h3>
        <input type="range" min={0.5} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
      </div>
      <div className="relative h-36 overflow-auto rounded-lg bg-slate-900/80 p-3">
        {clips.length === 0 ? <p className="text-slate-400">Drop media here to create tracks.</p> : clips.map((clip) => (
          <div key={clip.id} className={`mb-2 rounded-md p-2 ${selected.includes(clip.id) ? 'bg-indigo-400/70' : 'bg-indigo-500/50'}`} style={{ width: `${(clip.end - clip.start) * 80 * zoom}px` }}>
            <button onClick={() => selectClip([clip.id])} className="mb-2 block w-full text-left">Clip {clip.id.slice(0, 4)} • {clip.start.toFixed(1)}s - {clip.end.toFixed(1)}s</button>
            {selected.includes(clip.id) && (
              <div className="grid gap-1 text-xs">
                <label>Start
                  <input type="range" min={0} max={Math.max(0.1, clip.end - 0.1)} step={0.1} value={clip.start} onChange={(e) => updateClip(clip.id, { start: Number(e.target.value) })} />
                </label>
                <label>End
                  <input type="range" min={clip.start + 0.1} max={Math.max(clip.start + 0.1, clip.end + 30)} step={0.1} value={clip.end} onChange={(e) => updateClip(clip.id, { end: Number(e.target.value) })} />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
