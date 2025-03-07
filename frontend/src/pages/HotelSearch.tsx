import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerDemo } from "@/Components/DatePicker";
import { useSelector } from "react-redux";
import { useDebounce } from "react-use";
import axios from "axios";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface City {
  name: string;
  country: string;
}

interface Hotel {
  name: string;
  city: string;
}

interface Member {
  name: string;
  age: string;
}

function filterCities(searchTerm: string, cities: City[]) {
  return cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function filterHotels(city: string, hotels: Hotel[]) {
  return hotels.filter(
    (hotel) => hotel.city.toLowerCase() === city.toLowerCase()
  );
}

function HotelSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [hotelResults, setHotelResults] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResultVisibility, setSearchResultVisibility] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const citiesList = useSelector((state: RootState) => state.search.cities);
  const hotelsList = useSelector((state: RootState) => state.search.hotels);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      setSearchResults(filterCities(debouncedSearchTerm, citiesList));
    }
  }, [debouncedSearchTerm, citiesList]);

  useEffect(() => {
    if (selectedCity) {
      setHotelResults(filterHotels(selectedCity, hotelsList));
      setSelectedHotel(null);
      setMembers([]);
    } else {
      setHotelResults([]);
    }
  }, [selectedCity, hotelsList]);

  const addMember = () => {
    setMembers([...members, { name: "", age: "" }]);
  };

  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const bookHotel = async () => {
    if (!selectedHotel || members.length === 0 || !checkInDate) {
      alert("Please select a hotel, add at least one traveler, and choose a check-in date.");
      return;
    }

    const payload = {
      hotel: selectedHotel,
      city: selectedCity,
      travelers: members,
      checkInDate: checkInDate.toISOString(),
    };

    try {
      console.log("input data", payload);
      const response = await axios.post("http://localhost:3000/hotel/book", payload, {
        headers: {
          "Content-Type": "application/json",
        },withCredentials: true
      });
      navigate("/your-bookings");
      

    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book hotel. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black">
      <div className="w-full max-w-lg bg-black p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Search Hotel</h1>

        <div className="mb-4">
          <Label>Enter your destination</Label>
          <div className="relative">
            <Input
              placeholder="Enter your Destination"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearchResultVisibility(true);
              }}
              onFocus={() => setSearchResultVisibility(true)}
            />
            {searchResultVisibility && searchResults.length > 0 && (
              <ul className="absolute w-full bg-black shadow-lg border mt-1 rounded-md z-10">
                {searchResults.map((city) => (
                  <li
                    key={city.name}
                    className="p-2 hover:bg-gray-500 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(city.name);
                      setSelectedCity(city.name);
                      setSearchResultVisibility(false);
                    }}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {selectedCity && hotelResults.length > 0 && !selectedHotel && (
          <div className="mb-4">
            <Label>Select a hotel in {selectedCity}</Label>
            <ul className="bg-black shadow-lg border mt-1 rounded-md z-10">
              {hotelResults.map((hotel) => (
                <li
                  key={hotel.name}
                  className="p-2 hover:bg-gray-500 cursor-pointer"
                  onClick={() => setSelectedHotel(hotel.name)}
                >
                  {hotel.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedHotel && (
          <div className="mb-4">
            <Label>Selected Hotel</Label>
            <p className="p-2 bg-gray-500 rounded-md">{selectedHotel}</p>

            <div className="mb-4">
              <Label>Travelers</Label>
              {members.map((member, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) =>
                      updateMember(index, "name", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Age"
                    value={member.age}
                    onChange={(e) => updateMember(index, "age", e.target.value)}
                  />
                </div>
              ))}
              <Button onClick={addMember}>Add Member</Button>
            </div>
          </div>
        )}

        <div className="mb-4">
          <Label>Check-in Date</Label>
          <DatePickerDemo onChange={(date: Date) => setCheckInDate(date)} />
        </div>

        <Dialog>
          <DialogTrigger>
            <Button className="cursor-pointer">Book Ticket</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                You can't undo this action. Are you sure you want to proceed?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button className="cursor-pointer" onClick={bookHotel}>
                Book
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default HotelSearch;
