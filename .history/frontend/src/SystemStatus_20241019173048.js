import React, { useEffect, useState } from "react";

const SystemStatus = ({ productId }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        channels: [
          { name: 'level2', product_ids: [productId] },
          { name: 'matches', product_ids: [productId] }
        ]
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'subscriptions') {
        setChannels(data.channels);
      }
    };

    return () => {
      ws.send(JSON.stringify({
        type: 'unsubscribe',
        channels: [
          { name: 'level2', product_ids: [productId] },
          { name: 'matches', product_ids: [productId] }
        ]
      }));
      ws.close();
    };
  }, [productId]);

  return (
    <div>
      <h3>System Status</h3>
      <ul>
        {channels.map((channel, index) => (
          <li key={index}>
            Channel: {channel.name}, Product IDs: {channel.product_ids.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemStatus;
