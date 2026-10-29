import { MAIN_CHAT_ID } from '../constants/chat';
import { ChatMember, ChatMemberPresence, Message, Topic } from '../types';

const avatar = (photoId: string) => `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=120&q=80`;

// Timestamps are relative to page load so the mock always looks recent
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

const MEMBERS = {
  takumi: { id: 'mem-takumi', displayName: '佐藤 匠', avatarUrl: avatar('1535713875002-d1d0cf377fde') },
  rei: { id: 'mem-rei', displayName: '神谷 怜', avatarUrl: avatar('1507003211169-0a1dd7228f2d') },
  kentaro: { id: 'mem-kentaro', displayName: '田中 健太郎', avatarUrl: avatar('1506794778202-cad84cf45f1d') },
  misaki: { id: 'mem-misaki', displayName: '宮崎 美咲', avatarUrl: avatar('1580489944761-15a19d654956') },
  sota: { id: 'mem-sota', displayName: '本郷 蒼太', avatarUrl: avatar('1522075469751-3a6694fb2f61') },
  yuka: { id: 'mem-yuka', displayName: '小林 由佳' },
} satisfies Record<string, ChatMember>;

// lastSeenAt drives the online lamp (within 12 hours = online)
export const MOCK_MEMBERS: ChatMemberPresence[] = [
  { ...MEMBERS.takumi, lastSeenAt: minutesAgo(1) },
  { ...MEMBERS.rei, lastSeenAt: minutesAgo(20) },
  { ...MEMBERS.sota, lastSeenAt: minutesAgo(60 * 3) },
  { ...MEMBERS.misaki, lastSeenAt: minutesAgo(60 * 15) },
  { ...MEMBERS.kentaro, lastSeenAt: minutesAgo(60 * 50) },
  { ...MEMBERS.yuka, lastSeenAt: minutesAgo(60 * 24 * 6) },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-g1',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.takumi,
    body: '今月の全体ミーティングは第3土曜 14:00〜です。オンライン参加もできます！',
    replyToId: null,
    createdAt: minutesAgo(60 * 26),
  },
  {
    id: 'msg-g2',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.misaki,
    body: '了解です。議題の募集はトピックに立てておきますね。',
    replyToId: 'msg-g1',
    createdAt: minutesAgo(60 * 25),
  },
  {
    id: 'msg-g3',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.sota,
    body: '新しく参加しました本郷です。プロダクトデザインをやっています。よろしくお願いします！',
    replyToId: null,
    createdAt: minutesAgo(90),
  },
  {
    id: 'msg-g4',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.rei,
    body: 'ようこそ〜！デザインの相談もここで気軽にどうぞ。',
    replyToId: 'msg-g3',
    createdAt: minutesAgo(75),
  },
  {
    id: 'msg-r1',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.kentaro,
    body: '週末に行った古本市がとても良かったです。紙の手触りっていいですね。',
    replyToId: null,
    createdAt: minutesAgo(180),
  },
  {
    id: 'msg-r2',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.misaki,
    body: 'どこの古本市ですか？行ってみたい！',
    replyToId: 'msg-r1',
    createdAt: minutesAgo(170),
  },
  {
    id: 'msg-d1',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.rei,
    body: '表紙のラフを3案アップしました。方向性だけでも意見もらえると助かります。',
    replyToId: null,
    createdAt: minutesAgo(240),
  },
  {
    id: 'msg-d2',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.sota,
    body: 'B案のタイポグラフィが好きです。余白をもう少し広げても良さそう。',
    replyToId: 'msg-d1',
    createdAt: minutesAgo(200),
  },
  {
    id: 'msg-e1',
    conversationId: MAIN_CHAT_ID,
    author: MEMBERS.takumi,
    body: '創刊号の台割を共有します。特集は 12〜27 ページの予定です。',
    replyToId: null,
    createdAt: minutesAgo(60 * 50),
  },
  {
    id: 'msg-t1',
    conversationId: 'topic-agenda',
    author: MEMBERS.kentaro,
    body: '読者アンケートの結果共有を議題に入れたいです。',
    replyToId: null,
    createdAt: minutesAgo(60 * 20),
  },
  {
    id: 'msg-t2',
    conversationId: 'topic-agenda',
    author: MEMBERS.misaki,
    body: '追加しました！15分くらい取りますね。',
    replyToId: 'msg-t1',
    createdAt: minutesAgo(60 * 19),
  },
  {
    id: 'msg-t3',
    conversationId: 'topic-cover',
    author: MEMBERS.sota,
    body: 'B案ベースで進めるのに賛成です。',
    replyToId: null,
    createdAt: minutesAgo(150),
  },
  {
    id: 'msg-t4',
    conversationId: 'topic-venue',
    author: MEMBERS.takumi,
    body: '会場は押さえました。キャパは 80 名です。',
    replyToId: null,
    createdAt: minutesAgo(60 * 72),
  },
];

const commentCount = (topicId: string) => MOCK_MESSAGES.filter((m) => m.conversationId === topicId).length;

export const MOCK_TOPICS: Topic[] = [
  {
    id: 'topic-agenda',
    title: '11月の全体ミーティング 議題募集',
    body: '話したいことがあればコメントで追加してください。締め切りは前日まで。',
    author: MEMBERS.misaki,
    status: 'open',
    createdAt: minutesAgo(60 * 24),
    updatedAt: minutesAgo(60 * 19),
    commentCount: commentCount('topic-agenda'),
  },
  {
    id: 'topic-cover',
    title: '創刊号の表紙デザインを決める',
    body: 'チャットに上げた 3 案から 1 つに絞りたいです。理由も添えて意見ください。',
    author: MEMBERS.rei,
    status: 'open',
    createdAt: minutesAgo(230),
    updatedAt: minutesAgo(150),
    commentCount: commentCount('topic-cover'),
  },
  {
    id: 'topic-interview',
    title: '特集インタビューの候補者リストアップ',
    body: '候補者と連絡先のあてがあれば共有してください。',
    author: MEMBERS.takumi,
    status: 'open',
    createdAt: minutesAgo(60 * 30),
    updatedAt: minutesAgo(60 * 30),
    commentCount: commentCount('topic-interview'),
  },
  {
    id: 'topic-venue',
    title: '年末フェスの会場を押さえる',
    body: '候補は 2 か所。12 月第 2 週の土日で確認中です。',
    author: MEMBERS.kentaro,
    status: 'done',
    createdAt: minutesAgo(60 * 96),
    updatedAt: minutesAgo(60 * 72),
    commentCount: commentCount('topic-venue'),
  },
];
