import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { color } from '../../../../Theme/color';
import { numberFormat } from '../../../../helpers/formatPrice';
import { getTotals } from '../../../../redux/features/cart/CartProducer';
import { RootState } from '../../../../redux/storeClient';

import { TitleHelmet } from '../../../../constants/Helmet';
import useMedia from '../../../../hooks/useMedia/useMedia';
import { httpPayment, httpProvince, httpVoucher } from '../../../../submodules/controllers/http/axiosController';
import { Order } from '../../../../submodules/models/OrderModel/Order';
import { Product } from '../../../../submodules/models/ProductModel/Product';
import { Province } from '../../../../submodules/models/Province/Province';
import { User } from '../../../../submodules/models/UserModel/User';
import { pushWarning } from '../../../../components/Toast/Toast';
function Checkout() {
    const { isMediumMD, isXSOnly } = useMedia();
    const dispatch = useDispatch();
    const [user, setUser] = useState<User>({} as User);
    const [province, setProvince] = useState<Province[]>([]);
    const [districts, setDistricts] = useState([]);
    const [voucher, setVoucher] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState<string>('');
    const redirect = useNavigate();
    const cart: any = useSelector((state: RootState) => state.cart.cartItems);
    const { cartTotalAmount, cartItems } = useSelector((state: RootState) => state.cart);
    const navigate = useNavigate();
    const value: any = searchParams.get('discount');

    useEffect(() => {
        fetchProvince();
        fetchUser();
        fetchDiscount();
    }, []);

    useEffect(() => {
        dispatch(getTotals());
    }, [dispatch, cart]);

    const fetchUser = () => {
        const user = localStorage.getItem('user');
        const DataUser = JSON.parse(user!);
        setUser(DataUser);
        reset({
            email: DataUser ? DataUser?.email : '',
            phone: DataUser ? DataUser?.phone : '',
            fullName: DataUser ? DataUser?.fullName : '',
        });
    };

    const fetchDiscount = () => {
        const order = {
            money: cartTotalAmount,
            code: value,
        };

        httpVoucher
            .getOneVoucher(order)
            .then((res) => {
                setVoucher(res.discount.discount);
                setCode(res.discount.code);
            })
            .catch((err) => {
                setVoucher(0);
            });
    };
    const fetchProvince = async () => {
        const provinceData = await httpProvince.getAll();
        if (provinceData) {
            setProvince(provinceData);
        }
    };
    const handleCheckout = async (data: any) => {
        if (cart.length > 0) {
            const detailData = cart.map((e: Product) => {
                return {
                    productName: e.title,
                    productId: e.id,
                    quantity: e.cartQuantity,
                    price: e.price_sale,
                    image: e.image,
                };
            });

            let orders = {
                ...data,
                orderCode: value,
                userID: user?.id ?? null,
                money: cartTotalAmount,
            };

            const orderData = {
                orders: orders,
                orderDetail: detailData,
                paymentMethod: data.orderType,
            };

            const payment = await httpPayment.getPayment(orderData);

            localStorage.removeItem('cartItems');
            if (payment.paymentMethod == 'COD') {
                window.location.assign(payment.url);
            }

            if (payment.paymentMethod == 'Visa') {
                window.location.assign(payment.url);
            }
        } else {
            pushWarning('Không có đơn hàng  tự động quay lại trang giỏ hàng sau 2s!');
            setTimeout(() => {
                redirect('/cart');
            }, 2000);
        }
    };

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Order>({
        mode: 'all',
    });
    const handelLogin = () => {
        navigate({
            pathname: '/auth',
            search: createSearchParams({
                a: 'checkout',
            }).toString(),
        });
    };

    const handleProvinceChange = (e: any) => {
        const provinceId = e.target.value;
        setValue('province', provinceId);
        const selectedProvinceData: any = province.find((province: any) => province.id === parseInt(provinceId, 10));
        setDistricts(selectedProvinceData?.district || []);
    };

    const handleDistrictChange = (e: any) => {
        const districtId = e.target.value;
        setValue('district', districtId);
    };

    return (
        <Grid bgcolor={'#eee'} pb={'170px'}>
            {TitleHelmet('Thanh toán')}

            <Container
                maxWidth="xl"
                sx={{
                    pt: 2,
                    pb: 2,
                }}
            >
                {user ? (
                    ''
                ) : (
                    <Box className="main-waper-top pt-2 pb-2 ps-4">
                        <Typography>
                            Bạn đã là thành viên?
                            <Typography
                                onClick={handelLogin}
                                style={{
                                    cursor: 'pointer',
                                    color: color.sale,
                                    textDecoration: 'underline',
                                }}
                            >
                                Đăng nhập ngay
                            </Typography>
                        </Typography>
                    </Box>
                )}
                <Box bgcolor={color.white} p={2} mt={1}>
                    <Typography fontWeight={'bold'} variant="h4" py={2} borderBottom={'1px solid #eee'}>
                        ĐỊA CHỈ GIAO HÀNG
                    </Typography>
                    <FormGroup
                        sx={{
                            mt: 2,
                            maxWidth: '600px',
                        }}
                    >
                        <FormControl>
                            <Typography>Họ và tên người nhận</Typography>
                            <Controller
                                control={control}
                                defaultValue=""
                                name="fullName"
                                rules={{
                                    required: 'Tên của bạn không được bỏ trống!',
                                }}
                                render={({ field }) => (
                                    <OutlinedInput
                                        key={1}
                                        {...field}
                                        fullWidth
                                        placeholder="Vui lòng nhập tên của bạn!"
                                    />
                                )}
                            />

                            <FormHelperText sx={{ color: color.error }}>
                                {errors.fullName && errors.fullName.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Typography>Địa chỉ email</Typography>
                            <Controller
                                control={control}
                                defaultValue="" // Set an initial value here
                                name="email"
                                rules={{
                                    required: 'Vui lòng nhập địa chỉ email',
                                }}
                                render={({ field }) => (
                                    <OutlinedInput
                                        key={1}
                                        {...field}
                                        fullWidth
                                        placeholder="Vui lòng nhập email của bạn!"
                                    />
                                )}
                            />

                            <FormHelperText sx={{ color: color.error }}>
                                {errors.email && errors.email.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Typography>Số điện thoại</Typography>
                            <Controller
                                control={control}
                                defaultValue=""
                                name="phone"
                                rules={{
                                    required: 'Vui lòng nhập số điện thoại',
                                    pattern: {
                                        value: /^(?:0|\+84)\d{9,10}$/,
                                        message: 'Số điện thoại không hợp lệ!',
                                    },
                                }}
                                render={({ field }) => (
                                    <OutlinedInput
                                        key={1}
                                        {...field}
                                        fullWidth
                                        placeholder="Vui lòng nhập tên của bạn!"
                                    />
                                )}
                            />

                            <FormHelperText sx={{ color: color.error }}>
                                {errors.phone && errors.phone.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Typography>Tỉnh/Thành Phố</Typography>
                            <Controller
                                control={control}
                                defaultValue=""
                                name="province"
                                rules={{
                                    required: 'Vui lòng nhập Tỉnh/ Thành phố',
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        onChange={handleProvinceChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {province.map((e: Province) => {
                                            return (
                                                <MenuItem value={e.id}>
                                                    <em>{e.name}</em>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                )}
                            />

                            <FormHelperText sx={{ color: color.error }}>
                                {errors.province && errors.province.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Typography>Quận/Huyện</Typography>

                            <Controller
                                control={control}
                                defaultValue=""
                                name="district"
                                rules={{
                                    required: 'Vui lòng nhập Quận /Huyện',
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        onChange={handleDistrictChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {districts.map((e: any) => (
                                            <MenuItem key={e.id} value={e.id}>
                                                {e.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />

                            <FormHelperText sx={{ color: color.error }}>
                                {errors.district && errors.district.message}
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <Typography>Địa chỉ nhận hàng</Typography>
                            <Controller
                                control={control}
                                defaultValue=""
                                name="address"
                                rules={{
                                    required: 'Vui lòng nhập địa chỉ nhận hàng!',
                                }}
                                render={({ field }) => (
                                    <OutlinedInput
                                        key={1}
                                        {...field}
                                        fullWidth
                                        placeholder="Vui lòng nhập tên của bạn!"
                                    />
                                )}
                            />
                            <FormHelperText sx={{ color: color.error }}>
                                {errors.address && errors.address.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Controller
                                name="bill"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...field}
                                                checked={Number(field.value) == 1}
                                                onChange={(e) => {
                                                    const newValue = e.target.checked ? 1 : 0; // Set giá trị mới cho field
                                                    field.onChange(newValue); // Cập nhật giá trị của field khi checkbox thay đổi
                                                }}
                                            />
                                        }
                                        label="Xuất hóa đơn"
                                    />
                                )}
                            />
                        </FormControl>
                    </FormGroup>
                </Box>

                <Box bgcolor={color.white} mt={2} p={2}>
                    <Typography fontWeight={'bold'} variant="h4" py={2} borderBottom={'1px solid #eee'}>
                        PHƯƠNG THỨC THANH TOÁN
                    </Typography>
                    <Box>
                        <FormControl component="fieldset">
                            <Controller
                                name="orderType"
                                control={control}
                                rules={{ required: 'Vui lòng nhập phương thức thanh toán' }}
                                render={({ field }) => (
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        <FormControlLabel
                                            value="COD"
                                            control={<Radio />}
                                            sx={{
                                                fontWeight: 'bold',
                                            }}
                                            label="Thanh toán bằng tiền mặt khi nhận hàng COD"
                                        />
                                        <FormControlLabel
                                            value="Visa"
                                            sx={{
                                                fontWeight: 'bold',
                                            }}
                                            control={<Radio />}
                                            label="Thanh toán qua Stripe"
                                        />
                                    </RadioGroup>
                                )}
                            />

                            <FormHelperText sx={{ color: color.error }}>
                                {errors.orderType && errors.orderType.message}
                            </FormHelperText>
                        </FormControl>
                    </Box>
                </Box>
                <Box bgcolor={color.white} mt={2} p={2}>
                    <Typography fontWeight={'bold'} variant="h4" py={2} borderBottom={'1px solid #eee'}>
                        KIỂM TRA LẠI ĐƠN HÀNG
                    </Typography>
                    <Box>
                        {cart.map((e: Product) => {
                            return (
                                <Stack
                                    className="cartItem"
                                    direction={'row'}
                                    mt={2}
                                    borderRadius={2}
                                    bgcolor={color.white}
                                    justifyContent={'space-between'}
                                >
                                    <Stack className="cartItem_thumb" direction={'row'} spacing={2}>
                                        <Stack direction={'row'} alignItems={'normal'} spacing={2}>
                                            <Box maxWidth={'119px'} flexShrink={0}>
                                                <img
                                                    src={e.image ? e.image : ''}
                                                    alt=""
                                                    width={'90px'}
                                                    height={'150px'}
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </Box>
                                            <Stack
                                                direction={'column'}
                                                justifyContent={'space-between'}
                                                maxWidth={'350px'}
                                                spacing={2}
                                            >
                                                <Typography
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textAlign: 'center',
                                                        display: '-webkit-box',
                                                        lineClamp: 2,
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {e.title}
                                                </Typography>
                                                <Stack direction={'row'} spacing={2}>
                                                    <Typography
                                                        variant="caption"
                                                        className="cartItem_PriceSale"
                                                        fontWeight={'bold'}
                                                    >
                                                        {numberFormat(Number(e.price_sale))}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        className="cartItem_Price"
                                                        sx={{ textDecorationLine: 'line-through' }}
                                                    >
                                                        {numberFormat(Number(e.price))}
                                                    </Typography>
                                                </Stack>
                                                {isMediumMD ? (
                                                    <Stack className="cartItem_action" direction={'row'} spacing={10}>
                                                        <Typography fontWeight={'bold'} color={'#F39801'}>
                                                            {e.cartQuantity}
                                                        </Typography>
                                                    </Stack>
                                                ) : (
                                                    ''
                                                )}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    {isMediumMD ? (
                                        ''
                                    ) : (
                                        <Stack className="cartItem_action" direction={'row'} spacing={10}>
                                            <Typography>{e.cartQuantity}</Typography>
                                            <Typography color={'#F39801'} fontWeight={'bold'}>
                                                {e.cartQuantity && e.price_sale
                                                    ? numberFormat(Number(e.cartQuantity * e.price_sale))
                                                    : ''}
                                            </Typography>
                                        </Stack>
                                    )}
                                </Stack>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
            <Grid
                bgcolor={color.white}
                sx={{
                    position: 'fixed',
                    boxShadow: 2,
                    width: '100%',
                    zIndex: 10,
                    bottom: '0px',
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            py: '9px',
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '3px',
                            borderBottom: '1px solid #eee',
                        }}
                    >
                        <Stack direction={'row'} spacing={3} justifyContent={'flex-end'}>
                            <Typography variant="body1" fontSize={'15.5px'}>
                                Thành tiền
                            </Typography>
                            <Typography variant="body1" fontSize={'15.5px'}>
                                {numberFormat(Number(cartTotalAmount))}
                            </Typography>
                        </Stack>
                        {voucher > 0 ? (
                            <Stack direction={'row'} spacing={3} justifyContent={'flex-end'}>
                                <Typography variant="body1" fontSize={'15.5px'}>
                                    Khuyến mãi
                                </Typography>
                                <Typography variant="body1" fontSize={'12.5px'} fontWeight={'bold'} color={color.sale}>
                                    {` - ${numberFormat(Number(voucher))}`}
                                </Typography>
                            </Stack>
                        ) : (
                            ''
                        )}
                        <Stack direction={'row'} spacing={3} justifyContent={'flex-end'}>
                            <Typography variant="body1" fontSize={'15.5px'} fontWeight={'bold'}>
                                Tổng Số Tiền
                            </Typography>
                            <Typography variant="body1" fontSize={'15.5px'} fontWeight={'bold'} color={'#F39801'}>
                                {numberFormat(Number(cartTotalAmount - Number(voucher)))}
                            </Typography>
                        </Stack>
                    </Box>
                    <Box py={2}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Link to={'/cart'}>
                                <Stack direction={'row'} spacing={2} color={color.text_color}>
                                    <ArrowBackIcon />
                                    <Typography variant="body1">Quay về giỏ hàng</Typography>
                                </Stack>
                            </Link>
                            <Button
                                type="button"
                                onClick={handleSubmit(handleCheckout)}
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Đang xử lý...' : 'Thanh toán'}
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}
export default Checkout;
