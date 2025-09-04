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
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = require("../utils/app_error");
const configs_1 = require("../configs");
const JWT_1 = require("../utils/JWT");
const auth_schema_1 = require("../modules/auth/auth.schema");
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization || req.cookies.accessToken;
            if (!token) {
                throw new app_error_1.AppError('You are not authorize!!', 401);
            }
            const verifiedUser = JWT_1.jwtHelpers.verifyToken(token, configs_1.configs.jwt.access_token);
            if (!roles.length || !roles.includes(verifiedUser.role)) {
                throw new app_error_1.AppError('You are not authorize!!', 401);
            }
            // check user
            const isUserExist = yield auth_schema_1.Account_Model.findOne({ email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email }).lean();
            if (!isUserExist) {
                throw new app_error_1.AppError("Account not found !", 404);
            }
            if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus) == "INACTIVE") {
                throw new app_error_1.AppError("This Account is temporary blocked, contact us on support !", 401);
            }
            if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus) == "SUSPENDED") {
                throw new app_error_1.AppError("This Account is suspend, contact us on support !", 401);
            }
            if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isDeleted) {
                throw new app_error_1.AppError("This account is deleted", 401);
            }
            if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isVerified)) {
                throw new app_error_1.AppError("This account is not verified ", 401);
            }
            req.user = verifiedUser;
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
