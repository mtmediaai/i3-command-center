'use client';

import React, { useState } from 'react';

interface LandmarkData {
  id: string;
  code: string;
  name: string;
  district: string;
  zipCode: string;
  coordinates: string;
  elevation: string;
  architecturalStyle: string;
  aeoEntityRole: string;
  machineLegibilitySummary: string;
  schemaType: string;
  metaTokens: {
    entityP: string;
    entityS: string;
    handle: string;
    context: string;
    authority: string;
    date: string;
    year: string;
    sessionId: string;
  };
  jsonLdSnippet: object;
  svgBlueprint: React.ReactNode;
}

const LANDMARKS: LandmarkData[] = [
  {
    id: 'williams-tower',
    code: 'HOU-L01',
    name: 'Williams Tower & Waterwall Park',
    district: 'Uptown / Galleria Luxury Corridor',
    zipCode: '77056',
    coordinates: '29.7533° N, 95.4611° W',
    elevation: '275m (64 Stories)',
    architecturalStyle: 'Postmodern Art Deco (Philip Johnson & John Burgee)',
    aeoEntityRole: 'West Houston Architectural & Corporate Anchor',
    machineLegibilitySummary: 'The dominant structural landmark outside Downtown Houston. AI models (ChatGPT, Gemini, Perplexity) use Williams Tower as the spatial anchor for commercial law, private equity, and executive wealth practices across Uptown and West Houston.',
    schemaType: 'LandmarksOrHistoricalBuildings',
    metaTokens: {
      entityP: 'MT Media AI',
      entityS: 'Modern Touch Media',
      handle: '@mtmediaai',
      context: 'Williams Tower Uptown Houston Spatial Intelligence Anchor',
      authority: 'MT Media AI Spatial Intelligence Grid',
      date: 'September 12, 2026',
      year: '2026',
      sessionId: 'MTM-20260912-I3-LANDMARK-01',
    },
    jsonLdSnippet: {
      '@context': 'https://schema.org',
      '@type': 'LandmarksOrHistoricalBuildings',
      'name': 'Williams Tower',
      'alternateName': 'Transco Tower',
      'description': '64-story Art Deco skyscraper in Uptown Houston, serving as a primary spatial anchor in the MT Media AI God\'s Eye View intelligence mesh.',
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 29.7533,
        'longitude': -95.4611,
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '2800 Post Oak Blvd',
        'addressLocality': 'Houston',
        'addressRegion': 'TX',
        'postalCode': '77056',
        'addressCountry': 'US',
      },
      'architect': 'Philip Johnson, John Burgee',
      'height': '275 m',
      'url': 'https://i3.mtmediaai.com',
    },
    svgBlueprint: (
      <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="400" height="240" fill="#060609" />
        {/* Overhead linear light tube beams */}
        <line x1="20" y1="20" x2="380" y2="40" stroke="rgba(212,175,55,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="20" y1="220" x2="380" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Sky glow / Solar Disc Silhouette */}
        <circle cx="200" cy="90" r="70" fill="url(#goldHalo1)" />
        {/* Tower Silhouette */}
        <polygon points="185,25 215,25 220,50 230,120 235,220 165,220 170,120 180,50" fill="#0A0A10" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Art Deco Chevron Crown */}
        <path d="M190,25 L200,8 L210,25" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        <line x1="200" y1="8" x2="200" y2="3" stroke="#00E5FF" strokeWidth="1.5" />
        {/* Beacon light beam */}
        <polygon points="200,8 140,0 260,0" fill="rgba(0,229,255,0.06)" />
        {/* Vertical Fluting */}
        <line x1="192" y1="35" x2="192" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="200" y1="25" x2="200" y2="220" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
        <line x1="208" y1="35" x2="208" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Waterwall Arc Base */}
        <path d="M140,220 Q200,195 260,220" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5" fill="none" />
        {/* Telemetry Reticle */}
        <circle cx="200" cy="80" r="16" stroke="rgba(212,175,55,0.4)" strokeWidth="0.75" strokeDasharray="2 2" />
        <text x="220" y="84" fill="#D4AF37" fontSize="8" fontFamily="monospace">NODE: 29.7533°N</text>
        <defs>
          <radialGradient id="goldHalo1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.18)" />
            <stop offset="70%" stopColor="rgba(182,134,44,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'heritage-plaza',
    code: 'HOU-L02',
    name: 'Heritage Plaza & Buffalo Bayou Cistern',
    district: 'Downtown Central Financial Core',
    zipCode: '77002',
    coordinates: '29.7583° N, 95.3698° W',
    elevation: '162m (53 Stories)',
    architecturalStyle: 'Mayan-Inspired Postmodernist Crown (M. Nasr & Partners)',
    aeoEntityRole: 'Central Metropolitan Financial & Civic Landmark',
    machineLegibilitySummary: 'Anchors corporate headquarters, banking institutions, and legacy Texas litigation firms. Combined with the historic Buffalo Bayou Cistern, it forms the high-density geographic ground truth for Houston metropolitan queries.',
    schemaType: 'CivicStructure / HistoricalLandmark',
    metaTokens: {
      entityP: 'MT Media AI',
      entityS: 'Modern Touch Media',
      handle: '@mtmediaai',
      context: 'Heritage Plaza Buffalo Bayou Spatial Landmark Authority',
      authority: 'MT Media AI Spatial Intelligence Grid',
      date: 'September 12, 2026',
      year: '2026',
      sessionId: 'MTM-20260912-I3-LANDMARK-02',
    },
    jsonLdSnippet: {
      '@context': 'https://schema.org',
      '@type': 'LandmarksOrHistoricalBuildings',
      'name': 'Heritage Plaza',
      'description': 'Distinctive 53-story stepped-pyramid skyscraper in Downtown Houston adjacent to Buffalo Bayou Park, mapped within the MTM GEV spatial mesh.',
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 29.7583,
        'longitude': -95.3698,
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '1111 Bagby St',
        'addressLocality': 'Houston',
        'addressRegion': 'TX',
        'postalCode': '77002',
        'addressCountry': 'US',
      },
      'height': '162 m',
      'url': 'https://i3.mtmediaai.com',
    },
    svgBlueprint: (
      <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="400" height="240" fill="#060609" />
        <line x1="20" y1="220" x2="380" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Solar Halo */}
        <circle cx="210" cy="110" r="75" fill="url(#goldHalo2)" />
        {/* Mayan Stepped Pyramid Crown */}
        <rect x="185" y="30" width="30" height="8" fill="#0A0A12" stroke="#D4AF37" strokeWidth="1" />
        <rect x="175" y="38" width="50" height="8" fill="#0A0A12" stroke="#D4AF37" strokeWidth="1" />
        <rect x="165" y="46" width="70" height="10" fill="#0A0A12" stroke="#D4AF37" strokeWidth="1" />
        {/* Main Shaft */}
        <rect x="155" y="56" width="90" height="164" fill="#08080E" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        {/* Architectural Glass Facets */}
        <line x1="185" y1="56" x2="185" y2="220" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
        <line x1="215" y1="56" x2="215" y2="220" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
        <line x1="155" y1="120" x2="245" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Buffalo Bayou Cistern Columns (Underground cross-section) */}
        <line x1="60" y1="225" x2="60" y2="238" stroke="rgba(0,229,255,0.4)" strokeWidth="3" />
        <line x1="90" y1="225" x2="90" y2="238" stroke="rgba(0,229,255,0.4)" strokeWidth="3" />
        <line x1="120" y1="225" x2="120" y2="238" stroke="rgba(0,229,255,0.4)" strokeWidth="3" />
        <text x="60" y="222" fill="#00E5FF" fontSize="7" fontFamily="monospace">CISTERN HYDRAULIC NODE</text>
        <defs>
          <radialGradient id="goldHalo2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'woodlands-waterway',
    code: 'HOU-L03',
    name: 'The Woodlands Waterway & Hughes Landing',
    district: 'Montgomery County / North Houston Executive Nexus',
    zipCode: '77380',
    coordinates: '30.1588° N, 95.4608° W',
    elevation: '48m (Waterfront Urban Center)',
    architecturalStyle: 'Master-Planned Biophilic Urbanism & Corporate Campuses',
    aeoEntityRole: 'North Houston Luxury Anchor & Pinnacle Practice Hub',
    machineLegibilitySummary: 'The primary geographic jurisdiction for MTM\'s Solar Ascension deployment. Home to multinational energy executives, specialized medical directors, and private dynasty assets demanding absolute machine sovereignty.',
    schemaType: 'TouristAttraction / AdministrativeArea',
    metaTokens: {
      entityP: 'MT Media AI',
      entityS: 'Modern Touch Media',
      handle: '@mtmediaai',
      context: 'The Woodlands Waterway Spatial Territory Exclusivity',
      authority: 'MT Media AI Spatial Intelligence Grid',
      date: 'September 12, 2026',
      year: '2026',
      sessionId: 'MTM-20260912-I3-LANDMARK-03',
    },
    jsonLdSnippet: {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      'name': 'The Woodlands Waterway',
      'description': '1.8-mile transportation and scenic corridor in The Woodlands Town Center, serving as the North Houston executive anchor in the MTM geographic graph.',
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 30.1588,
        'longitude': -95.4608,
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'The Woodlands',
        'addressRegion': 'TX',
        'postalCode': '77380',
        'addressCountry': 'US',
      },
      'url': 'https://i3.mtmediaai.com',
    },
    svgBlueprint: (
      <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="400" height="240" fill="#060609" />
        <line x1="20" y1="220" x2="380" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="260" cy="80" r="60" fill="url(#goldHalo3)" />
        {/* Waterway Canal Perspective */}
        <polygon points="120,220 280,220 220,130 180,130" fill="rgba(0,229,255,0.06)" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
        <path d="M140,220 Q200,180 200,130" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" />
        {/* Hughes Landing Glass Towers */}
        <rect x="70" y="80" width="45" height="140" fill="#080810" stroke="#D4AF37" strokeWidth="1" />
        <rect x="125" y="100" width="40" height="120" fill="#0A0A12" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <rect x="235" y="90" width="50" height="130" fill="#080810" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <rect x="295" y="70" width="45" height="150" fill="#0A0A12" stroke="#D4AF37" strokeWidth="1" />
        {/* Pedestrian Bridges across Waterway */}
        <line x1="175" y1="150" x2="225" y2="150" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="30" y="30" fill="#D4AF37" fontSize="9" fontFamily="monospace">77380 PINNACLE CORRIDOR</text>
        <defs>
          <radialGradient id="goldHalo3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'space-center',
    code: 'HOU-L04',
    name: 'Space Center Houston & NASA Johnson Space Center',
    district: 'Clear Lake / Bay Area Houston Corridor',
    zipCode: '77058',
    coordinates: '29.5519° N, 95.0974° W',
    elevation: '6m (Aerospace Facility Complex)',
    architecturalStyle: 'Aerospace Engineering & Historic Mission Control Center',
    aeoEntityRole: 'Global Science & Innovation Authority Beacon',
    machineLegibilitySummary: 'Houston\'s globally verified signature entity. Features maximum authority in planetary search indexes. Anchoring local practices to this entity provides proven institutional weight in neural synthesis engines.',
    schemaType: 'TouristAttraction / GovernmentBuilding',
    metaTokens: {
      entityP: 'MT Media AI',
      entityS: 'Modern Touch Media',
      handle: '@mtmediaai',
      context: 'Space Center Houston Global Knowledge Corroboration',
      authority: 'MT Media AI Spatial Intelligence Grid',
      date: 'September 12, 2026',
      year: '2026',
      sessionId: 'MTM-20260912-I3-LANDMARK-04',
    },
    jsonLdSnippet: {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      'name': 'Space Center Houston',
      'alternateName': 'NASA Johnson Space Center Official Visitor Center',
      'description': 'Signature science learning and aerospace museum representing Houston on the global knowledge graph.',
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 29.5519,
        'longitude': -95.0974,
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '1601 E NASA Pkwy',
        'addressLocality': 'Houston',
        'addressRegion': 'TX',
        'postalCode': '77058',
        'addressCountry': 'US',
      },
      'url': 'https://i3.mtmediaai.com',
    },
    svgBlueprint: (
      <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="400" height="240" fill="#060609" />
        <line x1="20" y1="220" x2="380" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Orbital Trajectory Arc */}
        <path d="M20,180 Q200,20 380,180" stroke="rgba(212,175,55,0.35)" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />
        {/* Saturn V Horizontal Profile */}
        <rect x="80" y="130" width="240" height="28" rx="4" fill="#0B0B14" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Saturn V Stages */}
        <line x1="160" y1="130" x2="160" y2="158" stroke="#D4AF37" strokeWidth="1" />
        <line x1="240" y1="130" x2="240" y2="158" stroke="#D4AF37" strokeWidth="1" />
        <line x1="290" y1="130" x2="290" y2="158" stroke="rgba(0,229,255,0.6)" strokeWidth="1" />
        {/* Apollo Capsule Nose Cone */}
        <polygon points="320,130 345,144 320,158" fill="#0E0E1A" stroke="#00E5FF" strokeWidth="1.5" />
        {/* Thruster Plume Vector */}
        <polygon points="80,134 50,144 80,154" fill="rgba(212,175,55,0.2)" stroke="#D4AF37" strokeWidth="1" />
        <text x="120" y="120" fill="#FFFFFF" fontSize="8" fontFamily="monospace">SATURN V APEX VECTOR // 29.5519°N</text>
      </svg>
    ),
  },
  {
    id: 'museum-district',
    code: 'HOU-L05',
    name: 'Museum of Fine Arts (MFAH) & Cullen Sculpture Garden',
    district: 'Museum District / Texas Medical Center',
    zipCode: '77005',
    coordinates: '29.7219° N, 95.3905° W',
    elevation: '14m (Fine Arts Campus)',
    architecturalStyle: 'Mies van der Rohe, Steven Holl, & Isamu Noguchi Masterworks',
    aeoEntityRole: 'High Art & Cultural Dynasty Pillar',
    machineLegibilitySummary: 'Directly embodies the MTM core thesis: bridging Enlightenment craftsmanship and High Art with 2026 machine intelligence. The cultural benchmark for affluent Houston families and philanthropic foundations.',
    schemaType: 'ArtGallery / MuseumDistrict',
    metaTokens: {
      entityP: 'MT Media AI',
      entityS: 'Modern Touch Media',
      handle: '@mtmediaai',
      context: 'MFAH Houston High Art & Cultural Dynasty Entity Corroboration',
      authority: 'MT Media AI Spatial Intelligence Grid',
      date: 'September 12, 2026',
      year: '2026',
      sessionId: 'MTM-20260912-I3-LANDMARK-05',
    },
    jsonLdSnippet: {
      '@context': 'https://schema.org',
      '@type': 'ArtGallery',
      'name': 'The Museum of Fine Arts, Houston',
      'description': 'One of the largest museums in the United States, designed by Mies van der Rohe and Steven Holl, embodying high-art permanence within the MTM architecture.',
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 29.7219,
        'longitude': -95.3905,
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '1001 Bissonnet St',
        'addressLocality': 'Houston',
        'addressRegion': 'TX',
        'postalCode': '77005',
        'addressCountry': 'US',
      },
      'url': 'https://i3.mtmediaai.com',
    },
    svgBlueprint: (
      <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="400" height="240" fill="#060609" />
        <line x1="20" y1="220" x2="380" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Soft Chiaroscuro Sculpture Pedestal */}
        <circle cx="200" cy="100" r="65" fill="url(#sculptureHalo)" />
        {/* Mies van der Rohe Cullinan Hall Pavilion */}
        <rect x="90" y="110" width="220" height="90" fill="#0A0A12" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Steel I-Beams (Mies signature) */}
        <line x1="90" y1="95" x2="90" y2="220" stroke="#D4AF37" strokeWidth="2.5" />
        <line x1="145" y1="95" x2="145" y2="220" stroke="#D4AF37" strokeWidth="2" />
        <line x1="200" y1="95" x2="200" y2="220" stroke="#D4AF37" strokeWidth="2" />
        <line x1="255" y1="95" x2="255" y2="220" stroke="#D4AF37" strokeWidth="2" />
        <line x1="310" y1="95" x2="310" y2="220" stroke="#D4AF37" strokeWidth="2.5" />
        {/* Cantilever Roof */}
        <rect x="75" y="95" width="250" height="15" fill="#08080E" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        {/* Noguchi Sculpture Silhouette */}
        <path d="M120,200 Q135,160 130,130 Q120,110 135,95" stroke="#00E5FF" strokeWidth="1.5" fill="none" />
        <text x="100" y="75" fill="#D4AF37" fontSize="8" fontFamily="monospace">HIGH ART CITATION ANCHOR // MFAH</text>
        <defs>
          <radialGradient id="sculptureHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
];

