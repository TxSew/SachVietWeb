import {
    Avatar,
    Button,
    CSSObject,
    CssBaseline,
    Divider,
    Link,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
    styled,
    useTheme,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import React from 'react';
import { FaListUl } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { image } from '../../assets';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import useMedia from '../../hooks/useMedia/useMedia';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SellIcon from '@mui/icons-material/Sell';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

function AdminLayout({ children }: { children: React.ReactNode }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openpro = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { isMediumMD } = useMedia();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 260,
                background: '#222d32',
                height: '100vh',
            }}
            role="presentation"
        >
            <div className="dasb-sidebar-logo">
                <img width={'100px'} src={image.logo} alt="" />
            </div>
            <NavLink to="/admin/statistical">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <StackedLineChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý thống kê" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/admin/category">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý danh mục" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/admin/product">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <ImportContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý sản phẩm" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/admin/productInventory">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý hàng tồn kho" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/admin/orders">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <StorefrontIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý Đơn hàng" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/admin/producer">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý nhà cung cấp" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/admin/discount">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <SellIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý giảm giá" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/admin/customer">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý khách hàng" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/admin/news">
                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 3,
                                justifyContent: 'center',
                                color: '#ccc',
                            }}
                        >
                            {' '}
                            <FiberNewIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý tin tức" sx={{ opacity: open ? 1 : 1 }} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
        </Box>
    );
    return (
        <>
            {isMediumMD ? (
                <div className="dasb">
                    <div className="dasb-wapper">
                        <input type="checkbox" id="tool" />
                        <div></div>
                        <Box className="dasb-wapper-main" width={'100%'}>
                            <div className="dasb-header row">
                                {isMediumMD ? (
                                    <div>
                                        {(['left'] as const).map((anchor) => (
                                            <React.Fragment key={anchor}>
                                                <Button onClick={toggleDrawer(anchor, true)}>
                                                    {' '}
                                                    <label htmlFor="" className="tool">
                                                        <FaListUl />
                                                    </label>
                                                </Button>

                                                <MuiDrawer
                                                    anchor={anchor}
                                                    open={state[anchor]}
                                                    onClose={toggleDrawer(anchor, false)}
                                                >
                                                    {list(anchor)}
                                                </MuiDrawer>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ) : (
                                    <label htmlFor="tool" className="tool">
                                        <FaListUl />
                                    </label>
                                )}
                                <ul className="dasb-header-right">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            padding: '0 16px',
                                        }}
                                    >
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick}
                                                size="small"
                                                sx={{ ml: 2 }}
                                                aria-controls={openpro ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openpro ? 'true' : undefined}
                                            >
                                                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={openpro}
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
                                        <MenuItem onClick={handleClose}>
                                            <Avatar /> Profile
                                        </MenuItem>

                                        <NavLink to={'/'}>
                                            <MenuItem onClick={handleClose}>
                                                <Avatar /> My account
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
                                </ul>
                            </div>
                            <div className="dasb-wapper-main-bg">
                                <div className="content">{children} </div>
                            </div>
                        </Box>
                    </div>
                </div>
            ) : (
                <Box display={{ xs: 'flex', md: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open}>
                        <Toolbar
                            sx={{
                                background: '#222D32',
                            }}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                noWrap
                                color={'#F39801'}
                                textTransform={'uppercase'}
                                fontWeight={'bold'}
                            >
                                Trang quản lý của SACHVIET
                            </Typography>
                            <Box marginLeft={'auto'}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        padding: '0 16px',
                                    }}
                                >
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={openpro ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openpro ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={openpro}
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
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open} sx={{ background: '#222d32' }}>
                        <DrawerHeader
                            sx={{
                                background: '#020202',
                            }}
                        >
                            <Box margin={'auto'} className="dasb-sidebar-logo">
                                <img width={100} src={image.logo} alt="" />
                            </Box>{' '}
                            <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </DrawerHeader>

                        <Box bgcolor={'#222d32'} height={'100%'}>
                            <NavLink to="/admin/statistical">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <StackedLineChartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý thống kê" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/category">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <FormatListBulletedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý danh mục" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/product">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <ImportContactsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý sản phẩm" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/productInventory">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <InventoryIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý hàng tồn kho" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/orders">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <StorefrontIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý Đơn hàng" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/producer">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <AddBoxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý nhà cung cấp" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/discount">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <SellIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý giảm giá" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/customer">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <PeopleAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý khách hàng" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/news">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <FiberNewIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý tin tức" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/">
                                <ListItem className="navdb" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color: '#ccc',
                                            }}
                                        >
                                            {' '}
                                            <ArrowBackIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Về trang chủ" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        </Box>
                    </Drawer>
                    <Box
                        component="main"
                        display={'block'}
                        sx={{
                            flexGrow: 2,
                        }}
                        width={`calc(100% - ${drawerWidth}px)`}
                    >
                        <DrawerHeader />
                        <div className="dasb-wapper-main-bg">
                            <div className="content">{children} </div>
                        </div>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default AdminLayout;
