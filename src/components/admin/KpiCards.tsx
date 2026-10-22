import React from 'react';
import { AlertTriangle, DollarSign, TrendingUp, Users } from 'lucide-react';
import { ADMIN_STATS } from '../../constants/admin';

interface KpiCardProps {
  label: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  valueClassName?: string;
  footer: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, icon, value, valueClassName = '', footer }) => (
  <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
      <span>{label}</span>
      {icon}
    </div>
    <div className={`text-3xl font-extrabold text-stone-900 font-mono tabular-nums ${valueClassName}`}>{value}</div>
    {footer}
  </div>
);

export const KpiCards: React.FC<{ reportCount: number }> = ({ reportCount }) => {
  const hasReports = reportCount > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <KpiCard
        label="総会員数"
        icon={<Users className="w-4 h-4 text-amber-600" />}
        value={
          <>
            {ADMIN_STATS.totalMembers}
            <span className="text-sm font-normal text-stone-500 ml-1">名</span>
          </>
        }
        footer={
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{ADMIN_STATS.memberGrowth}</span>
          </div>
        }
      />

      <KpiCard
        label="今月の売上 (MRR)"
        icon={<DollarSign className="w-4 h-4 text-amber-600" />}
        value={ADMIN_STATS.monthlyRevenue}
        footer={
          <div className="mt-3 text-xs text-stone-500">
            決済成功率 <span className="text-stone-800 font-bold font-mono">{ADMIN_STATS.paymentSuccessRate}</span>
          </div>
        }
      />

      <KpiCard
        label="アクティブ率"
        icon={<TrendingUp className="w-4 h-4 text-amber-600" />}
        value={
          <>
            {ADMIN_STATS.activeRate}
            <span className="text-sm font-normal text-stone-500 ml-1">%</span>
          </>
        }
        footer={<div className="mt-3 text-xs text-stone-500">月次DAU/MAU比 · 投稿・コメント関与</div>}
      />

      <KpiCard
        label="未処理通報数"
        icon={<AlertTriangle className={`w-4 h-4 ${hasReports ? 'text-amber-600' : 'text-stone-400'}`} />}
        valueClassName="flex items-baseline gap-2"
        value={
          <>
            <span className={hasReports ? 'text-amber-600' : 'text-stone-500'}>{reportCount}</span>
            <span className="text-sm font-normal text-stone-500">件</span>
          </>
        }
        footer={
          <div className="mt-3 text-xs text-stone-500">
            {hasReports ? '要モデレーション対応' : 'すべての通報が処理済み'}
          </div>
        }
      />
    </div>
  );
};
