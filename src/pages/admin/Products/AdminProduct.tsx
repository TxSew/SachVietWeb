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
import { numberFormat } from '../../../helpers/formatPrice';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import { httpCategory, httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Category } from '../../../submodules/models/ProductModel/Category';
import { Product } from '../../../submodules/models/ProductModel/Product';

export default function AdminProduct() {
    const [Products, setProducts] = React.useState<Product[]>([]);
    const [open, setOpen] = React.useState({
        isChecked: false,
        id: '',
    });

    const [Category, setCategory] = React.useState<Category[]>([]);
    const [pageCount, setPageCount] = React.useState<number>(1);
    const [page, setPage] = React.useState<number>(1);
    const [search, setSearch] = React.useState<string>('');
    const [sale, setSale] = React.useState('');
    const [sortBy, setSortBy] = React.useState('createdAt');
    const [sortWith, setSortWith] = React.useState('asc');
    const [sort, setSort] = React.useState('');
    const [sortCategory, setSortCategory] = React.useState('');
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
            keyword: debounce,
            sortBy,
            sortWith,
            categoryFilter: sortCategory,
            filter: sale,
        };

        fetchData(props);
    }, [page, debounce, sortBy, sortWith, sortCategory, sale]);

    const fetchData = async (props: any) => {
        try {
            const product: any = await httpProduct.getAll(props);
            const { products } = product;
            setPageCount(product.totalPage);
            setProducts(products);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        const props = {};
        const category: Category[] = await httpCategory.getCategory(props);
        setCategory(category);
    };

    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleDelete = async (id: any) => {
        await httpProduct.delete(id);
        pushError('Xoá sản phẩm thành công');
        const product = Products.filter((e) => e.id !== id);
        setProducts(product);
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

    const handleSortByCategory = async (event: SelectChangeEvent) => {
        setSortCategory(event.target.value);
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
    const handelSale = (event: any) => {
        setSale(event.target.value);
    };

    return (
        <>
            <Stack direction={'row'} mb={2} alignItems={'center'} spacing={2} justifyContent={'space-between'}>
                <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'} textTransform={'uppercase'}>
                    Quản lý Sản phẩm
                </Typography>

                <Button variant="contained">
                    <Link
                        style={{
                            color: color.white,
                        }}
                        to={`/admin/createProduct`}
                    >
                        Thêm sản phẩm
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={sortCategory}
                        onChange={handleSortByCategory}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Chọn danh mục</em>
                        </MenuItem>
                        {Category.map((e: Category) => {
                            return <MenuItem value={e.slug}>{e.name}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={sale}
                        onChange={handelSale}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={''}>Mặc định</MenuItem>
                        <MenuItem value={1}>Sản phẩm giảm giá</MenuItem>
                        <MenuItem value={2}>Sản phẩm bán chạy</MenuItem>
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
                            <TableCell align="center">Hình ảnh</TableCell>
                            <TableCell align="left">Tiêu đề</TableCell>
                            <TableCell align="left">Số lượng sản phẩm</TableCell>
                            <TableCell align="left">Danh mục</TableCell>
                            <TableCell align="center">Giá</TableCell>
                            <TableCell align="center">Nhà cung cấp</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Products.map((e, i) => (
                            <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {e.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <img
                                        style={{ objectFit: 'cover', margin: 'auto' }}
                                        src={e?.image}
                                        width={'70px'}
                                        height={'70px'}
                                        alt=""
                                    />
                                </TableCell>
                                <TableCell align="left">{e.title}</TableCell>
                                <TableCell align="left">{e.quantity}</TableCell>
                                <TableCell align="left">{e.category?.name}</TableCell>
                                <TableCell align="center">{numberFormat(Number(e.price_sale))}</TableCell>
                                <TableCell align="center">{e.producer?.name}</TableCell>
                                <TableCell align="center">
                                    {Number(e.quantity) > 0 ? (
                                        <Chip label="Còn hàng" color="success" />
                                    ) : (
                                        <Chip color="error" label="Hết hàng" />
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <Stack
                                        direction={'row'}
                                        color={color.text_color}
                                        spacing={2}
                                        justifyContent={'end'}
                                    >
                                        <Link to={`/admin/product/${e.id}`}>
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
                                                handleClickOpen(e);
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
                                                        Bạn chắc chắn muốn xóa sản phẩm này?
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
                <Pagination count={pageCount} page={page} onChange={handleChange} />
            </Stack>
        </>
    );
}
