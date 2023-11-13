import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { color } from "../../Theme/color";
import { formatDates } from "../../helpers/FortmatDate";
import { Discount } from "../../submodules/models/DiscountModel/Discount";
import HttpVoucherController from "../../submodules/controllers/http/httpVoucherController";
import { BaseAPi } from "../../configs/BaseApi";
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
const http = new HttpVoucherController(BaseAPi);
function DiscountItem(props: Discount) {
  const [open, setOpen] = React.useState(false);
  const handleSave = () => {};
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
            backgroundColor: "white",
            borderRight: "4px solid orange",
          }}
        >
          <Typography variant="h2" fontWeight={"bold"}>
            {props.desc}
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
            {formatDates(props.expiration_date)}
          </Typography>
          <Typography
            variant="h2"
            fontWeight={"bold"}
            p={"8px"}
            color={color.borderColor}
            textTransform={"uppercase"}
          >
            {props.code}
          </Typography>

          <Button
            variant="contained"
            sx={{
              background: "#C92127",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            onClick={() => handleSave()}
          >
            Lưu
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default DiscountItem;
