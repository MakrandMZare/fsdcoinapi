import React, { useEffect, useState } from "react";

const PriceView = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // WebSocket logic to get price
  }, []);

  return <div>Current Price: {price}</div>;
};

export default PriceView;
