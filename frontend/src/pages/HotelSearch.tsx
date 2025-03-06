"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerDemo } from "@/Components/DatePicker";
import { useSelector } from "react-redux";
import { useDebounce } from "react-use";
import type { RootState } from "@/store/store";

interface City {
  name: string;
  country: string;
}

function filterCities(searchTerm: string, cities: City[]) {
  return cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function HotelSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResultVisibility, setSearchResultVisibility] = useState(false);
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const citiesList = useSelector((state: RootState) => state.search.cities);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      setSearchResults(filterCities(debouncedSearchTerm, citiesList));
    }
  }, [debouncedSearchTerm, citiesList]);

  return (
    <div className="relative p-4">
      <h1 className="text-3xl font-bold mb-4">Search Hotel</h1>

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
          <ul className="absolute w-full bg-black shadow-lg border mt-1 rounded-md">
            {searchResults.map((city) => (
              <li
                key={city.name}
                className="p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setSearchTerm(city.name);
                  setSearchResultVisibility(false);
                }}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Label className="mt-4">Check-in Date</Label>
      <DatePickerDemo />
    </div>
  );
}

export default HotelSearch;
