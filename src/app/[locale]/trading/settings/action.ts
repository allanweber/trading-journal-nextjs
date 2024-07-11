'use server';

import { updateProfileAppearance } from '@/db/repositories/userProfile.repository';
import { authenticatedAction } from '@/lib/safe-action';
import { getAppearanceSettings } from '@/services/user.service';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { generalFormSchema, GeneralFormValues } from './schema';

export const update = authenticatedAction
  .createServerAction()
  .input(generalFormSchema)
  .output(z.object({ success: z.boolean() }))
  .handler(async ({ input, ctx }) => {
    await updateProfileAppearance(ctx.id, input.theme, input.language);
    revalidatePath('/trading/settings');
    return { success: true };
  });

export const loadSettings = authenticatedAction
  .createServerAction()
  .output(generalFormSchema)
  .handler(async ({ ctx }) => {
    const settings = await getAppearanceSettings(ctx.id);
    return settings as GeneralFormValues;
  });
