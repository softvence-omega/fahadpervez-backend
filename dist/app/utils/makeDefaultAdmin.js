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
exports.makeDefaultAdmin = void 0;
const configs_1 = require("../configs");
const admin_schema_1 = require("../modules/admin/admin.schema");
const auth_schema_1 = require("../modules/auth/auth.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const makeDefaultAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExist = yield auth_schema_1.Account_Model.exists({ role: "ADMIN", isDeleted: false });
    if (isAdminExist)
        return;
    const session = yield auth_schema_1.Account_Model.startSession();
    session.startTransaction();
    try {
        const accountRes = yield auth_schema_1.Account_Model.create([
            {
                email: configs_1.configs.admin.email,
                password: bcrypt_1.default.hashSync(configs_1.configs.admin.password, 10),
                role: "ADMIN",
                profile_type: "admin_profile",
                isVerified: true,
                accountStatus: "ACTIVE",
            },
        ], { session });
        const profileRes = yield admin_schema_1.Admin_Model.create([
            {
                firstName: "Admin",
                lastName: "admin",
                accountId: accountRes[0]._id,
            },
        ], { session });
        yield auth_schema_1.Account_Model.findByIdAndUpdate(accountRes[0]._id, { profileId: profileRes[0]._id }, { session });
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.makeDefaultAdmin = makeDefaultAdmin;
