import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

import { LandingPage } from './components/landing/LandingPage';

import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { FacultyDashboard } from './components/dashboards/FacultyDashboard';
import { CoordinatorDashboard } from './components/dashboards/CoordinatorDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';

import { AttendanceModule } from './components/modules/AttendanceModule';
import { AssignmentModule } from './components/modules/AssignmentModule';
import { EventModule } from './components/modules/EventModule';
import { ClubModule } from './components/modules/ClubModule';
import { PlacementModule } from './components/modules/PlacementModule';
import { AnnouncementModule } from './components/modules/AnnouncementModule';
import { ProfileModule } from './components/modules/ProfileModule';
import { AdminManager } from './components/modules/AdminManager';

import { LoginModal } from './components/auth/LoginModal';
import { SignUpModal } from './components/auth/SignUpModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

const MainAppContent: React.FC = () => {
  const { currentUser, loginAsDemo } = useAuth();
  
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExploreDemo = (demoEmail: string) => {
    loginAsDemo(demoEmail);
    setActiveModule('dashboard');
  };

  const renderDashboard = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case 'student':
        return <StudentDashboard onNavigate={setActiveModule} />;
      case 'faculty':
        return <FacultyDashboard onNavigate={setActiveModule} />;
      case 'coordinator':
        return <CoordinatorDashboard onNavigate={setActiveModule} />;
      case 'admin':
        return <AdminDashboard onNavigate={setActiveModule} />;
      default:
        return <StudentDashboard onNavigate={setActiveModule} />;
    }
  };

  const renderMainContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return renderDashboard();
      case 'attendance':
        return <AttendanceModule />;
      case 'assignments':
        return <AssignmentModule />;
      case 'events':
        return <EventModule />;
      case 'placements':
        return <PlacementModule />;
      case 'clubs':
        return <ClubModule />;
      case 'announcements':
        return <AnnouncementModule />;
      case 'profile':
        return <ProfileModule />;
      case 'admin-users':
      case 'admin-depts':
      case 'admin-logs':
      case 'admin-settings':
        return <AdminManager />;
      default:
        return renderDashboard();
    }
  };

  if (!currentUser) {
    return (
      <>
        <LandingPage
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onExploreDemo={handleExploreDemo}
        />

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSwitchToSignUp={() => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
        />

        <SignUpModal
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToLogin={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSignUp={() => setIsSignUpOpen(true)}
        onNavigate={setActiveModule}
        toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        activeModule={activeModule}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          activeModule={activeModule}
          onNavigate={setActiveModule}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0">
          {renderMainContent()}
        </main>
      </div>

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setActiveModule}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <MainAppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

