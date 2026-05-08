import { create } from 'zustand';

export type MediaItem = { id: string; name: string; type: 'video' | 'audio' | 'image'; url: string; duration?: number };
export type TimelineClip = { id: string; mediaId: string; track: number; start: number; end: number; offset: number };

type EditorState = {
  media: MediaItem[];
  timeline: TimelineClip[];
  zoom: number;
  selectedClipIds: string[];
  addMedia: (m: MediaItem) => void;
  addClip: (c: TimelineClip) => void;
  updateClip: (id: string, patch: Partial<TimelineClip>) => void;
  selectClip: (ids: string[]) => void;
  setZoom: (z: number) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  media: [], timeline: [], zoom: 1, selectedClipIds: [],
  addMedia: (m) => set((s) => ({ media: [...s.media, m] })),
  addClip: (c) => set((s) => ({ timeline: [...s.timeline, c] })),
  updateClip: (id, patch) => set((s) => ({ timeline: s.timeline.map((c) => c.id === id ? { ...c, ...patch } : c) })),
  selectClip: (ids) => set({ selectedClipIds: ids }),
  setZoom: (zoom) => set({ zoom })
}));
