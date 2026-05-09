import { create } from 'zustand';

export type MediaItem = { id: string; name: string; type: 'video' | 'audio' | 'image'; url: string; duration?: number };
export type TimelineClip = { id: string; mediaId: string; track: number; start: number; end: number; offset: number };

type EditorState = {
  media: MediaItem[];
  timeline: TimelineClip[];
  zoom: number;
  selectedClipIds: string[];
  selectedMediaId?: string;
  previewTime: number;
  isPlaying: boolean;
  addMedia: (m: MediaItem) => void;
  addClip: (c: TimelineClip) => void;
  updateClip: (id: string, patch: Partial<TimelineClip>) => void;
  splitClip: (id: string, splitTime: number) => void;
  selectClip: (ids: string[]) => void;
  setSelectedMedia: (id?: string) => void;
  setPreviewTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setZoom: (z: number) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  media: [], timeline: [], zoom: 1, selectedClipIds: [], previewTime: 0, isPlaying: false,
  addMedia: (m) => set((s) => ({ media: [...s.media, m] })),
  addClip: (c) => set((s) => ({ timeline: [...s.timeline, c] })),
  updateClip: (id, patch) => set((s) => ({ timeline: s.timeline.map((c) => c.id === id ? { ...c, ...patch } : c) })),
  splitClip: (id, splitTime) => set((s) => {
    const clip = s.timeline.find((c) => c.id === id);
    if (!clip) return s;
    if (splitTime <= clip.start || splitTime >= clip.end) return s;
    const left: TimelineClip = { ...clip, end: splitTime };
    const right: TimelineClip = { ...clip, id: crypto.randomUUID(), start: splitTime };
    return { timeline: s.timeline.flatMap((c) => c.id === id ? [left, right] : [c]), selectedClipIds: [right.id] };
  }),
  selectClip: (ids) => set({ selectedClipIds: ids }),
  setSelectedMedia: (selectedMediaId) => set({ selectedMediaId }),
  setPreviewTime: (previewTime) => set({ previewTime }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setZoom: (zoom) => set({ zoom })
}));
