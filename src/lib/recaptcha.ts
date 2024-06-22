import env from '@/env';

export async function validateToken(token: string) {
  const response = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/trading-journal-393816/assessments?key=${env.GOOGLE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        event: {
          token: token,
          siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        },
      }),
    }
  );
  const captchaValidation = await response.json();
  if (!captchaValidation.error) {
    return { success: true };
  } else {
    return { success: false };
  }
}
