import React, { useEffect, useState } from "react";
import { Button, Text } from "@chakra-ui/react";

const FavouritesButton = (props) => {
  // const [isFavourite, setIsFavourite] = useState(false);
  // const [showFavouriteButtonValue, setShowFavouriteButtonValue] = useState(
  //   "Favourite"
  // );

  const handleClick = (e) => {
    // e.preventDefault();
    // setShowFavouriteButtonValue(!showFavouriteButtonValue);
    props.onClick();
  };

  return (
    <div>
      <Button
        colorScheme="cyan"
        color="white"
        size="sm"
        ml={4}
        type="submit"
        id="save-favourite"
        className="btn btn-primary"
        onClick={handleClick}
      >
        {/* if true = show "Favourite" and onClick add to favourite list */}
        {/* if false = show "Unfavourite" and onClick remove from favourite list */}
        {props.isFavourite ? "Unfavourite" : "Favourite"}
      </Button>
    </div>
  );
};

export { FavouritesButton };
