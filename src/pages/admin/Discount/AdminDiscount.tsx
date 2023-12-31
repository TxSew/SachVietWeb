import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DiscountIcon from '@mui/icons-material/Discount';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fade,
    OutlinedInput,
    Pagination,
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
import * as React from 'react';
import { Link } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushError } from '../../../components/Toast/Toast';
import { TitleHelmet } from '../../../constants/Helmet';
import { formatDates } from '../../../helpers/FortmatDate';
import { numberFormat } from '../../../helpers/formatPrice';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import { httpDiscount } from '../../../submodules/controllers/http/axiosController';
import { Discount } from '../../../submodules/models/DiscountModel/Discount';
import useMedia from '../../../hooks/useMedia/useMedia';

export default function AdminDiscount() {
    const selectedDate = (value: any) => new Date(value);
const currentDate = new Date();
    const { isMediumMD } = useMedia();

    const [discount, setDiscount] = React.useState<any>({});
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState<string>('');
    const debounce = useDebounce(search, 300);

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
            keyword: debounce,
            page: page,
        };
        fetchData(props);
    }, [debounce, page]);

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

    const handleDelete = async (element: number) => {
        await httpDiscount.delete(Number(element));
        const { data, ...rest } = discount as any;
        const filter = discount?.data.filter((e: any) => e.id !== element);
        const value = {
            ...rest,
            data: filter,
        };

        setDiscount(value);
        pushError('Mã giảm giá đã bị xóa');
        handleClickClose();
    };

    return (
        <>
            {TitleHelmet('Quản lý Mã giảm giá')}
            <Box display={{ xs: 'block', md: 'flex' }} mb={2} alignItems={'center'} justifyContent={'space-between'}>
                <Typography
                    variant="h2"
                    pb={{ xs: 2, md: 0 }}
                    display={'flex'}
                    fontSize={'26px'}
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                >
                    Quản lý mã giảm giá
                </Typography>
                <Button variant="contained">
                    <Link
                        style={{
                            color: color.white,
                        }}
                        to={`/admin/createDiscount`}
                    >
                        Thêm mã giảm giá
                    </Link>
                </Button>
            </Box>
            <OutlinedInput
                sx={
                    isMediumMD
                        ? {
                              maxWidth: '100%',
                              '& > input': {
                                  p: '7px',
                              },
                          }
                        : {
                              maxWidth: '300px',
                          }
                }
                fullWidth
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                placeholder="Tìm kiếm sản phẩm..."
            />
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
                            <TableCell align="left">Số tiền giảm</TableCell>
                            <TableCell align="left">Số tiền đơn hàng áp dụng tối thiểu</TableCell>
                            <TableCell align="left">Số lần giới hạn nhập</TableCell>
                            <TableCell align="left">Hạn nhập </TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="right">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {discount?.data?.map((e: Discount, i: number) => (
                            <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {e.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {e.code}
                                </TableCell>
                                <TableCell align="left">{numberFormat(Number(e.discount))}</TableCell>
                                <TableCell align="left">{numberFormat(Number(e.payment_limit))}</TableCell>
                                <TableCell align="left">{e.limit_number}</TableCell>

                                <TableCell align="left">{formatDates(e.expiration_date)}</TableCell>
                                <TableCell align="center">
                                    {Number(e.number_used) >= Number(e.limit_number) ? <Chip label="Hết lượt" color="warning" /> : selectedDate(e.expiration_date) < currentDate ? <Chip label="Hết hạn" color="error" /> :  <Chip label="Hoạt động" color="success" />}
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
                                        <Box>
                                            <DeleteForeverIcon
                                                sx={{
                                                    color: 'red',
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
                                                        onClick={() => handleDelete(Number(open.id))}
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
                <Pagination count={discount?.totalPage} page={page} onChange={handleChange} />
            </Box>
        </>
    );
}
