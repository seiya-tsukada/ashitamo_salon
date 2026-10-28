export type PageType = 'lp' | 'home' | 'detail' | 'admin';

export type ProjectCategory = '公式' | '編集' | 'デザイン' | '雑談';

export type CategoryType = 'すべて' | ProjectCategory;

export type MemberStatus = 'アクティブ' | '決済エラー' | '休会中' | '新規' | '退会';

export interface CommentItem {
  id: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface ProjectItem {
  id: string;
  category: ProjectCategory;
  title: string;
  lead: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  recruitmentDeadline: string;
  targetSlots: number;
  currentMembers: number;
  tags: string[];
  bannerImage?: string;
  fullContent: {
    background: string;
    purpose: string;
    rolesNeeded: { role: string; count: string; description: string; filled: boolean }[];
    schedule: string[];
    resources: string;
  };
  comments: CommentItem[];
}

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
