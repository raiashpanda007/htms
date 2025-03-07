"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_middleware_1 = __importDefault(require("../middlewares/verify.middleware"));
const HotelBooking_1 = __importDefault(require("../controllers/booking/HotelBooking"));
const YourBookings_1 = __importDefault(require("../controllers/booking/YourBookings"));
const Webcheckin_1 = __importDefault(require("../controllers/booking/Webcheckin"));
const router = (0, express_1.Router)();
router.post("/book", verify_middleware_1.default, HotelBooking_1.default);
router.get("/your-bookings", verify_middleware_1.default, YourBookings_1.default);
router.post("/checkin", verify_middleware_1.default, Webcheckin_1.default);
exports.default = router;
