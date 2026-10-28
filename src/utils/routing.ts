import { PageType } from '../types';

const isAdminLocation = (path: string, hash: string) =>
  path.startsWith('/admin') || hash === '#/admin' || hash === '#admin';

export const resolvePageFromLocation = (): PageType => {
  const { pathname: path, hash } = window.location;
  if (isAdminLocation(path, hash)) return 'admin';
  if (path === '/home' || hash === '#home') return 'home';
  return 'lp';
};
