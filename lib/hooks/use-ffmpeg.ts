'use client';

import { useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export function useFFmpeg() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const load = async () => {
    if (ffmpegRef.current) return;
    const ffmpeg = new FFmpeg();
    ffmpeg.on('progress', ({ progress }) => setProgress(Math.round(progress * 100)));
    await ffmpeg.load({ coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js' });
    ffmpegRef.current = ffmpeg;
    setReady(true);
  };

  const transcodeToMp4 = async (file: File) => {
    if (!ffmpegRef.current) throw new Error('FFmpeg not loaded');
    await ffmpegRef.current.writeFile('input', await fetchFile(file));
    await ffmpegRef.current.exec(['-i', 'input', '-c:v', 'libx264', '-preset', 'veryfast', 'output.mp4']);
    const data = await ffmpegRef.current.readFile('output.mp4');
    return new Blob([data], { type: 'video/mp4' });
  };

  return { load, ready, progress, transcodeToMp4 };
}
