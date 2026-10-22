import React from 'react';
import { ArrowRight } from 'lucide-react';

export const GRADIENT_CLASSES =
  'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600';

type ButtonVariant = 'gradient' | 'light' | 'dark';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Primary action inside the salon
  gradient: `font-bold text-white ${GRADIENT_CLASSES} transition-all cursor-pointer`,
  // White pill on the dark LP sections
  light:
    'inline-flex items-center justify-center gap-3 rounded-full bg-white text-stone-900 font-bold hover:bg-amber-50 transition-colors cursor-pointer',
  // Dark pill used in the signup flow
  dark: 'inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 text-white text-sm font-bold hover:bg-stone-700 transition-colors cursor-pointer',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

// Sizing and spacing come from className; the variant only sets colors and shape
export const Button: React.FC<ButtonProps> = ({ variant, className = '', ...props }) => (
  <button className={`${VARIANT_CLASSES[variant]} ${className}`} {...props} />
);

// Arrow that slides right on hover; the button needs the `group` class
export const ButtonArrow: React.FC = () => (
  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
);
