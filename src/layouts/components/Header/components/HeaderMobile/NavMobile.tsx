import { ExpandLess } from '@mui/icons-material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DiscountIcon from '@mui/icons-material/Discount';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Collapse, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { color } from '../../../../../Theme/color';
import { image } from '../../../../../assets';
import NavItem from '../NavItem/NavItem';
function NavMobile() {
    const [openCategory, setOpenCategory] = React.useState(false);

    const handleOpenCategory = () => {
        setOpenCategory(!openCategory);
    };
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
                        <Typography fontWeight={'bold'}>Đăng nhập</Typography>
                        <Typography variant="body1" color={color.text_color}>
                            Để nhận nhiều ưu đãi hơn
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <Box borderBottom={'1px solid #dadada'} p={'4px 0px'}>
                <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                    <Stack direction={'row'} spacing={1} padding={'4px 7px'} bgcolor={'green'}>
                        <PersonIcon />
                        <Typography>Đăng nhập</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1} padding={'4px 7px'} bgcolor={'yellow'}>
                        <PersonIcon />
                        <Typography>Đăng ký</Typography>
                    </Stack>
                </Stack>
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

                <Stack onClick={handleOpenCategory}>{<ExpandLess />}</Stack>
                <Collapse in={openCategory} timeout="auto" unmountOnExit>
                    <NavLink
                        to={'/news'}
                        style={{
                            color: '#0000 !important',
                        }}
                    >
                        <Stack
                            sx={{
                                cursor: 'pointer',
                                transition: '0.2s linear',
                                color: color.text_color,
                                '&:hover': {
                                    backgroundColor: '#fff',
                                },
                            }}
                            direction={'row'}
                            spacing={2}
                            p={1}
                            borderBottom={'1px solid #dadada'}
                        >
                            <NewspaperIcon />
                            <Typography>Tin tức</Typography>
                        </Stack>
                    </NavLink>
                </Collapse>
            </Box>
            <Box position={'absolute'} top={'85%'} bgcolor={'#ccc'} width={'100%'}>
                <Box p={2}>
                    <Typography fontSize={'20px'}>Hỗ trợ</Typography>
                    <Stack direction={'row'}>
                        <Typography fontSize={'13px'}>Liên hệ</Typography>
                        <Link href="tel:0383476296">0383476296</Link>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

export default NavMobile;
