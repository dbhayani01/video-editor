'use client';

import { useEditorStore } from '@/lib/state/editor-store';
import { MediaLibrary } from '@/components/editor/media-library';
import { PreviewCanvas } from '@/components/editor/preview-canvas';
import { Timeline } from '@/components/editor/timeline';
import { Toolbar } from '@/components/editor/toolbar';
import { useFFmpeg } from '@/lib/hooks/use-ffmpeg';

export default function EditorPage() {
  const { load, ready, progress } = useFFmpeg();
  const media = useEditorStore((s) => s.media);
  const addClip = useEditorStore((s) => s.addClip);

  return (
    <main className="min-h-screen p-6">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editor Workspace</h1>
        <button onClick={load} className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold hover:bg-indigo-400">{ready ? `Processing Ready (${progress}%)` : 'Enable Processing'}</button>
      </header>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <MediaLibrary />
        <PreviewCanvas />
      </div>
      <div className="mt-4 grid gap-4">
        <button className="glass rounded-xl p-3 text-left" onClick={() => media[0] && addClip({ id: crypto.randomUUID(), mediaId: media[0].id, start: 0, end: 5, offset: 0, track: 1 })}>Add first media to timeline</button>
        <Timeline />
      </div>
      <Toolbar />
    </main>
  );
}
