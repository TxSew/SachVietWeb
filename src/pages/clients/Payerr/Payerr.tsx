import { NavLink } from "react-router-dom";
import { Box, Container } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";

export default function Payerr() {
  return (
    <Box py={4}>
      <Container maxWidth="xl">
        <Stack py={2}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png"
            alt=""
            width={"70px"}
            height={"70px"}
          />
        </Stack>
        <Stack>
          <Typography fontSize={"23px"} fontWeight={"bold"} color={"#B23A33"}>
            Thanh toán không thành công
          </Typography>
        </Stack>
        <Stack textAlign={"center"} py={3}>
          {" "}
          <Typography textAlign={"center"} maxWidth={485} fontSize={"14px"}>
            Đã có vấn đề xảy ra với việc thanh toán của bạn, bạn vui lòng thử
            lại. Đây là mã đơn hàng của bạn :{" "}
            <Typography color={"#F5BD00"}>#12838484</Typography> trong trường
            hợp bạn muốn liên hệ.
          </Typography>
        </Stack>
        <Stack>
          <Button
            variant="contained"
            sx={{
              padding: "2px 16px",
              textTransform: "capitalize",
              background: "#8C1100",
              "&:hover": {
                background: "#f39801"
              }
            }}
          >
            Thanh toán lại
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
