import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox"; // Use Checkbox for multiple selections
import { Slider } from "./ui/slider"; // Use Slider for price range
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/flightSlice";

const filterData = [
  {
    filterType: "Airline",
    filterValue: [
      "Biman Bangladesh Airlines",
      "Qatar",
      "Emirates",
      "Turkish Airlines",
      "Singapore Airlines",
      "Malaysia Airlines",
      "Saudia",
      "Thai Airways",
      "IndiGo",
      "Flydubai",
    ],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const toggleAirline = (airline) => {
    setSelectedAirlines(
      (prev) =>
        prev.includes(airline)
          ? prev.filter((item) => item !== airline) // Remove if already selected
          : [...prev, airline] // Add if not selected
    );
  };

  useEffect(() => {
    // Dispatch both selected airlines and price range to redux
    dispatch(setSearchedQuery({ selectedAirlines, priceRange }));
  }, [dispatch, selectedAirlines, priceRange]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Flights</h1>
      <hr className="mt-3" />

      {/* Airline Filter */}
      {filterData.map((data, index) => (
        <div key={index}>
          <h1 className="font-bold text-lg">{data?.filterType}</h1>
          {data?.filterValue?.map((value, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div key={idx} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={itemId}
                  checked={selectedAirlines.includes(value)}
                  onCheckedChange={() => toggleAirline(value)}
                />
                <Label htmlFor={itemId}>{value}</Label>
              </div>
            );
          })}
        </div>
      ))}

      {/* Price Range Filter */}
      <div className="mt-4">
        <h1 className="font-bold text-lg mb-5">Price</h1>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value)} // Update price range state
          min={0}
          max={500000}
          step={20}
        />
        <div className="flex justify-between mt-2">
          <span>{priceRange[0]}</span>
          <span>{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
