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
const nodemailer_1 = __importDefault(require("nodemailer"));
const configs_1 = require("../configs");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: configs_1.configs.email.app_email,
        pass: configs_1.configs.email.app_password,
    },
});
// ✅ Email Sender Function
const sendMail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield transporter.sendMail({
        from: 'info@digitalcreditai.com',
        to: payload.to,
        subject: payload.subject,
        text: payload.textBody,
        html: payload.htmlBody,
    });
    return info;
});
exports.default = sendMail;
