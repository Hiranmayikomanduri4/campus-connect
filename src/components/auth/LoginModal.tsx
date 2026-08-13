import React, { useState } from 'react';
import { Mail, Lock, LogIn, Sparkles, X, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const { login, loginAsDemo, demoAccounts, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = (demoEmail: string) => {
    loginAsDemo(demoEmail);
    onClose();
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email above first');
      return;
    }
    try {
      await resetPassword(email);
      setResetSent(true);
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CampusConnect Authentication</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to access your portal</p>
          </div>

          {/* Quick Demo Login Bar for Judges / Testers */}
          <div className="p-3 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 dark:from-slate-700/50 dark:to-slate-700/30 rounded-2xl border border-indigo-100 dark:border-slate-600 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-3 h-3 text-indigo-600" />
                Hackathon Demo 1-Click Logins
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {demoAccounts.map(demo => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => handleDemoClick(demo.email)}
                  className="p-2 bg-white dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-left border border-slate-200 dark:border-slate-700 text-[11px] font-semibold transition group flex items-center justify-between"
                >
                  <div className="truncate">
                    <p className="font-bold truncate group-hover:text-white">{demo.name.split(' ')[0]}</p>
                    <p className="text-[9px] opacity-75 capitalize group-hover:text-indigo-100">{demo.role}</p>
                  </div>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-600 dark:text-rose-400">
              {error}
            </div>
          )}

          {resetSent && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-600 dark:text-emerald-400">
              Password reset link sent to your email address!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@campusconnect.edu"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <button
              onClick={() => {
                onClose();
                onSwitchToSignUp();
              }}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
