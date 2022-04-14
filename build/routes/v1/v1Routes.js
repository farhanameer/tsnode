"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("./category"));
const router = express_1.default.Router();
router.use("/categories", category_1.default);
module.exports = router;
