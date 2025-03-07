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
const utils_1 = require("../../utils/utils");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zodSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
const auth = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = zodSchema.safeParse(body);
    if (!result.success) {
        return res.status(400).json(new utils_1.response(400, "Bad Request", result.error));
    }
    const { username, password } = result.data;
    console.log("Env values", process.env.ID, process.env.PASSWORD);
    if (username === process.env.ID && password === process.env.PASSWORD) {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json(new utils_1.response(500, "Internal Server Error", null));
        }
        const cookieOptions = {
            httpOnly: true,
            secure: true,
        };
        const token = jsonwebtoken_1.default.sign({ username: username }, process.env.JWT_SECRET);
        return res.status(200).cookie("jwt", token, cookieOptions).json(new utils_1.response(200, "Success", { JWT: token }));
    }
    else {
        return res.status(401).json(new utils_1.response(401, "Unauthorized", null));
    }
}));
exports.default = auth;
