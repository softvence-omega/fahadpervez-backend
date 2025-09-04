"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.student_validation = void 0;
const zod_1 = require("zod");
const update = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    university: zod_1.z.string().optional(),
    preparingFor: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    year_of_study: zod_1.z.string().optional(),
    profile_photo: zod_1.z.string().optional(),
});
exports.student_validation = {
    update
};
