// Logged-in user for the mock (no auth backend yet)
export const CURRENT_USER = {
  name: '佐藤 匠（Takumi Sato）',
  displayName: '佐藤 匠',
  role: 'クリエイティブディレクター',
  planLabel: 'Pro Member',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  avatarThumb: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
} as const;

// The same person as a chat author (id matches the mock chat data)
export const MOCK_CHAT_MEMBER = {
  id: 'mem-takumi',
  displayName: CURRENT_USER.displayName,
  avatarUrl: CURRENT_USER.avatarThumb,
};
