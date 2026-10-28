import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMessages } from '../../hooks/useChat';
import { ChatMember, Message } from '../../types';
import { Composer } from './Composer';
import { MessageItem } from './MessageItem';

interface ConversationProps {
  conversationId: string;
  me: ChatMember;
  placeholder: string;
  emptyLabel: string;
  // Rendered above the messages and scrolls with them (e.g. the topic body)
  header?: React.ReactNode;
}

// Message list + composer, shared by channels and topics.
// Render with key={conversationId} so the draft and reply target reset when switching.
export const Conversation: React.FC<ConversationProps> = ({ conversationId, me, placeholder, emptyLabel, header }) => {
  const { messages, isLoading, send } = useMessages(conversationId, me);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const messagesById = useMemo(() => new Map(messages.map((m) => [m.id, m])), [messages]);

  // Keep the latest message in view when the list loads or grows
  const messageCount = messages.length;
  useEffect(() => {
    if (messageCount > 0) bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messageCount]);

  const handleSend = async (body: string) => {
    await send(body, replyTo?.id ?? null);
    setReplyTo(null);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {header}
        {isLoading ? (
          <p className="px-6 py-8 text-sm text-stone-400">読み込み中…</p>
        ) : messages.length === 0 ? (
          <p className="px-6 py-8 text-sm text-stone-400">{emptyLabel}</p>
        ) : (
          <ul className="py-3">
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                replyTo={message.replyToId ? (messagesById.get(message.replyToId) ?? null) : null}
                onReply={setReplyTo}
              />
            ))}
          </ul>
        )}
        <div ref={bottomRef} />
      </div>
      <Composer
        placeholder={placeholder}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
        onSend={handleSend}
      />
    </div>
  );
};
