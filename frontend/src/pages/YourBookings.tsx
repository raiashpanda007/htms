import { useState, useEffect } from "react";
import axios from "axios";
import BookingItem from "@/Components/BookingItem";
import { ScrollArea } from "@/components/ui/scroll-area";

function YourBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(
          "http://localhost:3000/hotel/your-bookings",
          { withCredentials: true }
        );
        const fetchedBookings = response.data.data;
        const transformedBookings = fetchedBookings.map((booking: any) => ({
          ...booking,
          place: booking.city,
        }));
        setBookings(transformedBookings);
      } catch (err) {
        console.error("Error fetching bookings", err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Your Bookings</h1>
      <div className="w-full max-w-2xl space-y-4">
        <ScrollArea className="h-[calc(100vh-100px)] overflow-y-auto w-full">
          {bookings.map((booking: any) => (
           <div className="m-3">
             <BookingItem key={booking.id} id={booking.id} {...booking} />
           </div>
          ))}
          
        </ScrollArea>
      </div>
    </div>
  );
}

export default YourBookings;
