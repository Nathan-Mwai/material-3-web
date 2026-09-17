import React, { useEffect } from 'react';
import { ButtonsSection } from './explorer/ButtonsSection';
import { InputsSection } from './explorer/InputsSection';
import { SelectionSection } from './explorer/SelectionSection';
import { ChipsSection } from './explorer/ChipsSection';
import { FeedbackSection } from './explorer/FeedbackSection';
import { MotionSection } from './explorer/MotionSection';
import { ExpressiveSection } from './explorer/ExpressiveSection';
import { GuideSection } from './explorer/GuideSection';

export type ComponentId =
  | 'buttons'
  | 'fab'
  | 'inputs'
  | 'selection'
  | 'chips'
  | 'feedback'
  | 'motion'
  | 'expressive'
  | 'guide';

interface DetailModalProps {
  selectedId: ComponentId | null;
  onClose: () => void;
  onSelectId: (id: ComponentId) => void;
  currentTheme: string;
  onThemeSelect: (theme: string) => void;
}

const componentCategories: { id: ComponentId; label: string; icon: string }[] = [
  { id: 'buttons', label: 'Buttons & FAB', icon: 'smart_button' },
  { id: 'inputs', label: 'Text Fields', icon: 'edit_note' },
  { id: 'selection', label: 'Selection', icon: 'toggle_on' },
  { id: 'chips', label: 'Chips & Tags', icon: 'label' },
  { id: 'feedback', label: 'Progress & Dialogs', icon: 'progress_activity' },
  { id: 'motion', label: 'Spring Motion', icon: 'animation' },
  { id: 'expressive', label: 'Expressive Themes', icon: 'palette' },
  { id: 'guide', label: 'Setup Guide', icon: 'menu_book' },
];

export const DetailModal: React.FC<DetailModalProps> = ({
  selectedId,
  onClose,
  onSelectId,
  currentTheme,
  onThemeSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (selectedId) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedId, onClose]);

  if (!selectedId) return null;

  const activeCategory =
    selectedId === 'fab' ? 'buttons' : selectedId;

  const currentMeta = componentCategories.find((c) => c.id === activeCategory) || {
    label: 'Component Specs',
    icon: 'widgets',
  };

  const renderContent = () => {
    switch (selectedId) {
      case 'buttons':
      case 'fab':
        return <ButtonsSection />;
      case 'inputs':
        return <InputsSection />;
      case 'selection':
        return <SelectionSection />;
      case 'chips':
        return <ChipsSection />;
      case 'feedback':
        return <FeedbackSection />;
      case 'motion':
        return <MotionSection />;
      case 'expressive':
        return (
          <ExpressiveSection
            currentTheme={currentTheme}
            onThemeSelect={onThemeSelect}
          />
        );
      case 'guide':
        return <GuideSection />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/40 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[92vh] bg-[#fafafa] rounded-[36px] shadow-2xl border border-black/10 overflow-hidden flex flex-col animate-slideUp"
      >
        {/* Modal Top Header with Quick Navigation */}
        <div className="flex flex-col gap-3 px-6 sm:px-8 py-5 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-lg">
                  {currentMeta.icon}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 leading-tight">
                  {currentMeta.label}
                </h3>
                <span className="text-xs text-slate-500">
                  Material 3 Specifications & Code
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                Esc to close
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
                title="Close"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* Quick Component Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            {componentCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectId(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[calc(92vh-130px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
