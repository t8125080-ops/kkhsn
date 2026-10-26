import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RightPanel } from './components/RightPanel';
import { BrandKit } from './components/BrandKit';
import { GeneratorForm } from './components/GeneratorForm';
import { AIPromptAnalysis } from './components/AIPromptAnalysis';
import { ThumbnailGrid } from './components/ThumbnailGrid';
import { VisualEditor } from './components/VisualEditor';
import { TemplateLibrary } from './components/TemplateLibrary';
import { TitleGenerator } from './components/TitleGenerator';
import { ABTesting } from './components/ABTesting';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { 
  UserProfile, 
  TeamWorkspace, 
  AIAnalysisResult, 
  ThumbnailVariation, 
  ThumbnailProject, 
  PresetTemplate,
  CanvasLayer
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'editor' | 'history' | 'templates' | 'lab' | 'brand' | 'admin'>('studio');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // User State
  const [user, setUser] = useState<UserProfile>({
    id: 'user-1',
    name: 'Alex Creator',
    email: 'alex@creatorstudio.tv',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    plan: 'Pro Creator',
    creditsRemaining: 48,
    creditsTotal: 50,
    channelName: 'Alex Studio',
    currentWorkspace: 'Personal',
    role: 'admin'
  });

  const [workspaces, setWorkspaces] = useState<TeamWorkspace[]>([
    { id: 'ws-1', name: 'Personal', membersCount: 1, role: 'Owner' },
    { id: 'ws-2', name: 'Pro Team', membersCount: 4, role: 'Editor' },
    { id: 'ws-3', name: 'Agency', membersCount: 12, role: 'Viewer' }
  ]);

  // Current Generation Data
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [variations, setVariations] = useState<ThumbnailVariation[]>([]);
  const [activeVariationForEdit, setActiveVariationForEdit] = useState<ThumbnailVariation | null>(null);

  // Projects Storage
  const [projects, setProjects] = useState<ThumbnailProject[]>(() => {
    try {
      const saved = localStorage.getItem('thumbnail_ai_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'proj-1',
        title: 'MrBeast $1,000,000 Challenge',
        videoTitle: 'I Spent $1,000,000 in 24 Hours!',
        niche: 'Entertainment & Challenges',
        artStyle: 'MrBeast Explosive',
        language: 'English',
        country: 'United States',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
        variations: [],
        layers: [],
        clickabilityScore: 95,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['viral', 'mrbeast', 'challenge'],
        isFavorite: true
      },
      {
        id: 'proj-2',
        title: 'Tech Review Secret',
        videoTitle: 'DON\'T Buy The New iPhone Until You Watch This',
        niche: 'Tech & AI',
        artStyle: 'Neon Cyberpunk',
        language: 'English',
        country: 'United States',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
        variations: [],
        layers: [],
        clickabilityScore: 92,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['tech', 'iphone', 'review'],
        isFavorite: false
      }
    ];
  });

  // Save projects to local storage
  useEffect(() => {
    try {
      localStorage.setItem('thumbnail_ai_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  // Handle Generation Submit
  const handleGenerate = async (formData: {
    title: string;
    description: string;
    channelName: string;
    language: string;
    country: string;
    niche: any;
    style: any;
    uploads: any;
  }) => {
    setIsLoading(true);

    try {
      // 1. Title Strategy & Prompt Analysis via Express Server API
      const analysisRes = await fetch('/api/ai/analyze-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const analysisData = await analysisRes.json();
      setAnalysis(analysisData);

      // 2. Generate Thumbnail Variations via Express Server API
      const genRes = await fetch('/api/ai/generate-thumbnails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          niche: formData.niche,
          style: formData.style,
          prompts: analysisData.generatedPrompts,
          uploadedImages: formData.uploads
        })
      });
      const genData = await genRes.json();
      if (genData.variations) {
        setVariations(genData.variations);
      }

      // Deduct 1 credit
      setUser((prev) => ({ ...prev, creditsRemaining: Math.max(0, prev.creditsRemaining - 1) }));
    } catch (err) {
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Open variation in Graphic Canvas Editor
  const handleSelectForEdit = (variation: ThumbnailVariation) => {
    setActiveVariationForEdit(variation);
    setActiveTab('editor');
  };

  // Open Template in Canvas Editor
  const handleSelectTemplate = (template: PresetTemplate) => {
    const mockVariation: ThumbnailVariation = {
      id: template.id,
      title: template.name,
      prompt: template.description,
      imageUrl: template.thumbnailUrl,
      clickabilityScore: template.ctrEstimate,
      qualityScore: 98,
      emotion: 'Shocked',
      style: template.artStyle,
      layers: template.layers,
      createdAt: new Date().toISOString()
    };
    setActiveVariationForEdit(mockVariation);
    setActiveTab('editor');
  };

  // Save canvas project
  const handleSaveCanvasProject = (layers: CanvasLayer[], title: string) => {
    const newProject: ThumbnailProject = {
      id: `proj-${Date.now()}`,
      title,
      videoTitle: title,
      niche: 'Entertainment & Challenges',
      artStyle: 'MrBeast Explosive',
      language: 'English',
      country: 'United States',
      thumbnailUrl: activeVariationForEdit?.imageUrl || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
      variations: [],
      layers,
      clickabilityScore: 94,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['canvas', 'custom']
    };

    setProjects((prev) => [newProject, ...prev]);
    alert('Project saved successfully to your My Thumbnails dashboard!');
  };

  const handleToggleFavorite = (id: string) => {
    setVariations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v))
    );
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      
      {/* SaaS Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        workspaces={workspaces}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main SaaS Workspace Layout with Sidebar & Right Inspector */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Vertical Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onOpenBrandKit={() => setIsBrandKitOpen(true)}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Central Dynamic Content Viewport */}
        <main className={`flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 custom-scrollbar transition-all duration-300 ${
          isSidebarCollapsed ? 'pl-20' : 'pl-20 lg:pl-72'
        } ${activeTab === 'studio' ? (isRightPanelOpen ? 'pr-4 lg:pr-88' : 'pr-4 lg:pr-16') : 'pr-4'}`}>
          
          {/* TAB 1: AI STUDIO & GENERATOR */}
          {activeTab === 'studio' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
              {analysis && <AIPromptAnalysis analysis={analysis} />}
              {variations.length > 0 && (
                <ThumbnailGrid
                  variations={variations}
                  onSelectForEdit={handleSelectForEdit}
                  onRegenerate={(id) => alert(`Regenerating variation #${id}...`)}
                  onToggleFavorite={handleToggleFavorite}
                  onDownload={(v, fmt) => alert(`Downloading ${fmt ? fmt.toUpperCase() : 'HD'} variation: ${v.title}`)}
                />
              )}
            </div>
          )}

          {/* TAB 2: GRAPHIC CANVAS EDITOR */}
          {activeTab === 'editor' && (
            <div className="w-full">
              <VisualEditor
                initialVariation={activeVariationForEdit}
                onSaveProject={handleSaveCanvasProject}
              />
            </div>
          )}

          {/* TAB 3: TEMPLATE LIBRARY */}
          {activeTab === 'templates' && (
            <div className="max-w-6xl mx-auto">
              <TemplateLibrary onSelectTemplate={handleSelectTemplate} />
            </div>
          )}

          {/* TAB 4: MY THUMBNAILS & DASHBOARD */}
          {activeTab === 'history' && (
            <div className="max-w-6xl mx-auto">
              <Dashboard
                projects={projects}
                user={user}
                onOpenProject={(proj) => {
                  const mockVar: ThumbnailVariation = {
                    id: proj.id,
                    title: proj.title,
                    prompt: proj.videoTitle,
                    imageUrl: proj.thumbnailUrl,
                    clickabilityScore: proj.clickabilityScore,
                    qualityScore: 96,
                    emotion: 'Shocked',
                    style: proj.artStyle,
                    layers: proj.layers,
                    createdAt: proj.createdAt
                  };
                  setActiveVariationForEdit(mockVar);
                  setActiveTab('editor');
                }}
                onDeleteProject={handleDeleteProject}
              />
            </div>
          )}

          {/* TAB 5: TITLE & A/B LAB */}
          {activeTab === 'lab' && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TitleGenerator />
              <ABTesting />
            </div>
          )}

          {/* TAB 6: BRAND KIT */}
          {activeTab === 'brand' && (
            <div className="max-w-4xl mx-auto">
              <BrandKit
                user={user}
                isOpen={true}
                onClose={() => setActiveTab('studio')}
              />
            </div>
          )}

          {/* TAB 7: ADMIN PANEL */}
          {activeTab === 'admin' && (
            <div className="max-w-6xl mx-auto">
              <AdminPanel />
            </div>
          )}

        </main>

        {/* Right Collapsible AI CTR Inspector Panel */}
        {activeTab === 'studio' && (
          <RightPanel
            analysis={analysis}
            variations={variations}
            onSelectForEdit={handleSelectForEdit}
            isOpen={isRightPanelOpen}
            setIsOpen={setIsRightPanelOpen}
            onQuickGenerate={() => {
              const el = document.getElementById('studio-generator-input');
              if (el) el.focus();
            }}
          />
        )}

      </div>

      {/* Brand Kit Modal Overlay (if triggered from header/sidebar directly) */}
      {isBrandKitOpen && (
        <BrandKit
          user={user}
          isOpen={isBrandKitOpen}
          onClose={() => setIsBrandKitOpen(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        user={user}
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
      />

    </div>
  );
}

