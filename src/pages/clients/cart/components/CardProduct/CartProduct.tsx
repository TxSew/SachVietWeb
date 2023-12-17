import { Box, Button, Container, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { color } from '../../../../../Theme/color';
import { pushSuccess, pushWarning } from '../../../../../components/Toast/Toast';
import { numberFormat } from '../../../../../helpers/formatPrice';
import useMedia from '../../../../../hooks/useMedia/useMedia';
import { addToCart, decreaseCart, getTotals, removeFromCart } from '../../../../../redux/features/cart/CartProducer';
import { RootState } from '../../../../../redux/storeClient';
import { httpProduct, httpVoucher } from '../../../../../submodules/controllers/http/axiosController';
import { Discount } from '../../../../../submodules/models/DiscountModel/Discount';
import { Product } from '../../../../../submodules/models/ProductModel/Product';
import { Link } from 'react-router-dom';

const CartProduct = () => {
    const { isMediumMD } = useMedia();
    const dispatch = useDispatch();
    const [discount, setDiscount] = useState<Discount[]>([]);
    const { cartTotalQuantity, cartTotalAmount } = useSelector((state: RootState) => state.cart);

    const cart = useSelector((state: RootState) => state.cart.cartItems);
    useEffect(() => {
        fetchCart();
        getDiscount();
    }, []);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
    const getDiscount = () => {
        httpVoucher
            .getAllVoucherByUserIsNull()
            .then((res) => {
                setDiscount(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const [voucher, setVoucher] = useState<number>(0);
    const [code, setCode] = useState<string>('');
    const [Cart, setCart] = useState<Product[]>([]);

    const fetchCart = async () => {
        const local = localStorage.getItem('cartItems');
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
        if (id.cartQuantity >= Number(id.quantity)) {
            pushWarning(`Số lượng yêu cầu không có sẵn`);
        } else {
            dispatch(
                addToCart({
                    products: id,
                    quantity: 1,
                })
            );
        }
    };
    const redirect = useNavigate();
    const {
        handleSubmit,
        control,
        formState: {},
    } = useForm<any>();

    const handleDiscount = async (data: any) => {
        const order = {
            money: cartTotalAmount,
            code: data.voucher,
        };
        try {
            const data = await httpVoucher.getOneVoucher(order);
            pushSuccess('Thêm mã giảm giá thành công');
            setVoucher(data.discount.discount);
            setCode(data.discount.code);
        } catch (err: any) {
            if (err.response.data.message == 'discount limited value') {
                pushWarning('Mã giảm giá đã hết lượt sử dụng!');
            }
            if (err.response.data.message == 'payment date exceeded') {
                pushWarning(`Mã giảm giá đã hết hạn sử dụng!`);
            }
            if (err.response.data?.result?.message == 'payment limit exceeded') {
                pushWarning(
                    `Mã giảm giá chỉ hỗ trợ cho đơn hàng từ ${numberFormat(err.response.data.result.value)} trở lên `
                );
            }

            setVoucher(0);
        }
    };
    const handleCheckout = () => {
        if (code) {
            redirect({
                pathname: '/checkout',
                search: createSearchParams({
                    discount: String(code),
                }).toString(),
            });
        } else {
            redirect('/checkout');
        }
    };
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Stack
                        bgcolor={color.white}
                        direction={'row'}
                        justifyContent={'space-between'}
                        p={2}
                        borderRadius={'4px'}
                    >
                        <Stack direction={'row'} spacing={3}>
                            <Typography>Tổng số lượng ({cartTotalQuantity} sản phẩm)</Typography>
                        </Stack>

                        <Stack direction={'row'} spacing={3} pr={4}>
                            {isMediumMD ? (
                                ''
                            ) : (
                                <>
                                    <Typography>Số lượng</Typography>
                                    <Typography>Thành tiền</Typography>
                                </>
                            )}
                        </Stack>
                    </Stack>
                    <Box>
                        {cart.map((element: Product) => {
                            return (
                                <Stack
                                    className="cartItem"
                                    direction={'row'}
                                    mt={2}
                                    p={2}
                                    borderRadius={2}
                                    bgcolor={color.white}
                                    justifyContent={'space-between'}
                                >
                                    <Stack className="cartItem_thumb" direction={'row'} rowGap={2} spacing={2}>
                                        <Stack direction={'row'} alignItems={'normal'} spacing={2} rowGap={2}>
                                            <Box>
                                                <Link to={`/products/${element.slug}`}>
                                                    <img
                                                        src={element.productImages ? element.image : ''}
                                                        alt=""
                                                        style={{
                                                            flexShrink: 0,
                                                            objectFit: 'cover',
                                                        }}
                                                        width={isMediumMD ? '110px' : '119px'}
                                                        height={'100px'}
                                                    />
                                                </Link>
                                            </Box>
                                            <Stack
                                                direction={'column'}
                                                justifyContent={'space-between'}
                                                maxWidth={'350px'}
                                            >
                                                <Link to={`/products/${element.slug}`} color="gray">
                                                    <Typography
                                                        sx={
                                                            isMediumMD
                                                                ? {
                                                                      overflow: 'hidden',
                                                                      display: '-webkit-box',
                                                                      lineClamp: 2,
                                                                      WebkitLineClamp: 2,
                                                                      WebkitBoxOrient: 'vertical',
                                                                      fontSize: '11px',
                                                                      color: '#808080',
                                                                      flexShrink: 0,
                                                                  }
                                                                : {
                                                                      overflow: 'hidden',
                                                                      display: '-webkit-box',
                                                                      color: '#808080',
                                                                      lineClamp: 2,
                                                                      WebkitLineClamp: 2,
                                                                      WebkitBoxOrient: 'vertical',
                                                                      flexShrink: 0,
                                                                  }
                                                        }
                                                    >
                                                        {element.title}
                                                    </Typography>
                                                </Link>

                                                <Stack direction={'row'} spacing={2}>
                                                    <Typography
                                                        variant="caption"
                                                        className="cartItem_PriceSale"
                                                        color={'#F39801'}
                                                    >
                                                        {`${numberFormat(Number(element.price_sale))} `}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        className="cartItem_Price"
                                                        fontWeight={'bold'}
                                                        color={'gray'}
                                                        sx={{
                                                            textDecoration: 'line-through',
                                                        }}
                                                    >
                                                        {numberFormat(Number(element.price))}
                                                    </Typography>
                                                </Stack>
                                                <Box>
                                                    {isMediumMD ? (
                                                        <Stack
                                                            className="cartItem_action"
                                                            direction={'row'}
                                                            spacing={2}
                                                        >
                                                            <Stack
                                                                direction={'row'}
                                                                border={'1px solid #eee'}
                                                                borderRadius={2}
                                                                width={'max-content'}
                                                            >
                                                                <RemoveIcon
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        fontSize: '13px',
                                                                    }}
                                                                    onClick={() => handleDes(element.id)}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={element?.cartQuantity}
                                                                    style={{
                                                                        maxWidth: '60px',
                                                                        width: 'max-content',
                                                                        padding: '3px 10px',
                                                                        textAlign: 'center',
                                                                    }}
                                                                />
                                                                <AddIcon
                                                                    onClick={() => handleIncrement(element)}
                                                                    sx={{
                                                                        fontSize: '13px',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                />
                                                            </Stack>
                                                            {isMediumMD ? (
                                                                ''
                                                            ) : (
                                                                <Typography color={'#F39801'}>
                                                                    {element?.price_sale !== undefined &&
                                                                    element?.cartQuantity !== undefined
                                                                        ? `${numberFormat(
                                                                              Number(
                                                                                  element.price_sale *
                                                                                      element.cartQuantity
                                                                              )
                                                                          )} `
                                                                        : ''}
                                                                </Typography>
                                                            )}
                                                        </Stack>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>

                                    <Stack direction={'row'} spacing={2}>
                                        {!isMediumMD && (
                                            <Stack className="cartItem_action" direction={'row'} spacing={2}>
                                                <Stack
                                                    direction={'row'}
                                                    border={'1px solid #eee'}
                                                    borderRadius={2}
                                                    p={'4px 10px'}
                                                >
                                                    <RemoveIcon
                                                        sx={{
                                                            cursor: 'pointer',
                                                            fontSize: '13px',
                                                        }}
                                                        onClick={() => handleDes(element.id)}
                                                    />
                                                    <input
                                                        type="text"
                                                        value={element?.cartQuantity}
                                                        style={{
                                                            maxWidth: '60px',
                                                            width: 'max-content',
                                                            padding: '0px 10px',
                                                            textAlign: 'center',
                                                        }}
                                                    />
                                                    <AddIcon
                                                        onClick={() => handleIncrement(element)}
                                                        sx={{
                                                            fontSize: '13px',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </Stack>
                                                {isMediumMD ? (
                                                    ''
                                                ) : (
                                                    <Typography color={'#F39801'}>
                                                        {element?.price_sale !== undefined &&
                                                        element?.cartQuantity !== undefined
                                                            ? `${numberFormat(
                                                                  Number(element.price_sale * element.cartQuantity)
                                                              )} `
                                                            : ''}
                                                    </Typography>
                                                )}
                                            </Stack>
                                        )}
                                        <DeleteForeverIcon
                                            onClick={() => handleRemove(element.id)}
                                            sx={{
                                                color: color.btnRed,
                                                fontSize: '17px',
                                                cursor: 'pointer',
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
                            direction={'row'}
                            justifyContent={'space-between'}
                            py={2}
                            borderBottom={'1px solid #eee'}
                        >
                            <Stack color={color.text_second} direction={'row'} spacing={2}>
                                <Typography variant="body1">KHUYẾN MÃI</Typography>
                                <LoyaltyIcon
                                    sx={{
                                        fontSize: '17px',
                                    }}
                                />
                            </Stack>
                            <Stack color={color.text_second} direction={'row'}>
                                <Typography variant="body1"> Xem thêm</Typography>
                                <KeyboardArrowRightIcon />
                            </Stack>
                        </Stack>
                        <Box pt={2}>
                            <Stack
                                direction={'row'}
                                border={'1px solid #eee'}
                                spacing={2}
                                p={1}
                                borderRadius={2}
                                fontSize={'14px'}
                                color={color.text_color}
                            >
                                <Controller
                                    control={control}
                                    defaultValue=""
                                    name="voucher"
                                    rules={{
                                        required: 'Vui',
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            sx={{
                                                flex: 1,
                                            }}
                                            {...field}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={''}>
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

                                <Button variant="outlined" onClick={handleSubmit(handleDiscount)} type="submit">
                                    <Typography sx={isMediumMD ? { fontSize: '12px' } : {}} variant="caption">
                                        Áp dụng
                                    </Typography>
                                </Button>
                            </Stack>
                            <Typography variant="body1" color={color.text_color} py={1} fontSize={'13px'}>
                                Có thể áp dụng đồng thời một mã.
                            </Typography>
                        </Box>
                    </Box>

                    <Box bgcolor={color.white} px={2} borderRadius={2} mt={2}>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            py={2}
                            borderBottom={'1px solid #eee'}
                        >
                            <Stack color={color.text_color} direction={'row'} spacing={2}>
                                <Typography variant="body1">KHUYẾN MÃI</Typography>
                            </Stack>
                            <Stack color={color.text_color} direction={'row'}>
                                <Typography variant="body1" color={color.sale} fontWeight={'bold'}>
                                    {numberFormat(voucher)}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box pt={2}>
                            <Stack
                                direction={'row'}
                                spacing={2}
                                justifyContent={'space-between'}
                                fontSize={'14px'}
                                color={color.text_color}
                                fontWeight={'bold'}
                            >
                                <Typography
                                    variant="body1"
                                    fontSize={'15.8px'}
                                    fontWeight={'bold'}
                                    color={color.text_color}
                                >
                                    Tổng Số Tiền
                                </Typography>
                                <Typography variant="body1" fontSize={'15.8px'} fontWeight={'bold'} color={color.error}>
                                    {`${numberFormat(Number(cartTotalAmount - voucher))}`}
                                </Typography>
                            </Stack>
                            <Button
                                variant="contained"
                                sx={{
                                    marginTop: '10px',
                                    bgcolor: 'red',
                                    color: '#fff',
                                }}
                                onClick={handleCheckout}
                                fullWidth
                            >
                                <Typography fontWeight={'bold'} p={1}>
                                    Thanh toán
                                </Typography>
                            </Button>

                            <Typography variant="body1" color={color.error} py={1} fontSize={'13px'}>
                                (Giảm giá trên web chỉ áp dụng cho bán lẻ)
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CartProduct;
