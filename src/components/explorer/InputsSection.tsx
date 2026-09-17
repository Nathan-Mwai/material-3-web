import React, { useState } from 'react';
import { ComponentCard } from '../ComponentCard';

export const InputsSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('developer');

  const textFieldSnippet = `import '@material/web/textfield/outlined-text-field.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/icon/icon.js';

// Outlined Text Field
<md-outlined-text-field
  label="Full Name"
  value={name}
  onInput={(e: any) => setName(e.target.value)}
  supportingText="Enter legal name"
>
  <md-icon slot="leading-icon">person</md-icon>
</md-outlined-text-field>

// Filled Text Field with Error
<md-filled-text-field
  label="Email Address"
  type="email"
  value={email}
  error={!email.includes('@')}
  errorText="Please provide a valid email"
>
  <md-icon slot="leading-icon">mail</md-icon>
</md-filled-text-field>`;

  const selectSnippet = `import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';

<md-outlined-select label="Role" value={selectedRole}>
  <md-select-option value="developer">
    <div slot="headline">Software Developer</div>
  </md-select-option>
  <md-select-option value="designer">
    <div slot="headline">Product Designer</div>
  </md-select-option>
  <md-select-option value="manager">
    <div slot="headline">Project Manager</div>
  </md-select-option>
</md-outlined-select>`;

  return (
    <div className="flex flex-col gap-8">
      {/* Text Fields */}
      <ComponentCard
        title="Text Fields (Outlined & Filled)"
        subtitle="M3 floating label containers with leading icons, helper text, and validation states"
        snippet={textFieldSnippet}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outlined Variant</span>
            <md-outlined-text-field
              label="Full Name"
              value={name}
              onInput={(e: any) => setName(e.target.value)}
              supportingText="Enter your preferred name"
              className="w-full"
            >
              <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            {name && (
              <p className="text-xs text-[#6750A4] bg-purple-50 p-2.5 rounded-xl">
                Live State: <strong>{name}</strong>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filled Variant (with validation)</span>
            <md-filled-text-field
              label="Work Email"
              type="email"
              value={email}
              onInput={(e: any) => setEmail(e.target.value)}
              error={email.length > 0 && !email.includes('@')}
              errorText="Must be a valid email containing '@'"
              supportingText="We will send your verification code"
              className="w-full"
            >
              <md-icon slot="leading-icon">mail</md-icon>
            </md-filled-text-field>
          </div>
        </div>
      </ComponentCard>

      {/* Select Dropdown */}
      <ComponentCard
        title="Select Dropdown"
        subtitle="Material 3 Outlined dropdown select with structured options"
        snippet={selectSnippet}
      >
        <div className="max-w-md">
          <md-outlined-select
            label="Primary Role"
            value={selectedRole}
            onChange={(e: any) => setSelectedRole(e.target.value)}
            className="w-full"
          >
            <md-select-option value="developer" selected={selectedRole === 'developer'}>
              <div slot="headline">Software Developer</div>
            </md-select-option>
            <md-select-option value="designer" selected={selectedRole === 'designer'}>
              <div slot="headline">Product Designer</div>
            </md-select-option>
            <md-select-option value="manager" selected={selectedRole === 'manager'}>
              <div slot="headline">Engineering Manager</div>
            </md-select-option>
          </md-outlined-select>
        </div>
      </ComponentCard>
    </div>
  );
};
