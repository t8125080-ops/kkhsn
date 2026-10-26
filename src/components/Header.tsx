import React from 'react';
import { 
  Sparkles, 
  Paintbrush, 
  FolderKanban, 
  LayoutTemplate, 
  Target, 
  ShieldCheck, 
  Zap, 
  User, 
  Sun, 
  Moon, 
  ChevronDown,
  Palette
} from 'lucide-react';
import { UserProfile, TeamWorkspace } from '../types';

interface HeaderProps {
  activeTab: 'studio' | 'editor' | 'history' | 'templates' | 'lab' | 'admin';
  setActiveTab: (tab: 'studio' | 'editor' | 'history' | 'templates' | 'lab' | 'admin') => void;
  user: UserProfile;
  workspaces: TeamWorkspace[];
  onOpenAuth: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenBrandKit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  workspaces,
  onOpenAuth,
  isDarkMode,
  setIsDarkMode,
  onOpenBrandKit
}) => {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = React.useState(false);

  const navItems = [
    { id: 'studio', label: 'AI Studio', icon: Sparkles },
    { id: 'editor', label: 'Canvas Editor', icon: Paintbrush },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'history', label: 'My Thumbnails', icon: FolderKanban },
    { id: 'lab', label: 'Title & A/B Lab', icon: Target },
    ...(user.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: ShieldCheck }] : [])
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#080B12]/95 backdrop-blur-xl text-slate-100">
      <div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
            <Zap className="h-5 w-5 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white font-sans">
                Thumbnail<span className="text-cyan-400">AI</span>
              </span>
              <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-extrabold text-cyan-300 border border-cyan-500/30">
                ULTIMATE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">High-CTR YouTube AI SaaS</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#101422] p-1 rounded-xl border border-slate-800/80 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          
          {/* Brand Kit Shortcut Button */}
          {onOpenBrandKit && (
            <button
              onClick={onOpenBrandKit}
              className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#121623] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
            >
              <Palette className="h-3.5 w-3.5 text-cyan-400" />
              <span>Brand Kit</span>
            </button>
          )}

          {/* Credits Counter */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 text-xs font-bold text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <Zap className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400 animate-pulse" />
            <span>{user.creditsRemaining} / {user.creditsTotal} Credits</span>
          </div>

          {/* Workspace Switcher */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#121623] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>{user.currentWorkspace}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {showWorkspaceMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-800 bg-[#121623] p-2 shadow-2xl z-50">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Workspaces
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      user.currentWorkspace = ws.name;
                      setShowWorkspaceMenu(false);
                    }}
                    className={`flex w-full items-center justify-between px-2 py-1.5 rounded-lg text-xs text-left cursor-pointer ${
                      ws.name === user.currentWorkspace ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{ws.name}</span>
                    <span className="text-[10px] text-slate-500">{ws.role}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Profile */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#121623] px-3 py-1.5 text-xs font-bold text-white hover:border-cyan-500/40 transition-colors shadow-sm cursor-pointer"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-5 w-5 rounded-full object-cover border border-cyan-400"
              referrerPolicy="no-referrer"
            />
            <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
          </button>
        </div>

      </div>
    </header>
  );
};

