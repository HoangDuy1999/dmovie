import React from "react";
import { Button } from 'react-bootstrap';
const ButtonLoadMore = ({ page, totalPages }) => {
  return (
    <>
      {page < totalPages ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button size="lg" variant="outline-primary">
            Load more...
          </Button>{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ButtonLoadMore;
