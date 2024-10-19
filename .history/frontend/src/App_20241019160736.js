import MatchView from "./MatchView";
import PriceView from "./PriceView";
import React from "react";
import SubscribeUnsubscribe from "./SubscribeUnsubscribe";
import SystemStatus from "./SystemStatus";

const App = () => {
  return (
    <div>
      <SubscribeUnsubscribe />
      <PriceView />
      <MatchView />
      <SystemStatus />
    </div>
  );
};

export default App;
