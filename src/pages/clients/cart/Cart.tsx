import {
  Box,
  Container,
  Typography
} from "@mui/material";
import { useState } from "react";
import CartNotFound from "./components/CartNotFound/CartNotFound";
import CartProduct from "./components/CartNotFound/CartProduct";
export const Cart = () => {

  
  const [isCheck, setisCheck] = useState(false);
  return (
    <Box bgcolor={"#eee"} pb={2}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          py={2}
          fontSize={"clamp(16px,0.2rem + 1vw,19px )"}
        >
          GIỎ HÀNG (0 sản phẩm)
        </Typography>
        {isCheck ? (
          <CartNotFound />
        ) : (
         <CartProduct/>
        )}
      </Container>
    </Box>
  );
};
