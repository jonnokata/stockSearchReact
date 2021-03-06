import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { FunctionalStockContainer } from "./components/MainContainer.js";
import { ChakraProvider, chakra, Box } from "@chakra-ui/react";

export const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box w="100%" h="100%" bgGradient="linear(to-br, purple.100, white )">
          <FunctionalStockContainer />
        </Box>
      </Router>
    </ChakraProvider>
  );
};
