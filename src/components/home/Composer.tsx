import React, { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { Message } from '../../types';

interface ComposerProps {
  placeholder: string;
  replyTo: Message | null;
  onCancelReply: () => void;
  onSend: (body: string) => Promise<void>;
}

export const Composer: React.FC<ComposerProps> = ({ placeholder, replyTo, onCancelReply, onSend }) => {
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Choosing "返信" moves focus here so the user can type right away
  useEffect(() => {
    if (replyTo) textareaRef.current?.focus();
  }, [replyTo]);

  const submit = async () => {
    const trimmed = body.trim();
    if (!trimmed || isSending) return;
    setIsSending(true);
    try {
      await onSend(trimmed);
      setBody('');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter breaks the line; ignore Enter that confirms IME conversion
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
    if (e.key === 'Escape' && replyTo) onCancelReply();
  };

  return (
    <div className="px-4 sm:px-6 pb-4 pt-2">
      <div className="rounded-xl border border-stone-300 bg-white focus-within:border-stone-900 transition-colors">
        {replyTo && (
          <div className="flex items-center gap-2 px-3 pt-2.5 text-xs text-stone-500">
            <span className="shrink-0 font-semibold text-amber-700">返信先: {replyTo.author.displayName}</span>
            <span className="truncate">{replyTo.body}</span>
            <button
              onClick={onCancelReply}
              aria-label="返信をやめる"
              className="ml-auto p-0.5 rounded text-stone-400 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <div className="flex items-end gap-2 p-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 resize-none max-h-40 px-2 py-1.5 text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none field-sizing-content"
          />
          <button
            onClick={submit}
            disabled={!body.trim() || isSending}
            aria-label="送信"
            className="p-2 rounded-lg bg-stone-900 text-white hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-400 transition-colors cursor-pointer disabled:cursor-default"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="mt-1.5 text-[10px] text-stone-400">Enter で送信 / Shift + Enter で改行</p>
    </div>
  );
};
