import React from "react";

const CardWatchList = ({ item }) => {
  return (
    <div>
      <h1>{item.name}</h1>
      <h1>{item.backdrop_path}</h1>
    </div>
  );
};

export default CardWatchList;
