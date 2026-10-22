import { CategoryType, ProjectCategory } from '../types';

export const ALL_CATEGORIES: CategoryType = 'すべて';

// Order of the category tabs on the timeline
export const CATEGORY_FILTERS: CategoryType[] = ['すべて', '公式', '編集', 'デザイン', '雑談'];

// Order of the category picker in the "new project" form
export const PROJECT_CATEGORY_OPTIONS: readonly ProjectCategory[] = ['編集', 'デザイン', '公式', '雑談'];

export const NEW_PROJECT_DEFAULTS = {
  category: '編集' as ProjectCategory,
  slots: '3',
  tags: '新企画, コミュニティ',
  fallbackSlots: 3,
  fallbackCreativeSlots: 2,
  recruitmentDeadline: '2026年11月30日',
  purpose: 'サロンメンバーとの共創による温かな新規アウトプット創出',
  schedule: ['第1週：顔合わせキックオフ', '第2週：プロトタイプ', '第4週：リリース'],
  resources: '制作予算：サロン運営費より応相談支援あり。',
  initialComment: '起案しました！興味がある方はぜひ気軽にコメントや立候補をしてくださいね。',
};

export const JUST_NOW_LABEL = 'たった今';

export const roleApplicationMessage = (roleName: string) =>
  `【立候補】「${roleName}」の役割に立候補しました！チームのみなさんと温かく協力しながら、最高のアウトプットを目指したいです。よろしくお願いします！`;
