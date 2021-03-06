import React, { useEffect, useState } from "react";

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
      <button
        type="submit"
        id="save-favourite"
        className="btn btn-primary"
        onClick={handleClick}
      >
        {/* if true = show "Favourite" and onClick add to favourite list */}
        {/* if false = show "Unfavourite" and onClick remove from favourite list */}
        {props.isFavourite ? "Unfavourite" : "Favourite"};
      </button>
    </div>
  );
};

export { FavouritesButton };
