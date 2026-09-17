import React, { useState } from 'react';

interface MinimalCardProps {
  badge: string;
  title: string;
  category: string;
  bgColor: string; // e.g. '#F6F3FE'
  icon: string;
  brandIcon?: 'google' | 'material';
  children: React.ReactNode;
  onSelect: () => void;
}

export const MinimalCard: React.FC<MinimalCardProps> = ({
  badge,
  title,
  category,
  bgColor,
  icon,
  brandIcon = 'google',
  children,
  onSelect,
}) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      onClick={onSelect}
      style={{ backgroundColor: bgColor }}
      className="group relative rounded-[32px] p-7 md:p-8 flex flex-col justify-between gap-6 border border-black/[0.04] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer min-h-[370px]"
    >
      {/* Top Header: Badge & Bookmark */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-slate-700 bg-white/75 backdrop-blur-xs px-3.5 py-1 rounded-full border border-black/[0.04]">
          {badge}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setBookmarked(!bookmarked);
          }}
          title={bookmarked ? "Saved" : "Save bookmark"}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            bookmarked
              ? 'text-amber-600 scale-110'
              : 'text-slate-400 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-xl">
            {bookmarked ? 'bookmark' : 'bookmark_border'}
          </span>
        </button>
      </div>

      {/* Main Title & Arrow */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl sm:text-[28px] font-normal tracking-tight text-slate-900 leading-snug">
          {title}
        </h3>
        <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all text-2xl mt-1 flex-shrink-0">
          arrow_forward
        </span>
      </div>

      {/* Center Interactive Micro-Preview (Shows what is there & how it works) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-auto py-2 flex items-center justify-center min-h-[76px] w-full"
      >
        {children}
      </div>

      {/* Pagination Dots (Matching reference design) */}
      <div className="flex items-center justify-center gap-1.5 py-0.5 opacity-40">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-900/40"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-900/40"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-900/40"></span>
      </div>

      {/* Bottom Bar: Brand Logo, Component Title, & View Pill Button */}
      <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-xs border border-black/[0.04] flex-shrink-0">
            {brandIcon === 'google' ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            ) : (
              <span className="material-symbols-outlined text-[18px] text-slate-700">
                {icon}
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-900 leading-tight truncate">
              {title}
            </span>
            <span className="text-[11px] text-slate-500 truncate">{category}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-black transition-all cursor-pointer shadow-xs active:scale-95 flex-shrink-0"
        >
          View
        </button>
      </div>
    </div>
  );
};
