import React, { useState } from 'react';
import { 
  Wand2, 
  Upload, 
  Sparkles, 
  Image as ImageIcon, 
  User, 
  FileText, 
  Globe, 
  Check, 
  HelpCircle,
  X,
  Youtube,
  Link,
  Box,
  ShoppingBag,
  Layers,
  Palette
} from 'lucide-react';
import { NicheType, ArtStyleType } from '../types';
import { NICHES, ART_STYLES } from '../data/nichesAndStyles';

interface GeneratorFormProps {
  onGenerate: (data: {
    title: string;
    description: string;
    channelName: string;
    language: string;
    country: string;
    youtubeUrl?: string;
    thumbnailUrl?: string;
    niche: NicheType;
    style: ArtStyleType;
    uploads: {
      face?: string;
      character?: string;
      reference?: string;
      logo?: string;
      background?: string;
      object?: string;
      product?: string;
      extra?: string;
    };
  }) => void;
  isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [channelName, setChannelName] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [language, setLanguage] = useState('English');
  const [country, setCountry] = useState('United States');
  const [selectedNiche, setSelectedNiche] = useState<NicheType>('Gaming');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyleType>('MrBeast Explosive');

  const [uploads, setUploads] = useState<{
    face?: string;
    character?: string;
    reference?: string;
    logo?: string;
    background?: string;
    object?: string;
    product?: string;
    extra?: string;
  }>({});

