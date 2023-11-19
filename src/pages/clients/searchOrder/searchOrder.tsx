import { Box, Button, Container, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

function SearchOrder() {
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {},
    });
    const handleSearch = (data: any) => {
        console.log(data);
    };
    return (
        <Box>
            <Container maxWidth="xs">
                <Box padding={4}>
                    <Typography variant="body1" fontSize={'14px'} fontStyle={'italic'}>
                        Xin mời quý bạn nhập mã đơn hàng, mã vận đơn hoặc số điện thoại nhận hàng để tra cứu tình trạng
                        đơn hàng
                    </Typography>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={2}
                        justifyContent={'center'}
                        padding={'20px 0px'}
                    >
                        <Controller
                            control={control}
                            name="title"
                            defaultValue=""
                            rules={{
                                required: 'Tên sản phẩm không được bỏ trống!',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        maxWidth: '500px',
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập mã đơn hàng, mã vận đơn hoặc số điện thoại !"
                                />
                            )}
                        />
                        <Button variant="OutlinedRed" onClick={handleSubmit(handleSearch)}>
                            Tra cứu
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

export default SearchOrder;
