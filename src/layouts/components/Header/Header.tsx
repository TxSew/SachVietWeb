import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InfoIcon from "@mui/icons-material/Info";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SellIcon from "@mui/icons-material/Sell";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ShoppingBasketSharpIcon from "@mui/icons-material/ShoppingBasketSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person3Icon from "@mui/icons-material/Person3";
import {
  Avatar,
  Badge,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography/Typography";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Image from "../../../components/Image/Image";
import useMedia from "../../../hooks/useMedia/useMedia";
import { RootState } from "../../../redux/storeClient";
import { useEffect, useState } from "react";
import { User } from "../../../submodules/models/UserModel/User";
import * as React from "react";
import List from "@mui/material/List";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
const Header = () => {
  const [user, setUser] = useState<User>({} as User);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const { isMediumMD } = useMedia();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const getUser = JSON.parse(user!);
    if (getUser) {
      setUser(getUser);
    }
  }, []);

  const styles = {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: "700px",
    bgcolor: "background.paper",
    borderRight: "1px solid #000",
    boxShadow: 24,
    outline: "none",
    p: 4,
    pt: 2,
    borderRadius: "8px"
  };

  const boxmodal = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "35%",
    height: "100%",
    bgcolor: "background.paper",
    borderRight: "1px solid #000",
    boxShadow: 24,
    outline: "none",
    p: 4,
    pt: 2
  };

  const hditem = {
    display: "flex",
    alignItems: "center",
    pt: 2,
    pb: 2,
    color: "#615c5c",
    fonSize: "12px",
    fontWeight: 400,
    fontStyle: "normal",
    lineHieght: "normal"
  };

  const hdicon = {
    mr: 1,
    fontSize: "24px"
  };
  const hdicon_mb = {
    mr: 1,
    fontSize: "24px",
    lineHieght: "normal"
  };

  const nicon = {
    lineHeight: "normal"
  };

  const [openSearch, setOpenSearch] = React.useState(false);

  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box width={"100%"}>
        <Image
          src="https://bookbuy.vn/Images/frontend/sieu-sale-thang-10.jpg"
          alt="logo"
          width="100%"
        />
      </Box>
      {!isMediumMD ? (
        <Box width={"100%"}>
          <Container maxWidth="xl">
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} alignItems={"center"} gap={3}>
                <NavLink to={""}>
                  <Box sx={hditem}>
                    <InfoIcon sx={hdicon} />
                    <Typography fontSize={"12px"} style={nicon}>
                      Trợ giúp
                    </Typography>
                  </Box>
                </NavLink>
                <NavLink to={""}>
                  <Box sx={hditem}>
                    <NewspaperIcon sx={hdicon} />
                    <Typography fontSize={"12px"} style={nicon}>
                      Tin tức
                    </Typography>
                  </Box>
                </NavLink>
                <NavLink to={""}>
                  <Box sx={hditem}>
                    <SellIcon sx={hdicon} />
                    <Typography fontSize={"12px"} style={nicon}>
                      Khuyễn mãi
                    </Typography>
                  </Box>
                </NavLink>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={3}>
                <NavLink to={""}>
                  <Box sx={hditem}>
                    <CardGiftcardIcon sx={hdicon} />
                    <Typography fontSize={"12px"} style={nicon}>
                      Ưu đãi & tiện ích
                    </Typography>
                  </Box>
                </NavLink>
                <NavLink to={""}>
                  <Box sx={hditem}>
                    <ShoppingBasketSharpIcon sx={hdicon} />
                    <Typography fontSize={"12px"} style={nicon}>
                      Kiểm tra đơn hàng
                    </Typography>
                  </Box>
                </NavLink>
                {user.id ? (
                  <NavLink to={""}>
                    <Box sx={hditem}>
                      <HowToRegSharpIcon sx={hdicon} />
                      <Typography fontSize={"12px"} style={nicon}>
                        Tài khoản
                      </Typography>
                    </Box>
                  </NavLink>
                ) : (
                  <Box display={"flex"} gap={2}>
                    <NavLink to={"/auth"}>
                      <Box sx={hditem}>
                        <LoginSharpIcon sx={hdicon} />
                        <Typography fontSize={"12px"} style={nicon}>
                          Đăng nhập
                        </Typography>
                      </Box>
                    </NavLink>
                    <NavLink to={"/auth"}>
                      <Box sx={hditem}>
                        <HowToRegSharpIcon sx={hdicon} />
                        <Typography fontSize={"12px"} style={nicon}>
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
            <Container maxWidth="xl">
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Grid item xs={2}>
                  <Link to={"/"}>
                    <Box
                      sx={{
                        mb: "15px"
                      }}
                    >
                      <Image src="" alt="Logo" width="194px" height="70px" />
                    </Box>
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "right"
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  xs={5.5}
                  sx={{
                    position: "relative"
                  }}
                >
                  <Stack
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #ccc",
                      padding: "3px 10px",
                      borderRadius: "5px"
                    }}
                  >
                    <Modal
                      open={openSearch}
                      onClose={handleCloseSearch}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styles}>
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderBottom: "1px solid #ccc"
                          }}
                        >
                          {" "}
                          <Typography
                            variant="caption"
                            sx={{
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <SearchIcon
                              sx={{
                                color: "#0072E5"
                              }}
                            />
                          </Typography>
                          <TextField
                            sx={{
                              "& fieldset": {
                                border: "none",
                                width: "100%"
                              },
                              width: "100%"
                            }}
                            placeholder="Tìm kiếm sản phẩm mong muốn..."
                          />
                        </Stack>

                        <Box
                          sx={{ padding: "16px 0" }}
                          borderBottom={"1px solid gray"}
                        >
                          <Typography
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            variant="h2"
                          >
                            <Typography
                              variant="h2"
                              display={"block"}
                              paddingBottom={"16px"}
                              textTransform={"uppercase"}
                              fontWeight={"bold"}
                            >
                              Gợi ý (5 sản phẩm)
                            </Typography>
                            <Link
                              to=""
                              // onClick={handleCloseSearch}
                              style={{
                                color: "gray"
                              }}
                            >
                              <RefreshIcon
                                style={{
                                  fontSize: "16px"
                                }}
                              />
                            </Link>
                          </Typography>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Typography>gợi í 1</Typography>
                            <Typography>gợi í 1</Typography>
                            <Typography>gợi í 1</Typography>
                            <Typography>gợi í 1</Typography>
                            <Typography>gợi í 1</Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="h2"
                          display={"block"}
                          padding={"16px 0"}
                          textTransform={"uppercase"}
                          fontWeight={"bold"}
                        >
                          Được tìm kiếm nhiều nhất (6 sản phẩm)
                        </Typography>
                        <Box
                          display={"flex"}
                          textAlign={"center"}
                          alignItems={"center"}
                          padding={"8px 0"}
                        >
                          <Grid item xs={6} md={4}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9923"
                              onClick={handleCloseSearch}
                            >
                              <Box display={"fex"} alignItems={"center"}>
                                <Grid xs={12} md={3}>
                                  <img
                                    src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                    alt=""
                                  ></img>
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={9}
                                  textAlign={"left"}
                                  paddingLeft={1}
                                >
                                  <Typography
                                    sx={{ fontSize: "14px", color: "black" }}
                                  >
                                    Tìm kiếm nâng cao
                                  </Typography>
                                </Grid>
                              </Box>
                            </Link>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9jjjj923"
                              onClick={handleCloseSearch}
                            >
                              <Box display={"fex"} alignItems={"center"}>
                                <Grid xs={12} md={3}>
                                  <img
                                    src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                    alt=""
                                  ></img>
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={9}
                                  textAlign={"left"}
                                  paddingLeft={1}
                                >
                                  <Typography
                                    sx={{ fontSize: "14px", color: "black" }}
                                  >
                                    Tìm kiếm nâng cao
                                  </Typography>
                                </Grid>
                              </Box>
                            </Link>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9jjjj923"
                              onClick={handleCloseSearch}
                            >
                              <Box display={"fex"} alignItems={"center"}>
                                <Grid xs={12} md={3}>
                                  <img
                                    src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                    alt=""
                                  ></img>
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={9}
                                  textAlign={"left"}
                                  paddingLeft={1}
                                >
                                  <Typography
                                    sx={{ fontSize: "14px", color: "black" }}
                                  >
                                    Tìm kiếm nâng cao
                                  </Typography>
                                </Grid>
                              </Box>
                            </Link>
                          </Grid>
                        </Box>
                        <Box
                          display={"flex"}
                          textAlign={"center"}
                          alignItems={"center"}
                          padding={"8px 0"}
                        >
                          <Grid item xs={6} md={4}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9923"
                              onClick={handleCloseSearch}
                            >
                              <Box display={"fex"} alignItems={"center"}>
                                <Grid xs={12} md={3}>
                                  <img
                                    src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                    alt=""
                                  ></img>
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={9}
                                  textAlign={"left"}
                                  paddingLeft={1}
                                >
                                  <Typography
                                    sx={{ fontSize: "14px", color: "black" }}
                                  >
                                    Tìm kiếm nâng cao
                                  </Typography>
                                </Grid>
                              </Box>
                            </Link>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9jjjj923"
                              onClick={handleCloseSearch}
                            >
                              <Box display={"fex"} alignItems={"center"}>
                                <Grid xs={12} md={3}>
                                  <img
                                    src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                    alt=""
                                  ></img>
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={9}
                                  textAlign={"left"}
                                  paddingLeft={1}
                                >
                                  <Typography
                                    sx={{ fontSize: "14px", color: "black" }}
                                  >
                                    Tìm kiếm nâng cao
                                  </Typography>
                                </Grid>
                              </Box>
                            </Link>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9jjjj923"
                              onClick={handleCloseSearch}
                            >
                              <Box display={"fex"} alignItems={"center"}>
                                <Grid xs={12} md={3}>
                                  <img
                                    src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                    alt=""
                                  ></img>
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={9}
                                  textAlign={"left"}
                                  paddingLeft={1}
                                >
                                  <Typography
                                    sx={{ fontSize: "14px", color: "black" }}
                                  >
                                    Tìm kiếm nâng cao
                                  </Typography>
                                </Grid>
                              </Box>
                            </Link>
                          </Grid>
                        </Box>
                        <Typography
                          variant="h2"
                          display={"block"}
                          padding={"16px 0"}
                          textTransform={"uppercase"}
                          fontWeight={"bold"}
                        >
                          Danh mục nổi bật (4 danh mục)
                        </Typography>
                        <Box
                          display={"flex"}
                          textAlign={"center"}
                          alignItems={"center"}
                        >
                          <Grid item xs={6} md={3}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9923"
                              onClick={handleCloseSearch}
                              style={{
                                textAlign: "center",
                                margin: "0 auto"
                              }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                alt=""
                                width={"50%"}
                                style={{
                                  margin: "0 auto"
                                }}
                              />
                              <Typography>Tìm kiếm nâng cao</Typography>
                            </Link>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9923"
                              onClick={handleCloseSearch}
                              style={{
                                textAlign: "center",
                                margin: "0 auto"
                              }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                alt=""
                                width={"50%"}
                                style={{
                                  margin: "0 auto"
                                }}
                              />
                              <Typography>Tìm kiếm nâng cao</Typography>
                            </Link>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9923"
                              onClick={handleCloseSearch}
                              style={{
                                textAlign: "center",
                                margin: "0 auto"
                              }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                alt=""
                                width={"50%"}
                                style={{
                                  margin: "0 auto"
                                }}
                              />
                              <Typography>Tìm kiếm nâng cao</Typography>
                            </Link>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Link
                              to="http://localhost:3000/products/sach99jjj9923"
                              onClick={handleCloseSearch}
                              style={{
                                textAlign: "center",
                                margin: "0 auto"
                              }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                alt=""
                                width={"50%"}
                                style={{
                                  margin: "0 auto"
                                }}
                              />
                              <Typography>Tìm kiếm nâng cao</Typography>
                            </Link>
                          </Grid>
                        </Box>
                      </Box>
                    </Modal>
                    <TextField
                      onClick={handleOpenSearch}
                      sx={{
                        "& fieldset": { border: "none", width: "100%" },
                        width: "100%"
                      }}
                      placeholder="Tìm kiếm sản phẩm mong muốn..."
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        p: "5px 20px",
                        border: "none",
                        backgroundColor: "#008C89",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px"
                      }}
                    >
                      <SearchIcon
                        sx={{
                          color: "#fff"
                        }}
                      />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={3.5}
                  justifyContent={"end"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: "24px"
                  }}
                >
                  <NavLink
                    to={"/lh"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "16px"
                    }}
                  >
                    <PersonOutlineOutlinedIcon
                      sx={{
                        color: "#008C89"
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        pl: 1,
                        textAlign: "center",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                        color: "red"
                      }}
                    >
                      {" "}
                      037412595{" "}
                    </Typography>
                  </NavLink>
                  <NavLink
                    to={"/cart"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "16px"
                    }}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={{
                        color: "#008C89"
                      }}
                    />
                    <Badge badgeContent={cart.length} color="primary">
                      <Typography
                        variant="caption"
                        sx={{
                          pl: 1,
                          color: "#615C5C"
                        }}
                      >
                        Giỏ hàng{" "}
                      </Typography>
                    </Badge>
                  </NavLink>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      ) : (
        <Box
          position={"sticky"}
          top={0}
          left={0}
          sx={{ background: "#e7e7e7", zIndex: "1" }}
        >
          <Container maxWidth={"xl"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              padding={" 8px 0"}
              color={"white"}
            >
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Box
                  color={"#333"}
                  sx={{
                    cursor: "pointer"
                  }}
                >
                  <Modal
                    open={openSearch}
                    onClose={handleCloseSearch}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={boxmodal}>
                      <List>T</List>
                      <List>T</List>
                    </Box>
                  </Modal>
                  <MenuIcon onClick={handleOpenSearch} />
                </Box>
                <NavLink
                  to={"/"}
                  style={{
                    cursor: "pointer"
                  }}
                >
                  <Image
                    src="https://bookbuy.vn/Images/frontend/base/mobile/logo-new.png"
                    alt="logo"
                    width="100px"
                    height="24px"
                  />
                </NavLink>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                lineHeight={"normal"}
                gap={2}
              >
                <NavLink
                  to={"/cart"}
                  style={{
                    cursor: "pointer",
                    color: "#F7941E"
                  }}
                >
                  <Badge badgeContent={cart.length} color="primary">
                    <ShoppingCartIcon sx={hdicon_mb} />
                  </Badge>
                </NavLink>
                {user.id ? (
                  <NavLink
                    to={"/user"}
                    style={{
                      cursor: "pointer",
                      color: "#F7941E"
                    }}
                  >
                    <Person3Icon sx={hdicon_mb} />
                  </NavLink>
                ) : (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center"
                      }}
                    >
                      <Tooltip title="Account settings">
                        <IconButton
                          onClick={handleClick}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              background: "#F7941E",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center"
                            }}
                          >
                            <Person3Icon
                              sx={hdicon_mb}
                              style={{
                                margin: "0 auto"
                              }}
                            />
                          </Avatar>
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
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
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};
export default Header;
