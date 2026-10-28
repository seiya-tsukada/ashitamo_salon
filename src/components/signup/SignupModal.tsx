import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { SITE_NAME } from '../../constants/site';
import { GATE_NOTICES, IS_PAYMENT_MOCK, canEnterSalon } from '../../constants/billing';
import { SignupStep } from '../../constants/signup';
import { AuthUser, SubscriptionStatus } from '../../lib/auth';
import { Button, ButtonArrow } from '../ui/Button';
import { AccountStep } from './AccountStep';
import { LoginStep } from './LoginStep';
import { PaymentStep } from './PaymentStep';
import { StepIndicator } from './StepIndicator';

interface SignupModalProps {
  initialStep: Exclude<SignupStep, 'done'>;
  // Set when a logged-in member is stopped at the gate
  subscriptionStatus?: SubscriptionStatus;
  onSignUp: (email: string, password: string, displayName: string) => Promise<void>;
  onSignIn: (email: string, password: string) => Promise<AuthUser>;
  onClose: () => void;
  // Mock payment finished
  onComplete: () => void;
  // Logged in as a member who can already enter
  onEnter: () => void;
  onSkip: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({
  initialStep,
  subscriptionStatus,
  onSignUp,
  onSignIn,
  onClose,
  onComplete,
  onEnter,
  onSkip,
}) => {
  const [step, setStep] = useState<SignupStep>(initialStep);

  const handleSignIn = async (email: string, password: string) => {
    const user = await onSignIn(email, password);
    if (canEnterSalon(user.subscription.status)) {
      onEnter();
    } else {
      setStep('payment');
    }
  };

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
        <div className="flex items-center justify-between px-6 pt-5">
          {/* Mock only (payment not integrated yet): get past the salon gate without paying */}
          {!IS_PAYMENT_MOCK ? (
            <span />
          ) : (
            <button
              onClick={onSkip}
              className="px-3 py-1.5 rounded-full border border-dashed border-stone-300 text-[11px] font-semibold text-stone-500 hover:text-stone-900 hover:border-stone-500 transition-colors cursor-pointer"
            >
              スキップ（モック用）
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="閉じる"
            className="p-2 -mr-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-8 pt-4">
          {step === 'login' && (
            <>
              <h2 id="signup-title" className="text-2xl font-black tracking-tight text-stone-900">
                ログイン
              </h2>
              <LoginStep onSignIn={handleSignIn} onSwitchToSignup={() => setStep('account')} />
            </>
          )}

          {(step === 'account' || step === 'payment') && (
            <>
              <StepIndicator step={step} />
              <h2 id="signup-title" className="mt-6 text-2xl font-black tracking-tight text-stone-900">
                {step === 'account' ? 'サロンに参加する' : 'お支払い情報'}
              </h2>
            </>
          )}

          {step === 'account' && (
            <AccountStep
              onSignUp={onSignUp}
              onNext={() => setStep('payment')}
              onSwitchToLogin={() => setStep('login')}
            />
          )}

          {step === 'payment' && (
            <PaymentStep
              notice={subscriptionStatus && GATE_NOTICES[subscriptionStatus]}
              onSubmit={() => setStep('done')}
              onBack={subscriptionStatus ? undefined : () => setStep('account')}
            />
          )}

          {step === 'done' && (
            <div className="pt-6 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>
              <h2 id="signup-title" className="mt-6 text-2xl font-black tracking-tight text-stone-900">
                ようこそ、{SITE_NAME}へ。
              </h2>
              <p className="mt-3 text-sm text-stone-600">さっそく仲間の企画をのぞいてみましょう。</p>
              <Button variant="dark" onClick={onComplete} className="group w-full mt-8 px-6 py-4">
                サロンへ進む
                <ButtonArrow />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