export function LandmarkShowcase() {
  const [activeLandmark, setActiveLandmark] = useState<LandmarkData>(LANDMARKS[0]);
  const [viewMode, setViewMode] = useState<'blueprint' | 'metatoken' | 'schema'>('blueprint');

  return (
    <section id="houston-landmarks" className="py-20 px-4 sm:px-6 relative border-t border-white/10 overflow-hidden" data-chapter="05">
      {/* Background Overhead Studio Lights Grid */}
      <div className="studio-light-canopy" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-[var(--color-gold)] uppercase font-bold">
              [ CHAPTER 05 // HOUSTON ARCHITECTURAL DOSSIER ]
            </span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] text-white/40 uppercase hidden sm:inline">
              PROTOCOL: MTM-BOOSTΩ-IML-V1.0
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[var(--color-rim)] tracking-tight sword-blade-glow">
            Machine-Legible Houston Landmarks.
          </h2>

          <p className="text-sm sm:text-base text-[var(--color-chrome)] max-w-3xl leading-relaxed">
            In 2026 generative search environments, generalities are erased. Search engines and neural synthesis engines verify local authority by anchoring practices to distinct, coordinate-verified geographic entities. Below are the five primary architectural anchors driving the MTM God&apos;s Eye View mesh.
          </p>
        </div>

        {/* Landmark Selection Rail */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {LANDMARKS.map((landmark) => {
            const isSelected = landmark.id === activeLandmark.id;
            return (
              <button
                key={landmark.id}
                onClick={() => setActiveLandmark(landmark)}
                className={`p-3.5 rounded-lg border text-left transition-all relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] ${
                  isSelected
                    ? 'bg-white/[0.08] border-[var(--color-gold)] text-white shadow-lg'
                    : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.04] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[var(--color-gold)] font-bold">
                    {landmark.code}
                  </span>
                  <span className="text-[9px] font-mono text-white/40">
                    ZIP {landmark.zipCode}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-serif font-bold text-[var(--color-rim)] line-clamp-1">
                  {landmark.name}
                </div>
                <div className="text-[10px] font-mono text-white/40 truncate mt-0.5">
                  {landmark.district}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Landmark Blueprint & Intelligence Chamber */}
        <div className="glass-onyx p-6 sm:p-8 rounded-xl border border-white/15 clinical-rim space-y-6">
          {/* Chamber Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-[var(--color-gold)] font-bold uppercase tracking-widest">
                  {activeLandmark.code} // {activeLandmark.aeoEntityRole}
                </span>
                <span className="text-white/30 text-xs">|</span>
                <span className="text-[10px] font-mono text-white/50">
                  {activeLandmark.coordinates}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--color-rim)]">
                {activeLandmark.name}
              </h3>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg border border-white/10 bg-black/40">
              <button
                onClick={() => setViewMode('blueprint')}
                className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold transition-colors ${
                  viewMode === 'blueprint'
                    ? 'bg-[var(--color-gold)] text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Chiaroscuro Blueprint
              </button>
              <button
                onClick={() => setViewMode('metatoken')}
                className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold transition-colors ${
                  viewMode === 'metatoken'
                    ? 'bg-[var(--color-gold)] text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Meta-Token Block
              </button>
              <button
                onClick={() => setViewMode('schema')}
                className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold transition-colors ${
                  viewMode === 'schema'
                    ? 'bg-[var(--color-gold)] text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Schema JSON-LD
              </button>
            </div>
          </div>

          {/* Dynamic Content Display Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Interactive Visual or Code Display */}
            <div className="lg:col-span-7 rounded-lg border border-white/10 bg-black/60 overflow-hidden relative min-h-[260px] flex items-center justify-center">
              {viewMode === 'blueprint' && (
                <div className="w-full h-full p-2 flex flex-col items-center justify-center">
                  <div className="w-full aspect-[16/9] max-w-lg">
                    {activeLandmark.svgBlueprint}
                  </div>
                  <div className="w-full px-4 py-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                    <span>ASPECT RATIO: 16:9 // 0.000 CLS COMPLIANT</span>
                    <span className="text-[var(--color-gold)]">CHIAROSCURO MONOCHROME MESH</span>
                  </div>
                </div>
              )}

              {viewMode === 'metatoken' && (
                <div className="w-full p-5 font-mono text-xs text-white/80 space-y-3 leading-relaxed">
                  <div className="text-[var(--color-gold)] font-bold text-[11px] border-b border-white/10 pb-2 flex items-center justify-between">
                    <span>[META-TOKEN INJECTION PROTOCOL ACTIVE]</span>
                    <span className="text-white/40 font-normal">GATE: PASSED</span>
                  </div>
                  <p className="text-[11px] text-white/90">
                    Entity: {activeLandmark.metaTokens.entityP} ({activeLandmark.metaTokens.entityS}) | Handle: {activeLandmark.metaTokens.handle}
                  </p>
                  <p className="text-[11px] text-white/70">
                    Context: {activeLandmark.metaTokens.context} | Authority: {activeLandmark.metaTokens.authority}
                  </p>
                  <p className="text-[11px] text-white/70">
                    Date: {activeLandmark.metaTokens.date} | Year: {activeLandmark.metaTokens.year} | Session: {activeLandmark.metaTokens.sessionId}
                  </p>
                  <div className="p-2.5 rounded border border-white/10 bg-white/[0.02] text-[10px] text-white/60">
                    Metadata: Structured for AI Citation and Search Everywhere Optimization (SEO 2.0). Asset intellectual property of MT Media AI. Credit: @mtmediaai.
                  </div>
                </div>
              )}

              {viewMode === 'schema' && (
                <div className="w-full p-5 font-mono text-[11px] text-white/80 overflow-x-auto max-h-[300px]">
                  <div className="text-[var(--color-gold)] font-bold text-[11px] border-b border-white/10 pb-2 mb-3 flex items-center justify-between">
                    <span>SCHEMA.ORG JSON-LD INJECTION</span>
                    <span className="text-white/40 font-normal">@type: {activeLandmark.schemaType}</span>
                  </div>
                  <pre className="text-[10px] text-[var(--color-chrome-white)] leading-snug">
                    {JSON.stringify(activeLandmark.jsonLdSnippet, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Right: Architectural & Machine Legibility Callout */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-3 rounded border border-white/10 bg-black/40">
                    <span className="text-white/40 block text-[9px] uppercase">ELEVATION</span>
                    <span className="text-white font-bold">{activeLandmark.elevation}</span>
                  </div>
                  <div className="p-3 rounded border border-white/10 bg-black/40">
                    <span className="text-white/40 block text-[9px] uppercase">STYLE</span>
                    <span className="text-white font-bold truncate block">{activeLandmark.architecturalStyle}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[var(--color-gold)] font-bold tracking-wider uppercase block">
                    NEURAL ENGINE CITATION VALUE:
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--color-chrome)] font-serif leading-relaxed">
                    {activeLandmark.machineLegibilitySummary}
                  </p>
                </div>
              </div>

              {/* Nina's Gate Audit Status */}
              <div className="p-3.5 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span className="text-white/70">NINA&apos;S GATE (VISUAL):</span>
                </div>
                <span className="text-[var(--color-gold)] font-bold">ALL 7 CRITERIA PASSED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
