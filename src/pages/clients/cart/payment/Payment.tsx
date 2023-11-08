import { Box, Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function Payment() {
  const { id } = useParams();
  return (
    <Box bgcolor={"#eee"} py={2}>
      <Container maxWidth="xl">
        <Box bgcolor={"#fff"} p={5} textAlign={"center"}>
          <Typography
            variant="h2"
            fontSize={"30px"}
            color={"green"}
            fontWeight={"bold"}
          >
            Đơn hàng của bạn đã được tiếp nhận
          </Typography>
          <Box mt={2} fontStyle={"19px"}>
            <Typography variant="body1" fontSize={"19px"}>
              Cảm ơn bạn đã mua hàng tại Fahasa.com
            </Typography>
            <Typography variant="body1" fontSize={"19px"}>
              Mã đơn hàng của bạn là:
              <Typography
                variant="caption"
                fontSize={"19px"}
                fontWeight={"bold"}
                color={"#F7941E"}
              >
                #869693
              </Typography>{" "}
            </Typography>
            <Typography fontSize={"19px"}>
              Bạn sẽ sớm nhận được email từ chúng tôi
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              px: 3,
              fontWeight: "bold",
            }}
          >
            Tiếp tục mua hàng
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Payment;
