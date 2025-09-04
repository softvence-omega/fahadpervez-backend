"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const uploader_1 = __importDefault(require("../../middlewares/uploader"));
const student_controller_1 = require("./student.controller");
const request_validator_1 = __importDefault(require("../../middlewares/request_validator"));
const student_validation_1 = require("./student.validation");
const studentRoute = (0, express_1.Router)();
studentRoute.patch("/update", (0, auth_1.default)("STUDENT"), uploader_1.default.single("image"), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, request_validator_1.default)(student_validation_1.student_validation.update), student_controller_1.student_controllers.update_student_profile);
exports.default = studentRoute;
