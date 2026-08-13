import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Sparkles, 
  ChevronDown, 
  Menu, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { NotificationCenter } from '../common/NotificationCenter';
import { UserRole } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onNavigate: (module: string) => void;
  toggleSidebar: () => void;
  activeModule: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenLogin,
  onOpenSignUp,
  onNavigate,
  toggleSidebar,
  activeModule
}) => {
  const { currentUser, logout, switchRole, demoAccounts, loginAsDemo } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, resetToDemoData } = useData();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDemoMenuOpen, setIsDemoMenuOpen] = useState(false);

  const userNotifs = currentUser
    ? notifications.filter(n => n.userId === currentUser.uid || n.userId === 'all')
    : [];
  const unreadCount = userNotifs.filter(n => !n.read).length;

  const roleColors: Record<UserRole, string> = {
    student: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    faculty: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    coordinator: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    admin: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section: Mobile Menu + Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl md:hidden transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Campus<span className="text-indigo-600 dark:text-indigo-400">Connect</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-md">
                  SaaS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Smart Campus Management Platform
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center space-x-2 px-3.5 py-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-500 dark:text-slate-400 rounded-xl text-xs transition border border-slate-200/60 dark:border-slate-700/60 w-64 lg:w-80"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="flex-1 text-left">Search everything...</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Right Section: Role Switcher + Notifs + Theme + Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Demo Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDemoMenuOpen(!isDemoMenuOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/60 dark:border-indigo-800/50 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:shadow-md transition"
              title="Switch demo persona instantly"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="capitalize hidden sm:inline">{currentUser ? currentUser.role : 'Demo Roles'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isDemoMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <span>Hackathon Role Switcher</span>
                  <button onClick={() => { resetToDemoData(); alert('Demo data reset successfully!'); }} title="Reset data">
                    <RefreshCw className="w-3 h-3 hover:text-indigo-600" />
                  </button>
                </div>
                <div className="space-y-1 mt-1">
                  {demoAccounts.map(demo => (
                    <button
                      key={demo.email}
                      onClick={() => {
                        loginAsDemo(demo.email);
                        setIsDemoMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl flex items-center space-x-2.5 transition text-xs ${
                        currentUser?.email === demo.email
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <img src={demo.avatar} alt={demo.name} className="w-7 h-7 rounded-full object-cover" />
                      <div className="flex-1 truncate">
                        <p className="font-semibold text-xs leading-tight">{demo.name}</p>
                        <p className="text-[10px] opacity-80 capitalize">{demo.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Trigger Mobile */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl md:hidden transition"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Notifications Bell */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              <NotificationCenter
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
                onNavigate={onNavigate}
              />
            </div>
          )}

          {/* User Profile / Auth Buttons */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-600/30"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden lg:inline-block max-w-[100px] truncate">
                  {currentUser.name}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 animate-fadeIn">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-700 space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${roleColors[currentUser.role]}`}>
                      {currentUser.role}
                    </span>
                  </div>

                  <div className="py-1 space-y-1">
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl flex items-center space-x-2 transition"
                    >
                      <User className="w-4 h-4 text-indigo-500" />
                      <span>Edit My Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl flex items-center space-x-2 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                Login
              </button>
              <button
                onClick={onOpenSignUp}
                className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20 transition"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
