import { Button, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';

export default function PaymentError() {
    return (
        <Box py={4} bgcolor={'#eee'}>
            <Container
                maxWidth="xl"
                sx={{
                    bgcolor: '#fff',
                    padding: '50px',
                    borderRadius: '10px',
                }}
            >
                <Stack py={2}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png"
                        alt=""
                        width={'70px'}
                        height={'70px'}
                    />
                </Stack>
                <Stack>
                    <Typography fontSize={'23px'} fontWeight={'bold'} color={'#B23A33'}>
                        Thanh toán không thành công
                    </Typography>
                </Stack>
                <Stack textAlign={'center'} py={2}>
                    <Typography textAlign={'center'} maxWidth={485} fontSize={'14px'}>
                        Đã có vấn đề xảy ra với việc thanh toán của bạn, bạn vui lòng thử lại.
                    </Typography>
                </Stack>
                <Stack>
                    <Button
                        variant="contained"
                        sx={{
                            padding: '2px 16px',
                            textTransform: 'capitalize',
                            background: '#8C1100',
                            '&:hover': {
                                background: '#f39801',
                            },
                        }}
                    >
                        <Link to={'/'}>
                            <Typography color={'#fff'}>Quay lại</Typography>
                        </Link>
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
