import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import CartNotFound from "./components/CartNotFound/CartNotFound";
import CartProduct from "./components/CardProduct/CartProduct";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/storeClient";
export const Cart = () => {
  const [isCheck, setisCheck] = useState(false);
  const cart = useSelector((cart: RootState) => cart.cart);
  return (
    <Box bgcolor={"#eee"} pb={2}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          py={2}
          fontSize={"clamp(16px,0.2rem + 1vw,19px )"}
        >
          GIỎ HÀNG ({cart.cartItems.length} sản phẩm)
        </Typography>
      </Container>
      {cart.cartItems.length <= 0 ? <CartNotFound /> : <CartProduct />}
    </Box>
  );
};
