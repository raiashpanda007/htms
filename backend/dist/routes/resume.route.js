"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_middleware_1 = __importDefault(require("../middlewares/verify.middleware"));
const router = (0, express_1.Router)();
const resume_creation_1 = __importDefault(require("../controllers/service/resume.creation"));
router.post('/create', verify_middleware_1.default, resume_creation_1.default);
exports.default = router;
