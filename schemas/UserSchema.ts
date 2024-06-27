
import { z } from "zod"

export const UserSchema = z.object({
  name: z.string().min(2).max(50),
})
