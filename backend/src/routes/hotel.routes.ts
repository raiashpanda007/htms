import { Router } from "express";
import verifyUser from "../middlewares/verify.middleware";
import HotelBooking from "../controllers/booking/HotelBooking";
import userBookings from "../controllers/booking/YourBookings";
import checkInUser from "../controllers/booking/Webcheckin";
const router = Router();
router.post("/book", verifyUser, HotelBooking);
router.get("/your-bookings", verifyUser, userBookings)
router.post("/checkin", verifyUser, checkInUser);
export default router;
