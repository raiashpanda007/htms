import BookingItem from "@/Components/BookingItem";

const dummyBookings = [
  {
    id: 1,
    hotelName: "Grand Palace Hotel",
    place: "New York, USA",
    members: ["John Doe", "Jane Doe", "Alice Smith"],
  },
  {
    id: 2,
    hotelName: "Ocean View Resort",
    place: "Miami, USA",
    members: ["Michael Brown", "Sarah Johnson"],
  },
];

function YourBookings() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Your Bookings</h1>
      <div className="w-full max-w-2xl space-y-4">
        {dummyBookings.map((booking) => (
          <BookingItem key={booking.id} {...booking} />
        ))}
      </div>
    </div>
  );
}

export default YourBookings;
