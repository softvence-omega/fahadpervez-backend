"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account_Model = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const auth_constant_1 = require("./auth.constant");
const authSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
    accountStatus: { type: String, default: "ACTIVE" },
    role: { type: String, enum: ["ADMIN", "MENTOR", "STUDENT"], required: true },
    studentType: { type: String, enum: Object.values(auth_constant_1.AUTH_CONSTANTS.STUDENT_TYPES), required: false },
    isVerified: { type: Boolean, default: false },
    profile_type: {
        type: String,
        required: true,
        enum: ["student_profile", "admin_profile", "mentor_profile"],
    },
    profile_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
        refPath: "profile_type",
    },
    authType: { type: String, enum: ["GOOGLE", "CUSTOM"], default: "CUSTOM" },
    lastOTP: { type: String, required: false },
    isSubscribed: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true
});
exports.Account_Model = (0, mongoose_1.model)("account", authSchema);
