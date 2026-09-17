import React from 'react';
import { ComponentCard } from '../ComponentCard';

interface ExpressiveSectionProps {
  currentTheme: string;
  onThemeSelect: (theme: string) => void;
}

export const ExpressiveSection: React.FC<ExpressiveSectionProps> = ({
  currentTheme,
  onThemeSelect,
}) => {
  const expressiveSnippet = `/* Material 3 Expressive Design Tokens */
:root {
  /* Dynamic High-Contrast Tonal Roles */
  --md-sys-color-primary: #B32824;
  --md-sys-color-primary-container: #FFDAD6;
  --md-sys-color-on-primary-container: #410002;
  
  --md-sys-color-tertiary: #795900;
  --md-sys-color-tertiary-container: #FFE088;
  
  /* Expressive Shape System */
  --md-filled-button-container-shape: 9999px; /* Ultra-pill */
}

/* Expressive Asymmetric Card */
.m3-expressive-card {
  border-radius: 36px 12px 36px 36px;
  background: var(--md-sys-color-surface);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}`;

  return (
    <div className="flex flex-col gap-8">
      {/* Overview & Theme Switcher */}
      <ComponentCard
        title="Material 3 Expressive (Android 15+ & Pixel Evolution)"
        subtitle="Google's expressive evolution emphasizes playful morphing shapes, high-chroma tonal palettes, and expressive typography"
        snippet={expressiveSnippet}
      >
        <div className="flex flex-col gap-8">
          {/* Theme Selector Pills */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Select an Expressive Palette (Updates components live)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Baseline */}
              <button
                onClick={() => onThemeSelect('baseline')}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-2 ${
                  currentTheme === 'baseline'
                    ? 'border-[#6750A4] bg-purple-50/70 shadow-xs ring-2 ring-[#6750A4]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#6750A4]"></span>
                  <span className="w-4 h-4 rounded-full bg-[#EADDFF]"></span>
                  <span className="w-4 h-4 rounded-full bg-[#7D5260]"></span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Baseline M3</h4>
                  <p className="text-xs text-slate-500">Google Purple & Lavender</p>
                </div>
              </button>

              {/* Coral Sunrise */}
              <button
                onClick={() => onThemeSelect('expressive-coral')}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-2 ${
                  currentTheme === 'expressive-coral'
                    ? 'border-[#B32824] bg-red-50/70 shadow-xs ring-2 ring-[#B32824]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#B32824]"></span>
                  <span className="w-4 h-4 rounded-full bg-[#FFDAD6]"></span>
                  <span className="w-4 h-4 rounded-full bg-[#795900]"></span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Coral Sunrise</h4>
                  <p className="text-xs text-slate-500">Warm, energetic & vibrant</p>
                </div>
              </button>

              {/* Cyber Mint */}
              <button
                onClick={() => onThemeSelect('expressive-mint')}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-2 ${
                  currentTheme === 'expressive-mint'
                    ? 'border-[#006C50] bg-emerald-50/70 shadow-xs ring-2 ring-[#006C50]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#006C50]"></span>
                  <span className="w-4 h-4 rounded-full bg-[#88F8CD]"></span>
                  <span className="w-4 h-4 rounded-full bg-[#3D6473]"></span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Cyber Mint</h4>
                  <p className="text-xs text-slate-500">Modern tech & crisp aquamarine</p>
                </div>
              </button>

              {/* Berry Neon */}
              <button
                onClick={() => onThemeSelect('expressive-berry')}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-2 ${
                  currentTheme === 'expressive-berry'
                    ? 'border-[#8E1F79] bg-pink-50/70 shadow-xs ring-2 ring-[#8E1F79]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#8E1F79]"></span>
                  <span className="w-4 h-4 rounded-full bg-[#FFD7F0]"></span>
                  <span className="w-4 h-4 rounded-full bg-[#844C47]"></span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Berry Neon</h4>
                  <p className="text-xs text-slate-500">Playful orchid & deep magenta</p>
                </div>
              </button>
            </div>
          </div>

          {/* Expressive Morphing Surfaces Showcase */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Expressive Surfaces & Playful Asymmetry
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Asymmetric Corner Hero */}
              <div className="p-6 rounded-tl-[40px] rounded-br-[40px] rounded-tr-[16px] rounded-bl-[16px] bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] flex flex-col justify-between gap-6 shadow-sm border border-black/5">
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                  <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/10">
                    Expressive
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold leading-tight">Asymmetric Squircle</h4>
                  <p className="text-xs opacity-80 mt-1">
                    Playful corner radii break rigid box grids to draw user gaze.
                  </p>
                </div>
                <md-filled-button className="self-start">
                  <md-icon slot="icon">explore</md-icon>
                  Try Now
                </md-filled-button>
              </div>

              {/* Card 2: Tertiary Tonal Accent */}
              <div className="p-6 rounded-[32px] bg-[var(--md-sys-color-tertiary-container)] text-[var(--md-sys-color-on-tertiary-container)] flex flex-col justify-between gap-6 shadow-sm border border-black/5">
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-3xl">palette</span>
                  <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/10">
                    Tertiary
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold leading-tight">Tonal Contrast</h4>
                  <p className="text-xs opacity-80 mt-1">
                    Tertiary colors provide complementary balance for notices and accents.
                  </p>
                </div>
                <md-filled-tonal-button className="self-start">
                  <md-icon slot="icon">thumb_up</md-icon>
                  Accent Action
                </md-filled-tonal-button>
              </div>

              {/* Card 3: Ultra-Pill Action Cluster */}
              <div className="p-6 rounded-[32px] bg-slate-50 border border-slate-200/80 flex flex-col justify-between gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Expressive Actions</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    High-energy pill buttons with spring hover animation.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <md-fab variant="primary" label="Create">
                    <md-icon slot="icon">brush</md-icon>
                  </md-fab>
                  <md-fab lowered label="Filter">
                    <md-icon slot="icon">filter_list</md-icon>
                  </md-fab>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-500 font-medium">
                  <span>Spring Physics</span>
                  <span className="text-emerald-700 font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};
