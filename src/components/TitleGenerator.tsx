import React, { useState } from 'react';
import { Target, Wand2, Sparkles, TrendingUp, Copy, Check } from 'lucide-react';
import { TitleSuggestion } from '../types';

export const TitleGenerator: React.FC = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('Tech & AI');
  const [isLoading, setIsLoading] = useState(false);
  const [titles, setTitles] = useState<TitleSuggestion[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/title-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentTitle: inputTitle, niche: selectedNiche })
      });
      const data = await res.json();
      if (data.titles) {
        setTitles(data.titles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyTitle = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl space-y-6">
      
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Target className="h-5 w-5 text-amber-400" />
          AI YouTube Title & CTR Hook Generator
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Generate high-conversion video titles engineered for YouTube algorithm recommendation loops
        </p>
      </div>

      <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Enter video concept (e.g. Building an AI app with React)..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          required
        />

        <select
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-xs text-slate-200 focus:outline-none"
        >
          <option>Tech & AI</option>
          <option>Finance & Crypto</option>
          <option>Gaming</option>
          <option>Vlogs & Lifestyle</option>
          <option>Entertainment & Challenges</option>
        </select>

        <button
          type="submit"
          disabled={isLoading || !inputTitle.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 text-xs font-bold text-white shadow-lg disabled:opacity-50 hover:opacity-95 transition-all cursor-pointer"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              <span>Generate Titles</span>
            </>
          )}
        </button>
      </form>

      {/* Suggested Titles List */}
      {titles.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            AI Generated Viral Titles ({titles.length})
          </div>

          <div className="space-y-3">
            {titles.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-amber-300">"{t.title}"</span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                      Score: {t.ctrScore}/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{t.explanation}</p>
                </div>

                <button
                  onClick={() => copyTitle(t.title, idx)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
