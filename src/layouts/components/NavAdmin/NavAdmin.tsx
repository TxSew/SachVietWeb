import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DiscountIcon from '@mui/icons-material/Discount';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { color } from '../../../Theme/color';

export default function NavAdmin() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
     <>

<List
      sx={{ maxWidth: 360, bgcolor:  "#282727"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader"  sx={{
           fontSize:"20px", 
            fontWeight:"bold"
        }}>
        Tổng quan
        </ListSubheader>
      }
    >
    
         <Link to={'/'}>
      <ListItemButton>
        <Stack direction={"row"} spacing={4} color={color.text_color}>
          <DiscountIcon/>
        <ListItemText primary="Thống kê" />
        </Stack>
      </ListItemButton>
         </Link> 
    </List>


    <List
      sx={{ maxWidth: 360, bgcolor: '#282727',  color:"#fff"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader"  sx={{
           fontSize:"20px",
            fontWeight:"bold"
        }}>
          Quản lý sản phẩm
        </ListSubheader>
      }
    >
        <Link to={'/'} color={color.text_color}>
      <ListItemButton>
        <Stack direction={"row"} spacing={4} color={color.text_color}>
          <SendIcon color='inherit' />
        <ListItemText color='white' primary="Sản phẩm" />
        </Stack>
      </ListItemButton>
         </Link>
         <Link to={'/'}>
      <ListItemButton>
        <Stack direction={"row"} spacing={4} color={color.text_color}>
          <CategoryIcon/>
        <ListItemText primary="Danh mục" />
        </Stack>
      </ListItemButton>
         </Link>
      <Link to={'/'}>
      <ListItemButton>
        <Stack direction={"row"} spacing={4} color={color.text_color}>
          <SupervisedUserCircleIcon/>
        <ListItemText primary="Nhà cung cấp" />
        </Stack>
      </ListItemButton>
         </Link>
    
    </List>
     

    <List
      sx={{ maxWidth: 360, bgcolor:  "#282727"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader"  sx={{
           fontSize:"20px", 
            fontWeight:"bold"
        }}>
          Quản lý đơn hàng
        </ListSubheader>
      }
    >
        <Link to={'/'}>
      <ListItemButton>
        <Stack direction={"row"} spacing={4} color={color.text_color}>
          <DiscountIcon/>
        <ListItemText primary="Mã giảm giá" />
        </Stack>
      </ListItemButton>
         </Link>
         <Link to={'/'}>
      <ListItemButton>
        <Stack direction={"row"} spacing={4} color={color.text_color}>
          <ShoppingBasketIcon/>
        <ListItemText primary="Đơn hàng" />
        </Stack>
      </ListItemButton>
         </Link> 
         <Link to={'/'}>
      <ListItemButton>
        <Stack direction={"row"} spacing={4} color={color.text_color}>
          <DiscountIcon/>
        <ListItemText primary="Khách hàng" />
        </Stack>
      </ListItemButton>
         </Link> 
    </List>
     </>
  );
}