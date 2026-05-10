import { create } from 'zustand';

export type MediaItem = { id: string; name: string; type: 'video' | 'audio' | 'image'; url: string; duration?: number };
export type TimelineClip = { id: string; mediaId: string; track: number; start: number; end: number; offset: number };
export type TextOverlay = { id: string; text: string; x: number; y: number; size: number; color: string };

type EditorState = {
  media: MediaItem[];
  timeline: TimelineClip[];
  zoom: number;
  selectedClipIds: string[];
  selectedMediaId?: string;
  previewTime: number;
  isPlaying: boolean;
  playbackRate: number;
  filter: 'none' | 'grayscale' | 'vivid' | 'cinematic';
  aspectRatio: '16:9' | '1:1' | '9:16';
  textOverlays: TextOverlay[];
  addMedia: (m: MediaItem) => void;
  addClip: (c: TimelineClip) => void;
  updateClip: (id: string, patch: Partial<TimelineClip>) => void;
  selectClip: (ids: string[]) => void;
  setSelectedMedia: (id?: string) => void;
  setPreviewTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setZoom: (z: number) => void;
  setPlaybackRate: (rate: number) => void;
  setFilter: (filter: EditorState['filter']) => void;
  setAspectRatio: (aspectRatio: EditorState['aspectRatio']) => void;
  addTextOverlay: () => void;
  updateTextOverlay: (id: string, patch: Partial<TextOverlay>) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  media: [], timeline: [], zoom: 1, selectedClipIds: [], previewTime: 0, isPlaying: false,
  playbackRate: 1, filter: 'none', aspectRatio: '16:9', textOverlays: [],
  addMedia: (m) => set((s) => ({ media: [...s.media, m] })),
  addClip: (c) => set((s) => ({ timeline: [...s.timeline, c] })),
  updateClip: (id, patch) => set((s) => ({ timeline: s.timeline.map((c) => c.id === id ? { ...c, ...patch } : c) })),
  selectClip: (ids) => set({ selectedClipIds: ids }),
  setSelectedMedia: (selectedMediaId) => set({ selectedMediaId }),
  setPreviewTime: (previewTime) => set({ previewTime }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setZoom: (zoom) => set({ zoom }),
  setPlaybackRate: (playbackRate) => set({ playbackRate }),
  setFilter: (filter) => set({ filter }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  addTextOverlay: () => set((s) => ({
    textOverlays: [...s.textOverlays, { id: crypto.randomUUID(), text: 'Double-click to edit', x: 12, y: 12, size: 22, color: '#ffffff' }]
  })),
  updateTextOverlay: (id, patch) => set((s) => ({ textOverlays: s.textOverlays.map((t) => t.id === id ? { ...t, ...patch } : t) }))
}));
