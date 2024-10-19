import React, { useEffect, useState } from "react";

const PriceView = ({ productId }) => {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        channels: [{ name: 'level2', product_ids: [productId] }]
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'l2update') {
        const { changes } = data;
        changes.forEach(([side, price, size]) => {
          if (side === 'buy') {
            setBids((prevBids) => [...prevBids.filter(bid => bid.price !== price), { price, size }]);
          } else if (side === 'sell') {
            setAsks((prevAsks) => [...prevAsks.filter(ask => ask.price !== price), { price, size }]);
          }
        });
      }
    };

    return () => {
      ws.send(JSON.stringify({
        type: 'unsubscribe',
        channels: [{ name: 'level2', product_ids: [productId] }]
      }));
      ws.close();
    };
  }, [productId]);

  return (
    <div>
      <h3>{productId}</h3>
      <div>
        <h4>Bids</h4>
        {bids.map((bid, index) => (
          <div key={index}>Price: {bid.price}, Size: {bid.size}</div>
        ))}
      </div>
      <div>
        <h4>Asks</h4>
        {asks.map((ask, index) => (
          <div key={index}>Price: {ask.price}, Size: {ask.size}</div>
        ))}
      </div>
    </div>
  );
};

export default PriceView;
