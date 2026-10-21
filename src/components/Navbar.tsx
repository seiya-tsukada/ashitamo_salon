import React from 'react';
import { PageType } from '../types';
import { LayoutDashboard, Sparkles, Shield, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(currentPage === 'admin' ? 'home' : 'lp')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-white text-base shadow-sm group-hover:scale-105 transition-transform">
              ア
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                アシタモハレルヤ
              </span>
              <span className="text-[10px] font-mono text-stone-500 tracking-wider -mt-1 hidden sm:block">
                COMMUNITY SALON
              </span>
            </div>
          </button>

          {currentPage === 'admin' && (
            <span className="ml-2 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              /admin
            </span>
          )}
        </div>

        {/* Zone 2: Navigation Links / View Switchers */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* Quick Page View Switcher */}
          <div className="flex items-center p-1 bg-stone-100 border border-stone-200 rounded-xl text-xs">
            <button
              onClick={() => onNavigate('lp')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                currentPage === 'lp'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              LP
            </button>
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                currentPage === 'home' || currentPage === 'detail'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              サロン
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                currentPage === 'admin'
                  ? 'bg-white text-amber-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>/admin 管理</span>
            </button>
          </div>
        </nav>

        {/* Zone 3: User Profile & Admin Toggle */}
        <div className="flex items-center gap-3">
          {currentPage === 'lp' ? (
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              サロンに入る
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {/* Admin Switcher */}
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

              {/* User Profile */}
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                  alt="佐藤 匠"
                  className="w-8 h-8 rounded-full border border-stone-300 object-cover shadow-xs"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-stone-900 leading-none">
                    佐藤 匠
                  </span>
                  <span className="text-[10px] text-amber-700 font-medium mt-0.5">
                    Pro Member
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
