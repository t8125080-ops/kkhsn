import React from 'react';
import { 
  Zap, 
  Sparkles, 
  Trophy, 
  Eye, 
  TrendingUp, 
  CheckCircle2, 
  Palette, 
  Sun, 
  Layers, 
  Target,
  ArrowUpRight,
  Clock,
  Paintbrush
} from 'lucide-react';
import { AIAnalysisResult, ThumbnailVariation } from '../types';

interface RightPanelProps {
  analysis: AIAnalysisResult | null;
  variations?: ThumbnailVariation[];
  onSelectForEdit?: (variation: ThumbnailVariation) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  variationsCount?: number;
  onQuickGenerate?: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  analysis,
  variations = [],
  onSelectForEdit = (_variation: ThumbnailVariation) => {},
  collapsed,
  setCollapsed,
  isOpen,
  setIsOpen
}) => {
  const isPanelCollapsed = collapsed !== undefined ? collapsed : (isOpen !== undefined ? !isOpen : false);
  const handleToggle = () => {
    if (setCollapsed) {
      setCollapsed(!isPanelCollapsed);
    } else if (setIsOpen) {
      setIsOpen(isPanelCollapsed);
    }
  };

  const safeVariations = Array.isArray(variations) ? variations : [];
  const latestVariation = safeVariations.length > 0 ? safeVariations[0] : null;
  
  // Calculate default or dynamic scores
  const ctrScore = analysis?.clickabilityScore || (latestVariation ? latestVariation.clickabilityScore : 96);
  const qualityScore = analysis?.qualityScore || (latestVariation ? latestVariation.qualityScore : 98);
  const readabilityScore = analysis?.ctrBreakdown?.textReadability || 95;
  const emotionScore = analysis?.ctrBreakdown?.emotionImpact || 94;
  const colorScore = analysis?.ctrBreakdown?.colorContrast || 92;

  // Grade calculation
  const getGrade = (score: number) => {
    if (score >= 95) return { grade: 'A+', color: 'text-cyan-300 bg-cyan-500/20 border-cyan-500/40 shadow-cyan-500/30' };
    if (score >= 90) return { grade: 'A', color: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40 shadow-emerald-500/30' };
    if (score >= 85) return { grade: 'B+', color: 'text-amber-300 bg-amber-500/20 border-amber-500/40 shadow-amber-500/30' };
    return { grade: 'B', color: 'text-slate-300 bg-slate-800 border-slate-700' };
  };

  const gradeInfo = getGrade(ctrScore);

  return (
    <aside
      className={`fixed top-16 right-0 bottom-0 z-30 flex flex-col border-l border-slate-800/80 bg-[#0A0D14]/95 backdrop-blur-xl transition-all duration-300 ${
        isPanelCollapsed ? 'w-12' : 'w-80'
      } hidden lg:flex`}
    >
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="p-2 text-slate-400 hover:text-white border-b border-slate-800 flex justify-center cursor-pointer"
        title={isPanelCollapsed ? 'Expand AI Inspector' : 'Collapse Panel'}
      >
        <Zap className="h-4 w-4 text-cyan-400" />
      </button>

      {!isPanelCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">AI Real-time CTR Inspector</h3>
            </div>
            <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
              PRO
            </span>
          </div>

          {/* AI Grade Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#121828] via-[#0E131F] to-[#0A0D14] p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Overall AI Rating</span>
                <div className="text-2xl font-black text-white flex items-baseline gap-1 mt-0.5">
                  <span>{ctrScore}</span>
                  <span className="text-xs font-normal text-slate-400">/ 100</span>
                </div>
              </div>

              {/* Grade Badge */}
              <div className={`flex flex-col items-center justify-center h-14 w-14 rounded-2xl border ${gradeInfo.color} shadow-lg backdrop-blur-md`}>
                <span className="text-xl font-black">{gradeInfo.grade}</span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300">Grade</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug">
              {analysis?.recommendedComposition || 'High contrast face lighting and bold 3-word title trigger instant viewer attention on YouTube mobile app.'}
            </p>
          </div>

          {/* Detailed Score Gauges */}
          <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-[#101420] p-3.5">
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>CTR Quality Breakdown</span>
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
            </div>

            {/* CTR Gauge */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Clickthrough Rate</span>
                <span className="font-extrabold text-cyan-400">{ctrScore}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400" style={{ width: `${ctrScore}%` }} />
              </div>
            </div>

            {/* Readability Gauge */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Mobile Readability</span>
                <span className="font-extrabold text-emerald-400">{readabilityScore}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: `${readabilityScore}%` }} />
              </div>
            </div>

            {/* Emotion Gauge */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Emotion & Face Impact</span>
                <span className="font-extrabold text-amber-400">{emotionScore}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${emotionScore}%` }} />
              </div>
            </div>

            {/* Color Score Gauge */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Color Psychology</span>
                <span className="font-extrabold text-indigo-400">{colorScore}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${colorScore}%` }} />
              </div>
            </div>
          </div>

          {/* Color Psychology & Lighting Analysis */}
          <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-[#101420] p-3.5">
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-cyan-400" />
              <span>Color Psychology & Lighting</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="rounded-xl bg-slate-950 p-2 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Primary Accent</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-slate-200 mt-1">
                  <span className="h-3 w-3 rounded-full bg-[#FFCC00] border border-white/20" />
                  <span>#FFCC00</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950 p-2 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Lighting Style</span>
                <span className="font-bold text-cyan-300 text-[11px] mt-1 block">Rim Light & Neon</span>
              </div>
            </div>
          </div>

          {/* Recent Generation History Mini Feed */}
          {safeVariations.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                <span>Recent Generations ({safeVariations.length})</span>
                <Clock className="h-3.5 w-3.5 text-slate-500" />
              </div>

              <div className="space-y-2">
                {safeVariations.slice(0, 3).map((v) => (
                  <div
                    key={v.id}
                    onClick={() => onSelectForEdit(v)}
                    className="group flex items-center gap-3 p-2 rounded-xl border border-slate-800/80 bg-[#101420] hover:border-cyan-500/40 cursor-pointer transition-all"
                  >
                    <img
                      src={v.imageUrl}
                      alt={v.title}
                      className="h-12 w-20 rounded-lg object-cover bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-cyan-300">{v.title}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <span className="text-cyan-400 font-bold">CTR {v.clickabilityScore}%</span>
                        <span>• {v.style}</span>
                      </div>
                    </div>

                    <Paintbrush className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors mr-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </aside>
  );
};
