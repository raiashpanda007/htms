import asyncHandler from "../../utils/asyncHandler";
import { z as zod } from "zod";
import response from "../../utils/response";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const checkInSchema = zod.object({
  bookingId: zod.string(),
  adhaarNumbers: zod.record(zod.string()),
});

const checkInUser = asyncHandler(async (req, res) => {
  const body = req.body;
  const parsedBody = checkInSchema.safeParse(body);
  if (!parsedBody.success) {
    return res
      .status(402)
      .json(new response(402, "Invalid input", parsedBody.error));
  }
  const { bookingId, adhaarNumbers } = parsedBody.data;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { members: true },
  });
  if (!booking) {
    return res
      .status(404)
      .json(new response(404, "Booking not found", null));
  }
  for (const member of booking.members) {
    if (
      !adhaarNumbers[member.name] ||
      adhaarNumbers[member.name].trim() === ""
    ) {
      return res
        .status(400)
        .json(
          new response(400, "Please provide Aadhaar for all members", null)
        );
    }
  }
  for (const member of booking.members) {
    await prisma.member.update({
      where: { id: member.id },
      data: { aadharNumber: adhaarNumbers[member.name] },
    });
  }
  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { checkedIn: true },
  });
  return res
    .status(200)
    .json(new response(200, "Check-in successful", updatedBooking));
});

export default checkInUser;
