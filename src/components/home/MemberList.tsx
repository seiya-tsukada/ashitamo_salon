import React from 'react';
import { ChatMember, ChatMemberPresence } from '../../types';
import { formatLastSeen, isOnline } from '../../utils/presence';
import { Avatar } from '../ui/Avatar';

interface MemberListProps {
  members: ChatMemberPresence[];
  me: ChatMember;
}

// Avatar with the online lamp in the corner
const PresenceAvatar: React.FC<{ member: ChatMemberPresence; online: boolean; className: string }> = ({
  member,
  online,
  className,
}) => (
  <span className="relative shrink-0">
    <Avatar member={member} className={className} />
    <span
      className={`absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-stone-900 ${
        online ? 'bg-sky-400' : 'bg-stone-600'
      }`}
    />
  </span>
);

const sortByPresence = (members: ChatMemberPresence[]) =>
  members
    .map((member) => ({ member, online: isOnline(member.lastSeenAt) }))
    .sort(
      (a, b) =>
        Number(b.online) - Number(a.online) || (b.member.lastSeenAt ?? '').localeCompare(a.member.lastSeenAt ?? ''),
    );

// Sidebar list (desktop): online members first, offline ones dimmed with their last activity
export const MemberList: React.FC<MemberListProps> = ({ members, me }) => {
  const rows = sortByPresence(members);
  const onlineCount = rows.filter((r) => r.online).length;

  return (
    <div className="p-2">
      <p className="flex items-baseline justify-between px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
        メンバー
        <span className="normal-case tracking-normal font-normal">オンライン {onlineCount}</span>
      </p>
      <ul>
        {rows.map(({ member, online }) => (
          <li
            key={member.id}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm ${online ? 'text-stone-200' : 'text-stone-500'}`}
          >
            <PresenceAvatar member={member} online={online} className="w-6 h-6 text-[11px]" />
            <span className="flex-1 min-w-0 truncate">
              {member.displayName}
              {member.id === me.id && <span className="ml-1 text-[11px] text-stone-500">（自分）</span>}
            </span>
            {!online && <span className="shrink-0 text-[10px]">{formatLastSeen(member.lastSeenAt)}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Compact strip (mobile): online members only
export const OnlineMemberStrip: React.FC<{ members: ChatMemberPresence[] }> = ({ members }) => {
  const online = sortByPresence(members).filter((r) => r.online);

  return (
    <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto">
      <span className="shrink-0 text-[11px] text-stone-400">オンライン {online.length}</span>
      {online.map(({ member }) => (
        <PresenceAvatar key={member.id} member={member} online className="w-6 h-6 text-[11px]" />
      ))}
    </div>
  );
};
