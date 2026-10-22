import React from 'react';
import { Check } from 'lucide-react';
import { SIGNUP_STEPS, SignupStep } from '../../constants/signup';

export const StepIndicator: React.FC<{ step: SignupStep }> = ({ step }) => (
  <ol className="flex items-center gap-3 text-[11px] font-semibold">
    {SIGNUP_STEPS.map((s, i) => {
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
          {i < SIGNUP_STEPS.length - 1 && <span className="w-6 h-px bg-stone-300" />}
        </li>
      );
    })}
  </ol>
);
