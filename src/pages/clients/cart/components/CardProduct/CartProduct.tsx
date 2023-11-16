import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
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
  removeFromCart,
} from "../../../../../redux/features/cart/CartProducer";
import { RootState } from "../../../../../redux/storeClient";
import { Product } from "../../../../../submodules/models/ProductModel/Product";
import { numberFormat } from "../../../../../helpers/formatPrice";
import { Controller, useForm } from "react-hook-form";
import {
  httpDiscount,
  httpVoucher,
} from "../../../../../submodules/controllers/http/axiosController";
import { Discount } from "../../../../../submodules/models/DiscountModel/Discount";

const CartProduct = () => {
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState<Discount[]>([]);
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const cart = useSelector((state: RootState) => state.cart.cartItems);
  useEffect(() => {
    fetchCart();
    getDiscount();
  }, []);
  const getDiscount = () => {
    httpVoucher.getAllVoucherByUser(3).then((res) => {
      setDiscount(res);
    });
  };
  const [voucher, setVoucher] = useState<number>(0);
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

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<any>();

  const handleDiscount = (data: any) => {
    console.log(data);
    httpVoucher.getOneVoucher(data).then((res) => {
      console.log(res);
      setVoucher(res.discountVoucher.discount);
    });
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
                          src={element.productImages ? element.image : ""}
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
                              textDecoration: "underline",
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
                      p={"3px 5px"}
                      borderRadius={2}
                    >
                      <Box>
                        <RemoveIcon
                          sx={{
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDes(element.id)}
                        />
                      </Box>
                      <input
                        type="text"
                        value={element?.cartQuantity}
                        style={{
                          width: "27px",
                          textAlign: "center",
                        }}
                      />
                      <AddIcon
                        onClick={() => handleIncrement(element)}
                        sx={{
                          fontSize: "14px",
                          cursor: "pointer",
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
                    <DeleteForeverIcon
                      onClick={() => handleRemove(element.id)}
                      sx={{
                        fontSize: "17px",
                        cursor: "pointer",
                      }}
                    />
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
              <Stack color={color.text_second} direction={"row"} spacing={2}>
                <Typography variant="body1">KHUYẾN MÃI</Typography>
                <LoyaltyIcon
                  sx={{
                    fontSize: "17px",
                  }}
                />
              </Stack>
              <Stack color={color.text_second} direction={"row"}>
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
                color={color.text_color}
              >
                <Controller
                  control={control}
                  defaultValue="" // Set an initial value here
                  name="voucher"
                  rules={{
                    required: "Vui",
                  }}
                  render={({ field }) => (
                    <Select
                      sx={{
                        flex: 1,
                      }}
                      {...field}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={""}>
                        <em>--chọn mã giảm giá--</em>
                      </MenuItem>
                      {discount.map((e: any) => {
                        return (
                          <MenuItem key={e.id} value={e.discountVoucher.code}>
                            <em>{e.discountVoucher.code}</em>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />

                <Button
                  variant="outlined"
                  onClick={handleSubmit(handleDiscount)}
                  type="submit"
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
              <Stack color={color.text_color} direction={"row"} spacing={2}>
                <Typography variant="body1">KHUYẾN MÃI</Typography>
              </Stack>
              <Stack color={color.text_color} direction={"row"}>
                <Typography variant="body1"> {voucher}</Typography>
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
                  color={color.error}
                >
                  {`${numberFormat(Number(cartTotalAmount - voucher))}`}
                </Typography>
              </Stack>
              <Link to={"/checkout"}>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    bgcolor: "red",
                    color: "#fff",
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
