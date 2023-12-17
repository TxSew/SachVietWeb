import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Fade,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { color } from '../../../Theme/color';
import { formatDates } from '../../../helpers/FortmatDate';
import { numberFormat } from '../../../helpers/formatPrice';
import { httpCart } from '../../../submodules/controllers/http/axiosController';
import { OrderType } from '../../../submodules/models/OrderModel/Order';
import Invoice from '../../clients/invoice/invoice';
import { pushError, pushSuccess } from '../../../components/Toast/Toast';
import useMedia from '../../../hooks/useMedia/useMedia';

function DetailCarts() {
    const { isMediumMD } = useMedia();
    const componentRef: any = useRef();
    const [openInvoice, setOpenInvoice] = useState<any>({
        isCheck: false,
        value: 1,
    });
    const handleOpen = () => {
        setOpenInvoice({
            isCheck: true,
            value: '3434',
        });
    };

    const handleClose = () => {
        setOpenInvoice({
            isCheck: false,
            value: 2,
        });
    };
    const { id } = useParams();
    const [orderCurrent, setDetailOrder] = useState<any>({});
    const [reload, setReload] = useState<any>(1);
    useEffect(() => {
        fetchOrderDetail();
    }, [reload]);
    const fetchOrderDetail = async () => {
        try {
            const detail = await httpCart.getOrderDetail(Number(id));
            if (detail) {
                setDetailOrder(detail);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onPrintError: () => pushError('Xuất hóa đơn thất bại!'),
    });

    return (
        <Box bgcolor={color.text_color}>
            <Box sx={{}}>
                <Grid
                    container
                    maxWidth="xl"
                    sx={{
                        backgroundColor: color.white,
                        padding: '20px',
                    }}
                >
                    <Grid item xs={12}>
                        <Box>
                            <Typography
                                variant="h2"
                                fontSize={'25px'}
                                fontWeight={'bold'}
                                pt={'20px'}
                                textTransform={'uppercase'}
                            >
                                Chi tiết đơn hàng
                            </Typography>
                            {orderCurrent.status === null ? (
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        backgroundColor: '#F6BA71',
                                        borderRadius: '30px',
                                        fontSize: '14px',
                                        padding: '10px 15px',
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        color: '#F7941E',
                                    }}
                                >
                                    Đơn hàng chờ xác nhận
                                </Box>
                            ) : orderCurrent.status === 1 ? (
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        backgroundColor: color.BtnDartGreen,
                                        borderRadius: '30px',
                                        fontSize: '14px',
                                        padding: '10px 15px',
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        color: '#F7941E',
                                    }}
                                >
                                    Đơn hàng đang giao
                                </Box>
                            ) : orderCurrent.status === 2 ? (
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        backgroundColor: color.BtnDartGreen,
                                        borderRadius: '30px',
                                        fontSize: '14px',
                                        padding: '10px 15px',
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        color: 'lightGreen',
                                    }}
                                >
                                    Đơn hàng đã bán
                                </Box>
                            ) : orderCurrent.status === 3 ? (
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        backgroundColor: '#F6BA71',
                                        borderRadius: '30px',
                                        fontSize: '14px',
                                        padding: '10px 15px',
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        color: '#F7941E',
                                    }}
                                >
                                    Đơn hàng đã bị hủy
                                </Box>
                            ) : (
                                ''
                            )}
                            <Box py={2}>
                                <Box
                                    display={{ xs: 'block', md: 'flex' }}
                                    alignItems={'center'}
                                    mt={'10px'}
                                    gap={'16px'}
                                >
                                    {orderCurrent.status === null ? (
                                        <Button
                                            variant="containedGreen"
                                            sx={
                                                isMediumMD
                                                    ? {
                                                          padding: '8px 16px',
                                                          borderRadius: '15px',
                                                          mr: '16px',
                                                      }
                                                    : {
                                                          backgroundColor: 'gray',
                                                          borderRadius: '15px',
                                                      }
                                            }
                                            onClick={() => {
                                                httpCart
                                                    .put(Number(orderCurrent.id), {
                                                        status: 1,
                                                    })
                                                    .then((response) => {
                                                        console.log(response);
                                                        setReload(11);
                                                    });
                                            }}
                                        >
                                            <Typography
                                                textTransform={'capitalize'}
                                                fontSize={{ xs: '12px', md: '14px' }}
                                            >
                                                {isMediumMD ? 'Xác nhận' : 'Xác nhận đơn hàng'}
                                            </Typography>
                                        </Button>
                                    ) : orderCurrent.status === 1 ? (
                                        <Button
                                            variant="containedGreen"
                                            sx={
                                                isMediumMD
                                                    ? {
                                                          padding: '8px 16px',
                                                          borderRadius: '15px',
                                                          mr: '16px',
                                                      }
                                                    : {
                                                          bgcolor: '#2e7d32',
                                                          mt: '10px',
                                                          borderRadius: '15px',
                                                      }
                                            }
                                            onClick={() => {
                                                httpCart
                                                    .put(Number(orderCurrent.id), {
                                                        status: 2,
                                                    })
                                                    .then((response) => {
                                                        console.log(response);
                                                        setReload(11);
                                                    });
                                            }}
                                        >
                                            <Typography textTransform={'capitalize'}>Xác nhận thanh toán</Typography>
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                    {orderCurrent.status == null ? (
                                        <Button
                                            variant="OutlinedRed"
                                            sx={{
                                                borderRadius: '15px',
                                                padding: '8px 16px',
                                            }}
                                        >
                                            <Typography
                                                textTransform={'capitalize'}
                                                fontSize={{ xs: '12px', md: '14px' }}
                                            >
                                                {isMediumMD ? 'Hủy' : 'Hủy đơn hàng'}
                                            </Typography>
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                </Box>
                            </Box>

                            <Box>
                                <Stack direction={'row'} mt={'10px'}>
                                    <Typography>Mã đơn hàng:</Typography>
                                    <Typography fontWeight={'bold'}>{orderCurrent.id}</Typography>
                                </Stack>

                                <Stack direction={'row'} mt={'10px'}>
                                    <Typography>Ngày mua:</Typography>
                                    <Typography fontWeight={'bold'}>{formatDates(orderCurrent.createdAt)}</Typography>
                                </Stack>

                                <Stack direction={'row'} mt={'10px'}>
                                    <Typography>Tổng tiền: </Typography>
                                    <Typography fontWeight={'bold'}>
                                        {numberFormat(orderCurrent.money - orderCurrent.coupon)}
                                    </Typography>
                                </Stack>

                                <Stack direction={'row'} mt={'10px'}>
                                    <Typography>Thông tin xuất hóa đơn: </Typography>
                                    <Typography fontWeight={'bold'}>không có</Typography>
                                </Stack>
                                {orderCurrent.bill === 1 ? (
                                    <Box
                                        onClick={handleOpen}
                                        sx={{
                                            display: 'inline-block',
                                            backgroundColor: 'orange',
                                            cursor: 'pointer',
                                            borderRadius: '30px',
                                            fontSize: '14px',
                                            padding: '6px 15px',
                                            marginTop: '10px',
                                            fontWeight: 'bold',
                                            color: color.BtnDartGreen,
                                        }}
                                    >
                                        Xem hóa đơn
                                    </Box>
                                ) : (
                                    ''
                                )}
                                <Dialog
                                    open={openInvoice.isCheck}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    aria-labelledby="customized-dialog-title"
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <DialogContent
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        <Box ref={componentRef}>
                                            <Invoice />
                                        </Box>
                                        <Box
                                            onClick={handlePrint}
                                            sx={{
                                                display: 'inline-block',
                                                backgroundColor: 'orange',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                borderRadius: '3px',
                                                p: '2px 5px',
                                                marginTop: '10px',
                                                fontWeight: 'bold',
                                                color: color.text_color,
                                            }}
                                        >
                                            <Typography>Xuất hóa đơn</Typography>
                                        </Box>
                                    </DialogContent>
                                </Dialog>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={3}></Grid>
                </Grid>
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
                    <Grid item xs={12} md={3.8}>
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
                    <Grid item xs={12} md={3.8}>
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
                </Grid>
            </Box>

            <Box mt={'20px'} mb={'20px'}>
                <Box
                    sx={{
                        backgroundColor: color.white,
                        padding: '20px',
                    }}
                >
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
                                    <TableCell align="center"> SL</TableCell>
                                    <TableCell align="center">Thành tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderCurrent?.orderDetail?.map((order: any) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{order.product.id}</TableCell>
                                            <TableCell>
                                                <img
                                                    width={'80px'}
                                                    height={'70px'}
                                                    src={order.product.image}
                                                    alt=""
                                                    style={{
                                                        margin: 'auto',
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell align="center">
                                                <Typography fontSize={'12px'}>{order.product.title}</Typography>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Typography fontSize={'12px'}>{order.product.id}</Typography>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Typography fontSize={'12px'}>{order.product.price_sale}</Typography>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Typography fontSize={'12px'}>{order.quantity}</Typography>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Typography fontSize={'12px'}>
                                                    {numberFormat(order.quantity * order.product.price_sale)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}

export default DetailCarts;
