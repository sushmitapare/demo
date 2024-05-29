// import { useState } from "react";

// function App() {
//   const [count, setCount] = useState(0);
//   const incCount = () => {
//     setCount(count + 1);
//   };
//   const decCount = () => {
//     if (count > 0) {
//       setCount(count - 1);
//     }
//   };
//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={incCount}>increment Count</button>
//       <button onClick={decCount}>decrement Count</button>
//     </div>
//   );
// }
// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
function App() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectDestOption, setSelectDestOption] = useState([]);
  const [originVal, setOriginVal] = useState("");
  const [destinationVal, setDestinationVal] = useState("");
  // const [flag, setFlag] = useState(false);
  useEffect(() => {
    fetchOption();
  }, []);

  const fetchOption = async () => {
    try {
      debugger;
      const response = await axios(
        "https://run.mocky.io/v3/566ca696-d0e2-4220-b4ac-bfc77289bcbf"
      );
      debugger;
      const data = await response.data.map((item, index) => ({
        value: index,
        label: item.airportName,
      }));
      debugger;
      setSelectedOption(data);
    } catch (err) {
      console.log("Error feteching data", err);
    }
  };

  const fetchDestOption = async (origin) => {
    try {
      const response = await axios(
        "https://run.mocky.io/v3/566ca696-d0e2-4220-b4ac-bfc77289bcbf"
      );
      const data = await response.data
        .map((item, index) => ({
          value: index,
          label: item.airportName,
        }))
        .filter((options) => options.value !== origin.value);
      setSelectDestOption(data);
    } catch (error) {
      console.error("Error Fetching data", error);
    }
  };
  const handleChange = async (event) => {
    const origin = {
      value: event.value,
      label: event.label,
    };
    setOriginVal(origin);
    //setDestinationVal(null);
    fetchDestOption(origin);
  };
  const handleDestChange = (event) => {
    setDestinationVal({
      value: event.value,
      label: event.label,
    });
  };

  return (
    <div>
      <Select
        value={originVal}
        onChange={handleChange}
        options={selectedOption}
        placeholder="select an option"
      />

      <Select
        onChange={handleDestChange}
        value={destinationVal}
        options={selectDestOption}
        placeholder="select an option"
      />
    </div>
  );
}
export default App;
