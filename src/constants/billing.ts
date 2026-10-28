import { SubscriptionStatus } from '../lib/auth';
import { MemberStatus } from '../types';

// DB subscription status <-> label shown in the UI
export const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, MemberStatus> = {
  pending: '新規',
  active: 'アクティブ',
  past_due: '決済エラー',
  paused: '休会中',
  canceled: '退会',
};

export const MEMBER_STATUS_TO_SUBSCRIPTION = Object.fromEntries(
  Object.entries(SUBSCRIPTION_STATUS_LABELS).map(([status, label]) => [label, status]),
) as Record<MemberStatus, SubscriptionStatus>;

export const PLAN_LABELS: Record<string, string> = {
  monthly_1000: '月額 1,000円',
};

// Payment isn't integrated yet: the payment form is a mock and the salon gate offers a skip
export const IS_PAYMENT_MOCK = true;

// Only paying members get into the salon
export const canEnterSalon = (status: SubscriptionStatus | undefined) => status === 'active';

// Shown on the payment step when a logged-in member is stopped at the gate
export const GATE_NOTICES: Partial<Record<SubscriptionStatus, string>> = {
  past_due: '前回のお支払いに失敗しました。お支払い情報を更新するとサロンに戻れます。',
  paused: '休会中です。お支払いを再開するとサロンに戻れます。',
  canceled: '退会済みです。再度お支払いいただくとサロンに戻れます。',
};
