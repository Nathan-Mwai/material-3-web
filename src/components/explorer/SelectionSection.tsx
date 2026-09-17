import React, { useState } from 'react';
import { ComponentCard } from '../ComponentCard';

export const SelectionSection: React.FC = () => {
  const [switchOn, setSwitchOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState('monthly');
  const [sliderValue, setSliderValue] = useState(65);

  const selectionSnippet = `import '@material/web/switch/switch.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/radio/radio.js';
import '@material/web/slider/slider.js';

// Switch with icons
<md-switch selected={switchOn} icons onClick={() => setSwitchOn(!switchOn)}></md-switch>

// Checkbox
<md-checkbox checked={checked} onClick={() => setChecked(!checked)}></md-checkbox>

// Radio Buttons
<md-radio name="plan" value="monthly" checked={plan === 'monthly'}></md-radio>
<md-radio name="plan" value="annual" checked={plan === 'annual'}></md-radio>

// Slider with value labels & ticks
<md-slider min="0" max="100" value={sliderValue} labeled ticks></md-slider>`;

  return (
    <div className="flex flex-col gap-8">
      <ComponentCard
        title="Selection Controls (Switch, Checkbox, Radio, Slider)"
        subtitle="Tactile state toggles with smooth Material 3 animations and accessible targets"
        snippet={selectionSnippet}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Switches and Checkboxes */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Toggles & Checks</h4>

            {/* Switch */}
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">Notifications Switch</span>
                <span className="text-xs text-slate-500">M3 switch with integrated check/cross icons</span>
              </div>
              <md-switch
                selected={switchOn}
                icons
                onClick={() => setSwitchOn(!switchOn)}
              ></md-switch>
            </label>

            {/* Checkbox */}
            <label className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition">
              <md-checkbox
                checked={checked}
                onClick={() => setChecked(!checked)}
              ></md-checkbox>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">Accept Terms</span>
                <span className="text-xs text-slate-500">Material 3 rounded checkbox with ripple</span>
              </div>
            </label>
          </div>

          {/* Radio Buttons & Sliders */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Radio Options & Slider</h4>

            {/* Radio Group */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
              <span className="text-xs text-slate-500 font-medium">Billing Cycle:</span>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <md-radio
                    name="billing"
                    value="monthly"
                    checked={selectedRadio === 'monthly'}
                    onClick={() => setSelectedRadio('monthly')}
                  ></md-radio>
                  Monthly ($12/mo)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <md-radio
                    name="billing"
                    value="annual"
                    checked={selectedRadio === 'annual'}
                    onClick={() => setSelectedRadio('annual')}
                  ></md-radio>
                  Annual ($99/yr)
                </label>
              </div>
            </div>

            {/* Slider */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
                <span>Volume Level</span>
                <span className="text-[#6750A4] font-bold">{sliderValue}%</span>
              </div>
              <md-slider
                min={0}
                max={100}
                value={sliderValue}
                labeled
                onInput={(e: any) => setSliderValue(Number(e.target.value))}
                className="w-full"
              ></md-slider>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};
