import React from 'react';
import { Reply } from 'lucide-react';
import { Message } from '../../types';
import { formatMessageTime } from '../../utils/datetime';
import { Avatar } from '../ui/Avatar';

interface MessageItemProps {
  message: Message;
  // The quoted message, or null when it isn't in the loaded list
  replyTo: Message | null;
  onReply: (message: Message) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, replyTo, onReply }) => (
  <li className="group relative flex items-start gap-3 px-4 sm:px-6 py-2.5 hover:bg-stone-50 transition-colors">
    <Avatar member={message.author} />
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-bold text-stone-900">{message.author.displayName}</span>
        <time dateTime={message.createdAt} className="text-[11px] text-stone-400 font-mono">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>

      {message.replyToId && (
        <p className="mt-1 pl-3 border-l-2 border-amber-300 text-xs text-stone-500 truncate">
          {replyTo ? (
            <>
              <span className="font-semibold text-stone-700">{replyTo.author.displayName}</span>
              <span className="ml-1.5">{replyTo.body}</span>
            </>
          ) : (
            '元のメッセージは表示できません'
          )}
        </p>
      )}

      <p className="mt-0.5 text-sm text-stone-800 leading-relaxed whitespace-pre-wrap break-words">{message.body}</p>
    </div>

    <button
      onClick={() => onReply(message)}
      aria-label="返信"
      title="返信"
      // Always visible on touch-sized screens, where there is no hover
      className="absolute right-4 top-1.5 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-stone-200 shadow-xs text-[11px] font-semibold text-stone-600 hover:text-stone-900 transition-opacity cursor-pointer"
    >
      <Reply className="w-3.5 h-3.5" />
      返信
    </button>
  </li>
);
