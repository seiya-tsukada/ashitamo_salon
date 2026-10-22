import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { SITE_NAME } from '../../constants/site';

export const AdminHeader: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <section className="bg-white border-b border-stone-200 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-orange-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>← サロンに戻る</span>
        </button>

        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider">
            <span className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300">/admin</span>
            <span className="text-stone-400">/</span>
            <span>{SITE_NAME} CORE OPERATIONS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-0.5">
            サロン運営管理ダッシュボード
          </h1>
        </div>
      </div>

      <div className="text-xs text-stone-500 font-mono flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          URLパス: /admin (正常稼働中)
        </span>
      </div>
    </div>
  </section>
);
