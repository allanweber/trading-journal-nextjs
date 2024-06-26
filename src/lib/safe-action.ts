import { createServerActionProcedure } from 'zsa';
import { rateLimitByKey } from './limiter';

const GLOBAL_USER = 'unauthenticated-global';

export const unauthenticatedAction = createServerActionProcedure().handler(
  async () => {
    await rateLimitByKey(GLOBAL_USER, 10, 10000);
  }
);

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    //TODO: Implement authentication
    await rateLimitByKey(GLOBAL_USER, 10, 10000);
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
