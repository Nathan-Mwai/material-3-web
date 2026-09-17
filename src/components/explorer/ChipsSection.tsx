import React, { useState } from 'react';
import { ComponentCard } from '../ComponentCard';

export const ChipsSection: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['react', 'tailwind']);
  const [tags, setTags] = useState(['v2.5.0', 'TypeScript', 'Responsive']);

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const chipsSnippet = `import '@material/web/chips/chip-set.js';
import '@material/web/chips/filter-chip.js';
import '@material/web/chips/assist-chip.js';
import '@material/web/chips/input-chip.js';
import '@material/web/chips/suggestion-chip.js';
import '@material/web/icon/icon.js';

// Filter Chips (Multi-select)
<md-chip-set>
  <md-filter-chip label="React" selected={selected} onClick={toggle}>
    <md-icon slot="icon">check</md-icon>
  </md-filter-chip>
</md-chip-set>

// Assist Chip (Action)
<md-assist-chip label="Add to calendar" href="...">
  <md-icon slot="icon">event</md-icon>
</md-assist-chip>

// Input Chip (Removable)
<md-input-chip label="Tag" removable onRemove={handleRemove}></md-input-chip>`;

  return (
    <div className="flex flex-col gap-8">
      <ComponentCard
        title="Chips (Filter, Assist, Input & Suggestion)"
        subtitle="Compact interactive elements representing inputs, attributes, or actions"
        snippet={chipsSnippet}
      >
        <div className="flex flex-col gap-6">
          {/* Filter Chips */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Filter Chips (Click to toggle)
            </span>
            <md-chip-set>
              <md-filter-chip
                label="React 19"
                selected={selectedFilters.includes('react')}
                onClick={() => toggleFilter('react')}
              >
                <md-icon slot="icon">code</md-icon>
              </md-filter-chip>

              <md-filter-chip
                label="Tailwind CSS"
                selected={selectedFilters.includes('tailwind')}
                onClick={() => toggleFilter('tailwind')}
              >
                <md-icon slot="icon">palette</md-icon>
              </md-filter-chip>

              <md-filter-chip
                label="Web Components"
                selected={selectedFilters.includes('lit')}
                onClick={() => toggleFilter('lit')}
              >
                <md-icon slot="icon">widgets</md-icon>
              </md-filter-chip>

              <md-filter-chip
                label="Vite SPA"
                selected={selectedFilters.includes('vite')}
                onClick={() => toggleFilter('vite')}
              >
                <md-icon slot="icon">bolt</md-icon>
              </md-filter-chip>
            </md-chip-set>
          </div>

          {/* Assist & Suggestion Chips */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Assist & Suggestion Chips
            </span>
            <md-chip-set>
              <md-assist-chip label="Share Link" onClick={() => alert('Shared link!')}>
                <md-icon slot="icon">share</md-icon>
              </md-assist-chip>
              <md-assist-chip label="Add Bookmark">
                <md-icon slot="icon">bookmark_add</md-icon>
              </md-assist-chip>
              <md-suggestion-chip label="What is Material 3?"></md-suggestion-chip>
              <md-suggestion-chip label="View GitHub Repo"></md-suggestion-chip>
            </md-chip-set>
          </div>

          {/* Removable Input Chips */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Removable Input Tags (Click cross to delete)
            </span>
            <md-chip-set>
              {tags.map((tag) => (
                <md-input-chip
                  key={tag}
                  label={tag}
                  removable
                  onRemove={() => removeTag(tag)}
                ></md-input-chip>
              ))}
              {tags.length === 0 && (
                <span className="text-xs text-slate-400 italic">All tags removed. Refresh to reset.</span>
              )}
            </md-chip-set>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};
