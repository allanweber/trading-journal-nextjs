import db from '..';
import { organization } from '../schema';

export const createOrganization = async (name: string, trans = db) => {
  const [org] = await trans
    .insert(organization)
    .values({
      name,
    })
    .returning();
  return org;
};
