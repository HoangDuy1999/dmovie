import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import { useParams } from 'react-router-dom'
const MovieDetail = () => {
  const { movieId } = useParams();
  console.log(movieId);
  return (
    <div>
      <Navbar />
      <MovieInfo movieId={movieId}/>
    </div>
  );
};

export default MovieDetail;
