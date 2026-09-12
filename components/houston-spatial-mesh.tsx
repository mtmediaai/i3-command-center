'use client';

import React, { useState } from 'react';

interface LandmarkNode {
  id: string;
  code: string;
  name: string;
  district: string;
  zipCode: string;
  coordinates: string;
  elevation: string;
  role: string;
  aiDiagnostic: string;
  schemaTag: string;
  corroborationScore: string;
  scarcityStatus: string;
  radarPos: { cx: number; cy: number };
}

const HOUSTON_LANDMARKS: LandmarkNode[] = [
  {
    id: 'woodlands',
    code: 'GEO-01',
    name: 'The Woodlands Waterway',
    district: 'Montgomery County Luxury Anchor',
    zipCode: '77380',
    coordinates: '30°09\'42"N 95°27\'36"W',
    elevation: '48m',
    role: 'Pinnacle Pilot Corridor',
    aiDiagnostic: 'Primary territory anchor. Real-world executive trust requires structured schema to avoid erasure in Google AI Overviews and Perplexity.',
    schemaTag: 'TouristAttraction / AdministrativeArea',
    corroborationScore: '99.2%',
    scarcityStatus: 'TERRITORY LOCKED : 1 LEADER ALLOCATED',
    radarPos: { cx: 200, cy: 45 },
  },
  {
    id: 'williams-tower',
    code: 'GEO-02',
    name: 'Williams Tower & Waterwall',
    district: 'Uptown / Galleria District',
    zipCode: '77056',
    coordinates: '29°44\'14"N 95°27\'41"W',
    elevation: '275m',
    role: 'West Houston Architectural Beacon',
    aiDiagnostic: 'Major geographic landmark. AI engines utilize this structural anchor to map corporate and commercial service relevance across Greater Houston.',
    schemaTag: 'LandmarksOrHistoricalBuildings',
    corroborationScore: '97.8%',
    scarcityStatus: 'TERRITORY OPEN : EVALUATION PHASE',
    radarPos: { cx: 140, cy: 125 },
  },
  {
    id: 'river-oaks',
    code: 'GEO-03',
    name: 'Memorial & River Oaks Corridor',
    district: 'Estate-Level Private Wealth',
    zipCode: '77019',
    coordinates: '29°45\'18"N 95°24\'32"W',
    elevation: '17m',
    role: 'Private Advisory & High-Net-Worth Nexus',
    aiDiagnostic: 'Highest real-world referral trust in Texas, but critical AI vulnerability: zero machine-readable entity infrastructure means LLMs default to competitors.',
    schemaTag: 'Place / HighWealthNeighborhood',
    corroborationScore: '96.4%',
    scarcityStatus: 'TERRITORY OPEN : PRIORITY TARGET',
    radarPos: { cx: 180, cy: 110 },
  },
  {
    id: 'downtown',
    code: 'GEO-04',
    name: 'Downtown Skyline & Buffalo Bayou',
    district: 'Central Metro Core',
    zipCode: '77002',
    coordinates: '29°45\'32"N 95°21\'48"W',
    elevation: '15m',
    role: 'Urban Financial Core & Historic Cistern',
    aiDiagnostic: 'Dense neural citation cluster. The historical and financial ground anchor for metropolitan entity authority in ChatGPT and Gemini.',
    schemaTag: 'CivicStructure / BuffaloBayouPark',
    corroborationScore: '98.5%',
    scarcityStatus: 'TERRITORY ACTIVE : 1 SOVEREIGN MAPPED',
    radarPos: { cx: 220, cy: 115 },
  },
  {
    id: 'med-center',
    code: 'GEO-05',
    name: 'Texas Medical Center & Museum District',
    district: 'Academic & Cultural Epicenter',
    zipCode: '77030',
    coordinates: '29°42\'36"N 95°23\'56"W',
    elevation: '14m',
    role: 'Institutional Knowledge Anchor',
    aiDiagnostic: 'High authority citation density. Surrounding professional practices require corroboration velocity to capture discovery intent.',
    schemaTag: 'EducationalOrganization / MuseumDistrict',
    corroborationScore: '98.1%',
    scarcityStatus: 'TERRITORY PENDING : SECTOR INTAKE',
    radarPos: { cx: 200, cy: 165 },
  },
];

