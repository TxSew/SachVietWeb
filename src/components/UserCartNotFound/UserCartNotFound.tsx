import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { color } from "../../Theme/color";

const CartUserNotFound = () => {
  return (
    <Container maxWidth="xl">
      <Box
        bgcolor={color.white}
        p={"40px"}
        borderRadius={2}
        boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.1)"}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            sx={{
              maxWidth: "160px",
            }}
          >
            <img
              width={"100%"}
              src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"
              alt=""
            />
          </Box>
          <Typography variant="body1" my={"20px"}>
            Khách hàng này chưa có đơn hàng
          </Typography>
        </Stack>
        <Grid container>
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CartUserNotFound;
