import type { Metadata } from 'next';
import Link from 'next/link';
import { AlcheCurvedTvCarousel } from '@/components/alche-curved-tv-carousel';

export const metadata: Metadata = {
  title: '3D Curved TV Carousel | MTM Sovereign Screen Matrix',
  description: 'Recreation of Alche Studio 3D Curved TV Screen Video Carousel displaying MTM Sovereign Logo iterations in inward and outward facing perspective modes.',
};

export default function TvCarouselPage() {
  return (
    <div className="relative min-h-screen bg-[#020202] text-[#F5F5F5] selection:bg-[#D4AF37] selection:text-black flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Header */}
      <header className="relative z-30 mx-auto w-full max-w-7xl flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-serif font-black text-xl text-white tracking-widest uppercase">
            MTM // ALCHE 3D
          </span>
          <span className="hidden sm:inline-block h-3 w-px bg-white/20" />
          <span className="hidden sm:inline-block text-xs font-mono text-[#D4AF37] tracking-wider">
            CURVED SCREEN CAROUSEL
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/behind-the-brand"
            className="text-xs font-mono text-white/70 hover:text-[#D4AF37] transition-colors"
          >
            Behind the Brand ➔
          </Link>
          <Link
            href="/"
            className="text-xs font-mono text-white/70 hover:text-[#00E5FF] transition-colors"
          >
            I³ Command Center ➔
          </Link>
        </div>
      </header>

      {/* Main 3D Carousel Stage */}
      <main className="relative z-10 mx-auto w-full max-w-7xl my-auto py-8">
        <AlcheCurvedTvCarousel />
      </main>

      {/* Minimalist Footer */}
      <footer className="relative z-30 mx-auto w-full max-w-7xl flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-[11px] font-mono text-white/40">
        <span>INWARD ARENA (CONCAVE) & OUTWARD STAGE (ORBIT) MODES</span>
        <span>DRAG HORIZONTALLY · MOUSE WHEEL · ARROW KEYS</span>
      </footer>
    </div>
  );
}
