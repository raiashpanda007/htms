import asyncHandler from "../../utils/asyncHandler";
import repsonse from "../../utils/response";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z as zod } from "zod";

const travelerSchema = zod.object({
  name: zod.string(),
  age: zod.string(),
});

const zodSchema = zod.object({
  hotel: zod.string(),
  travelers: travelerSchema.array(),
  checkInDate: zod.string(),
  city: zod.string(),
});

const HotelBooking = asyncHandler(async (req, res) => {
  console.log("HotelBooking");
  const body = req.body;
  const parsedBody = zodSchema.safeParse(body);
  if (!parsedBody.success) {
    return res
      .status(402)
      .json(new repsonse(402, "Invalid input", parsedBody.error));
  }
  const { hotel, city, travelers, checkInDate } = parsedBody.data;
  try {
    const membersData = travelers.map((traveler) => ({
      name: traveler.name,
      age: parseInt(traveler.age, 10),
    }));
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json(new repsonse(401, "Unauthorized", null));
    }
    const checkInDateObj = new Date(checkInDate);
    const hotelBooking = await prisma.booking.create({
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
      .json(new repsonse(200, "Booking successful", hotelBooking));
  } catch (error) {
    console.error("Booking error:", error);
    return res
      .status(500)
      .json(new repsonse(500, "Server error", { error }));
  }
});

export default HotelBooking;
