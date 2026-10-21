import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Check, Lock } from 'lucide-react';

interface SignupModalProps {
  onClose: () => void;
  onComplete: () => void;
  onSkip: () => void;
}

type Step = 'account' | 'payment' | 'done';

const STEPS: { key: Exclude<Step, 'done'>; label: string }[] = [
  { key: 'account', label: 'アカウント登録' },
  { key: 'payment', label: 'お支払い' },
];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors';

export const SignupModal: React.FC<SignupModalProps> = ({ onClose, onComplete, onSkip }) => {
  const [step, setStep] = useState<Step>('account');

  // Close on Escape and lock background scroll while open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  // Mock only: no payment is actually processed
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('done');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-stone-950/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        className="relative w-full sm:max-w-md max-h-[92svh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#FAF8F5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5">
          <button
            onClick={onSkip}
            className="px-3 py-1.5 rounded-full border border-dashed border-stone-300 text-[11px] font-semibold text-stone-500 hover:text-stone-900 hover:border-stone-500 transition-colors cursor-pointer"
          >
            スキップ（モック用）
          </button>
          <button
            onClick={onClose}
            aria-label="閉じる"
            className="p-2 -mr-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-8 pt-4">
          {step !== 'done' && (
            <>
              {/* Step indicator */}
              <ol className="flex items-center gap-3 text-[11px] font-semibold">
                {STEPS.map((s, i) => {
                  const isActive = s.key === step;
                  const isDone = step === 'payment' && s.key === 'account';
                  return (
                    <li key={s.key} className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isActive || isDone ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {isDone ? <Check className="w-3 h-3" /> : i + 1}
                      </span>
                      <span className={isActive ? 'text-stone-900' : 'text-stone-400'}>{s.label}</span>
                      {i < STEPS.length - 1 && <span className="w-6 h-px bg-stone-300" />}
                    </li>
                  );
                })}
              </ol>

              <h2 id="signup-title" className="mt-6 text-2xl font-black tracking-tight text-stone-900">
                {step === 'account' ? 'サロンに参加する' : 'お支払い情報'}
              </h2>
            </>
          )}

          {step === 'account' && (
            <form onSubmit={handleAccountSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-stone-600">お名前</span>
                <input required type="text" autoComplete="name" placeholder="山田 太郎" className={`mt-1.5 ${inputClass}`} />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-stone-600">メールアドレス</span>
                <input required type="email" autoComplete="email" placeholder="you@example.com" className={`mt-1.5 ${inputClass}`} />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-stone-600">パスワード</span>
                <input
                  required
                  type="password"
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="8文字以上"
                  className={`mt-1.5 ${inputClass}`}
                />
              </label>
              <button
                type="submit"
                className="group w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-stone-900 text-white text-sm font-bold hover:bg-stone-700 transition-colors cursor-pointer"
              >
                次へ
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              {/* Mock only: jump to the payment step without filling the form */}
              <button
                type="button"
                onClick={() => setStep('payment')}
                className="w-full px-4 py-2.5 rounded-full border border-dashed border-stone-300 text-xs font-semibold text-stone-500 hover:text-stone-900 hover:border-stone-500 transition-colors cursor-pointer"
              >
                入力せずに支払い画面へ（モック用）
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="mt-6 space-y-4">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-stone-200">
                <span className="text-sm font-semibold text-stone-900">アシタモハレルヤ 月額プラン</span>
                <span className="text-sm font-bold text-stone-900">¥1,000<span className="text-xs font-normal text-stone-500"> / 月</span></span>
              </div>
              <label className="block">
                <span className="text-xs font-semibold text-stone-600">カード番号</span>
                <input
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456"
                  className={`mt-1.5 ${inputClass} font-mono`}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-semibold text-stone-600">有効期限</span>
                  <input required autoComplete="cc-exp" placeholder="MM / YY" className={`mt-1.5 ${inputClass} font-mono`} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-stone-600">セキュリティコード</span>
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    className={`mt-1.5 ${inputClass} font-mono`}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-stone-900 text-white text-sm font-bold hover:bg-stone-700 transition-colors cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                登録して支払う（月額 1,000円）
              </button>
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setStep('account')}
                  className="text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  ← 戻る
                </button>
                <span className="text-stone-400">※ モックのため実際の決済は行われません</span>
              </div>
            </form>
          )}

          {step === 'done' && (
            <div className="pt-6 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>
              <h2 id="signup-title" className="mt-6 text-2xl font-black tracking-tight text-stone-900">
                ようこそ、アシタモハレルヤへ。
              </h2>
              <p className="mt-3 text-sm text-stone-600">さっそく仲間の企画をのぞいてみましょう。</p>
              <button
                onClick={onComplete}
                className="group w-full mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-stone-900 text-white text-sm font-bold hover:bg-stone-700 transition-colors cursor-pointer"
              >
                サロンへ進む
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
