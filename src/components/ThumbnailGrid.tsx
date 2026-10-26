import React, { useState } from 'react';
import { 
  Paintbrush, 
  Download, 
  Star, 
  RefreshCw, 
  Eye, 
  Zap, 
  Check, 
  Sparkles,
  Layers,
  Share2,
  ChevronDown
} from 'lucide-react';
import { ThumbnailVariation } from '../types';

interface ThumbnailGridProps {
  variations: ThumbnailVariation[];
  onSelectForEdit: (variation: ThumbnailVariation) => void;
  onRegenerate: (variationId: string) => void;
  onToggleFavorite: (variationId: string) => void;
  onDownload: (variation: ThumbnailVariation, format?: 'png' | 'jpg' | 'webp') => void;
}

export const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({
  variations,
  onSelectForEdit,
  onRegenerate,
  onToggleFavorite,
  onDownload
}) => {
  const [selectedFeedPreview, setSelectedFeedPreview] = useState<ThumbnailVariation | null>(null);
  const [downloadMenuId, setDownloadMenuId] = useState<string | null>(null);

  if (!variations || variations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            Generated AI Thumbnail Variations ({variations.length})
          </h3>
          <p className="text-xs text-slate-400">
            Ultra HD 16:9 Concept Renders • Select any version to edit or download
          </p>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {variations.map((v, idx) => (
          <div
            key={v.id}
            className="group relative flex flex-col rounded-2xl border border-slate-800/80 bg-[#101420]/90 overflow-hidden shadow-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-cyan-500/10"
          >
            {/* Thumbnail Image Container */}
            <div className="relative aspect-video w-full bg-[#0A0D14] overflow-hidden">
              <img
                src={v.imageUrl}
                alt={v.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* CTR Score Badge Top Right */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-[#0A0D14]/90 px-2.5 py-1 text-xs font-black text-cyan-300 border border-cyan-500/40 backdrop-blur-md shadow-lg">
                <Zap className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400 animate-pulse" />
                <span>CTR {v.clickabilityScore}%</span>
              </div>

              {/* Style Badge Top Left */}
              <div className="absolute top-3 left-3 rounded-md bg-[#0A0D14]/90 px-2 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700/80 backdrop-blur-md">
                {v.style}
              </div>

              {/* Hover Quick Edit Overlay */}
              <div className="absolute inset-0 bg-[#0A0D14]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-4">
                <button
                  onClick={() => onSelectForEdit(v)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform cursor-pointer"
                >
                  <Paintbrush className="h-4 w-4" />
                  <span>Customize in Canvas Editor</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedFeedPreview(v)}
                    className="flex items-center gap-1 rounded-lg bg-[#141926] px-3 py-1.5 text-[11px] font-bold text-slate-200 hover:bg-slate-800 hover:text-cyan-300 border border-slate-700 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5 text-cyan-400" />
                    <span>YouTube Feed Preview</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Scores Summary Row */}
            <div className="grid grid-cols-4 border-t border-slate-800/80 bg-[#0C0F18] px-3 py-2 text-center text-[10px]">
              <div className="border-r border-slate-800/60">
                <div className="text-[9px] font-bold text-slate-500 uppercase">Quality</div>
                <div className="font-extrabold text-cyan-300">{v.qualityScore || 98}%</div>
              </div>
              <div className="border-r border-slate-800/60">
                <div className="text-[9px] font-bold text-slate-500 uppercase">Readability</div>
                <div className="font-extrabold text-teal-300">{v.readabilityScore || 95}%</div>
              </div>
              <div className="border-r border-slate-800/60">
                <div className="text-[9px] font-bold text-slate-500 uppercase">Emotion</div>
                <div className="font-extrabold text-amber-300">{v.emotionScore || 94}%</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-500 uppercase">AI Rating</div>
                <div className="font-extrabold text-emerald-300">{v.aiRating || 'Grade A+'}</div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between p-4 border-t border-slate-800/80 bg-[#0A0D14]/60">
              <div className="space-y-0.5 max-w-[50%]">
                <h4 className="text-xs font-bold text-slate-200 truncate">{v.title}</h4>
                <p className="text-[10px] text-slate-500 truncate">Variant #{idx + 1} • {v.emotion}</p>
              </div>

              <div className="flex items-center gap-1.5 relative">
                <button
                  onClick={() => onRegenerate(v.id)}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 cursor-pointer"
                  title="Regenerate Concept"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => onToggleFavorite(v.id)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    v.isFavorite
                      ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300'
                      : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                  title="Save / Favorite"
                >
                  <Star className={`h-3.5 w-3.5 ${v.isFavorite ? 'fill-cyan-400' : ''}`} />
                </button>

                {/* Download Menu */}
                <div className="relative">
                  <button
                    onClick={() => setDownloadMenuId(downloadMenuId === v.id ? null : v.id)}
                    className="flex items-center gap-1 p-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-colors cursor-pointer"
                    title="Download HD"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <ChevronDown className="h-2.5 w-2.5 text-slate-500" />
                  </button>

                  {downloadMenuId === v.id && (
                    <div className="absolute right-0 bottom-10 w-32 rounded-xl border border-slate-800 bg-[#121623] p-1.5 shadow-2xl z-50">
                      <div className="px-2 py-1 text-[9px] font-bold text-slate-500 uppercase">Export Format</div>
                      {(['png', 'jpg', 'webp'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => {
                            onDownload(v, fmt);
                            setDownloadMenuId(null);
                          }}
                          className="flex w-full items-center justify-between px-2 py-1 text-xs text-slate-200 hover:bg-slate-800 hover:text-cyan-300 rounded-lg uppercase font-bold cursor-pointer"
                        >
                          <span>{fmt}</span>
                          <span className="text-[9px] text-slate-500">Ultra HD</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onSelectForEdit(v)}
                  className="flex items-center gap-1 rounded-lg bg-cyan-500/20 px-2.5 py-1 text-xs font-bold text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                >
                  <Paintbrush className="h-3 w-3" />
                  <span>Edit</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* YouTube Feed Simulator Modal */}
      {selectedFeedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#101420] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-cyan-400" />
                <h3 className="text-sm font-extrabold text-white">YouTube Home Feed Simulator</h3>
              </div>
              <button
                onClick={() => setSelectedFeedPreview(null)}
                className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* YouTube Card Mockup */}
            <div className="max-w-md mx-auto rounded-xl bg-[#0A0D14] border border-slate-800/80 p-3 space-y-3">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                <img
                  src={selectedFeedPreview.imageUrl}
                  alt="Mockup"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 right-2 rounded bg-black/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  12:45
                </span>
              </div>

              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-500 flex-shrink-0 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                  YT
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white line-clamp-2">
                    {selectedFeedPreview.title || 'I Tested The Ultimate YouTube AI Thumbnail Generator!'}
                  </h4>
                  <p className="text-[11px] text-slate-400">Creator Studio • 1.4M views • 2 hours ago</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectForEdit(selectedFeedPreview);
                  setSelectedFeedPreview(null);
                }}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2 text-xs font-extrabold text-slate-950 hover:brightness-110 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Open in Canvas Editor
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

