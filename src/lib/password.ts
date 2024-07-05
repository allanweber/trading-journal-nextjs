'server only';

import { hash, verify } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';

const passwordConfig = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const hashPassword = async (password: string, saltPassword: string) => {
  return hash(password, {
    salt: Buffer.from(saltPassword, 'hex'),
    ...passwordConfig,
  });
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string,
  saltPassword: string
) => {
  return verify(hashedPassword, password, {
    salt: Buffer.from(saltPassword, 'hex'),
    ...passwordConfig,
  });
};

export const generateToken = async () => {
  return generateIdFromEntropySize(25);
};

export const hashToken = async (token: string) => {
  return encodeHex(await sha256(new TextEncoder().encode(token)));
};
