import React from 'react';
import { Hash } from 'lucide-react';
import { Channel, ChatMember } from '../../types';
import { Conversation } from './Conversation';

interface ChatPaneProps {
  channel: Channel | undefined;
  me: ChatMember;
}

export const ChatPane: React.FC<ChatPaneProps> = ({ channel, me }) => {
  if (!channel) return <div className="flex-1" />;

  return (
    <section className="flex-1 min-w-0 flex flex-col">
      <header className="shrink-0 px-4 sm:px-6 py-3 border-b border-stone-200">
        <h1 className="flex items-center gap-1 text-base font-bold text-stone-900">
          <Hash className="w-4 h-4 text-stone-400" />
          {channel.name}
        </h1>
        <p className="text-xs text-stone-500 truncate">{channel.description}</p>
      </header>
      <Conversation
        key={channel.id}
        conversationId={channel.id}
        me={me}
        placeholder={`#${channel.name} へのメッセージ`}
        emptyLabel="まだメッセージはありません。最初のひとことをどうぞ。"
      />
    </section>
  );
};
