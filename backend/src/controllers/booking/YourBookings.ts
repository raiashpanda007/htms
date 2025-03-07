import { PrismaClient } from "@prisma/client";
import response from "../../utils/response";
import asyncHandler from "../../utils/asyncHandler";
const prisma = new PrismaClient();

const userBookings = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json(new response(401, "Unauthorized", null));
  }
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: userId },
      include: { members: true },
    });
    return res
      .status(200)
      .json(new response(200, "Bookings fetched successfully", bookings));
  } catch (error) {
    console.error("Booking error:", error);
    return res
      .status(500)
      .json(new response(500, "Server error", { error }));
  }
});

export default userBookings;
