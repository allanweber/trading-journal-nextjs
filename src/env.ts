import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string(),
  HOST_NAME: z.string().default('localhost'),
  APP_NAME: z.string().default('Drizzle'),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().default(''),
  GOOGLE_API_KEY: z.string().default(''),
  EMAIL_SERVER_PASSWORD: z.string().default(''),
  EMAIL_FROM: z.string().default('mail@mail.com'),
  GOOGLE_CLIENT_ID: z.string().default(''),
  GOOGLE_CLIENT_SECRET: z.string().default(''),
  BCC_EMAIL: z.string().default('mail@mail.com'),
  STRIPE_SECRET_KEY: z.string().default(''),
  STRIPE_WEBHOOK_SECRET: z.string().default(''),
  STRIPE_ESSENTIALS_PRODUCT_ID: z.string().default(''),
  STRIPE_PREMIUM_PRODUCT_ID: z.string().default(''),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n';
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n';
    });
    const e = new Error(message);
    e.stack = '';
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
