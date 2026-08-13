import React from 'react';
import { 
  LayoutDashboard, 
  CheckCheck, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  Users, 
  Megaphone, 
  User, 
  FileText, 
  Settings, 
  Building2, 
  Award, 
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  activeModule: string;
  onNavigate: (module: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onNavigate,
  isOpen,
  onCloseMobile
}) => {
  const { currentUser } = useAuth();
  const role: UserRole = currentUser ? currentUser.role : 'student';

  const navItemsByRole: Record<UserRole, NavItem[]> = {
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'attendance', label: 'My Attendance', icon: <CheckCheck className="w-4 h-4" /> },
      { id: 'assignments', label: 'Assignments', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'events', label: 'Campus Events', icon: <Calendar className="w-4 h-4" /> },
      { id: 'placements', label: 'Placement Cell', icon: <Briefcase className="w-4 h-4" /> },
      { id: 'clubs', label: 'Clubs & Societies', icon: <Users className="w-4 h-4" /> },
      { id: 'announcements', label: 'Announcements', icon: <Megaphone className="w-4 h-4" /> },
      { id: 'profile', label: 'Student Profile', icon: <User className="w-4 h-4" /> }
    ],
    faculty: [
      { id: 'dashboard', label: 'Faculty Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'attendance', label: 'Take & Edit Attendance', icon: <CheckCheck className="w-4 h-4" /> },
      { id: 'assignments', label: 'Assignments & Grades', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'announcements', label: 'Post Announcements', icon: <Megaphone className="w-4 h-4" /> },
      { id: 'profile', label: 'Faculty Profile', icon: <User className="w-4 h-4" /> }
    ],
    coordinator: [
      { id: 'dashboard', label: 'Coordinator Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'events', label: 'Manage Events', icon: <Calendar className="w-4 h-4" /> },
      { id: 'clubs', label: 'Manage Clubs & Members', icon: <Users className="w-4 h-4" /> },
      { id: 'announcements', label: 'Campus Announcements', icon: <Megaphone className="w-4 h-4" /> },
      { id: 'profile', label: 'Profile Settings', icon: <User className="w-4 h-4" /> }
    ],
    admin: [
      { id: 'dashboard', label: 'Analytics Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'admin-users', label: 'Users & Roles', icon: <Users className="w-4 h-4" /> },
      { id: 'admin-depts', label: 'Depts & Courses', icon: <Building2 className="w-4 h-4" /> },
      { id: 'attendance', label: 'Attendance System', icon: <CheckCheck className="w-4 h-4" /> },
      { id: 'assignments', label: 'Assignments System', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'events', label: 'Events Management', icon: <Calendar className="w-4 h-4" /> },
      { id: 'placements', label: 'Placements Portal', icon: <Briefcase className="w-4 h-4" /> },
      { id: 'announcements', label: 'All Notices', icon: <Megaphone className="w-4 h-4" /> },
      { id: 'admin-logs', label: 'Reports & Logs', icon: <FileText className="w-4 h-4" /> },
      { id: 'admin-settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> }
    ]
  };

  const navItems = navItemsByRole[role] || navItemsByRole.student;

  const handleNavClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden animate-fadeIn"
        />
      )}

      <aside
        className={`fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out flex flex-col justify-between p-4 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between md:hidden pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation Menu</span>
            <button onClick={onCloseMobile} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current User Card Badge */}
          {currentUser && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center space-x-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {currentUser.role}
                </p>
              </div>
            </div>
          )}

          {/* Nav Items */}
          <nav className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 mb-2">
              Main Menu
            </p>
            {navItems.map(item => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500 transition'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Hackathon Banner */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-indigo-500/20 text-center space-y-1">
            <div className="inline-flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>CampusConnect v2.5</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Centralized University Cloud Portal
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
