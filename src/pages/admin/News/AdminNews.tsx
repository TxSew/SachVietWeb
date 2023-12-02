import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import * as React from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Link } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushError } from '../../../components/Toast/Toast';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import { httpNews, httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Product } from '../../../submodules/models/ProductModel/Product';

export default function AdminNews() {
    const [Products, setProducts] = React.useState<Product[]>([]);
    const [open, setOpen] = React.useState({
        isChecked: false,
        id: '',
    });

    const [page, setPage] = React.useState<number>(1);
    const [search, setSearch] = React.useState<string>('');
    const [sortBy, setSortBy] = React.useState('createdAt');
    const [sortWith, setSortWith] = React.useState('asc');
    const [sort, setSort] = React.useState('');
    const [news, setNews] = React.useState<any>({});
    const debounce = useDebounce(search, 400);

    const tableRef = React.useRef<any>(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Product',
        sheet: 'products',
    });

    React.useEffect(() => {
        const props = {
            limit: 5,
            page,
        };
        httpNews.getList(props).then((news) => {
            if (news) {
                setNews(news);
            }
        });
    }, [page]);

    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleDelete = async (id: any) => {
        await httpNews.deleteNew(id).then((res) => {
            pushError('Xoá Bài viết thành công');
        });
        const data = news?.data?.filter((e: any) => e.id !== id);
        setNews({
            data: data,
        });
        handleClickClose();
    };

    const handleChangeValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleClickOpen = (id: any) => {
        setOpen({
            isChecked: true,
            id: id,
        });
    };

    const handleClickClose = () => {
        setOpen({
            isChecked: false,
            id: '',
        });
    };

    const handleChangeSort = (event: SelectChangeEvent) => {
        if (event.target.value === 'priceDown') {
            setSortBy('price_sale');
            setSortWith('desc');
            setSort(event.target.value);
        } else if (event.target.value === 'priceUp') {
            setSortBy('price_sale');
            setSortWith('asc');
            setSort(event.target.value);
        }
        if (event.target.value === 'old') {
            setSortBy('createdAt');
            setSortWith('desc');
            setSort(event.target.value);
        } else if (event.target.value === 'new') {
            setSortBy('createdAt');
            setSortWith('asc');
            setSort(event.target.value);
        }
    };

    return (
        <>
            <Stack direction={'row'} mb={2} alignItems={'center'} spacing={2} justifyContent={'space-between'}>
                <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'} textTransform={'uppercase'}>
                    Quản lý bài viết
                </Typography>

                <Button variant="contained">
                    <Link
                        style={{
                            color: color.white,
                        }}
                        to={`/admin/createNews`}
                    >
                        Thêm bài viết
                    </Link>
                </Button>
            </Stack>
            <Stack mb={1} spacing={3} sx={{ minWidth: 300 }} direction={'row'}>
                <Typography>Sắp xếp:</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={sort}
                        onChange={handleChangeSort}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Tùy chọn</em>
                        </MenuItem>
                        <MenuItem value={'old'}>Cũ nhất</MenuItem>
                        <MenuItem value={'new'}>Mới nhất</MenuItem>
                        <MenuItem value={'priceDown'}>Giá từ thấp lên cao</MenuItem>
                        <MenuItem value={'priceUp'}>Giá từ cao xuống thấp</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    onClick={onDownload}
                    variant="outlinedGreen"
                    sx={{
                        border: '1px solid #ccc',
                    }}
                >
                    <Typography textTransform={'capitalize'} fontSize={'12px'} color={'#333'}>
                        Xuất EXEL
                    </Typography>
                </Button>
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
                    onChange={handleChangeValue}
                />
            </Stack>

            <TableContainer component={Paper} ref={tableRef}>
                <Table
                    sx={{
                        minWidth: 1280,
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
                            <TableCell>Tiêu đề</TableCell>
                            <TableCell align="center">Hình ảnh</TableCell>
                            <TableCell align="center">Tác giả</TableCell>
                            <TableCell align="center"> Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {news?.data?.map((e: any, i: number) => (
                            <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {e.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {e.title}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                    align="center"
                                >
                                    <img
                                        style={{ objectFit: 'cover' }}
                                        src={e?.image}
                                        width={'70px'}
                                        height={'70px'}
                                        alt=""
                                    />
                                </TableCell>

                                <TableCell align="center">{e.author}</TableCell>
                                <TableCell align="center">
                                    {e.status == null ? (
                                        <Chip label="Xuất bản" color="success" />
                                    ) : (
                                        <Chip color="error" label="Ngưng  Xuất bản" />
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <Stack
                                        direction={'row'}
                                        color={color.text_color}
                                        spacing={2}
                                        justifyContent={'end'}
                                    >
                                        <Link to={`/admin/news/${e.id}`}>
                                            <EditCalendarIcon
                                                sx={{
                                                    color: 'green',
                                                }}
                                            />
                                        </Link>
                                        <DeleteForeverIcon
                                            sx={{
                                                color: 'red',
                                            }}
                                            onClick={() => {
                                                handleClickOpen(e.id);
                                            }}
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
                                                        Bạn chắc chắn muốn xóa bài viết này?
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
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack mt={2} textAlign={'center'} justifyContent={'center'} alignItems={''}>
                <Pagination count={news?.totalPage} page={page} onChange={handleChange} />
            </Stack>
        </>
    );
}
