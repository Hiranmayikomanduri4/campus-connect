import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  UserPlus, 
  X, 
  Sparkles,
  Megaphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const ClubModule: React.FC = () => {
  const { currentUser } = useAuth();
  const { clubs, clubMemberships, createClub, applyClubMembership, updateClubMembershipStatus } = useData();

  const isCoordinatorOrAdmin = currentUser?.role === 'coordinator' || currentUser?.role === 'admin';

  // Create Club State
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [leadName, setLeadName] = useState(currentUser?.name || 'Club Lead');
  const [banner, setBanner] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000');

  const pendingRequests = clubMemberships.filter(m => m.status === 'pending');

  const handleCreateClub = (e: React.FormEvent) => {
    e.preventDefault();
    createClub({
      name,
      description,
      category,
      leadName,
      leadId: currentUser?.uid || 'coord-1',
      banner,
      foundedYear: new Date().getFullYear().toString()
    });
    setIsCreating(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-pink-600 dark:text-pink-400" />
            <span>Clubs & Societies</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join technical, cultural, and sports student organizations or approve club registrations
          </p>
        </div>

        {isCoordinatorOrAdmin && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-pink-600/20 transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Form New Club</span>
          </button>
        )}
      </div>

      {/* Create Club Modal */}
      {isCreating && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 border-pink-500 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Form New Campus Club</h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateClub} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Club Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. CodeX GDSC"
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                >
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Social Service">Social Service</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                required
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
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
                className="px-5 py-2 bg-pink-600 text-white hover:bg-pink-700 rounded-xl text-xs font-bold shadow-md transition"
              >
                Create Club
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pending Membership Approvals (Coordinator) */}
      {isCoordinatorOrAdmin && pendingRequests.length > 0 && (
        <div className="bg-amber-50/80 dark:bg-amber-950/30 p-5 rounded-3xl border border-amber-200 dark:border-amber-800 space-y-3">
          <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Pending Membership Applications ({pendingRequests.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pendingRequests.map(req => (
              <div key={req.id} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm space-y-2 text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{req.studentName}</p>
                  <p className="text-[10px] text-slate-500">{req.clubName}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateClubMembershipStatus(req.id, 'approved')}
                    className="flex-1 py-1.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateClubMembershipStatus(req.id, 'rejected')}
                    className="flex-1 py-1.5 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clubs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map(club => {
          const myMem = clubMemberships.find(m => m.clubId === club.id && m.studentId === currentUser?.uid);

          return (
            <div
              key={club.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-40 overflow-hidden">
                  <img src={club.banner} alt={club.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-full">
                    {club.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{club.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">{club.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <span>Lead: {club.leadName}</span>
                    <span className="font-bold text-pink-600">{club.membersCount} Members</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                {myMem ? (
                  <span className={`block w-full text-center py-2 text-xs font-bold rounded-xl ${
                    myMem.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60'
                  }`}>
                    Membership {myMem.status.toUpperCase()}
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      currentUser && applyClubMembership(club.id, currentUser.uid, currentUser.name, currentUser.email)
                    }
                    className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-1"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Join Club</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
