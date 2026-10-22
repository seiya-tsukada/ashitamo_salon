import React from 'react';
import { CheckCircle2, ShieldAlert, Trash2 } from 'lucide-react';
import { ReportItem } from '../../types';

interface ReportQueueProps {
  reports: ReportItem[];
  onDelete: (reportId: string, title: string) => void;
  onDismiss: (reportId: string) => void;
}

export const ReportQueue: React.FC<ReportQueueProps> = ({ reports, onDelete, onDismiss }) => (
  <section className="rounded-2xl bg-white border border-stone-200 shadow-sm p-6 sm:p-8">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
      <div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <h2 className="text-lg font-bold text-stone-900">通報モデレーション</h2>
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
                <span className="font-mono font-bold text-amber-800">[{report.targetType}]</span>
                <span className="text-stone-900 font-bold">{report.targetTitle}</span>
                <span className="text-stone-400 font-mono text-[11px]">· {report.timestamp}</span>
              </div>

              <div className="text-xs text-rose-800 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                <strong className="text-rose-900 font-semibold mr-1">通報理由:</strong>
                {report.reason}
              </div>

              <div className="text-[11px] text-stone-600 flex items-center gap-4">
                <span>
                  対象ユーザー: <strong className="text-stone-900">{report.reportedUser}</strong>
                </span>
                <span>
                  通報者: <strong className="text-stone-900">{report.reporterUser}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
              <button
                onClick={() => onDismiss(report.id)}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
              >
                違反なし（却下）
              </button>
              <button
                onClick={() => onDelete(report.id, report.targetTitle)}
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
);
