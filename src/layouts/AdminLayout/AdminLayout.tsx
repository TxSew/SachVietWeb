import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, MenuItem, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import React from 'react';
import { BiBookAdd, BiSolidCategoryAlt } from 'react-icons/bi';
import { FaBookOpen, FaHome, FaListUl } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { image } from '../../assets';

function AdminLayout({ children }: { children: React.ReactNode }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openpro = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="dasb pb-3">
            <div className="dasb-wapper">
                <input type="checkbox" id="tool" />
                <div className="dasb-sidebar">
                    <div className="dasb-sidebar-logo">
                        <img width={'100px'} src={image.logo} alt="" />
                    </div>
                    <ul className="">
                        <NavLink to="/admin/statistical">
                            <li className="">
                                <FaHome />
                                <span>Thống Kê</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/category">
                            <li className="">
                                <BiSolidCategoryAlt />
                                <span>Danh mục</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/product">
                            <li className="">
                                <FaBookOpen />
                                <span>Sản phẩm</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/productInventory">
                            <li className="">
                                <FaBookOpen />
                                <span>Hàng tồn kho</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/orders">
                            <li className="">
                                <FaBookOpen />
                                <span>Đơn hàng</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/producer">
                            <li className="">
                                <BiBookAdd />
                                <span>Cung cấp</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/discount">
                            <li className="">
                                <BiBookAdd />
                                <span>Giảm giá</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/customer">
                            <li className="">
                                <BiBookAdd />
                                <span>Khách hàng</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/news">
                            <li className="">
                                <BiBookAdd />
                                <span>Tin tức</span>
                            </li>
                        </NavLink>
                        <div className="active start"></div>
                    </ul>
                </div>
                <div className="dasb-wapper-main">
                    <div className="dasb-header row">
                        <label htmlFor="tool" className="tool">
                            <FaListUl />
                        </label>
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
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
