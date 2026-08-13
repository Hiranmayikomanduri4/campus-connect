import React, { useState } from 'react';
import { Search, X, Users, Calendar, BookOpen, Briefcase, Megaphone, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const { allUsers, events, assignments, placements, announcements } = useData();

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredUsers = q
    ? allUsers.filter(u => u.name.toLowerCase().includes(q) || u.department.toLowerCase().includes(q) || (u.rollNumber && u.rollNumber.toLowerCase().includes(q)))
    : [];

  const filteredEvents = q
    ? events.filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q))
    : [];

  const filteredAssignments = q
    ? assignments.filter(a => a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q))
    : [];

  const filteredPlacements = q
    ? placements.filter(p => p.company.toLowerCase().includes(q) || p.role.toLowerCase().includes(q))
    : [];

  const filteredAnnouncements = q
    ? announcements.filter(a => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
    : [];

  const totalResults =
    filteredUsers.length +
    filteredEvents.length +
    filteredAssignments.length +
    filteredPlacements.length +
    filteredAnnouncements.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search students, faculty, events, assignments, placements, notices..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300">
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
              Type anything to search across CampusConnect modules...
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-xs">
              No matching records found for "{query}". Try another search.
            </div>
          )}

          {/* Users */}
          {filteredUsers.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                <span>People ({filteredUsers.length})</span>
              </div>
              <div className="space-y-1">
                {filteredUsers.map(u => (
                  <div
                    key={u.uid}
                    onClick={() => {
                      onNavigate('profile');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">{u.name}</p>
                        <p className="text-[11px] text-slate-500">{u.role.toUpperCase()} • {u.department}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Events ({filteredEvents.length})</span>
              </div>
              <div className="space-y-1">
                {filteredEvents.map(e => (
                  <div
                    key={e.id}
                    onClick={() => {
                      onNavigate('events');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{e.title}</p>
                      <p className="text-[11px] text-slate-500">{e.date} • {e.venue}</p>
                    </div>
                    <span className="text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-md">
                      {e.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignments */}
          {filteredAssignments.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>Assignments ({filteredAssignments.length})</span>
              </div>
              <div className="space-y-1">
                {filteredAssignments.map(a => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onNavigate('assignments');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{a.title}</p>
                      <p className="text-[11px] text-slate-500">{a.subject} • Due: {a.deadline}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placements */}
          {filteredPlacements.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                <span>Placements ({filteredPlacements.length})</span>
              </div>
              <div className="space-y-1">
                {filteredPlacements.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onNavigate('placements');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{p.company} - {p.role}</p>
                      <p className="text-[11px] text-slate-500">CTC: {p.ctc} • Location: {p.location}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements */}
          {filteredAnnouncements.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <Megaphone className="w-3.5 h-3.5 text-indigo-500" />
                <span>Announcements ({filteredAnnouncements.length})</span>
              </div>
              <div className="space-y-1">
                {filteredAnnouncements.map(a => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onNavigate('announcements');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{a.title}</p>
                      <p className="text-[11px] text-slate-500">{a.category} • {a.date}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
