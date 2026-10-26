import React, { useState } from 'react';
import { Palette, Upload, Plus, Trash2, Check, Sparkles, User, FileText, X } from 'lucide-react';
import { UserProfile } from '../types';

interface BrandKitProps {
  user?: UserProfile;
  isOpen?: boolean;
  onClose?: () => void;
}

export const BrandKit: React.FC<BrandKitProps> = ({ user, isOpen, onClose }) => {
  const [brandName, setBrandName] = useState('Alex Creator Studio');
  const [colors, setColors] = useState(['#FFCC00', '#FF0055', '#00F0FF', '#0F172A', '#FFFFFF']);
  const [newColor, setNewColor] = useState('#38BDF8');

  const [logos, setLogos] = useState([
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&auto=format&fit=crop&q=80'
  ]);

  const [faces, setFaces] = useState([
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  ]);

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (hex: string) => {
    setColors(colors.filter((c) => c !== hex));
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#101420]/90 p-6 shadow-2xl backdrop-blur-xl space-y-6 relative">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Palette className="h-5 w-5 text-cyan-400" />
            YouTube Channel Brand Kit
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Store channel logos, custom fonts, brand color palette, and default face cutouts for 1-click thumbnail application
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Brand Kit saved successfully!')}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2 text-xs font-extrabold text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            Save Brand Kit
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Brand Colors */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Channel Color Palette
          </label>

          <div className="flex flex-wrap items-center gap-3">
            {colors.map((c, i) => (
              <div key={i} className="group relative flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 p-1.5">
                <span className="h-6 w-6 rounded-lg border border-white/20 shadow" style={{ backgroundColor: c }} />
                <span className="font-mono text-xs text-slate-200 uppercase">{c}</span>
                <button
                  onClick={() => removeColor(c)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="h-8 w-10 rounded border border-slate-700 bg-transparent cursor-pointer"
            />
            <button
              onClick={addColor}
              className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Color</span>
            </button>
          </div>
        </div>

        {/* Channel Logo Assets */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Channel Logo Cutouts
          </label>

          <div className="flex flex-wrap gap-3">
            {logos.map((url, i) => (
              <div key={i} className="relative h-16 w-16 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
                <img src={url} alt="Logo" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}

            <button
              onClick={() => alert('Select logo image to add to Brand Kit')}
              className="flex flex-col items-center justify-center h-16 w-16 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50"
            >
              <Upload className="h-4 w-4" />
              <span className="text-[9px] font-bold mt-1">Upload</span>
            </button>
          </div>
        </div>

        {/* Default Face Cutouts */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Default Subject Face Cutouts
          </label>

          <div className="flex flex-wrap gap-3">
            {faces.map((url, i) => (
              <div key={i} className="relative h-16 w-16 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
                <img src={url} alt="Face" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}

            <button
              onClick={() => alert('Select face photo for 1-click cutout application')}
              className="flex flex-col items-center justify-center h-16 w-16 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50"
            >
              <User className="h-4 w-4" />
              <span className="text-[9px] font-bold mt-1">Add Face</span>
            </button>
          </div>
        </div>

        {/* Custom Font Selection */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Primary Channel Headline Font
          </label>

          <select className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white">
            <option>Impact (Viral Bold)</option>
            <option>Bebas Neue (Heavy Condensed)</option>
            <option>Montserrat Black (Modern Clean)</option>
            <option>Anton (Ultra Punch)</option>
          </select>
        </div>

      </div>

    </div>
  );
};
