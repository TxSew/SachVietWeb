import React from "react";
import { BiBookAdd, BiSolidCategoryAlt } from "react-icons/bi";
import { FaBookOpen, FaHome, FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./style.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DiscountIcon from "@mui/icons-material/Discount";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
} from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

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
            <h1>MUI</h1>
          </div>
          <ul className="k">
            <li
              className=""
              style={{
                borderBottom: "1px solid #eee",
              }}
            >
              <NavLink to="/admin/statistical">
                <i>
                  <BarChartIcon />
                </i>
                <span>Thống kê</span>
              </NavLink>
            </li>
            <li
              className=""
              style={{
                borderBottom: "1px solid #eee",
              }}
            >
              <NavLink to="/admin/producer">
                <i>
                  <PersonAddIcon />
                </i>
                <span>Nhà xuất bản</span>
              </NavLink>
            </li>
            <li
              className=""
              style={{
                borderBottom: "1px solid #eee",
              }}
            >
              <NavLink to="../admin/category">
                <i>
                  <BiSolidCategoryAlt />
                </i>
                <span>Danh mục</span>
              </NavLink>
            </li>
            <li
              className=""
              style={{
                borderBottom: "1px solid #eee",
              }}
            >
              <NavLink to="../admin/product">
                <i>
                  <FaBookOpen />
                </i>
                <span>Sản phẩm</span>
              </NavLink>
            </li>
            <li
              className=""
              style={{
                borderBottom: "1px solid #eee",
              }}
            >
              <NavLink to="/admin/orders">
                <i>
                  <ShoppingBasketIcon />
                </i>
                <span>Đơn hàng</span>
              </NavLink>
            </li>
            <li
              className=""
              style={{
                borderBottom: "1px solid #eee",
              }}
            >
              <NavLink to="/admin/discount">
                <i>
                  <DiscountIcon />
                </i>
                <span>Mã giảm giá</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/admin/customer">
                <i>
                  <GroupIcon />
                </i>
                <span>Khách hàng</span>
              </NavLink>
            </li>
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
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "0 16px",
                }}
              >
                <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={openpro ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openpro ? "true" : undefined}
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
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
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
            <Box sx={{}}>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "fixed", bottom: 160, right: 24 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
