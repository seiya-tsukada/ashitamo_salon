import React from 'react';

export const INPUT_CLASS =
  'mt-1.5 w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors';

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="text-xs font-semibold text-stone-600">{label}</span>
    {children}
  </label>
);

export const FormError: React.FC<{ message: string }> = ({ message }) => (
  <p role="alert" className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
    {message}
  </p>
);

export const SwitchModeLink: React.FC<{ prompt: string; label: string; onClick: () => void }> = ({
  prompt,
  label,
  onClick,
}) => (
  <p className="text-center text-xs text-stone-500">
    {prompt}
    <button
      type="button"
      onClick={onClick}
      className="ml-1 font-semibold text-stone-900 underline underline-offset-2 hover:text-orange-600 cursor-pointer"
    >
      {label}
    </button>
  </p>
);
