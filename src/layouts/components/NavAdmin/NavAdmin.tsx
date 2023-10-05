import CategoryIcon from "@mui/icons-material/Category";
import DiscountIcon from "@mui/icons-material/Discount";
import SendIcon from "@mui/icons-material/Send";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Stack } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { color } from "../../../Theme/color";

export default function NavAdmin() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box height={"100%"} bgcolor={"#33333"}>
      <List
        sx={{ maxWidth: 360, bgcolor: color.navAdmin_color }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Tổng quan
          </ListSubheader>
        }
      >
        <Link to={"/admin/statistical"}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <DiscountIcon />
              <ListItemText primary="Thống kê" />
            </Stack>
          </ListItemButton>
        </Link>
      </List>

      <List
        sx={{ maxWidth: 360, bgcolor: color.navAdmin_color, color: "#fff" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Quản lý sản phẩm
          </ListSubheader>
        }
      >
        <NavLink to={"/admin/product"} color={color.white}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <SendIcon />
              <ListItemText color="#fff" primary="Sản phẩm" />
            </Stack>
          </ListItemButton>
        </NavLink>
        <NavLink to={"/admin/category"}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <CategoryIcon />
              <ListItemText primary="Danh mục" />
            </Stack>
          </ListItemButton>
        </NavLink>
        <NavLink to={"/admin/producer"}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <SupervisedUserCircleIcon />
              <ListItemText primary="Nhà cung cấp" />
            </Stack>
          </ListItemButton>
        </NavLink>
      </List>

      <List
        sx={{ maxWidth: 360, bgcolor: "#ccc" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Quản lý đơn hàng
          </ListSubheader>
        }
      >
        <Link to={"/admin/discount"}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <DiscountIcon />
              <ListItemText primary="Mã giảm giá" />
            </Stack>
          </ListItemButton>
        </Link>
        <Link to={"/admin/orders"} color={color.white}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <ShoppingBasketIcon />
              <ListItemText color="white" primary="Đơn hàng" />
            </Stack>
          </ListItemButton>
        </Link>
        <Link to={"/admin/customer"}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <DiscountIcon />
              <ListItemText primary="Khách hàng" />
            </Stack>
          </ListItemButton>
        </Link>
      </List>
      <List
        sx={{ maxWidth: 360, bgcolor: color.navAdmin_color }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Cài đặt
          </ListSubheader>
        }
      >
        <Link to={"/admin/discount"}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <SettingsIcon />
              <ListItemText primary="Hệ thống" />
            </Stack>
          </ListItemButton>
        </Link>
        <Link to={"/"}>
          <ListItemButton>
            <Stack direction={"row"} spacing={4} color={color.text_color}>
              <ShoppingBasketIcon />
              <ListItemText primary="Thoát" />
            </Stack>
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
}
