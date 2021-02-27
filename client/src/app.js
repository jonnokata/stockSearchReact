import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { FunctionalStockContainer } from "./components/MainContainer.js";

export const App = () => {
  return (
    <Router>
      <div>
        <FunctionalStockContainer />
      </div>
    </Router>
  );
};
