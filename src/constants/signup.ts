export type SignupStep = 'account' | 'payment' | 'done';

export const SIGNUP_STEPS: { key: Exclude<SignupStep, 'done'>; label: string }[] = [
  { key: 'account', label: 'アカウント登録' },
  { key: 'payment', label: 'お支払い' },
];

export const MONTHLY_FEE = {
  display: '¥1,000',
  label: '月額 1,000円',
};

export const PASSWORD_MIN_LENGTH = 8;
