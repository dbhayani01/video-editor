import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CineForge AI Video Editor',
  description: 'Production-grade AI-powered video editing platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body>{children}</body></html>;
}
