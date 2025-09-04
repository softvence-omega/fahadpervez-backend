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
exports.clinical_case_services = void 0;
const isAccountExist_1 = require("../../utils/isAccountExist");
const clinical_case_schema_1 = require("./clinical_case.schema");
const create_new_clinical_case_and_save_on_db = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const isMentorExist = yield (0, isAccountExist_1.isAccountExist)(user === null || user === void 0 ? void 0 : user.email);
    const payload = req === null || req === void 0 ? void 0 : req.body;
    payload.publishedBy = isMentorExist === null || isMentorExist === void 0 ? void 0 : isMentorExist._id;
    const result = yield clinical_case_schema_1.ClinicalCaseModel.create(payload);
    return result;
});
exports.clinical_case_services = {
    create_new_clinical_case_and_save_on_db
};
