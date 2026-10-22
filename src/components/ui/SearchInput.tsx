import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  iconClassName: string;
  inputClassName: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  iconClassName,
  inputClassName,
}) => (
  <div className={`relative ${className}`}>
    <Search className={`${iconClassName} text-stone-400 absolute left-3 top-1/2 -translate-y-1/2`} />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputClassName} border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500`}
    />
  </div>
);
