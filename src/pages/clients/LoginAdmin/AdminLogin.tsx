import { signInWithPopup } from '@firebase/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HttpAccountController from '../../../submodules/controllers/http/httpAccountController';
import { BaseAPi } from '../../../configs/BaseApi';
import { User } from '../../../submodules/models/UserModel/User';
import { pushError, pushWarning } from '../../../components/Toast/Toast';
import { ResponseStatus } from '../../../helpers/ResponsiveStatus';
import { color } from '../../../Theme/color';
import { image } from '../../../assets';
const checkAdmin = () => {
    const admin = JSON.parse(localStorage.getItem('role')!);
    if (admin) {
        window.location.assign('/admin/statistical');
    }
};
const LoginAdmin = () => {
    checkAdmin();
    function handleSuccess(response: any) {
        console.log(response.status);
    }

    const [searchParams, setSearchParams] = useSearchParams();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const value: any = searchParams.get('a');
    const http = new HttpAccountController(BaseAPi);
    const redirect = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<User>({ mode: 'all' });

    const handleLogin = async (data: User) => {
        try {
            const login = await http.login(data);
            if (login) {
                toast.success('Đăng nhập tài khoản thành công', {
                    position: 'top-right',
                });
                const { account, token, role } = login;
                if (role) {
                    localStorage.setItem('role', JSON.stringify(role));
                }
            }

            if (value == 'checkout') {
                window.location.assign('/checkout');
            } else {
                window.location.assign('/admin/statistical');
            }
        } catch (err: any) {
            if (err.response.data.message === ResponseStatus.auth.notFound) {
                pushError('Tài khoản không có quyền truy cập, xin vui lòng thử lại!');
            }
            if (err.response.data.message === 'Wrong password') {
                pushWarning('Mật khẩu  không đúng, xin vui lòng nhập lại!');
            }
        }
    };

    return (
        <Box maxWidth={'600px'} mt={5} py={3} border={'1px solid #eee'} px={3} borderRadius={2}>
            <Box>
                <img
                    src={image.logo}
                    alt=""
                    style={{
                        margin: '0 auto',
                    }}
                />
            </Box>
            <form autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
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
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập email của bạn!',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Tài khoản email không hợp lệ!',
                            },
                        }}
                        render={({ field }) => (
                            <OutlinedInput {...field} key={2} fullWidth placeholder="Vui lòng nhập Email của bạn!" />
                        )}
                    />
                    <Typography variant="caption" color={color.error}>
                        {errors.email && errors.email.message}
                    </Typography>
                </FormControl>
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

                <Box
                    mt={2}
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
                        Đăng nhập
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default LoginAdmin;
