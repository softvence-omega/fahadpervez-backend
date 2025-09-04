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
exports.auth_controllers = void 0;
const configs_1 = require("../../configs");
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const register_user = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.auth_services.register_user_into_db(req === null || req === void 0 ? void 0 : req.body);
    (0, manage_response_1.default)(res, {
        success: true,
        message: "Account created successful",
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
const verified_account = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.auth_services.verified_account_into_db(req === null || req === void 0 ? void 0 : req.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Account Verification successful.",
        data: result
    });
}));
const get_new_verification_otp = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield auth_service_1.auth_services.get_new_verification_otp_from_db((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "New OTP is sent to email.",
        data: result
    });
}));
const set_new_password = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.auth_services.set_new_password_into_db(req === null || req === void 0 ? void 0 : req.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password has been reset successfully.",
        data: result
    });
}));
const login_user = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.auth_services.login_user_from_db(req.body);
    res.cookie('refreshToken', result.refreshToken, {
        secure: configs_1.configs.env == 'production',
        httpOnly: true,
    });
    res.cookie('accessToken', result.accessToken, {
        secure: configs_1.configs.env == 'production',
        httpOnly: true,
    });
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is logged in successful !',
        data: {
            accessToken: result.accessToken,
            role: result === null || result === void 0 ? void 0 : result.role
        },
    });
}));
const update_student_profile = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.auth_services.update_student_profile_into_db(req);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Profile updated successfully!',
        data: result,
    });
}));
const get_my_profile = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield auth_service_1.auth_services.get_my_profile_from_db(email);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Profile info fetched successfully!',
        data: result,
    });
}));
const refresh_token = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.auth_services.refresh_token_from_db(refreshToken);
    res.cookie("accessToken", result, {
        secure: configs_1.configs.env == 'production',
        httpOnly: true,
    });
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token generated successfully!',
        data: { accessToken: result },
    });
}));
const change_password = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield auth_service_1.auth_services.change_password_from_db(user, req.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password changed successfully!',
        data: result,
    });
}));
const forget_password = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req === null || req === void 0 ? void 0 : req.body;
    yield auth_service_1.auth_services.forget_password_from_db(email);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'We sent a OTP to your email!',
        data: null,
    });
}));
const reset_password = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, newPassword, email } = req.body;
    const result = yield auth_service_1.auth_services.reset_password_into_db(otp, email, newPassword);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password reset successfully!',
        data: result,
    });
}));
const change_profile_status = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, email } = req.body;
    yield auth_service_1.auth_services.change_profile_status_from_db(status, email);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Now this account is ${status}`,
        data: null,
    });
}));
const sign_in_with_google = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.auth_services.sign_in_with_google_and_save_in_db(req === null || req === void 0 ? void 0 : req.body);
    res.cookie('refreshToken', result.refreshToken, {
        secure: configs_1.configs.env == 'production',
        httpOnly: true,
    });
    res.cookie('accessToken', result.accessToken, {
        secure: configs_1.configs.env == 'production',
        httpOnly: true,
    });
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is logged in successful !',
        data: {
            accessToken: result.accessToken,
            role: result === null || result === void 0 ? void 0 : result.role
        },
    });
}));
exports.auth_controllers = {
    register_user,
    login_user,
    get_my_profile,
    refresh_token,
    change_password,
    reset_password,
    forget_password,
    verified_account,
    get_new_verification_otp,
    set_new_password,
    update_student_profile,
    change_profile_status,
    sign_in_with_google
};
