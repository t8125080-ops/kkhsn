export type NicheType = 
  | 'Gaming'
  | 'Tech & AI'
  | 'Vlog & Daily'
  | 'Finance & Crypto'
  | 'Fitness & Health'
  | 'Education & Science'
  | 'Beauty & Fashion'
  | 'Music & Podcast'
  | 'Commentary & News'
  | 'Horror & Mystery'
  | 'Cooking & Food'
  | 'Entertainment & Challenges';

export type ArtStyleType =
  | 'MrBeast Explosive'
  | 'Minimalist Clean'
  | '3D Cinematic Render'
  | 'Neon Cyberpunk'
  | 'Real Photo Shock'
  | 'Dark Mystery'
  | 'Anime & Comic'
  | 'Vector Graphic'
  | 'Retro Synthwave'
  | 'Luxury Gold & Black';

export type LayerType = 'text' | 'image' | 'sticker' | 'arrow' | 'shape' | 'background';

export interface CanvasLayer {
  id: string;
  name: string;
  type: LayerType;
  x: number; // Percentage or absolute px (0-100% or px relative to 1280x720)
  y: number;
  width: number;
  height: number;
  rotation: number; // degrees
  opacity: number; // 0-1
  visible: boolean;
  locked: boolean;
  
  // Specific properties
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  glowColor?: string;
  glowBlur?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase';
  fontWeight?: string;
  fontStyle?: string;
  letterSpacing?: number;

  // Image/Asset properties
  src?: string;
  hasOutline?: boolean;
  outlineColor?: string;
  outlineWidth?: number;
  hasGlow?: boolean;
  glowIntensity?: number;
  flipX?: boolean;
  flipY?: boolean;
  borderRadius?: number;

  // Arrow / Shape properties
  shapeType?: 'arrow-curved' | 'arrow-straight' | 'circle' | 'rectangle' | 'badge-pill' | 'starburst';
  fillColor?: string;
}

export interface AIAnalysisResult {
  detectedNiche: string;
  mainSubject: string;
  detectedEmotion: 'Shocked' | 'Excited' | 'Curious' | 'Angry' | 'Happy' | 'Fearful' | 'Mystery' | 'Triumphant';
  targetAudience: string;
  recommendedStyle: ArtStyleType;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    name: string;
  };
  recommendedComposition: string;
  clickabilityScore: number; // 0 - 100
  qualityScore: number; // 0 - 100
  ctrBreakdown: {
    emotionImpact: number; // 0-100
    textReadability: number;
    colorContrast: number;
    subjectClarity: number;
    curiosityGap: number;
  };
  optimizationTips: string[];
  viralKeywords: string[];
  generatedPrompts: {
    id: string;
    title: string;
    promptText: string;
    styleTag: string;
    previewUrl?: string;
  }[];
}

export interface ThumbnailVariation {
  id: string;
  title: string;
  prompt: string;
  imageUrl: string;
  clickabilityScore: number;
  qualityScore: number;
  readabilityScore?: number;
  emotionScore?: number;
  aiRating?: string;
  emotion: string;
  style: ArtStyleType;
  layers: CanvasLayer[];
  createdAt: string;
  isFavorite?: boolean;
}

export interface ThumbnailProject {
  id: string;
  title: string;
  videoTitle: string;
  description?: string;
  niche: NicheType;
  artStyle: ArtStyleType;
  language: string;
  country: string;
  channelName?: string;
  thumbnailUrl: string;
  variations: ThumbnailVariation[];
  layers: CanvasLayer[];
  clickabilityScore: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isFavorite?: boolean;
}

export interface PresetTemplate {
  id: string;
  name: string;
  category: NicheType;
  artStyle: ArtStyleType;
  thumbnailUrl: string;
  description: string;
  ctrEstimate: number;
  badge?: string;
  layers: CanvasLayer[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  plan: 'Free' | 'Pro Creator' | 'Agency';
  creditsRemaining: number;
  creditsTotal: number;
  channelName?: string;
  currentWorkspace: string;
  role: 'user' | 'admin';
}

export interface TeamWorkspace {
  id: string;
  name: string;
  membersCount: number;
  role: 'Owner' | 'Editor' | 'Viewer';
  isCurrent?: boolean;
}

export interface TitleSuggestion {
  title: string;
  ctrScore: number;
  explanation: string;
  nicheFit: string;
}

export interface ABTestComparison {
  versionA: {
    id: string;
    name: string;
    imageUrl: string;
    score: number;
  };
  versionB: {
    id: string;
    name: string;
    imageUrl: string;
    score: number;
  };
  winner: 'A' | 'B' | 'TIED';
  winMargin: number; // percentage
  keyDifferences: string[];
  aiRecommendation: string;
}
