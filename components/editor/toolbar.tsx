'use client';

import { Scissors, Volume2, RotateCw, Crop, Type, Sparkles } from 'lucide-react';
import { useEditorStore } from '@/lib/state/editor-store';

export function Toolbar() {
  const selectedClipIds = useEditorStore((s) => s.selectedClipIds);
  const updateClip = useEditorStore((s) => s.updateClip);
  const timeline = useEditorStore((s) => s.timeline);
  const isPlaying = useEditorStore((s) => s.isPlaying);
  const setIsPlaying = useEditorStore((s) => s.setIsPlaying);
  const playbackRate = useEditorStore((s) => s.playbackRate);
  const setPlaybackRate = useEditorStore((s) => s.setPlaybackRate);
  const addTextOverlay = useEditorStore((s) => s.addTextOverlay);
  const setFilter = useEditorStore((s) => s.setFilter);

  const selectedClip = timeline.find((clip) => clip.id === selectedClipIds[0]);

  const cycleFilter = () => {
    const order = ['none', 'grayscale', 'vivid', 'cinematic'] as const;
    const current = useEditorStore.getState().filter;
    const idx = order.indexOf(current);
    setFilter(order[(idx + 1) % order.length]);
  };

  const actions = [
    { icon: Scissors, label: 'Trim -1s', onClick: () => selectedClip && updateClip(selectedClip.id, { end: Math.max(selectedClip.start + 1, selectedClip.end - 1) }) },
    { icon: Crop, label: 'Extend +1s', onClick: () => selectedClip && updateClip(selectedClip.id, { end: selectedClip.end + 1 }) },
    { icon: RotateCw, label: isPlaying ? 'Pause' : 'Play', onClick: () => setIsPlaying(!isPlaying) },
    { icon: Volume2, label: playbackRate === 1 ? 'Speed 1x' : `Speed ${playbackRate}x`, onClick: () => setPlaybackRate(playbackRate >= 2 ? 0.5 : Number((playbackRate + 0.25).toFixed(2))) },
    { icon: Sparkles, label: 'Style', onClick: cycleFilter },
    { icon: Type, label: 'Add Text', onClick: () => addTextOverlay() }
  ];

  return (
    <div className="glass fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-2xl p-2">
      {actions.map(({ icon: Icon, label, onClick }) => (
        <button key={label} onClick={onClick} className="rounded-xl px-3 py-2 text-sm hover:bg-white/10"><Icon size={16} className="mr-2 inline" />{label}</button>
      ))}
    </div>
  );
}
