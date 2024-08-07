import env from '@/env';

export function absoluteUrl(path: string) {
  return `${env.HOST_NAME || 'http://localhost:3000'}${path}`;
}
