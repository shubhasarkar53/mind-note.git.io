"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpInputSchema = void 0;
const zod_1 = require("zod");
exports.signUpInputSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(6)
});
