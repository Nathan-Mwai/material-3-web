import React, { useState } from 'react';

interface ComponentCardProps {
  title: string;
  subtitle?: string;
  snippet: string;
  children: React.ReactNode;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  subtitle,
  snippet,
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-200/80 shadow-xs flex flex-col gap-6 transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-medium text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {showCode ? 'visibility_off' : 'code'}
            </span>
            {showCode ? 'Hide Code' : 'View Code'}
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#EADDFF] text-[#21005D] hover:bg-[#d8c7fb] transition cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Copied!' : 'Copy TSX'}
          </button>
        </div>
      </div>

      {/* Code Snippet Dropdown */}
      {showCode && (
        <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl overflow-x-auto text-xs font-mono border border-slate-800">
          <pre>{snippet}</pre>
        </div>
      )}

      {/* Live Preview Container */}
      <div className="w-full">{children}</div>
    </div>
  );
};
