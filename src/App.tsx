import { useState, useEffect, useCallback } from 'react';
import { PageType, ProjectItem, CommentItem, MemberItem, MemberStatus, ReportItem } from './types';
import { INITIAL_PROJECTS, MOCK_MEMBERS, MOCK_REPORTS } from './data/mockData';
import { DEFAULT_PROJECT_ID, PAGE_PATHS } from './constants/routes';
import { MEMBER_STORAGE_KEY } from './constants/storage';
import { resolvePageFromLocation } from './utils/routing';
import { Navbar } from './components/layout/Navbar';
import { LPView } from './components/lp/LPView';
import { HomeView } from './components/home/HomeView';
import { DetailView } from './components/detail/DetailView';
import { AdminView } from './components/admin/AdminView';
import { SignupModal } from './components/signup/SignupModal';

export default function App() {
  // Initial page comes from the URL; /detail is not restored on first load (no project id yet)
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const page = resolvePageFromLocation();
    return page === 'detail' ? 'lp' : page;
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>(DEFAULT_PROJECT_ID);
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

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => setCurrentPage(resolvePageFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({ page }, '', PAGE_PATHS[page]);
    } catch (err) {
      // pushState can throw in restricted contexts; navigation still works without URL sync
      console.warn('History pushState fallback:', err);
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
    try {
      window.history.pushState({ page: 'detail', id: projectId }, '', `${PAGE_PATHS.detail}?id=${projectId}`);
    } catch {
      // Same as handleNavigate: URL sync is best-effort
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

  // Both deleting the content and dismissing the report resolve it, removing it from the queue
  const resolveReport = (reportId: string) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
  };

  const handleUpdateMemberStatus = (memberId: string, newStatus: MemberStatus) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, status: newStatus } : m))
    );
  };

  // Find currently selected project or fallback to first
  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} onEnterSalon={handleEnterSalon} />

      <main className="flex-1">
        {currentPage === 'lp' && (
          <LPView onNavigate={handleNavigate} onEnterSalon={handleEnterSalon} />
        )}

        {currentPage === 'home' && (
          <HomeView
            projects={projects}
            onSelectProject={handleSelectProject}
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
            onDeleteReport={resolveReport}
            onDismissReport={resolveReport}
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
