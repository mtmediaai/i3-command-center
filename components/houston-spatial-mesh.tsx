'use client';

import React, { useState } from 'react';

interface LandmarkNode {
  id: string;
  name: string;
  district: string;
  zipCode: string;
  coordinates: string;
  elevation: string;
  role: string;
  aiDiagnostic: string;
  schemaTag: string;
  color: string;
}

const HOUSTON_LANDMARKS: LandmarkNode[] = [
  {
    id: 'woodlands',
    name: 'The Woodlands Waterway',
    district: 'Montgomery County Luxury Anchor',
    zipCode: '77380',
    coordinates: '30°09\'42"N 95°27\'36"W',
    elevation: '48m',
    role: 'Pinnacle Pilot Corridor',
    aiDiagnostic: 'Primary territory anchor. Real-world executive trust requires structured schema to avoid erasure in Google AI Overviews and Perplexity.',
    schemaTag: 'TouristAttraction / AdministrativeArea',
    color: '#D4AF37',
  },
  {
    id: 'williams-tower',
    name: 'Williams Tower & Waterwall',
    district: 'Uptown / Galleria District',
    zipCode: '77056',
    coordinates: '29°44\'14"N 95°27\'41"W',
    elevation: '275m',
    role: 'West Houston Architectural Beacon',
    aiDiagnostic: 'Major geographic landmark. AI engines utilize this structural anchor to map corporate and commercial service relevance across Greater Houston.',
    schemaTag: 'LandmarksOrHistoricalBuildings',
    color: '#00E5FF',
  },
  {
    id: 'river-oaks',
    name: 'Memorial & River Oaks Corridor',
    district: 'Estate-Level Private Wealth',
    zipCode: '77019',
    coordinates: '29°45\'18"N 95°24\'32"W',
    elevation: '17m',
    role: 'Private Advisory & High-Net-Worth Nexus',
    aiDiagnostic: 'Highest real-world referral trust in Texas, but critical AI vulnerability: zero machine-readable entity infrastructure means LLMs default to competitors.',
    schemaTag: 'Place / HighWealthNeighborhood',
    color: '#E5E4E2',
  },
  {
    id: 'downtown',
    name: 'Downtown Skyline & Buffalo Bayou',
    district: 'Central Metro Core',
    zipCode: '77002',
    coordinates: '29°45\'32"N 95°21\'48"W',
    elevation: '15m',
    role: 'Urban Financial Core & Historic Cistern',
    aiDiagnostic: 'Dense neural citation cluster. The historical and financial ground anchor for metropolitan entity authority in ChatGPT and Gemini.',
    schemaTag: 'CivicStructure / BuffaloBayouPark',
    color: '#D4AF37',
  },
  {
    id: 'med-center',
    name: 'Texas Medical Center & Museum District',
    district: 'Academic & Cultural Epicenter',
    zipCode: '77030',
    coordinates: '29°42\'36"N 95°23\'56"W',
    elevation: '14m',
    role: 'Institutional Knowledge Anchor',
    aiDiagnostic: 'High authority citation density. Surrounding professional practices require corroboration velocity to capture discovery intent.',
    schemaTag: 'EducationalOrganization / MuseumDistrict',
    color: '#C0C0C0',
  },
];

export function HoustonSpatialMesh() {
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkNode>(HOUSTON_LANDMARKS[0]);

  return (
    <div className="space-y-6">
      {/* HUD Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" aria-hidden="true" />
          <span className="text-[var(--color-gold)] font-bold tracking-widest uppercase">
            GEV SPATIAL TRAJECTORY : HOUSTON METRO
          </span>
        </div>
        <div className="text-white/50 tracking-wider">
          COORDINATES: {selectedLandmark.coordinates} : ELEV: {selectedLandmark.elevation}
        </div>
      </div>

      {/* Main Interactive Chamber */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interactive Houston Landmark Selector */}
        <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 block mb-1">
              SELECT GEOGRAPHIC ENTITY NODE
            </span>
            {HOUSTON_LANDMARKS.map((item, idx) => {
              const isSelected = selectedLandmark.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedLandmark(item)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] ${
                    isSelected
                      ? 'bg-white/[0.06] border-[var(--color-gold)] text-white shadow-lg'
                      : 'bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.04] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[var(--color-gold)] font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-serif font-bold text-white leading-snug">
                        {item.name}
                      </div>
                      <div className="text-[10px] font-mono text-white/50 uppercase">
                        {item.district}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-right text-white/60">
                    ZIP {item.zipCode}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-[11px] font-mono text-white/50 flex items-center justify-between">
            <span>SPATIAL RESOLUTION: 0.1M GSD</span>
            <span className="text-[var(--color-gold)] font-bold">NODE LOCK: ACTIVE</span>
          </div>
        </div>

        {/* Right: Telemetry Diagnostic Card */}
        <div className="lg:col-span-7 glass-onyx p-6 sm:p-8 rounded-xl border border-white/15 clinical-rim flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Subtle GEV Background Watermark Grid */}
          <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-white/10 select-none pointer-events-none text-right">
            <div>GEV // FLIGHT PATH 29.7604° N</div>
            <div>SENSOR: HYPERSPECTRAL // 4K</div>
            <div>DATUM: WGS 84 // HOUSTON TX</div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="forge-echo-containment">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
                  {selectedLandmark.role}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/40">
                SCHEMA: {selectedLandmark.schemaTag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[var(--color-rim)] sword-blade-glow">
              {selectedLandmark.name}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-lg border border-white/10 bg-black/40 text-[11px] font-mono">
              <div>
                <span className="text-white/40 block text-[9px] uppercase">COORDINATES</span>
                <span className="text-white font-bold">{selectedLandmark.coordinates}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px] uppercase">POSTAL NODE</span>
                <span className="text-[var(--color-gold)] font-bold">TX {selectedLandmark.zipCode}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-white/40 block text-[9px] uppercase">ALTITUDE</span>
                <span className="text-white font-bold">{selectedLandmark.elevation}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[var(--color-gold)] uppercase block">
                MACHINE LEGIBILITY ANALYSIS:
              </span>
              <p className="text-xs sm:text-sm text-[var(--color-chrome)] leading-relaxed font-serif">
                {selectedLandmark.aiDiagnostic}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50 gap-2 relative z-10">
            <span>GROUNDING: LOCAL KNOWLEDGE GRAPH</span>
            <span className="text-[var(--color-gold)]">
              I³ SYSTEM // GEOGRAPHIC CORROBORATION
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
