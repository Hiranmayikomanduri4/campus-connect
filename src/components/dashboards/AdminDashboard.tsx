import React from 'react';
import { 
  Users, 
  Building2, 
  Calendar, 
  CheckCheck, 
  BookOpen, 
  Briefcase, 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface AdminDashboardProps {
  onNavigate: (module: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { 
    allUsers, 
    departments, 
    courses, 
    attendanceSessions, 
    assignments, 
    submissions, 
    events, 
    placements, 
    applications,
    activityLogs
  } = useData();

  if (!currentUser) return null;

  const totalStudents = allUsers.filter(u => u.role === 'student').length + 1800;
  const totalFaculty = allUsers.filter(u => u.role === 'faculty').length + 95;

  // Chart Data Preparation
  const monthlyAttendanceData = [
    { month: 'Jan', percentage: 88 },
    { month: 'Feb', percentage: 91 },
    { month: 'Mar', percentage: 85 },
    { month: 'Apr', percentage: 93 },
    { month: 'May', percentage: 89 },
    { month: 'Jun', percentage: 92 },
    { month: 'Jul', percentage: 87 },
    { month: 'Aug', percentage: 94 }
  ];

  const deptPerformanceData = [
    { name: 'CSE', attendance: 92, gpa: 8.4 },
    { name: 'IT', attendance: 88, gpa: 8.1 },
    { name: 'ECE', attendance: 85, gpa: 7.9 },
    { name: 'Mech', attendance: 82, gpa: 7.6 },
    { name: 'MBA', attendance: 90, gpa: 8.2 }
  ];

  const assignmentCompletionData = [
    { name: 'Submitted On-Time', value: 72, color: '#10b981' },
    { name: 'Late Submissions', value: 18, color: '#f59e0b' },
    { name: 'Pending / Unsubmitted', value: 10, color: '#ef4444' }
  ];

  const placementStatsData = [
    { company: 'Microsoft', applied: 120, shortlisted: 35, selected: 12 },
    { company: 'Google', applied: 140, shortlisted: 28, selected: 8 },
    { company: 'Atlassian', applied: 95, shortlisted: 22, selected: 6 },
    { company: 'Amazon', applied: 110, shortlisted: 30, selected: 10 }
  ];

  const eventParticipationData = [
    { name: 'HackCampus', seats: 300, registered: 214 },
    { name: 'GenAI Workshop', seats: 80, registered: 78 },
    { name: 'Tarang Cultural Fest', seats: 2000, registered: 1420 },
    { name: 'Robotics Robowars', seats: 150, registered: 130 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white border border-slate-800 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>University Central Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Executive Analytics Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Real-time monitoring across 5 academic departments, 1,800+ students, and campus drives.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onNavigate('admin-users')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition"
            >
              Manage Users
            </button>
            <button
              onClick={() => onNavigate('admin-logs')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition"
            >
              Activity Audit Logs
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 rounded-2xl w-fit">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{totalStudents}</p>
            <p className="text-xs text-slate-500">Total Enrolled Students</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-950/60 text-purple-600 rounded-2xl w-fit">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{departments.length}</p>
            <p className="text-xs text-slate-500">Academic Departments</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-2xl w-fit">
            <CheckCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">91.4%</p>
            <p className="text-xs text-slate-500">Avg Campus Attendance</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-2xl w-fit">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">84.2%</p>
            <p className="text-xs text-slate-500">Placement Rate (2026 Batch)</p>
          </div>
        </div>
      </div>

      {/* Charts Grid 1: Attendance & Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Attendance Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Monthly Attendance Trend (%)</h3>
              <p className="text-xs text-slate-500">8-Month University Average</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-lg">
              Good (+3%)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[70, 100]} stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '12px', background: '#1e293b', color: '#fff', border: 'none' }} />
                <Line type="monotone" dataKey="percentage" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Department Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Department Performance & Attendance</h3>
              <p className="text-xs text-slate-500">CSE, IT, ECE, Mech, MBA</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '12px', background: '#1e293b', color: '#fff', border: 'none' }} />
                <Bar dataKey="attendance" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Grid 2: Assignment Completion, Placements & Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart 3: Assignment Completion Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Assignment Completion</h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assignmentCompletionData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                  {assignmentCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-xs">
            {assignmentCompletionData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </span>
                <span className="font-bold text-slate-800 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Placement Drive Funnel */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Placement Drives Statistics</h3>
              <p className="text-xs text-slate-500">Applied vs Shortlisted vs Selected</p>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementStatsData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="company" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '12px', background: '#1e293b', color: '#fff', border: 'none' }} />
                <Bar dataKey="applied" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="shortlisted" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                <Bar dataKey="selected" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 5: Event Participation & Capacity */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">5. Campus Event Participation & Capacity</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={eventParticipationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={120} />
              <Tooltip contentStyle={{ borderRadius: '12px', background: '#1e293b', color: '#fff', border: 'none' }} />
              <Bar dataKey="seats" fill="#e2e8f0" radius={[0, 6, 6, 0]} />
              <Bar dataKey="registered" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
