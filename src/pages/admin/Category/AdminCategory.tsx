import CategoryIcon from '@mui/icons-material/Category';
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
    Grid,
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
import { formatDates } from '../../../helpers/FortmatDate';
import { httpCategory } from '../../../submodules/controllers/http/axiosController';
import { Category } from '../../../submodules/models/ProductModel/Category';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import { TitleHelmet } from '../../../constants/Helmet';
export default function CategoryAdmin() {
    const [search, setSearch] = React.useState<string>('');
    const deBounce = useDebounce(search, 300);
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
            id: id,
        });
    };
    const [category, setCategory] = React.useState([]);
    const [pageCount, setPageCount] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(1);
    React.useEffect(() => {
        const props = {
            page: page,
            keyword: deBounce,
        };
        fetchData(props);
    }, [page, deBounce]);

    const fetchData = async (props: any) => {
        try {
            const CategoryData: any = await httpCategory.getAll(props);
            setPageCount(CategoryData.totalPage);
            const filteredData = CategoryData.category.filter((item: any) => item.parentId !== null);
            setCategory(filteredData);
            setPageCount(CategoryData.totalPage);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleDelete = async (element: any) => {
        const destroy = await httpCategory.delete(element.id);
        const filter = category.filter((e: any) => {
            return e.id !== element.id;
        });

        if (destroy) pushError('Danh mục đã bị xóa ');
        setCategory(filter);
        handleClickClose();
    };
    const handleSearch = async (element: any) => {
        setSearch(element.target.value);
        setPage(1);
    };
    return (
        <Grid mt={0} width={'100%'}>
            {TitleHelmet('Quản lý danh mục ')}
            <Stack direction={'row'} mb={2} alignItems={'center'} spacing={2} justifyContent={'space-between'}>
                <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'} textTransform={'uppercase'}>
                    <CategoryIcon /> Quản lý danh mục
                </Typography>
                <Link to={'/admin/createCategory'}>
                    <Button variant="contained">Thêm Danh mục</Button>
                </Link>
            </Stack>
            <OutlinedInput
                sx={{
                    maxWidth: '300px',
                    mt: 1,
                    '& > input': {
                        p: '7px',
                    },
                }}
                onChange={handleSearch}
                fullWidth
                placeholder="Tìm kiếm danh mục..."
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
                            <TableCell>Hình ảnh</TableCell>
                            <TableCell>Tên loại danh mục</TableCell>
                            <TableCell align="right">Danh mục cha</TableCell>
                            <TableCell align="right">Ngày tạo</TableCell>
                            <TableCell align="right">Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category.map((e: Category, i) => (
                            <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {e.id}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <img src={e.image} alt="" width={'50px'} height={'70px'} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {e.name}
                                </TableCell>
                                <TableCell align="right">
                                    {e.parentName == null ? 'Danh mục gốc' : e.parentName}
                                </TableCell>
                                <TableCell align="right">{formatDates(e.createdAt)}</TableCell>
                                <TableCell align="right">
                                    {e.status == null ? (
                                        <Chip label="Hoạt động" color="success" />
                                    ) : (
                                        <Chip color="error" label="Ngưng hoạt động" />
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <Stack
                                        direction={'row'}
                                        color={color.text_color}
                                        spacing={2}
                                        justifyContent={'end'}
                                    >
                                        <Link to={`${e.id}`}>
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
                                                            Bạn chắc chắn muốn xóa danh mục này?
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
            <Stack mt={2} justifyContent={'center'}>
                <Pagination count={pageCount} page={page} onChange={handleChange} />
            </Stack>
        </Grid>
    );
}
