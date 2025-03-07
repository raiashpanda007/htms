"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_middleware_1 = __importDefault(require("../middlewares/verify.middleware"));
const HotelBooking_1 = __importDefault(require("../controllers/booking/HotelBooking"));
const router = (0, express_1.Router)();
router.post("/book", verify_middleware_1.default, HotelBooking_1.default);
exports.default = router;
