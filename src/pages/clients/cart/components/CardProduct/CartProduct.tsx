import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { color } from "../../../../../Theme/color";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart
} from "../../../../../redux/features/cart/CartProducer";
import { RootState } from "../../../../../redux/storeClient";
import { Product } from "../../../../../submodules/models/ProductModel/Product";
import { numberFormat } from "../../../../../helpers/formatPrice";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CartProduct = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const cart = useSelector((state: RootState) => state.cart.cartItems);
  useEffect(() => {
    fetchCart();
  }, []);
  const [Cart, setCart] = useState<Product[]>([]);
  const fetchCart = async () => {
    const local = localStorage.getItem("cartItems");
    if (local) {
      const localCart = JSON.parse(local);
      setCart(localCart);
    }
  };
  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  const handleRemove = (id: any) => {
    const remove = cart.filter((cart: any) => cart.id !== id);
    dispatch(removeFromCart(id));
    setCart(remove);
  };
  const handleDes = (id: any) => {
    dispatch(decreaseCart(id));
  };
  const handleIncrement = (id: any) => {
    dispatch(addToCart(id));
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Stack
            bgcolor={color.white}
            direction={"row"}
            justifyContent={"space-between"}
            p={2}
            borderRadius={"4px"}
          >
            <Stack direction={"row"} spacing={3}>
              <Typography>
                Tổng số lượng ({cartTotalQuantity} sản phẩm)
              </Typography>
            </Stack>

            <Stack direction={"row"} spacing={3} pr={4}>
              <Typography>Số lượng</Typography>
              <Typography>Thành tiền</Typography>
            </Stack>
          </Stack>
          <Box>
            {cart.map((element: Product) => {
              return (
                <Stack
                  className="cartItem"
                  direction={"row"}
                  mt={2}
                  p={2}
                  borderRadius={2}
                  bgcolor={color.white}
                  justifyContent={"space-between"}
                >
                  <Stack
                    className="cartItem_thumb"
                    direction={"row"}
                    spacing={2}
                  >
                    <Stack direction={"row"} alignItems={"normal"} spacing={2}>
                      <Box maxWidth={"119px"}>
                        <img
                          src={
                            element.productImages
                              ? element.productImages[0].image
                              : ""
                          }
                          alt=""
                          width={"100%"}
                        />
                      </Box>
                      <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                      >
                        <Typography>{element.title}</Typography>
                        <Stack direction={"row"} spacing={2}>
                          <Typography
                            variant="caption"
                            className="cartItem_Price"
                            fontWeight={"bold"}
                          >
                            {numberFormat(Number(element.price))}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="cartItem_PriceSale"
                            sx={{
                              textDecoration: "underline"
                            }}
                          >
                            {`${numberFormat(Number(element.price_sale))} `}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    className="cartItem_action"
                    direction={"row"}
                    spacing={2}
                  >
                    <Stack
                      direction={"row"}
                      spacing={3}
                      border={"1px solid #eee"}
                      p={"3px 10px"}
                      borderRadius={2}
                    >
                      <Box>
                        <RemoveIcon
                          sx={{
                            fontSize: "17px",
                            cursor: "pointer"
                          }}
                          onClick={() => handleDes(element.id)}
                        />
                      </Box>
                      <input
                        type="text"
                        value={element?.cartQuantity}
                        style={{
                          width: "30px",
                          textAlign: "center"
                        }}
                      />
                      <AddIcon
                        onClick={() => handleIncrement(element)}
                        sx={{
                          fontSize: "17px",
                          cursor: "pointer"
                        }}
                      />
                    </Stack>
                    <Typography color={"#F39801"}>
                      {
                        element?.price_sale !== undefined &&
                        element?.cartQuantity !== undefined
                          ? `${numberFormat(
                              Number(element.price_sale * element.cartQuantity)
                            )} `
                          : "N/A" /* Replace "N/A" with your preferred placeholder */
                      }
                    </Typography>
                    <React.Fragment>
                      <DeleteForeverIcon
                        onClick={handleClickOpen}
                        sx={{
                          fontSize: "17px",
                          cursor: "pointer"
                        }}
                      />
                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                      >
                        <DialogContent>
                          <DialogContentText
                            id="alert-dialog-slide-description"
                            textAlign={"center"}
                            padding={"0 24px "}
                            sx={{
                              color: "red"
                            }}
                          >
                            <DeleteForeverIcon
                              sx={{
                                fontSize: "56px",
                                color: "rgb(201, 33, 39)"
                              }}
                            />
                            <DialogTitle fontSize={"16px"}>
                              {"Bạn chắc chắn muốn xóa sản phẩm này ?"}
                            </DialogTitle>
                          </DialogContentText>
                        </DialogContent>
                        <Box
                          display={"flex"}
                          paddingBottom={"24px"}
                          justifyContent={"space-around"}
                        >
                          <Button
                            sx={{
                              padding: "8px 16px",
                              border: "1px solid #ccc",
                              borderRadius: "12px",
                              color: "black",
                              fontSize: "12px",
                              fontWeight: "bold",
                              width: "96px"
                            }}
                            onClick={handleClose}
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
                                backgroundColor: "rgb(201, 33, 39)"
                              }
                            }}
                            onClick={() => handleRemove(element.id)}
                          >
                            Đồng ý
                          </Button>
                        </Box>
                      </Dialog>
                    </React.Fragment>
                  </Stack>
                </Stack>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor={color.white} px={2} borderRadius={2}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              py={2}
              borderBottom={"1px solid #eee"}
            >
              <Stack color={"#F39801"} direction={"row"} spacing={2}>
                <Typography variant="body1">KHUYẾN MÃI</Typography>
                <LoyaltyIcon
                  sx={{
                    fontSize: "17px"
                  }}
                />
              </Stack>
              <Stack color={"#F39801"} direction={"row"}>
                <Typography variant="body1"> Xem thêm</Typography>
                <KeyboardArrowRightIcon />
              </Stack>
            </Stack>
            <Box pt={2}>
              <Stack
                direction={"row"}
                border={"1px solid #eee"}
                spacing={2}
                p={1}
                borderRadius={2}
                fontSize={"14px"}
                color={"#F39801"}
              >
                <input
                  placeholder="Nhập mã khuyến mãi/Quà tặng"
                  style={{
                    flex: 1,
                    color: "#F39801"
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid #F39801",
                    color: "#F39801",
                    "&:hover": {
                      border: "1px solid #008C89",
                      color: "#008C89"
                    }
                  }}
                >
                  <Typography variant="body1">Áp dụng</Typography>
                </Button>
              </Stack>
              <Typography
                variant="body1"
                color={color.text_color}
                py={1}
                fontSize={"13px"}
              >
                Có thể áp dụng đồng thời mot ma
              </Typography>
            </Box>
          </Box>

          <Box bgcolor={color.white} px={2} borderRadius={2} mt={2}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              py={2}
              borderBottom={"1px solid #eee"}
            >
              <Stack color={"#F39801"} direction={"row"} spacing={2}>
                <Typography variant="body1">KHUYẾN MÃI</Typography>
              </Stack>
              <Stack color={color.text_color} direction={"row"}>
                <Typography variant="body1"> 0,đ</Typography>
              </Stack>
            </Stack>
            <Box pt={2}>
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
                fontSize={"14px"}
                color={color.text_color}
                fontWeight={"bold"}
              >
                <Typography
                  variant="body1"
                  fontSize={"15.8px"}
                  fontWeight={"bold"}
                  color={color.text_color}
                >
                  Tổng Số Tiền (gồm VAT)
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={"15.8px"}
                  fontWeight={"bold"}
                  color={"#F39801"}
                >
                  {`${numberFormat(Number(cartTotalAmount))}`}
                </Typography>
              </Stack>
              <Link to={"/checkout"}>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    bgcolor: "#008C89",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#F39801"
                    }
                  }}
                  fullWidth
                >
                  <Typography fontWeight={"bold"} p={1}>
                    Thanh toán
                  </Typography>
                </Button>
              </Link>

              <Typography
                variant="body1"
                color={color.error}
                py={1}
                fontSize={"13px"}
              >
                (Giảm giá trên web chỉ áp dụng cho bán lẻ)
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* <iframe
          width="350"
          height="430"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/greetBot"
        ></iframe> */}
      </Grid>
    </Container>
  );
};

export default CartProduct;
