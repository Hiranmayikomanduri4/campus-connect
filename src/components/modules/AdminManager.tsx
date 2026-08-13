import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  Search, 
  ShieldCheck, 
  Filter, 
  UserCheck, 
  UserX, 
  Edit3, 
  Key,
  Clock,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AdminManager: React.FC = () => {
  const { currentUser } = useAuth();
  const { allUsers, activityLogs } = useData();

  const [activeTab, setActiveTab] = useState<'users' | 'logs'>('users');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Admin Management & System Audit</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Control user access roles, inspect active sessions, and review security audit logs
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Roles ({allUsers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'logs'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Audit Logs ({activityLogs.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'users' ? (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, email..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-bold">Role:</span>
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="faculty">Faculty</option>
                <option value="coordinator">Coordinators</option>
                <option value="admin">Administrators</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-2">User</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">Department</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                {filteredUsers.map(u => (
                  <tr key={u.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                    <td className="py-3 px-2 flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-[10px] text-slate-400">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 font-bold rounded-md uppercase text-[10px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-medium">{u.department || 'N/A'}</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-[10px] font-bold transition">
                        Edit Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* System Activity Logs Table */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <span>Real-time Security & Action Audit Trail</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Total {activityLogs.length} events logged</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-2">Timestamp</th>
                  <th className="pb-3 px-2">User / Role</th>
                  <th className="pb-3 px-2">Action Performed</th>
                  <th className="pb-3 px-2">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                {activityLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                    <td className="py-3 px-2 text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-2 font-sans font-bold text-slate-900 dark:text-white">
                      {log.userName} ({log.userRole})
                    </td>
                    <td className="py-3 px-2 font-sans text-slate-700 dark:text-slate-200">{log.action}</td>
                    <td className="py-3 px-2 text-slate-400">{log.ipAddress || '192.168.1.101'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
