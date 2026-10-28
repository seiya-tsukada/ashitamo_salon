import { SESSION_TOKEN_STORAGE_KEY } from '../constants/storage';
import { supabase } from './supabase';

export type SubscriptionStatus = 'pending' | 'active' | 'past_due' | 'paused' | 'canceled';

export interface AuthUser {
  id: string;
  email: string;
  display_name: string;
  role: 'member' | 'admin';
  created_at: string;
  subscription: {
    status: SubscriptionStatus;
    plan: string;
    current_period_end: string | null;
  };
}

interface SessionPayload {
  token: string;
  expires_at: string;
  user: AuthUser;
}

// Error identifiers raised by the SQL functions, mapped to user-facing messages
const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: 'メールアドレスの形式が正しくありません。',
  invalid_password: 'パスワードは8文字以上（72バイト以内）で入力してください。',
  invalid_display_name: 'お名前は1〜50文字で入力してください。',
  email_taken: 'このメールアドレスはすでに登録されています。',
  invalid_credentials: 'メールアドレスまたはパスワードが違います。',
  too_many_attempts: 'ログイン試行が多すぎます。15分ほど待ってから再度お試しください。',
  invalid_session: 'ログインの有効期限が切れました。もう一度ログインしてください。',
  forbidden: 'この操作を行う権限がありません。',
  not_configured: 'Supabase が未設定です（.env.local を確認してください）。',
};

export class AuthError extends Error {
  constructor(readonly code: string) {
    super(ERROR_MESSAGES[code] ?? '通信に失敗しました。時間をおいて再度お試しください。');
  }
}

export const isAuthConfigured = supabase !== null;

const callRpc = async <T>(fn: string, args: Record<string, unknown>): Promise<T> => {
  if (!supabase) throw new AuthError('not_configured');
  const { data, error } = await supabase.rpc(fn, args);
  if (error) throw new AuthError(error.message);
  return data as T;
};

// The token is kept in localStorage because a static SPA has no server to set an httpOnly cookie
export const getStoredToken = (): string | null => {
  try {
    return window.localStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const storeToken = (token: string | null) => {
  try {
    if (token) {
      window.localStorage.setItem(SESSION_TOKEN_STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
    }
  } catch {
    // Storage unavailable: the session lasts until reload
  }
};

const requireToken = (): string => {
  const token = getStoredToken();
  if (!token) throw new AuthError('invalid_session');
  return token;
};

export const signUp = async (email: string, password: string, displayName: string): Promise<AuthUser> => {
  const session = await callRpc<SessionPayload>('sign_up', {
    p_email: email,
    p_password: password,
    p_display_name: displayName,
  });
  storeToken(session.token);
  return session.user;
};

export const signIn = async (email: string, password: string): Promise<AuthUser> => {
  // sign_in returns null (not an error) on bad credentials so the failed attempt is still recorded
  const session = await callRpc<SessionPayload | null>('sign_in', { p_email: email, p_password: password });
  if (!session) throw new AuthError('invalid_credentials');
  storeToken(session.token);
  return session.user;
};

export const signOut = async (): Promise<void> => {
  const token = getStoredToken();
  storeToken(null);
  if (token && supabase) {
    // Local logout already happened; a failed server call only leaves the session to expire
    await supabase.rpc('sign_out', { p_token: token });
  }
};

export const fetchMe = async (): Promise<AuthUser> => {
  try {
    return await callRpc<AuthUser>('get_me', { p_token: requireToken() });
  } catch (err) {
    if (err instanceof AuthError && err.code === 'invalid_session') storeToken(null);
    throw err;
  }
};

export const adminListMembers = (): Promise<AuthUser[]> =>
  callRpc<AuthUser[]>('admin_list_members', { p_token: requireToken() });

export const adminSetSubscriptionStatus = (userId: string, status: SubscriptionStatus): Promise<AuthUser> =>
  callRpc<AuthUser>('admin_set_subscription_status', { p_token: requireToken(), p_user_id: userId, p_status: status });
