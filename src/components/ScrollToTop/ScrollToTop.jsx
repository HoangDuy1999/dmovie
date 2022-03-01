import { KeyboardArrowUp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import "./scrollToTop.scss";
const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisiblity] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisiblity(true);
    } else {
      setVisiblity(false);
    }
  }, [pageYOffset]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) {
    return false;
  }

  return (
    <div className="scroll-to-top-container">
      <div
        className="scroll-to-top"
        title="scroll to top"
        onClick={scrollToTop}
      >
        <KeyboardArrowUp fontSize="large"  className="arrow_upward" />
      </div>
    </div>
  );
};

export default ScrollToTop;
