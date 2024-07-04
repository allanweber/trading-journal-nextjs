import db from '@/db';
import { newsletter } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function subscribe(email: string) {
  const subscribed = await db.query.newsletter.findFirst({
    where: eq(newsletter.email, email),
  });

  if (!subscribed) {
    await db.insert(newsletter).values({
      email: email,
    });
  }
}

export async function unsubscribe(email: string) {
  await db.delete(newsletter).where(eq(newsletter.email, email));
}
