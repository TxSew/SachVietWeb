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
import useMedia from '../../../hooks/useMedia/useMedia';
import ModalUser from './layout/ModalUser';
function UserAdress() {
    const [province, setprovince] = useState<Province[]>([]);
    const [district, setDistrict] = useState<district[]>([]);
    const [userAddress, setUserAddress] = useState([] as any);
    const [isLength, setIsLength] = useState(false);
    useEffect(() => {
        fetchProvince();
        fetchDistrict();
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
    const fetchDistrict = async () => {
        const districtData = await httpProvince.getDistrict();
        setDistrict(districtData);
    };

    const fetchProvince = async () => {
        const provinceData = await httpProvince.getAll();
        if (provinceData) {
            setprovince(provinceData);
        }
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({});
    const handleAddUserAddress = (data: any) => {
        httpUserAddress.createUserAddress(data).then((res) => {
            setUserAddress(res);
        });
    };
    const { isMediumMD } = useMedia();
    return (
        <NavUser>
            {isLength ? (
                <Box
                    bgcolor={color.white}
                    sx={{
                        mt: '20px',
                    }}
                >
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
                                    Thêm địa chỉ mới
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
                        pb: '20px',
                        backgroundColor: color.white,
                    }}
                >
                    <Box pt={2} px={2}>
                        {isMediumMD ? <ModalUser /> : <></>}
                        <Typography
                            sx={{
                                fontSize: '20px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Thêm địa chỉ của bạn
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
                                        Họ Tên
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
                                    <Typography variant="caption" color={color.error}></Typography>
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        mt: '10px',
                                    }}
                                >
                                    <Typography variant="h2" fontSize={'14px'}>
                                        Số điện thoại
                                    </Typography>
                                    <Controller
                                        control={control}
                                        name="phone"
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
                                    <Typography variant="caption" color={color.error}></Typography>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} md={5}>
                                <FormControl fullWidth>
                                    <Typography>Tỉnh/Thành Phố</Typography>

                                    <Controller
                                        control={control}
                                        defaultValue="" // Set an initial value here
                                        name="province"
                                        rules={{
                                            required: 'Vui lòng nhập Tỉnh/ Thành phố',
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
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

                                    <FormHelperText sx={{ color: color.error }}></FormHelperText>
                                </FormControl>
                                <FormControl fullWidth>
                                    <Typography>Quận/Huyện</Typography>

                                    <Controller
                                        control={control}
                                        defaultValue="" // Set an initial value here
                                        name="district"
                                        rules={{
                                            required: 'Vui lòng nhập Quận /Huyện',
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {district.map((e) => {
                                                    return (
                                                        <MenuItem value={e.id}>
                                                            <em>{e.name}</em>
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        )}
                                    />

                                    <FormHelperText sx={{ color: color.error }}></FormHelperText>
                                </FormControl>

                                <FormControl
                                    sx={{
                                        mt: '10px',
                                    }}
                                    fullWidth
                                >
                                    <Typography variant="h2" fontSize={'14px'}>
                                        Địa chỉ
                                    </Typography>
                                    <Controller
                                        control={control}
                                        name="address"
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
