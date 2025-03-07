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
const client_1 = require("@prisma/client");
const zodSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
const bcrypt_1 = __importDefault(require("bcrypt"));
const LoginFunction_1 = __importDefault(require("./LoginFunction"));
const prisma = new client_1.PrismaClient();
const Register = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = zodSchema.safeParse(body);
    if (!result.success) {
        return res.status(400).json(new utils_1.response(400, "Bad Request", result.error));
    }
    const { email, password } = result.data;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user) {
            return res.status(400).json(new utils_1.response(400, "User already exists", {}));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });
        const loginUser = yield (0, LoginFunction_1.default)(email, password);
        if (!loginUser.data) {
            return res.status(loginUser.statusCode).json(new utils_1.response(loginUser.statusCode, loginUser.message, null));
        }
        const options = {
            httpOnly: true,
            secure: true,
        };
        return res.status(loginUser.statusCode).cookie("authorization", loginUser.data, options).json(new utils_1.response(200, "Success", {}));
    }
    catch (error) {
        return res.status(500).json(new utils_1.response(500, "Internal Server Error", { error }));
    }
}));
exports.default = Register;
