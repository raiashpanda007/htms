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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const zod_1 = require("zod");
const travelerSchema = zod_1.z.object({
    name: zod_1.z.string(),
    age: zod_1.z.string(),
});
const zodSchema = zod_1.z.object({
    hotel: zod_1.z.string(),
    travelers: travelerSchema.array(),
    checkInDate: zod_1.z.string(),
    city: zod_1.z.string(),
});
const HotelBooking = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("HotelBooking");
    const body = req.body;
    const parsedBody = zodSchema.safeParse(body);
    if (!parsedBody.success) {
        return res
            .status(402)
            .json(new response_1.default(402, "Invalid input", parsedBody.error));
    }
    const { hotel, city, travelers, checkInDate } = parsedBody.data;
    try {
        const membersData = travelers.map((traveler) => ({
            name: traveler.name,
            age: parseInt(traveler.age, 10),
        }));
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res
                .status(401)
                .json(new response_1.default(401, "Unauthorized", null));
        }
        const checkInDateObj = new Date(checkInDate);
        const hotelBooking = yield prisma.booking.create({
            data: {
                hotelName: hotel,
                city: city,
                checkInAt: checkInDateObj,
                userId: userId,
                members: {
                    create: membersData,
                },
            },
        });
        return res
            .status(200)
            .json(new response_1.default(200, "Booking successful", hotelBooking));
    }
    catch (error) {
        console.error("Booking error:", error);
        return res
            .status(500)
            .json(new response_1.default(500, "Server error", { error }));
    }
}));
exports.default = HotelBooking;
