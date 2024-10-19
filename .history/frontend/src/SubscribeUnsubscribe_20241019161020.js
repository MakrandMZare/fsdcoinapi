import React, { useState } from "react";

const SubscribeUnsubscribe = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
    // WebSocket logic to subscribe
  };

  const handleUnsubscribe = () => {
    setSubscribed(false);
    // WebSocket logic to unsubscribe
  };

  return (
    <div>
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={handleUnsubscribe}>Unsubscribe</button>
    </div>
  );
};

export default SubscribeUnsubscribe;
