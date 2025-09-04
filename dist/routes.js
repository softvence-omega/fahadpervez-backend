"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./app/modules/auth/auth.route"));
const clinical_case_route_1 = __importDefault(require("./app/modules/clinical_case/clinical_case.route"));
const dummy_route_1 = __importDefault(require("./app/modules/dummy/dummy.route"));
const student_route_1 = __importDefault(require("./app/modules/student/student.route"));
const appRouter = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/auth', route: auth_route_1.default },
    { path: "/clinical-case", route: clinical_case_route_1.default },
    { path: "/student", route: student_route_1.default },
    { path: "/dummy", route: dummy_route_1.default }
];
moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
exports.default = appRouter;
