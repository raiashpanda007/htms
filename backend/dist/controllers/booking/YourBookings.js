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
const client_1 = require("@prisma/client");
const response_1 = __importDefault(require("../../utils/response"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const prisma = new client_1.PrismaClient();
const userBookings = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json(new response_1.default(401, "Unauthorized", null));
    }
    try {
        const bookings = yield prisma.booking.findMany({
            where: { userId: userId },
            include: { members: true },
        });
        return res
            .status(200)
            .json(new response_1.default(200, "Bookings fetched successfully", bookings));
    }
    catch (error) {
        console.error("Booking error:", error);
        return res
            .status(500)
            .json(new response_1.default(500, "Server error", { error }));
    }
}));
exports.default = userBookings;
