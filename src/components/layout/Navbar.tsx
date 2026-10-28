import React from 'react';
import { PageType } from '../../types';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { SITE_NAME, SITE_SUBTITLE } from '../../constants/site';
import { CURRENT_USER } from '../../constants/currentUser';
import { SUBSCRIPTION_STATUS_LABELS } from '../../constants/billing';
import { AuthUser, isAuthConfigured } from '../../lib/auth';
import { Button } from '../ui/Button';

interface NavbarProps {
  currentPage: PageType;
  user: AuthUser | null;
  onNavigate: (page: PageType) => void;
  onEnterSalon: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

const LOGIN_BUTTON_CLASS =
  'px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer whitespace-nowrap';

export const Navbar: React.FC<NavbarProps> = ({ currentPage, user, onNavigate, onEnterSalon, onLogin, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(currentPage === 'admin' ? 'home' : 'lp')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-white text-base shadow-sm group-hover:scale-105 transition-transform">
              ア
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-base tracking-tight whitespace-nowrap text-stone-900 group-hover:text-orange-600 transition-colors">
                {SITE_NAME}
              </span>
              <span className="text-[10px] font-mono text-stone-500 tracking-wider -mt-1 hidden sm:block">
                {SITE_SUBTITLE}
              </span>
            </div>
          </button>

          {currentPage === 'admin' && (
            <span className="ml-2 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              /admin
            </span>
          )}
        </div>

        {/* Page switcher */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center p-1 bg-stone-100 border border-stone-200 rounded-xl text-xs whitespace-nowrap">
            <button
              onClick={() => onNavigate('lp')}
              className={`px-2 sm:px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                currentPage === 'lp'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              LP
            </button>
            <button
              onClick={onEnterSalon}
              className={`px-2 sm:px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                currentPage === 'home' || currentPage === 'detail'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              サロン
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`px-2 sm:px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                currentPage === 'admin'
                  ? 'bg-white text-amber-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>/admin 管理</span>
            </button>
          </div>
        </nav>

        {/* Right side: CTA on LP, user info elsewhere */}
        <div className="flex items-center gap-3">
          {currentPage === 'lp' ? (
            <>
              {isAuthConfigured && !user && (
                <button onClick={onLogin} className={LOGIN_BUTTON_CLASS}>
                  ログイン
                </button>
              )}
              <Button
                variant="gradient"
                onClick={onEnterSalon}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg shadow-sm whitespace-nowrap"
              >
                サロンに入る
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate(currentPage === 'admin' ? 'home' : 'admin')}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  currentPage === 'admin'
                    ? 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300 hover:text-orange-600 shadow-xs'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-600" />
                <span>{currentPage === 'admin' ? '← サロンに戻る' : '/admin 管理者へ'}</span>
              </button>

              {user ? (
                <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-xs">
                    {user.display_name.slice(0, 1)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-stone-900 leading-none">{user.display_name}</span>
                    <span className="text-[10px] text-amber-700 font-medium mt-0.5">
                      {SUBSCRIPTION_STATUS_LABELS[user.subscription.status]}
                    </span>
                  </div>
                  <button
                    onClick={onLogout}
                    aria-label="ログアウト"
                    title="ログアウト"
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : isAuthConfigured ? (
                <button onClick={onLogin} className={LOGIN_BUTTON_CLASS}>
                  ログイン
                </button>
              ) : (
                // Mock user shown while Supabase is not configured
                <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                  <img
                    src={CURRENT_USER.avatarThumb}
                    alt={CURRENT_USER.displayName}
                    className="w-8 h-8 rounded-full border border-stone-300 object-cover shadow-xs"
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-stone-900 leading-none">
                      {CURRENT_USER.displayName}
                    </span>
                    <span className="text-[10px] text-amber-700 font-medium mt-0.5">{CURRENT_USER.planLabel}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
