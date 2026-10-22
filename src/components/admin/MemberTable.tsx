import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { MemberItem, MemberStatus } from '../../types';
import { MEMBER_STATUS_FILTERS, MEMBER_STATUS_STYLES, MemberStatusFilter } from '../../constants/admin';
import { SearchInput } from '../ui/SearchInput';

interface MemberTableProps {
  members: MemberItem[];
  onRetryPayment: (memberId: string, name: string) => void;
  onUpdateMemberStatus: (memberId: string, newStatus: MemberStatus) => void;
}

export const MemberTable: React.FC<MemberTableProps> = ({ members, onRetryPayment, onUpdateMemberStatus }) => {
  const [memberFilter, setMemberFilter] = useState<MemberStatusFilter>('すべて');
  const [memberSearch, setMemberSearch] = useState('');

  const query = memberSearch.toLowerCase();
  const filteredMembers = members.filter((m) => {
    const matchesFilter = memberFilter === 'すべて' || m.status === memberFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.id.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
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

          <SearchInput
            value={memberSearch}
            onChange={setMemberSearch}
            placeholder="会員名やIDで検索..."
            iconClassName="w-3.5 h-3.5"
            inputClassName="pl-8 pr-3 py-1.5 bg-stone-50 rounded-lg w-full sm:w-48"
          />
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
                      onClick={() => onRetryPayment(member.id, member.name)}
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
  );
};
