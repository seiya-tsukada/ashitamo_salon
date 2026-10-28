import React, { useState } from 'react';
import { Button, ButtonArrow } from '../ui/Button';
import { Field, FormError, INPUT_CLASS, SwitchModeLink } from './Field';
import { useSubmit } from './useSubmit';

interface LoginStepProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSwitchToSignup: () => void;
}

export const LoginStep: React.FC<LoginStepProps> = ({ onSignIn, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { submit, isSubmitting, error } = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(() => onSignIn(email, password));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>
      {error && <FormError message={error} />}
      <Button variant="dark" type="submit" disabled={isSubmitting} className="group w-full mt-2 px-6 py-4">
        {isSubmitting ? 'ログイン中…' : 'ログイン'}
        <ButtonArrow />
      </Button>
      <SwitchModeLink prompt="はじめての方は" label="新規登録" onClick={onSwitchToSignup} />
    </form>
  );
};
