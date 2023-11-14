import { Box, Button, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { color } from "../../Theme/color";
import { formatDates } from "../../helpers/FortmatDate";
import { httpVoucher } from "../../submodules/controllers/http/axiosController";
import { Discount } from "../../submodules/models/DiscountModel/Discount";

function DiscountItem(props: Discount) {
  const handleSave = (ele: any) => {
    httpVoucher
      .addVoucherUser(ele)
      .then((response) => {
        if (response) {
          toast.success("Mã giảm giá đã được thêm vào ví voucher thành công", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        if (error.response.data.message == "voucher already exists") {
          toast.warning("Mã giảm giá đã tồn tại trong ví voucher!");
        }
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
            onClick={() =>
              handleSave({
                discountId: props.id,
                userId: 3,
                code: 45345,
              })
            }
          >
            Lưu
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default DiscountItem;
