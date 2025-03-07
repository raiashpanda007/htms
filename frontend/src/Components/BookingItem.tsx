import React from "react";
import { Button } from "@/components/ui/button";

interface BookingItemProps {
  hotelName: string;
  place: string;
  members: string[];
}

const BookingItem: React.FC<BookingItemProps> = ({ hotelName, place, members }) => {
  return (
    <div className="border border-gray-700 p-5 rounded-xl shadow-md bg-black text-white transition-transform duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-semibold">{hotelName}</h2>
      <p className="text-gray-400">{place}</p>
      <div className="mt-3">
        <h3 className="font-semibold">Members:</h3>
        <ul className="list-disc pl-5 text-gray-300">
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-end">
        <Button className="bg-black hover:bg-gray-900 text-white font-semibold cursor-pointer">
          Web Check-in
        </Button>
      </div>
    </div>
  );
};

export default BookingItem;