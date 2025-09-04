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
exports.dummy_services = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const dummy_data_1 = require("./dummy.data");
const get_clinical_case_data = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, manage_response_1.default)(res, {
        success: true,
        message: "We will provide only topic name , and then give me this type of data",
        data: dummy_data_1.dummyClinicalCase,
        statusCode: 200
    });
}));
exports.dummy_services = {
    get_clinical_case_data
};
