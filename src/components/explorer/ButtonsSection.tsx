import React from 'react';
import { ComponentCard } from '../ComponentCard';

export const ButtonsSection: React.FC = () => {
  const buttonSnippet = `import '@material/web/button/filled-button.js';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/button/elevated-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/icon/icon.js';

// High Emphasis (Primary)
<md-filled-button>
  <md-icon slot="icon">send</md-icon>
  Filled
</md-filled-button>

// Medium-High Emphasis
<md-filled-tonal-button>
  <md-icon slot="icon">bookmark</md-icon>
  Tonal
</md-filled-tonal-button>

// Elevated (Floating)
<md-elevated-button>
  <md-icon slot="icon">star</md-icon>
  Elevated
</md-elevated-button>

// Medium Emphasis (Secondary)
<md-outlined-button>
  <md-icon slot="icon">edit</md-icon>
  Outlined
</md-outlined-button>

// Low Emphasis (Tertiary)
<md-text-button>
  <md-icon slot="icon">close</md-icon>
  Text
</md-text-button>`;

  const fabSnippet = `import '@material/web/fab/fab.js';
import '@material/web/icon/icon.js';

// Extended Primary FAB
<md-fab variant="primary" label="New Message">
  <md-icon slot="icon">add</md-icon>
</md-fab>

// Secondary FAB
<md-fab variant="secondary" label="Navigate">
  <md-icon slot="icon">navigation</md-icon>
</md-fab>

// Lowered FAB (surface elevation)
<md-fab lowered label="Edit Document">
  <md-icon slot="icon">edit</md-icon>
</md-fab>

// Icon-only FAB
<md-fab variant="primary">
  <md-icon slot="icon">search</md-icon>
</md-fab>`;

  const iconButtonSnippet = `import '@material/web/iconbutton/icon-button.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/icon/icon.js';

<md-icon-button><md-icon>favorite</md-icon></md-icon-button>
<md-filled-icon-button><md-icon>settings</md-icon></md-filled-icon-button>
<md-filled-tonal-icon-button><md-icon>notifications</md-icon></md-filled-tonal-icon-button>
<md-outlined-icon-button><md-icon>share</md-icon></md-outlined-icon-button>`;

  return (
    <div className="flex flex-col gap-8">
      {/* Button Hierarchy */}
      <ComponentCard
        title="Button Hierarchy"
        subtitle="Five distinct button levels communicate visual weight and importance"
        snippet={buttonSnippet}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">High Emphasis</span>
            <md-filled-button className="w-full sm:w-auto">
              <md-icon slot="icon">send</md-icon>
              Filled
            </md-filled-button>
            <span className="text-xs text-slate-400">Primary screen action</span>
          </div>

          <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medium-High</span>
            <md-filled-tonal-button className="w-full sm:w-auto">
              <md-icon slot="icon">bookmark</md-icon>
              Tonal
            </md-filled-tonal-button>
            <span className="text-xs text-slate-400">Alternative primary</span>
          </div>

          <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Elevated</span>
            <md-elevated-button className="w-full sm:w-auto">
              <md-icon slot="icon">star</md-icon>
              Elevated
            </md-elevated-button>
            <span className="text-xs text-slate-400">Layered surface</span>
          </div>

          <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medium</span>
            <md-outlined-button className="w-full sm:w-auto">
              <md-icon slot="icon">edit</md-icon>
              Outlined
            </md-outlined-button>
            <span className="text-xs text-slate-400">Important secondary</span>
          </div>

          <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Low Emphasis</span>
            <md-text-button className="w-full sm:w-auto">
              <md-icon slot="icon">close</md-icon>
              Text
            </md-text-button>
            <span className="text-xs text-slate-400">Dialog actions & cancel</span>
          </div>
        </div>
      </ComponentCard>

      {/* Floating Action Buttons (FAB) */}
      <ComponentCard
        title="Floating Action Buttons (FAB)"
        subtitle="Represents the most prominent primary action on a screen"
        snippet={fabSnippet}
      >
        <div className="flex flex-wrap items-center gap-8 py-2">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-slate-500">Primary Extended FAB</span>
            <md-fab variant="primary" label="New Message">
              <md-icon slot="icon">add</md-icon>
            </md-fab>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-slate-500">Secondary FAB</span>
            <md-fab variant="secondary" label="Navigate">
              <md-icon slot="icon">navigation</md-icon>
            </md-fab>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-slate-500">Surface Lowered</span>
            <md-fab lowered label="Edit Document">
              <md-icon slot="icon">edit</md-icon>
            </md-fab>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-slate-500">Icon Only</span>
            <md-fab variant="primary">
              <md-icon slot="icon">search</md-icon>
            </md-fab>
          </div>
        </div>
      </ComponentCard>

      {/* Icon Buttons */}
      <ComponentCard
        title="Icon Buttons"
        subtitle="Compact action triggers with hover and press ripple feedback"
        snippet={iconButtonSnippet}
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">Standard:</span>
            <md-icon-button><md-icon>favorite</md-icon></md-icon-button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">Filled:</span>
            <md-filled-icon-button><md-icon>settings</md-icon></md-filled-icon-button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">Filled Tonal:</span>
            <md-filled-tonal-icon-button><md-icon>notifications</md-icon></md-filled-tonal-icon-button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">Outlined:</span>
            <md-outlined-icon-button><md-icon>share</md-icon></md-outlined-icon-button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};
