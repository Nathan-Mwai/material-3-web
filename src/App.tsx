import React, { useState, useEffect } from 'react';
import './components/M3Register';
import { MinimalCard } from './components/MinimalCard';
import { DetailModal, type ComponentId } from './components/DetailModal';

const GoogleGLogo = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<ComponentId | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('baseline');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    if (currentTheme === 'baseline') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);

  const cards: {
    id: ComponentId;
    badge: string;
    title: string;
    category: string;
    type: string;
    bgColor: string;
    icon: string;
    renderPreview: () => React.ReactNode;
  }[] = [
    {
      id: 'buttons',
      badge: 'Actions • 5 Types',
      title: 'Buttons & FAB',
      category: 'Core Actions',
      type: 'actions',
      bgColor: '#F7F4FE', // Soft Lavender (Reference Card 1)
      icon: 'smart_button',
      renderPreview: () => (
        <div className="flex items-center gap-3">
          <md-filled-button onClick={() => setSelectedId('buttons')}>
            <md-icon slot="icon">send</md-icon>
            Filled
          </md-filled-button>
          <md-outlined-button onClick={() => setSelectedId('buttons')}>
            Outlined
          </md-outlined-button>
        </div>
      ),
    },
    {
      id: 'inputs',
      badge: 'Inputs • Forms',
      title: 'Text Fields',
      category: 'Form Controls',
      type: 'inputs',
      bgColor: '#FFF6EB', // Soft Peach / Warm Cream (Reference Card 2)
      icon: 'edit_note',
      renderPreview: () => (
        <div className="w-full max-w-[240px]">
          <md-outlined-text-field
            label="Google Account"
            value="alex@rivera.dev"
            className="w-full"
          >
            <md-icon slot="leading-icon">person</md-icon>
          </md-outlined-text-field>
        </div>
      ),
    },
    {
      id: 'selection',
      badge: 'Toggles • 3 Types',
      title: 'Selection Controls',
      category: 'Switches & Checks',
      type: 'selection',
      bgColor: '#F1F8EE', // Soft Mint / Honeydew (Reference Card 3)
      icon: 'toggle_on',
      renderPreview: () => (
        <div className="flex items-center gap-6">
          <md-switch selected icons></md-switch>
          <md-checkbox checked></md-checkbox>
          <md-radio checked name="card-demo-radio"></md-radio>
        </div>
      ),
    },
    {
      id: 'chips',
      badge: 'Chips • 4 Types',
      title: 'Chips & Tags',
      category: 'Metadata & Filters',
      type: 'chips',
      bgColor: '#FEFCE9', // Soft Butter / Lemon (Reference Card 4)
      icon: 'label',
      renderPreview: () => (
        <md-chip-set>
          <md-filter-chip label="Design" selected>
            <md-icon slot="icon">palette</md-icon>
          </md-filter-chip>
          <md-assist-chip label="Share">
            <md-icon slot="icon">share</md-icon>
          </md-assist-chip>
        </md-chip-set>
      ),
    },
    {
      id: 'feedback',
      badge: 'Loading • Progress',
      title: 'Progress & Dialogs',
      category: 'Loading Indicators',
      type: 'feedback',
      bgColor: '#EDF4FD', // Soft Periwinkle (Reference Card 5)
      icon: 'progress_activity',
      renderPreview: () => (
        <div className="flex items-center gap-5">
          <md-circular-progress fourColor indeterminate></md-circular-progress>
          <md-linear-progress value={0.75} className="w-24"></md-linear-progress>
        </div>
      ),
    },
    {
      id: 'motion',
      badge: 'Physics • Android 15',
      title: 'Spring Dynamics',
      category: 'Expressive Motion',
      type: 'motion',
      bgColor: '#FDF1F3', // Soft Rose Pink (Reference Card 6)
      icon: 'animation',
      renderPreview: () => (
        <button
          onClick={() => setSelectedId('motion')}
          className="m3-spring-interactive px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-medium cursor-pointer shadow-xs flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">touch_app</span>
          Tap for Physics
        </button>
      ),
    },
    {
      id: 'expressive',
      badge: 'Tonal System',
      title: 'Color Palettes',
      category: 'Expressive Lab',
      type: 'theming',
      bgColor: '#FFF5EB',
      icon: 'palette',
      renderPreview: () => (
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#6750A4] shadow-xs"></span>
          <span className="w-6 h-6 rounded-full bg-[#B32824] shadow-xs"></span>
          <span className="w-6 h-6 rounded-full bg-[#006C50] shadow-xs"></span>
          <span className="w-6 h-6 rounded-full bg-[#8E1F79] shadow-xs"></span>
        </div>
      ),
    },
    {
      id: 'guide',
      badge: 'Recipes',
      title: 'Setup Guide',
      category: 'Vite & Next.js',
      type: 'guide',
      bgColor: '#F8FAFC',
      icon: 'menu_book',
      renderPreview: () => (
        <div className="px-3.5 py-1.5 rounded-xl bg-black/5 font-mono text-xs text-slate-700 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px]">terminal</span>
          npm i @material/web
        </div>
      ),
    },
  ];

  const filteredCards =
    filterCategory === 'all'
      ? cards
      : cards.filter((c) => c.type === filterCategory || c.id === filterCategory);

  return (
    <div className="min-h-screen ambient-m3-canvas text-[#1d1b20] flex flex-col font-sans transition-colors duration-500 relative pb-24">
      {/* Background Circular Backdrop Shapes (Matching Reference Aesthetics) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#fde5cc]/35 blur-3xl"></div>
        <div className="absolute top-10 right-0 w-[550px] h-[550px] rounded-full bg-[#fde4c4]/40 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-[640px] h-[640px] rounded-full bg-[#fce9d3]/45 blur-3xl"></div>
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 px-6 md:px-14 py-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            M3
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Material 3 Workbench
          </span>
        </div>

        {/* Theme Pill Picker */}
        <div className="flex items-center gap-1.5 bg-white/75 backdrop-blur-xs p-1 rounded-full border border-black/[0.04] shadow-2xs">
          {[
            { id: 'baseline', color: '#6750A4', label: 'Iris' },
            { id: 'expressive-coral', color: '#B32824', label: 'Coral' },
            { id: 'expressive-mint', color: '#006C50', label: 'Mint' },
            { id: 'expressive-berry', color: '#8E1F79', label: 'Berry' },
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => setCurrentTheme(theme.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTheme === theme.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span
                style={{ backgroundColor: theme.color }}
                className="w-2.5 h-2.5 rounded-full"
              ></span>
              <span className="hidden sm:inline">{theme.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 py-6 flex flex-col gap-8 flex-1">
        {/* Minimalist Heading (Inspired by reference) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-black/[0.04] text-[11px] font-semibold text-slate-700 mb-2.5 shadow-2xs">
              <GoogleGLogo />
              <span>Material Design 3</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-slate-900">
              Material 3 Design
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-lg">
              Official Google Web Components. Select any item to view live specifications & code.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All' },
              { id: 'actions', label: 'Actions' },
              { id: 'inputs', label: 'Inputs' },
              { id: 'selection', label: 'Selection' },
              { id: 'chips', label: 'Chips' },
              { id: 'feedback', label: 'Feedback' },
              { id: 'motion', label: 'Motion' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition cursor-pointer whitespace-nowrap ${
                  filterCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-black/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Minimalist Grid (2 rows x 3 columns on desktop, exactly like reference) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {filteredCards.map((card) => (
            <MinimalCard
              key={card.id}
              badge={card.badge}
              title={card.title}
              category={card.category}
              bgColor={card.bgColor}
              icon={card.icon}
              brandIcon="google"
              onSelect={() => setSelectedId(card.id)}
            >
              {card.renderPreview()}
            </MinimalCard>
          ))}
        </div>
      </main>

      {/* Floating Bottom Left: Visit docs (Matching reference image) */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="https://github.com/material-components/material-web"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-medium shadow-sm hover:shadow-md border border-black/[0.06] backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer group"
        >
          <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            arrow_outward
          </span>
          Visit docs
        </a>
      </div>

      {/* Floating Bottom Right: Theme Cycle Button (Matching reference image) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            const themes = ['baseline', 'expressive-coral', 'expressive-mint', 'expressive-berry'];
            const next = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
            setCurrentTheme(next);
          }}
          title="Cycle Theme Palette"
          className="w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-sm hover:shadow-md border border-black/[0.06] backdrop-blur-md transition-all cursor-pointer hover:rotate-90 duration-300"
        >
          <span className="material-symbols-outlined text-lg">palette</span>
        </button>
      </div>

      {/* Detail Inspection Modal */}
      <DetailModal
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
        onSelectId={(id) => setSelectedId(id)}
        currentTheme={currentTheme}
        onThemeSelect={setCurrentTheme}
      />
    </div>
  );
};

export default App;
