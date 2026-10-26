import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Eye, 
  Zap, 
  Target, 
  Lightbulb, 
  Palette, 
  Flame, 
  Copy, 
  Check 
} from 'lucide-react';
import { AIAnalysisResult } from '../types';

interface AIPromptAnalysisProps {
  analysis: AIAnalysisResult;
}

export const AIPromptAnalysis: React.FC<AIPromptAnalysisProps> = ({ analysis }) => {
  const [copiedPromptId, setCopiedPromptId] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#101420]/90 p-6 shadow-2xl backdrop-blur-xl space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <h3 className="text-lg font-black text-slate-100">AI Thumbnail Strategy & Title Analysis</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gemini 3.6 Flash Multi-Modal Vision & CTR Prediction Engine
          </p>
        </div>

        {/* Clickability Score Badge */}
        <div className="flex items-center gap-4 bg-[#0A0D14] p-3 rounded-xl border border-slate-800/80">
          <div className="text-right">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">AI Clickability Rating</div>
            <div className="text-xs font-bold text-cyan-400">Predicted CTR: +320% High</div>
          </div>
          <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-[#121623] border-2 border-cyan-400 text-cyan-300 font-black text-base shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            {analysis.clickabilityScore}
          </div>
        </div>
      </div>

      {/* Grid: Breakdown Metrics & Color Palette */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Detected Parameters */}
        <div className="p-4 rounded-xl bg-[#0A0D14] border border-slate-800/80 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-cyan-400" />
            Audience & Emotion
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Emotion Trigger:</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                {analysis.detectedEmotion}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Main Subject:</span>
              <span className="text-slate-200 font-bold truncate max-w-[140px]">{analysis.mainSubject}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Target Niche:</span>
              <span className="text-cyan-300 font-bold">{analysis.detectedNiche}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Recommended Style:</span>
              <span className="text-teal-300 font-bold">{analysis.recommendedStyle}</span>
            </div>
          </div>
        </div>

        {/* Color Palette Callout */}
        <div className="p-4 rounded-xl bg-[#0A0D14] border border-slate-800/80 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-cyan-400" />
            Optimal Color Palette
          </div>
          <p className="text-[11px] text-slate-400">{analysis.colorPalette.name}</p>

          <div className="flex items-center gap-2">
            {[
              { label: 'Primary', color: analysis.colorPalette.primary },
              { label: 'Secondary', color: analysis.colorPalette.secondary },
              { label: 'Accent', color: analysis.colorPalette.accent },
              { label: 'BG', color: analysis.colorPalette.background },
              { label: 'Text', color: analysis.colorPalette.text }
            ].map((c, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="h-8 w-full rounded-lg border border-slate-700 shadow-sm"
                  style={{ backgroundColor: c.color }}
                  title={`${c.label}: ${c.color}`}
                />
                <span className="text-[9px] text-slate-500 font-mono">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTR Score Progress Breakdown */}
        <div className="p-4 rounded-xl bg-[#0A0D14] border border-slate-800/80 space-y-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            CTR Factors Breakdown
          </div>

          <div className="space-y-1.5">
            {[
              { label: 'Emotion Impact', val: analysis.ctrBreakdown.emotionImpact, color: 'bg-cyan-400' },
              { label: 'Text Readability', val: analysis.ctrBreakdown.textReadability, color: 'bg-teal-400' },
              { label: 'Color Contrast', val: analysis.ctrBreakdown.colorContrast, color: 'bg-indigo-400' },
              { label: 'Curiosity Gap', val: analysis.ctrBreakdown.curiosityGap, color: 'bg-amber-400' }
            ].map((factor, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>{factor.label}</span>
                  <span className="font-extrabold text-cyan-300">{factor.val}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                  <div className={`h-full ${factor.color}`} style={{ width: `${factor.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Tips & Keywords */}
      <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
        <div className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5">
          <Lightbulb className="h-4 w-4 text-cyan-400" />
          Optimization Tips & Visual Hooks
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          {analysis.optimizationTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Master Image Prompts Generated by Gemini */}
      <div className="space-y-3">
        <div className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-cyan-400" />
          AI Generated Master Thumbnail Prompts ({analysis.generatedPrompts.length})
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.generatedPrompts.map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-xl bg-[#0A0D14] border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-cyan-300">{p.title}</span>
                <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                  {p.styleTag}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic line-clamp-2">"{p.promptText}"</p>
              
              <button
                onClick={() => copyToClipboard(p.promptText, p.id)}
                className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {copiedPromptId === p.id ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

