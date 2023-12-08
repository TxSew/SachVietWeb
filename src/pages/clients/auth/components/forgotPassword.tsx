import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { color } from '../../../../Theme/color';
import { ForgotPassword } from '../../../../submodules/models/UserModel/User';
import HttpAccountController from '../../../../submodules/controllers/http/httpAccountController';
import { BaseAPi } from '../../../../configs/BaseApi';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { TitleHelmet } from '../../../../constants/Helmet';
import { pushWarning } from '../../../../components/Toast/Toast';
const http = new HttpAccountController(BaseAPi);
const ForgotPasswordPage = () => {
    const redirect = useNavigate();
    const [token, setToken] = useState<any>('');
    useEffect(() => {
        const forgot_token = localStorage.getItem('forgot_password_token');
        if (forgot_token) {
            setToken(forgot_token);
        }
    }, []);

    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const validatePasswordConfirmation = (value: any) => {
        const password = control._getWatch('password');
        return value === password || 'Mật khẩu nhập lại không khớp!';
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleClickSendOtp = () => {
        if (email.length > 1) {
            setShowPassword(true);
            http.sendOtp(email)
                .then((res) => {
                    if (res.forgot_password_token) {
                        setShowPassword(false);
                        toast.success('OTP gửi qua email thành công,vui lòng kiểm tra email ', {
                            position: 'top-right',
                        });

                        localStorage.setItem('forgot_password_token', res.forgot_password_token);
                    }
                })
                .catch((err) => {
                    setShowPassword(true);
                    if (err.response.data.message == 'Not Found') {
                        setShowPassword(false);
                        toast.error('Tài khoản không tồn tại trên hệ thống, vui lòng nhập lại thông tin!', {
                            position: 'top-right',
                        });
                    }
                });
        } else {
            pushWarning('Vui lòng nhập địa chỉ email!');
        }
    };

    const handleForgotPassword = (event: any) => {
        const data = {
            ...event,
            token: token || '',
        };
        http.verifyOtpAndResetPassword(data)
            .then((res) => {
                if (res.message === 'success') {
                    toast.success('Cập nhật mật khẩu thành công', {
                        position: 'top-right',
                    });
                    redirect('/auth');
                }
                if (res.message === 'jwt expired') {
                    toast.error('Mã OTP đã hết hạn, Vui lòng gửi lại mã OTP!', {
                        position: 'top-right',
                    });
                }
                if (res.message === 'Invalid OTP Code') {
                    toast.error('Mã OTP không đúng , vui lòng nhập lại!', {
                        position: 'top-right',
                    });
                }
            })
            .catch((err) => {
                if (err.message === 'jwt must be provided') {
                    toast.error('Mã OTP đã hết hạn, Vui lòng gửi lại mã OTP!', {
                        position: 'top-right',
                    });
                }
            });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<ForgotPassword>({ mode: 'all' });

    const handleForgot = (event: any) => {
        console.log(event);
    };

    const email = watch('email', '');
    return (
        <Grid bgcolor={'#eee'}>
            {TitleHelmet('Quên mật khẩu')}
            <Container
                maxWidth="xl"
                sx={{
                    pt: 1,
                    pb: 2,
                }}
            >
                <Box bgcolor={'#fff'} pt={3} pb={3}>
                    <Box maxWidth={'450px'} mx={'auto'}>
                        <Box
                            sx={{
                                width: '100%',
                            }}
                        >
                            <Box sx={{}}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <Tab
                                        sx={{
                                            margin: '0 auto',
                                        }}
                                        label="Quên mật khẩu"
                                    />
                                </Tabs>
                            </Box>
                        </Box>
                        <Grid
                            sx={{
                                display: 'flex',
                                width: '100%',
                                padding: '20px',
                            }}
                        >
                            <form autoComplete="off" onSubmit={handleSubmit(handleForgotPassword)}>
                                <FormControl
                                    sx={{
                                        mt: '10px',
                                    }}
                                    fullWidth
                                >
                                    <label>Email</label>
                                    <Controller
                                        control={control}
                                        name="email"
                                        defaultValue="" // Set an initial value here
                                        rules={{
                                            required: 'Vui lòng nhập email của bạn!',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'Tài khoản email không hợp lệ!',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <OutlinedInput
                                                {...field}
                                                key={2}
                                                fullWidth
                                                placeholder="Vui lòng nhập Email của bạn!"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickSendOtp}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? (
                                                                <CircularProgress size={20} />
                                                            ) : (
                                                                <Typography>Gửi</Typography>
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                    />
                                    <Typography variant="caption" color={color.error}>
                                        {errors.email && errors.email.message}
                                    </Typography>
                                </FormControl>

                                <FormControl
                                    sx={{
                                        mt: '20px',
                                    }}
                                    fullWidth
                                >
                                    <label>Mã OTP</label>
                                    <Controller
                                        control={control}
                                        name="otp"
                                        defaultValue="" // Set an initial value here
                                        rules={{
                                            required: 'OTP không được bỏ trống!',
                                        }}
                                        render={({ field }) => (
                                            <OutlinedInput
                                                {...field}
                                                fullWidth
                                                placeholder="Vui lòng nhập OTP của bạn!"
                                            />
                                        )}
                                    />
                                </FormControl>
                                <Typography variant="caption" color={color.error}>
                                    {errors.otp && errors.otp.message}
                                </Typography>

                                <FormControl
                                    sx={{
                                        mt: '16px',
                                    }}
                                    fullWidth
                                >
                                    <Typography>Mật khẩu</Typography>
                                    <Controller
                                        control={control}
                                        defaultValue=""
                                        name="password"
                                        rules={{
                                            required: 'Mật khẩu không được để trống!',
                                            minLength: {
                                                value: 5,
                                                message: 'Mật khẩu yêu cầu 5 kí tự trở lên!',
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: 'Mật khẩu yêu cầu 30 kí tự trở xuống!',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <OutlinedInput
                                                key={1}
                                                {...field}
                                                fullWidth
                                                placeholder="Vui lòng nhập mật khẩu"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Visibility
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                    }}
                                                                />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                    />
                                    <Typography variant="caption" color={color.error}>
                                        {errors.password && errors.password.message}
                                    </Typography>
                                </FormControl>
                                <FormControl
                                    sx={{
                                        mt: '16px',
                                    }}
                                    fullWidth
                                >
                                    <Typography>Nhập lại mật khẩu</Typography>
                                    <Controller
                                        control={control}
                                        defaultValue="" // Set an initial value here
                                        name="confirmPassword"
                                        rules={{
                                            required: 'Mật khẩu không được để  trống!',
                                            validate: validatePasswordConfirmation,
                                        }}
                                        render={({ field }) => (
                                            <OutlinedInput
                                                key={1}
                                                {...field}
                                                fullWidth
                                                placeholder="Vui lòng nhập mật khẩu"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Visibility
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                    }}
                                                                />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                    />
                                    <Typography variant="caption" color={color.error}>
                                        {errors.confirmPassword && errors.confirmPassword.message}
                                    </Typography>
                                </FormControl>
                                <Box
                                    mt={4}
                                    sx={{
                                        clear: 'both',
                                        display: 'flex',
                                        direction: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            background: '#008C89',
                                            color: '#fff',
                                            padding: '8px 0',
                                            '&:hover': {
                                                padding: '8px 0',
                                                background: '#008C89',
                                                opacity: 0.9,
                                            },
                                        }}
                                    >
                                        Gửi
                                    </Button>
                                </Box>
                            </form>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Grid>
    );
};

export default ForgotPasswordPage;
