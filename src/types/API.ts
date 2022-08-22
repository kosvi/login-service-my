import { z } from 'zod';

export const ZodTokenContent = z.object({
  uid: z.string().uuid(),
  username: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  resource: z.string().uuid(),
  read_only: z.boolean().default(false),
  expires: z.number()
});

export type TokenContent = z.infer<typeof ZodTokenContent>;
