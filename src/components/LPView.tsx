import React from 'react';
import { ArrowRight, Heart, Sparkles, CheckCircle2, Users, Coffee, BookOpen, Layers } from 'lucide-react';
import { PageType } from '../types';

interface LPViewProps {
  onNavigate: (page: PageType) => void;
}

export const LPView: React.FC<LPViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col selection:bg-amber-200 selection:text-stone-900">
      {/* Heartful First View / Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-amber-50/60 via-[#FAF8F5] to-[#FAF8F5]">
        {/* Soft warm ambient blur circles */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heartful Copy & Warm Call-to-Action */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              {/* Soft warm pill tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/70 text-xs font-semibold text-amber-900 shadow-xs">
                <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>人と人をつなぐ、温かな共創オンラインサロン</span>
              </div>

              {/* Main Catchphrase */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.15] text-balance">
                ただの観客で終わるな。<br />
                <span className="text-orange-600 relative inline-block">
                  仕掛け人になれ。
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-300/40 -z-10 rounded-sm transform -rotate-1" />
                </span>
              </h1>

              {/* Heartfelt Description */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                ひとりでは創れないものを、仲間とカタチにする。書籍編集、ものづくり、街のカルチャーフェス。
                想いを持った1,400名が集い、互いをあたたかく応援しながらプロジェクトを育てる共創コミュニティ。
              </p>

              {/* Primary Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('home')}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-[0_6px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.45)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-100" />
                  <span>仲間になってプロジェクトを始める（月額 3,000円）</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Gentle Trust Signals */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> 初心者・未経験者の参加も大歓迎
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> いつでも自由にお休み・解約可能
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> まずは見学・交流から気軽に参加OK
                </span>
              </div>
            </div>

            {/* Right Column: Heartful Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-white p-2 shadow-xl shadow-stone-200/50 group">
                <div className="rounded-xl overflow-hidden relative">
                  <img
                    src="/images/hero_heartful_creative_1792395804494.jpg"
                    alt="アシタモハレルヤのあたたかなメンバー共創風景"
                    className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/11] transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-lg bg-white/95 backdrop-blur-md border border-stone-100 shadow-md">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900 flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-amber-600" />
                        TOKYO STUDIO &amp; LOUNGE
                      </span>
                      <span className="text-amber-800 font-mono text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        心地よい制作風景
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-stone-600 line-clamp-1">
                      『NEW PARADIGM』編集チームがカフェ感覚でアイデアを壁打ち中
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Stats Strip (Warm & Clean) */}
          <div className="mt-14 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="space-y-1 bg-white/80 p-4 rounded-xl border border-stone-200/70 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                1,428<span className="text-amber-600 text-lg font-normal ml-0.5">名</span>
              </div>
              <div className="text-xs text-stone-500">現役クリエイター・編集者</div>
            </div>
            <div className="space-y-1 bg-white/80 p-4 rounded-xl border border-stone-200/70 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                84<span className="text-amber-600 text-lg font-normal ml-0.5">件</span>
              </div>
              <div className="text-xs text-stone-500">立ち上げ成立プロジェクト数</div>
            </div>
            <div className="space-y-1 bg-white/80 p-4 rounded-xl border border-stone-200/70 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                ¥58.4M<span className="text-amber-600 text-sm font-normal ml-0.5"></span>
              </div>
              <div className="text-xs text-stone-500">クラファン・自社流通調達累計</div>
            </div>
            <div className="space-y-1 bg-white/80 p-4 rounded-xl border border-stone-200/70 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                98.2<span className="text-amber-600 text-lg font-normal ml-0.5">%</span>
              </div>
              <div className="text-xs text-stone-500">会員プロジェクト参加満足度</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Activity Cards (Minowa Editing Lab Vibe in Warm Atmosphere) */}
      <section className="py-16 md:py-24 relative bg-[#FAF8F5]">
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

      {/* Manifesto / Heartfelt Culture Quote */}
      <section className="py-16 bg-amber-50/60 border-y border-amber-200/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full" />
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 leading-snug tracking-tight">
            “ひとりでは辿り着けない場所へ、仲間がいるから行ける。<br />
            まずは気軽にお茶を飲むように、現場へ飛び込もう。”
          </blockquote>
          <p className="text-xs sm:text-sm text-amber-800 font-medium">
            アシタモハレルヤ コミュニティ・マニフェスト より
          </p>
        </div>
      </section>

      {/* Warm Final CTA Section */}
      <section className="py-16 md:py-24 relative bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-xl shadow-stone-200/50 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              あなたの「やってみたい」を、ここでカタチに。
            </h2>
            <p className="mt-4 text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              入会後すぐにプロジェクトタイムラインへアクセスし、好きな企画への参加申請や、自ら新しいプロジェクトを起案できます。温かな仲間があなたを待っています。
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-[0_6px_25px_rgba(245,158,11,0.35)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <span>仲間になってプロジェクトを始める（月額 3,000円）</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 text-xs text-stone-500">
              ※ クレジットカード決済完了後、1分でサロン内コミュニティへ合流可能
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Demo Admin Link (Pointing to /admin) */}
      <footer className="mt-auto py-8 border-t border-stone-200 bg-white text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-stone-900 tracking-wider text-sm">アシタモハレルヤ</span>
            <span className="text-stone-300">·</span>
            <span>© 2026 アシタモハレルヤ All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
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
