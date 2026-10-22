import React from 'react';
import { Sparkles } from 'lucide-react';
import { PageType } from '../../types';
import { IMAGES } from '../../constants/images';
import { SITE_NAME, COPYRIGHT_YEAR } from '../../constants/site';
import { LP_ACTIVITIES } from '../../data/lpActivities';
import { Button, ButtonArrow } from '../ui/Button';
import { ActivityCard } from './ActivityCard';

interface LPViewProps {
  onNavigate: (page: PageType) => void;
  onEnterSalon: () => void;
}

export const LPView: React.FC<LPViewProps> = ({ onNavigate, onEnterSalon }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col selection:bg-amber-200 selection:text-stone-900">
      {/* First view: full-bleed key visual */}
      <section className="relative isolate min-h-[calc(100svh-4rem)] flex items-end overflow-hidden bg-stone-900">
        <img
          src={IMAGES.hero}
          alt="テーブルを囲んでアイデアを出し合うメンバーたち"
          className="absolute inset-0 -z-10 w-full h-full object-cover object-[60%_center]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-stone-950/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/70 via-stone-950/20 to-transparent" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-32 md:pb-20">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-amber-200/90">
            ONLINE CREATIVE SALON
          </p>

          <h1 className="mt-5 text-[2rem] leading-[1.3] sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
            明日が、
            <br />
            <span className="inline-block">待ち遠しくなる</span>
            <span className="inline-block">場所。</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm sm:text-base leading-loose text-stone-200">
            雑誌をつくる。プロダクトを生み出す。まちにフェスを仕掛ける。
            <br className="hidden sm:block" />
            ひとりでは始められないことを、仲間と一緒にカタチにするオンラインサロンです。
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Button variant="light" onClick={onEnterSalon} className="group px-8 py-4 text-sm sm:text-base">
              サロンに参加する
              <ButtonArrow />
            </Button>
            <a
              href="#activities"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/40 text-white text-sm sm:text-base font-semibold hover:bg-white/10 transition-colors"
            >
              活動をのぞいてみる
            </a>
          </div>
        </div>
      </section>

      {/* Core activities */}
      <section id="activities" className="py-16 md:py-24 relative bg-[#FAF8F5] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-bold text-amber-700 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>CORE ACTIVITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                机上の空論はいらない。
                <br />
                心躍るアウトプットを、仲間と一緒に。
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed">
              講義を聴くだけの受け身なサロンではありません。{SITE_NAME}
              では全員が温かな仲間として現場に入り、手を動かして世の中に優しい感動を届けます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LP_ACTIVITIES.map((activity) => (
              <ActivityCard key={activity.label} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto & final CTA */}
      <section className="py-24 md:py-32 bg-stone-900 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-amber-200/80">OUR MANIFESTO</p>
          <h2
            className="mt-6 font-black tracking-tight text-white whitespace-nowrap"
            style={{ fontSize: 'min(3rem, calc((100vw - 2rem) / 17.5))' }}
          >
            ひとりでは行けない場所へ、仲間と。
          </h2>

          <div className="mt-12 flex justify-center">
            <Button variant="light" onClick={onEnterSalon} className="group px-10 py-4 text-sm sm:text-base">
              サロンに参加する
              <ButtonArrow />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-stone-200 bg-white text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-stone-900 tracking-wider text-sm whitespace-nowrap">{SITE_NAME}</span>
            <span className="text-stone-300">·</span>
            <span>
              © {COPYRIGHT_YEAR} {SITE_NAME} All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onEnterSalon} className="hover:text-stone-900 transition-colors cursor-pointer">
              サロンタイムラインを見る
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-orange-700 border border-stone-200 transition-all cursor-pointer font-mono text-xs"
            >
              <span>⚙️ 管理画面ビュー（/admin）</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
