import { Box, Button, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushSuccess } from '../../../components/Toast/Toast';
import { httpDiscount } from '../../../submodules/controllers/http/axiosController';
import { Discount } from '../../../submodules/models/DiscountModel/Discount';
import { TitleHelmet } from '../../../constants/Helmet';
const UpdateDiscount = () => {
    const [discount, setDiscount] = useState<Discount>({});
    const { id } = useParams();
    const redirect = useNavigate();
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<Discount>({
        defaultValues: {},
    });
    useEffect(() => {
        setValue('code', discount.code);
        setValue('discount', discount.discount);
        setValue('expiration_date', discount.expiration_date);
        setValue('limit_number', discount.limit_number);
        setValue('payment_limit', discount.payment_limit);
        setValue('desc', discount.desc);
    }, [discount.code, discount.desc, discount.limit_number, discount.number_used, discount.expiration_date, setValue]);
    useEffect(() => {
        httpDiscount.getOne(Number(id)).then((res) => {
            if (res) setDiscount(res);
        });
    }, []);

    const handelUpdateDiscount = async (data: Discount) => {
        await httpDiscount.put(Number(id), data);

        pushSuccess('Cập nhật mã giảm giá thành công');
        redirect('/admin/discount');
    };

    return (
        <Box>
            {TitleHelmet('Cập nhật Mã giảm giá')}
            <form action="" onSubmit={handleSubmit(handelUpdateDiscount)}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'24px'} fontWeight={'bold'} textTransform={'uppercase'}>
                        Cập nhật Mã giảm giá
                    </Typography>
                    <Button type="submit" variant="contained">
                        Lưu
                    </Button>
                </Stack>
                <Grid bgcolor={color.white} p={2} container mt={3} justifyContent={'space-between'}>
                    <Grid xs={12} md={7.8} mb={3} fontSize={'20px'}>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                            Mã giảm giá
                        </Typography>
                        <Controller
                            control={control}
                            name="code"
                            defaultValue="" // Set an initial value here
                            rules={{
                                required: 'Vui lòng nhập mã giảm giá',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
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
                            Số tiền giảm giá
                        </Typography>
                        <Controller
                            control={control}
                            name="discount"
                            defaultValue="" // Set an initial value here
                            rules={{
                                required: 'Vui lòng nhập số tiền giảm giá',
                                validate: {
                                    nonNegative: (value:any) => parseFloat(value) >= 0 || 'Vui lòng nhập số không âm',
                                },
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
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
                            Số tiền giới hạn nhập
                        </Typography>
                        <Controller
                            control={control}
                            name="payment_limit"
                            rules={{
                                required: 'Vui lòng nhập số tiền giới hạn',
                                validate: {
                                    nonNegative: (value:any) => parseFloat(value) >= 0 || 'Vui lòng nhập số không âm',
                                },
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
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
                            Số lần tối thiểu được áp dụng
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
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
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
                            Ngày giới hạn nhập
                        </Typography>
                        <Controller
                            control={control}
                            name="expiration_date"
                            rules={{
                                required: 'Vui lòng nhập ngày giới hạn nhập',
                                validate: {
                                    futureDate: (value:any) => {
                                        const selectedDate = new Date(value);
                                        const currentDate = new Date();
                                        return selectedDate >= currentDate || 'Vui lòng chọn ngày hiện tại trở đi';
                                    },
                                }
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    type="date"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
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
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
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

export default UpdateDiscount;
