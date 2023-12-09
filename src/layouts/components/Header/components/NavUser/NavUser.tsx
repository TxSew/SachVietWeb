import { ExpandLess } from '@mui/icons-material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DiscountIcon from '@mui/icons-material/Discount';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Collapse, Link, Stack, Typography } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { color } from '../../../../../Theme/color';
import { image } from '../../../../../assets';
import NavItem from '../NavItem/NavItem';
import { httpAccount, httpCategory } from '../../../../../submodules/controllers/http/axiosController';
function NavUser() {
    const [openCategory, setOpenCategory] = React.useState(false);
    const [category, setCategory] = React.useState<any>([]);
    const [user, setUser] = React.useState<any>({});
    const handleOpenCategory = () => {
        setOpenCategory(!openCategory);
    };
    useEffect(() => {
        httpCategory.getCategory({}).then((res) => {
            setOpenCategory(res);
        });
    }, []);
    useEffect(() => {
        httpAccount
            .getMe()
            .then((res) => {
                if (res) {
                    setUser(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <Box
            sx={{
                width: 260,
                background: '#f0f0f0',
                height: '100vh',
                position: 'relative',
            }}
            role="presentation"
        >
            <Box p={2} textAlign={'center'} borderBottom={'1px solid #dadada'}>
                <img width={'100px'} src={image.logo} alt="" />
            </Box>
            <Box borderBottom={'1px solid #dadada'}>
                <Stack direction={'row'} spacing={1}>
                    <Box p={2}>
                        <Avatar alt="Remy Sharp" src="https://xphone.vn/images/no_login.svg" />
                    </Box>
                    <Box>
                        <Typography fontWeight={'bold'}>{user.fullName || 'Đăng nhập'}</Typography>
                        <Typography variant="body1" color={color.text_color}>
                            {user.email || 'Để nhận nhiều ưu đãi hơn'}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <Box borderBottom={'1px solid #dadada'} p={'4px 0px'}>
                {user.id ? (
                    <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                        <NavLink to={'/user'}>
                            <Stack
                                direction={'row'}
                                spacing={1}
                                padding={'4px 7px'}
                                bgcolor={'green'}
                                color={color.white}
                                sx={{ cursor: 'pointer' }}
                            >
                                <PersonIcon />
                                <Typography>Tài khoản</Typography>
                            </Stack>
                        </NavLink>
                        <Stack
                            color={color.white}
                            direction={'row'}
                            spacing={1}
                            padding={'4px 7px'}
                            bgcolor={'darkgrey'}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                localStorage.clear();
                                window.location.assign('/');
                            }}
                        >
                            <PersonIcon />
                            <Typography>Đăng xuất</Typography>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                        <NavLink to={'/auth'}>
                            <Stack
                                direction={'row'}
                                spacing={1}
                                padding={'4px 7px'}
                                bgcolor={'green'}
                                color={color.white}
                                sx={{ cursor: 'pointer' }}
                            >
                                <PersonIcon />
                                <Typography>Đăng nhập</Typography>
                            </Stack>
                        </NavLink>
                        <NavLink to={'/auth'}>
                            <Stack
                                color={color.white}
                                direction={'row'}
                                spacing={1}
                                padding={'4px 7px'}
                                bgcolor={'darkgrey'}
                                sx={{ cursor: 'pointer' }}
                            >
                                <PersonIcon />
                                <Typography>Đăng ký</Typography>
                            </Stack>
                        </NavLink>
                    </Stack>
                )}
            </Box>
            <Box>
                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <NavItem path="/user" name="Thông tin tài khoản" icon={<NewspaperIcon fontSize="small" />} />
                </Box>
                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <NavItem path="/user/adress" name="Số địa chỉ" icon={<ContentPasteSearchIcon />} />
                </Box>
                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <NavItem path="/user/myvoucher" name="Ví voucher" icon={<DiscountIcon />} />
                </Box>
                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <NavItem path="/user/mycart" name="Đơn hàng của tôi" icon={<ShoppingBasketIcon />} />
                </Box>
                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <NavItem path="/" name=" Về trang chủ" icon={<HomeIcon />} />
                </Box>
            </Box>
            <Box position={'absolute'} top={'85%'} bgcolor={'#ccc'} width={'100%'}>
                <Box p={2}>
                    <Typography fontSize={'20px'}>Hỗ trợ</Typography>
                    <Stack direction={'row'} spacing={1}>
                        <Typography fontSize={'13px'}>Liên hệ:</Typography>
                        <Link color={color.text_color} href="tel:0383476296">
                            <Typography>0383476296</Typography>
                        </Link>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

export default NavUser;
