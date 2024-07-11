'use server';

import { updateProfile } from '@/db/repositories/userProfile.repository';
import { authenticatedAction } from '@/lib/safe-action';
import { getProfile } from '@/services/user.service';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { profileFormSchema } from './schema';

export const update = authenticatedAction
  .createServerAction()
  .input(profileFormSchema)
  .output(z.object({ success: z.boolean() }))
  .handler(async ({ input, ctx }) => {
    await updateProfile(
      ctx.id,
      input.displayName,
      input.firstName,
      input.lastName,
      input.bio
    );
    revalidatePath('/trading/settings/user');
    return { success: true };
  });

export const loadProfile = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    return await getProfile(ctx.id);
  });
