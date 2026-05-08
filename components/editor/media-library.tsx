'use client';

import { useEditorStore } from '@/lib/state/editor-store';

export function MediaLibrary() {
  const media = useEditorStore((s) => s.media);
  const addMedia = useEditorStore((s) => s.addMedia);

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
        {media.map((m) => <div key={m.id} className="rounded-lg border border-white/10 p-2 text-sm">{m.name}</div>)}
      </div>
    </aside>
  );
}
