import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { color } from "../../Theme/color";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Discount() {
  const [textToCopy, setTextToCopy] = useState("H world!");
  const [copySuccess, setCopySuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopySuccess(true);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };
  return (
    <Box
      bgcolor={color.white}
      borderRadius={3}
      sx={{
        width: "340px",
        height: "144px",
      }}
    >
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Box
          padding={"10px"}
          width={"60%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          sx={{
            borderRight: "4px solid orange",
          }}
        >
          <Typography variant="h2" fontWeight={"bold"}>
            MÃ GIẢM 31K
          </Typography>
          <Typography variant="caption">ĐH từ 100K</Typography>

          <Typography variant="body1">NHẬP MÃ NGAY</Typography>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              marginTop: "auto",
              justifyContent: "flex-end",
              width: "100%",
              height: "7px",
              borderRadius: "5px",
              backgroundColor: "#e6e6e6",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "0px",
                width: "19%",
                backgroundColor: "#28B928",
                height: "7px",
                borderRadius: "5px",
              }}
            ></Box>
          </Box>
        </Box>
        <Box
          textAlign={"center"}
          width={"40%"}
          height={"100%"}
          padding={"10px"}
        >
          <Typography variant="caption" fontSize={"12px"}>
            28/10/2023 09:00
          </Typography>
          <Typography
            variant="h2"
            fontWeight={"bold"}
            p={"8px"}
            color={color.colorSale}
            onChange={(e: any) => setTextToCopy(e.target.value)}
          >
            FHS10KT10
          </Typography>

          <Button
            variant="contained"
            sx={{
              background: "#C92127",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            onClick={handleCopyToClipboard}
          >
            Coppy mã
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default Discount;
