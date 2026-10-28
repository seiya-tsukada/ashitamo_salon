export type PageType = 'lp' | 'home' | 'admin';

export type MemberStatus = 'アクティブ' | '決済エラー' | '休会中' | '新規' | '退会';

export interface MemberItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinedAt: string;
  activeProjects: number;
  status: MemberStatus;
  monthlyPlan: string;
}

export interface ReportItem {
  id: string;
  targetType: '投稿' | 'コメント';
  targetTitle: string;
  reportedUser: string;
  reporterUser: string;
  reason: string;
  timestamp: string;
  severity: '高' | '中' | '低';
}

export interface ChatMember {
  id: string;
  displayName: string;
  avatarUrl?: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
}

export type TopicStatus = 'open' | 'done';

// A titled conversation (Teams-style post) that can be checked off like a todo
export interface Topic {
  id: string;
  title: string;
  body: string;
  author: ChatMember;
  status: TopicStatus;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
}

// Messages in channels and comments on topics share one shape; conversationId is the channel or topic id.
// Replies quote another message by id (no threads).
export interface Message {
  id: string;
  conversationId: string;
  author: ChatMember;
  body: string;
  replyToId: string | null;
  createdAt: string;
}
