import React, { useState } from 'react';

export const GuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vite' | 'nextjs' | 'status'>('vite');

  return (
    <div className="bg-white rounded-[28px] p-8 md:p-10 border border-slate-200/80 shadow-xs flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-medium text-slate-900">Developer Integration Recipes</h2>
          <p className="text-sm text-slate-500 mt-1">
            Follow these step-by-step guides to integrate Material 3 Web Components into your projects.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('vite')}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition cursor-pointer ${
              activeTab === 'vite' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vite (Client SPA)
          </button>
          <button
            onClick={() => setActiveTab('nextjs')}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition cursor-pointer ${
              activeTab === 'nextjs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Next.js (App Router)
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition cursor-pointer ${
              activeTab === 'status' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Maintenance Status
          </button>
        </div>
      </div>

      {/* Vite Tab Content */}
      {activeTab === 'vite' && (
        <div className="flex flex-col gap-6 text-sm text-slate-700">
          <div className="bg-purple-50 text-[#21005D] p-4 rounded-2xl text-xs font-medium border border-purple-100">
            <strong>Vite is 100% Client-Side Rendered (SPA):</strong> Web components mount immediately into the browser DOM without any SSR hydration errors.
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">1. Install Package</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs font-mono">
              npm install @material/web
            </pre>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">2. Load Google Fonts in `index.html`</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs font-mono">
{`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`}
            </pre>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">3. Copy TypeScript Declarations (`material-web.d.ts`)</h4>
            <p className="text-xs text-slate-500">
              Copy <code className="bg-slate-100 px-1 py-0.5 rounded text-purple-700">src/types/material-web.d.ts</code> into your project's <code className="bg-slate-100 px-1 py-0.5 rounded">src/</code> directory so TS recognizes tags like <code className="bg-slate-100 px-1 py-0.5 rounded">&lt;md-filled-button&gt;</code>.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">4. Import and Use Anywhere</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs font-mono">
{`import '@material/web/button/filled-button.js';
import '@material/web/icon/icon.js';

export function Action() {
  return (
    <md-filled-button onClick={() => console.log('Saved!')}>
      <md-icon slot="icon">check</md-icon>
      Save Changes
    </md-filled-button>
  );
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Next.js Tab Content */}
      {activeTab === 'nextjs' && (
        <div className="flex flex-col gap-6 text-sm text-slate-700">
          <div className="bg-amber-50 text-amber-900 p-4 rounded-2xl text-xs font-medium border border-amber-100">
            <strong>Next.js App Router (SSR) Rules:</strong> Web Components require browser APIs (<code className="font-mono">window</code>, <code className="font-mono">customElements</code>). Always follow these three rules.
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">Rule 1: Always Add `"use client"`</h4>
            <p className="text-xs text-slate-500">
              Any component importing <code className="bg-slate-100 px-1 py-0.5 rounded">@material/web/*</code> must have <code className="bg-slate-100 px-1 py-0.5 rounded">"use client"</code> at line 1.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">Rule 2: Link Fonts in `app/layout.tsx` (Not CSS `@import`)</h4>
            <p className="text-xs text-slate-500">
              PostCSS and Turbopack can drop cross-origin <code className="bg-slate-100 px-1 py-0.5 rounded">@import url(...)</code> font rules. Always put font <code className="bg-slate-100 px-1 py-0.5 rounded">&lt;link&gt;</code> tags inside <code className="bg-slate-100 px-1 py-0.5 rounded">&lt;head&gt;</code> in <code className="bg-slate-100 px-1 py-0.5 rounded">app/layout.tsx</code>.
            </p>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs font-mono">
{`// in app/layout.tsx:
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>`}
            </pre>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">Rule 3: Define `--md-icon-font` in `globals.css`</h4>
            <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs font-mono">
{`:root {
  --md-icon-font: 'Material Symbols Outlined';
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Maintenance Status Tab Content */}
      {activeTab === 'status' && (
        <div className="flex flex-col gap-6 text-sm text-slate-700">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900 text-base">Current Status of Google's `@material/web`</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google officially placed the <a href="https://github.com/material-components/material-web" target="_blank" rel="noreferrer" className="text-purple-700 underline font-medium">material-components/material-web</a> repository into <strong>Maintenance Mode</strong>. This means:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-950">
              <h5 className="font-bold mb-1">What is Rock Solid</h5>
              <p>Core M3 components (Buttons, Text Fields, Checkboxes, Switches, Radios, FABs, Chips, Dialogs, Sliders) are v2.5.0, mature, and production ready.</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-950">
              <h5 className="font-bold mb-1">What is in Maintenance</h5>
              <p>Google is not adding new experimental components; work is focused on stability, bug fixes, and community contributions.</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-950">
              <h5 className="font-bold mb-1">Why Web Components Win</h5>
              <p>Because they are standard HTML Custom Elements, they work seamlessly with any framework (React, Vue, Svelte, or Vanilla JS) and never get broken by framework major updates.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
