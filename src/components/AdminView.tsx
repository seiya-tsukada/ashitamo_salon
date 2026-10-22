import React, { useState } from 'react';
import { MemberItem, MemberStatus, ReportItem } from '../types';
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  Trash2,
  CheckCircle2,
  RefreshCw,
  ShieldAlert,
  Search,
  X,
} from 'lucide-react';
import { SITE_NAME } from '../constants/site';
import {
  ADMIN_STATS,
  MEMBER_STATUS_FILTERS,
  MEMBER_STATUS_STYLES,
  MemberStatusFilter,
  TOAST_DURATION_MS,
} from '../constants/admin';

interface AdminViewProps {
  members: MemberItem[];
  reports: ReportItem[];
  onBack: () => void;
  onDeleteReport: (reportId: string) => void;
  onDismissReport: (reportId: string) => void;
  onUpdateMemberStatus: (memberId: string, newStatus: MemberStatus) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  members,
  reports,
  onBack,
  onDeleteReport,
  onDismissReport,
  onUpdateMemberStatus,
}) => {
  const [memberFilter, setMemberFilter] = useState<MemberStatusFilter>('すべて');
  const [memberSearch, setMemberSearch] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActionNotice(message);
    setTimeout(() => {
      setActionNotice(null);
    }, TOAST_DURATION_MS);
  };

  const query = memberSearch.toLowerCase();
  const filteredMembers = members.filter((m) => {
    const matchesFilter = memberFilter === 'すべて' || m.status === memberFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.id.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const handleDeleteReport = (id: string, title: string) => {
    onDeleteReport(id);
    showToast(`通報対象のコンテンツ「${title}」を削除し、通報を解決済みにしました。`);
  };

  const handleDismissReport = (id: string) => {
    onDismissReport(id);
    showToast(`通報を「違反なし（却下）」として処理しました。`);
  };

  const handleRetryPayment = (memberId: string, name: string) => {
    onUpdateMemberStatus(memberId, 'アクティブ');
    showToast(`${name}様の再決済リトライが成功し、「アクティブ」へ変更されました。`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 pb-28">
      {/* Toast */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-white border border-amber-300 text-xs text-stone-900 shadow-xl shadow-stone-200 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-stone-400 hover:text-stone-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-orange-600 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>← サロンに戻る</span>
            </button>

            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300">/admin</span>
                <span className="text-stone-400">/</span>
                <span>{SITE_NAME} CORE OPERATIONS</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-0.5">
                サロン運営管理ダッシュボード
              </h1>
            </div>
          </div>

          <div className="text-xs text-stone-500 font-mono flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              URLパス: /admin (正常稼働中)
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>総会員数</span>
              <Users className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              {ADMIN_STATS.totalMembers}<span className="text-sm font-normal text-stone-500 ml-1">名</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{ADMIN_STATS.memberGrowth}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>今月の売上 (MRR)</span>
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              {ADMIN_STATS.monthlyRevenue}
            </div>
            <div className="mt-3 text-xs text-stone-500">
              決済成功率 <span className="text-stone-800 font-bold font-mono">{ADMIN_STATS.paymentSuccessRate}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>アクティブ率</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              {ADMIN_STATS.activeRate}<span className="text-sm font-normal text-stone-500 ml-1">%</span>
            </div>
            <div className="mt-3 text-xs text-stone-500">
              月次DAU/MAU比 · 投稿・コメント関与
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>未処理通報数</span>
              <AlertTriangle className={`w-4 h-4 ${reports.length > 0 ? 'text-amber-600' : 'text-stone-400'}`} />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums flex items-baseline gap-2">
              <span className={reports.length > 0 ? 'text-amber-600' : 'text-stone-500'}>
                {reports.length}
              </span>
              <span className="text-sm font-normal text-stone-500">件</span>
            </div>
            <div className="mt-3 text-xs text-stone-500">
              {reports.length > 0 ? '要モデレーション対応' : 'すべての通報が処理済み'}
            </div>
          </div>
        </div>

        {/* Report moderation */}
        <section className="rounded-2xl bg-white border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <h2 className="text-lg font-bold text-stone-900">
                  通報モデレーション
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold tabular-nums">
                  {reports.length} 件
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-600">
                サロン規約違反の疑いがある投稿・コメントの監視キュー。「削除」ボタンをクリックすると即座に非公開化・削除されます。
              </p>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500 flex flex-col items-center justify-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <span>未処理の通報はありません。サロン内の健全性が保たれています。</span>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-stone-300"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-[11px] text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {report.id}
                      </span>
                      <span className="font-mono font-bold text-amber-800">
                        [{report.targetType}]
                      </span>
                      <span className="text-stone-900 font-bold">
                        {report.targetTitle}
                      </span>
                      <span className="text-stone-400 font-mono text-[11px]">
                        · {report.timestamp}
                      </span>
                    </div>

                    <div className="text-xs text-rose-800 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                      <strong className="text-rose-900 font-semibold mr-1">通報理由:</strong>
                      {report.reason}
                    </div>

                    <div className="text-[11px] text-stone-600 flex items-center gap-4">
                      <span>対象ユーザー: <strong className="text-stone-900">{report.reportedUser}</strong></span>
                      <span>通報者: <strong className="text-stone-900">{report.reporterUser}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => handleDismissReport(report.id)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      違反なし（却下）
                    </button>
                    <button
                      onClick={() => handleDeleteReport(report.id, report.targetTitle)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>削除する</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Member management */}
        <section className="rounded-2xl bg-white border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                会員ステータス管理
              </h2>
              <p className="mt-1 text-xs text-stone-600">
                参加メンバーの課金状態、所属プロジェクト、アカウント稼働状況の一覧。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Status tabs */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 border border-stone-200 rounded-lg text-xs">
                {MEMBER_STATUS_FILTERS.map((st) => (
                  <button
                    key={st}
                    onClick={() => setMemberFilter(st)}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      memberFilter === st
                        ? 'bg-white text-stone-900 font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="会員名やIDで検索..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 w-full sm:w-48"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-mono uppercase text-[11px]">
                  <th className="py-3 px-4">会員情報</th>
                  <th className="py-3 px-4">プラン</th>
                  <th className="py-3 px-4">参加日</th>
                  <th className="py-3 px-4 text-center">参加プロジェクト</th>
                  <th className="py-3 px-4">ステータス</th>
                  <th className="py-3 px-4 text-right">アクション</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full border border-stone-200 object-cover shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                            <span>{member.name}</span>
                            <span className="text-[10px] font-mono text-stone-400">
                              {member.id}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {member.email} · {member.role}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-stone-700">
                      {member.monthlyPlan}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-stone-500 tabular-nums">
                      {member.joinedAt}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono tabular-nums text-stone-800">
                      <span className="font-bold">{member.activeProjects}</span> 案件
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${MEMBER_STATUS_STYLES[member.status].badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${MEMBER_STATUS_STYLES[member.status].dot}`} />
                        {member.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {member.status === '決済エラー' ? (
                        <button
                          onClick={() => handleRetryPayment(member.id, member.name)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[11px] font-bold text-rose-700 transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>再決済試行</span>
                        </button>
                      ) : member.status === '休会中' ? (
                        <button
                          onClick={() => onUpdateMemberStatus(member.id, 'アクティブ')}
                          className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          復帰処理
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateMemberStatus(member.id, '休会中')}
                          className="px-2.5 py-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-800 text-[11px] transition-colors cursor-pointer"
                        >
                          休会へ変更
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
