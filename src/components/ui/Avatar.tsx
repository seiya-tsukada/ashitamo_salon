import React from 'react';
import { ChatMember } from '../../types';

interface AvatarProps {
  member: ChatMember;
  className?: string;
}

// Photo when available, otherwise the first character of the name
export const Avatar: React.FC<AvatarProps> = ({ member, className = 'w-9 h-9' }) =>
  member.avatarUrl ? (
    <img
      src={member.avatarUrl}
      alt={member.displayName}
      className={`${className} rounded-lg object-cover shrink-0 border border-stone-200`}
      referrerPolicy="no-referrer"
    />
  ) : (
    <div
      aria-label={member.displayName}
      className={`${className} rounded-lg shrink-0 bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold text-white`}
    >
      {member.displayName.slice(0, 1)}
    </div>
  );
