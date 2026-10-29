import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, MessageSquare, Plus } from 'lucide-react';
import { ChatMember, Topic, TopicStatus } from '../../types';
import { formatMessageTime } from '../../utils/datetime';
import { Avatar } from '../ui/Avatar';
import { Conversation } from './Conversation';
import { NewTopicForm } from './NewTopicForm';

type TopicFilter = 'open' | 'done' | 'all';

const TOPIC_FILTERS: { key: TopicFilter; label: string }[] = [
  { key: 'open', label: '未完了' },
  { key: 'done', label: '完了' },
  { key: 'all', label: 'すべて' },
];

interface TopicsPaneProps {
  topics: Topic[];
  me: ChatMember;
  onCreateTopic: (title: string, body: string) => Promise<Topic>;
  onSetTopicStatus: (topicId: string, status: TopicStatus) => Promise<Topic>;
}

const nextStatus = (topic: Topic): TopicStatus => (topic.status === 'open' ? 'done' : 'open');

const StatusToggle: React.FC<{ topic: Topic; onToggle: () => void }> = ({ topic, onToggle }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    aria-label={topic.status === 'open' ? '完了にする' : '未完了に戻す'}
    title={topic.status === 'open' ? '完了にする' : '未完了に戻す'}
    className="shrink-0 mt-0.5 text-stone-400 hover:text-emerald-600 transition-colors cursor-pointer"
  >
    {topic.status === 'done' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5" />}
  </button>
);

export const TopicsPane: React.FC<TopicsPaneProps> = ({ topics, me, onCreateTopic, onSetTopicStatus }) => {
  const [filter, setFilter] = useState<TopicFilter>('open');
  const [isCreating, setIsCreating] = useState(false);
  // null = nothing picked yet: desktop falls back to the first topic, mobile shows the list
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visibleTopics = topics.filter((t) => filter === 'all' || t.status === filter);
  const selected = topics.find((t) => t.id === selectedId) ?? visibleTopics[0];

  const toggleStatus = (topic: Topic) => onSetTopicStatus(topic.id, nextStatus(topic));

  const handleCreate = async (title: string, body: string) => {
    const topic = await onCreateTopic(title, body);
    setIsCreating(false);
    setFilter('open');
    setSelectedId(topic.id);
  };

  return (
    <div className="flex-1 min-w-0 flex">
      {/* Topic list (todo-like) */}
      <section
        className={`${selectedId ? 'hidden md:flex' : 'flex'} w-full md:w-80 shrink-0 flex-col border-r border-stone-200 bg-stone-50/60`}
      >
        <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-stone-200">
          <h1 className="text-base font-bold text-stone-900">トピック</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-900 text-xs font-bold text-white hover:bg-stone-700 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            新規
          </button>
        </header>

        {isCreating && <NewTopicForm onCreate={handleCreate} onCancel={() => setIsCreating(false)} />}

        <div className="shrink-0 flex gap-1 px-3 py-2 border-b border-stone-200">
          {TOPIC_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filter === f.key ? 'bg-white text-stone-900 shadow-xs border border-stone-200' : 'text-stone-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="flex-1 min-h-0 overflow-y-auto">
          {visibleTopics.length === 0 && <li className="px-4 py-8 text-sm text-stone-400">トピックはありません。</li>}
          {visibleTopics.map((topic) => (
            <li key={topic.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedId(topic.id)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedId(topic.id)}
                className={`flex items-start gap-3 px-4 py-3 border-b border-stone-200/70 cursor-pointer transition-colors ${
                  selected?.id === topic.id ? 'bg-white' : 'hover:bg-white/70'
                }`}
              >
                <StatusToggle topic={topic} onToggle={() => toggleStatus(topic)} />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold leading-snug ${
                      topic.status === 'done' ? 'text-stone-400 line-through' : 'text-stone-900'
                    }`}
                  >
                    {topic.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-stone-400">
                    <Avatar member={topic.author} className="w-4 h-4" />
                    <span className="truncate">{topic.author.displayName}</span>
                    <span className="inline-flex items-center gap-0.5">
                      <MessageSquare className="w-3 h-3" />
                      {topic.commentCount}
                    </span>
                    <span className="ml-auto font-mono">{formatMessageTime(topic.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Selected topic and its comments */}
      <section className={`${selectedId ? 'flex' : 'hidden md:flex'} flex-1 min-w-0 flex-col`}>
        {selected ? (
          <>
            <header className="shrink-0 flex items-start gap-3 px-4 sm:px-6 py-3 border-b border-stone-200">
              <button
                onClick={() => setSelectedId(null)}
                aria-label="一覧に戻る"
                className="md:hidden -ml-1 mt-0.5 p-1 rounded text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <StatusToggle topic={selected} onToggle={() => toggleStatus(selected)} />
              <h2 className="flex-1 text-base font-bold text-stone-900 leading-snug">{selected.title}</h2>
              <button
                onClick={() => toggleStatus(selected)}
                className="hidden sm:inline-flex shrink-0 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-600 hover:border-stone-400 hover:text-stone-900 cursor-pointer"
              >
                {selected.status === 'open' ? '完了にする' : '未完了に戻す'}
              </button>
            </header>
            <Conversation
              key={selected.id}
              conversationId={selected.id}
              me={me}
              placeholder="コメントを書く"
              emptyLabel="まだコメントはありません。"
              header={
                <div className="flex items-start gap-3 px-4 sm:px-6 pt-5 pb-4 border-b border-stone-100">
                  <Avatar member={selected.author} />
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-stone-900">{selected.author.displayName}</span>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {formatMessageTime(selected.createdAt)}
                      </span>
                    </div>
                    {selected.body && (
                      <p className="mt-1 text-sm text-stone-800 leading-relaxed whitespace-pre-wrap break-words">
                        {selected.body}
                      </p>
                    )}
                  </div>
                </div>
              }
            />
          </>
        ) : (
          <p className="m-auto text-sm text-stone-400">トピックを選んでください。</p>
        )}
      </section>
    </div>
  );
};
