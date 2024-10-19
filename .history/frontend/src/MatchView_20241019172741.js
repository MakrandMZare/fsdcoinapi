import React, { useState, useEffect } from 'react';
import './MatchView.css'; // Import your CSS file for styling

const MatchView = ({ productId }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        channels: [{ name: 'matches', product_ids: [productId] }]
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'match') {
        setMatches((prevMatches) => [data, ...prevMatches.slice(0, 99)]); // Keep only the most recent 100 matches
      }
    };

    return () => {
      ws.send(JSON.stringify({
        type: 'unsubscribe',
        channels: [{ name: 'matches', product_ids: [productId] }]
      }));
      ws.close();
    };
  }, [productId]);

  return (
    <div>
      <h3>Match View for {productId}</h3>
      <div className="match-view">
        {matches.map((match, index) => (
          <div key={index} className={match.side === 'buy' ? 'buy' : 'sell'}>
            <span>Timestamp: {new Date(match.time).toLocaleString()}</span>
            <span>Product: {match.product_id}</span>
            <span>Trade Size: {match.size}</span>
            <span>Price: {match.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchView;
