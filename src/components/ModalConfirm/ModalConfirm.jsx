import React, { useState, useEffect } from "react";
import "./modalConfirm.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { BsCheck } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const ModalConfirm = ({ isOpen, title, message, handleConfirm }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const style = {
    position: "relative",
    top: "5%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    width: "60%",
    margin: "0 auto",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 24,
    p: 2,
  };
  useEffect(() => {
    setOpen(isOpen);
  }, []);
  return (
    <div className="modal_confirm_container">
      <Modal
        style={{ border: "none" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ padding: "5px !important" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            style={{ fontWeight: 700, padding: "10px 0" }}
            component="h2"
          >
            {title}
          </Typography>
          <Divider />
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {message}
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" style={{ marginRight: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BsCheck
                  style={{ fontSize: "25px", padding: 0, marginLeft: "-5px" }}
                />
                <span>YES</span>
              </div>
            </Button>
            <Button color="secondary" variant="outlined">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaTimes
                  style={{ backgroundColor: "white", fontSize: "16px" }}
                />
                <span>NO</span>
              </div>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
