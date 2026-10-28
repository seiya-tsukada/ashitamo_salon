import { useState, useEffect, useCallback } from 'react';
import { PageType, ProjectItem, CommentItem, MemberItem, MemberStatus, ReportItem } from './types';
import { INITIAL_PROJECTS, MOCK_MEMBERS, MOCK_REPORTS } from './data/mockData';
import { DEFAULT_PROJECT_ID, PAGE_PATHS } from './constants/routes';
import { MEMBER_STATUS_TO_SUBSCRIPTION, canEnterSalon } from './constants/billing';
import { MOCK_SALON_PASS_STORAGE_KEY } from './constants/storage';
import { useAuth } from './hooks/useAuth';
import { adminListMembers, adminSetSubscriptionStatus } from './lib/auth';
import { toMemberItem } from './utils/member';
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

  const auth = useAuth();
  const isAdmin = auth.user?.role === 'admin';
  const subscriptionStatus = auth.user?.subscription.status;
  // Payment is still a mock: finishing it (persisted) or skipping it (this visit only) also opens the gate
  const [hasMockPass, setHasMockPass] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(MOCK_SALON_PASS_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const isSalonOpen = canEnterSalon(subscriptionStatus) || hasMockPass;
  const isSalonPage = currentPage === 'home' || currentPage === 'detail';
  const [signupStep, setSignupStep] = useState<'login' | 'account' | 'payment' | null>(null);

  // Admins see real members from the DB; everyone else keeps the mock list
  useEffect(() => {
    if (currentPage !== 'admin' || !isAdmin) return;
    adminListMembers()
      .then((users) => setMembers(users.map(toMemberItem)))
      .catch((err) => console.error('Failed to load members:', err));
  }, [currentPage, isAdmin]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => setCurrentPage(resolvePageFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // The salon gate: logged-in members without an active subscription go to payment, everyone else signs up
  const gateStep = auth.user ? 'payment' : 'account';
  const openSalonGate = () => setSignupStep(gateStep);

  // Landing on a salon URL directly (or via back/forward) shows the LP with the gate open instead
  const isGated = !auth.isRestoring && isSalonPage && !isSalonOpen;
  const modalStep = signupStep ?? (isGated ? gateStep : null);

  // Unchecked navigation, for callers that have just opened the gate themselves
  const goTo = useCallback((page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({ page }, '', PAGE_PATHS[page]);
    } catch (err) {
      // pushState can throw in restricted contexts; navigation still works without URL sync
      console.warn('History pushState fallback:', err);
    }
  }, []);

  const handleNavigate = (page: PageType) => {
    if ((page === 'home' || page === 'detail') && !isSalonOpen) {
      openSalonGate();
      return;
    }
    goTo(page);
  };

  const handleEnterSalon = () => handleNavigate('home');

  // Stable reference so the modal's Escape/scroll-lock effect doesn't re-run on every render
  const handleSignupClose = useCallback(() => {
    setSignupStep(null);
    if (isGated) goTo('lp');
  }, [isGated, goTo]);

  const handleSignupComplete = () => {
    setHasMockPass(true);
    try {
      window.localStorage.setItem(MOCK_SALON_PASS_STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable: the pass lasts for this visit only
    }
    setSignupStep(null);
    goTo('home');
  };

  const handleSignupEnter = () => {
    setSignupStep(null);
    goTo('home');
  };

  const handleSignupSkip = () => {
    setHasMockPass(true);
    setSignupStep(null);
    goTo('home');
  };

  const handleLogout = async () => {
    // Leave the salon first so the gate doesn't fire for the now logged-out visitor
    goTo('lp');
    setHasMockPass(false);
    try {
      window.localStorage.removeItem(MOCK_SALON_PASS_STORAGE_KEY);
    } catch {
      // Nothing to clear
    }
    setMembers(MOCK_MEMBERS);
    await auth.signOut();
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
      }),
    );
  };

  const handleCreateProject = (newProject: ProjectItem) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  // Both deleting the content and dismissing the report resolve it, removing it from the queue
  const resolveReport = (reportId: string) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
  };

  const handleUpdateMemberStatus = async (memberId: string, newStatus: MemberStatus) => {
    if (!isAdmin) {
      setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, status: newStatus } : m)));
      return;
    }
    try {
      const updated = toMemberItem(
        await adminSetSubscriptionStatus(memberId, MEMBER_STATUS_TO_SUBSCRIPTION[newStatus]),
      );
      setMembers((prev) => prev.map((m) => (m.id === memberId ? updated : m)));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : String(err));
    }
  };

  // Find currently selected project or fallback to first
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      <Navbar
        currentPage={currentPage}
        user={auth.user}
        onNavigate={handleNavigate}
        onEnterSalon={handleEnterSalon}
        onLogin={() => setSignupStep('login')}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {(currentPage === 'lp' || isGated) && <LPView onNavigate={handleNavigate} onEnterSalon={handleEnterSalon} />}

        {currentPage === 'home' && isSalonOpen && (
          <HomeView projects={projects} onSelectProject={handleSelectProject} onCreateProject={handleCreateProject} />
        )}

        {currentPage === 'detail' && isSalonOpen && (
          <DetailView project={currentProject} onBack={() => handleNavigate('home')} onAddComment={handleAddComment} />
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

      {modalStep && (
        <SignupModal
          initialStep={modalStep}
          subscriptionStatus={subscriptionStatus}
          onSignUp={auth.signUp}
          onSignIn={auth.signIn}
          onClose={handleSignupClose}
          onComplete={handleSignupComplete}
          onEnter={handleSignupEnter}
          onSkip={handleSignupSkip}
        />
      )}
    </div>
  );
}
