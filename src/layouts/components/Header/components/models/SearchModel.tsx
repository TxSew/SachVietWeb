import { Box, Fade, Modal } from "@mui/material";
import React from "react";

export default function SearchModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return <Box></Box>;
}
