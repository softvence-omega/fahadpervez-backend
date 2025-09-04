"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dummy_service_1 = require("./dummy.service");
const dummy_route = (0, express_1.Router)();
dummy_route.get("/clinical-case", dummy_service_1.dummy_services.get_clinical_case_data);
exports.default = dummy_route;
