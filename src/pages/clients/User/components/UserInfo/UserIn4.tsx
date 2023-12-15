import { Box, FormControl, FormControlLabel, OutlinedInput, Radio, RadioGroup, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { httpAccount } from '../../../../../submodules/controllers/http/axiosController';
import { color } from '../../../../../Theme/color';
import { User } from '../../../../../submodules/models/UserModel/User';
import { pushSuccess } from '../../../../../components/Toast/Toast';

function UserIn4() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<User>({});

    const handleUpdateInfo = (data: any) => {
        data.sex = Number(data.sex);
        httpAccount
            .updateUser(data)
            .then((res) => {
                pushSuccess('Cập nhật thông tin cá nhân thành công');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        const user = httpAccount.getMe().then((res) => {
            reset({
                fullName: res.fullName,
                email: res.email,
                phone: res.phone,
                birthday: res.birthday,
                sex: res.sex,
            });
        });
    }, []);

    return (
        <div
            style={{
                background: 'white',
                padding: '16px',
                borderRadius: '5px',
                marginBottom: '24px',
            }}
        >
            <form className="" onSubmit={handleSubmit(handleUpdateInfo)}>
                <Typography fontSize={20} p={1} pb={3} display={'flex'} fontWeight={'bold'} textTransform={'uppercase'}>
                    Thông tin tài khoản
                </Typography>
                <Box
                    sx={{
                        px: '10px',
                        maxWidth: '800px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '5px',
                    }}
                >
                    <Controller
                        control={control}
                        name="fullName"
                        rules={{
                            required: 'Vui lòng họ và tên của bạn',
                        }}
                        render={({ field }) => (
                            <FormControl
                                sx={{
                                    display: 'block',
                                    py: 1,
                                }}
                            >
                                <Grid2 container display={'flex'} alignItems={'center'}>
                                    <Grid2 xs={12} md={4}>
                                        <Typography>Họ Tên</Typography>
                                    </Grid2>
                                    <Grid2 xs={12} md={8}>
                                        <OutlinedInput {...field} fullWidth type="text" placeholder="Nhập họ tên" />
                                    </Grid2>
                                    <Typography variant="caption" color={color.error}>
                                        {errors.fullName && errors.fullName.message}
                                    </Typography>
                                </Grid2>
                            </FormControl>
                        )}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        rules={{
                            required: 'Vui lòng nhập số điện thoại của bạn!',
                            pattern: {
                                value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                                message: 'Số điện thoại không hợp lệ!',
                            },
                        }}
                        render={({ field }) => (
                            <FormControl
                                sx={{
                                    display: 'block',
                                    py: 1,
                                }}
                            >
                                <Grid2 container display={'flex'} alignItems={'center'}>
                                    <Grid2 xs={12} md={4}>
                                        <Typography>Số điện thoại</Typography>
                                    </Grid2>
                                    <Grid2 xs={12} md={8}>
                                        <OutlinedInput
                                            {...field}
                                            fullWidth
                                            type="text"
                                            placeholder="Nhập số điện thoại"
                                        />
                                        <Typography variant="caption" color={color.error}>
                                            {errors.phone && errors.phone.message}
                                        </Typography>
                                    </Grid2>
                                </Grid2>
                            </FormControl>
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        disabled
                        render={({ field }) => (
                            <FormControl
                                sx={{
                                    display: 'block',
                                    py: 1,
                                }}
                            >
                                <Grid2 container display={'flex'} alignItems={'center'}>
                                    <Grid2 xs={12} md={4}>
                                        <Typography>Email</Typography>
                                    </Grid2>
                                    <Grid2 xs={12} md={8}>
                                        <OutlinedInput
                                            disabled
                                            {...field}
                                            fullWidth
                                            type="text"
                                            placeholder="Nhập email"
                                        />
                                    </Grid2>
                                </Grid2>
                            </FormControl>
                        )}
                    />
                    <Controller
                        control={control}
                        name="sex"
                        rules={{
                            required: 'Vui lòng chọn giới tính',
                        }}
                        render={({ field }) => (
                            <FormControl
                                sx={{
                                    display: 'block',
                                    py: 1,
                                }}
                            >
                                <Grid2 container display={'flex'} alignItems={'center'}>
                                    <Grid2 xs={12} md={4}>
                                        <Typography>Giới tính</Typography>
                                    </Grid2>
                                    <Grid2 xs={12} md={8}>
                                        <RadioGroup
                                            row
                                            {...field}
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={2}
                                                sx={{ marginRight: '24px' }}
                                                control={<Radio />}
                                                label="Nam"
                                            />
                                            <FormControlLabel
                                                value={1}
                                                sx={{ marginRight: '24px' }}
                                                control={<Radio />}
                                                label="Nữ"
                                            />
                                            <FormControlLabel
                                                value={3}
                                                sx={{ marginRight: '24px' }}
                                                control={<Radio />}
                                                label="Khác"
                                            />
                                        </RadioGroup>
                                        <Typography variant="caption" color={color.error}>
                                            {errors.sex && errors.sex.message}
                                        </Typography>
                                    </Grid2>
                                </Grid2>
                            </FormControl>
                        )}
                    />
                    <Controller
                        control={control}
                        name="birthday"
                        render={({ field }) => (
                            <FormControl
                                sx={{
                                    display: 'block',
                                    py: 1,
                                }}
                            >
                                <Grid2 container display={'flex'} alignItems={'center'}>
                                    <Grid2 xs={12} md={4}>
                                        <Typography>Ngày sinh</Typography>
                                    </Grid2>
                                    <Grid2 xs={12} md={8}>
                                        <LocalizationProvider {...field} dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{
                                                    width: '100%',
                                                }}
                                            />
                                            <Typography variant="caption" color={color.error}>
                                                {errors.birthday && errors.birthday.message}
                                            </Typography>
                                        </LocalizationProvider>
                                    </Grid2>
                                </Grid2>
                            </FormControl>
                        )}
                    />
                    <Grid2 container display={'flex'} alignItems={'center'} py={3}>
                        <Grid2 xs={12} md={4}></Grid2>
                        <Grid2 xs={12} md={8}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <button
                                    className="save pe-5 ps-5 pb-2 pt-2"
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    type="submit"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </Grid2>
                    </Grid2>
                </Box>
            </form>
        </div>
    );
}

export default UserIn4;
