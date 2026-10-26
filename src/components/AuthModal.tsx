import React, { useState } from 'react';
import { User, LogIn, Sparkles, X, Shield, Lock, Mail } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateUser
}) => {
  const [mode, setMode] = useState<'profile' | 'login' | 'signup'>('profile');
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [channelName, setChannelName] = useState(user.channelName || '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6 relative">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {mode === 'profile' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-12 w-12 rounded-full border-2 border-amber-400 object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-bold text-white">{user.name}</h3>
                <p className="text-xs text-slate-400">{user.email}</p>
                <span className="inline-block mt-1 rounded bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
                  {user.plan} Subscription
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">YouTube Channel Name</label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="e.g. CreatorStudio"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  onUpdateUser({ name, channelName });
                  onClose();
                }}
                className="flex-1 rounded-xl bg-amber-400 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300"
              >
                Save Profile
              </button>
              <button
                onClick={() => setMode('login')}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Switch Account
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Welcome to ThumbnailAI Pro</h3>
              <p className="text-xs text-slate-400">Sign in to sync saved projects & cloud credits</p>
            </div>

            <button
              onClick={() => {
                onUpdateUser({ name: 'Google Creator', email: 'creator@gmail.com', role: 'admin' });
                setMode('profile');
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
            >
              <span>Continue with Google</span>
            </button>

            <div className="relative text-center my-3">
              <span className="bg-slate-900 px-2 text-[10px] text-slate-500 uppercase">Or Email</span>
            </div>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
              />

              <button
                onClick={() => {
                  onUpdateUser({ name: email.split('@')[0] || 'Creator', email });
                  setMode('profile');
                }}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 py-2.5 text-xs font-extrabold text-white"
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
