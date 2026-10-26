import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Wand2, 
  Paintbrush, 
  Scissors, 
  Maximize2, 
  Briefcase, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  FolderKanban,
  Target,
  Layers,
  Palette
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (isCollapsed: boolean) => void;
  recentProjectsCount?: number;
  user?: UserProfile;
  onOpenBrandKit?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  isCollapsed,
  setIsCollapsed,
  recentProjectsCount = 0,
  onOpenBrandKit
}) => {
  const isNavCollapsed = collapsed !== undefined ? collapsed : (isCollapsed !== undefined ? isCollapsed : false);
  const handleToggle = () => {
    if (setCollapsed) {
      setCollapsed(!isNavCollapsed);
    } else if (setIsCollapsed) {
      setIsCollapsed(!isNavCollapsed);
    }
  };
  const mainNav = [
    { id: 'studio', label: 'AI Generator', icon: Sparkles, badge: 'AI 3.6' },
    { id: 'editor', label: 'Graphic Editor', icon: Paintbrush, badge: 'Live' },
    { id: 'templates', label: 'Viral Templates', icon: Layers, badge: 'PRO' },
    { id: 'bg-remover', label: 'Background Remover', icon: Scissors },
    { id: 'upscaler', label: 'AI 4K Upscaler', icon: Maximize2 },
    { id: 'brand-kit', label: 'Brand Kit', icon: Palette },
    { id: 'lab', label: 'Title & A/B Lab', icon: Target },
    { id: 'history', label: 'My Thumbnails', icon: FolderKanban, count: recentProjectsCount },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 z-30 flex flex-col border-r border-slate-800/80 bg-[#0A0D14]/95 backdrop-blur-xl transition-all duration-300 ${
        isNavCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={handleToggle}
        className="absolute -right-3 top-6 z-40 flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-[#121623] text-slate-300 shadow-md hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer"
        title={isNavCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {isNavCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Navigation Group */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-6 custom-scrollbar">
        
        {/* Primary Tools */}
        <div className="space-y-1">
          {!isNavCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Studio Suite
            </div>
          )}

          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'brand-kit' && onOpenBrandKit) {
                    onOpenBrandKit();
                  } else if (item.id === 'bg-remover' || item.id === 'upscaler') {
                    setActiveTab('editor');
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-bold'
                    : 'text-slate-400 hover:bg-[#121623] hover:text-slate-200 border border-transparent'
                }`}
                title={isNavCollapsed ? item.label : undefined}
              >
                <Icon className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                
                {!isNavCollapsed && (
                  <div className="flex flex-1 items-center justify-between overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    
                    {item.badge && (
                      <span className="ml-1.5 rounded-md bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-extrabold text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}

                    {item.count !== undefined && item.count > 0 && (
                      <span className="ml-1.5 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Pro Banner */}
        {!isNavCollapsed && (
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#121827] to-[#0A0D14] p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white">
              <Zap className="h-4 w-4 text-cyan-400 fill-cyan-400 animate-pulse" />
              <span>Ultra HD 4K Engine</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Boost YouTube clickthrough rate by up to +350% with AI color psychology & face lighting.
            </p>
          </div>
        )}

      </div>

      {/* Footer System Status */}
      {!isNavCollapsed && (
        <div className="border-t border-slate-800/80 p-3 bg-[#080A10]">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Server Latency</span>
            </div>
            <span className="font-mono text-cyan-400 font-bold">12ms</span>
          </div>
        </div>
      )}
    </aside>
  );
};
