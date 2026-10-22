import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ActionToastProps {
  message: string;
  onClose: () => void;
}

export const ActionToast: React.FC<ActionToastProps> = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-white border border-amber-300 text-xs text-stone-900 shadow-xl shadow-stone-200 flex items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
      <span>{message}</span>
    </div>
    <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
      <X className="w-3.5 h-3.5" />
    </button>
  </div>
);
