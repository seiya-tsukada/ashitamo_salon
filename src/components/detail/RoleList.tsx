import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { ProjectItem } from '../../types';
import { GRADIENT_CLASSES } from '../ui/Button';

interface RoleListProps {
  roles: ProjectItem['fullContent']['rolesNeeded'];
  onApply: (roleName: string) => void;
}

export const RoleList: React.FC<RoleListProps> = ({ roles, onApply }) => {
  const [appliedRoles, setAppliedRoles] = useState<string[]>([]);

  const handleApply = (roleName: string) => {
    if (appliedRoles.includes(roleName)) return;
    setAppliedRoles([...appliedRoles, roleName]);
    onApply(roleName);
  };

  return (
    <div className="mt-4 space-y-3">
      {roles.map((r, idx) => {
        const isApplied = appliedRoles.includes(r.role);
        return (
          <div
            key={idx}
            className="p-4 rounded-xl bg-stone-50/80 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-900 text-sm">{r.role}</span>
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {r.count}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-600">{r.description}</p>
            </div>

            <button
              onClick={() => handleApply(r.role)}
              disabled={isApplied}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                isApplied ? 'bg-stone-200 text-stone-600 cursor-default' : `${GRADIENT_CLASSES} text-white shadow-xs`
              }`}
            >
              {isApplied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-stone-700" />
                  <span>立候補済み</span>
                </>
              ) : (
                <span>この役割に立候補する</span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
