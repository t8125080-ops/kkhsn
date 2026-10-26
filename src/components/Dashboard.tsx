import React from 'react';
import { 
  FolderKanban, 
  Star, 
  Clock, 
  Zap, 
  TrendingUp, 
  Paintbrush, 
  Download, 
  Trash2,
  Sparkles,
  Layers
} from 'lucide-react';
import { ThumbnailProject, UserProfile } from '../types';

interface DashboardProps {
  projects: ThumbnailProject[];
  user: UserProfile;
  onOpenProject: (project: ThumbnailProject) => void;
  onDeleteProject: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  user,
  onOpenProject,
  onDeleteProject
}) => {
  const favoriteProjects = projects.filter((p) => p.isFavorite);

  return (
    <div className="space-y-8">
      
      {/* SaaS Stats & Credit Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl border border-slate-800/80 bg-[#101420]/90 shadow-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>REMAINING CREDITS</span>
            <Zap className="h-4 w-4 text-cyan-400 fill-cyan-400 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-white">
            {user.creditsRemaining} <span className="text-xs font-semibold text-slate-500">/ {user.creditsTotal}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-400 shadow-[0_0_10px_#00F0FF]"
              style={{ width: `${(user.creditsRemaining / user.creditsTotal) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-[#101420]/90 shadow-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>SAVED PROJECTS</span>
            <FolderKanban className="h-4 w-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-white">{projects.length}</div>
          <p className="text-xs font-medium text-slate-400">Active thumbnail drafts</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-[#101420]/90 shadow-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>CURRENT PLAN</span>
            <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] text-cyan-300 font-extrabold border border-cyan-500/30">
              {user.plan}
            </span>
          </div>
          <div className="text-xl font-extrabold text-white">{user.plan} Subscription</div>
          <p className="text-xs text-cyan-400 font-medium flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Unlimited Ultra HD Exports
          </p>
        </div>

      </div>

      {/* Favorites Section */}
      {favoriteProjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-cyan-400 fill-cyan-400" />
            Favorite Thumbnails ({favoriteProjects.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProjects.map((p) => (
              <div
                key={p.id}
                className="group relative rounded-2xl border border-slate-800/80 bg-[#101420] overflow-hidden shadow-2xl hover:border-cyan-500/50 transition-all"
              >
                <div className="aspect-video w-full bg-[#0A0D14]">
                  <img src={p.thumbnailUrl} alt={p.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-white truncate">{p.videoTitle}</span>
                  <button
                    onClick={() => onOpenProject(p)}
                    className="rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-3 py-1 text-xs font-extrabold text-slate-950 hover:brightness-110 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Generations History */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-cyan-400" />
          Recent Thumbnail Generations ({projects.length})
        </h3>

        {projects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-[#101420]/50 space-y-3">
            <FolderKanban className="h-10 w-10 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-300">No Thumbnails Generated Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Enter your video title above to generate 4 AI thumbnails with real-time CTR prediction.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col rounded-2xl border border-slate-800/80 bg-[#101420] overflow-hidden shadow-2xl hover:border-cyan-500/50 transition-all"
              >
                <div className="relative aspect-video w-full bg-[#0A0D14]">
                  <img
                    src={p.thumbnailUrl}
                    alt={p.videoTitle}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-3 right-3 rounded-full bg-[#0A0D14]/90 px-2.5 py-1 text-xs font-black text-cyan-300 border border-cyan-500/40 backdrop-blur-md shadow-md">
                    CTR {p.clickabilityScore}%
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{p.videoTitle}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{p.niche} • {p.artStyle}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                    <span className="text-[10px] text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onDeleteProject(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => onOpenProject(p)}
                        className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-3 py-1 text-xs font-extrabold text-slate-950 hover:brightness-110 cursor-pointer"
                      >
                        <Paintbrush className="h-3.5 w-3.5" />
                        <span>Open</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

