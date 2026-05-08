'use client';

import { Scissors, Volume2, RotateCw, Crop } from 'lucide-react';

export function Toolbar() {
  const actions = [
    { icon: Scissors, label: 'Trim' },
    { icon: Crop, label: 'Crop' },
    { icon: RotateCw, label: 'Rotate' },
    { icon: Volume2, label: 'Audio' }
  ];

  return (
    <div className="glass fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-2xl p-2">
      {actions.map(({ icon: Icon, label }) => (
        <button key={label} className="rounded-xl px-3 py-2 text-sm hover:bg-white/10"><Icon size={16} className="mr-2 inline" />{label}</button>
      ))}
    </div>
  );
}
