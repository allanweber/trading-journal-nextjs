import db from '..';
import { userRoles } from '../schema';
import { Role } from '../schema/user-roles';

export const addUserRole = async (userId: string, role: Role, trans = db) => {
  const [added] = await trans
    .insert(userRoles)
    .values({ userId, role })
    .returning();
  return added;
};
