import CategoryIcon from '@mui/icons-material/Category';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Chip, Grid, OutlinedInput, Pagination, Stack, Typography } from '@mui/material';
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
import useToast from '../../../hooks/useToast/useToast';
import { httpCategory } from '../../../submodules/controllers/http/axiosController';
import { Category } from '../../../submodules/models/ProductModel/Category';

export default function CategoryAdmin() {
    const [category, setCategory] = React.useState([]);
    const [pageCount, setPageCount] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(1);
    React.useEffect(() => {
        fetchData(page);
    }, [page]);

    const fetchData = async (page: number) => {
        try {
            const CategoryData: any = await httpCategory.getAll(page);
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
    };

    return (
        <Grid>
            <Grid mt={0} width={'100%'}>
                <Stack direction={'row'} mb={2} alignItems={'center'} spacing={2} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'} textTransform={"uppercase"}>
                        <CategoryIcon /> Quản lý dang mục
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
                </Stack>
                <Link
                    to={'/admin/createCategory'}
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Button variant="contained">Thêm Danh mục</Button>
                </Link>
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
                <Stack mt={2} justifyContent={'center'}>
                    <Pagination count={pageCount} page={page} onChange={handleChange} />
                </Stack>
            </Grid>
        </Grid>
    );
}
