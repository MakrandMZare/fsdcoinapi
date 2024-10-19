import React, { useState } from "react";

const SubscribeUnsubscribe = () => {
  const [subscriptions, setSubscriptions] = useState({
    'BTC-USD': false,
    'ETH-USD': false,
    'XRP-USD': false,
    'LTC-USD': false,
  });

  const handleSubscribe = (productId) => {
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        channels: [
          { name: 'level2', product_ids: [productId] },
          { name: 'matches', product_ids: [productId] }
        ]
      }));
      setSubscriptions((prev) => ({ ...prev, [productId]: true }));
    };
  };

  const handleUnsubscribe = (productId) => {
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'unsubscribe',
        channels: [
          { name: 'level2', product_ids: [productId] },
          { name: 'matches', product_ids: [productId] }
        ]
      }));
      setSubscriptions((prev) => ({ ...prev, [productId]: false }));
    };
  };

  return (
    <div>
      {Object.keys(subscriptions).map((productId) => (
        <div key={productId}>
          <span>{productId} is {subscriptions[productId] ? 'Subscribed' : 'Unsubscribed'}</span>
          <button onClick={() => handleSubscribe(productId)}>Subscribe</button>
          <button onClick={() => handleUnsubscribe(productId)}>Unsubscribe</button>
        </div>
      ))}
    </div>
  );
};

export default SubscribeUnsubscribe;
