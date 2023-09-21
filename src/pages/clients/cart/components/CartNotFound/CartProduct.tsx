import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../../../../Theme/color';
import { decrement, increment } from '../../../../../redux/features/counter/CounterProducer';
import { RootState } from '../../../../../redux/storeClient';
import { Product } from '../../../../../submodules/models/ProductModel/Product';
import { removeItem, getTotal, incrementCartItem, decrementCartItem } from '../../../../../redux/features/cart/CartProducer';

const CartProduct = () => {
    useEffect(() => {
      fetchCart()
    }, [])
     const [Cart, setCart] = useState<Product[]>([])
     const fetchCart = async() => {
       const local = localStorage.getItem('CartItems'); 
       if(local) {
         const localCart = JSON.parse(local)
        setCart(localCart)
       }
     }
    
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };
 console.log(checked);
 
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };
   const handleRemove = (element:any) => {
    const remove = Cart.filter((cart) => cart.id !== element.id);
    setCart(remove);
     dispatch(removeItem(element))  
   }

  return (
    <Grid container spacing={2}>
    <Grid item xs={8}>
      <Stack
        bgcolor={color.white}
        direction={"row"}
        justifyContent={"space-between"}
        p={2}
        borderRadius={"4px"}
      >
        <FormControlLabel
          label={`Chọn tất cả ${Cart.length} sản phẩm)`}
          control={
            <Checkbox
              checked={checked[0] && checked[1]}
              indeterminate={checked[0] !== checked[1]}
              onChange={handleChange1}
            />
          }
        />
        <Stack direction={"row"} spacing={3}>
          <Typography>Số lượng</Typography>
          <Typography>Thành tiền</Typography>
        </Stack>
      </Stack>
      <Box>
     {
      Cart.map((element, i) => {
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
            <FormControlLabel
              label=""
              control={
                <Checkbox
                  checked={checked[0]}
                  onChange={handleChange2}
                />
              }
            />
            <Stack direction={"row"} alignItems={"normal"}>
              <Box maxWidth={"119px"}>
                <img
                  src={ element.productImage ?element.productImage[0].image : ""}
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
                    {element.price}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="cartItem_PriceSale"
                  >
                    {element.price_sale}

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
              <RemoveIcon
                sx={{
                  fontSize: "17px",
                }}
              />
              <Typography variant="caption">{element.cartQuantity}</Typography>
              <AddIcon
                sx={{
                  fontSize: "17px",
                }}
              />
            </Stack>
            <Typography>
            126.400 đ
            </Typography>
            <DeleteForeverIcon onClick={() => handleRemove(element)}/>
          </Stack>
        </Stack>
         )
      })
     } 
      </Box>
    </Grid>

    <Grid item xs={4}>
      <Box bgcolor={color.white} px={2} borderRadius={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          py={2}
          borderBottom={"1px solid #eee"}
        >
          <Stack
            color={color.text_second}
            direction={"row"}
            spacing={2}
          >
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
            <input
              placeholder="Nhập mã khuyến mãi/Quà tặng"
              style={{
                flex: 1,
                color: "inherit",
              }}
            />
            <Button variant="outlined">
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
            <Typography variant="body1"> 0d</Typography>
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
            
            </Typography>
          </Stack>
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
  </Grid>
  )
}

export default CartProduct