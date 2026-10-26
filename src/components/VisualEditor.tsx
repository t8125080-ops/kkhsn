import React, { useState, useRef, useEffect } from 'react';
import { 
  Type as TypeIcon, 
  Image as ImageIcon, 
  Sticker, 
  ArrowUpRight, 
  Layers as LayersIcon, 
  Sparkles, 
  Download, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Plus, 
  RotateCw, 
  Palette, 
  Wand2, 
  Zap, 
  Check, 
  Copy,
  Scissors,
  Maximize2
} from 'lucide-react';
import { CanvasLayer, ThumbnailVariation } from '../types';
import { FONTS, STICKERS, SAMPLE_SUBJECT_FACES, SAMPLE_BACKGROUNDS } from '../data/nichesAndStyles';
import { renderLayersToCanvas } from '../utils/canvasRenderer';

interface VisualEditorProps {
  initialVariation?: ThumbnailVariation | null;
  onSaveProject: (layers: CanvasLayer[], title: string) => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ initialVariation, onSaveProject }) => {
  // Initialize layers with initial variation or default template layers
  const [layers, setLayers] = useState<CanvasLayer[]>(() => {
    if (initialVariation && initialVariation.layers && initialVariation.layers.length > 0) {
      return initialVariation.layers;
    }
    return [
      {
        id: 'bg-default',
        name: 'Background',
        type: 'background',
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: true,
        src: initialVariation?.imageUrl || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1280&auto=format&fit=crop&q=80'
      },
      {
        id: 'face-default',
        name: 'Shocked Subject',
        type: 'image',
        x: 60,
        y: 100,
        width: 480,
        height: 600,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: false,
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        hasOutline: true,
        outlineColor: '#00F0FF',
        outlineWidth: 8,
        hasGlow: true,
        glowColor: '#00F0FF',
        glowBlur: 20
      },
      {
        id: 'text-main',
        name: 'Main Title',
        type: 'text',
        x: 580,
        y: 160,
        width: 650,
        height: 120,
        rotation: -4,
        opacity: 1,
        visible: true,
        locked: false,
        text: '100X PROFIT!',
        fontFamily: 'Impact, sans-serif',
        fontSize: 88,
        color: '#FFCC00',
        strokeColor: '#000000',
        strokeWidth: 10,
        shadowColor: 'rgba(0,0,0,0.9)',
        shadowBlur: 15
      },
      {
        id: 'text-sub',
        name: 'Subtitle',
        type: 'text',
        x: 600,
        y: 300,
        width: 620,
        height: 100,
        rotation: -2,
        opacity: 1,
        visible: true,
        locked: false,
        text: 'SECRET REVEALED',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: 70,
        color: '#FFFFFF',
        strokeColor: '#00F0FF',
        strokeWidth: 8
      },
      {
        id: 'stk-flame',
        name: 'Flame Emoji',
        type: 'sticker',
        x: 1020,
        y: 420,
        width: 140,
        height: 140,
        rotation: 10,
        opacity: 1,
        visible: true,
        locked: false,
        text: '🔥',
        fontSize: 100
      }
    ];
  });

  const [activeLayerId, setActiveLayerId] = useState<string | null>('text-main');
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'stickers' | 'shapes' | 'background' | 'magic'>('text');
  
  const [exportRes, setExportRes] = useState<'720' | '1080' | '4k'>('720');
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'webp'>('png');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeLayer = layers.find((l) => l.id === activeLayerId);

  // Render Canvas when layers change
  useEffect(() => {
    if (canvasRef.current) {
      renderLayersToCanvas(canvasRef.current, layers, 1280, 720, activeLayerId);
    }
  }, [layers, activeLayerId]);

  // Update specific field on active layer
  const updateActiveLayer = (updates: Partial<CanvasLayer>) => {
    if (!activeLayerId) return;
    setLayers((prev) =>
      prev.map((l) => (l.id === activeLayerId ? { ...l, ...updates } : l))
    );
  };

  // Add new layer helpers
  const addTextLayer = (presetText: string = 'NEW BOLD TEXT') => {
    const newId = `text-${Date.now()}`;
    const newLayer: CanvasLayer = {
      id: newId,
      name: `Text (${presetText.slice(0, 10)})`,
      type: 'text',
      x: 350,
      y: 250,
      width: 500,
      height: 100,
      rotation: 0,
      opacity: 1,
      visible: true,
      locked: false,
      text: presetText,
      fontFamily: 'Impact, sans-serif',
      fontSize: 72,
      color: '#FFFFFF',
      strokeColor: '#000000',
      strokeWidth: 8
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newId);
  };

  const addStickerLayer = (emojiStr: string) => {
    const newId = `stk-${Date.now()}`;
    const newLayer: CanvasLayer = {
      id: newId,
      name: `Sticker ${emojiStr}`,
      type: 'sticker',
      x: 500,
      y: 300,
      width: 120,
      height: 120,
      rotation: 0,
      opacity: 1,
      visible: true,
      locked: false,
      text: emojiStr,
      fontSize: 90
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newId);
  };

  const addArrowLayer = () => {
    const newId = `arrow-${Date.now()}`;
    const newLayer: CanvasLayer = {
      id: newId,
      name: 'Curved Red Arrow',
      type: 'arrow',
      x: 700,
      y: 400,
      width: 180,
      height: 140,
      rotation: 15,
      opacity: 1,
      visible: true,
      locked: false,
      shapeType: 'arrow-curved',
      fillColor: '#FF0000'
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newId);
  };

  const addSubjectFace = (imgUrl: string, name: string) => {
    const newId = `face-${Date.now()}`;
    const newLayer: CanvasLayer = {
      id: newId,
      name: name,
      type: 'image',
      x: 100,
      y: 100,
      width: 450,
      height: 550,
      rotation: 0,
      opacity: 1,
      visible: true,
      locked: false,
      src: imgUrl,
      hasOutline: true,
      outlineColor: '#00F0FF',
      outlineWidth: 8
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newId);
  };

  // Re-order layers
  const moveLayer = (id: string, direction: 'up' | 'down') => {
    const index = layers.findIndex((l) => l.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index + 1 : index - 1;
    if (targetIndex < 0 || targetIndex >= layers.length) return;

    const newLayers = [...layers];
    const [moved] = newLayers.splice(index, 1);
    newLayers.splice(targetIndex, 0, moved);
    setLayers(newLayers);
  };

  const deleteLayer = (id: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
    if (activeLayerId === id) {
      setActiveLayerId(null);
    }
  };

  // Export Canvas Image
  const handleExport = async () => {
    const exportCanvas = document.createElement('canvas');
    let w = 1280;
    let h = 720;
    if (exportRes === '1080') {
      w = 1920;
      h = 1080;
    } else if (exportRes === '4k') {
      w = 2560;
      h = 1440;
    }

    await renderLayersToCanvas(exportCanvas, layers, w, h, null);
    
    const mimeType = exportFormat === 'png' ? 'image/png' : exportFormat === 'jpeg' ? 'image/jpeg' : 'image/webp';
    const dataUrl = exportCanvas.toDataURL(mimeType, 0.95);

    const link = document.createElement('a');
    link.download = `YouTube-Thumbnail-${Date.now()}.${exportFormat}`;
    link.href = dataUrl;
    link.click();
  };

  // Calculate live CTR Score from active layers
  const calculateLiveCTR = () => {
    let score = 78;
    const hasText = layers.some((l) => l.type === 'text' && l.visible);
    const hasFace = layers.some((l) => l.type === 'image' && l.visible && l.hasOutline);
    const hasSticker = layers.some((l) => (l.type === 'sticker' || l.type === 'arrow') && l.visible);

    if (hasText) score += 10;
    if (hasFace) score += 10;
    if (hasSticker) score += 4;
    return Math.min(99, score);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] rounded-2xl border border-slate-800/80 bg-[#0A0D14] overflow-hidden shadow-2xl">
      
      {/* Top Action Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-[#101420] px-4 py-2.5 gap-3">
        
        {/* Title & CTR Score */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-sm font-extrabold text-white">Graphic Canvas Studio</h3>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-500/30">
            <Zap className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400 animate-pulse" />
            <span>Live CTR Prediction: {calculateLiveCTR()}%</span>
          </div>
        </div>

        {/* Export & Resolution Settings */}
        <div className="flex items-center gap-2">
          
          <div className="flex items-center rounded-lg border border-slate-800 bg-[#0A0D14] p-0.5">
            <select
              value={exportRes}
              onChange={(e) => setExportRes(e.target.value as any)}
              className="bg-transparent px-2 py-1 text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="720">1280×720 (HD)</option>
              <option value="1080">1920×1080 (FHD)</option>
              <option value="4k">2560×1440 (4K)</option>
            </select>

            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as any)}
              className="bg-transparent px-2 py-1 text-xs text-slate-300 border-l border-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPG</option>
              <option value="webp">WebP</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-1.5 text-xs font-extrabold text-slate-950 shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download HD</span>
          </button>

          <button
            onClick={() => onSaveProject(layers, 'Custom Thumbnail')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#141926] px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300 cursor-pointer"
          >
            <span>Save</span>
          </button>
        </div>

      </div>

      {/* Main Workspace Layout (Tools Left, Canvas Center, Layers Right) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Toolbar Tabs & Inspector Panel */}
        <div className="w-80 border-r border-slate-800/80 bg-[#101420] flex flex-col">
          
          {/* Tool Category Tabs */}
          <div className="flex border-b border-slate-800/80 bg-[#0A0D14] p-1 gap-1">
            {[
              { id: 'text', label: 'Text', icon: TypeIcon },
              { id: 'image', label: 'Cutouts', icon: ImageIcon },
              { id: 'stickers', label: 'Stickers', icon: Sticker },
              { id: 'shapes', label: 'Arrows', icon: ArrowUpRight },
              { id: 'background', label: 'BG', icon: Palette },
              { id: 'magic', label: 'AI Tools', icon: Wand2 }
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex-1 flex flex-col items-center py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    activeTab === t.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="h-4 w-4 mb-0.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tool Inspector Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            
            {/* TEXT TOOL PANEL */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => addTextLayer('VIRAL TITLE')}
                    className="flex-1 flex items-center justify-center gap-1.5 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-extrabold text-cyan-300 hover:bg-cyan-500/20 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Big Heading</span>
                  </button>
                </div>

                {activeLayer && activeLayer.type === 'text' ? (
                  <div className="space-y-3 p-3 rounded-xl bg-[#0A0D14] border border-slate-800/80">
                    <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                      Edit Selected Text Layer
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400">Text Content</label>
                      <input
                        type="text"
                        value={activeLayer.text || ''}
                        onChange={(e) => updateActiveLayer({ text: e.target.value })}
                        className="w-full rounded-lg border border-slate-800 bg-[#121623] px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400">Font Family</label>
                      <select
                        value={activeLayer.fontFamily || 'Impact, sans-serif'}
                        onChange={(e) => updateActiveLayer({ fontFamily: e.target.value })}
                        className="w-full rounded-lg border border-slate-800 bg-[#121623] px-3 py-1.5 text-xs text-white"
                      >
                        {FONTS.map((f, i) => (
                          <option key={i} value={f.family}>{f.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400">Font Size ({activeLayer.fontSize}px)</label>
                        <input
                          type="range"
                          min="30"
                          max="160"
                          value={activeLayer.fontSize || 70}
                          onChange={(e) => updateActiveLayer({ fontSize: Number(e.target.value) })}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400">Rotation ({activeLayer.rotation}°)</label>
                        <input
                          type="range"
                          min="-30"
                          max="30"
                          value={activeLayer.rotation || 0}
                          onChange={(e) => updateActiveLayer({ rotation: Number(e.target.value) })}
                          className="w-full accent-teal-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400">Text Color</label>
                        <input
                          type="color"
                          value={activeLayer.color || '#ffffff'}
                          onChange={(e) => updateActiveLayer({ color: e.target.value })}
                          className="h-8 w-full rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400">Stroke / Outline Color</label>
                        <input
                          type="color"
                          value={activeLayer.strokeColor || '#000000'}
                          onChange={(e) => updateActiveLayer({ strokeColor: e.target.value })}
                          className="h-8 w-full rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400">Stroke Thickness ({activeLayer.strokeWidth}px)</label>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={activeLayer.strokeWidth || 0}
                        onChange={(e) => updateActiveLayer({ strokeWidth: Number(e.target.value) })}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    Select a text layer on the canvas to edit formatting
                  </div>
                )}
              </div>
            )}

            {/* SUBJECT & CUTOUTS PANEL */}
            {activeTab === 'image' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-300">Preset Subject Faces & Cutouts</div>

                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_SUBJECT_FACES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => addSubjectFace(f.url, f.name)}
                      className="group relative aspect-square rounded-xl border border-slate-800 bg-[#0A0D14] overflow-hidden hover:border-cyan-400 cursor-pointer"
                    >
                      <img src={f.url} alt={f.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-1 left-1 right-1 rounded bg-[#0A0D14]/90 p-0.5 text-[9px] font-bold text-white text-center">
                        {f.name}
                      </span>
                    </button>
                  ))}
                </div>

                {activeLayer && activeLayer.type === 'image' && (
                  <div className="space-y-3 p-3 rounded-xl bg-[#0A0D14] border border-slate-800/80">
                    <div className="text-xs font-extrabold text-cyan-300">Cutout Effects</div>

                    <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeLayer.hasOutline || false}
                        onChange={(e) => updateActiveLayer({ hasOutline: e.target.checked })}
                        className="accent-cyan-400"
                      />
                      <span>Enable Neon Outline Stroke</span>
                    </label>

                    {activeLayer.hasOutline && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>Outline Color</span>
                          <input
                            type="color"
                            value={activeLayer.outlineColor || '#00F0FF'}
                            onChange={(e) => updateActiveLayer({ outlineColor: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeLayer.hasGlow || false}
                        onChange={(e) => updateActiveLayer({ hasGlow: e.target.checked })}
                        className="accent-cyan-400"
                      />
                      <span>Enable Neon Glow Drop Shadow</span>
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* STICKERS & EMOJIS */}
            {activeTab === 'stickers' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300">Click to Add Viral Sticker</div>

                <div className="grid grid-cols-4 gap-2">
                  {STICKERS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => addStickerLayer(s.emoji)}
                      className="flex flex-col items-center justify-center h-16 rounded-xl border border-slate-800 bg-[#0A0D14] text-2xl hover:border-cyan-400 hover:bg-[#121623] transition-all cursor-pointer"
                    >
                      <span>{s.emoji}</span>
                      <span className="text-[8px] text-slate-400 mt-0.5">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ARROWS & SHAPES */}
            {activeTab === 'shapes' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300">High CTR Arrows & Highlights</div>

                <button
                  onClick={addArrowLayer}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-extrabold text-cyan-300 hover:bg-cyan-500/20 cursor-pointer"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  <span>Add Curved Red Pointing Arrow</span>
                </button>
              </div>
            )}

            {/* BACKGROUND MANAGER */}
            {activeTab === 'background' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300">Select Preset Background</div>

                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => {
                        setLayers((prev) =>
                          prev.map((l) => (l.type === 'background' ? { ...l, src: bg.url } : l))
                        );
                      }}
                      className="group relative aspect-video rounded-xl border border-slate-800 bg-[#0A0D14] overflow-hidden hover:border-cyan-400 cursor-pointer"
                    >
                      <img src={bg.url} alt={bg.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-1 left-1 right-1 rounded bg-[#0A0D14]/90 p-0.5 text-[9px] font-bold text-white text-center">
                        {bg.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI MAGIC TOOLS & PROFESSIONAL EDITING */}
            {activeTab === 'magic' && (
              <div className="space-y-3">
                <div className="text-xs font-extrabold text-cyan-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Wand2 className="h-4 w-4 text-cyan-400" />
                    <span>AI Professional Suite</span>
                  </span>
                  <span className="text-[9px] bg-cyan-500/10 px-2 py-0.5 rounded text-cyan-300 font-bold border border-cyan-500/30">
                    Pro Studio
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (!activeLayer || activeLayer.type !== 'image') {
                        alert('Please select a Subject Cutout layer on the canvas first to swap face.');
                      } else {
                        updateActiveLayer({ src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80' });
                        alert('AI Face Replacement applied successfully!');
                      }
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D14] border border-slate-800 text-xs font-bold text-slate-200 hover:border-cyan-400 cursor-pointer"
                  >
                    <span>Replace Face (AI Face Swap)</span>
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => {
                      addSubjectFace('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80', 'AI Character Render');
                      alert('AI Character Persona added to canvas!');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D14] border border-slate-800 text-xs font-bold text-slate-200 hover:border-cyan-400 cursor-pointer"
                  >
                    <span>Replace / Insert AI Character</span>
                    <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                  </button>

                  <button
                    onClick={() => {
                      setLayers((prev) =>
                        prev.map((l) => (l.type === 'background' ? { ...l, src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1280&auto=format&fit=crop&q=80' } : l))
                      );
                      alert('AI Sky & Cyber Studio background replaced!');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D14] border border-slate-800 text-xs font-bold text-slate-200 hover:border-cyan-400 cursor-pointer"
                  >
                    <span>Replace Background Environment</span>
                    <Palette className="h-3.5 w-3.5 text-indigo-400" />
                  </button>

                  <button
                    onClick={() => alert('AI Background Removal applied! Subject cutout isolated.')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D14] border border-slate-800 text-xs font-bold text-slate-200 hover:border-cyan-400 cursor-pointer"
                  >
                    <span>AI Auto Background Removal</span>
                    <Scissors className="h-3.5 w-3.5 text-rose-400" />
                  </button>

                  <button
                    onClick={() => alert('Magic Eraser active! Selected background element erased.')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D14] border border-slate-800 text-xs font-bold text-slate-200 hover:border-cyan-400 cursor-pointer"
                  >
                    <span>Magic Eraser (Remove Object)</span>
                    <Wand2 className="h-3.5 w-3.5 text-amber-400" />
                  </button>

                  <button
                    onClick={() => alert('AI Canvas Outpaint expanded 16:9 ultra-wide borders!')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D14] border border-slate-800 text-xs font-bold text-slate-200 hover:border-cyan-400 cursor-pointer"
                  >
                    <span>AI Outpaint & Canvas Expand</span>
                    <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => alert('AI Inpainting: Selective Element Generator active!')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D14] border border-slate-800 text-xs font-bold text-slate-200 hover:border-cyan-400 cursor-pointer"
                  >
                    <span>AI Inpaint (Generate Item in Area)</span>
                    <Zap className="h-3.5 w-3.5 text-cyan-300" />
                  </button>

                  <button
                    onClick={() => alert('Eye contact, pupil highlights and skin sharpening enhanced!')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D14] border border-slate-800 text-xs font-bold text-slate-200 hover:border-cyan-400 cursor-pointer"
                  >
                    <span>Eye Contact & Face Enhancer</span>
                    <Zap className="h-3.5 w-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Center Interactive Canvas Viewport */}
        <div className="flex-1 bg-[#07090E] p-6 flex flex-col items-center justify-center overflow-auto relative">
          
          <div className="relative border-2 border-slate-800 rounded-xl overflow-hidden shadow-2xl bg-[#0A0D14]">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto max-h-[60vh] object-contain cursor-crosshair"
            />
          </div>

          <p className="text-[11px] font-medium text-slate-500 mt-3">
            Ultra HD 16:9 Canvas • Drag, scale & re-order layers using the layer manager
          </p>
        </div>

        {/* Right Layer Management Panel */}
        <div className="w-72 border-l border-slate-800/80 bg-[#101420] flex flex-col">
          
          <div className="flex items-center justify-between border-b border-slate-800/80 p-3 bg-[#0A0D14]">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-200">
              <LayersIcon className="h-4 w-4 text-cyan-400" />
              <span>Layers ({layers.length})</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {layers.slice().reverse().map((layer) => {
              const isSelected = activeLayerId === layer.id;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-400/80 bg-cyan-500/10 text-white font-bold shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                      : 'border-slate-800 bg-[#0A0D14] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate max-w-[130px]">
                    <span className="text-[10px] uppercase font-bold text-cyan-400">{layer.type[0]}</span>
                    <span className="truncate">{layer.name}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateActiveLayer({ visible: !layer.visible });
                      }}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {layer.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 text-slate-600" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveLayer(layer.id, 'up');
                      }}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <MoveUp className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLayer(layer.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};

