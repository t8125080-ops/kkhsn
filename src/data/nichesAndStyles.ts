import { NicheType, ArtStyleType } from '../types';

export const NICHES: { id: NicheType; label: string; icon: string; description: string }[] = [
  { id: 'Gaming', label: 'Gaming & Esports', icon: 'Gamepad2', description: 'High energy, glowing neon, intense reaction faces' },
  { id: 'Tech & AI', label: 'Tech, AI & Gadgets', icon: 'Cpu', description: 'Sleek, futuristic, high-contrast product callouts' },
  { id: 'Finance & Crypto', label: 'Finance & Crypto', icon: 'TrendingUp', description: 'Green/Gold accents, charts, huge dollar values' },
  { id: 'Vlog & Daily', label: 'Vlogs & Lifestyle', icon: 'Video', description: 'Vibrant, authentic, emotional face reactions' },
  { id: 'Fitness & Health', label: 'Fitness & Health', icon: 'Dumbbell', description: 'Before/After split, high dynamic contrast' },
  { id: 'Education & Science', label: 'Education & Explainer', icon: 'GraduationCap', description: 'Clean diagrams, bold question text, mystery feel' },
  { id: 'Beauty & Fashion', label: 'Beauty & Fashion', icon: 'Sparkles', description: 'Soft pastel glow, polished studio lighting' },
  { id: 'Music & Podcast', label: 'Music & Podcast', icon: 'Mic', description: 'Moody lighting, bold title badges, guest faces' },
  { id: 'Commentary & News', label: 'Commentary & Drama', icon: 'MessageSquareWarning', description: 'Split-screen VS, big red arrows, dramatic overlays' },
  { id: 'Horror & Mystery', label: 'Horror & Mystery', icon: 'Ghost', description: 'Dark shadows, red glow accents, creepy silhouettes' },
  { id: 'Cooking & Food', label: 'Food & Cooking', icon: 'Utensils', description: 'Mouth-watering saturation, extreme close-up' },
  { id: 'Entertainment & Challenges', label: 'Challenges & Viral', icon: 'Trophy', description: 'MrBeast style, massive text, shock expressions' }
];

export const ART_STYLES: { id: ArtStyleType; label: string; description: string; sampleGradient: string }[] = [
  { id: 'MrBeast Explosive', label: 'MrBeast Explosive', description: 'Ultra high saturation, massive bold text, yellow glow outlines', sampleGradient: 'from-amber-500 to-red-600' },
  { id: 'Minimalist Clean', label: 'Minimalist Clean', description: 'Apple-esque aesthetic, deep negative space, sleek typography', sampleGradient: 'from-slate-800 to-slate-950' },
  { id: '3D Cinematic Render', label: '3D Cinematic Render', description: 'Unreal Engine lighting, 3D character pops, depth blur', sampleGradient: 'from-purple-600 to-indigo-900' },
  { id: 'Neon Cyberpunk', label: 'Neon Cyberpunk', description: 'Cyan & Magenta neon glows, dark futuristic backgrounds', sampleGradient: 'from-cyan-500 to-fuchsia-600' },
  { id: 'Real Photo Shock', label: 'Real Photo Shock', description: 'Ultra sharp face cutouts, studio lighting, bold contrast text', sampleGradient: 'from-blue-600 to-orange-500' },
  { id: 'Dark Mystery', label: 'Dark Mystery', description: 'Vignette, glowing key elements, dramatic silhouette effects', sampleGradient: 'from-zinc-900 to-red-950' },
  { id: 'Anime & Comic', label: 'Anime & Comic', description: 'Action lines, halftone dots, vibrant manga pop art style', sampleGradient: 'from-pink-500 to-yellow-400' },
  { id: 'Vector Graphic', label: 'Flat Vector Illustrative', description: 'Crisp shape cutouts, modern flat design aesthetic', sampleGradient: 'from-emerald-500 to-teal-700' },
  { id: 'Retro Synthwave', label: 'Retro Synthwave 80s', description: 'Grid background, chrome text, purple sun horizon', sampleGradient: 'from-purple-900 to-pink-600' },
  { id: 'Luxury Gold & Black', label: 'Luxury Gold & Black', description: 'Gold foil textures, black marble background, premium feel', sampleGradient: 'from-yellow-600 via-amber-700 to-black' }
];

