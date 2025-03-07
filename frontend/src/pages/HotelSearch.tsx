"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerDemo } from "@/Components/DatePicker";
import { useSelector } from "react-redux";
import { useDebounce } from "react-use";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";

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
  return hotels.filter((hotel) => hotel.city.toLowerCase() === city.toLowerCase());
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
                    onChange={(e) => updateMember(index, "name", e.target.value)}
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
          <DatePickerDemo />
        </div>

        <Button className="w-full font-semibold">Book Ticket</Button>
      </div>
    </div>
  );
}

export default HotelSearch;
