'server only';

import { hash, verify } from '@node-rs/argon2';

const passwordConfig = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const hashPassword = async (password: string) => {
  return hash(password, passwordConfig);
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string
) => {
  return verify(hashedPassword, password, passwordConfig);
};
