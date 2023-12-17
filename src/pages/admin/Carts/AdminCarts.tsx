import { Label } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fade,
    FormControl,
    Grid,
    MenuItem,
    OutlinedInput,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';
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
import { toast } from 'react-toastify';
import { color } from '../../../Theme/color';
import { httpCart, httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Order } from '../../../submodules/models/OrderModel/Order';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import { pushError, pushSuccess } from '../../../components/Toast/Toast';
import { numberFormat } from '../../../helpers/formatPrice';

export default function AdminCarts() {
    const [carts, setCarts] = React.useState<any>({});
    const [page, setPage] = React.useState<number>(1);
    const [search, setSearch] = React.useState<string>('');
    const [status, setStatus] = React.useState('');
    const debounce = useDebounce(search, 400);
    const [open, setOpen] = React.useState({
        isChecked: false,
        id: '',
    });
    const handleClickClose = () => {
        setOpen({
            isChecked: false,
            id: '',
        });
    };

    const handleClickOpen = (id: any) => {
        setOpen({
            isChecked: true,
            id: id.id,
        });
    };
    React.useEffect(() => {
        const props = {
            limit: 5,
            page,
            keyword: debounce,
            status: status,
        };
        fetchData(props);
    }, [page, debounce, status]);

    const handleUpdateOrder = async (id: any) => {
        await httpCart.put(Number(id), {
            status: 2,
        });
        const order = (await httpCart.getOrderDetail(id)) as any;
        console.log('🚀 ~ file: AdminCarts.tsx:80 ~ handleUpdateOrder ~ order:', order);
        await httpProduct.updateQuantity(order.orderDetail).then((response) => {
            console.log(response);
        });
        window.location.reload();
    };
    const handleChangeValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const fetchData = async (props: any) => {
        try {
            const cartsData = await httpCart.getAll(props);
            setCarts(cartsData as any);
        } catch (err) {
            console.log(err);
        }
    };
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDelete = async (element: any) => {
        await httpCart.delete(Number(element));
        fetchData({
            limit: 5,
        });
        // const filter = carts.filter((e: any) => e.id !== element);
        // console.log('🚀 ~ file: AdminCarts.tsx:108 ~ handleDelete ~ filter:', filter);
        // setCarts(filter);
        pushError('Đơn hàng đã bị xóa');
        handleClickClose();
    };

    const handleChangeSort = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };
    return (
        <Grid>
            <Grid width={'100%'}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    mb={2}
                    textAlign={'left'}
                    alignItems={'center'}
                    spacing={2}
                    justifyContent={'space-between'}
                >
                    <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'} textTransform={'uppercase'}>
                        <ShoppingBasketIcon
                            sx={{
                                mr: 1,
                                textAlign: 'left',
                            }}
                        />
                        quản lý đơn hàng
                    </Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            displayEmpty
                            defaultValue={undefined}
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={handleChangeSort}
                        >
                            <MenuItem value={undefined}>
                                <em>-- Chọn trạng thái --</em>
                            </MenuItem>
                            <MenuItem value={`${null}`}> Đang chờ duyệt</MenuItem>
                            <MenuItem value={1}>Đang giao </MenuItem>
                            <MenuItem value={2}>Đã giao hàng</MenuItem>
                            <MenuItem value={3}> Bị hủy</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <TableContainer component={Paper}>
                    <Table
                        sx={{
                            minWidth: '1020px',
                        }}
                        aria-label="simple tablek w"
                    >
                        <TableHead
                            sx={{
                                border: '1px solid #eee',
                            }}
                        >
                            <TableRow
                                sx={{
                                    '& > th': {
                                        fontWeight: 'bold',
                                    },
                                }}
                            >
                                <TableCell>
                                    Mã đơn hàng
                                    <OutlinedInput
                                        type="number"
                                        sx={{
                                            display: 'block',
                                            maxWidth: '100px',
                                            mt: 1,
                                            '& > input': {
                                                p: '7px',
                                            },
                                        }}
                                        fullWidth
                                        onChange={handleChangeValue}
                                    />
                                </TableCell>
                                <TableCell>Khách hàng</TableCell>
                                <TableCell align="center">Tổng tiền</TableCell>
                                <TableCell align="center">Ngày tạo hóa đơn</TableCell>
                                <TableCell align="right">Trạng thái</TableCell>
                                <TableCell align="center">Xử lý đơn</TableCell>
                                <TableCell align="right">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carts?.orders?.map((e: Order) => (
                                <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {e.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {e.userID == null ? 'Khách vãng lai' : e.users?.fullName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Intl.NumberFormat('en-US', {
                                            currency: 'USD',
                                        }).format(Number(e.money))}
                                    </TableCell>
                                    <TableCell align="center">{moment(e.createdAt).format('DD MMM YYYY')}</TableCell>
                                    <TableCell align="right">
                                        {e.status == null ? (
                                            <Typography sx={{ color: 'gray', fontSize: '13px' }}>
                                                Đang chờ duyệt
                                            </Typography>
                                        ) : e.status == 1 ? (
                                            <Typography
                                                sx={{
                                                    color: 'blue',
                                                    fontSize: '13px',
                                                }}
                                            >
                                                {' '}
                                                Đang giao hàng
                                            </Typography>
                                        ) : e.status == 2 ? (
                                            <Typography color={'green'}> Đã giao </Typography>
                                        ) : e.status == 3 ? (
                                            <Typography color={'red'}>Đã bị hủy</Typography>
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack
                                            direction={'row'}
                                            color={color.text_color}
                                            spacing={2}
                                            justifyContent={'end'}
                                        >
                                            {e.status == null ? (
                                                <>
                                                    <Stack
                                                        sx={{
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={async () => {
                                                            const updated = await httpCart.put(Number(e.id), {
                                                                status: 1,
                                                            });
                                                            window.location.reload();
                                                            pushSuccess('Duyệt đơn hàng thành công ');
                                                        }}
                                                    >
                                                        <Chip label="Duyệt đơn hàng" />
                                                    </Stack>
                                                    <Box>
                                                        <Stack
                                                            sx={{
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={async () => {
                                                                const updated = await httpCart.put(Number(e.id), {
                                                                    status: 3,
                                                                });
                                                                window.location.reload();

                                                                pushError('Đơn hàng đã bị hủy');
                                                            }}
                                                        >
                                                            <Chip
                                                                color="error"
                                                                label="Hủy đơn"
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Box>
                                                </>
                                            ) : e.status == 1 ? (
                                                <>
                                                    <Stack onClick={() => handleUpdateOrder(e.id)}>
                                                        <Chip
                                                            color="success"
                                                            label="Xác nhận thanh toán"
                                                            sx={{
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                    </Stack>
                                                    <Box>
                                                        <Stack
                                                            onClick={async () => {
                                                                const updated = await httpCart.put(Number(e.id), {
                                                                    status: 3,
                                                                });
                                                                window.location.reload();
                                                                pushSuccess('Đơn hàng đã bị hủy');
                                                            }}
                                                        >
                                                            <Chip
                                                                color="error"
                                                                label="Hủy đơn"
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Box>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </Stack>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Stack
                                            sx={{
                                                cursor: 'pointer',
                                            }}
                                            direction={'row'}
                                            color={color.text_color}
                                            spacing={2}
                                            justifyContent={'end'}
                                        >
                                            <Link to={`/admin/orders/detail/${e.id}`}>
                                                <VisibilityIcon
                                                    sx={{
                                                        color: 'green',
                                                    }}
                                                />
                                            </Link>
                                            <Box>
                                                <DeleteForeverIcon
                                                    sx={{
                                                        color: 'red',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleClickOpen(e)}
                                                />

                                                <Dialog
                                                    open={open.isChecked}
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
                                                            <DeleteForeverIcon
                                                                sx={{
                                                                    fontSize: '56px',
                                                                    color: 'rgb(201, 33, 39)',
                                                                }}
                                                            />
                                                            <DialogTitle fontSize={'16px'}>
                                                                Bạn chắc chắn muốn xóa đơn hàng này?
                                                            </DialogTitle>
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <Box
                                                        display={'flex'}
                                                        paddingBottom={'24px'}
                                                        justifyContent={'space-around'}
                                                    >
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
                                                            onClick={() => handleDelete(open.id)}
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
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    mt={2}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Pagination count={carts?.totalPage} page={page} onChange={handleChange} />
                </Box>
            </Grid>
        </Grid>
    );
}
