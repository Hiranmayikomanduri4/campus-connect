import React from 'react';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  Megaphone, 
  PlusCircle, 
  UserCheck, 
  ArrowUpRight, 
  Sparkles,
  Ticket
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface CoordinatorDashboardProps {
  onNavigate: (module: string) => void;
}

export const CoordinatorDashboard: React.FC<CoordinatorDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { events, eventRegistrations, clubs, clubMemberships, announcements } = useData();

  if (!currentUser) return null;

  const totalSeats = events.reduce((sum, e) => sum + e.seats, 0);
  const totalRegistrations = eventRegistrations.length;
  const pendingMemberships = clubMemberships.filter(m => m.status === 'pending');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-white/20 text-xs font-bold rounded-full uppercase tracking-wider">
              Student Affairs & Club Coordinator
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome, {currentUser.name}! ✨
            </h1>
            <p className="text-xs sm:text-sm text-purple-100">
              Manage hackathons, cultural festivals, club memberships, and campus participation.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onNavigate('events')}
              className="px-4 py-2.5 bg-white text-purple-700 hover:bg-purple-50 rounded-xl text-xs font-bold shadow-md transition"
            >
              + Create Event
            </button>
            <button
              onClick={() => onNavigate('clubs')}
              className="px-4 py-2.5 bg-purple-500/40 border border-white/20 text-white hover:bg-purple-500/60 rounded-xl text-xs font-bold transition"
            >
              Manage Clubs
            </button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-950/60 text-purple-600 rounded-2xl w-fit">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{events.length}</p>
            <p className="text-xs text-slate-500">Active Campus Events</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 rounded-2xl w-fit">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{totalRegistrations}</p>
            <p className="text-xs text-slate-500">Event Pass Registrations</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-pink-100 dark:bg-pink-950/60 text-pink-600 rounded-2xl w-fit">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{clubs.length}</p>
            <p className="text-xs text-slate-500">Registered Student Clubs</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-2xl w-fit">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{pendingMemberships.length}</p>
            <p className="text-xs text-slate-500">Pending Approvals</p>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Events Overview</h3>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>Manage Events</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {events.map(evt => (
              <div
                key={evt.id}
                onClick={() => onNavigate('events')}
                className="p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl border border-slate-200/80 dark:border-slate-600 flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{evt.title}</p>
                  <p className="text-[11px] text-slate-500">{evt.date} • {evt.venue}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-purple-600 dark:text-purple-400">
                    {evt.registeredCount} / {evt.seats}
                  </span>
                  <p className="text-[9px] text-slate-400">Registered</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Membership Approvals */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <span>Club Requests ({pendingMemberships.length})</span>
          </h3>

          <div className="space-y-2.5">
            {pendingMemberships.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No pending membership requests!</p>
            ) : (
              pendingMemberships.map(mem => (
                <div key={mem.id} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200/80 dark:border-slate-600 space-y-2">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{mem.studentName}</p>
                    <p className="text-[10px] text-slate-500">{mem.clubName}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('clubs')}
                    className="w-full py-1.5 bg-indigo-600 text-white rounded-xl text-[11px] font-bold hover:bg-indigo-700 transition"
                  >
                    Review Request
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
