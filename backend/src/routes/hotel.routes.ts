import { Router } from "express";
import verifyUser from "../middlewares/verify.middleware";
import HotelBooking from "../controllers/booking/HotelBooking";
const router = Router();
router.post("/book", verifyUser, HotelBooking);
export default router;
