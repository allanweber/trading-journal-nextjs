import { createServerActionProcedure } from 'zsa';
import { validateRequest } from './auth';
import { rateLimitByKey } from './limiter';

const GLOBAL_USER = 'unauthenticated-global';

export const unauthenticatedAction = createServerActionProcedure().handler(
  async () => {
    await rateLimitByKey(GLOBAL_USER, 10, 10000);
  }
);

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const { user } = await validateRequest();
    if (!user) {
      throw new ActionError('NOT_AUTHORIZED', 'User not authorized');
    }
    await rateLimitByKey(user.id, 10, 10000);
    return user;
  }
);

export class ActionError<T extends string> extends Error {
  name: T;
  message: string;

  constructor(name: T, message: string) {
    super(message);
    this.name = name;
    this.message = message;
  }
}