export function HoustonSpatialMesh() {
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkNode>(HOUSTON_LANDMARKS[0]);

  return (
    <div className="space-y-8">
      {/* Floating HUD Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" aria-hidden="true" />
          <span className="text-[var(--color-gold)] font-bold tracking-widest uppercase">
            GEV SPATIAL TRAJECTORY : HOUSTON METRO GRID
          </span>
        </div>
        <div className="text-white/40 tracking-wider">
          COORDINATES: {selectedLandmark.coordinates} : ELEV: {selectedLandmark.elevation}
        </div>
      </div>

      {/* Main Zero-Gravity Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Floating Geographic Selector */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-3">
            SELECT GEOGRAPHIC ENTITY NODE
          </span>
          <div className="space-y-2">
            {HOUSTON_LANDMARKS.map((item) => {
              const isSelected = selectedLandmark.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedLandmark(item)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] ${
                    isSelected
                      ? 'bg-white/[0.06] text-white shadow-2xl'
                      : 'bg-transparent text-white/50 hover:bg-white/[0.02] hover:text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[var(--color-gold)] font-bold">
                      {item.code}
                    </span>
                    <div>
                      <div className="text-sm font-serif font-bold text-white leading-snug">
                        {item.name}
                      </div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">
                        {item.district}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-[var(--color-lightning-blue)] font-bold block">
                      {item.corroborationScore}
                    </span>
                    <span className="text-[9px] font-mono text-white/30">
                      ZIP {item.zipCode}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              SUN & 3 KINGS SCARCITY PROTOCOL
            </span>
            <span className="text-[var(--color-gold)] font-bold">1 SEAT PER ZIP</span>
          </div>
        </div>

        {/* Right: Floating Radar & Telemetry Display */}
        <div className="lg:col-span-7 space-y-6">
          {/* Spatial Radar SVG Viewport */}
          <div className="w-full h-56 rounded-2xl bg-black/40 overflow-hidden relative backdrop-blur-md">
            <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Concentric Radar Rings */}
              <circle cx="200" cy="115" r="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <circle cx="200" cy="115" r="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <circle cx="200" cy="115" r="90" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              {/* Crosshair grid lines */}
              <line x1="200" y1="10" x2="200" y2="190" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" y1="115" x2="390" y2="115" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Trajectory Mesh lines connecting Houston Nodes */}
              <line x1="200" y1="45" x2="180" y2="110" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
              <line x1="180" y1="110" x2="140" y2="125" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
              <line x1="180" y1="110" x2="220" y2="115" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
              <line x1="220" y1="115" x2="200" y2="165" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />

              {/* Houston Nodes */}
              {HOUSTON_LANDMARKS.map((item) => {
                const isTarget = item.id === selectedLandmark.id;
                return (
                  <g key={item.id}>
                    <circle
                      cx={item.radarPos.cx}
                      cy={item.radarPos.cy}
                      r={isTarget ? 7 : 4}
                      fill={isTarget ? '#D4AF37' : 'rgba(255,255,255,0.3)'}
                      className={isTarget ? 'animate-pulse' : ''}
                    />
                    {isTarget && (
                      <circle
                        cx={item.radarPos.cx}
                        cy={item.radarPos.cy}
                        r={14}
                        stroke="#00E5FF"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    )}
                    <text
                      x={item.radarPos.cx + 9}
                      y={item.radarPos.cy + 3}
                      fill={isTarget ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
                      fontSize="7"
                      fontFamily="monospace"
                      fontWeight={isTarget ? 'bold' : 'normal'}
                    >
                      {item.code}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute top-3 left-4 text-[9px] font-mono text-[var(--color-gold)] font-bold tracking-wider">
              RADAR // ACTIVE TARGET: {selectedLandmark.code}
            </div>
            <div className="absolute bottom-3 right-4 text-[9px] font-mono text-white/40">
              {selectedLandmark.scarcityStatus}
            </div>
          </div>

          {/* Floating Diagnostic Text */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="floating-pill text-[var(--color-gold)] font-bold">
                {selectedLandmark.role}
              </span>
              <span className="text-[10px] font-mono text-[var(--color-lightning-blue)] font-bold">
                CORROBORATION INDEX: {selectedLandmark.corroborationScore}
              </span>
            </div>

            <h3 className="text-2xl font-bold font-serif text-[var(--color-rim)]">
              {selectedLandmark.name}
            </h3>

            <div className="grid grid-cols-3 gap-3 text-[11px] font-mono text-white/70">
              <div>
                <span className="text-white/30 block text-[9px] uppercase">COORDINATES</span>
                <span className="text-white font-bold">{selectedLandmark.coordinates}</span>
              </div>
              <div>
                <span className="text-white/30 block text-[9px] uppercase">POSTAL NODE</span>
                <span className="text-[var(--color-gold)] font-bold">TX {selectedLandmark.zipCode}</span>
              </div>
              <div>
                <span className="text-white/30 block text-[9px] uppercase">ALTITUDE</span>
                <span className="text-white font-bold">{selectedLandmark.elevation}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[var(--color-gold)] uppercase block">
                MACHINE LEGIBILITY ANALYSIS:
              </span>
              <p className="text-sm text-white/70 leading-relaxed font-serif">
                {selectedLandmark.aiDiagnostic}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
