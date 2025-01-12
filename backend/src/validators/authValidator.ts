import { z } from "zod";

export const signUpInputSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6)
});