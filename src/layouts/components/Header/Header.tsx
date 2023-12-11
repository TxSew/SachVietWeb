import NewspaperIcon from '@mui/icons-material/Newspaper';

import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import InfoIcon from '@mui/icons-material/Info';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Person3Icon from '@mui/icons-material/Person3';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
    Avatar,
    Badge,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    ListItemIcon,
    Menu,
    MenuItem,
    Modal,
    OutlinedInput,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container/Container';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { color } from '../../../Theme/color';
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
import NavMobile from './components/HeaderMobile/NavMobile';
import NavItem from './components/NavItem/NavItem';
import NavUser from './components/NavUser/NavUser';

const Header = () => {
    const location = useLocation();

    const http = new HttpProductController(BaseAPi);
    const httpCategory = new HttpCategoryController(BaseAPi);

    const [user, setUser] = useState<User>({} as User);
    const [search, setSearch] = React.useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const cart = useSelector((state: RootState) => state.cart.cartItems);
    const [Products, setProducts] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [categoryHeaderMobile, setCategoryHeaderMobile] = useState<any>([]);
    const dataSearch = useDebounce(search, 300);
    const redirect = useNavigate();
    const { isMediumMD } = useMedia();
    useEffect(() => {
        fetchValueSearch(dataSearch);
    }, [dataSearch]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const category = await httpCategory.getCategory({});
        const filteredData = category.filter((item: any) => item.parentId !== null);
        setCategoryHeaderMobile(filteredData);
    };

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

    const [openSearch, setOpenSearch] = React.useState(false);
    const handleOpenSearch = () => setOpenSearch(true);
    const handleCloseSearch = () => setOpenSearch(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        redirect('/auth');
    };
    const handleChangeValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setSearch(event.target.value);
        }
    };
    const navigate = useNavigate();
    const handleKeydown = async (event: any) => {
        const value = convertText(event.target.value);
        if (event.key === 'Enter') {
            navigate({
                pathname: '/filter',
                search: createSearchParams({
                    q: value,
                }).toString(),
            });
            handleCloseSearch();
        }
    };

    const handleSearch = () => {
        if (search.length > 0) {
            navigate({
                pathname: '/filter',
                search: createSearchParams({
                    q: search,
                }).toString(),
            });
        }
    };

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: any, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <>
            <Box width={'100%'}>
                <Image src="https://bookbuy.vn/Images/frontend/sieu-sale-thang-10.jpg" alt="logo" width="100%" />
            </Box>
            {!isMediumMD ? (
                <Box width={'100%'}>
                    <Container maxWidth="xl">
                        <Box display={'flex'} alignItems={'center'} py={2} justifyContent={'space-between'}>
                            <Box display={'flex'} alignItems={'center'} gap={3}>
                                <NavItem path="/" name="Trợ giúp" icon={<InfoIcon fontSize="small" />} />
                                <NavItem path="/news" name="Tin tức" icon={<NewspaperIcon fontSize="small" />} />
                                <NavItem path="/sales" name="Khuyến mãi" icon={<SellIcon fontSize="small" />} />
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={3}>
                                <NavItem
                                    path="/searchOrder"
                                    name="Tra cứu đơn hàng"
                                    icon={<CardGiftcardIcon fontSize="small" />}
                                />

                                <NavItem
                                    path="/user/mycart"
                                    name="Kiểm tra đơn hàng"
                                    icon={<SellIcon fontSize="small" />}
                                />

                                {user.id ? (
                                    <Box
                                        position={'relative'}
                                        sx={{
                                            '&:hover .user-view': {
                                                visibility: 'visible',
                                            },
                                        }}
                                    >
                                        <NavItem
                                            path="/user"
                                            name="Tài khoản"
                                            icon={<HowToRegSharpIcon fontSize="small" />}
                                        />

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
                                                    <NavLink
                                                        style={{
                                                            color: 'inherit',
                                                        }}
                                                        to="/user/mycart"
                                                    >
                                                        Xem thông tin cá nhân
                                                    </NavLink>
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
                                        <NavItem
                                            path="/auth"
                                            name="Đăng nhập"
                                            icon={<LoginSharpIcon fontSize="small" />}
                                        />
                                        <NavItem
                                            path="/auth?register=true"
                                            name="Đăng ký"
                                            icon={<HowToRegSharpIcon fontSize="small" />}
                                        />
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
                                    justifyContent: 'space-between',
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
                                    <NavLink to={'/'}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Image src={image.logo} width="160px" height="50px" alt="Logo" />
                                        </Box>
                                    </NavLink>
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
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '7.5%',
                                                    left: '45%',
                                                    transform: 'translate(-50%, 0%)',
                                                    width: '586px',
                                                    bgcolor: 'background.paper',
                                                    boxShadow: 24,
                                                    outline: 'none',
                                                    p: 4,
                                                    pt: 2,
                                                    borderRadius: '8px',
                                                }}
                                            >
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
                                                    {`Sản phẩm được tìm kiếm`}
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
                                                                    <Grid key={e.id} item xs={6} md={4}>
                                                                        <NavLink
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
                                                                        </NavLink>
                                                                    </Grid>
                                                                );
                                                            })
                                                        )}
                                                    </Grid>
                                                </Box>
                                                <Typography
                                                    variant="h2"
                                                    display={'block'}
                                                    padding={'10px 0'}
                                                    textTransform={'uppercase'}
                                                    fontWeight={'bold'}
                                                >
                                                    {`Từ khoá`}
                                                </Typography>
                                                <Typography display={'block'}>{search}</Typography>
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
                                    <Link
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingLeft: '16px',
                                        }}
                                        href="tel:0383476296"
                                        underline="none"
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
                                    </Link>
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
                                            Giỏ hàng
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
                                    <React.Fragment>
                                        <MenuIcon onClick={toggleDrawer('left', true)} />

                                        <MuiDrawer
                                            anchor={'left'}
                                            open={state['left']}
                                            onClose={toggleDrawer('left', false)}
                                        >
                                            {location.pathname == '/user' || location.pathname.startsWith('/user/') ? (
                                                <NavUser />
                                            ) : (
                                                <NavMobile />
                                            )}
                                        </MuiDrawer>
                                    </React.Fragment>
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
                                        <ShoppingCartIcon />
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
                                                    />
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
                                                    />
                                                    Đăng nhập
                                                </MenuItem>
                                            </NavLink>
                                            <MenuItem
                                                onClick={() => {
                                                    setAnchorEl(null);
                                                    redirect('/auth?register=true');
                                                }}
                                                sx={{
                                                    color: 'gray',
                                                }}
                                            >
                                                <HowToRegIcon
                                                    sx={{
                                                        marginRight: '8px',
                                                    }}
                                                />
                                                Đăng ký
                                            </MenuItem>
                                        </Menu>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box pb={2}>
                            <OutlinedInput
                                sx={{
                                    background: color.white,
                                }}
                                onChange={(e: any) => {
                                    setSearch(e.target.value);
                                }}
                                key={2}
                                fullWidth
                                placeholder="Tìm kiếm sản phẩm..."
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        if (search.length > 0) {
                                            navigate({
                                                pathname: '/filter',
                                                search: createSearchParams({
                                                    q: search,
                                                }).toString(),
                                            });
                                        }
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Box>
                    </Container>
                </Box>
            )}
        </>
    );
};
export default Header;
