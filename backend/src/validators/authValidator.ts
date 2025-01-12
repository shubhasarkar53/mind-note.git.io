import { z } from "zod";

export const signUpInputSchema = z.object({
    fullname: z.string().min(5),
    username: z.string().min(5),
    password: z.string().min(6)
});