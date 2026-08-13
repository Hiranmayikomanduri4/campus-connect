import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Clock, 
  X, 
  Send,
  Building,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Placement, PlacementApplication } from '../../types';

export const PlacementModule: React.FC = () => {
  const { currentUser } = useAuth();
  const { placements, applications, createPlacement, applyPlacement, updateApplicationStatus } = useData();

  const isAdminOrCoordinator = currentUser?.role === 'admin' || currentUser?.role === 'coordinator';

  const [search, setSearch] = useState('');

  // Create Placement Form State
  const [isCreating, setIsCreating] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('B.Tech CSE / IT / ECE with CGPA >= 7.5');
  const [minCgpa, setMinCgpa] = useState(7.5);
  const [skills, setSkills] = useState('Data Structures, System Design, React');
  const [ctc, setCtc] = useState('₹18,00,000 PA');
  const [location, setLocation] = useState('Bengaluru / Remote');
  const [deadline, setDeadline] = useState('2026-09-15');

  const filteredPlacements = placements.filter(p =>
    p.company.toLowerCase().includes(search.toLowerCase()) ||
    p.role.toLowerCase().includes(search.toLowerCase())
  );

  const myApplications = applications.filter(a => a.studentId === currentUser?.uid);

  const handleCreatePlacement = (e: React.FormEvent) => {
    e.preventDefault();
    createPlacement({
      company,
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=200',
      role,
      description,
      eligibility,
      minCgpa,
      skills: skills.split(',').map(s => s.trim()),
      ctc,
      location,
      deadline
    });
    setIsCreating(false);
    setCompany('');
    setRole('');
  };

  const handleApply = (p: Placement) => {
    if (!currentUser) return;
    const cgpa = currentUser.cgpa || 8.5;
    if (cgpa < p.minCgpa) {
      alert(`Min CGPA required is ${p.minCgpa}. Your CGPA is ${cgpa}.`);
      return;
    }
    applyPlacement(p.id, currentUser.uid, currentUser.name, currentUser.rollNumber || 'CS2022042', cgpa);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            <span>Training & Placement Cell</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Explore corporate campus recruitment drives, verify CGPA eligibility, and track application stages
          </p>
        </div>

        {isAdminOrCoordinator && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-600/20 transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post Placement Drive</span>
          </button>
        )}
      </div>

      {/* Create Placement Form Modal */}
      {isCreating && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 border-amber-500 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Post Campus Recruitment Drive</h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreatePlacement} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Microsoft"
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="e.g. Software Development Engineer"
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Role Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                required
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">CTC Package</label>
                <input
                  type="text"
                  value={ctc}
                  onChange={e => setCtc(e.target.value)}
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Min CGPA Requirement</label>
                <input
                  type="number"
                  step="0.1"
                  value={minCgpa}
                  onChange={e => setMinCgpa(Number(e.target.value))}
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Application Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
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
                className="px-5 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-xl text-xs font-bold shadow-md transition"
              >
                Post Placement
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Input */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by company name or role..."
          className="w-full bg-transparent text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Placements Grid */}
      <div className="space-y-4">
        {filteredPlacements.map(p => {
          const myApp = applications.find(a => a.placementId === p.id && a.studentId === currentUser?.uid);
          const studentCgpa = currentUser?.cgpa || 8.85;
          const isEligible = studentCgpa >= p.minCgpa;

          return (
            <div
              key={p.id}
              className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-black text-lg">
                    {p.company.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.company}</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{p.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-xl">
                    CTC: {p.ctc}
                  </span>

                  {!isAdminOrCoordinator && (
                    myApp ? (
                      <span className="px-3.5 py-1.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 text-xs font-bold rounded-xl">
                        Status: {myApp.status}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApply(p)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition shadow-md ${
                          isEligible
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                        }`}
                      >
                        {isEligible ? 'Apply Now' : `Ineligible (CGPA < ${p.minCgpa})`}
                      </button>
                    )
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{p.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{p.location}</span>
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    Min CGPA: {p.minCgpa}
                  </span>
                </div>
                <span className="font-mono text-rose-600">Deadline: {p.deadline}</span>
              </div>

              {/* Admin/Coordinator Status Manager */}
              {isAdminOrCoordinator && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2">
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Applications ({applications.filter(a => a.placementId === p.id).length})
                  </p>
                  <div className="space-y-1.5">
                    {applications.filter(a => a.placementId === p.id).map(app => (
                      <div key={app.id} className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{app.studentName} ({app.studentRoll})</p>
                          <p className="text-[10px] text-slate-500">CGPA: {app.studentCgpa}</p>
                        </div>
                        <select
                          value={app.status}
                          onChange={e => updateApplicationStatus(app.id, e.target.value as any)}
                          className="py-1 px-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-bold"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interview">Interview</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
