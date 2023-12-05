import {
    Box,
    Button,
    Chip,
    Container,
    OutlinedInput,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../../helpers/formatPrice';
import { formatDates } from '../../../helpers/FortmatDate';
import { httpCart } from '../../../submodules/controllers/http/axiosController';

function SearchOrder() {
    const [orderUser, setOrderUser] = useState<any>([]);
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {},
    });

    const [isRole, setIsRole] = useState<boolean>(false);

    const handleSearch = (data: any) => {
        httpCart.getAll(data).then((response) => {
            if (response?.orders?.length > 0) {
                setIsRole(true);
            } else {
                setIsRole(false);
            }
            setOrderUser(response);
        });
    };

    return (
        <Box>
            <Container maxWidth="xs">
                <Box padding={4}>
                    <Typography variant="body1" fontSize={'14px'} fontStyle={'italic'}>
                        Xin mời quý bạn nhập mã đơn hàng, số điện thoại nhận hàng để tra cứu tình trạng đơn hàng
                    </Typography>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={2}
                        justifyContent={'center'}
                        padding={'20px 0px'}
                    >
                        <Controller
                            control={control}
                            name="keyword"
                            defaultValue=""
                            rules={{
                                required: 'Tên sản phẩm không được bỏ trống!',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        maxWidth: '500px',
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập mã đơn hàng, mã vận đơn hoặc số điện thoại !"
                                />
                            )}
                        />
                        <Button variant="OutlinedRed" onClick={handleSubmit(handleSearch)}>
                            Tra cứu
                        </Button>
                    </Stack>
                    {isRole && (
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
                                    {orderUser?.orders?.map((e: any) => {
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
                                                <TableCell align="center">{numberFormat(e.money)}</TableCell>
                                                <TableCell align="center">{e.orderType}</TableCell>
                                                <TableCell align="center">
                                                    {e.status == null ? (
                                                        <Chip
                                                            sx={{
                                                                maxWidth: '130px',
                                                                width: '100%',
                                                            }}
                                                            label="Đang chờ duyệt"
                                                        />
                                                    ) : e.status == 1 ? (
                                                        <Chip
                                                            sx={{
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
                                                    <Link to={`/user/mycart/${e.id}`}>
                                                        <Chip label=" Xem" color="primary" />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default SearchOrder;
