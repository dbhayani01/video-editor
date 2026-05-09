'use client';

import { useEditorStore } from '@/lib/state/editor-store';

export function MediaLibrary() {
  const media = useEditorStore((s) => s.media);
  const addMedia = useEditorStore((s) => s.addMedia);
  const addClip = useEditorStore((s) => s.addClip);
  const selectedMediaId = useEditorStore((s) => s.selectedMediaId);
  const setSelectedMedia = useEditorStore((s) => s.setSelectedMedia);

  const onUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = [...(e.target.files ?? [])];
    for (const file of files) {
      const type = file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image';
      addMedia({ id: crypto.randomUUID(), name: file.name, type, url: URL.createObjectURL(file) });
    }
  };

  return (
    <aside className="glass rounded-2xl p-4">
      <h3 className="mb-3 font-semibold">Media Library</h3>
      <input type="file" multiple accept="video/*,audio/*,image/*" onChange={onUpload} className="mb-4 w-full" />
      <div className="space-y-2">
        {media.map((m) => (
          <div
            key={m.id}
            className={`rounded-lg border p-2 text-sm ${selectedMediaId === m.id ? 'border-indigo-400 bg-indigo-500/10' : 'border-white/10'}`}
          >
            <button className="w-full text-left" onClick={() => setSelectedMedia(m.id)}>{m.name}</button>
            <button
              onClick={() => addClip({ id: crypto.randomUUID(), mediaId: m.id, start: 0, end: 5, offset: 0, track: 1 })}
              className="mt-2 rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
            >
              Add to timeline
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
