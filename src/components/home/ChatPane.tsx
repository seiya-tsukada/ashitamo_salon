import React from 'react';
import { MAIN_CHAT_ID } from '../../constants/chat';
import { ChatMember } from '../../types';
import { Conversation } from './Conversation';

interface ChatPaneProps {
  me: ChatMember;
}

export const ChatPane: React.FC<ChatPaneProps> = ({ me }) => (
  <section className="flex-1 min-w-0 flex flex-col">
    <header className="shrink-0 px-4 sm:px-6 py-3 border-b border-stone-200">
      <h1 className="text-base font-bold text-stone-900">チャット</h1>
      <p className="text-xs text-stone-500 truncate">サロンメンバー全員の会話</p>
    </header>
    <Conversation
      conversationId={MAIN_CHAT_ID}
      me={me}
      placeholder="メッセージを書く"
      emptyLabel="まだメッセージはありません。最初のひとことをどうぞ。"
    />
  </section>
);
