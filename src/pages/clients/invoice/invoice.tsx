import {
    Box,
    Container,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { httpCart } from '../../../submodules/controllers/http/axiosController';
import { useParams } from 'react-router-dom';
import { numberFormat } from '../../../helpers/formatPrice';
import { image } from '../../../assets';
import { color } from '../../../Theme/color';

export default function Invoice() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState<any>({});

    useEffect(() => {
        httpCart.getOrderDetail(Number(id)).then((response) => {
            setInvoice(response);
        });
    }, []);
    return (
        <Container>
            <Box textAlign={'center'} width={'100%'}>
                <Box display={'flex'} justifyContent={'center'} height={'134px'} margin={'auto'} borderRadius={2}>
                    <img src={image.logo} alt="Logo Sách Việt" />
                </Box>
                <Box py={2} borderBottom={'1px dashed #000'}>
                    <Typography
                        fontSize={'32px'}
                        fontWeight={'bold'}
                        textTransform={'uppercase'}
                        bgcolor={color.sale}
                        textAlign={'center'}
                        p={1}
                        borderRadius={'8px'}
                        color={color.text_color}
                    >
                        Hóa đơn
                    </Typography>
                    <Box display={'flex'} gap={1} justifyContent={'center'} pt={2}>
                        <Typography fontSize={'12px'}>Địa chỉ:</Typography>
                        <Typography fontSize={'12px'}>242 Hà Huy Tập - Tân Lơi - TP.BMT - Đắk Lắk</Typography>
                    </Box>
                    <Box display={'flex'} gap={1} justifyContent={'center'} pt={2}>
                        <Typography fontSize={'12px'}>Hotline:</Typography>
                        <Typography fontSize={'12px'}>0352883625</Typography>
                    </Box>
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                    }}
                                >
                                    Mã đơn hàng
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                    }}
                                >
                                    Tên hàng
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                    }}
                                >
                                    Số lượng
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                    }}
                                >
                                    Đơn giá
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                    }}
                                >
                                    Tổng tiền
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoice?.orderDetail?.map((invoice: any) => {
                                return (
                                    <TableRow key="" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {invoice.productId}
                                        </TableCell>
                                        <TableCell align="center">{invoice.product.title}</TableCell>
                                        <TableCell align="center">{invoice.quantity}</TableCell>
                                        <TableCell align="center">{invoice.price}</TableCell>
                                        <TableCell align="center">
                                            {numberFormat(invoice.quantity * invoice.price)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display={'flex'} gap={1} justifyContent={'end'}>
                    <Typography fontWeight={'bold'}>Tổng tiền hàng:</Typography>
                    <Typography>{numberFormat(invoice.money)}</Typography>
                </Box>

                <Box display={'flex'} gap={1} justifyContent={'end'}>
                    <Typography fontWeight={'bold'}>Tổng tiền thanh toán:</Typography>
                    <Typography color={color.sale} fontWeight={'bold'}>
                        {numberFormat(invoice.money)}
                    </Typography>
                </Box>
                <Stack fontWeight={'bold'}>Cảm ơn quý khách đã chọn Sách Việt!</Stack>
            </Box>
        </Container>
    );
}
