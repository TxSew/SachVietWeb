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
import { httpProducer } from '../../../submodules/controllers/http/axiosController';
import { Producer } from '../../../submodules/models/producerModel/producer';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import { TitleHelmet } from '../../../constants/Helmet';
import useMedia from '../../../hooks/useMedia/useMedia';

export default function ProducerAdmin() {
    const { isMediumMD } = useMedia();

    const [search, setSearch] = React.useState<string>('');
    const [page, setPage] = React.useState<number>(1);
    const [producer, setProducer] = React.useState<any>({});
    const [open, setOpen] = React.useState({
        isChecked: false,
        id: '',
    });
    const debounce = useDebounce(search, 300);
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
            page: page,
            keyword: debounce,
        };
        fetchData(props);
    }, [page, debounce]);

    const fetchData = async (props: any) => {
        const producerData: any = await httpProducer.getAll(props);
        setProducer(producerData);
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    async function handleRemove(id: number) {
        await httpProducer.delete(Number(id));
        const filter = producer?.producers?.filter((e: any) => e.id !== id);
        const { producers, ...rest } = producer as any;
        const data = {
            ...rest,
            producers: filter,
        };

        setProducer(data);
        pushError('Nhà cung cấp đã bị xóa');
        handleClickClose();
    }
    return (
        <>
            {TitleHelmet('Quản Nhà cung cấp')}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                mb={2}
                alignItems={'center'}
                spacing={2}
                justifyContent={'space-between'}
            >
                <Typography variant="h2" fontSize={'26px'} mb={3} fontWeight={'bold'} textTransform={'uppercase'}>
                    Quản lý Nhà cung cấp
                </Typography>

                <Link to={'/admin/createProducer'}>
                    <Button variant="contained">Thêm Nhà cung cấp</Button>
                </Link>
            </Stack>
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
                            <TableCell>Tên nhà cung cấp</TableCell>
                            <TableCell align="left">Mã CODE</TableCell>
                            <TableCell align="left">Từ khóa</TableCell>
                            <TableCell align="right">Thao tác </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {producer?.producers?.map((e: Producer) => (
                            <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {e.id}
                                </TableCell>

                                <TableCell>{e.name}</TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    {e.code}
                                </TableCell>
                                <TableCell align="left">{e.keyword}</TableCell>
                              
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
                                                // onClick={() => handleRemove(Number(e.id))}
                                                onClick={() => {
                                                    handleClickOpen(e);
                                                }}
                                                sx={{
                                                    color: 'red',
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
                                                            Bạn chắc chắn muốn xóa Nhà cung cấp này?
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
                                                        onClick={() => handleRemove(Number(open.id))}
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
                <Pagination count={producer?.totalPage} page={page} onChange={handleChange} />
            </Box>
        </>
    );
}
