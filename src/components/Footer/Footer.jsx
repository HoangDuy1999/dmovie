import React from "react";
import "./footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_top">
        <div className="footer_top_left">
          <span className="footer_top_left_title">About</span>
          <span className="footer_top_left_desc">
            Movie database, tv shows, trailer, movie ratings, movies, movie
            reviews, tmovie is the world's most popular database for movie, TV
            and celebrity content
          </span>
        </div>
        <div className="footer_top_right">
          <div className="footer_top_right_group">
            <span className="footer_top_right_title">Explore</span>
            <span>Top Movies</span>
            <span>Top Shows</span>
            <span>Coming Soon</span>
            <span> Now Playing</span>
            <span> People</span>
          </div>
          <div className="footer_top_right_group">
            <span className="footer_top_right_title">Genres</span>
            <span>Action</span>
            <span>Comedy</span>
            <span>Drama</span>
            <span>Crime</span>
            <span>Adventure</span>
          </div>
          <div className="footer_top_right_group">
            <span className="footer_top_right_title">Pages</span>
            <span>Privacy Plolicy</span>
            <span>Terms of Use</span>
            <span>Cookie Policy</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <span>
          Copyright © 2022 Movie Database | TV Shows | Trailers | Movie Ratings
        </span>
      </div>
    </div>
  );
};

export default Footer;
