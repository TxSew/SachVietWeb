import { Link } from 'react-router-dom';
import './index.scss';
import NavUser from './layout/NavUser';
import './style.scss';
import { Controller, useForm } from 'react-hook-form';
import { Box, FormControl, OutlinedInput, Stack, Typography } from '@mui/material';
import { color } from '../../../Theme/color';
import { ChangePassword } from '../../../submodules/models/UserModel/User';
import { httpAccount } from '../../../submodules/controllers/http/axiosController';
import { toast } from 'react-toastify';
import { Label } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
function UserInfo() {
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
                <div
                    style={{
                        background: 'white',
                        padding: ' 40px 20px',
                        borderRadius: '5px',
                    }}
                >
                    <form className="" onSubmit={handleSubmit(handelChangePassword)}>
                        <h1 className="info-acc-hd p-3">Thay đổi mật khẩu</h1>
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
                                                    type="text"
                                                    placeholder="Nhập mât khẩu hiện tại"
                                                />
                                            </Grid2>
                                        </Grid2>
                                    </FormControl>
                                )}
                            />
                            <Typography color={color.error}>{errors.password && errors.password.message}</Typography>
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
                                                    type="text"
                                                    placeholder="Mật khẩu mới"
                                                />
                                            </Grid2>
                                        </Grid2>
                                    </FormControl>
                                )}
                            />
                            <Typography color={color.error}>
                                {errors.newPassword && errors.newPassword.message}
                            </Typography>

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
                                                    type="text"
                                                    placeholder="Nhập lại mật khẩu mới"
                                                />
                                            </Grid2>
                                        </Grid2>
                                    </FormControl>
                                )}
                            />
                            <Typography color={color.error}>
                                {errors.repeatNewPassword && errors.repeatNewPassword.message}
                            </Typography>

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
                        </Box>
                    </form>
                </div>
            </div>
        </NavUser>
    );
}

export default UserInfo;