  const handleFileUpload = (type: 'face' | 'character' | 'reference' | 'logo' | 'background' | 'object' | 'product' | 'extra', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploads((prev) => ({ ...prev, [type]: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUpload = (type: 'face' | 'character' | 'reference' | 'logo' | 'background' | 'object' | 'product' | 'extra') => {
    setUploads((prev) => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onGenerate({
      title,
      description,
      channelName,
      language,
      country,
      youtubeUrl,
      thumbnailUrl,
      niche: selectedNiche,
      style: selectedStyle,
      uploads
    });
  };

  // Sample quick title ideas
  const sampleTitles = [
    'I Spent $1,000,000 in 24 Hours!',
    'DON\'T Buy The New iPhone Until You Watch This',
    'How I Turned $100 into $10,000/Month (Step by Step)',
    '1 VS 100 Clutch In Fortnite World Cup',
    'The Dark Truth About AI Nobody Tells You'
  ];

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#101420]/90 p-6 shadow-2xl backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Step 1: Video Title Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold text-xs border border-cyan-500/30">1</span>
              <span>Enter YouTube Video Title</span>
              <span className="text-cyan-400">*</span>
            </label>
            <span className="text-xs text-slate-400">AI automatically detects niche, emotion & visual hooks</span>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. I Spent 100 Hours Building an AI YouTube Generator..."
              className="w-full rounded-xl border border-slate-800 bg-[#0A0D14] px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-base font-medium transition-all shadow-inner"
              required
            />
            {title && (
              <button
                type="button"
                onClick={() => setTitle('')}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Preset Title Suggestions */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Try Viral Preset:</span>
            {sampleTitles.map((st, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTitle(st)}
                className="rounded-lg bg-[#141926] px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-all border border-slate-800 cursor-pointer"
              >
                "{st.slice(0, 24)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Optional YouTube Video or Thumbnail URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#0A0D14] border border-slate-800/80">
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Youtube className="h-3.5 w-3.5 text-rose-500" />
              YouTube Video URL (Optional)
            </label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full rounded-lg border border-slate-800 bg-[#121623] px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Link className="h-3.5 w-3.5 text-cyan-400" />
              Competitor Thumbnail URL (Optional)
            </label>
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://img.youtube.com/vi/.../maxresdefault.jpg"
              className="w-full rounded-lg border border-slate-800 bg-[#121623] px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Step 2: Niche & Style Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Choose Niche */}
          <div>
            <label className="text-sm font-extrabold text-slate-100 mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold text-xs border border-cyan-500/30">2</span>
              <span>Choose Video Niche</span>
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {NICHES.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelectedNiche(n.id)}
                  className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedNiche === n.id
                      ? 'border-cyan-500/80 bg-cyan-500/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)] font-bold'
                      : 'border-slate-800 bg-[#0A0D14] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-xs text-slate-200">{n.label}</span>
                    {selectedNiche === n.id && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                  </div>
                  <span className="text-[10px] text-slate-400 line-clamp-1">{n.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Choose Art Style */}
          <div>
            <label className="text-sm font-extrabold text-slate-100 mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold text-xs border border-cyan-500/30">3</span>
              <span>Select Thumbnail Art Style</span>
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {ART_STYLES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStyle(st.id)}
                  className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedStyle === st.id
                      ? 'border-cyan-500/80 bg-cyan-500/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)] font-bold'
                      : 'border-slate-800 bg-[#0A0D14] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-xs text-slate-200">{st.label}</span>
                    {selectedStyle === st.id && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                  </div>
                  <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${st.sampleGradient} my-1`} />
                  <span className="text-[10px] text-slate-400 line-clamp-1">{st.description}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Step 3: Meta & Audience Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#0A0D14] border border-slate-800/80">
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-[#121623] px-3 py-2 text-xs text-slate-200 focus:outline-none"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>German</option>
              <option>French</option>
              <option>Portuguese</option>
              <option>Japanese</option>
              <option>Korean</option>
              <option>Hindi</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              Target Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-[#121623] px-3 py-2 text-xs text-slate-200 focus:outline-none"
            >
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>India</option>
              <option>Germany</option>
              <option>Brazil</option>
              <option>Japan</option>
              <option>Global</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-cyan-400" />
              Channel Name
            </label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="e.g. Alex Studio"
              className="w-full rounded-lg border border-slate-800 bg-[#121623] px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Step 4: Asset Upload Dropzones (8 Slots) */}
        <div>
          <label className="text-sm font-extrabold text-slate-100 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold text-xs border border-cyan-500/30">4</span>
              <span>Upload Reference Images (Optional 8-Slot Studio Upload)</span>
            </span>
            <span className="text-xs text-slate-400">Face cutouts, character, product, background</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {([
              { type: 'face', label: 'Face Photo', icon: User },
              { type: 'character', label: 'Character', icon: ImageIcon },
              { type: 'object', label: 'Object / Item', icon: Box },
              { type: 'product', label: 'Product Photo', icon: ShoppingBag },
              { type: 'logo', label: 'Channel Logo', icon: Sparkles },
              { type: 'background', label: 'Background', icon: ImageIcon },
              { type: 'reference', label: 'Ref Image', icon: FileText },
              { type: 'extra', label: 'Multi Drag Drop', icon: Upload }
            ] as const).map(({ type, label, icon: Icon }) => {
              const uploadKey = type;
              const hasFile = Boolean(uploads[uploadKey]);

              return (
                <div key={type} className="relative">
                  <label className={`flex flex-col items-center justify-center h-24 rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                    hasFile 
                      ? 'border-cyan-400 bg-cyan-500/10' 
                      : 'border-slate-800/80 bg-[#0A0D14] hover:border-cyan-500/40 hover:bg-[#121623]'
                  }`}>
                    {hasFile ? (
                      <div className="relative h-full w-full">
                        <img
                          src={uploads[uploadKey]}
                          alt={label}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeUpload(uploadKey);
                          }}
                          className="absolute right-1 top-1 rounded-full bg-slate-900/80 p-1 text-slate-300 hover:text-white"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center p-2 text-center">
                        <Icon className="h-4 w-4 text-slate-400 mb-1" />
                        <span className="text-[11px] font-extrabold text-slate-300">{label}</span>
                        <span className="text-[9px] text-slate-500 mt-0.5">Click or drag</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(uploadKey, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generate Action Button */}
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 px-6 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-cyan-500/20 hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
              <span>AI Analyzing Title & Rendering Ultra HD High-CTR Thumbnails...</span>
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5 fill-slate-950" />
              <span>Generate AI Thumbnail Concepts (4-8 Variations)</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};
