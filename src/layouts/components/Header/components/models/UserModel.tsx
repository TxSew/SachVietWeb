import CardMembershipIcon from "@mui/icons-material/CardMembership";
import LogoutIcon from "@mui/icons-material/Logout";
import WalletIcon from "@mui/icons-material/Wallet";
import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function UserModel() {
  return (
    <Box
      sx={{
        width: "300px",
        display: "none",
        position: "absolute",
        zIndex: 100,
        top: "calc(100% + 22px)",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        right: "1%",
        borderRadius: "5px",
        "&:before": {
          content: '""',
          position: "absolute",
          top: "-20px",
          backgroundColor: "transparent",
          zIndex: 100,
          width: "100%",
          height: "30px",
        },
      }}
    >
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: "5px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          sx={{
            borderBottom: "1px solid #eee",
            fontWeight: "bold",
          }}
        >
          <ListItemAvatar>
            <Avatar src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/392x156_sacombank.jpg"></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Thành viên Fahasa"
            sx={{
              fontWeight: "bold",
            }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderBottom: "1px solid #eee",
            fontWeight: "bold",
          }}
        >
          <ListItemIcon>
            <CardMembershipIcon />
          </ListItemIcon>
          <ListItemText primary="Đơn hàng của tôi" />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderBottom: "1px solid #eee",
            fontWeight: "bold",
          }}
        >
          <ListItemIcon>
            <WalletIcon />
          </ListItemIcon>
          <ListItemText primary="Wallet Voucher" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Thoát tài khoản" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default UserModel;
