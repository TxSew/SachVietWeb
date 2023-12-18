import { Box, Button, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushSuccess } from '../../../components/Toast/Toast';
import { TitleHelmet } from '../../../constants/Helmet';
import { httpProducer } from '../../../submodules/controllers/http/axiosController';
import { Producer } from '../../../submodules/models/producerModel/producer';

const UpdateProducer = () => {
    const { id } = useParams();
    const [Producer, setProducer] = useState<Producer>({});
    useEffect(() => {
        fetchProducerDetail();
    }, []);

    const fetchProducerDetail = async () => {
        const detailProducer = await httpProducer.getOne(Number(id));
        setProducer(detailProducer);
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Producer>({
        defaultValues: {
            status: '1',
        },
    });

    useEffect(() => {
        setValue('name', Producer.name);
        setValue('code', Producer.code);
        setValue('keyword', Producer.keyword);
        setValue('status', Producer.status);
    }, [Producer.name, Producer.code, Producer.keyword, Producer.status, setValue]);

    const handleUpdate = async (data: Producer) => {
        const producerUpdate = await httpProducer.put(Number(id), data);
        if (producerUpdate) {
            pushSuccess('Cập nhật nhà cung cấp thành công');
        }
    };
    return (
        <Box>
            {TitleHelmet('Cập nhật Nhà cung cấp')}
            <form action="" onSubmit={handleSubmit(handleUpdate)}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'24px'} fontWeight={'bold'} textTransform={'uppercase'}>
                        Cập nhật nhà cung cấp {Producer.id}
                    </Typography>
                    <Button type="submit" variant="contained">
                        Lưu
                    </Button>
                </Stack>
                <Grid bgcolor={color.white} p={2} container mt={3} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'} textTransform={'uppercase'}>
                        Tên nhà cung cấp
                    </Typography>
                    <Controller
                        control={control}
                        name="name"
                        defaultValue="" // Set an initial value here
                        rules={{
                            required: 'Tên nhà cung cấp không được bỏ trống!',
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
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                                fullWidth
                                placeholder={Producer?.name}
                            />
                        )}
                    />
                    <Typography variant="caption" color={color.error}>
                        {errors.name && errors.name?.message}
                    </Typography>

                    <Typography variant="h2" mt={2} fontSize={'18px'} fontWeight={'bold'}>
                        Mã Code
                    </Typography>
                    <Controller
                        control={control}
                        name="code"
                        rules={{
                            required: 'Vui lòng nhập mã code',
                        }}
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
                                placeholder={Producer?.code}
                            />
                        )}
                    />
                    <Typography variant="caption" color={color.error}>
                        {errors.code && errors.code.message}
                    </Typography>
                    <Typography variant="h2" mt={2} fontSize={'18px'} fontWeight={'bold'}>
                        Từ khóa
                    </Typography>
                    <Controller
                        control={control}
                        name="keyword"
                        rules={{
                            required: 'Vui lòng nhập từ khóa',
                        }}
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
                                placeholder={Producer?.keyword}
                            />
                        )}
                    />
                    <Typography variant="caption" color={color.error}>
                        {errors.keyword && errors.keyword.message}
                    </Typography>
                </Grid>
            </form>
        </Box>
    );
};

export default UpdateProducer;
