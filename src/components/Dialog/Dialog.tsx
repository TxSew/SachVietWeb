import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
interface TDialog {
  message: string;
  open: boolean;
  onDelete: (id:number) => void;
  onClose: () => void;
}
const DialogConfirm: React.FC<TDialog> = (props) => {
  const { open, onClose , onDelete} = props;

const handleDelete = (id:any) => {
     console.log(id);
}

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        aria-labelledby="customized-dialog-title"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            textAlign={"center"}
            padding={"0 24px "}
            sx={{
              color: "red",
            }}
          >
            <DeleteForeverIcon
              sx={{
                fontSize: "56px",
                color: "rgb(201, 33, 39)",
              }}
            />
            <DialogTitle fontSize={"16px"}>
              {props.message}
            </DialogTitle>
          </DialogContentText>
        </DialogContent>
        <Box
          display={"flex"}
          paddingBottom={"24px"}
          justifyContent={"space-around"}
        >
          <Button
         onClick={()=> props.onClose()}
            sx={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "12px",
              color: "black",
              fontSize: "12px",
              fontWeight: "bold",
              width: "96px",
            }}
          >
            Hủy
          </Button>
          <Button
            sx={{
              padding: "8px 16px",
              border: "1px solid red",
              borderRadius: "12px",
              background: "red",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              width: "96px",
              ":hover": {
                backgroundColor: "rgb(201, 33, 39)",
              },
            }}
          >
            Đồng ý
          </Button>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogConfirm;
