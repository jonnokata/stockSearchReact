import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Box,
  Input,
  InputGroup,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";

const StockSearchForm = (props) => {
  const [formState, setFormState] = useState({
    searchParam: "",
  });

  // What does the {...formState} do?
  const handleChange = (e) => {
    const newState = { ...formState };
    newState[e.target.name] = e.target.value;
    setFormState(newState);
  };

  // What does this handleSubmit function do?
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formState.searchParam);
  };

  // What is the purpose of onSubmit in the form tags?
  // What is the purpose of "onChange" in the input field?
  return (
    <Box>
      <form
        onSubmit={handleSubmit}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <label htmlFor="inlineFormInputGroupStockName"></label>

        <Input
          margin="auto"
          size="sm"
          variant="outline"
          type="text"
          className="form-input"
          id="inlineFormInputGroupStockName"
          name="searchParam"
          placeholder="Search for stock"
          value={formState.searchParam}
          onChange={handleChange}
          bgColor="gray.100"
          w=""
        ></Input>
        <Button
          colorScheme="cyan"
          color="white"
          size="sm"
          ml={4}
          type="submit"
          // id="search-submit"
          // className="btn btn-primary"
        >
          Search
        </Button>
      </form>
    </Box>
  );
};

export { StockSearchForm };
