import React, { useState } from 'react';
import { Target, Zap, Trophy, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { ABTestComparison } from '../types';

export const ABTesting: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ABTestComparison | null>({
    versionA: {
      id: 'a1',
      name: 'Version A (Yellow Outline + High Emotion)',
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
      score: 95.8
    },
    versionB: {
      id: 'b1',
      name: 'Version B (Standard Photo + Long Text)',
      imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
      score: 81.3
    },
    winner: 'A',
    winMargin: 14.5,
    keyDifferences: [
      'Version A features 38% higher face emotion contrast and bright yellow stroke outline.',
      'Text in Version A uses 3 words vs 6 words in Version B, leading to 2x faster mobile scan readability.',
      'Version A includes eye-level gazes that trigger subconscious viewer connection.'
    ],
    aiRecommendation: 'Deploy Version A for primary upload. Consider testing Version B if clickthrough rate drops after 48 hours.'
  });

  const runABTest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            AI Thumbnail A/B Test Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Head-to-head visual comparison predicting real YouTube CTR winner
          </p>
        </div>

        <button
          onClick={runABTest}
          disabled={isRunning}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-4 py-2 text-xs font-extrabold text-white shadow-md hover:opacity-95 cursor-pointer"
        >
          {isRunning ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Run AI Visual Comparison</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          
          {/* Side by side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Version A Card */}
            <div className={`relative flex flex-col rounded-2xl border p-4 space-y-3 bg-slate-950 ${
              result.winner === 'A' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{result.versionA.name}</span>
                {result.winner === 'A' && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[10px] font-extrabold">
                    <Trophy className="h-3 w-3" />
                    WINNER (+{result.winMargin}%)
                  </span>
                )}
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={result.versionA.imageUrl}
                  alt="Version A"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Predicted CTR Score:</span>
                <span className="font-extrabold text-amber-400 text-base">{result.versionA.score}%</span>
              </div>
            </div>

            {/* Version B Card */}
            <div className={`relative flex flex-col rounded-2xl border p-4 space-y-3 bg-slate-950 ${
              result.winner === 'B' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{result.versionB.name}</span>
                {result.winner === 'B' && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[10px] font-extrabold">
                    <Trophy className="h-3 w-3" />
                    WINNER
                  </span>
                )}
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={result.versionB.imageUrl}
                  alt="Version B"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Predicted CTR Score:</span>
                <span className="font-extrabold text-slate-300 text-base">{result.versionB.score}%</span>
              </div>
            </div>

          </div>

          {/* AI Analysis Breakdown */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              AI Key Difference Analysis
            </h4>

            <ul className="space-y-1.5 text-xs text-slate-300">
              {result.keyDifferences.map((diff, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{diff}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300">
              <span className="font-bold text-slate-200">AI Recommendation: </span>
              <span className="italic">{result.aiRecommendation}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