export const COLOR_PALETTES = [
  { name: 'Viral Yellow & Red', primary: '#FFCC00', secondary: '#FF0000', accent: '#00FFFF', background: '#0F172A', text: '#FFFFFF' },
  { name: 'Cyber Neon Cyan', primary: '#00F0FF', secondary: '#FF0077', accent: '#7000FF', background: '#090D16', text: '#FFFFFF' },
  { name: 'Finance Money Green', primary: '#00FF66', secondary: '#FFD700', accent: '#00E5FF', background: '#05190E', text: '#FFFFFF' },
  { name: 'Clean Apple White & Black', primary: '#FFFFFF', secondary: '#3B82F6', accent: '#F59E0B', background: '#09090B', text: '#FFFFFF' },
  { name: 'Mystery Dark Crimson', primary: '#FF2A2A', secondary: '#FFAA00', accent: '#8B0000', background: '#0A0000', text: '#FFFFFF' },
  { name: 'Vibrant Sunset Orange', primary: '#FF6B00', secondary: '#FF0055', accent: '#FFE600', background: '#1A0C00', text: '#FFFFFF' }
];

export const FONTS = [
  { name: 'Impact', family: 'Impact, sans-serif', label: 'Impact (Viral Standard)' },
  { name: 'Montserrat', family: '"Montserrat", sans-serif', label: 'Montserrat Bold' },
  { name: 'Bebas Neue', family: '"Bebas Neue", sans-serif', label: 'Bebas Neue (Tall & Punchy)' },
  { name: 'Anton', family: 'Anton, sans-serif', label: 'Anton (Heavy Display)' },
  { name: 'Poppins', family: 'Poppins, sans-serif', label: 'Poppins ExtraBold' },
  { name: 'Luckiest Guy', family: '"Luckiest Guy", cursive', label: 'Luckiest Guy (Playful/Gaming)' },
  { name: 'Outfit', family: 'Outfit, sans-serif', label: 'Outfit (Modern Tech)' }
];

export const STICKERS = [
  { id: 'stk-1', name: 'VS Badge', emoji: '⚔️', label: 'VS Badge' },
  { id: 'stk-2', name: '100% Verified', emoji: '✅', label: 'Verified Check' },
  { id: 'stk-3', name: 'Warning Sign', emoji: '⚠️', label: 'Warning Sign' },
  { id: 'stk-4', name: 'Flame Fire', emoji: '🔥', label: 'On Fire' },
  { id: 'stk-5', name: 'Dollar Stack', emoji: '💰', label: 'Money Bag' },
  { id: 'stk-6', name: 'Rocket Ship', emoji: '🚀', label: 'Rocket Growth' },
  { id: 'stk-7', name: 'Brain Exploding', emoji: '🤯', label: 'Mind Blown' },
  { id: 'stk-8', name: 'Skull', emoji: '💀', label: 'Death / Dead' },
  { id: 'stk-9', name: 'Lightning Bolt', emoji: '⚡', label: 'Lightning' },
  { id: 'stk-10', name: 'Red Stop Sign', emoji: '🛑', label: 'Stop' },
  { id: 'stk-11', name: 'Eye Ball', emoji: '👁️', label: 'Eye Contact' },
  { id: 'stk-12', name: 'Question Mark', emoji: '❓', label: 'Mystery Question' }
];

export const SAMPLE_SUBJECT_FACES = [
  { id: 'face-1', name: 'Shocked Face', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80', description: 'High emotion open mouth surprise' },
  { id: 'face-2', name: 'Angry Pointing', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80', description: 'Intense gaze pointing at screen' },
  { id: 'face-3', name: 'Confident Founder', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80', description: 'Smiling tech presenter' },
  { id: 'face-4', name: 'Gamer Headset', url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=80', description: 'Reaction face with neon RGB lighting' }
];

export const SAMPLE_BACKGROUNDS = [
  { id: 'bg-1', name: 'Dark Cyber City', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000&auto=format&fit=crop&q=80' },
  { id: 'bg-2', name: 'Red Blue Contrast Studio', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1000&auto=format&fit=crop&q=80' },
  { id: 'bg-3', name: 'Money & Charts', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80' },
  { id: 'bg-4', name: 'Hyperspace Glow', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1000&auto=format&fit=crop&q=80' }
];
