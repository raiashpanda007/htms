"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Register_1 = __importDefault(require("../controllers/auth/Register"));
const Login_1 = __importDefault(require("../controllers/auth/Login"));
const router = (0, express_1.Router)();
router.post('/login', Login_1.default);
router.post('/register', Register_1.default);
exports.default = router;
