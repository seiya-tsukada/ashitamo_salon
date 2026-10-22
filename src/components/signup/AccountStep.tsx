import React from 'react';
import { PASSWORD_MIN_LENGTH } from '../../constants/signup';
import { Button, ButtonArrow } from '../ui/Button';
import { Field, INPUT_CLASS } from './Field';

interface AccountStepProps {
  onNext: () => void;
}

export const AccountStep: React.FC<AccountStepProps> = ({ onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <Field label="お名前">
        <input required type="text" autoComplete="name" placeholder="山田 太郎" className={INPUT_CLASS} />
      </Field>
      <Field label="メールアドレス">
        <input required type="email" autoComplete="email" placeholder="you@example.com" className={INPUT_CLASS} />
      </Field>
      <Field label="パスワード">
        <input
          required
          type="password"
          minLength={PASSWORD_MIN_LENGTH}
          autoComplete="new-password"
          placeholder={`${PASSWORD_MIN_LENGTH}文字以上`}
          className={INPUT_CLASS}
        />
      </Field>
      <Button variant="dark" type="submit" className="group w-full mt-2 px-6 py-4">
        次へ
        <ButtonArrow />
      </Button>
      {/* Mock only: jump to the payment step without filling the form */}
      <button
        type="button"
        onClick={onNext}
        className="w-full px-4 py-2.5 rounded-full border border-dashed border-stone-300 text-xs font-semibold text-stone-500 hover:text-stone-900 hover:border-stone-500 transition-colors cursor-pointer"
      >
        入力せずに支払い画面へ（モック用）
      </button>
    </form>
  );
};
