import React from "react";

import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";

import { BandForm } from "./pages";
import { Band, Order } from "./types";

function App() {
  const bands: Band[] = [skaBand, kpopBand, punkBand];

  const handleOrder = (order: Order) => {
    console.log(order);
  };

  return (
    <div className="container relative mx-auto max-w-5xl my-20 w-full px-4 sm:px-6 lg:px-8">
      <BandForm band={bands[1]} onSubmit={handleOrder} />
    </div>
  );
}

export default App;
