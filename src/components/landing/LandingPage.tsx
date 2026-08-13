import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  BarChart3, 
  Zap,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Footer } from '../layout/Footer';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onExploreDemo: (roleEmail: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenSignUp,
  onExploreDemo
}) => {
  const { demoAccounts } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Smart Attendance',
      description: 'Faculty mark session-based attendance in seconds. Students view subject-wise breakdown with Good/Warning/Critical status indicators.'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: 'Assignments & Rubrics',
      description: 'Publish assignments with attachments & rubrics. Students submit via PDF, ZIP, or GitHub repo links for instant faculty grading & feedback.'
    },
    {
      icon: <Calendar className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
      title: 'Events & Digital Passes',
      description: 'Browse campus events, hackathons, and workshops. Instant QR code digital entry ticket generation with seat limits.'
    },
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Placement Portal',
      description: 'Direct recruitment drive portal with CGPA eligibility checks, resume attachment, and real-time status tracking.'
    },
    {
      icon: <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: 'Clubs & Societies',
      description: 'Student club discovery, membership registration, coordinator approval workflows, and specialized club noticeboards.'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Admin Analytics',
      description: 'Comprehensive administrative dashboard with 5 analytical charts tracking attendance trends, placements, and department health.'
    }
  ];

  const roleHighlights = [
    {
      role: 'Student',
      badge: 'For Learners',
      color: 'from-emerald-500 to-teal-600',
      items: ['Real-time attendance % tracker', 'Assignment submission & GitHub link integration', 'Digital QR Event Passes', 'Placement application tracker']
    },
    {
      role: 'Faculty',
      badge: 'For Educators',
      color: 'from-indigo-500 to-blue-600',
      items: ['One-click class attendance taker', 'Assignment creator & rubric grading', 'Upload study materials', 'Publish official announcements']
    },
    {
      role: 'Coordinator',
      badge: 'For Event & Club Leads',
      color: 'from-purple-500 to-pink-600',
      items: ['Create & publish campus events', 'Approve/Reject club memberships', 'Student participation analytics', 'Broadcast notices']
    },
    {
      role: 'Administrator',
      badge: 'For University Operations',
      color: 'from-amber-500 to-orange-600',
      items: ['Full analytics dashboard', 'Manage users, roles & departments', 'Course & Placement drives setup', 'Audit activity logs & reports']
    }
  ];

  const FAQs = [
    {
      q: 'How does CampusConnect centralize college operations?',
      a: 'CampusConnect replaces fragmented messaging apps, paper registers, and scattered portals with a unified role-based SaaS platform built on Firebase and React.'
    },
    {
      q: 'How can hackathon judges test different roles?',
      a: 'You can instantly switch between Student, Faculty, Coordinator, and Admin roles using the top header Demo Role Switcher or 1-click login buttons without re-entering passwords.'
    },
    {
      q: 'Is attendance calculated automatically per subject?',
      a: 'Yes! The Attendance engine computes overall and subject-wise percentages, applying visual status indicators (75%+ Good in green, 60-74% Warning in amber, below 60% Critical in red).'
    },
    {
      q: 'Does it support file uploads and GitHub links for assignments?',
      a: 'Yes, students can attach solution notes, upload files, or paste GitHub repository URLs which faculty can review and assign marks with rubric feedback.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-indigo-50/80 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/0 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>One Campus. One Connected Platform.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
              The Next-Gen Smart <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Campus Management
              </span> Platform
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Centralize attendance, assignments, events, placements, clubs, and admin operations into a unified, high-performance university ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenSignUp}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold transition shadow-sm"
              >
                Sign In to Portal
              </button>
            </div>

            {/* 1-Click Demo Shortcut Cards for Hackathon Judges */}
            <div className="pt-8">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                ⚡ Hackathon Demo Shortcuts – Click to test any role
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto">
                {demoAccounts.map(demo => (
                  <button
                    key={demo.email}
                    onClick={() => onExploreDemo(demo.email)}
                    className="p-3 bg-white dark:bg-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl border border-slate-200 dark:border-slate-700 text-left shadow-sm hover:shadow-md transition group"
                  >
                    <div className="flex items-center space-x-2">
                      <img src={demo.avatar} alt={demo.name} className="w-7 h-7 rounded-full object-cover" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 dark:text-white truncate group-hover:text-indigo-600">{demo.name.split(' ')[0]}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{demo.role}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Platform Statistics */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">100%</p>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Digital Campus Sync</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">4 Roles</p>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Dedicated Portals</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">98.5%</p>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Average Attendance</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">₹28 LPA</p>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Top Placement Package</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Built for Modern Higher Education
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Every feature engineered to eliminate manual effort and streamline academic workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all space-y-3 hover:-translate-y-1"
            >
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl w-fit">{f.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role Breakdown Section */}
      <section className="py-20 bg-slate-100/70 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Role-Based Access Control
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Designed for Every Stakeholder
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleHighlights.map((r, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`p-2.5 rounded-2xl bg-gradient-to-r ${r.color} text-white w-fit font-bold text-xs uppercase tracking-wider`}>
                    {r.badge}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{r.role} Portal</h3>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {r.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onExploreDemo(demoAccounts.find(d => d.role === r.role.toLowerCase())?.email || demoAccounts[0].email)}
                  className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition text-center"
                >
                  Test {r.role} View
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Everything you need to know about CampusConnect</p>
        </div>

        <div className="space-y-3">
          {FAQs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white"
              >
                <span>{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
