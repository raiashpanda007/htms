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
const response_1 = __importDefault(require("../../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const loginFunction = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_SECRET) {
        return new response_1.default(500, "Internal Server Error", {});
    }
    if (!email || !password) {
        return new response_1.default(400, "Please enter username and password", {});
    }
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return new response_1.default(400, "User not found", {});
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return new response_1.default(400, "Invalid password", {});
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email }, process.env.JWT_SECRET);
        console.log("Logged in successfully");
        return new response_1.default(200, "Login successful", token);
    }
    catch (error) {
        return new response_1.default(500, "Internal Server Error", {});
    }
});
exports.default = loginFunction;
