import React, { useState } from 'react';
import { 
  CheckCheck, 
  X, 
  Calendar, 
  BookOpen, 
  Plus, 
  Edit, 
  Save, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  UserCheck, 
  Search,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { AttendanceRecord, AttendanceSession } from '../../types';

export const AttendanceModule: React.FC = () => {
  const { currentUser } = useAuth();
  const { attendanceSessions, createAttendanceSession, updateAttendanceSession, allUsers } = useData();

  const isFacultyOrAdmin = currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  // State for faculty creating session
  const [isCreating, setIsCreating] = useState(false);
  const [subject, setSubject] = useState('Artificial Intelligence & Machine Learning');
  const [courseCode, setCourseCode] = useState('CS602');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  // Student attendance selection list
  const studentsList = allUsers.filter(u => u.role === 'student');
  const [studentRecords, setStudentRecords] = useState<AttendanceRecord[]>(() =>
    studentsList.map(s => ({
      studentId: s.uid,
      studentName: s.name,
      rollNumber: s.rollNumber || 'CS2022' + Math.floor(100 + Math.random() * 900),
      status: 'present'
    }))
  );

  const [searchQuery, setSearchQuery] = useState('');

  // Save new session
  const handleSaveSession = () => {
    const presentCount = studentRecords.filter(r => r.status === 'present').length;
    createAttendanceSession({
      subject,
      courseCode,
      facultyId: currentUser?.uid || 'fac-1',
      facultyName: currentUser?.name || 'Dr. Faculty',
      department: currentUser?.department || 'Computer Science & Engineering',
      date,
      totalStudents: studentRecords.length,
      presentCount,
      records: studentRecords
    });
    setIsCreating(false);
  };

  const toggleStudentStatus = (studentId: string) => {
    setStudentRecords(prev =>
      prev.map(r => (r.studentId === studentId ? { ...r, status: r.status === 'present' ? 'absent' : 'present' } : r))
    );
  };

  // Student Attendance Calculations
  const mySessions = attendanceSessions.filter(s =>
    s.records.some(r => r.studentId === currentUser?.uid)
  );

  // Group subject-wise
  const subjectStats: Record<string, { total: number; present: number; code: string }> = {};

  attendanceSessions.forEach(session => {
    const rec = session.records.find(r => r.studentId === currentUser?.uid);
    if (!subjectStats[session.subject]) {
      subjectStats[session.subject] = { total: 0, present: 0, code: session.courseCode };
    }
    subjectStats[session.subject].total += 1;
    if (rec?.status === 'present') {
      subjectStats[session.subject].present += 1;
    }
  });

  // Ensure default demo subject stats if empty
  if (Object.keys(subjectStats).length === 0) {
    subjectStats['Artificial Intelligence & Machine Learning'] = { total: 20, present: 18, code: 'CS602' };
    subjectStats['Data Structures & Algorithms'] = { total: 24, present: 22, code: 'CS301' };
    subjectStats['Web Application Development'] = { total: 18, present: 12, code: 'CS605' };
    subjectStats['Digital Signal Processing'] = { total: 15, present: 9, code: 'EC501' };
  }

  const getPercentageColor = (pct: number) => {
    if (pct >= 75) return { bg: 'bg-emerald-100 dark:bg-emerald-950/60', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300', label: 'Good standing (>=75%)' };
    if (pct >= 60) return { bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300', label: 'Warning threshold (60-74%)' };
    return { bg: 'bg-rose-100 dark:bg-rose-950/60', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-300', label: 'Critical attendance (<60%)' };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCheck className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Attendance Portal</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isFacultyOrAdmin
              ? 'Record, edit, and audit daily session attendance'
              : 'Track overall and subject-wise attendance performance'}
          </p>
        </div>

        {isFacultyOrAdmin && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Take Class Attendance</span>
          </button>
        )}
      </div>

      {/* Faculty Create Attendance Session Drawer / Modal */}
      {isCreating && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 border-indigo-500 shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              <span>Record Class Attendance Session</span>
            </h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Course Code</label>
              <input
                type="text"
                value={courseCode}
                onChange={e => setCourseCode(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Student Marking Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-800 dark:text-white">
                Students List ({studentRecords.filter(r => r.status === 'present').length}/{studentRecords.length} Present)
              </p>
              <div className="flex space-x-2 text-xs">
                <button
                  type="button"
                  onClick={() => setStudentRecords(prev => prev.map(r => ({ ...r, status: 'present' })))}
                  className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg"
                >
                  Mark All Present
                </button>
                <button
                  type="button"
                  onClick={() => setStudentRecords(prev => prev.map(r => ({ ...r, status: 'absent' })))}
                  className="px-2.5 py-1 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold rounded-lg"
                >
                  Mark All Absent
                </button>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl">
              {studentRecords.map(r => (
                <div key={r.studentId} className="p-3 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{r.studentName}</p>
                    <p className="text-[10px] text-slate-500">Roll No: {r.rollNumber}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStudentStatus(r.studentId)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition ${
                      r.status === 'present'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {r.status === 'present' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span className="capitalize">{r.status}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSession}
              className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Session Attendance</span>
            </button>
          </div>
        </div>
      )}

      {/* Student View: Subject-wise Cards & Criteria Legend */}
      <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 font-bold text-indigo-900 dark:text-indigo-200">
          <AlertTriangle className="w-4 h-4 text-indigo-600" />
          <span>Attendance Criteria Rules:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-semibold">
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
            75%+ Good
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
            60-74% Warning
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
            Below 60% Critical
          </span>
        </div>
      </div>

      {/* Subject Wise Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(subjectStats).map(([subj, data]) => {
          const pct = Math.round((data.present / Math.max(1, data.total)) * 100);
          const style = getPercentageColor(pct);

          return (
            <div
              key={subj}
              className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{data.code}</span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">{subj}</h3>
              </div>

              <div className="flex items-baseline justify-between pt-2">
                <div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{pct}%</span>
                  <p className="text-[10px] text-slate-500">{data.present} of {data.total} attended</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${style.bg} ${style.text} ${style.border}`}>
                  {pct >= 75 ? 'Good' : pct >= 60 ? 'Warning' : 'Critical'}
                </span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${pct >= 75 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Attendance Session Logs Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recorded Attendance Sessions</h3>
          <span className="text-xs text-slate-400 font-mono">{attendanceSessions.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Subject / Code</th>
                <th className="pb-3 px-2">Faculty</th>
                <th className="pb-3 px-2">Total Students</th>
                <th className="pb-3 px-2">Present Count</th>
                <th className="pb-3 px-2 text-right">My Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
              {attendanceSessions.map(session => {
                const myRec = session.records.find(r => r.studentId === currentUser?.uid);
                return (
                  <tr key={session.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                    <td className="py-3 px-2 font-mono font-semibold">{session.date}</td>
                    <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">
                      {session.subject} ({session.courseCode})
                    </td>
                    <td className="py-3 px-2">{session.facultyName}</td>
                    <td className="py-3 px-2">{session.totalStudents}</td>
                    <td className="py-3 px-2 font-semibold text-indigo-600">{session.presentCount}</td>
                    <td className="py-3 px-2 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        myRec?.status === 'present'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                      }`}>
                        {myRec ? myRec.status : 'Present'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
