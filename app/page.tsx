import Link from 'next/link';
import { Sparkles, Wand2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <section className="glass mx-auto max-w-6xl rounded-3xl p-8 md:p-14">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-1 text-sm text-indigo-200"><Sparkles size={14} /> AI-Powered Editing Suite</div>
        <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">Edit videos like a pro with <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">CineForge</span>.</h1>
        <p className="mt-6 max-w-2xl text-slate-300">Timeline editing, multi-track compositing, smart captions, scene detection, and export presets for Shorts/Reels — all from your browser.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/editor" className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold hover:bg-indigo-400">Start Editing</Link>
          <Link href="/pricing" className="rounded-xl border border-white/20 px-5 py-3 font-semibold hover:bg-white/10">View Pricing</Link>
        </div>
      </section>
      <section className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-3">
        {['AI Captions', 'Cinematic Filters', 'Cloud Collaboration'].map((f) => (
          <div key={f} className="glass rounded-2xl p-5"><Wand2 className="mb-3 text-fuchsia-300" />{f}</div>
        ))}
      </section>
    </main>
  );
}
