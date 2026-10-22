import { MemberStatus } from '../types';

export const TOAST_DURATION_MS = 3500;

export type MemberStatusFilter = 'すべて' | Exclude<MemberStatus, '新規'>;

export const MEMBER_STATUS_FILTERS: readonly MemberStatusFilter[] = ['すべて', 'アクティブ', '決済エラー', '休会中'];

export const MEMBER_STATUS_STYLES: Record<MemberStatus, { badge: string; dot: string }> = {
  アクティブ: { badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' },
  決済エラー: { badge: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  休会中: { badge: 'bg-stone-100 text-stone-600 border-stone-200', dot: 'bg-stone-400' },
  新規: { badge: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
};

// Static KPI figures for the dashboard mock
export const ADMIN_STATS = {
  totalMembers: '1,428',
  memberGrowth: '前月比 +12.4% (純増 158名)',
  monthlyRevenue: '¥1,428,000',
  paymentSuccessRate: '98.2%',
  activeRate: '84.6',
};
