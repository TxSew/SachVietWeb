import { ExpandLess } from '@mui/icons-material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DiscountIcon from '@mui/icons-material/Discount';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Collapse, Link, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { color } from '../../../../../Theme/color';
import { image } from '../../../../../assets';
import NavItem from '../NavItem/NavItem';
import { httpAccount, httpCategory } from '../../../../../submodules/controllers/http/axiosController';
import LogoutIcon from '@mui/icons-material/Logout';
function NavMobile() {
    const [openCategory, setOpenCategory] = React.useState(false);
    const [category, setCategory] = React.useState<any>([]);
    const [categoryParams, setCategoryParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState<any>(null);
    const [user, setUser] = React.useState<any>({});
    const redirect = useNavigate();
    const handleOpenCategory = () => {
        setOpenCategory(!openCategory);
    };
    useEffect(() => {
        httpCategory.getCategory({}).then((res) => {
            const filteredData = res.filter((item: any) => item.parentId !== null);
            setCategory(filteredData);
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
                                redirect('/');
                                window.location.reload();
                            }}
                        >
                            <LogoutIcon />
                            <Typography>Đăng xuất</Typography>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                        <Stack
                            onClick={() => {
                                redirect('/auth');
                            }}
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
                        <NavLink to={'/auth?register=true'}>
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
                    <NavItem path="/" name="Trang chủ" icon={<HomeIcon />} />
                </Box>
                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <NavItem path="/sales" name="khuyến mãi" icon={<DiscountIcon />} />
                </Box>
                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <NavItem
                        path="/searchOrder"
                        name="Tra cứu đơn hàng"
                        icon={<ContentPasteSearchIcon fontSize="small" />}
                    />
                </Box>
                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <NavItem path="/news" name="Tin tức" icon={<NewspaperIcon />} />
                </Box>

                <Box
                    p={1}
                    sx={{
                        borderBottom: '1px solid #dadada',
                    }}
                >
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        onClick={handleOpenCategory}
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        <Stack direction={'row'} color={'#615c5c'}>
                            <CategoryIcon />
                            <Typography>Danh mục</Typography>
                        </Stack>
                        <Box>
                            <ExpandMoreIcon />
                        </Box>
                    </Stack>
                </Box>

                <Collapse in={openCategory} timeout="auto" unmountOnExit>
                    <Box overflow={'scroll'} maxHeight={'200px'}>
                        {category.map((e: any) => {
                            const searchParam = categoryParams.get('category');
                            const isActive = activeCategory === e.slug;

                            const handleCategoryClick = (slug: any) => {
                                setActiveCategory(slug === activeCategory ? null : slug);
                            };
                            return (
                                <Box
                                    pl={2}
                                    borderBottom={'1px solid #ccc'}
                                    sx={{
                                        '&:hover': {
                                            transition: 'linear 0.5s',
                                            fontWeight: 'bold',
                                            backgroundColor: '#fff',
                                        },
                                        '&:hover a': {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    <NavLink to={`/filter?category=${e.slug}`}>
                                        <Box color={'inherit'}>
                                            <Stack
                                                direction={'row'}
                                                alignItems={'center'}
                                                spacing={1}
                                                color={isActive ? color.sale : 'gray'}
                                            >
                                                <LocalLibraryIcon />
                                                <Typography
                                                    fontSize={'12px'}
                                                    onClick={() => handleCategoryClick(e.slug)}
                                                    fontWeight={isActive ? 'bold' : ''}
                                                    color={isActive ? color.sale : 'gray'}
                                                >
                                                    {e.name}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </NavLink>
                                </Box>
                            );
                        })}
                    </Box>
                </Collapse>
            </Box>
            <Box position={'absolute'} bottom={'0px'} bgcolor={'#ccc'} width={'100%'}>
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

export default NavMobile;
