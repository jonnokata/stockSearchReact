import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { FunctionalStockContainer } from "./components/MainContainer.js";
import { ChakraProvider } from "@chakra-ui/react";

export const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <FunctionalStockContainer />
        </div>
      </Router>
    </ChakraProvider>
  );
};
