import React, { useState } from 'react';
import { PASSWORD_MIN_LENGTH } from '../../constants/signup';
import { isAuthConfigured } from '../../lib/auth';
import { Button, ButtonArrow } from '../ui/Button';
import { Field, FormError, INPUT_CLASS, SwitchModeLink } from './Field';
import { useSubmit } from './useSubmit';

interface AccountStepProps {
  onSignUp: (email: string, password: string, displayName: string) => Promise<void>;
  onNext: () => void;
  onSwitchToLogin: () => void;
}

export const AccountStep: React.FC<AccountStepProps> = ({ onSignUp, onNext, onSwitchToLogin }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { submit, isSubmitting, error } = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(async () => {
      await onSignUp(email, password, displayName);
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <Field label="お名前">
        <input
          required
          type="text"
          maxLength={50}
          autoComplete="name"
          placeholder="山田 太郎"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>
      <Field label="メールアドレス">
        <input
          required
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>
      <Field label="パスワード">
        <input
          required
          type="password"
          minLength={PASSWORD_MIN_LENGTH}
          autoComplete="new-password"
          placeholder={`${PASSWORD_MIN_LENGTH}文字以上`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>
      {error && <FormError message={error} />}
      <Button variant="dark" type="submit" disabled={isSubmitting} className="group w-full mt-2 px-6 py-4">
        {isSubmitting ? '登録中…' : '次へ'}
        <ButtonArrow />
      </Button>
      <SwitchModeLink prompt="すでにアカウントをお持ちの方は" label="ログイン" onClick={onSwitchToLogin} />
      {/* Mock only (no Supabase configured): jump to the payment step without creating an account */}
      {!isAuthConfigured && (
        <button
          type="button"
          onClick={onNext}
          className="w-full px-4 py-2.5 rounded-full border border-dashed border-stone-300 text-xs font-semibold text-stone-500 hover:text-stone-900 hover:border-stone-500 transition-colors cursor-pointer"
        >
          入力せずに支払い画面へ（モック用）
        </button>
      )}
    </form>
  );
};
