import VisibilityIcon from '@mui/icons-material/Visibility';

import { Box, Chip, OutlinedInput, Pagination, Stack, Typography } from '@mui/material';
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
import { httpAccount } from '../../../submodules/controllers/http/axiosController';
import { TUser, User } from '../../../submodules/models/UserModel/User';
import useDebounce from '../../../hooks/useDebounce/useDebounce';

export default function AdminCustomer() {
    const [customer, setCustomer] = React.useState<any>({});
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState<string>('');
    const debounce = useDebounce(search, 300);
    React.useEffect(() => {
        const props = {
            page: page,
            keyword: debounce,
        };
        fetchData(props);
    }, [page, debounce]);

    const fetchData = async (props: any) => {
        const user: TUser = await httpAccount.getAll(props);
        setCustomer(user);
    };
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    async function handleRemove(id: number) {}
    return (
        <>
            <Stack direction={'row'} mb={2} alignItems={'center'} spacing={2} justifyContent={'space-between'}>
                <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'} textTransform={'uppercase'}>
                    Quản lý khách hàng
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
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    placeholder="Tìm kiếm tên khách hàng"
                />
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
                            <TableCell>Họ tên</TableCell>
                            <TableCell align="right"> Email </TableCell>
                            <TableCell align="right">Số điện thoại</TableCell>
                            <TableCell align="right">Trạng thái</TableCell>
                            <TableCell align="right">Thao tác </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customer?.Users?.map((e: User) => (
                            <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {e.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {e.fullName}
                                </TableCell>
                                <TableCell align="right">{e.email}</TableCell>
                                <TableCell align="right">{e.phone}</TableCell>
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
                                        <Link to={`/admin/customer/${e.id}`}>
                                            <VisibilityIcon
                                                sx={{
                                                    color: 'green',
                                                }}
                                            />
                                        </Link>
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
                <Pagination count={customer.totalPage} page={page} onChange={handleChange} />
            </Box>
        </>
    );
}
