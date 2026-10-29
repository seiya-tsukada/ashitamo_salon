import { ONLINE_WINDOW_MS } from '../constants/chat';

export const isOnline = (lastSeenAt: string | null): boolean =>
  lastSeenAt !== null && Date.now() - new Date(lastSeenAt).getTime() < ONLINE_WINDOW_MS;

// "5分前" / "3時間前" / "2日前"; null when never seen
export const formatLastSeen = (lastSeenAt: string | null): string | null => {
  if (!lastSeenAt) return null;
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(lastSeenAt).getTime()) / 60_000));
  if (minutes < 60) return `${minutes}分前`;
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)}時間前`;
  return `${Math.floor(minutes / (60 * 24))}日前`;
};
