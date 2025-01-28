import React, { useState } from "react";

import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";

import { BandForm } from "./pages";
import { Band, Order } from "./types";
import { ChevronLeftIcon, ChevronRightIcon } from "./components";

function App() {
  const bands: Band[] = [skaBand, kpopBand, punkBand];
  const [currentBandIndex, setCurrentBandIndex] = useState(1);

  const handleOrder = (order: Order) => {
    console.log(order);
  };

  const handlePreviousBand = () => {
    setCurrentBandIndex((prevIndex) =>
      prevIndex === 0 ? bands.length - 1 : prevIndex - 1
    );
  };

  const handleNextBand = () => {
    setCurrentBandIndex((prevIndex) =>
      prevIndex === bands.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container relative mx-auto max-w-5xl my-20 w-full px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePreviousBand}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={handleNextBand}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          <ChevronRightIcon />
        </button>
      </div>
      <BandForm band={bands[currentBandIndex]} onSubmit={handleOrder} />
    </div>
  );
}

export default App;
