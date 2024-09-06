import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    filterValue: ["Bangladesh", "Canada", "India", "USA", "UK", "Germany"],
  },
  {
    filterType: "Industry",
    filterValue: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Graphic Designer",
      "Full Stack Developer",
      "Mobile App Developer",
      "Software Engineer",
      "Nextjs Developer",
      "Laravel Developer",
      "Flutter Developer",
      "React Developer",
    ],
  },
  // {
  //   filterType: "Salary",
  //   filterValue: [
  //     "20k - 40k",
  //     "40k - 60k",
  //     "60k - 80k",
  //     "80k - 100k",
  //     "100k - 120k",
  //   ],
  // },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [dispatch, selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data?.filterType}</h1>
            {data?.filterValue?.map((value, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={index} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={value} id={itemId} />
                  <Label htmlFor={itemId}>{value}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
