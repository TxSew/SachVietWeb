import { Box, Button, Grid, ListItem, Stack, Typography } from '@mui/material';
import Image from '../../../components/Image/Image';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { color } from '../../../Theme/color';
import useMedia from '../../../hooks/useMedia/useMedia';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import { image } from '../../../assets';

function Footer() {
    const { isMediumMD } = useMedia();

    const ftItemhd = {
        padding: '24px 16px 0',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: 'black',
    };
    const ftItem = {
        fontSize: '13px',
        textTransform: 'capitalize',
        color: 'black',
        transition: 'color .2s ease-in-out',
        '&:hover': {
            color: '#008C89',
        },
    };
    const ftItemhdmb = {
        padding: '24px 0 0',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: 'black',
    };
    const ftItemmb = {
        fontSize: '13px',
        textTransform: 'capitalize',
        color: 'black',
        padding: '4px 0',
        transition: 'color .2s ease-in-out',
        '&:hover': {
            color: '#008C89',
        },
    };

    return (
        <Grid bgcolor={'#eee'}>
            {isMediumMD ? (
                <></>
            ) : (
                <Stack bgcolor={'#ccc'}>
                    <Box display={'flex'} alignItems={'center'} p={2} gap={'48px'}>
                        <Stack
                            display={'flex'}
                            direction={'row'}
                            spacing={2}
                            fontSize={'48px'}
                            style={{
                                color: 'white',
                            }}
                        >
                            <EmailIcon />
                            <Typography fontSize={'20px'} fontWeight={'bold'}>
                                Đăng ký nhận bản tin
                            </Typography>
                        </Stack>
                        <Stack
                            direction={'row'}
                            border={'1px solid #eee'}
                            spacing={2}
                            p={1}
                            borderRadius={2}
                            fontSize={'14px'}
                            color={'#F39801'}
                            bgcolor={'#fff'}
                            width={'566px'}
                        >
                            <input
                                placeholder="Nhập email của bạn!"
                                style={{
                                    flex: 1,
                                    color: '#F39801',
                                    fontSize: '16px',
                                }}
                            />
                            <Button
                                variant="outlined"
                                sx={{
                                    border: '1px solid #F39801',
                                    background: '#F39801',
                                    color: '#FFF',
                                    '&:hover': {
                                        border: '1px solid #008C89',
                                        color: '#008C89',
                                    },
                                }}
                            >
                                <Typography variant="body1">Đăng ký</Typography>
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            )}
            <Box bgcolor={color.white} p={4} sx={{ maxWidth: '100%' }} margin={'auto'}>
                <Grid container>
                    <Grid item xs={12} md={4} sm={12}>
                        <Box
                            sx={{
                                paddingRight: '20px',
                                borderRight: '1px solid #eee',
                            }}
                        >
                            <Image src={image.logoFooter} width="260px" height="50px" alt="" />
                            <Box mt={2} fontSize={12}>
                                <Typography variant="body1" textAlign={'left'}>
                                    259 Hà Huy Tập, TP Buôn Ma Thuột
                                </Typography>
                                <Typography variant="caption" color="initial">
                                    Công Ty Cổ Phần Phát Hành Sách TP Buôn Ma Thuột - SachViet
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: '20px',
                                }}
                            >
                                <Typography variant="subtitle1" color="initial">
                                    Sachviet.click nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua
                                    và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống SachViet trên toàn
                                    quốc
                                </Typography>
                            </Box>
                            {/* lis6 icon */}

                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                                color={'gray'}
                            >
                                <FacebookIcon />
                                <InstagramIcon />
                            </Stack>
                        </Box>
                    </Grid>

                    {isMediumMD ? (
                        <Grid item xs={12} md={8} sm={12} display={'flex'} container>
                            <Grid item md={4} xs={6}>
                                {' '}
                                <Typography sx={ftItemhdmb} variant="h2" height={'50px'}>
                                    tài khoản của tôi
                                </Typography>
                                <List>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={'/auth'}
                                    >
                                        <ListItem sx={ftItemmb}>Đăng nhập</ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={'/auth'}
                                    >
                                        <ListItem sx={ftItemmb}>Đăng ký </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}>Thay đổi địa chỉ khách hàng </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}>Chi tiết tài khoản </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}>Lịch sử mua hàng </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}> </ListItem>
                                    </NavLink>
                                </List>
                            </Grid>
                            <Grid md={4} xs={6}>
                                {' '}
                                <Typography sx={ftItemhdmb} variant="h2" height={'50px'}>
                                    Trang chủ
                                </Typography>
                                <List>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}>Danh mục</ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}>Văn học </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}>Tâm lý - kỹ năng</ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}>Nuôi dạy con</ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItemmb}>Ngoại ngữ</ListItem>
                                    </NavLink>
                                </List>
                            </Grid>
                            <Grid md={4} xs={12}>
                                <Typography sx={ftItemhdmb} variant="h2">
                                    Liên Hệ
                                </Typography>
                                <List>
                                    <ListItem sx={ftItemmb}>
                                        <LocationOnIcon />
                                        <Typography sx={{ cursor: 'pointer' }} px={1}>
                                            259, Hà Huy Tập Tân Lợi, TP. BMT
                                        </Typography>
                                    </ListItem>
                                    <ListItem sx={ftItemmb}>
                                        <MailIcon />
                                        <Typography sx={{ cursor: 'pointer' }} px={1}>
                                            cskh@sachviet.com.vn
                                        </Typography>
                                    </ListItem>
                                    <ListItem sx={ftItemmb}>
                                        <LocalPhoneIcon />
                                        <Typography sx={{ cursor: 'pointer' }} px={1}>
                                            0383476296
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={12} md={8} display={'flex'} pl={3} container>
                            <Grid md={5} xs={6} sm={6}>
                                <Typography sx={ftItemhd} variant="h2">
                                    Liên Hệ
                                </Typography>
                                <List>
                                    <ListItem sx={ftItem}>
                                        <LocationOnIcon />
                                        <Typography sx={{ cursor: 'pointer' }} px={1}>
                                            259, Hà Huy Tập Tân Lợi, TP. BMT
                                        </Typography>
                                    </ListItem>
                                    <ListItem sx={ftItem}>
                                        <MailIcon />
                                        <Typography sx={{ cursor: 'pointer' }} px={1}>
                                            cskh@sachviet.com.vn
                                        </Typography>
                                    </ListItem>
                                    <ListItem sx={ftItem}>
                                        <LocalPhoneIcon />
                                        <Typography sx={{ cursor: 'pointer' }} px={1}>
                                            0378529323
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid md={3.5} xs={6} sm={6}>
                                {' '}
                                <Typography sx={ftItemhd} variant="h2">
                                    Trang chủ
                                </Typography>
                                <List>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}>Danh mục</ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}>Văn học </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}>Tâm lý - kỹ năng</ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}>Nuôi dạy con</ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}>Ngoại ngữ</ListItem>
                                    </NavLink>
                                </List>
                            </Grid>
                            <Grid md={3.5} xs={12} sm={12}>
                                {' '}
                                <Typography sx={ftItemhd} variant="h2">
                                    tài khoản của tôi
                                </Typography>
                                <List>
                                    <ListItem>
                                        <NavLink
                                            style={{
                                                color: 'black',
                                            }}
                                            to={'/auth'}
                                        >
                                            <ListItem
                                                sx={{
                                                    padding: '0',
                                                    color: '#000',
                                                    fontSize: '13px',
                                                    transition: 'color .3s ease-in-out',
                                                    '&:hover': {
                                                        color: '#008C89',
                                                    },
                                                }}
                                            >
                                                Đăng nhập
                                            </ListItem>
                                        </NavLink>
                                        <Typography px={1}>/</Typography>
                                        <NavLink
                                            style={{
                                                color: 'black',
                                            }}
                                            to={'/auth'}
                                        >
                                            <ListItem
                                                sx={{
                                                    padding: '0',
                                                    color: '#000',
                                                    fontSize: '13px',
                                                    transition: 'color .3s ease-in-out',
                                                    '&:hover': {
                                                        color: '#008C89',
                                                    },
                                                }}
                                            >
                                                {' '}
                                                Đăng ký{' '}
                                            </ListItem>
                                        </NavLink>
                                    </ListItem>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}>Thay đổi địa chỉ khách hàng </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}>Chi tiết tài khoản </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}>Lịch sử mua hàng </ListItem>
                                    </NavLink>
                                    <NavLink
                                        style={{
                                            color: 'black',
                                        }}
                                        to={''}
                                    >
                                        <ListItem sx={ftItem}> </ListItem>
                                    </NavLink>
                                </List>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Grid>
    );
}

export default Footer;
