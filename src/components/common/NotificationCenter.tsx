import React from 'react';
import { Bell, CheckCheck, BookOpen, Calendar, Briefcase, Megaphone, AlertCircle, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose, onNavigate }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const { currentUser } = useAuth();

  if (!isOpen || !currentUser) return null;

  const userNotifs = notifications.filter(n => n.userId === currentUser.uid || n.userId === 'all');
  const unreadCount = userNotifs.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'attendance':
        return <CheckCheck className="w-4 h-4 text-emerald-500" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'placement':
        return <Briefcase className="w-4 h-4 text-amber-500" />;
      case 'announcement':
        return <Megaphone className="w-4 h-4 text-indigo-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleNotifClick = (notif: any) => {
    markNotificationRead(notif.id);
    if (notif.type === 'assignment') onNavigate('assignments');
    else if (notif.type === 'attendance') onNavigate('attendance');
    else if (notif.type === 'event') onNavigate('events');
    else if (notif.type === 'placement') onNavigate('placements');
    else if (notif.type === 'announcement') onNavigate('announcements');
    onClose();
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={() => markAllNotificationsRead(currentUser.uid)}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
        {userNotifs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No notifications at the moment. You're all caught up!
          </div>
        ) : (
          userNotifs.map(n => (
            <div
              key={n.id}
              onClick={() => handleNotifClick(n)}
              className={`p-3.5 flex items-start space-x-3 cursor-pointer transition hover:bg-slate-50 dark:hover:bg-slate-700/40 ${!n.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''}`}
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl flex-shrink-0 mt-0.5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-xs ${!n.read ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                    {n.title}
                  </p>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{n.createdAt.split(' ')[1] || 'Today'}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                  {n.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
