import React, { useState } from 'react';
import { LayoutTemplate, Sparkles, Paintbrush, Zap, Search, Filter } from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/presetTemplates';
import { PresetTemplate, NicheType } from '../types';

interface TemplateLibraryProps {
  onSelectTemplate: (template: PresetTemplate) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Entertainment & Challenges', 'Tech & AI', 'Finance & Crypto', 'Gaming'];

  const filteredTemplates = PRESET_TEMPLATES.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <LayoutTemplate className="h-6 w-6 text-amber-400" />
            Viral High-CTR Thumbnail Templates
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Proven thumbnail layouts designed after top 0.1% YouTube creators
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((t) => (
          <div
            key={t.id}
            className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
              <img
                src={t.thumbnailUrl}
                alt={t.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {t.badge && (
                <div className="absolute top-3 left-3 rounded-md bg-rose-500 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-md">
                  {t.badge}
                </div>
              )}

              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-400/30">
                <Zap className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>Est. CTR {t.ctrEstimate}%</span>
              </div>

              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <button
                  onClick={() => onSelectTemplate(t)}
                  className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-xl hover:bg-amber-300 transition-transform cursor-pointer"
                >
                  <Paintbrush className="h-4 w-4" />
                  <span>Customize Template</span>
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white truncate">{t.name}</h3>
                <span className="text-[10px] font-semibold text-indigo-400">{t.category}</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{t.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
