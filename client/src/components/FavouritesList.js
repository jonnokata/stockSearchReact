import React, { useEffect, useState } from "react";
import { Text, Center, Box, List, ListItem, ListIcon } from "@chakra-ui/react";

const FavouritesList = (props) => {
  return (
    <Box mt="30px">
      <Center>
        <List>
          {props.favourites &&
            props.favourites.map((el, index) => (
              <ListItem key={index}>
                <Text fontSize="16px">
                  &#10084; {el.stockSymbol} | {el.stockName}
                </Text>
              </ListItem>
            ))}
        </List>
      </Center>
    </Box>
  );
};

export { FavouritesList };
