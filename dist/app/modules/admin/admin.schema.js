"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin_Model = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    accountId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "account" },
    firstName: { type: String },
    lastName: { type: String },
    profile_photo: { type: String, required: false }
});
exports.Admin_Model = (0, mongoose_1.model)("admin_profile", adminSchema);
