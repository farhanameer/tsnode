"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.UsersModel = mongoose_1.connection.model("User", exports.UserSchema, "user-collection");
