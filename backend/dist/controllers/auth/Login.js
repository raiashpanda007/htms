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
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const response_1 = __importDefault(require("../../utils/response"));
const zod_1 = require("zod");
const LoginFunction_1 = __importDefault(require("./LoginFunction"));
const zodSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
const login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = zodSchema.safeParse(body);
    if (!result.success) {
        return res.status(400).json(new response_1.default(400, "Bad Request", result.error));
    }
    const { email, password } = result.data;
    const loginResponse = yield (0, LoginFunction_1.default)(email, password);
    if (!loginResponse.data) {
        return res.status(loginResponse.statusCode).json(new response_1.default(loginResponse.statusCode, loginResponse.message, null));
    }
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res.status(loginResponse.statusCode).cookie("authorization", loginResponse.data, options).json(new response_1.default(200, "Success", {}));
}));
exports.default = login;
