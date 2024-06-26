'use server';

import { authenticatedAction } from '@/lib/safe-action';
import { z } from 'zod';

const searchResult = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string(),
});

export const search = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      query: z.string(),
    })
  )
  .output(searchResult.array())
  .handler(async ({ input }) => {
    return [
      {
        title: 'Example Title ' + input.query,
        url: 'https://example.com',
        description: 'Example description',
      },
      {
        title: 'Example Title 2 ' + input.query,
        url: 'https://example2.com',
        description: 'Example description 2',
      },
    ];
  });
