'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  dateBadge: string;
  statusBadge: string;
  chipset: string;
  description: string;
  extendedLore: string;
  tags: string[];
  imageSrc: string;
  accentColor: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 'roman-strike',
    title: 'Roman’s Kinetic Strike',
    subtitle: 'The 0ms Latency Spine & Active Transformation',
    category: 'ACTIVE SYSTEM TELEMETRY',
    dateBadge: '2026 // Q4 CANONICAL',
    statusBadge: 'STATUS: ACTIVE',
    chipset: '0ms LATENCY SPINE',
    description: 'High-voltage electric cyan arc cutting horizontally across the sovereign monogram, transmuting business chaos into machine-readable gold.',
    extendedLore: 'Forged with Roman (The Spine) to inject rapid computational velocity into our molten gold heritage. Slicing through the cupped binary hands, it bridges the chaotic circuit cluster on the left into crystalline algorithmic order on the right. It communicates 0ms latency, empirical truth, and the kinetic electrical pulse of modern AI.',
    tags: ['The Spine', 'Lightning Cyan', '10,000K HID Edge', '0ms Latency', 'Active Telemetry'],
    imageSrc: '/brand/mtm-crest-lightning-strike.jpg',
    accentColor: '#00E5FF',
  },
  {
    id: 'black-jewel',
    title: 'The Black Jewel Mark',
    subtitle: 'Imperial Hegemony & Category Monopoly',
    category: 'CATEGORY SOVEREIGNTY',
    dateBadge: '2022 // FOUNDATION',
    statusBadge: 'STATUS: ESTABLISHED',
    chipset: 'SOVEREIGN HEGEMONY',
    description: 'Interlocking MT coronet on high-gloss onyx, commanding generational authority and uncompromising white-glove prestige.',
    extendedLore: 'The foundational brand mark of Modern Touch Media. The three-point sovereign coronet declares that our clients receive royal craftsmanship and permanent category protection. The high-gloss onyx surface catches ambient rim light while absorbing noise, setting the standard for unassailable market authority.',
    tags: ['Monogram', 'Imperial Gold', 'Matte Obsidian', 'Category Monopoly', 'White Glove'],
    imageSrc: '/brand/black-jewel-mt-media-logo.webp',
    accentColor: '#D4AF37',
  },
  {
    id: 'forge-ambassadors',
    title: 'The Forge Ambassadors',
    subtitle: 'Multi-Agent Client-Facing Intelligence',
    category: 'MULTI-AGENT ARCHITECTURE',
    dateBadge: '2026 // SYNCHRONIZED',
    statusBadge: 'STATUS: ACTIVE',
    chipset: '4-PERSONA MATRIX',
    description: 'Goldie (The Spark), Roman (The Spine), Negative Nina (The Shield), and Echo (The Voice), co-hosting the Midas Mindset Podcast.',
    extendedLore: 'Rather than relying on junior generalists, The Architect engineered a synchronized multi-agent quartet. Goldie radiates creative aspirational heat; Roman enforces technical business logic and 0ms speed; Negative Nina audits against hallucinations and vendor hype; Echo anchors the customer experience feedback loop.',
    tags: ['Multi-Agent', 'Goldie', 'Roman', 'Negative Nina', 'Echo', 'The Forge'],
    imageSrc: '/brand/the-forge-ambassadors-studio.webp',
    accentColor: '#D4AF37',
  },
  {
    id: 'discovery-audit',
    title: 'The Discovery Diagnostic',
    subtitle: 'AI Brand Ignorance Elimination',
    category: 'GEO & AEO AUDIT ENGINE',
    dateBadge: '2026 // DIAGNOSTIC',
    statusBadge: 'STATUS: ACTIVE',
    chipset: 'KNOWLEDGE GRAPH',
    description: 'Visualizing the invisible infrastructure that prevents offline leaders from being bypassed by Google AI Overviews and modern LLMs.',
    extendedLore: 'Offline excellence does not automatically translate into digital authority. When buyers ask conversational engines who to hire, machines bypass traditional websites whose structured metadata is missing. MTM constructs nested Schema.org knowledge graphs that guarantee unassailable first-party citation.',
    tags: ['AI Overviews', 'GEO Schema', 'Entity Graphs', 'Anti-Erasure', 'I³ System'],
    imageSrc: '/brand/invisible-elite-discovery-audit.jpg',
    accentColor: '#00E5FF',
  },
  {
    id: 'ark-globe',
    title: 'The Ark Network Globe',
    subtitle: 'The Sequoia Doctrine & Corridor Telemetry',
    category: 'GEOSPATIAL TELEMETRY',
    dateBadge: '2026 // TERRITORY',
    statusBadge: 'STATUS: ACTIVE',
    chipset: 'SEQUOIA EXPANSION',
    description: '3D spatial intelligence tracking high-net-worth corridors from The Woodlands across the Texas Triangle and nationwide.',
    extendedLore: 'Built upon the Sequoia Doctrine: plant an indestructible seed in The Woodlands, Texas, and expand outward across Houston, the Texas Triangle, and global economic corridors. A private federation of sovereign leaders anchored into machine intelligence with zero paid ad spend.',
    tags: ['Spatial AI', 'Corridor Expansion', 'The Woodlands', 'Texas Triangle', 'Ark Network'],
    imageSrc: '/brand/ark-network-global-telemetry.jpg',
    accentColor: '#00E5FF',
  },
  {
    id: 'voltron-circuitry',
    title: 'Voltron Neural Matrix',
    subtitle: 'From Business Chaos to Crystalline Clarity',
    category: 'STEALTH PROVENANCE',
    dateBadge: '2022-2026 // STEALTH',
    statusBadge: 'STATUS: ARCHITECTED',
    chipset: 'SYSCO DISCIPLINE',
    description: 'Dense algorithmic traces progressing from blurred noise into surgical clarity, cradled by binary stewardship hands.',
    extendedLore: 'Rooted in Kareem Daniel’s decade of operational logistics grit at Sysco Foods. The blurred-to-clear neural circuitry symbolizes taking operational overwhelm and turning it into a disciplined, machine-readable system. The binary hands provide the stewardship covenant: your enterprise is held in good hands.',
    tags: ['Binary Hands', 'Neural Lattice', 'Compounding Loop', 'Sysco Precision', 'Continuity'],
    imageSrc: '/brand/mtm-crest-lightning-strike.jpg',
    accentColor: '#D4AF37',
  },
];

