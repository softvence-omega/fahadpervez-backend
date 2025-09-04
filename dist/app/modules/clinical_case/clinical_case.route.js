"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const request_validator_1 = __importDefault(require("../../middlewares/request_validator"));
const clinical_case_validation_1 = require("./clinical_case.validation");
const clinical_case_controller_1 = require("./clinical_case.controller");
const clinical_route = (0, express_1.Router)();
clinical_route.post("/create-new", (0, auth_1.default)("ADMIN", "MENTOR"), (0, request_validator_1.default)(clinical_case_validation_1.clinical_case_validation.create), clinical_case_controller_1.clinical_case_controllers.create_new_clinical_case);
exports.default = clinical_route;
