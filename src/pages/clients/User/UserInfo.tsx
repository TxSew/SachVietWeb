import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { color } from '../../../Theme/color';
import { httpAccount } from '../../../submodules/controllers/http/axiosController';
import { ChangePassword } from '../../../submodules/models/UserModel/User';
import UserIn4 from './components/UserInfo/UserIn4';
import './index.scss';
import NavUser from './layout/NavUser';
import './style.scss';
function UserInfo() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordCurrent, setShowPasswordCurrent] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handelClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handelClickShowPasswordCurrent = () => setShowPasswordCurrent((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validatePasswordConfirmation = (value: any) => {
        const password = control._getWatch('newPassword');
        return value === password || 'Mật khẩu nhập lại không khớp!';
    };
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ChangePassword>({ mode: 'all' });

    const handelChangePassword = (data: any) => {
        httpAccount.changePassword(data).then((res) => {
            res?.message == 'Password changed successfully' &&
                toast.success('Mật khẩu của bạn thay đổi thành công', {
                    position: 'top-right',
                });
            res == undefined &&
                toast.error('Mật khẩu thay đổi không thành công!', {
                    position: 'top-right',
                });
        });
    };

    const handelChangeInfo = (data: any) => {
        console.log(data);
    };

    const formInfo: any = useForm();
    return (
        <NavUser>
            <div className="main ps-0 pt-3 pb-3 pe-0">
                <UserIn4 />
                <div
                    style={{
                        background: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                >
                    <form className="" onSubmit={handleSubmit(handelChangePassword)}>
                        <Typography
                            fontSize={20}
                            p={1}
                            pb={2}
                            display={'flex'}
                            fontWeight={'bold'}
                            textTransform={'uppercase'}
                        >
                            Thay đổi mật khẩu
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
                                name="password"
                                rules={{
                                    required: 'Mật khẩu không được để trống!',
                                }}
                                render={({ field }) => (
                                    <FormControl
                                        sx={{
                                            display: 'block',
                                            py: 1,
                                        }}
                                    >
                                        <Grid2 container>
                                            <Grid2 xs={12} md={4}>
                                                <Typography>Nhập mật khẩu hiện tại</Typography>
                                            </Grid2>
                                            <Grid2 xs={12} md={8}>
                                                <OutlinedInput
                                                    fullWidth
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    type={showPasswordCurrent ? 'text' : 'password'}
                                                    placeholder="Nhập mât khẩu hiện tại"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handelClickShowPasswordCurrent}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showPasswordCurrent ? (
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
                                                <Typography color={color.error}>
                                                    {errors.password && errors.password.message}
                                                </Typography>
                                            </Grid2>
                                        </Grid2>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                control={control}
                                name="newPassword"
                                rules={{
                                    required: 'Mật khẩu không được để  trống!',
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
                                    <FormControl
                                        sx={{
                                            display: 'block',
                                            py: 1,
                                        }}
                                    >
                                        <Grid2 container>
                                            <Grid2 xs={12} md={4}>
                                                <Typography>Nhập mật khẩu mới</Typography>
                                            </Grid2>
                                            <Grid2 xs={12} md={8}>
                                                <OutlinedInput
                                                    fullWidth
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Mật khẩu mới"
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

                                                <Typography color={color.error}>
                                                    {errors.newPassword && errors.newPassword.message}
                                                </Typography>
                                            </Grid2>
                                        </Grid2>
                                    </FormControl>
                                )}
                            />

                            <Controller
                                control={control}
                                name="repeatNewPassword"
                                rules={{
                                    required: 'Mật khẩu không được để  trống!',
                                    validate: validatePasswordConfirmation,
                                }}
                                render={({ field }) => (
                                    <FormControl
                                        sx={{
                                            display: 'block',
                                            py: 1,
                                        }}
                                    >
                                        <Grid2 container>
                                            <Grid2 xs={12} md={4}>
                                                <Typography>Nhập lại mật khẩu mới</Typography>
                                            </Grid2>
                                            <Grid2 xs={12} md={8}>
                                                <OutlinedInput
                                                    fullWidth
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="Nhập lại mật khẩu mới"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handelClickShowConfirmPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showConfirmPassword ? (
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
                                                <Typography color={color.error}>
                                                    {errors.repeatNewPassword && errors.repeatNewPassword.message}
                                                </Typography>
                                            </Grid2>
                                        </Grid2>
                                    </FormControl>
                                )}
                            />

                            <Grid2 container py={3}>
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
                                            Lưu
                                        </button>
                                    </div>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </form>
                </div>
            </div>
        </NavUser>
    );
}

export default UserInfo;
