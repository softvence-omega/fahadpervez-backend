"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.student_services = void 0;
const isAccountExist_1 = require("../../utils/isAccountExist");
const student_schema_1 = require("./student.schema");
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const update_student_profile_into_db = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    if (req === null || req === void 0 ? void 0 : req.file) {
        const cloudRes = yield (0, cloudinary_1.default)(req === null || req === void 0 ? void 0 : req.file);
        payload.profile_photo = cloudRes === null || cloudRes === void 0 ? void 0 : cloudRes.secure_url;
    }
    const isStudentExist = yield (0, isAccountExist_1.isAccountExist)(user === null || user === void 0 ? void 0 : user.email);
    const result = yield student_schema_1.Student_Model.findOneAndUpdate({ accountId: isStudentExist._id }, payload, { new: true });
    return result;
});
exports.student_services = {
    update_student_profile_into_db
};
