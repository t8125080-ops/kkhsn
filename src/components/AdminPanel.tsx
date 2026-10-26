import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  Activity, 
  FileCode, 
  TrendingUp, 
  BarChart3, 
  AlertTriangle 
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-rose-500" />
          SaaS Admin Control & Revenue Operations
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          System monitoring, user subscriptions, AI prompt engineering, and analytics
        </p>
      </div>

      {/* Admin KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-1">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>TOTAL USERS</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">12,480</div>
          <div className="text-[10px] text-emerald-400 font-semibold">+18.4% this month</div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-1">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>MONTHLY REVENUE</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">$48,920</div>
          <div className="text-[10px] text-emerald-400 font-semibold">+24.1% MRR growth</div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-1">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>AI GENERATIONS</span>
            <BarChart3 className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">184,300</div>
          <div className="text-[10px] text-slate-400">Avg 1.2s response latency</div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-1">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>SYSTEM HEALTH</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">99.98%</div>
          <div className="text-[10px] text-slate-400">All API nodes operational</div>
        </div>

      </div>

      {/* User Management & Moderation Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-white">Active SaaS Accounts & Subscriptions</h3>
          <span className="text-xs text-slate-400">Showing recent 5 accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5">User</th>
                <th className="py-2.5">Plan</th>
                <th className="py-2.5">Credits Used</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {[
                { name: 'Alex Creator', email: 'alex@youtube.com', plan: 'Pro Creator', credits: '48 / 50', status: 'Active', date: '2026-08-01' },
                { name: 'GamerStudio HD', email: 'contact@gamerstudio.tv', plan: 'Agency', credits: '420 / 500', status: 'Active', date: '2026-07-28' },
                { name: 'Tech Reviewer', email: 'tech@reviews.com', plan: 'Pro Creator', credits: '35 / 50', status: 'Active', date: '2026-07-25' },
                { name: 'Vlog Daily', email: 'daily@vlog.com', plan: 'Free', credits: '5 / 5', status: 'Active', date: '2026-08-04' }
              ].map((u, i) => (
                <tr key={i} className="hover:bg-slate-950/40">
                  <td className="py-3 font-semibold text-white">
                    <div>{u.name}</div>
                    <div className="text-[10px] font-normal text-slate-500">{u.email}</div>
                  </td>
                  <td className="py-3">
                    <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] text-indigo-300 font-bold border border-indigo-500/30">
                      {u.plan}
                    </span>
                  </td>
                  <td className="py-3 font-mono">{u.credits}</td>
                  <td className="py-3">
                    <span className="text-emerald-400 font-bold">• {u.status}</span>
                  </td>
                  <td className="py-3 text-slate-400">{u.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
