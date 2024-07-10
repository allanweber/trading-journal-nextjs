import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  HOST_NAME: z.string(),
  APP_NAME: z.string(),
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string(),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
  GOOGLE_API_KEY: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_FROM: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
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
