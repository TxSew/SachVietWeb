import { Box, Button, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { color } from '../../../Theme/color';
import { pushError, pushSuccess } from '../../../components/Toast/Toast';
import { validateForm } from '../../../helpers/validateForm';
import { httpDiscount } from '../../../submodules/controllers/http/axiosController';
import { Discount } from '../../../submodules/models/DiscountModel/Discount';
import { TitleHelmet } from '../../../constants/Helmet';

const CreateDiscount = () => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Discount>({
        defaultValues: {
            status: '1',
        },
    });

    const handleAddDiscount = async (data: Discount) => {
        try {
            const discount = await httpDiscount.post(data);
            pushSuccess('Thêm mã giảm giá thành công');
            reset({});
        } catch (err) {
            pushError('Mã giảm giá đã tồn tại!, Vui lòng nhập mã CODE mới');
        }
    };
    return (
        <Box>
            {TitleHelmet('Quản lý Mã giảm giá')}
            <form action="" onSubmit={handleSubmit(handleAddDiscount)}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'24px'} fontWeight={'bold'} textTransform={'uppercase'}>
                        Thêm mã giảm giá
                    </Typography>
                    <Button type="submit" variant="contained">
                        Lưu
                    </Button>
                </Stack>
                <Grid bgcolor={color.white} p={2} container mt={3} justifyContent={'space-between'}>
                    <Grid xs={12} md={7.8} mb={3} fontSize={'20px'}>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                            Mã giảm giá <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            name="code"
                            defaultValue=""
                            rules={{
                                required: 'Vui lòng nhập mã giảm giá',
                                validate: validateForm,
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập mã giảm giá"
                                />
                            )}
                        />
                        <Typography variant="caption" color={color.error}>
                            {errors.code && errors.code.message}
                        </Typography>
                        {/*desc  */}
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'} mt={2}>
                            Số tiền giảm giá <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            name="discount"
                            defaultValue=""
                            rules={{
                                required: 'Vui lòng nhập số tiền giảm giá',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập số tiền giảm giá"
                                />
                            )}
                        />
                        <Typography variant="caption" color={color.error}>
                            {errors.discount && errors.discount.message}
                        </Typography>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'} mt={2}>
                            Số tiền giới hạn được áp dụng{' '}
                            <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            name="payment_limit"
                            rules={{
                                required: 'Vui lòng nhập số tiền giới hạn',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập số tiền giới hạn"
                                />
                            )}
                        />
                        <Typography variant="caption" color={color.error}>
                            {errors.payment_limit && errors.payment_limit.message}
                        </Typography>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'} mt={2}>
                            Số lần tối thiểu được áp dụng{' '}
                            <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            name="limit_number"
                            rules={{
                                required: 'Vui lòng nhập số lần tối thiểu',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập số lần tối thiểu"
                                />
                            )}
                        />
                        <Typography variant="caption" color={color.error}>
                            {errors.limit_number && errors.limit_number.message}
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={3.8}>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                            Ngày hết hạn nhập
                            <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            name="expiration_date"
                            rules={{
                                required: 'Vui lòng nhập ngày giới hạn nhập',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    type="date"
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Giá không được để trống!"
                                />
                            )}
                        />
                        <Typography variant="caption" color={color.error}>
                            {errors.expiration_date && errors.expiration_date.message}
                        </Typography>

                        <Typography variant="h2" mt={2} fontSize={'18px'} fontWeight={'bold'}>
                            Mô tả ngắn
                        </Typography>
                        <Controller
                            control={control}
                            name="desc"
                            render={({ field }) => (
                                <OutlinedInput
                                    type="text"
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập mô tả ngắn"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateDiscount;
