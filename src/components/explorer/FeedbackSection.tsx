import React, { useRef } from 'react';
import { ComponentCard } from '../ComponentCard';

export const FeedbackSection: React.FC = () => {
  const dialogRef = useRef<any>(null);

  const feedbackSnippet = `import '@material/web/progress/circular-progress.js';
import '@material/web/progress/linear-progress.js';
import '@material/web/dialog/dialog.js';
import '@material/web/button/text-button.js';
import '@material/web/button/filled-button.js';

// Circular Progress
<md-circular-progress indeterminate></md-circular-progress>
<md-circular-progress four-color indeterminate></md-circular-progress>

// Linear Progress
<md-linear-progress indeterminate></md-linear-progress>
<md-linear-progress value="0.7"></md-linear-progress>

// Dialog Modal
<md-dialog ref={dialogRef}>
  <div slot="headline">Confirm Action</div>
  <div slot="content">Are you sure you want to proceed with this operation?</div>
  <div slot="actions">
    <md-text-button onClick={() => dialogRef.current.close()}>Cancel</md-text-button>
    <md-filled-button onClick={() => dialogRef.current.close()}>Confirm</md-filled-button>
  </div>
</md-dialog>`;

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.show();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Progress Indicators */}
      <ComponentCard
        title="Progress Indicators (Circular & Linear)"
        subtitle="Expressive loading states with smooth Material 3 easing curves"
        snippet={feedbackSnippet}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Circular */}
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Circular Progress
            </span>
            <div className="flex items-center gap-8 py-2">
              <div className="flex flex-col items-center gap-2">
                <md-circular-progress indeterminate></md-circular-progress>
                <span className="text-xs text-slate-400">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <md-circular-progress fourColor indeterminate></md-circular-progress>
                <span className="text-xs text-slate-400">Four Color</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <md-circular-progress value={0.75}></md-circular-progress>
                <span className="text-xs text-slate-400">75% Determinate</span>
              </div>
            </div>
          </div>

          {/* Linear */}
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Linear Progress
            </span>
            <div className="flex flex-col gap-5 py-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">Indeterminate:</span>
                <md-linear-progress indeterminate className="w-full"></md-linear-progress>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">60% Determinate:</span>
                <md-linear-progress value={0.6} className="w-full"></md-linear-progress>
              </div>
            </div>
          </div>
        </div>
      </ComponentCard>

      {/* Dialog Modal */}
      <ComponentCard
        title="Dialog Modal"
        subtitle="M3 modal surfaces with header slots, supportive text, and standard action buttons"
        snippet={feedbackSnippet}
      >
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm text-slate-600">
            Test how the native Material 3 Dialog custom element opens with a backdrop scrim and focus trap.
          </p>
          <md-filled-button onClick={openDialog}>
            <md-icon slot="icon">open_in_new</md-icon>
            Open Interactive Dialog
          </md-filled-button>

          {/* Native M3 Dialog element */}
          <md-dialog ref={dialogRef}>
            <div slot="headline" className="text-lg font-medium text-slate-900">
              Reset Application Cache?
            </div>
            <form slot="content" id="form-id" method="dialog" className="text-sm text-slate-600 py-2">
              This will clear all localized tokens and reset your workbench component state back to defaults.
            </form>
            <div slot="actions">
              <md-text-button onClick={() => dialogRef.current?.close()}>Cancel</md-text-button>
              <md-filled-button onClick={() => dialogRef.current?.close()}>Reset Cache</md-filled-button>
            </div>
          </md-dialog>
        </div>
      </ComponentCard>
    </div>
  );
};
