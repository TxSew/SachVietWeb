import {
  Box,
  Button,
  Container,
  Grid,
  ListItem,
  Stack,
  Typography
} from "@mui/material";
import Image from "../../../components/Image/Image";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import StackCustom from "../../../components/CustomComponents/Stack/StackCustom";
import { color } from "../../../Theme/color";
import useMedia from "../../../hooks/useMedia/useMedia";
import { Link, NavLink } from "react-router-dom";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";

function Footer() {
  const { isMediumMD } = useMedia();
  const ftItemhd = {
    padding: "24px 16px 0",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "black"
  };
  const ftItem = {
    fontSize: "13px",
    textTransform: "capitalize",
    color: "black"
  };
  const ftItemhdmb = {
    padding: "24px 0 0",
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "black"
  };
  const ftItemmb = {
    fontSize: "13px",
    textTransform: "capitalize",
    color: "black",
    padding: "4px 0"
  };

  return (
    <Grid bgcolor={"#eee"}>
      <Stack bgcolor={"#ccc"}>
        <Box display={"flex"} alignItems={"center"} p={2} gap={"48px"}>
          <Stack
            display={"flex"}
            direction={"row"}
            spacing={2}
            fontSize={"48px"}
            style={{
              color: "white"
            }}
          >
            <EmailIcon />
            <Typography fontSize={"20px"} fontWeight={"bold"}>
              Đăng ký nhận bản tin
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            border={"1px solid #eee"}
            spacing={2}
            p={1}
            borderRadius={2}
            fontSize={"14px"}
            color={"#F39801"}
            bgcolor={"#fff"}
            width={"566px"}
          >
            <input
              placeholder="Nhập email của bạn!"
              style={{
                flex: 1,
                color: "#F39801",
                fontSize: "16px"
              }}
            />
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #F39801",
                background: "#F39801",
                color: "#FFF",
                "&:hover": {
                  border: "1px solid #008C89",
                  color: "#008C89"
                }
              }}
            >
              <Typography variant="body1">Đăng ký</Typography>
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box
        bgcolor={color.white}
        p={4}
        sx={{ maxWidth: "100%" }}
        margin={"auto"}
      >
        <Grid container>
          <Grid item xs={12} md={4} sm={12}>
            <Box
              sx={{
                paddingRight: "20px",
                borderRight: "1px solid #eee"
              }}
            >
              <Image
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
                width="250px"
                height="100%"
                alt=""
              />
              <Box mt={2}>
                <Typography variant="body1" fontSize={13} textAlign={"left"}>
                  Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM
                </Typography>
                <Typography fontSize={13} variant="caption" color="initial">
                  Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA
                </Typography>
                <Typography variant="caption" fontSize={13} color="initial">
                  60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: "20px"
                }}
              >
                <Typography variant="subtitle1" color="initial" fontSize={13}>
                  Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi.
                  KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng
                  như tất cả Hệ Thống Fahasa trên toàn quốc
                </Typography>
              </Box>
              {/* lis6 icon */}

              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px"
                }}
                color={"gray"}
              >
                <FacebookIcon />
                <InstagramIcon />
              </Stack>
              <StackCustom mt={"10px"} gap={3}>
                <Image
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                  alt=""
                  width="100px"
                  height="30px"
                />
                <Image
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                  alt=""
                  width="100px"
                  height="30px"
                />
              </StackCustom>
            </Box>
          </Grid>

          {isMediumMD ? (
            <Grid item xs={12} md={8} sm={12} display={"flex"} container>
              <Grid md={4} xs={6}>
                {" "}
                <Typography sx={ftItemhdmb} variant="h2">
                  tài khoản của tôi
                </Typography>
                <List>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={"/auth"}
                    >
                      Đăng nhập /
                    </NavLink>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={"/auth"}
                    >
                      Đăng ký{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Thay đổi địa chỉ khách hàng{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Chi tiết tài khoản{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Lịch sử mua hàng{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      {" "}
                    </NavLink>
                  </ListItem>
                </List>
              </Grid>
              <Grid md={4} xs={6}>
                {" "}
                <Typography sx={ftItemhdmb} variant="h2">
                  Trang chủ
                </Typography>
                <List>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Danh mục
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Văn học{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Tâm lý - kỹ năng
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Nuôi dạy con
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Ngoại ngữ
                    </NavLink>
                  </ListItem>
                </List>
              </Grid>
              <Grid md={4} xs={12}>
                <Typography sx={ftItemhdmb} variant="h2">
                  Liên Hệ
                </Typography>
                <List>
                  <ListItem sx={ftItemmb}>
                    <LocationOnIcon />
                    <Typography sx={{ cursor: "pointer" }} px={1}>
                      259, Hà Huy Tập Tân Lợi, TP. BMT
                    </Typography>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <MailIcon />
                    <Typography sx={{ cursor: "pointer" }} px={1}>
                      cskh@sachviet.com.vn
                    </Typography>
                  </ListItem>
                  <ListItem sx={ftItemmb}>
                    <LocalPhoneIcon />
                    <Typography sx={{ cursor: "pointer" }} px={1}>
                      0378529323
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} md={8} display={"flex"} pl={3} container>
              <Grid md={5} xs={6} sm={6}>
                <Typography sx={ftItemhd} variant="h2">
                  Liên Hệ
                </Typography>
                <List>
                  <ListItem sx={ftItem}>
                    <LocationOnIcon />
                    <Typography sx={{ cursor: "pointer" }} px={1}>
                      259, Hà Huy Tập Tân Lợi, TP. BMT
                    </Typography>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <MailIcon />
                    <Typography sx={{ cursor: "pointer" }} px={1}>
                      cskh@sachviet.com.vn
                    </Typography>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <LocalPhoneIcon />
                    <Typography sx={{ cursor: "pointer" }} px={1}>
                      0378529323
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid md={3.5} xs={6} sm={6}>
                {" "}
                <Typography sx={ftItemhd} variant="h2">
                  Trang chủ
                </Typography>
                <List>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Danh mục
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Văn học{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Tâm lý - kỹ năng
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Nuôi dạy con
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Ngoại ngữ
                    </NavLink>
                  </ListItem>
                </List>
              </Grid>
              <Grid md={3.5} xs={12} sm={12}>
                {" "}
                <Typography sx={ftItemhd} variant="h2">
                  tài khoản của tôi
                </Typography>
                <List>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={"/auth"}
                    >
                      Đăng nhập
                    </NavLink>
                    <Typography>/ </Typography>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={"/auth"}
                    >
                      Đăng ký{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Thay đổi địa chỉ khách hàng{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Chi tiết tài khoản{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      Lịch sử mua hàng{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem sx={ftItem}>
                    <NavLink
                      style={{
                        color: "black"
                      }}
                      to={""}
                    >
                      {" "}
                    </NavLink>
                  </ListItem>
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
