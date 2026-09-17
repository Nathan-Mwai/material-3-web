import React, { useState } from 'react';

interface ButtonStudioProps {
  onBack: () => void;
}

export const ButtonStudio: React.FC<ButtonStudioProps> = ({ onBack }) => {
  // Live Playground State
  const [label, setLabel] = useState('Continue');
  const [disabled, setDisabled] = useState(false);
  const [hasLeadingIcon, setHasLeadingIcon] = useState(true);
  const [hasTrailingIcon, setHasTrailingIcon] = useState(false);
  const [iconName, setIconName] = useState('send');
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'react' | 'tokens'>('react');
  const [copied, setCopied] = useState(false);
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  // Styling token overrides
  const [buttonHeight, setButtonHeight] = useState('44px');
  const [buttonRadius, setButtonRadius] = useState('9999px');

  const iconOptions = ['send', 'add', 'favorite', 'download', 'share', 'check', 'star', 'arrow_forward'];

  // Generated dynamic code snippets
  const getHtmlSnippet = (variant: string) => {
    const tag = `md-${variant}-button`;
    const trailingAttr = hasTrailingIcon ? ' trailing-icon' : '';
    const disabledAttr = disabled ? ' disabled' : '';
    const iconSlot = (hasLeadingIcon || hasTrailingIcon) ? `\n  <md-icon slot="icon">${iconName}</md-icon>` : '';
    return `<${tag}${trailingAttr}${disabledAttr}>${iconSlot}\n  ${label}\n</${tag}>`;
  };

  const getReactSnippet = () => {
    return `import React from 'react';
import '@material/web/button/filled-button.js';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/button/elevated-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/icon/icon.js';

export const ActionGroup: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Primary Action */}
      <md-filled-button${disabled ? ' disabled' : ''}${hasTrailingIcon ? ' trailing-icon' : ''}>
        ${(hasLeadingIcon || hasTrailingIcon) ? `<md-icon slot="icon">${iconName}</md-icon>\n        ` : ''}${label}
      </md-filled-button>

      {/* Secondary Outlined */}
      <md-outlined-button${disabled ? ' disabled' : ''}>
        Cancel
      </md-outlined-button>
    </div>
  );
};`;
  };

  const getTokensSnippet = () => {
    return `/* Scoped Material 3 Button Tokens */
md-filled-button {
  --md-filled-button-container-height: ${buttonHeight};
  --md-filled-button-container-shape: ${buttonRadius};
  --md-filled-button-container-color: var(--md-sys-color-primary, #6750A4);
  --md-filled-button-label-text-color: var(--md-sys-color-on-primary, #FFFFFF);
  --md-filled-button-icon-size: 18px;
}

md-outlined-button {
  --md-outlined-button-outline-color: var(--md-sys-color-outline, #79747E);
  --md-outlined-button-outline-width: 1px;
}`;
  };

  const currentSnippet =
    activeCodeTab === 'html'
      ? getHtmlSnippet('filled')
      : activeCodeTab === 'react'
      ? getReactSnippet()
      : getTokensSnippet();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen ambient-m3-canvas text-[#1d1b20] flex flex-col font-sans transition-colors duration-500 pb-20">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 bg-[#fbf2e3]/85 backdrop-blur-md border-b border-black/[0.05] px-6 md:px-14 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full bg-white/85 hover:bg-white text-slate-800 text-xs font-semibold shadow-2xs border border-black/[0.05] flex items-center gap-2 transition cursor-pointer group active:scale-95"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
            Back to Workbench
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 hidden sm:inline">
              Material Design 3 Components
            </span>
            <a
              href="https://m3.material.io/components/all-buttons"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-black transition flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              Google M3 Spec
            </a>
          </div>
        </div>
      </div>

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 py-8 flex flex-col gap-10">
        {/* Title Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/[0.04] text-[11px] font-semibold text-slate-700 w-fit">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Actualized Component Family • @material/web/button
          </div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-slate-900">
            Buttons Studio & Props Playground
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Test Material 3 button variants, live prop states, and design tokens in real time. Inspect how each button level communicates emphasis, then copy clean production code for your app.
          </p>
        </div>

        {/* Studio Grid: Controls on Left, Live Playground on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (4 cols) */}
          <div className="lg:col-span-4 bg-white/80 backdrop-blur-md rounded-[32px] p-6 md:p-7 border border-black/[0.05] shadow-xs flex flex-col gap-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-slate-700">tune</span>
                Live Props Playground
              </h3>
              <button
                onClick={() => {
                  setLabel('Continue');
                  setDisabled(false);
                  setHasLeadingIcon(true);
                  setHasTrailingIcon(false);
                  setIconName('send');
                  setButtonHeight('44px');
                  setButtonRadius('9999px');
                }}
                className="text-[11px] font-medium text-slate-500 hover:text-slate-900 cursor-pointer transition"
              >
                Reset
              </button>
            </div>

            {/* Label Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Label Text</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Button text..."
                className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 transition"
              />
            </div>

            {/* State Toggles */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-slate-700">States & Icons</span>
              
              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-slate-600">block</span>
                  <span className="text-xs font-medium text-slate-800">Disabled State</span>
                </div>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  className="rounded-md accent-slate-900 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-slate-600">arrow_left_alt</span>
                  <span className="text-xs font-medium text-slate-800">Leading Icon</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasLeadingIcon}
                  onChange={(e) => {
                    setHasLeadingIcon(e.target.checked);
                    if (e.target.checked) setHasTrailingIcon(false);
                  }}
                  className="rounded-md accent-slate-900 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-slate-600">arrow_right_alt</span>
                  <span className="text-xs font-medium text-slate-800">Trailing Icon</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasTrailingIcon}
                  onChange={(e) => {
                    setHasTrailingIcon(e.target.checked);
                    if (e.target.checked) setHasLeadingIcon(false);
                  }}
                  className="rounded-md accent-slate-900 cursor-pointer w-4 h-4"
                />
              </label>
            </div>

            {/* Icon Picker */}
            {(hasLeadingIcon || hasTrailingIcon) && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-700">Select Icon</span>
                <div className="grid grid-cols-4 gap-2">
                  {iconOptions.map((ico) => (
                    <button
                      key={ico}
                      onClick={() => setIconName(ico)}
                      className={`p-2 rounded-xl flex items-center justify-center border transition cursor-pointer ${
                        iconName === ico
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{ico}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensional Tokens */}
            <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700">Container Dimensions</span>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Height Token</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: '40dp (Std)', val: '40px' },
                    { label: '44dp (Touch)', val: '44px' },
                    { label: '48dp (Large)', val: '48px' },
                  ].map((h) => (
                    <button
                      key={h.val}
                      onClick={() => setButtonHeight(h.val)}
                      className={`py-1.5 px-2 text-[11px] font-medium rounded-xl border transition cursor-pointer text-center ${
                        buttonHeight === h.val
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[11px] text-slate-500">Shape / Corner Radius</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'Pill (Full)', val: '9999px' },
                    { label: 'Rounded 12dp', val: '12px' },
                    { label: 'Squircle 8dp', val: '8px' },
                  ].map((r) => (
                    <button
                      key={r.val}
                      onClick={() => setButtonRadius(r.val)}
                      className={`py-1.5 px-2 text-[11px] font-medium rounded-xl border transition cursor-pointer text-center ${
                        buttonRadius === r.val
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Playground & Code Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Live Interactive Hierarchy Stage */}
            <div className="bg-white rounded-[32px] p-7 md:p-8 border border-black/[0.05] shadow-xs flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">5 Button Hierarchy Levels</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any button to test ripple physics, hover layers, and focus states.
                  </p>
                </div>

                {lastClicked && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 w-fit">
                    Triggered: {lastClicked}
                  </span>
                )}
              </div>

              {/* Dynamic Styled Container */}
              <div
                style={
                  {
                    '--md-filled-button-container-height': buttonHeight,
                    '--md-filled-button-container-shape': buttonRadius,
                    '--md-outlined-button-container-height': buttonHeight,
                    '--md-outlined-button-container-shape': buttonRadius,
                    '--md-elevated-button-container-height': buttonHeight,
                    '--md-elevated-button-container-shape': buttonRadius,
                    '--md-filled-tonal-button-container-height': buttonHeight,
                    '--md-filled-tonal-button-container-shape': buttonRadius,
                    '--md-text-button-container-height': buttonHeight,
                    '--md-text-button-container-shape': buttonRadius,
                  } as React.CSSProperties
                }
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {/* 1. Filled Button */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Filled Button
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      High Emphasis
                    </span>
                  </div>
                  
                  <div className="py-2 flex items-center justify-center">
                    <md-filled-button
                      disabled={disabled}
                      trailing-icon={hasTrailingIcon ? '' : undefined}
                      onClick={() => setLastClicked('Filled Button')}
                      className="cursor-pointer"
                    >
                      {(hasLeadingIcon || hasTrailingIcon) && (
                        <md-icon slot="icon">{iconName}</md-icon>
                      )}
                      {label}
                    </md-filled-button>
                  </div>

                  <span className="text-[11px] text-slate-500 text-center">
                    Primary action on a screen
                  </span>
                </div>

                {/* 2. Filled Tonal */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Filled Tonal
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      Medium-High
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-center">
                    <md-filled-tonal-button
                      disabled={disabled}
                      trailing-icon={hasTrailingIcon ? '' : undefined}
                      onClick={() => setLastClicked('Filled Tonal Button')}
                      className="cursor-pointer"
                    >
                      {(hasLeadingIcon || hasTrailingIcon) && (
                        <md-icon slot="icon">{iconName}</md-icon>
                      )}
                      {label}
                    </md-filled-tonal-button>
                  </div>

                  <span className="text-[11px] text-slate-500 text-center">
                    Prominent secondary actions
                  </span>
                </div>

                {/* 3. Elevated Button */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Elevated
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Level 1 Shadow
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-center">
                    <md-elevated-button
                      disabled={disabled}
                      trailing-icon={hasTrailingIcon ? '' : undefined}
                      onClick={() => setLastClicked('Elevated Button')}
                      className="cursor-pointer"
                    >
                      {(hasLeadingIcon || hasTrailingIcon) && (
                        <md-icon slot="icon">{iconName}</md-icon>
                      )}
                      {label}
                    </md-elevated-button>
                  </div>

                  <span className="text-[11px] text-slate-500 text-center">
                    Use on busy or patterned surfaces
                  </span>
                </div>

                {/* 4. Outlined Button */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Outlined
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Medium Emphasis
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-center">
                    <md-outlined-button
                      disabled={disabled}
                      trailing-icon={hasTrailingIcon ? '' : undefined}
                      onClick={() => setLastClicked('Outlined Button')}
                      className="cursor-pointer"
                    >
                      {(hasLeadingIcon || hasTrailingIcon) && (
                        <md-icon slot="icon">{iconName}</md-icon>
                      )}
                      {label}
                    </md-outlined-button>
                  </div>

                  <span className="text-[11px] text-slate-500 text-center">
                    Secondary alternatives
                  </span>
                </div>

                {/* 5. Text Button */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Text Button
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      Low Emphasis
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-center">
                    <md-text-button
                      disabled={disabled}
                      trailing-icon={hasTrailingIcon ? '' : undefined}
                      onClick={() => setLastClicked('Text Button')}
                      className="cursor-pointer"
                    >
                      {(hasLeadingIcon || hasTrailingIcon) && (
                        <md-icon slot="icon">{iconName}</md-icon>
                      )}
                      {label}
                    </md-text-button>
                  </div>

                  <span className="text-[11px] text-slate-500 text-center">
                    Dialog actions & cancel triggers
                  </span>
                </div>
              </div>
            </div>

            {/* Specialized Buttons: FAB & Icon Buttons */}
            <div className="bg-white rounded-[32px] p-7 md:p-8 border border-black/[0.05] shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Floating Action & Icon Buttons</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    High elevation hero actions and compact toolbar triggers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Floating Action Buttons */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-4">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Floating Action Buttons (FAB)
                  </span>
                  
                  <div className="flex flex-wrap items-center gap-4 py-2">
                    <md-fab
                      variant="primary"
                      label="Compose"
                      onClick={() => setLastClicked('Primary FAB')}
                      className="cursor-pointer"
                    >
                      <md-icon slot="icon">add</md-icon>
                    </md-fab>

                    <md-fab
                      variant="secondary"
                      label="Navigate"
                      onClick={() => setLastClicked('Secondary FAB')}
                      className="cursor-pointer"
                    >
                      <md-icon slot="icon">navigation</md-icon>
                    </md-fab>

                    <md-fab
                      lowered
                      label="Edit"
                      onClick={() => setLastClicked('Lowered FAB')}
                      className="cursor-pointer"
                    >
                      <md-icon slot="icon">edit</md-icon>
                    </md-fab>

                    <md-fab
                      variant="primary"
                      onClick={() => setLastClicked('Icon FAB')}
                      className="cursor-pointer"
                    >
                      <md-icon slot="icon">search</md-icon>
                    </md-fab>
                  </div>

                  <span className="text-[11px] text-slate-500">
                    Highest elevation on screen; represents the primary creation action.
                  </span>
                </div>

                {/* Icon Buttons */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-4">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Icon Buttons (4 Types)
                  </span>

                  <div className="flex flex-wrap items-center gap-4 py-2">
                    <div className="flex flex-col items-center gap-1">
                      <md-icon-button onClick={() => setLastClicked('Standard Icon Button')}>
                        <md-icon>favorite</md-icon>
                      </md-icon-button>
                      <span className="text-[10px] text-slate-500">Standard</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <md-filled-icon-button onClick={() => setLastClicked('Filled Icon Button')}>
                        <md-icon>settings</md-icon>
                      </md-filled-icon-button>
                      <span className="text-[10px] text-slate-500">Filled</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <md-filled-tonal-icon-button onClick={() => setLastClicked('Tonal Icon Button')}>
                        <md-icon>notifications</md-icon>
                      </md-filled-tonal-icon-button>
                      <span className="text-[10px] text-slate-500">Tonal</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <md-outlined-icon-button onClick={() => setLastClicked('Outlined Icon Button')}>
                        <md-icon>share</md-icon>
                      </md-outlined-icon-button>
                      <span className="text-[10px] text-slate-500">Outlined</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-500">
                    48×48dp accessible touch target with centered 24dp icon glyph.
                  </span>
                </div>
              </div>
            </div>

            {/* Live Generated Code & Integration Snippet */}
            <div className="bg-slate-900 rounded-[32px] p-7 md:p-8 text-white shadow-xl flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-400 text-lg">code</span>
                  <span className="text-sm font-semibold tracking-wide text-slate-200">
                    Production Ready Code
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-full text-xs">
                    {(['react', 'html', 'tokens'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveCodeTab(tab)}
                        className={`px-3 py-1 rounded-full font-medium transition cursor-pointer ${
                          activeCodeTab === tab
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab === 'react' ? 'React TSX' : tab === 'html' ? 'HTML Web Component' : 'CSS Tokens'}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Code display block */}
              <pre className="p-4 rounded-2xl bg-black/40 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed scrollbar-thin">
                <code>{currentSnippet}</code>
              </pre>

              {/* Footer link to README.md */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>Directly reflects the props selected in the playground.</span>
                <span className="text-slate-500 font-mono">src/components/buttons/README.md</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
