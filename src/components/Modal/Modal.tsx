import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface ToastModalProps {
  open: boolean;
  onClose: () => void;
  id?: number;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  boxShadow: 24,
  p: 4,
};

const ToastModal: React.FC<ToastModalProps> = (props) => {
  const { open, onClose } = props;
  const handelDelete = () => {
    
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop ": {
            backgroundColor: "transparent",
          },
          "& .css-1iuhrvm": {
            border: "1px solid gray",
            boxShadow: "none",
          },
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Button>Cancel</Button>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={handelDelete}>confirm</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ToastModal;
