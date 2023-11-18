import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DiscountIcon from '@mui/icons-material/Discount';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Box, Button, Chip, Grid, OutlinedInput, Pagination, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushError } from '../../../components/Toast/Toast';
import { numberFormat } from '../../../helpers/formatPrice';
import { NumberFormattingComponent } from '../../../helpers/formatvalidate';
import { httpDiscount } from '../../../submodules/controllers/http/axiosController';
import { Discount } from '../../../submodules/models/DiscountModel/Discount';

export default function AdminDiscount() {
    const [discount, setDiscount] = React.useState<Discount[]>([]);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        const props = {};
        fetchData(props);
    }, []);

    const fetchData = async (props: any) => {
        try {
            const discountData = await httpDiscount.getAll(props);
            if (discountData) setDiscount(discountData);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleDelete = async (element: any) => {
        const filter = discount.filter((e) => e.id !== element.id);
        await httpDiscount.delete(Number(element.id));
        setDiscount(filter);

        pushError('Mã giảm giá đã bị xóa');
    };

    return (
        <Grid>
            <Grid mt={3} width={'100%'}>
                <Stack direction={'row'} mb={2} alignItems={'center'} spacing={2} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'}>
                        <DiscountIcon
                            sx={{
                                mr: 1,
                            }}
                        />{' '}
                        Mã giảm giá
                    </Typography>
                    <OutlinedInput
                        sx={{
                            maxWidth: '300px',
                            mt: 1,
                            '& > input': {
                                p: '7px',
                            },
                        }}
                        fullWidth
                        placeholder="Tìm kiếm sản phẩm..."
                    />
                    <Link to={'/admin/createDiscount'}>
                        <Button variant="contained">Thêm mã giảm giá</Button>
                    </Link>
                </Stack>
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
                                <TableCell>ID</TableCell>
                                <TableCell>Mã giảm giá</TableCell>
                                <TableCell align="right">Số tiền giảm</TableCell>
                                <TableCell align="right">Số tiền đơn hàng áp dụng tối thiểu</TableCell>
                                <TableCell align="right">Số lần giới hạn nhập</TableCell>
                                <TableCell align="right">Hạn nhập </TableCell>
                                <TableCell align="right">Trạng thái</TableCell>
                                <TableCell align="right">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {discount.map((e: Discount, i) => (
                                <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {e.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {e.code}
                                    </TableCell>
                                    <TableCell align="right">{NumberFormattingComponent(e.discount)}</TableCell>
                                    <TableCell align="right">{numberFormat(Number(e.payment_limit))}</TableCell>
                                    <TableCell align="right">{e.limit_number}</TableCell>

                                    <TableCell align="right">
                                        {moment(e.expiration_date).format('DD MMM YYYY')}
                                    </TableCell>
                                    <TableCell align="right">
                                        {e?.status == 1 ? <Chip label="Hoạt động" color="success" /> : 'unactive'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack
                                            direction={'row'}
                                            color={color.text_color}
                                            spacing={2}
                                            justifyContent={'end'}
                                        >
                                            <Link to={`/admin/discount/${e.id}`}>
                                                <EditCalendarIcon
                                                    sx={{
                                                        color: 'green',
                                                    }}
                                                />
                                            </Link>
                                            <Box onClick={() => handleDelete(e)}>
                                                <DeleteForeverIcon
                                                    sx={{
                                                        color: 'red',
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box mt={2}>
                    <Pagination count={10} page={page} onChange={handleChange} />
                </Box>
            </Grid>
        </Grid>
    );
}
