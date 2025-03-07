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
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("1");
    const token = req.cookies.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("2");
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    console.log("3");
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    console.log("4");
    req.user = decoded;
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Passed middleware");
    next();
}));
exports.default = verifyUser;
