'use client';

import { Stage, Layer, Text, Rect } from 'react-konva';

export function PreviewCanvas() {
  return (
    <section className="glass rounded-2xl p-4">
      <h3 className="mb-3 font-semibold">Preview</h3>
      <Stage width={800} height={450} className="overflow-hidden rounded-xl border border-white/10 bg-black">
        <Layer>
          <Rect x={0} y={0} width={800} height={450} fill="#020617" />
          <Text text="CineForge Preview Canvas" x={250} y={210} fill="#cbd5e1" fontSize={24} />
        </Layer>
      </Stage>
    </section>
  );
}
