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
exports.auth_services = void 0;
const app_error_1 = require("../../utils/app_error");
const auth_schema_1 = require("./auth.schema");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_1 = require("../../utils/JWT");
const configs_1 = require("../../configs");
const mail_sender_1 = __importDefault(require("../../utils/mail_sender"));
const isAccountExist_1 = require("./../../utils/isAccountExist");
const otpMaker_1 = require("../../utils/otpMaker");
const student_schema_1 = require("../student/student.schema");
// register user
const register_user_into_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAccount = yield auth_schema_1.Account_Model.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isExistAccount) {
        throw new app_error_1.AppError("Account already exist!!", http_status_1.default.BAD_REQUEST);
    }
    // Generate 6-digit OTP
    const otp = (0, otpMaker_1.OTPMaker)();
    const otpDigits = otp.split("");
    const accountRegistrationPayload = {
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        lastOTP: otp,
        role: "STUDENT",
        profile_type: "student_profile",
        authType: "CUSTOM",
    };
    yield auth_schema_1.Account_Model.create(accountRegistrationPayload);
    // Email template
    const emailTemp = `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f6f7fb; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:80px 5px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
          style="max-width:640px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(17,24,39,0.08); padding: 40px;">

          <tr>
            <td align="left" style="padding:0 24px 4px 24px;">
              <h1 style="margin:0; font-size:24px; line-height:32px; color:#111827; font-weight:800; font-family:Arial, sans-serif;">
                Hi Dear,
              </h1>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 0 24px;">
              <p style="margin:0; font-size:15px; line-height:24px; color:#374151; font-family:Arial, sans-serif;">
                Here is your One Time Password (OTP). Please enter this code to verify your email address for MSH.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 24px 8px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  ${otpDigits
        .map((digit) => `
                    <td align="center" valign="middle"
                      style="background:#f5f3ff; border-radius:12px; width:56px; height:56px;">
                      <div style="font-size:22px; line-height:56px; color:#111827; font-weight:700; font-family:Arial, sans-serif; text-align:center;">
                        ${digit}
                      </div>
                    </td>
                    <td style="width:12px;">&nbsp;</td>
                  `)
        .join("")}
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 4px 24px;">
              <p style="margin:0; font-size:14px; line-height:22px; color:#6b7280; font-family:Arial, sans-serif;">
                OTP will expire in <span style="font-weight:700; color:#111827;">5 minutes</span>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
    yield (0, mail_sender_1.default)({
        to: payload === null || payload === void 0 ? void 0 : payload.email,
        textBody: `Your OTP is ${otp}`,
        subject: "Verify your email",
        htmlBody: emailTemp,
    });
    return "Please check your mailbox for the OTP";
});
const verified_account_into_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAccountExists = yield (0, isAccountExist_1.isAccountExist)(payload.email);
    if (isAccountExists.isVerified) {
        throw new app_error_1.AppError('Account already verified', http_status_1.default.BAD_REQUEST);
    }
    if (isAccountExists.lastOTP !== payload.otp) {
        throw new app_error_1.AppError('Invalid OTP', http_status_1.default.UNAUTHORIZED);
    }
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: payload.email }, {
        isVerified: true,
        lastOTP: "",
    });
    return 'Account verified successfully!';
});
const get_new_verification_otp_from_db = (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, isAccountExist_1.isAccountExist)(email);
    const otp = (0, otpMaker_1.OTPMaker)();
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email }, { lastOTP: otp });
    const otpDigits = otp.split("");
    const emailTemp = `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f6f7fb; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:80px 5px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
          style="max-width:640px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(17,24,39,0.08); padding: 40px;">

          <tr>
            <td align="left" style="padding:0 24px 4px 24px;">
              <h1 style="margin:0; font-size:24px; line-height:32px; color:#111827; font-weight:800; font-family:Arial, sans-serif;">
                Hi Dear,
              </h1>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 0 24px;">
              <p style="margin:0; font-size:15px; line-height:24px; color:#374151; font-family:Arial, sans-serif;">
                Here is your another One Time Password (OTP). Please enter this code to verify your email address for MSH.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 24px 8px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  ${otpDigits
        .map((digit) => `
                    <td align="center" valign="middle"
                      style="background:#f5f3ff; border-radius:12px; width:56px; height:56px;">
                      <div style="font-size:22px; line-height:56px; color:#111827; font-weight:700; font-family:Arial, sans-serif; text-align:center;">
                        ${digit}
                      </div>
                    </td>
                    <td style="width:12px;">&nbsp;</td>
                  `)
        .join("")}
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 4px 24px;">
              <p style="margin:0; font-size:14px; line-height:22px; color:#6b7280; font-family:Arial, sans-serif;">
                OTP will expire in <span style="font-weight:700; color:#111827;">5 minutes</span>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
    yield (0, mail_sender_1.default)({
        to: email,
        subject: "New OTP for account verification",
        textBody: `New OTP is sent to your email on ${new Date().toLocaleDateString()}`,
        htmlBody: emailTemp
    });
    return null;
});
const set_new_password_into_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(payload.email);
    if (!isExistAccount.isVerified) {
        throw new app_error_1.AppError('Account is not verified', http_status_1.default.UNAUTHORIZED);
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: isExistAccount.email }, {
        password: hashedPassword,
    });
    return 'Password changed successful.';
});
const login_user_from_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check account info 
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(payload === null || payload === void 0 ? void 0 : payload.email);
    if (isExistAccount.accountStatus === "INACTIVE") {
        throw new app_error_1.AppError('Account is not active, contact us on support', http_status_1.default.UNAUTHORIZED);
    }
    if (isExistAccount.accountStatus === "SUSPENDED") {
        throw new app_error_1.AppError('Account is suspended, contact us on support', http_status_1.default.UNAUTHORIZED);
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, isExistAccount.password);
    if (!isPasswordMatch) {
        throw new app_error_1.AppError('Invalid password', http_status_1.default.UNAUTHORIZED);
    }
    const accessToken = JWT_1.jwtHelpers.generateToken({
        email: isExistAccount.email,
        role: isExistAccount.role,
    }, configs_1.configs.jwt.access_token, configs_1.configs.jwt.access_expires);
    const refreshToken = JWT_1.jwtHelpers.generateToken({
        email: isExistAccount.email,
        role: isExistAccount.role,
    }, configs_1.configs.jwt.refresh_token, configs_1.configs.jwt.refresh_expires);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: isExistAccount.role
    };
});
const update_student_profile_into_db = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req === null || req === void 0 ? void 0 : req.body;
    const updateStudentPayload = {
        university: body.university,
        country: body.country,
        year_of_study: body.year_of_study,
        preparingFor: body.preparingFor,
        firstName: body.firstName,
        lastName: body.lastName
    };
    const updateAccountPayload = {
        studentType: body.studentType
    };
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email);
    if (isExistAccount === null || isExistAccount === void 0 ? void 0 : isExistAccount.profile_id) {
        yield student_schema_1.Student_Model.findOneAndUpdate({ accountId: isExistAccount === null || isExistAccount === void 0 ? void 0 : isExistAccount._id }, updateStudentPayload);
    }
    else {
        updateStudentPayload.accountId = isExistAccount._id;
        const profileRes = yield student_schema_1.Student_Model.create(updateStudentPayload);
        updateAccountPayload.profile_id = profileRes._id;
        updateAccountPayload.profile_type = "student_profile";
    }
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: isExistAccount.email }, updateAccountPayload);
    const updateResponse = yield auth_schema_1.Account_Model.findOne({ email: isExistAccount.email })
        .select("-password -lastOTP -__v")
        .populate("profile_id")
        .lean();
    if (updateResponse === null || updateResponse === void 0 ? void 0 : updateResponse.profile_id) {
        updateResponse.profile = updateResponse.profile_id;
        delete updateResponse.profile_id;
    }
    return updateResponse;
});
const get_my_profile_from_db = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(email);
    const profile = yield student_schema_1.Student_Model.findOne({ accountId: isExistAccount._id }).lean();
    isExistAccount.password = "";
    return {
        account: isExistAccount,
        profile: profile || ""
    };
});
const refresh_token_from_db = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = JWT_1.jwtHelpers.verifyToken(token, configs_1.configs.jwt.refresh_token);
    }
    catch (err) {
        throw new Error('You are not authorized!');
    }
    const userData = yield (0, isAccountExist_1.isAccountExist)(decodedData.email);
    const accessToken = JWT_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, configs_1.configs.jwt.access_token, configs_1.configs.jwt.access_expires);
    return accessToken;
});
const change_password_from_db = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(user.email);
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, isExistAccount.password);
    if (!isCorrectPassword) {
        throw new app_error_1.AppError('Old password is incorrect', http_status_1.default.UNAUTHORIZED);
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 10);
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: isExistAccount.email }, {
        password: hashedPassword,
        lastPasswordChange: Date()
    });
    return 'Password changed successful.';
});
const forget_password_from_db = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isAccountExists = yield (0, isAccountExist_1.isAccountExist)(email);
    const otp = (0, otpMaker_1.OTPMaker)();
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: isAccountExists.email }, { lastOTP: otp });
    const otpDigits = otp.split("");
    const emailTemp = `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f6f7fb; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:80px 5px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
          style="max-width:640px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(17,24,39,0.08); padding: 40px;">

          <tr>
            <td align="left" style="padding:0 24px 4px 24px;">
              <h1 style="margin:0; font-size:24px; line-height:32px; color:#111827; font-weight:800; font-family:Arial, sans-serif;">
                Hi,
              </h1>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 0 24px;">
              <p style="margin:0; font-size:15px; line-height:24px; color:#374151; font-family:Arial, sans-serif;">
                Here is your reset One Time Password (OTP). Please enter this code to verify your email address for MSH.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 24px 8px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  ${otpDigits
        .map((digit) => `
                    <td align="center" valign="middle"
                      style="background:#f5f3ff; border-radius:12px; width:56px; height:56px;">
                      <div style="font-size:22px; line-height:56px; color:#111827; font-weight:700; font-family:Arial, sans-serif; text-align:center;">
                        ${digit}
                      </div>
                    </td>
                    <td style="width:12px;">&nbsp;</td>
                  `)
        .join("")}
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 4px 24px;">
              <p style="margin:0; font-size:14px; line-height:22px; color:#6b7280; font-family:Arial, sans-serif;">
                OTP will expire in <span style="font-weight:700; color:#111827;">5 minutes</span>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
    yield (0, mail_sender_1.default)({
        to: email,
        subject: "Password reset successful!",
        textBody: "Your password is successfully reset.",
        htmlBody: emailTemp
    });
    return 'Check your email for reset link';
});
const reset_password_into_db = (otp, email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isAccountExists = yield (0, isAccountExist_1.isAccountExist)(email);
    if (isAccountExists.email !== email) {
        throw new app_error_1.AppError('Invalid email', http_status_1.default.UNAUTHORIZED);
    }
    if (isAccountExists.lastOTP !== otp) {
        throw new app_error_1.AppError('Invalid OTP', http_status_1.default.UNAUTHORIZED);
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: isAccountExists.email }, {
        password: hashedPassword,
    });
    return 'Password reset successfully!';
});
const change_profile_status_from_db = (status, email) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: email }, {
        accountStatus: status,
    });
    return null;
});
const sign_in_with_google_and_save_in_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Try to find account and create if not exists in one step
    let account = yield auth_schema_1.Account_Model.findOneAndUpdate({ email: payload.email }, {
        $setOnInsert: {
            email: payload.email,
            authType: "GOOGLE",
            accountStatus: "ACTIVE",
            isVerified: true,
            role: "STUDENT",
            profile_type: "student_profile",
        },
    }, { upsert: true, new: true }).lean();
    // If account was newly created and profile not yet set
    if (!account.profile_id) {
        const profilePromise = student_schema_1.Student_Model.create({
            firstName: payload.name,
            profile_photo: payload.photo,
            accountId: account._id,
        });
        const [profile] = yield Promise.all([profilePromise]);
        // Update account with profile_id
        yield auth_schema_1.Account_Model.findByIdAndUpdate(account._id, { profile_id: profile._id });
        account.profile_id = profile._id; // update local object
    }
    // Generate tokens
    const tokenPayload = { email: account.email, role: account.role };
    const [accessToken, refreshToken] = yield Promise.all([
        JWT_1.jwtHelpers.generateToken(tokenPayload, configs_1.configs.jwt.access_token, configs_1.configs.jwt.access_expires),
        JWT_1.jwtHelpers.generateToken(tokenPayload, configs_1.configs.jwt.refresh_token, configs_1.configs.jwt.refresh_expires),
    ]);
    return {
        accessToken,
        refreshToken,
        role: account.role,
    };
});
exports.auth_services = {
    register_user_into_db,
    login_user_from_db,
    get_my_profile_from_db,
    refresh_token_from_db,
    change_password_from_db,
    forget_password_from_db,
    reset_password_into_db,
    verified_account_into_db,
    get_new_verification_otp_from_db,
    set_new_password_into_db,
    update_student_profile_into_db,
    change_profile_status_from_db,
    sign_in_with_google_and_save_in_db
};
