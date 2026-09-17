import React, { useState } from 'react';
import { ComponentCard } from '../ComponentCard';

export const MotionSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRacing, setIsRacing] = useState(false);
  const [staggerKey, setStaggerKey] = useState(0);

  const triggerRace = () => {
    setIsRacing(false);
    setTimeout(() => setIsRacing(true), 50);
  };

  const triggerStagger = () => {
    setStaggerKey((prev) => prev + 1);
  };

  const motionSnippet = `/* Material 3 Expressive Motion Physics */

/* 1. Expressive Spring Overshoot Easing */
.m3-spring-button {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.m3-spring-button:hover {
  transform: scale(1.05) translateY(-2px);
}
.m3-spring-button:active {
  transform: scale(0.94) translateY(1px);
}

/* 2. Container Transform (Morphing Surface) */
.m3-morph-surface {
  transition: all 450ms cubic-bezier(0.2, 0, 0, 1);
}

/* 3. Google Native Ink Ripple on Any Element */
<div className="relative overflow-hidden cursor-pointer p-6 rounded-3xl">
  <md-ripple></md-ripple>
  <p>Click anywhere to trigger Material ripple</p>
</div>`;

  return (
    <div className="flex flex-col gap-8">
      {/* Overview Card */}
      <ComponentCard
        title="Material 3 Motion System & Expressive Physics"
        subtitle="Google's motion system transforms static UI into responsive, tactile surfaces using spring dynamics and container transforms"
        snippet={motionSnippet}
      >
        <div className="flex flex-col gap-10">
          
          {/* Playground 1: Interactive Easing Comparator (The Motion Race) */}
          <div className="flex flex-col gap-4 p-6 rounded-[28px] bg-slate-50 border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-semibold text-slate-900">Easing Curve Comparator</h4>
                <p className="text-xs text-slate-500">
                  Compare how Standard M3 and Expressive Spring differ from mechanical linear movement.
                </p>
              </div>
              <md-filled-button onClick={triggerRace}>
                <md-icon slot="icon">play_arrow</md-icon>
                Trigger Motion Race
              </md-filled-button>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              {/* Linear */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Linear (Mechanical / Robotic)</span>
                  <span className="font-mono text-[11px]">linear</span>
                </div>
                <div className="h-8 bg-slate-200/70 rounded-full relative overflow-hidden flex items-center px-1">
                  <div
                    className={`w-6 h-6 rounded-full bg-slate-500 shadow-sm transition-transform duration-700 ease-linear ${
                      isRacing ? 'translate-x-[calc(100cqi-28px)] sm:translate-x-[500px]' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
              </div>

              {/* Emphasized */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>M3 Emphasized (Natural Deceleration)</span>
                  <span className="font-mono text-[11px]">cubic-bezier(0.2, 0, 0, 1)</span>
                </div>
                <div className="h-8 bg-slate-200/70 rounded-full relative overflow-hidden flex items-center px-1">
                  <div
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
                    }}
                    className={`w-6 h-6 rounded-full bg-[#6750A4] shadow-sm transition-transform duration-700 ${
                      isRacing ? 'translate-x-[calc(100cqi-28px)] sm:translate-x-[500px]' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
              </div>

              {/* Expressive Spring */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-purple-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    M3 Expressive Spring (Tactile Overshoot & Settle)
                  </span>
                  <span className="font-mono text-[11px]">cubic-bezier(0.34, 1.56, 0.64, 1)</span>
                </div>
                <div className="h-8 bg-purple-100/70 rounded-full relative overflow-hidden flex items-center px-1">
                  <div
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                    className={`w-6 h-6 rounded-full bg-[#B32824] shadow-md transition-transform duration-700 ${
                      isRacing ? 'translate-x-[calc(100cqi-28px)] sm:translate-x-[500px]' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Playground 2: Spring Interactive Physics (Buttons & Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 p-6 rounded-[28px] bg-slate-50 border border-slate-200/80">
              <div>
                <h4 className="text-base font-semibold text-slate-900">Spring Press & Hover Physics</h4>
                <p className="text-xs text-slate-500">
                  Hover for lift; press down to feel the spring compression and rebound.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 py-4">
                <button className="m3-spring-interactive px-6 py-3 rounded-full bg-[#6750A4] text-white font-medium text-sm shadow-md cursor-pointer flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">touch_app</span>
                  Spring Button
                </button>

                <button className="m3-spring-interactive px-6 py-3 rounded-full bg-[#B32824] text-white font-medium text-sm shadow-md cursor-pointer flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  Expressive Rebound
                </button>
              </div>
              <span className="text-xs text-slate-400 italic">
                Uses: <code>transform: scale(0.96)</code> on active, <code>cubic-bezier(0.34, 1.56, 0.64, 1)</code>
              </span>
            </div>

            {/* Native <md-ripple> Custom Surface */}
            <div className="flex flex-col gap-4 p-6 rounded-[28px] bg-slate-50 border border-slate-200/80">
              <div>
                <h4 className="text-base font-semibold text-slate-900">Native Material Ink Ripple</h4>
                <p className="text-xs text-slate-500">
                  Embed <code>&lt;md-ripple&gt;</code> into any custom surface or card.
                </p>
              </div>

              <div className="m3-ripple-surface p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <md-ripple></md-ripple>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#6750A4] text-2xl">water_drop</span>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900">Interactive Ripple Card</h5>
                    <p className="text-xs text-slate-500">Click anywhere to see wave expansion</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
              </div>
            </div>
          </div>

          {/* Playground 3: Container Transform (Morphing Surface) */}
          <div className="flex flex-col gap-4 p-6 rounded-[28px] bg-slate-50 border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-semibold text-slate-900">
                  Container Transform (Morphing Shape)
                </h4>
                <p className="text-xs text-slate-500">
                  Material 3 transitions containers seamlessly between collapsed and expanded states.
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-[#EADDFF] text-[#21005D] hover:bg-[#dbcbf9] transition cursor-pointer flex items-center gap-1.5 self-start"
              >
                <span className="material-symbols-outlined text-sm">
                  {isExpanded ? 'close_fullscreen' : 'open_in_full'}
                </span>
                {isExpanded ? 'Collapse Container' : 'Expand Container'}
              </button>
            </div>

            <div
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className={`cursor-pointer transition-all duration-500 overflow-hidden border border-slate-200 ${
                isExpanded
                  ? 'p-8 rounded-[36px] bg-gradient-to-br from-[#EADDFF]/80 to-white shadow-xl max-w-full'
                  : 'p-5 rounded-2xl bg-white shadow-xs max-w-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#6750A4] text-white flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined">auto_awesome_motion</span>
                  </div>
                  <div>
                    <h5 className="text-base font-semibold text-slate-900">
                      {isExpanded ? 'Expanded Detail Canvas' : 'Morphing Card Preview'}
                    </h5>
                    <p className="text-xs text-slate-500">
                      {isExpanded ? 'Complete canvas with expanded content' : 'Click to morph surface'}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">
                  {isExpanded ? 'check_circle' : 'north_east'}
                </span>
              </div>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-purple-200/60 flex flex-col gap-4 text-xs text-slate-700 animate-fadeIn">
                  <p className="leading-relaxed">
                    In Material Design 3, container transforms bridge the visual gap between a preview snippet and its destination page. Rather than popping in, the bounding box smoothly expands with spring damping.
                  </p>
                  <div className="flex items-center gap-3">
                    <md-filled-button onClick={(e: any) => { e.stopPropagation(); setIsExpanded(false); }}>
                      <md-icon slot="icon">check</md-icon>
                      Done
                    </md-filled-button>
                    <md-text-button onClick={(e: any) => { e.stopPropagation(); setIsExpanded(false); }}>
                      Close
                    </md-text-button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Playground 4: Staggered Cascade Entry */}
          <div className="flex flex-col gap-4 p-6 rounded-[28px] bg-slate-50 border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-semibold text-slate-900">Choreographed Staggered Entry</h4>
                <p className="text-xs text-slate-500">
                  Consecutive elements enter with calculated spring delays to guide visual hierarchy.
                </p>
              </div>
              <md-outlined-button onClick={triggerStagger}>
                <md-icon slot="icon">replay</md-icon>
                Replay Cascade
              </md-outlined-button>
            </div>

            <div key={staggerKey} className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              {['Design Tokens', 'Dynamic Color', 'Spring Physics', 'Custom Elements'].map((label, idx) => (
                <div
                  key={label}
                  style={{
                    animationDelay: `${idx * 90}ms`,
                    animationFillMode: 'both',
                  }}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2 transition hover:shadow-md animate-slideUp"
                >
                  <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-900">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </ComponentCard>
    </div>
  );
};
