import React, { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Sparkles, 
  Bell, 
  X, 
  Send, 
  AlertCircle,
  Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AnnouncementModule: React.FC = () => {
  const { currentUser } = useAuth();
  const { announcements, createAnnouncement } = useData();

  const canPublish = currentUser?.role === 'faculty' || currentUser?.role === 'coordinator' || currentUser?.role === 'admin';

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState<'all' | 'students' | 'faculty' | 'department'>('all');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [category, setCategory] = useState('Academic');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createAnnouncement({
      title,
      content,
      publisherName: currentUser?.name || 'Administrator',
      publisherRole: currentUser?.role || 'admin',
      targetAudience,
      priority,
      category,
      date: new Date().toISOString().substring(0, 10)
    });
    setIsCreating(false);
    setTitle('');
    setContent('');
  };

  const getPriorityStyle = (p: string) => {
    switch (p) {
      case 'urgent': return 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300';
      case 'high': return 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300';
      default: return 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950/80 dark:text-indigo-300';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Campus Announcements & Notices</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official university circulars, academic schedules, exam notices, and emergency alerts
          </p>
        </div>

        {canPublish && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Broadcast Notice</span>
          </button>
        )}
      </div>

      {/* Broadcast Modal */}
      {isCreating && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 border-indigo-500 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Broadcast Campus Notice</h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notice Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. End Semester Exam Schedule Released"
                required
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Detailed Content</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={4}
                required
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Audience</label>
                <select
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value as any)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                >
                  <option value="all">Entire Campus</option>
                  <option value="students">Students Only</option>
                  <option value="faculty">Faculty Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as any)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  placeholder="e.g. Academic / Exams"
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Publish Notice</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map(anc => (
          <div
            key={anc.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 border text-[10px] font-bold rounded-md uppercase ${getPriorityStyle(anc.priority)}`}>
                  {anc.priority} Priority
                </span>
                <span className="text-[10px] font-bold text-slate-400">{anc.category}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{anc.date}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">{anc.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{anc.content}</p>

            <div className="text-[11px] text-slate-400 pt-2 flex items-center justify-between">
              <span>Publisher: <strong className="text-slate-700 dark:text-slate-200">{anc.publisherName}</strong> ({anc.publisherRole})</span>
              <span>Audience: <strong className="capitalize text-slate-700 dark:text-slate-200">{anc.targetAudience}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
