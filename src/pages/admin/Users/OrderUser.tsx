import { Box, Chip, Pagination, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDates } from '../../../helpers/FortmatDate';
import { numberFormat } from '../../../helpers/formatPrice';
import { httpCart } from '../../../submodules/controllers/http/axiosController';
import { Order } from '../../../submodules/models/OrderModel/Order';
// import CartNotFound from '../cart/components/CartNotFound/CartNotFound';
// import NavUser from './layout/NavUser';
import CartNotFound from '../../clients/cart/components/CartNotFound/CartNotFound';

function OrderUser() {
    const { id } = useParams();
    const [orderUser, setOrderUser] = useState<any>({});
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const props = {
            page: page,
        };
        getOrderByUser(props);
    }, [page]);

    const getOrderByUser = async (props: any) => {
        const orderUserData = await httpCart.getOrderAdminbyUser(Number(id), props);
        setOrderUser(orderUserData);
    };
    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <Box>
            <Box>
                <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'} textTransform={'uppercase'}>
                    Đơn hàng Của Khách Hàng
                </Typography>
            </Box>
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
                                            <TableCell align="center">{numberFormat(Number(e.money))}</TableCell>
                                            <TableCell align="center">{e.orderType}</TableCell>
                                            <TableCell align="center">
                                                {e.status === null ? (
                                                    <Chip
                                                        sx={{
                                                            maxWidth: '130px',
                                                            width: '100%',
                                                        }}
                                                        label="Đang chờ duyệt"
                                                    />
                                                ) : e.status === 1 ? (
                                                    <Chip
                                                        sx={{
                                                            maxWidth: '130px',
                                                            width: '100%',
                                                        }}
                                                        color="primary"
                                                        label="Đang giao hàng"
                                                    />
                                                ) : e.status === 2 ? (
                                                    <Chip
                                                        sx={{
                                                            maxWidth: '130px',
                                                            width: '100%',
                                                        }}
                                                        label=" Đã giao hàng"
                                                        color="success"
                                                    />
                                                ) : (
                                                    <Chip
                                                        sx={{
                                                            maxWidth: '130px',
                                                            width: '100%',
                                                        }}
                                                        label="Đã hủy"
                                                        color="error"
                                                    />
                                                )}
                                            </TableCell>

                                            <TableCell align="right">
                                                <Link to={`/admin/orders/detail/${e.id}`}>
                                                    <Chip label=" Xem" color="primary" />
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
                <CartNotFound />
            )}
        </Box>
    );
}

export default OrderUser;
