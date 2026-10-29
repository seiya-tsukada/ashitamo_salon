import React, { useState } from 'react';
import { Hash, ListTodo, MessagesSquare } from 'lucide-react';
import { SITE_NAME } from '../../constants/site';
import { useChannels, useTopics } from '../../hooks/useChat';
import { ChatMember } from '../../types';
import { ChatPane } from './ChatPane';
import { TopicsPane } from './TopicsPane';

type HomeTab = 'chat' | 'topics';

interface HomeViewProps {
  me: ChatMember;
}

export const HomeView: React.FC<HomeViewProps> = ({ me }) => {
  const [tab, setTab] = useState<HomeTab>('chat');
  const channels = useChannels();
  const { topics, createTopic, setTopicStatus } = useTopics(me);
  const [channelId, setChannelId] = useState<string | null>(null);

  const activeChannel = channels.find((c) => c.id === channelId) ?? channels[0];
  const openTopicCount = topics.filter((t) => t.status === 'open').length;

  const selectChannel = (id: string) => {
    setTab('chat');
    setChannelId(id);
  };

  const tabButtonClass = (isActive: boolean) =>
    `w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${
      isActive ? 'bg-amber-500 text-white font-semibold' : 'text-stone-300 hover:bg-stone-800'
    }`;

  return (
    <div className="h-[calc(100svh-4rem)] flex flex-col md:flex-row bg-white">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-stone-900 text-stone-300">
        <div className="px-4 py-3 border-b border-stone-800">
          <p className="text-sm font-extrabold text-white">{SITE_NAME}</p>
          <p className="text-[11px] text-stone-400">{me.displayName}</p>
        </div>

        <nav className="p-2 space-y-0.5 border-b border-stone-800">
          <button onClick={() => setTab('chat')} className={tabButtonClass(tab === 'chat')}>
            <MessagesSquare className="w-4 h-4" />
            チャット
          </button>
          <button onClick={() => setTab('topics')} className={tabButtonClass(tab === 'topics')}>
            <ListTodo className="w-4 h-4" />
            トピック
            {openTopicCount > 0 && (
              <span className="ml-auto px-1.5 rounded-full bg-stone-700 text-[10px] font-bold text-white">
                {openTopicCount}
              </span>
            )}
          </button>
        </nav>

        <div className="flex-1 overflow-y-auto p-2">
          <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">チャンネル</p>
          {channels.map((channel) => {
            const isActive = tab === 'chat' && channel.id === activeChannel?.id;
            return (
              <button
                key={channel.id}
                onClick={() => selectChannel(channel.id)}
                className={`w-full flex items-center gap-1.5 px-3 py-1 rounded-md text-sm text-left transition-colors cursor-pointer ${
                  isActive ? 'bg-stone-700 text-white font-semibold' : 'hover:bg-stone-800'
                }`}
              >
                <Hash className="w-3.5 h-3.5 text-stone-500" />
                <span className="truncate">{channel.name}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Tabs and channels (mobile) */}
      <div className="md:hidden shrink-0 bg-stone-900 text-stone-300">
        <div className="flex">
          {(
            [
              ['chat', 'チャット'],
              ['topics', `トピック${openTopicCount ? ` (${openTopicCount})` : ''}`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-2.5 text-sm font-semibold border-b-2 cursor-pointer ${
                tab === key ? 'border-amber-500 text-white' : 'border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === 'chat' && (
          <div className="flex gap-1.5 px-3 py-2 overflow-x-auto">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => selectChannel(channel.id)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs cursor-pointer ${
                  channel.id === activeChannel?.id ? 'bg-amber-500 text-white font-semibold' : 'bg-stone-800'
                }`}
              >
                #{channel.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 min-w-0 flex">
        {tab === 'chat' ? (
          <ChatPane channel={activeChannel} me={me} />
        ) : (
          <TopicsPane topics={topics} me={me} onCreateTopic={createTopic} onSetTopicStatus={setTopicStatus} />
        )}
      </div>
    </div>
  );
};
