import { PLAN_LABELS, SUBSCRIPTION_STATUS_LABELS } from '../constants/billing';
import { AuthUser } from '../lib/auth';
import { MemberItem } from '../types';

// DB user -> row shown in the admin member table
export const toMemberItem = (user: AuthUser): MemberItem => ({
  id: user.id,
  name: user.display_name,
  email: user.email,
  avatar: '',
  role: user.role === 'admin' ? '運営' : 'メンバー',
  joinedAt: new Date(user.created_at).toLocaleDateString('ja-JP'),
  activeProjects: 0,
  status: SUBSCRIPTION_STATUS_LABELS[user.subscription.status],
  monthlyPlan: PLAN_LABELS[user.subscription.plan] ?? user.subscription.plan,
});