export function AlcheCurvedTvCarousel() {
  // Mode: 'inward' (Alche Screenshots 3 & 4: Panoramic curved arena) or 'outward' (Alche Screenshots 1 & 2: Angled 3D Stage)
  const [mode, setMode] = useState<'inward' | 'outward'>('inward');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [soundActive, setSoundActive] = useState(false);

  const totalItems = CAROUSEL_ITEMS.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDistance(0);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragDistance(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}

    if (dragDistance < -60) {
      goToNext();
    } else if (dragDistance > 60) {
      goToPrev();
    }
    setDragDistance(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const activeItem = CAROUSEL_ITEMS[currentIndex];
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
  const nextIndex = (currentIndex + 1) % totalItems;

  const prevItem = CAROUSEL_ITEMS[prevIndex];
  const nextItem = CAROUSEL_ITEMS[nextIndex];

  // Quaternion values for top-right gizmo
  const gizmoY = (currentIndex * 60).toFixed(1);
  const gizmoX = mode === 'inward' ? '4.5' : '-18.0';

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#030303] py-10 md:py-16 selection:bg-[#D4AF37] selection:text-black">
      {/* ── ALCHE 3D CYLINDRICAL WIREFRAME GRID BACKGROUND ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Perspective Wireframe Grid */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.45) 1px, transparent 1px)`,
            backgroundSize: '70px 70px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, transparent 80%)',
          }}
        />

        {/* Scattered Crosshairs (+) matching Alche Studio */}
        <div className="absolute left-[8%] top-[18%] text-xs font-mono text-white/25 select-none">+</div>
        <div className="absolute right-[10%] top-[22%] text-xs font-mono text-white/25 select-none">+</div>
        <div className="absolute left-[12%] bottom-[20%] text-xs font-mono text-white/25 select-none">+</div>
        <div className="absolute right-[14%] bottom-[24%] text-xs font-mono text-white/25 select-none">+</div>
        <div className="absolute left-1/2 top-[8%] -translate-x-1/2 text-xs font-mono text-white/25 select-none">+</div>
        <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 text-xs font-mono text-white/25 select-none">+</div>

        {/* Dynamic Atmospheric Radiance matching active accent */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[800px] rounded-full blur-[160px] transition-colors duration-700"
          style={{
            background: `radial-gradient(circle, ${activeItem.accentColor}18 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* ── TOP HUD CONTROLS & 3D ROOM QUATERNION GIZMO ── */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Left: Inward / Outward Mode Switcher */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/70 p-1 backdrop-blur-md">
          <button
            onClick={() => setMode('inward')}
            className={`rounded-full px-4 py-1.5 text-xs font-mono tracking-wider transition-all ${
              mode === 'inward'
                ? 'bg-[#D4AF37] font-bold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ↺ INWARD ARENA (CONCAVE)
          </button>
          <button
            onClick={() => setMode('outward')}
            className={`rounded-full px-4 py-1.5 text-xs font-mono tracking-wider transition-all ${
              mode === 'outward'
                ? 'bg-[#00E5FF] font-bold text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ↻ OUTWARD STAGE (SHOWCASE)
          </button>
        </div>

        {/* Right: 3D Room Quaternion Compass / Gyro (Direct Alche Studio Recreation) */}
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/70 px-4 py-2 backdrop-blur-md">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono text-[#D4AF37] tracking-wider">ROOM QUATERNION</span>
            <span className="text-[11px] font-mono text-white/70">
              Y: {gizmoY}° · X: {gizmoX}°
            </span>
          </div>

          {/* Miniature 3D Wireframe Gyro Sphere */}
          <div className="relative h-8 w-8 rounded-full border border-white/20 bg-black/40 flex items-center justify-center">
            {/* Horizontal Axis Ring */}
            <div 
              className="absolute inset-0 rounded-full border border-[#00E5FF]/70"
              style={{
                transform: `rotateY(${currentIndex * 60}deg) rotateX(60deg)`,
                transition: 'transform 0.4s ease-out',
              }}
            />
            {/* Vertical Axis Ring */}
            <div 
              className="absolute inset-0 rounded-full border border-[#D4AF37]/70"
              style={{
                transform: `rotateX(${gizmoX}deg)`,
              }}
            />
            {/* Center Core Light Node */}
            <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
          </div>
        </div>
      </div>

      {/* ── 3D CAROUSEL STAGE ── */}
      <div 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative z-10 mx-auto min-h-[460px] sm:min-h-[500px] md:min-h-[540px] w-full max-w-6xl px-4 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        style={{ perspective: '1200px' }}
      >
        {mode === 'inward' ? (
          /* ════════════════════════════════════════════════════════════════
             MODE A: INWARD ARENA (PANORAMIC CURVED CYLINDER - ALCHE SCREENSHOTS 3 & 4)
             Center screen is straight; left and right screens curve inward toward viewer!
             ════════════════════════════════════════════════════════════════ */
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Left Neighbor Curved Screen */}
            <div
              onClick={goToPrev}
              className="hidden lg:block absolute left-[3%] z-10 h-[280px] w-[420px] cursor-pointer transition-all duration-500 ease-out hover:opacity-90"
              style={{
                transform: 'perspective(1000px) rotateY(32deg) translateZ(-60px) scale(0.85)',
                opacity: 0.55,
              }}
            >
              <CurvedTvMonitor item={prevItem} isFocused={false} />
            </div>

            {/* Center Active Curved TV Screen */}
            <div
              className="relative z-20 h-[310px] sm:h-[360px] md:h-[400px] w-[340px] sm:w-[500px] md:w-[640px] transition-all duration-500 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(0deg) translateZ(0px) scale(1) translateX(${dragDistance * 0.4}px)`,
              }}
            >
              <CurvedTvMonitor item={activeItem} isFocused={true} />
            </div>

            {/* Right Neighbor Curved Screen */}
            <div
              onClick={goToNext}
              className="hidden lg:block absolute right-[3%] z-10 h-[280px] w-[420px] cursor-pointer transition-all duration-500 ease-out hover:opacity-90"
              style={{
                transform: 'perspective(1000px) rotateY(-32deg) translateZ(-60px) scale(0.85)',
                opacity: 0.55,
              }}
            >
              <CurvedTvMonitor item={nextItem} isFocused={false} />
            </div>
          </div>
        ) : (
          /* ════════════════════════════════════════════════════════════════
             MODE B: OUTWARD STAGE (ANGLED PERSPECTIVE SHOWCASE - ALCHE SCREENSHOTS 1 & 2)
             Large angled curved TV monitor on left, full editorial dossier on right!
             ════════════════════════════════════════════════════════════════ */
          <div className="grid items-center gap-8 lg:grid-cols-12 w-full">
            {/* Left: Angled 3D Curved TV Monitor */}
            <div 
              className="lg:col-span-7 transition-all duration-500 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(-18deg) rotateX(4deg) scale(0.98) translateX(${dragDistance * 0.3}px)`,
              }}
            >
              <div className="h-[280px] sm:h-[340px] md:h-[380px] w-full">
                <CurvedTvMonitor item={activeItem} isFocused={true} />
              </div>
            </div>

            {/* Right: Editorial Dossier & Lore */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeItem.accentColor }} />
                <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase">
                  {activeItem.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-serif tracking-tight">
                {activeItem.title}
              </h3>

              <div className="text-xs font-mono text-[#00E5FF]">
                {activeItem.subtitle}
              </div>

              <p className="text-sm leading-relaxed text-[#E5E4E2]/85 font-serif">
                {activeItem.extendedLore}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeItem.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-mono text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={goToNext}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2 text-xs font-mono text-white transition-all hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  <span>NEXT FORMATION</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM HUD FOOTER & AUDIO TELEMETRY CONTROLS ── */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        {/* Left: Audio Telemetry Status matching Alche Studio */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundActive(!soundActive)}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-1.5 text-xs font-mono text-white/80 transition-all hover:border-[#D4AF37] hover:text-white"
          >
            <span className={`h-2 w-2 rounded-full ${soundActive ? 'bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]' : 'bg-white/40'}`} />
            <span>{soundActive ? 'AUDIO TELEMETRY: 432Hz HARMONIC' : 'SOUND: MUTED'}</span>
          </button>
          <span className="hidden sm:inline text-[11px] font-mono text-white/40">
            DRAG HORIZONTALLY OR USE ARROWS
          </span>
        </div>

        {/* Center / Right: Progress Track & Navigation Arrows */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {CAROUSEL_ITEMS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-1.5 rounded-full transition-all ${
                  dotIdx === currentIndex
                    ? 'w-6 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
                    : 'w-1.5 bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Jump to item ${dotIdx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={goToPrev}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-sm text-white/80 transition-all hover:border-[#D4AF37] hover:text-white"
              aria-label="Previous screen"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-sm text-white/80 transition-all hover:border-[#D4AF37] hover:text-white"
              aria-label="Next screen"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── REUSABLE CURVED TV MONITOR CHASSIS COMPONENT ──
function CurvedTvMonitor({ item, isFocused }: { item: CarouselItem; isFocused: boolean }) {
  return (
    <div 
      className={`relative h-full w-full overflow-hidden rounded-2xl border transition-all duration-500 bg-[#0a0a0a] ${
        isFocused
          ? 'border-white/35 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_' + item.accentColor + '30]'
          : 'border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
      }`}
      style={{
        /* Beveled curved monitor inner depth */
        boxShadow: isFocused 
          ? `inset 0 0 25px rgba(0,0,0,0.85), 0 20px 60px rgba(0,0,0,0.9), 0 0 35px ${item.accentColor}30`
          : 'inset 0 0 20px rgba(0,0,0,0.9), 0 10px 40px rgba(0,0,0,0.9)',
      }}
    >
      {/* Outer Bevel Highlight Stroke */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none z-30" />

      {/* Screen Display Surface */}
      <div className="relative h-full w-full overflow-hidden bg-black">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 340px, (max-width: 1200px) 500px, 640px"
          className="object-cover transition-transform duration-700 ease-out"
        />

        {/* Dark Vignette Gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 pointer-events-none" />

        {/* Curved Glass Specular Highlight (The Secret from Circuit's Alche Manual) */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 18%, transparent 50%, rgba(255,255,255,0.02) 82%, rgba(255,255,255,0.12) 100%)',
          }}
        />

        {/* Scanline CRT Phosphor Mesh */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.05] z-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Top Corner HUD Brackets */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
          <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] bg-black/70 px-2 py-0.5 rounded border border-white/10">
            {item.dateBadge}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accentColor }} />
          <span className="text-[10px] font-mono tracking-wider text-white/70 bg-black/70 px-2 py-0.5 rounded border border-white/10">
            {item.statusBadge}
          </span>
        </div>

        {/* Center High-Voltage Lightning Arc for Item 01 */}
        {item.id === 'roman-strike' && (
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_15px_#00E5FF] pointer-events-none" />
        )}

        {/* Bottom Screen Overlay */}
        <div className="absolute bottom-3 left-4 right-4 z-20 space-y-1">
          <div className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase">
            {item.category}
          </div>

          <h4 className="text-base sm:text-xl font-bold text-white font-serif tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {item.title}
          </h4>

          {isFocused && (
            <p className="text-[11px] sm:text-xs text-[#E5E4E2]/80 font-serif leading-relaxed line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Metallic Monitor Bezel Chin Bar */}
      <div className="h-6 w-full border-t border-white/10 bg-[#121212] px-3 flex items-center justify-between text-[9px] font-mono text-white/40">
        <span>MTM CURVED DISPLAY // 16:9</span>
        <span>{item.chipset}</span>
      </div>
    </div>
  );
}
