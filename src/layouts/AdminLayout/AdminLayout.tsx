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
import {
  Avatar,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip
} from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" }
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
          <ul className="">
            <NavLink to="/admin/statistical">
              <li className="">
                <i>
                  <FaHome />
                </i>
                <span>Trang chủ</span>
              </li>
            </NavLink>
            <NavLink to="/admin/category">
              <li className="">
                <i>
                  <BiSolidCategoryAlt />
                </i>
                <span>Danh mục</span>
              </li>
            </NavLink>
            <NavLink to="/admin/product">
              <li className="">
                <i>
                  <FaBookOpen />
                </i>
                <span>Sản phẩm</span>
              </li>
            </NavLink>
            <NavLink to="/admin/orders">
              <li className="">
                <i>
                  <FaBookOpen />
                </i>
                <span>Đơn hàng</span>
              </li>
            </NavLink>
            <NavLink to="/admin/producer">
              <li className="">
                <i>
                  <BiBookAdd />
                </i>
                <span>Cung cấp</span>
              </li>
            </NavLink>
            <NavLink to="/admin/discount">
              <li className="">
                <i>
                  <BiBookAdd />
                </i>
                <span>Giảm giá</span>
              </li>
            </NavLink>
            <NavLink to="/admin/customer">
              <li className="">
                <i>
                  <BiBookAdd />
                </i>
                <span>Khách hàng</span>
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
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "0 16px"
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
                      mr: 1
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
                      zIndex: 0
                    }
                  }
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
