import { Controller, useForm } from 'react-hook-form';
import './index.scss';
import NavUser from './layout/NavUser';
import './style.scss';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography,
} from '@mui/material';
import { color } from '../../../Theme/color';
import { httpProvince, httpUserAddress } from '../../../submodules/controllers/http/axiosController';
import { Province, district } from '../../../submodules/models/Province/Province';
import { useEffect, useState } from 'react';
import { Order } from '../../../submodules/models/OrderModel/Order';
function UserAdress() {
    const [province, setProvince] = useState<Province[]>([]);
    const [districts, setDistricts] = useState([]);
    const [userAddress, setUserAddress] = useState([] as any);
    const [isLength, setIsLength] = useState(false);
    useEffect(() => {
        fetchProvince();
        fetchUserAddress();
    }, []);
    const fetchUserAddress = async () => {
        httpUserAddress.getListUserAddress().then((res) => {
            if (res.length) {
                setUserAddress(res);
                setIsLength(true);
            }
        });
    };

    const fetchProvince = async () => {
        const provinceData = await httpProvince.getAll();
        if (provinceData) {
            setProvince(provinceData);
        }
    };

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<Order>({});

    const handleAddUserAddress = (data: any) => {
        httpUserAddress.createUserAddress(data).then((res) => {
            setUserAddress(res);
        });
    };

    const handleProvinceChange = (e: any) => {
        const provinceId = e.target.value;
        setValue('province', provinceId);
        const selectedProvinceData: any = province.find((province: any) => province.id === parseInt(provinceId, 10));
        setDistricts(selectedProvinceData?.district || []);
    };

    const handleDistrictChange = (e: any) => {
        const districtId = e.target.value;
        setValue('district', districtId);
    };
    return (
        <NavUser>
            {isLength ? (
                <Box bgcolor={color.white}>
                    <Box bgcolor={color.white} p={2}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Địa chỉ của bạn
                            </Typography>
                            <Button variant="OutlinedRed">
                                <Typography fontSize={'13px'} fontWeight={'bold'}>
                                    Thêm địa chỉ thanh toán
                                </Typography>
                            </Button>
                        </Stack>
                    </Box>
                    <Grid
                        container
                        sx={{
                            backgroundColor: color.white,
                        }}
                    >
                        <Grid item md={6}>
                            <Box
                                sx={{
                                    backgroundColor: color.white,
                                }}
                            >
                                <Box p={3}>
                                    <Box mb={2} mt={1}>
                                        <Typography fontWeight={'bold'}> Địa chỉ thanh toán mặc định</Typography>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Typography>{userAddress[0]?.fullName}</Typography>
                                        </Box>

                                        <Box>
                                            <Typography>{userAddress[0]?.province}</Typography>
                                        </Box>

                                        <Box>
                                            <Typography>{userAddress[0]?.district}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography>{userAddress[0]?.address}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography> Tel: {userAddress[0]?.phone}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography color={'#C92127'} fontWeight={'bold'}>
                                                Thay đổi Địa chỉ thanh toán
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box
                                sx={{
                                    backgroundColor: color.white,
                                }}
                            >
                                <Box p={3}>
                                    <Box mb={2} mt={1}>
                                        <Typography fontWeight={'bold'}> Địa chỉ khác</Typography>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Typography>{userAddress[0].fullName}</Typography>
                                        </Box>

                                        <Box>
                                            <Typography>{userAddress[0].province}</Typography>
                                        </Box>

                                        <Box>
                                            <Typography>{userAddress[0].district}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography>{userAddress[0].address}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography> Tel: {userAddress[0].phone}</Typography>
                                        </Box>
                                        <Stack direction={'row'} spacing={1}>
                                            <Typography color={'#C92127'} fontSize={'12px'} fontWeight={'bold'}>
                                                Thay đổi Địa chỉ khác
                                            </Typography>
                                            |
                                            <Typography color={'gray'} fontWeight={'bold'} fontSize={'12px'}>
                                                Xóa địa chỉ
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Box
                    sx={{
                        mt: 2,
                        pb: '20px',
                        backgroundColor: color.white,
                    }}
                >
                    <Box pt={2}>
                        <Typography
                            sx={{
                                ml: '20px',
                                fontSize: '20px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Thêm thông tin thanh toán
                        </Typography>
                    </Box>
                    <form action="" style={{}} onSubmit={handleSubmit(handleAddUserAddress)}>
                        <Grid
                            p={2}
                            container
                            justifyContent={'space-between'}
                            gap={2}
                            sx={{
                                padding: ' 20px',
                            }}
                        >
                            <Grid xs={12} md={5} mb={3} fontSize={'20px'}>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        marginTop: ' 10px',
                                    }}
                                >
                                    <Typography variant="h2" fontSize={'14px'}>
                                        Họ Tên <span style={{ color: color.error }}>*</span>
                                    </Typography>
                                    <Controller
                                        control={control}
                                        name="fullName"
                                        defaultValue=""
                                        rules={{
                                            required: 'Tên sản phẩm không được bỏ trống!',
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
                                                placeholder="Vui lòng nhập Ten của bạn!"
                                            />
                                        )}
                                    />
                                    <Typography variant="caption" color={color.error}>
                                        {errors.fullName && errors.fullName.message}
                                    </Typography>
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        mt: '10px',
                                    }}
                                >
                                    <Typography variant="h2" fontSize={'14px'}>
                                        Email <span style={{ color: color.error }}>*</span>
                                    </Typography>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: 'Vui lòng nhập địa chỉ email của bạn!',
                                        }}
                                        name="email"
                                        render={({ field }) => (
                                            <OutlinedInput
                                                type="text"
                                                {...field}
                                                sx={{
                                                    mt: 1,
                                                    '& > input': {
                                                        p: '7px',
                                                    },
                                                }}
                                                fullWidth
                                                placeholder="Vui lòng nhập địa chỉ email"
                                            />
                                        )}
                                    />
                                    <Typography variant="caption" color={color.error}>
                                        {errors.email && errors.email.message}
                                    </Typography>
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        mt: '10px',
                                    }}
                                >
                                    <Typography variant="h2" fontSize={'14px'}>
                                        Số điện thoại <span style={{ color: color.error }}>*</span>
                                    </Typography>
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
                                            <OutlinedInput
                                                type="number"
                                                {...field}
                                                sx={{
                                                    mt: 1,
                                                    '& > input': {
                                                        p: '7px',
                                                    },
                                                }}
                                                fullWidth
                                                placeholder="Vui lòng nhập số  điện thoại"
                                            />
                                        )}
                                    />
                                    <Typography variant="caption" color={color.error}>
                                        {errors.phone && errors.phone.message}
                                    </Typography>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} md={5}>
                                <FormControl fullWidth>
                                    <Typography>
                                        Tỉnh/Thành Phố <span style={{ color: color.error }}>*</span>
                                    </Typography>
                                    <Controller
                                        control={control}
                                        defaultValue=""
                                        name="province"
                                        rules={{
                                            required: 'Vui lòng nhập Tỉnh/ Thành phố',
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                fullWidth
                                                {...field}
                                                onChange={handleProvinceChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {province.map((e: Province) => {
                                                    return (
                                                        <MenuItem value={e.id}>
                                                            <em>{e.name}</em>
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        )}
                                    />

                                    <FormHelperText sx={{ color: color.error }}>
                                        {errors.province && errors.province.message}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl fullWidth>
                                    <Typography>
                                        Quận/Huyện
                                        <span style={{ color: color.error }}>*</span>
                                    </Typography>

                                    <Controller
                                        control={control}
                                        defaultValue=""
                                        name="district"
                                        rules={{
                                            required: 'Vui lòng nhập Quận /Huyện',
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                onChange={handleDistrictChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {districts.map((e: any) => (
                                                    <MenuItem key={e.id} value={e.id}>
                                                        {e.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />

                                    <FormHelperText sx={{ color: color.error }}>
                                        {errors.district && errors.district.message}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl
                                    sx={{
                                        mt: '10px',
                                    }}
                                    fullWidth
                                >
                                    <Typography variant="h2" fontSize={'14px'}>
                                        Địa chỉ cụ thể <span style={{ color: color.error }}>*</span>
                                    </Typography>
                                    <Controller
                                        control={control}
                                        name="address"
                                        rules={{
                                            required: 'Vui lòng nhập địa chỉ cụ thể của bạn!',
                                        }}
                                        render={({ field }) => (
                                            <OutlinedInput
                                                type="address"
                                                {...field}
                                                sx={{
                                                    mt: 1,
                                                    '& > input': {
                                                        p: '7px',
                                                    },
                                                }}
                                                fullWidth
                                                placeholder="Vui lòng nhập  địa chỉ cụ thể"
                                            />
                                        )}
                                    />
                                    <Typography color={color.error}>
                                        {errors.address && errors.address.message}
                                    </Typography>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    mr: '20px',
                                }}
                                type="submit"
                            >
                                Cập nhật
                            </Button>
                        </Box>
                    </form>
                </Box>
            )}
        </NavUser>
    );
}

export default UserAdress;
