import React, { useState } from 'react';
import { User, Mail, Phone, Building2, BookOpen, Award, Save, Sparkles, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileModule: React.FC = () => {
  const { currentUser, updateUserProfile } = useAuth();

  if (!currentUser) return null;

  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [bio, setBio] = useState('Passionate computer science student specializing in Machine Learning and full-stack React systems.');
  const [skills, setSkills] = useState('React, TypeScript, Python, PyTorch, Node.js, Tailwind CSS');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full border-4 border-white/30 shadow-2xl object-cover"
          />
          <div className="space-y-1 text-center sm:text-left">
            <span className="px-3 py-1 bg-white/20 text-xs font-bold rounded-full uppercase tracking-wider">
              {currentUser.role}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">{currentUser.name}</h1>
            <p className="text-xs text-indigo-100">{currentUser.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Details Form */}
      <form onSubmit={handleSave} className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Academic & Contact Information</h3>
          {saved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Profile updated successfully!</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
            <input
              type="text"
              value={currentUser.department || 'Computer Science & Engineering'}
              disabled
              className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Role / Designation</label>
            <input
              type="text"
              value={currentUser.role.toUpperCase()}
              disabled
              className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 cursor-not-allowed uppercase"
            />
          </div>

          {currentUser.role === 'student' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Roll Number</label>
                <input
                  type="text"
                  value={currentUser.rollNumber || 'CS2022042'}
                  disabled
                  className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cumulative GPA (CGPA)</label>
                <input
                  type="text"
                  value={currentUser.cgpa || 8.85}
                  disabled
                  className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 font-bold cursor-not-allowed"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Technical Skills</label>
            <input
              type="text"
              value={skills}
              onChange={e => setSkills(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Bio / Profile Summary</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/20 transition flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
};
