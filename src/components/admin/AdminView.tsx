import React, { useState } from 'react';
import { MemberItem, MemberStatus, ReportItem } from '../../types';
import { TOAST_DURATION_MS } from '../../constants/admin';
import { ActionToast } from './ActionToast';
import { AdminHeader } from './AdminHeader';
import { KpiCards } from './KpiCards';
import { MemberTable } from './MemberTable';
import { ReportQueue } from './ReportQueue';

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
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActionNotice(message);
    setTimeout(() => {
      setActionNotice(null);
    }, TOAST_DURATION_MS);
  };

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
      {actionNotice && <ActionToast message={actionNotice} onClose={() => setActionNotice(null)} />}

      <AdminHeader onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        <KpiCards reportCount={reports.length} />
        <ReportQueue reports={reports} onDelete={handleDeleteReport} onDismiss={handleDismissReport} />
        <MemberTable
          members={members}
          onRetryPayment={handleRetryPayment}
          onUpdateMemberStatus={onUpdateMemberStatus}
        />
      </div>
    </div>
  );
};
