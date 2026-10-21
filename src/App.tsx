import React, { useState, useEffect, useCallback } from 'react';
import { PageType, ProjectItem, CommentItem, MemberItem, ReportItem } from './types';
import { INITIAL_PROJECTS, MOCK_MEMBERS, MOCK_REPORTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { LPView } from './components/LPView';
import { HomeView } from './components/HomeView';
import { DetailView } from './components/DetailView';
import { AdminView } from './components/AdminView';
import { SignupModal } from './components/SignupModal';

const MEMBER_STORAGE_KEY = 'ashitamo:isMember';

export default function App() {
  // Initialize current page based on browser path (/admin -> 'admin')
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash === '#admin') {
        return 'admin';
      }
      if (path === '/home' || hash === '#home') {
        return 'home';
      }
    }
    return 'lp';
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-01');
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [members, setMembers] = useState<MemberItem[]>(MOCK_MEMBERS);
  const [reports, setReports] = useState<ReportItem[]>(MOCK_REPORTS);

  // Mock membership flag (persisted per browser so the signup modal is shown only once)
  const [isMember, setIsMember] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(MEMBER_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Sync with browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (path === '/home' || hash === '#home') {
        setCurrentPage('home');
      } else if (path === '/detail' || hash === '#detail') {
        setCurrentPage('detail');
      } else {
        setCurrentPage('lp');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Smooth navigation with browser History URL pushState
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined') {
      try {
        if (page === 'admin') {
          window.history.pushState({ page: 'admin' }, '', '/admin');
        } else if (page === 'home') {
          window.history.pushState({ page: 'home' }, '', '/home');
        } else if (page === 'lp') {
          window.history.pushState({ page: 'lp' }, '', '/');
        } else if (page === 'detail') {
          window.history.pushState({ page: 'detail' }, '', '/detail');
        }
      } catch (err) {
        // Fallback for sandboxed iframes where pushState may be restricted
        console.warn('History pushState fallback:', err);
      }
    }
  };

  // Entry point to the salon: members go straight in, others sign up first
  const handleEnterSalon = () => {
    if (isMember) {
      handleNavigate('home');
    } else {
      setIsSignupOpen(true);
    }
  };

  // Stable reference so the modal's Escape/scroll-lock effect doesn't re-run on every render
  const handleSignupClose = useCallback(() => setIsSignupOpen(false), []);

  const handleSignupComplete = () => {
    setIsMember(true);
    try {
      window.localStorage.setItem(MEMBER_STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable: membership lasts for this session only
    }
    setIsSignupOpen(false);
    handleNavigate('home');
  };

  const handleSignupSkip = () => {
    setIsSignupOpen(false);
    handleNavigate('home');
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({ page: 'detail', id: projectId }, '', `/detail?id=${projectId}`);
      } catch (err) {
        // Fallback
      }
    }
  };

  const handleAddComment = (projectId: string, newComment: CommentItem) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          return {
            ...proj,
            comments: [newComment, ...proj.comments],
          };
        }
        return proj;
      })
    );
  };

  const handleCreateProject = (newProject: ProjectItem) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleDeleteReport = (reportId: string) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
  };

  const handleDismissReport = (reportId: string) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
  };

  const handleUpdateMemberStatus = (memberId: string, newStatus: MemberItem['status']) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, status: newStatus } : m))
    );
  };

  // Find currently selected project or fallback to first
  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Top Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} onEnterSalon={handleEnterSalon} />

      {/* Main Page View router */}
      <main className="flex-1">
        {currentPage === 'lp' && (
          <LPView onNavigate={handleNavigate} onEnterSalon={handleEnterSalon} />
        )}

        {currentPage === 'home' && (
          <HomeView
            projects={projects}
            onSelectProject={handleSelectProject}
            onNavigateToAdmin={() => handleNavigate('admin')}
            onCreateProject={handleCreateProject}
          />
        )}

        {currentPage === 'detail' && (
          <DetailView
            project={currentProject}
            onBack={() => handleNavigate('home')}
            onAddComment={handleAddComment}
          />
        )}

        {currentPage === 'admin' && (
          <AdminView
            members={members}
            reports={reports}
            onBack={() => handleNavigate('home')}
            onDeleteReport={handleDeleteReport}
            onDismissReport={handleDismissReport}
            onUpdateMemberStatus={handleUpdateMemberStatus}
          />
        )}
      </main>

      {isSignupOpen && (
        <SignupModal
          onClose={handleSignupClose}
          onComplete={handleSignupComplete}
          onSkip={handleSignupSkip}
        />
      )}
    </div>
  );
}
