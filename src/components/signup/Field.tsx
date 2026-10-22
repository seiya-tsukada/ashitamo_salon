import React from 'react';

export const INPUT_CLASS =
  'mt-1.5 w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors';

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="text-xs font-semibold text-stone-600">{label}</span>
    {children}
  </label>
);
