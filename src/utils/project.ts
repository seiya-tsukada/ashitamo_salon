import { CommentItem, ProjectCategory, ProjectItem } from '../types';
import { CURRENT_USER } from '../constants/currentUser';
import { JUST_NOW_LABEL, NEW_PROJECT_DEFAULTS, roleApplicationMessage } from '../constants/project';

interface DraftProjectInput {
  title: string;
  lead: string;
  category: ProjectCategory;
  slots: string;
  tags: string;
}

// Builds a project posted by the current user from the "new project" form
export const createDraftProject = ({ title, lead, category, slots, tags }: DraftProjectInput): ProjectItem => {
  const now = Date.now();
  const slotCount = parseInt(slots);
  const author = {
    name: CURRENT_USER.name,
    role: CURRENT_USER.role,
    avatar: CURRENT_USER.avatar,
  };

  return {
    id: `proj-${now}`,
    category,
    title: title.trim(),
    lead: lead.trim(),
    author,
    publishedAt: JUST_NOW_LABEL,
    recruitmentDeadline: NEW_PROJECT_DEFAULTS.recruitmentDeadline,
    targetSlots: slotCount || NEW_PROJECT_DEFAULTS.fallbackSlots,
    currentMembers: 1,
    tags: tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    fullContent: {
      background: lead.trim(),
      purpose: NEW_PROJECT_DEFAULTS.purpose,
      rolesNeeded: [
        { role: 'プロジェクト共同リーダー', count: '1名', description: '進捗管理と企画ディレクション', filled: false },
        {
          role: 'クリエイティブ制作メンバー',
          count: `${slotCount - 1 || NEW_PROJECT_DEFAULTS.fallbackCreativeSlots}名`,
          description: '実制作・デザイン・実装',
          filled: false,
        },
      ],
      schedule: [...NEW_PROJECT_DEFAULTS.schedule],
      resources: NEW_PROJECT_DEFAULTS.resources,
    },
    comments: [
      {
        id: `c-init-${now}`,
        author: author.name,
        authorRole: author.role,
        authorAvatar: author.avatar,
        content: NEW_PROJECT_DEFAULTS.initialComment,
        createdAt: JUST_NOW_LABEL,
        likes: 1,
      },
    ],
  };
};

export const createUserComment = (authorRole: string, content: string): CommentItem => ({
  id: `c-user-${Date.now()}`,
  author: CURRENT_USER.name,
  authorRole,
  authorAvatar: CURRENT_USER.avatar,
  content: content.trim(),
  createdAt: JUST_NOW_LABEL,
  likes: 1,
});

// Applying for a role also posts an announcement to the thread
export const createApplicationComment = (roleName: string): CommentItem => ({
  id: `c-apply-${Date.now()}`,
  author: CURRENT_USER.name,
  authorRole: roleName,
  authorAvatar: CURRENT_USER.avatar,
  content: roleApplicationMessage(roleName),
  createdAt: JUST_NOW_LABEL,
  likes: 2,
});
