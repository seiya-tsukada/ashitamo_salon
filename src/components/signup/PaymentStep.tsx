import React from 'react';
import { Lock } from 'lucide-react';
import { SITE_NAME } from '../../constants/site';
import { MONTHLY_FEE } from '../../constants/signup';
import { Button } from '../ui/Button';
import { Field, INPUT_CLASS } from './Field';

interface PaymentStepProps {
  onSubmit: () => void;
  onBack: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ onSubmit, onBack }) => {
  // Mock only: no payment is actually processed
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-stone-200">
        <span className="text-sm font-semibold text-stone-900">{SITE_NAME} 月額プラン</span>
        <span className="text-sm font-bold text-stone-900">
          {MONTHLY_FEE.display}
          <span className="text-xs font-normal text-stone-500"> / 月</span>
        </span>
      </div>
      <Field label="カード番号">
        <input
          required
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          className={`${INPUT_CLASS} font-mono`}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="有効期限">
          <input required autoComplete="cc-exp" placeholder="MM / YY" className={`${INPUT_CLASS} font-mono`} />
        </Field>
        <Field label="セキュリティコード">
          <input
            required
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            className={`${INPUT_CLASS} font-mono`}
          />
        </Field>
      </div>
      <Button variant="dark" type="submit" className="w-full mt-2 px-6 py-4">
        <Lock className="w-4 h-4" />
        登録して支払う（{MONTHLY_FEE.label}）
      </Button>
      <div className="flex items-center justify-between text-xs">
        <button type="button" onClick={onBack} className="text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
          ← 戻る
        </button>
        <span className="text-stone-400">※ モックのため実際の決済は行われません</span>
      </div>
    </form>
  );
};
