import React from 'react';
import { GraduationCap, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2 text-white">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight">CampusConnect</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              One Campus. One Connected Platform. Unifying students, faculty, coordinators, and university administration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Platform Modules</h4>
            <ul className="space-y-1.5">
              <li><a href="#attendance" className="hover:text-indigo-400 transition">Attendance Tracking</a></li>
              <li><a href="#assignments" className="hover:text-indigo-400 transition">Assignments & Grading</a></li>
              <li><a href="#events" className="hover:text-indigo-400 transition">Campus Events & Pass</a></li>
              <li><a href="#placements" className="hover:text-indigo-400 transition">Placement Cell</a></li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">User Roles</h4>
            <ul className="space-y-1.5">
              <li><a href="#student" className="hover:text-indigo-400 transition">Student Portal</a></li>
              <li><a href="#faculty" className="hover:text-indigo-400 transition">Faculty Portal</a></li>
              <li><a href="#coordinator" className="hover:text-indigo-400 transition">Coordinator Hub</a></li>
              <li><a href="#admin" className="hover:text-indigo-400 transition">Admin Dashboard</a></li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Connect & Support</h4>
            <p className="text-[11px]">University Tech & Digital Innovation Hub</p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg transition"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg transition"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg transition"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <p>© 2026 CampusConnect. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Built for University Hackathon with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};
