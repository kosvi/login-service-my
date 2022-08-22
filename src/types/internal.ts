import { z } from 'zod';

export const ZodUserInfo = z.object({
  uid: z.string().uuid(),
  username: z.string(),
  name: z.string().optional(),
  email: z.string().optional()
}).strict();

export type UserInfo = z.infer<typeof ZodUserInfo>;
