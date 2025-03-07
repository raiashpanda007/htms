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
const zod_1 = require("zod");
const response_1 = __importDefault(require("../../utils/response"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkInSchema = zod_1.z.object({
    bookingId: zod_1.z.string(),
    adhaarNumbers: zod_1.z.record(zod_1.z.string()),
});
const checkInUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedBody = checkInSchema.safeParse(body);
    if (!parsedBody.success) {
        return res
            .status(402)
            .json(new response_1.default(402, "Invalid input", parsedBody.error));
    }
    const { bookingId, adhaarNumbers } = parsedBody.data;
    const booking = yield prisma.booking.findUnique({
        where: { id: bookingId },
        include: { members: true },
    });
    if (!booking) {
        return res
            .status(404)
            .json(new response_1.default(404, "Booking not found", null));
    }
    for (const member of booking.members) {
        if (!adhaarNumbers[member.name] ||
            adhaarNumbers[member.name].trim() === "") {
            return res
                .status(400)
                .json(new response_1.default(400, "Please provide Aadhaar for all members", null));
        }
    }
    for (const member of booking.members) {
        yield prisma.member.update({
            where: { id: member.id },
            data: { aadharNumber: adhaarNumbers[member.name] },
        });
    }
    const updatedBooking = yield prisma.booking.update({
        where: { id: bookingId },
        data: { checkedIn: true },
    });
    return res
        .status(200)
        .json(new response_1.default(200, "Check-in successful", updatedBooking));
}));
exports.default = checkInUser;
