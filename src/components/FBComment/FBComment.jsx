import React, { useEffect } from "react";
import "./fbComment.scss";
const FBComment = ({ width, dataHref, numPost }) => {
    useEffect(() => {
      if (window.FB) {
        window.FB.XFBML.parse();
      }
      window.fbAsyncInit = function () {
          window.FB.init({
              appId: process.env.REACT_APP_FACEBOOK_APP_ID,
              cookie: true,  // enable cookies to allow the server to access the session
              xfbml: true,  // parse social plugins on this page
              version: 'v2.5' // use version 2.0
          });
          window.FB.Canvas.setAutoGrow();
      };
      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/vi_VN/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'))
    }, [dataHref]);
  return (
    <>
      <div
        className="fb-comments"
        style={{width: "100%", backgroundColor: "white" }}
        // data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
        data-href={dataHref}
        // data-href="https://optimistic-bell-01121d.netlify.app/watch/4587?type=0&ep=0"
        data-width="100%"
        data-numposts="5"
      ></div>
    </>
  );
};

export default FBComment;
