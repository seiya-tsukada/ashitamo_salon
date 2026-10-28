import React, { useState } from 'react';

interface NewTopicFormProps {
  onCreate: (title: string, body: string) => Promise<void>;
  onCancel: () => void;
}

const INPUT_CLASS =
  'w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors';

export const NewTopicForm: React.FC<NewTopicFormProps> = ({ onCreate, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onCreate(title.trim(), body.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 space-y-2 border-b border-stone-200 bg-amber-50/40">
      <input
        autoFocus
        required
        maxLength={100}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル（例: 表紙デザインを決める）"
        className={INPUT_CLASS}
      />
      <textarea
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="内容（任意）"
        className={`${INPUT_CLASS} resize-none`}
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="px-3 py-1.5 rounded-lg bg-stone-900 text-xs font-bold text-white hover:bg-stone-700 disabled:bg-stone-300 cursor-pointer disabled:cursor-default"
        >
          作成
        </button>
      </div>
    </form>
  );
};
