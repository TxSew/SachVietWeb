import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import InfoIcon from '@mui/icons-material/Info';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import MenuIcon from '@mui/icons-material/Menu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Person3Icon from '@mui/icons-material/Person3';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    AppBar,
    Avatar,
    Badge,
    CardMedia,
    Dialog,
    Divider,
    Grid,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Modal,
    Slide,
    Stack,
    TextField,
    Toolbar,
    Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container/Container';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, createSearchParams, useNavigate } from 'react-router-dom';
import { image } from '../../../assets';
import Image from '../../../components/Image/Image';
import { BaseAPi } from '../../../configs/BaseApi';
import { convertText } from '../../../helpers/convertText';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import useMedia from '../../../hooks/useMedia/useMedia';
import { RootState } from '../../../redux/storeClient';
import HttpCategoryController from '../../../submodules/controllers/http/httpCategoryController';
import HttpProductController from '../../../submodules/controllers/http/httpProductController';
import { User } from '../../../submodules/models/UserModel/User';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TransitionProps } from '@mui/material/transitions';
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Header = () => {
    const http = new HttpProductController(BaseAPi);
    const httpCategory = new HttpCategoryController(BaseAPi);
    const [user, setUser] = useState<User>({} as User);
    const [search, setSearch] = React.useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const cart = useSelector((state: RootState) => state.cart.cartItems);
    const [Products, setProducts] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const dataSearch = useDebounce(search, 300);
    const redirect = useNavigate();
    const { isMediumMD } = useMedia();
    useEffect(() => {
        fetchValueSearch(dataSearch);
    }, [dataSearch]);
    async function fetchValueSearch(props: any) {
        const data = await http.getAll({
            keyword: props,
        });
        const dataCategory = await httpCategory.getCategory({});
        const cate = await dataCategory.filter((category: any, i: any) => category.id !== 1);
        const results = cate.filter((item: any) => item.slug.includes(props.toLowerCase()));
        setCategories(results);
        const { products } = data;
        setProducts(products);
    }
    useEffect(() => {
        const user = localStorage.getItem('user');
        const getUser = JSON.parse(user!);
        if (getUser) {
            setUser(getUser);
        }
    }, []);
    const styles = {
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        width: '700px',
        bgcolor: 'background.paper',
        borderRight: '1px solid #000',
        boxShadow: 24,
        outline: 'none',
        p: 4,
        pt: 2,
        borderRadius: '8px',
    };

    const boxmodal = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '240px',
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: '1px solid #000',
        boxShadow: 24,
        outline: 'none',
        p: 4,
        pt: 2,
    };

    const hditem = {
        display: 'flex',
        alignItems: 'center',
        pt: 2,
        pb: 2,
        color: '#615c5c',
        fonSize: '12px',
        fontWeight: 400,
        fontStyle: 'normal',
        lineHieght: 'normal',
        transition: 'all .3s ease-in-out',
        '&:hover': {
            color: '#008C89',
        },
    };

    const hdicon = {
        mr: 1,
        fontSize: '24px',
    };
    const hdicon_mb = {
        mr: 1,
        fontSize: '24px',
        lineHieght: 'normal',
    };

    const nicon = {
        lineHeight: 'normal',
    };

    const [openSearch, setOpenSearch] = React.useState(false);
    const handleOpenSearch = () => setOpenSearch(true);
    const handleCloseSearch = () => setOpenSearch(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChangeValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setSearch(event.target.value);
        }
        // setSearch(event.target.value);
    };
    const navigate = useNavigate();
    const handleKeydown = async (event: any) => {
        const value = convertText(event.target.value);
        if (event.key === 'Enter') {
            navigate({
                pathname: '/category',
                search: createSearchParams({
                    q: value,
                }).toString(),
            });
            handleCloseSearch();
        }
    };
    const handleSearch = () => {
        navigate({
            pathname: '/category',
            search: createSearchParams({
                q: search,
            }).toString(),
        });
    };
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box width={'100%'}>
                <Image src="https://bookbuy.vn/Images/frontend/sieu-sale-thang-10.jpg" alt="logo" width="100%" />
            </Box>
            {!isMediumMD ? (
                <Box width={'100%'}>
                    <Container maxWidth="xl">
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Box display={'flex'} alignItems={'center'} gap={3}>
                                <NavLink to={''}>
                                    <Box sx={hditem}>
                                        <InfoIcon sx={hdicon} />
                                        <Typography fontSize={'12px'} style={nicon}>
                                            Trợ giúp
                                        </Typography>
                                    </Box>
                                </NavLink>
                                <NavLink to={'/news'}>
                                    <Box sx={hditem}>
                                        <NewspaperIcon sx={hdicon} />
                                        <Typography fontSize={'12px'} style={nicon}>
                                            Tin tức
                                        </Typography>
                                    </Box>
                                </NavLink>
                                <NavLink to={'/sales'}>
                                    <Box sx={hditem}>
                                        <SellIcon sx={hdicon} />
                                        <Typography fontSize={'12px'} style={nicon}>
                                            Khuyễn mãi
                                        </Typography>
                                    </Box>
                                </NavLink>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={3}>
                                <NavLink to={'/searchOrder'}>
                                    <Box sx={hditem}>
                                        <CardGiftcardIcon sx={hdicon} />
                                        <Typography fontSize={'12px'} style={nicon}>
                                            Tra cứu đơn hàng
                                        </Typography>
                                    </Box>
                                </NavLink>
                                <NavLink to={'/user/mycart'}>
                                    <Box sx={hditem}>
                                        <ShoppingBasketSharpIcon sx={hdicon} />
                                        <Typography fontSize={'12px'} style={nicon}>
                                            Kiểm tra đơn hàng
                                        </Typography>
                                    </Box>
                                </NavLink>
                                {user.id ? (
                                    <Box
                                        position={'relative'}
                                        sx={{
                                            '&:hover .user-view': {
                                                visibility: 'visible',
                                            },
                                        }}
                                    >
                                        <NavLink to={'/user'} style={hditem}>
                                            <HowToRegSharpIcon sx={hdicon} />
                                            <Typography fontSize={'12px'} style={nicon}>
                                                Tài khoản
                                            </Typography>
                                        </NavLink>
                                        <Stack
                                            className="user-view"
                                            sx={{
                                                position: 'absolute',
                                                visibility: 'hidden',
                                                p: '5px',
                                                top: '100%',
                                                right: '0',
                                                background: 'white',
                                                width: '190px',
                                                zIndex: 5,
                                                border: '1px solid #eee',
                                                borderRadius: '10px',
                                                '& > ul> li': {
                                                    listStyle: 'none',
                                                    padding: '5px 0px',
                                                    borderBottom: '1px solid #eee',
                                                    '&:hover': {
                                                        color: '#008C89',
                                                    },
                                                },
                                            }}
                                        >
                                            <ul>
                                                <li>
                                                    <Link
                                                        style={{
                                                            color: 'inherit',
                                                        }}
                                                        to="/user/mycart"
                                                    >
                                                        Xem thông tin cá nhân
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Typography
                                                        onClick={() => {
                                                            localStorage.clear();
                                                            redirect('/');
                                                            window.location.reload();
                                                        }}
                                                        sx={{
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        Đăng xuất
                                                    </Typography>
                                                </li>
                                            </ul>
                                        </Stack>
                                    </Box>
                                ) : (
                                    <Box display={'flex'} gap={2}>
                                        <NavLink to={'/auth'}>
                                            <Box sx={hditem}>
                                                <LoginSharpIcon sx={hdicon} />
                                                <Typography fontSize={'12px'} style={nicon}>
                                                    Đăng nhập
                                                </Typography>
                                            </Box>
                                        </NavLink>
                                        <NavLink to={'/auth'}>
                                            <Box sx={hditem}>
                                                <HowToRegSharpIcon sx={hdicon} />
                                                <Typography fontSize={'12px'} style={nicon}>
                                                    Đăng ký
                                                </Typography>
                                            </Box>
                                        </NavLink>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Container>
                    <Box>
                        <Container maxWidth="xl" sx={{ position: 'relative' }}>
                            <Grid
                                container
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    py: '10px',
                                }}
                            >
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Link to={'/'}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Image src={image.logo} width="160px" height="50px" alt="Logo" />
                                        </Box>
                                    </Link>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            textAlign: 'right',
                                        }}
                                    >
                                        <img
                                            src={image.menu}
                                            height={'45px'}
                                            style={{ objectFit: 'cover' }}
                                            width={'45px'}
                                            alt=""
                                        />
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={5.5}
                                    sx={{
                                        position: 'relative',
                                    }}
                                >
                                    <Stack
                                        sx={{
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid #ccc',
                                            padding: '3px 10px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <Modal
                                            open={openSearch}
                                            onClose={handleCloseSearch}
                                            // hideBackdrop={true}
                                            disableAutoFocus={true}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            sx={{
                                                '& .css-919eu4, .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': {
                                                    backgroundColor: 'transparent !important',
                                                },
                                                top: '130px',
                                            }}
                                        >
                                            <Box sx={styles}>
                                                <Stack
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            border: 'none',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    ></Typography>
                                                </Stack>

                                                <Typography
                                                    variant="h2"
                                                    display={'block'}
                                                    padding={'10px 0'}
                                                    textTransform={'uppercase'}
                                                    fontWeight={'bold'}
                                                >
                                                    Được tìm kiếm nhiều nhất (6 sản phẩm)
                                                </Typography>
                                                <Box padding={'8px 0'}>
                                                    <Grid container spacing={2}>
                                                        {!Products.length ? (
                                                            <Stack
                                                                pl={5}
                                                                direction={'column'}
                                                                alignItems={'center'}
                                                                justifyContent={'center'}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        maxWidth: '50px',
                                                                        height: '50px',
                                                                    }}
                                                                >
                                                                    <img
                                                                        width={'100%'}
                                                                        src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"
                                                                        alt=""
                                                                    />
                                                                </Box>
                                                            </Stack>
                                                        ) : (
                                                            Products.slice(0, 6).map((e: any) => {
                                                                return (
                                                                    <Grid item xs={6} md={4}>
                                                                        <Link
                                                                            to={`/products/${e.slug}`}
                                                                            onClick={handleCloseSearch}
                                                                        >
                                                                            <Box display={'fex'} alignItems={'center'}>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <img
                                                                                        src={e.image}
                                                                                        style={{
                                                                                            border: '1px solid #eee',
                                                                                        }}
                                                                                        width={'50px'}
                                                                                        height={'50px'}
                                                                                        alt=""
                                                                                    ></img>
                                                                                </Grid>
                                                                                <Grid
                                                                                    xs={12}
                                                                                    md={9}
                                                                                    item
                                                                                    textAlign={'left'}
                                                                                    paddingLeft={1}
                                                                                >
                                                                                    <Typography
                                                                                        variant="body1"
                                                                                        sx={{
                                                                                            fontSize: '12px',
                                                                                            color: 'black',
                                                                                            overflow: 'hidden',
                                                                                            textAlign: 'center',
                                                                                            display: '-webkit-box',
                                                                                            lineClamp: 2,
                                                                                            WebkitLineClamp: 2,
                                                                                            WebkitBoxOrient: 'vertical',
                                                                                            flexShrink: 0,
                                                                                        }}
                                                                                    >
                                                                                        {e.title}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Box>
                                                                        </Link>
                                                                    </Grid>
                                                                );
                                                            })
                                                        )}
                                                    </Grid>
                                                </Box>
                                            </Box>
                                        </Modal>
                                        <TextField
                                            onClick={handleOpenSearch}
                                            sx={{
                                                '& fieldset': { border: 'none', width: '100%' },
                                                width: '100%',
                                            }}
                                            onInput={handleChangeValue}
                                            placeholder="Tìm kiếm sản phẩm mong muốn..."
                                            onKeyDown={handleKeydown}
                                        />

                                        <Typography
                                            variant="caption"
                                            onClick={handleSearch}
                                            sx={{
                                                p: '5px 20px',
                                                border: 'none',
                                                backgroundColor: '#008C89',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <SearchIcon
                                                sx={{
                                                    color: '#fff',
                                                }}
                                            />
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid
                                    item
                                    xs={3.5}
                                    justifyContent={'end'}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        pl: '24px',
                                    }}
                                >
                                    <NavLink
                                        hrefLang="tel:0383476296"
                                        to={'/'}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingLeft: '16px',
                                        }}
                                    >
                                        <PersonOutlineOutlinedIcon
                                            sx={{
                                                color: '#008C89',
                                            }}
                                        />

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                pl: 1,
                                                textAlign: 'center',
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                color: '#F39801',
                                                '&:hover': {
                                                    color: '#008C89',
                                                },
                                            }}
                                        >
                                            0383476296
                                        </Typography>
                                    </NavLink>
                                    <NavLink
                                        to={'/cart'}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingLeft: '16px',
                                        }}
                                    >
                                        <Badge badgeContent={cart.length} color="primary">
                                            <ShoppingCartOutlinedIcon
                                                sx={{
                                                    color: '#008C89',
                                                }}
                                            />
                                        </Badge>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                pl: 1,
                                                color: '#615C5C',

                                                '&:hover': {
                                                    color: '#008C89',
                                                },
                                            }}
                                        >
                                            Giỏ hàng{' '}
                                        </Typography>
                                    </NavLink>
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    background: '#fff',
                                    width: '52%',
                                    left: '18%',
                                    height: '450px',
                                    position: 'absolute',
                                    zIndex: 10,
                                    boxShadow:
                                        ' rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    p: 4,
                                    mt: 1,
                                    display: 'none',
                                }}
                            ></Box>
                        </Container>
                    </Box>
                </Box>
            ) : (
                <Box position={'sticky'} top={0} left={0} sx={{ background: '#e7e7e7', zIndex: '10' }}>
                    <Container maxWidth={'xl'}>
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            padding={' 8px 0'}
                            color={'white'}
                        >
                            <Box display={'flex'} alignItems={'center'} gap={2}>
                                <Box
                                    color={'#333'}
                                    sx={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Dialog
                                        fullScreen
                                        open={openSearch}
                                        onClose={handleCloseSearch}
                                        TransitionComponent={Transition}
                                    >
                                        <AppBar sx={{ position: 'relative' }}>
                                            <Toolbar
                                                sx={{
                                                    position: 'fixed',
                                                    top: 0,
                                                    width: '100%',
                                                    background: '#008C89',
                                                }}
                                            >
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    onClick={handleCloseSearch}
                                                    aria-label="close"
                                                >
                                                    <ArrowBackIcon />
                                                </IconButton>
                                                <Typography
                                                    sx={{ ml: 2, flex: 1 }}
                                                    textAlign={'center'}
                                                    fontSize={'18px'}
                                                    fontWeight={'bold'}
                                                    variant="h6"
                                                    component="div"
                                                >
                                                    Danh Mục Sản Phẩm
                                                </Typography>
                                            </Toolbar>
                                        </AppBar>
                                        <Box
                                            sx={{
                                                height: '100%',
                                                pt: '56px',
                                            }}
                                        >
                                            <TabContext value={value}>
                                                <Grid
                                                    container
                                                    sx={{
                                                        height: '100%',
                                                    }}
                                                >
                                                    <Grid
                                                        xs={3}
                                                        sx={{
                                                            borderRight: 2,
                                                            borderColor: 'divider',
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                            }}
                                                        >
                                                            <TabList
                                                                onChange={handleChange}
                                                                aria-label="lab API tabs example"
                                                            >
                                                                <Tab
                                                                    icon={
                                                                        <CardMedia
                                                                            component="img"
                                                                            sx={{
                                                                                width: '38px',
                                                                                height: '38px',
                                                                                objectFit: 'contain',
                                                                                margin: 'auto',
                                                                                p: 1,
                                                                            }}
                                                                            title=""
                                                                            image="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_sachtrongnuoc.svg"
                                                                        />
                                                                    }
                                                                    label="Tên danh mục"
                                                                    value="1"
                                                                    sx={{
                                                                        width: '100%',
                                                                        padding: '4px',
                                                                        fontWeight: 'bold',
                                                                        fontSize: '12px',
                                                                    }}
                                                                />
                                                            </TabList>
                                                            <TabList
                                                                onChange={handleChange}
                                                                aria-label="lab API tabs example"
                                                            >
                                                                <Tab
                                                                    icon={
                                                                        <CardMedia
                                                                            component="img"
                                                                            sx={{
                                                                                width: '38px',
                                                                                height: '38px',
                                                                                objectFit: 'contain',
                                                                                margin: 'auto',
                                                                                p: 1,
                                                                            }}
                                                                            title=""
                                                                            image="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_sachtrongnuoc.svg"
                                                                        />
                                                                    }
                                                                    label="Tên danh mục"
                                                                    value="2"
                                                                    sx={{
                                                                        width: '100%',
                                                                        padding: '4px',
                                                                        fontWeight: 'bold',
                                                                        fontSize: '12px',
                                                                    }}
                                                                />
                                                            </TabList>
                                                            <TabList
                                                                onChange={handleChange}
                                                                aria-label="lab API tabs example"
                                                            >
                                                                <Tab
                                                                    icon={
                                                                        <CardMedia
                                                                            component="img"
                                                                            sx={{
                                                                                width: '38px',
                                                                                height: '38px',
                                                                                objectFit: 'contain',
                                                                                margin: 'auto',
                                                                                p: 1,
                                                                            }}
                                                                            title=""
                                                                            image="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_sachtrongnuoc.svg"
                                                                        />
                                                                    }
                                                                    label="Tên danh mục"
                                                                    value="3"
                                                                    sx={{
                                                                        width: '100%',
                                                                        padding: '4px',
                                                                        fontWeight: 'bold',
                                                                        fontSize: '12px',
                                                                    }}
                                                                />
                                                            </TabList>
                                                        </Box>
                                                    </Grid>
                                                    <Grid xs={9}>
                                                        {' '}
                                                        <Box>
                                                            <TabPanel value="1">Item One</TabPanel>
                                                            <TabPanel value="2">Item Two</TabPanel>
                                                            <TabPanel value="3">Item Three</TabPanel>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </TabContext>
                                        </Box>
                                    </Dialog>
                                    <MenuIcon onClick={handleOpenSearch} />
                                </Box>
                                <NavLink
                                    to={'/'}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Image src={image.logo} alt="logo" width="100px" height="24px" />
                                </NavLink>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} lineHeight={'normal'} gap={1}>
                                <NavLink
                                    to={'/cart'}
                                    style={{
                                        cursor: 'pointer',
                                        color: '#F7941E',
                                    }}
                                >
                                    <Badge badgeContent={cart.length} color="primary">
                                        <ShoppingCartIcon sx={hdicon_mb} />
                                    </Badge>
                                </NavLink>

                                <Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick}
                                                aria-controls={open ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        background: '#F7941E',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Person3Icon
                                                        sx={hdicon_mb}
                                                        style={{
                                                            margin: '0 auto',
                                                        }}
                                                    />
                                                </Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    {user.id ? (
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <NavLink to={'/user'}>
                                                <MenuItem
                                                    onClick={handleClose}
                                                    sx={{
                                                        color: 'gray',
                                                    }}
                                                >
                                                    <HowToRegIcon
                                                        sx={{
                                                            marginRight: '8px',
                                                        }}
                                                    />{' '}
                                                    Thông tin tài khoản
                                                </MenuItem>
                                            </NavLink>
                                            <Divider />
                                            <MenuItem
                                                onClick={() => {
                                                    localStorage.clear();
                                                    redirect('/');
                                                    window.location.reload();
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <LogoutIcon fontSize="small" />
                                                </ListItemIcon>
                                                Đăng xuất
                                            </MenuItem>
                                        </Menu>
                                    ) : (
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <NavLink to={'/auth'}>
                                                <MenuItem
                                                    onClick={handleClose}
                                                    sx={{
                                                        color: 'gray',
                                                    }}
                                                >
                                                    <LockOpenIcon
                                                        sx={{
                                                            marginRight: '8px',
                                                        }}
                                                    />{' '}
                                                    Login
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink to={'/auth'}>
                                                <MenuItem
                                                    onClick={handleClose}
                                                    sx={{
                                                        color: 'gray',
                                                    }}
                                                >
                                                    <HowToRegIcon
                                                        sx={{
                                                            marginRight: '8px',
                                                        }}
                                                    />{' '}
                                                    Register
                                                </MenuItem>
                                            </NavLink>
                                            <Divider />
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <PersonAdd fontSize="small" />
                                                </ListItemIcon>
                                                Add another account
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Settings fontSize="small" />
                                                </ListItemIcon>
                                                Settings
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            )}
        </>
    );
};
export default Header;
