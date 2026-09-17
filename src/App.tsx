import React, { useState, useEffect } from 'react';
import './components/M3Register';
import { ButtonsSection } from './components/explorer/ButtonsSection';
import { InputsSection } from './components/explorer/InputsSection';
import { SelectionSection } from './components/explorer/SelectionSection';
import { ChipsSection } from './components/explorer/ChipsSection';
import { FeedbackSection } from './components/explorer/FeedbackSection';
import { GuideSection } from './components/explorer/GuideSection';
import { ExpressiveSection } from './components/explorer/ExpressiveSection';
import { MotionSection } from './components/explorer/MotionSection';

type Category = 'all' | 'expressive' | 'motion' | 'buttons' | 'inputs' | 'selection' | 'chips' | 'feedback' | 'guide';

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTheme, setCurrentTheme] = useState<string>('baseline');

  useEffect(() => {
    if (currentTheme === 'baseline') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'All Components', icon: 'grid_view' },
    { id: 'expressive', label: 'M3 Expressive Lab', icon: 'auto_awesome' },
    { id: 'motion', label: 'Motion & Physics', icon: 'animation' },
    { id: 'buttons', label: 'Buttons & FAB', icon: 'smart_button' },
    { id: 'inputs', label: 'Inputs & Fields', icon: 'edit_note' },
    { id: 'selection', label: 'Selection Controls', icon: 'toggle_on' },
    { id: 'chips', label: 'Chips & Tags', icon: 'label' },
    { id: 'feedback', label: 'Progress & Dialogs', icon: 'progress_activity' },
    { id: 'guide', label: 'Integration Recipes', icon: 'menu_book' },
  ];

  const matchesSearch = (terms: string[]) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return terms.some((t) => t.toLowerCase().includes(q));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1d1b20]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 md:px-12 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#6750A4] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            M3
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900">
              Material 3 Design Workbench
            </h1>
            <p className="text-xs text-slate-500">
              Official Google Web Components Lab & Plugin Kit
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 border border-transparent rounded-full focus:bg-white focus:border-[#6750A4] focus:outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 text-sm hover:text-slate-700 cursor-pointer"
              >
                close
              </button>
            )}
          </div>

          <a
            href="https://github.com/material-components/material-web"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            GitHub Docs
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col gap-8">
        {/* Category Navigation Pills */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-full whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#EADDFF] text-[#21005D] shadow-xs'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Sections Display */}
        <div className="flex flex-col gap-10">
          {/* M3 Expressive Section */}
          {(activeCategory === 'expressive' || activeCategory === 'all') &&
            matchesSearch(['expressive', 'theme', 'color', 'tonal', 'asymmetric', 'coral', 'mint', 'berry', 'shape']) && (
              <ExpressiveSection
                currentTheme={currentTheme}
                onThemeSelect={setCurrentTheme}
              />
            )}

          {/* M3 Motion & Physics Section */}
          {(activeCategory === 'motion' || activeCategory === 'all') &&
            matchesSearch(['motion', 'physics', 'spring', 'animation', 'easing', 'ripple', 'morph', 'transform', 'stagger']) && (
              <MotionSection />
            )}

          {/* Guide Section */}
          {(activeCategory === 'guide' || (activeCategory === 'all' && matchesSearch(['guide', 'nextjs', 'vite', 'recipe', 'maintenance']))) && (
            <GuideSection />
          )}

          {/* Buttons & Actions */}
          {(activeCategory === 'buttons' || activeCategory === 'all') &&
            matchesSearch(['button', 'fab', 'icon', 'filled', 'tonal', 'elevated', 'outlined', 'text', 'action']) && (
              <ButtonsSection />
            )}

          {/* Inputs & Fields */}
          {(activeCategory === 'inputs' || activeCategory === 'all') &&
            matchesSearch(['input', 'text', 'field', 'select', 'dropdown', 'form', 'email', 'name']) && (
              <InputsSection />
            )}

          {/* Selection Controls */}
          {(activeCategory === 'selection' || activeCategory === 'all') &&
            matchesSearch(['switch', 'checkbox', 'radio', 'slider', 'toggle', 'check']) && (
              <SelectionSection />
            )}

          {/* Chips */}
          {(activeCategory === 'chips' || activeCategory === 'all') &&
            matchesSearch(['chip', 'filter', 'assist', 'input', 'tag', 'suggestion']) && (
              <ChipsSection />
            )}

          {/* Feedback & Progress */}
          {(activeCategory === 'feedback' || activeCategory === 'all') &&
            matchesSearch(['progress', 'dialog', 'modal', 'circular', 'linear', 'loading']) && (
              <FeedbackSection />
            )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 pb-12">
          <span>Material 3 Design Workbench • Built with Google Material Web Components</span>
          <div className="flex items-center gap-4">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium text-[11px]">
              Vite Client SPA
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-medium text-[11px]">
              @material/web v2.5.0
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
