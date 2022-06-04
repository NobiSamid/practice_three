import React from "react";
import DropDown from "./components/DropDown";
import Search from "./components/Search";

const options = [
  {
    label: "The Color Red",
    value: "red",
  },
  {
    label: "The color Green",
    value: "green",
  },
  {
    label: "The color Blue",
    value: "blue",
  },
];

export default function App() {
  return (
    <div>
      {/* <Search /> */}
      <DropDown options={options} />
    </div>
  );
}
