import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PageType } from '../types';

interface LPViewProps {
  onNavigate: (page: PageType) => void;
  onEnterSalon: () => void;
}

export const LPView: React.FC<LPViewProps> = ({ onNavigate, onEnterSalon }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col selection:bg-amber-200 selection:text-stone-900">
      {/* First View: full-bleed key visual */}
      <section className="relative isolate min-h-[calc(100svh-4rem)] flex items-end overflow-hidden bg-stone-900">
        <img
          src="/images/hero_heartful_creative_1792395804494.jpg"
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
            明日が、<br />
            <span className="inline-block">待ち遠しくなる</span>
            <span className="inline-block">場所。</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm sm:text-base leading-loose text-stone-200">
            雑誌をつくる。プロダクトを生み出す。まちにフェスを仕掛ける。
            <br className="hidden sm:block" />
            ひとりでは始められないことを、仲間と一緒にカタチにするオンラインサロンです。
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={onEnterSalon}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-stone-900 text-sm sm:text-base font-bold hover:bg-amber-50 transition-colors cursor-pointer"
            >
              サロンに参加する
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <a
              href="#activities"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/40 text-white text-sm sm:text-base font-semibold hover:bg-white/10 transition-colors"
            >
              活動をのぞいてみる
            </a>
          </div>
        </div>
      </section>

      {/* 3 Activity Cards (Minowa Editing Lab Vibe in Warm Atmosphere) */}
      <section id="activities" className="py-16 md:py-24 relative bg-[#FAF8F5] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-bold text-amber-700 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>CORE ACTIVITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                机上の空論はいらない。<br />
                心躍るアウトプットを、仲間と一緒に。
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed">
              講義を聴くだけの受け身なサロンではありません。アシタモハレルヤでは全員が温かな仲間として現場に入り、手を動かして世の中に優しい感動を届けます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: 雑誌編集 */}
            <div className="group rounded-2xl bg-white border border-stone-200/80 shadow-md shadow-stone-200/40 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-amber-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src="/images/warm_publishing_lab_1792395805210.jpg"
                  alt="温もりある雑誌・書籍編集プロジェクト"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/90 border border-stone-200 text-[11px] font-mono font-bold text-amber-800 backdrop-blur-sm shadow-xs">
                  01 / PUBLISHING
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    雑誌・書籍の自社出版
                  </h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                    大手取次や商業出版の枠組みを飛び越え、企画、取材、執筆、DTP組版、手触りのある紙選びまでメンバー自ら主導。心に残るカルチャー誌をクラウドファンディングと直販で全国へ届けます。
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>進行中プロジェクト</span>
                  <span className="font-semibold text-stone-800">『NEW PARADIGM』創刊</span>
                </div>
              </div>
            </div>

            {/* Card 2: プロダクト開発 */}
            <div className="group rounded-2xl bg-white border border-stone-200/80 shadow-md shadow-stone-200/40 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-amber-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src="/images/warm_product_design_1792395807048.jpg"
                  alt="ものづくり・プロダクト開発"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/90 border border-stone-200 text-[11px] font-mono font-bold text-amber-800 backdrop-blur-sm shadow-xs">
                  02 / PRODUCT DEV
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    手触りのあるものづくり・プロダクト
                  </h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                    木材や3Dプリンタを駆使した自然な手触りのプロトタイピングから、パッケージング、Kickstarterでの資金調達まで。暮らしに寄り添う心地よいガジェットを生み出します。
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>進行中プロジェクト</span>
                  <span className="font-semibold text-stone-800">触覚デバイス『ODYSSEY-01』</span>
                </div>
              </div>
            </div>

            {/* Card 3: 地方創生・フェス */}
            <div className="group rounded-2xl bg-white border border-stone-200/80 shadow-md shadow-stone-200/40 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-amber-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src="/images/warm_community_fest_1792395806083.jpg"
                  alt="地方創生・あかりのリアルフェス"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/90 border border-stone-200 text-[11px] font-mono font-bold text-amber-800 backdrop-blur-sm shadow-xs">
                  03 / REGIONAL FESTIVAL
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    廃校ジャック &amp; あかりのリアルフェス
                  </h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                    地方自治体や酒蔵とタッグを組み、過疎地域の廃校を丸ごと2日間あたたかい文化祭へ変貌。夕暮れのランタン演出、クラフト料理開発まで、全員が笑顔で共創します。
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>進行中プロジェクト</span>
                  <span className="font-semibold text-stone-800">『PARK FES 2026』</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto & Final CTA */}
      <section className="py-24 md:py-32 bg-stone-900 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-amber-200/80">
            OUR MANIFESTO
          </p>
          <h2
            className="mt-6 font-black tracking-tight text-white whitespace-nowrap"
            style={{ fontSize: 'min(3rem, calc((100vw - 2rem) / 17.5))' }}
          >
            ひとりでは行けない場所へ、仲間と。
          </h2>

          <div className="mt-12 flex justify-center">
            <button
              onClick={onEnterSalon}
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white text-stone-900 text-sm sm:text-base font-bold hover:bg-amber-50 transition-colors cursor-pointer"
            >
              サロンに参加する
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Demo Admin Link (Pointing to /admin) */}
      <footer className="mt-auto py-8 border-t border-stone-200 bg-white text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-stone-900 tracking-wider text-sm whitespace-nowrap">アシタモハレルヤ</span>
            <span className="text-stone-300">·</span>
            <span>© 2026 アシタモハレルヤ All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onEnterSalon}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              サロンタイムラインを見る
            </button>
            <span className="text-stone-300">|</span>
            {/* Admin Demo Button under /admin required by user brief */}
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
