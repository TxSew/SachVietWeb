import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fade,
    FormControl,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TextareaAutosize,
    TableHead,
    TableRow,
    Typography,
    Rating,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { formatDates } from '../../../helpers/FortmatDate';
import { numberFormat } from '../../../helpers/formatPrice';
import { httpCart } from '../../../submodules/controllers/http/axiosController';
import { OrderType } from '../../../submodules/models/OrderModel/Order';
import CustomizedSteppers from './Stepper';
import NavUser from './layout/NavUser';
import { httpComment } from '../../../submodules/controllers/http/axiosController';

function UserCartDetail() {
    const { id } = useParams();
    const [orderCurrent, setOrderCurrent] = useState<any>({});

    const [openDanhgia, setOpendanhgia] = useState<any>({
        isCheck: false,
        value: '',
    });

    const handleOpen = (id: any) => {
        setOpendanhgia({
            isCheck: true,
            value: id,
        });
    };

    const handleClose = () => {
        setOpendanhgia({
            isCheck: false,
            value: '',
        });
    };

    useEffect(() => {
        getOrderUser();
    }, []);

    const [open, setOpen] = useState(false);

    const getOrderUser = async () => {
        const orderByUser = await httpCart.getOrderDetail(Number(id));
        if (orderByUser) setOrderCurrent(orderByUser);
    };

    const handleCancelOrder = async () => {
        httpCart.updateOrderUser(Number(id)).then((response) => {
            handleClickClose();
            if (response) window.location.reload();
        });
    };

    const handleClickOpen = (id: any) => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setValue,
    } = useForm<Comment>({});

    const handelComment = (data: any) => {
        console.log(data);
        const comment = {
            productId: Number(openDanhgia.value),
            ...data,
        };
        httpComment
            .addComment({
                content: data,
            })
            .then((response) => {
                reset({});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <NavUser>
            <Box
                sx={{
                    marginTop: '18px',
                }}
            >
                <Grid
                    container
                    maxWidth="xl"
                    sx={{
                        backgroundColor: color.white,
                        padding: '20px',
                    }}
                >
                    <Grid item xs={12}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant="h2" fontSize={'25px'} fontWeight={'bold'}>
                                Chi tiết đơn hàng
                            </Typography>

                            {orderCurrent.status == null ? (
                                <Stack
                                    sx={{
                                        backgroundColor: 'gray',
                                        borderRadius: '30px',
                                        p: '5px 10px',
                                        fontWeight: 'bold',
                                    }}
                                    direction={'row'}
                                    alignItems={'center'}
                                >
                                    <Typography fontSize={'14px'}>Đơn hàng chờ xác nhận</Typography>
                                </Stack>
                            ) : orderCurrent.status == 1 ? (
                                <Stack
                                    sx={{
                                        backgroundColor: color.BtnDartGreen,
                                        borderRadius: '30px',
                                        p: '5px 10px',
                                        fontWeight: 'bold',
                                    }}
                                    direction={'row'}
                                    alignItems={'center'}
                                >
                                    <Typography fontSize={'14px'}> Đơn hàng đang giao</Typography>
                                </Stack>
                            ) : orderCurrent.status == 2 ? (
                                <Stack
                                    sx={{
                                        backgroundColor: color.BtnDartGreen,
                                        borderRadius: '30px',
                                        color: 'lightGreen',
                                        p: '5px 10px',
                                        fontWeight: 'bold',
                                    }}
                                    direction={'row'}
                                    alignItems={'center'}
                                >
                                    <Typography fontSize={'14px'}> Đơn hàng đã giao </Typography>
                                </Stack>
                            ) : (
                                <Stack
                                    sx={{
                                        backgroundColor: color.error,
                                        borderRadius: '30px',
                                        p: '5px 10px',
                                        fontWeight: 'bold',
                                        color: '#ffff',
                                    }}
                                    direction={'row'}
                                    alignItems={'center'}
                                >
                                    <Typography fontSize={'14px'}> Đơn hàng đã hủy</Typography>
                                </Stack>
                            )}
                        </Box>
                        <Box>
                            <Stack direction={'row'} mt={'10px'}>
                                <Typography>Mã đơn hàng:</Typography>
                                <Typography fontWeight={'bold'}>{orderCurrent?.id}</Typography>
                            </Stack>

                            <Stack direction={'row'} mt={'10px'}>
                                <Typography>Ngày mua: </Typography>
                                <Typography fontWeight={'bold'}>{formatDates(orderCurrent.createdAt)}</Typography>
                            </Stack>
                            <Stack direction={'row'} mt={'10px'}>
                                <Typography>Thông tin xuất hóa đơn: </Typography>
                                <Typography fontWeight={'bold'}>không có</Typography>
                            </Stack>
                            {orderCurrent.coupon > 1 && (
                                <Box mt={'10px'} display={'flex'} flexDirection={'column'} rowGap={'5px'}>
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography>Giá gốc: </Typography>
                                        <Typography fontWeight={'bold'} display={'block'}>
                                            {numberFormat(orderCurrent.money)}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography display={'block'}>Đã áp dụng mã giảm giá:</Typography>
                                        <Typography fontWeight={'bold'} color={color.sale}>
                                            - {numberFormat(orderCurrent.coupon)}
                                        </Typography>
                                    </Stack>
                                </Box>
                            )}
                            <Stack direction={'row'} mt={'10px'}>
                                <Typography>Tổng tiền: </Typography>
                                <Typography fontWeight={'bold'}>
                                    {numberFormat(orderCurrent.money - orderCurrent.coupon)}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box mt={'60px'}>
                            {orderCurrent.status == null ? (
                                <Button
                                    variant="OutlinedRed"
                                    sx={{
                                        mt: '10px',
                                        borderRadius: '15px',
                                        padding: '7px 27px',
                                    }}
                                    onClick={handleClickOpen}
                                >
                                    <Typography textTransform={'capitalize'}>Hủy đơn hàng</Typography>
                                </Button>
                            ) : (
                                ''
                            )}
                            <Dialog
                                open={open}
                                onClose={handleClickClose}
                                TransitionComponent={Fade}
                                aria-labelledby="customized-dialog-title"
                            >
                                <DialogContent>
                                    <DialogContentText
                                        id="alert-dialog-slide-description"
                                        textAlign={'center'}
                                        padding={'0 24px '}
                                        sx={{
                                            color: 'red',
                                        }}
                                    >
                                        <RemoveShoppingCartIcon
                                            sx={{
                                                fontSize: '56px',
                                                color: 'rgb(201, 33, 39)',
                                            }}
                                        />
                                        <DialogTitle fontSize={'16px'}>
                                            Bạn chắc chắn muốn hủy đơn hàng này?
                                        </DialogTitle>
                                    </DialogContentText>
                                </DialogContent>
                                <Box display={'flex'} paddingBottom={'24px'} justifyContent={'space-around'}>
                                    <Button
                                        onClick={handleClickClose}
                                        sx={{
                                            padding: '8px 16px',
                                            border: '1px solid #ccc',
                                            borderRadius: '12px',
                                            color: 'black',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            width: '96px',
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        onClick={() => handleCancelOrder()}
                                        sx={{
                                            padding: '8px 16px',
                                            border: '1px solid red',
                                            borderRadius: '12px',
                                            background: 'red',
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            width: '96px',
                                            ':hover': {
                                                backgroundColor: 'rgb(201, 33, 39)',
                                            },
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                </Box>
                            </Dialog>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box mt={'20px'} mb={'20px'}>
                <Grid
                    container
                    justifyContent={'space-between'}
                    maxWidth="xl"
                    sx={{
                        backgroundColor: color.white,

                        padding: '20px',
                    }}
                >
                    <Grid item xs={12} md={3.8}>
                        <Box mt={'20px'} height={'166px'} border={'1px solid #B7B4B4'}>
                            <Typography
                                sx={{
                                    padding: '7px 5px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Thông tin người nhận
                            </Typography>
                            <Box
                                sx={{
                                    padding: '10px',
                                    display: 'flex',
                                    borderTop: '1px solid #B7B4B4',
                                    flexDirection: 'column',
                                    rowGap: '5px',
                                }}
                            >
                                <Typography variant="body1">{orderCurrent.fullName}</Typography>
                                <Typography variant="body1">{orderCurrent.phone}</Typography>
                                <Typography variant="body1">{orderCurrent.address}</Typography>
                                <Typography>Tel:{orderCurrent.phone}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={3.8} xs={12}>
                        <Box mt={'20px'} height={'166px'} border={'1px solid #B7B4B4'}>
                            <Typography
                                sx={{
                                    padding: '7px 5px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Phương thức vận chuyển
                            </Typography>
                            <Box
                                sx={{
                                    padding: '10px',
                                    display: 'flex',
                                    borderTop: '1px solid #B7B4B4',
                                    flexDirection: 'column',
                                    rowGap: '5px',
                                }}
                            >
                                <Typography>Giao hàng tiêu chuẩn</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={3.8} xs={12}>
                        <Box mt={'20px'} border={'1px solid #B7B4B4'} height={'166px'}>
                            <Typography
                                sx={{
                                    padding: '7px 5px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Phương thức thanh toán
                            </Typography>
                            <Box
                                sx={{
                                    padding: '10px',
                                    display: 'flex',
                                    borderTop: '1px solid #B7B4B4',
                                    flexDirection: 'column',
                                    rowGap: '5px',
                                }}
                            >
                                <Typography variant="body1">
                                    {orderCurrent.orderType == OrderType.COD
                                        ? 'Thanh toán bằng tiền mặt khi nhận hàng'
                                        : OrderType.VISA
                                        ? 'Thanh  toán bằng thẻ tín dụng'
                                        : ''}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <CustomizedSteppers status={orderCurrent.status} />
                </Grid>
                <Box
                    sx={{
                        marginTop: '10px',
                        backgroundColor: color.white,
                        padding: '20px',
                    }}
                >
                    <Stack direction={'row'}>
                        <Typography variant="body1">Đơn hàng:</Typography>
                        <Typography variant="body1">{`#${orderCurrent?.id}`}</Typography>
                    </Stack>

                    <Stack direction={'row'} mt={'18px'}>
                        <Typography variant="body1">Số lượng:</Typography>
                        <Typography variant="body1" fontWeight={'bold'}>
                            {orderCurrent.quantity}
                        </Typography>
                    </Stack>

                    <TableContainer>
                        <Table
                            sx={{
                                minWidth: 800,
                            }}
                            aria-label="simple tablek w"
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        '& > th': {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    <TableCell>STT</TableCell>
                                    <TableCell align="center">Hình ảnh</TableCell>
                                    <TableCell align="center">Tên sản phẩm</TableCell>
                                    <TableCell align="center">SKU</TableCell>
                                    <TableCell align="center">Giá bán</TableCell>
                                    <TableCell align="center">SL</TableCell>
                                    <TableCell align="center">Thành tiền</TableCell>
                                    <TableCell align="center">Đánh giá</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderCurrent?.orderDetail?.map((order: any) => {
                                    if (order.product) {
                                        return (
                                            <TableRow key={order.product.id}>
                                                <TableCell>{order?.product?.id}</TableCell>
                                                <TableCell>
                                                    <img
                                                        width={'80px'}
                                                        height={'70px'}
                                                        src={order.product.image}
                                                        alt=""
                                                        style={{
                                                            margin: 'auto',
                                                            objectFit: 'contain',
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link
                                                        to={`/products/${order.product.slug}`}
                                                        style={{
                                                            flexShrink: 0,
                                                            color: '#333333',
                                                        }}
                                                    >
                                                        <Typography fontSize={'12px'}>{order.product.title}</Typography>
                                                    </Link>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Typography fontSize={'12px'}>{order.product.id}</Typography>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Typography fontSize={'12px'}>
                                                        {order.product.price_sale}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Typography fontSize={'12px'}>{order.quantity}</Typography>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Typography fontSize={'12px'}>
                                                        {numberFormat(order.quantity * order.product.price_sale)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography fontSize={'12px'}>
                                                        <Box
                                                            onClick={() => handleOpen(order.product.id)}
                                                            bgcolor={color.btnRed}
                                                            sx={{
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <Typography>Đánh giá</Typography>
                                                        </Box>
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                    return '';
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog
                        open={openDanhgia.isCheck}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        aria-labelledby="customized-dialog-title"
                    >
                        <DialogContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    pb: 1,
                                    width: '100%',
                                }}
                            >
                                <FormControl>
                                    <Typography component="legend">Chọn đánh giá của bạn:</Typography>
                                    <Controller
                                        name="star"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Rating
                                                    {...field}
                                                    defaultValue={0}
                                                    size="small"
                                                    name="simple-controlled"
                                                    onChange={(event, newRating: any) => {
                                                        setValue('star', newRating);
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                    <Typography variant="caption" color={color.error}>
                                        {errors.star && errors.star.message}
                                    </Typography>
                                </FormControl>
                            </Box>
                            <FormControl>
                                <Controller
                                    name="content"
                                    control={control}
                                    rules={{
                                        required: 'Vui lòng nhập nội dung đánh giá',
                                    }}
                                    render={({ field }) => (
                                        <TextareaAutosize
                                            {...field}
                                            style={{
                                                resize: 'none',
                                                padding: '12px',
                                                borderRadius: '4px',
                                                outline: 'none',
                                                border: '1px solid #ccc',
                                            }}
                                            minRows={4}
                                            name=""
                                            id=""
                                            placeholder="Nhập nhận xét về sản phẩm (Tối thiểu 100 kí tự)"
                                        ></TextareaAutosize>
                                    )}
                                />

                                <Typography variant="caption" color={color.error}>
                                    {errors.content && errors.content.message}
                                </Typography>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth="100%"
                                sx={{ mt: 3, background: '#F39801' }}
                                onClick={handleSubmit(handelComment)}
                            >
                                Gửi nhận xét
                            </Button>
                        </DialogContent>
                    </Dialog>
                </Box>
            </Box>
        </NavUser>
    );
}

export default UserCartDetail;
