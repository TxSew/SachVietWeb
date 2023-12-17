import { Box, Button, Chip, Container, Pagination, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDates } from '../../../helpers/FortmatDate';
import { numberFormat } from '../../../helpers/formatPrice';
import { httpCart } from '../../../submodules/controllers/http/axiosController';
import { Order } from '../../../submodules/models/OrderModel/Order';
import CartNotFound from '../cart/components/CartNotFound/CartNotFound';
import './index.scss';
import NavUser from './layout/NavUser';
import './style.scss';
import { color } from '../../../Theme/color';
function UserMyCart() {
    const [orderUser, setOrderUser] = useState<any>({});
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const props = {
            page: page,
        };
        getOrderByUser(props);
    }, [page]);

    const getOrderByUser = async (props: any) => {
        const orderUserData = await httpCart.getOrderbyUser(props);
        setOrderUser(orderUserData);
    };
    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <NavUser>
            <div className="main ps-0 pt-3 pb-3 pe-0">
                <div className="main-waper ">
                    <div className="main-waper-end pt-4 pb-5 ps-4 pe-4">
                        <h1 className="info-acc-hd p-3">Đơn hàng của tôi</h1>
                        {orderUser?.data?.length > 0 ? (
                            <div className="p-3">
                                <TableContainer component={Paper}>
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
                                                <TableCell>Mã đơn hàng</TableCell>
                                                <TableCell align="center">Ngày mua</TableCell>
                                                <TableCell align="center">Tổng tiền</TableCell>
                                                <TableCell align="center">Thanh toán</TableCell>
                                                <TableCell align="center">Trạng thái</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderUser?.data.map((e: Order) => {
                                                return (
                                                    <TableRow
                                                        sx={{
                                                            '&:last-child td, &:last-child th': { border: 0 },
                                                        }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {e.id}
                                                        </TableCell>
                                                        <TableCell align="center">{formatDates(e.createdAt)}</TableCell>
                                                        <TableCell align="center">
                                                            {numberFormat(Number(e.money) - Number(e.coupon))}
                                                        </TableCell>
                                                        <TableCell align="center">{e.orderType}</TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{
                                                                fontSize: '12px',
                                                            }}
                                                        >
                                                            {e.status == null ? (
                                                                <Chip
                                                                    sx={{
                                                                        fontSize: '12px',
                                                                        maxWidth: '130px',
                                                                        width: '100%',
                                                                    }}
                                                                    label="Đang chờ duyệt"
                                                                />
                                                            ) : e.status == 1 ? (
                                                                <Chip
                                                                    sx={{
                                                                        fontSize: '12px',
                                                                        maxWidth: '130px',
                                                                        width: '100%',
                                                                    }}
                                                                    color="primary"
                                                                    label="Đang giao hàng"
                                                                />
                                                            ) : e.status == 2 ? (
                                                                <Chip
                                                                    sx={{
                                                                        maxWidth: '130px',
                                                                        fontSize: '12px',
                                                                        width: '100%',
                                                                    }}
                                                                    label=" Đã giao hàng"
                                                                    color="success"
                                                                />
                                                            ) : e.status === 3 ? (
                                                                <Chip
                                                                    sx={{
                                                                        maxWidth: '130px',
                                                                        fontSize: '12px',
                                                                        width: '100%',
                                                                    }}
                                                                    label="Đã hủy"
                                                                    color="error"
                                                                />
                                                            ) : (
                                                                ''
                                                            )}
                                                        </TableCell>

                                                        <TableCell align="right">
                                                            <Link to={`/user/mycart/${e.id}`}>
                                                                <Chip
                                                                    label=" Xem"
                                                                    color="primary"
                                                                    sx={{
                                                                        fontSize: '12px',
                                                                    }}
                                                                />
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                    pt={2}
                                >
                                    <Pagination count={orderUser?.totalPage} page={page} onChange={handleChange} />
                                </Box>
                            </div>
                        ) : (
                            <Container maxWidth="xl">
                                <Box
                                    bgcolor={color.white}
                                    p={'40px'}
                                    borderRadius={2}
                                    boxShadow={'0px 0px 2px rgba(0, 0, 0, 0.1)'}
                                >
                                    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <Box
                                            sx={{
                                                maxWidth: '160px',
                                            }}
                                        >
                                            <img
                                                width={'100%'}
                                                src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"
                                                alt=""
                                            />
                                        </Box>
                                        <Typography variant="body1" my={'20px'}>
                                            Chưa có đơn hàng trong lịch sử đơn hàng của bạn.
                                        </Typography>
                                        <Button variant="contained">
                                            <Link
                                                to={'/'}
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                Mua sắm ngay
                                            </Link>
                                        </Button>
                                    </Stack>
                                </Box>
                            </Container>
                        )}
                    </div>
                </div>
            </div>
        </NavUser>
    );
}

export default UserMyCart;
