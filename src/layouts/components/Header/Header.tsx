import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import {
  Badge,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  styled
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

  const BoxIcon = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: gray;
    & > a {
      color: gray;
    }
    & > span {
      color: gray;
    }
  `;
  const style = {
    position: "absolute",
    top: "00",
    left: "00",
    width: "300px",
    height: "100vh",
    bgcolor: "background.paper",
    borderRight: "1px solid #000",
    boxShadow: 24,
    outline: "none",
    p: 4
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      {!isMediumMD ? (
        <>
          <Grid
            sx={{
              backgroundColor: "#008c89"
            }}
          >
            <Container maxWidth={"xl"}>
              <Image
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2023/FahasaSaleT3_W3_T823_Banner_Header_1263x60.jpg"
                alt="logo"
                width="100%"
                height="61px"
              />
            </Container>
          </Grid>
          <Box
            sx={{
              py: "10px"
            }}
          >
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
                      <Image
                        src="https://cdn0.fahasa.com/media/quiz-game-T7/Avatar_IconApp_SN47_logoSN47_1.png"
                        alt=""
                        width="220px"
                        height="53.77px"
                      />
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
                  >
                    <FormatListBulletedOutlinedIcon
                      onClick={handleOpen}
                      sx={{
                        marginLeft: "auto",
                        width: "36px",
                        height: "36px",
                        color: "gray"
                      }}
                    />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Duis mollis, est non commodo luctus, nisi erat
                          porttitor ligula.
                        </Typography>
                      </Box>
                    </Modal>
                  </Box>
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
                    <TextField
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
                        backgroundColor: "red",
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
                  justifyContent={"space-between"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: "24px"
                  }}
                >
                  <NavLink to={"/"}>
                    <BoxIcon>
                      <VolumeUpOutlinedIcon className="icon" />
                      <Typography variant="caption">Thông báo</Typography>
                    </BoxIcon>
                  </NavLink>
                  <NavLink to={"/cart"}>
                    <BoxIcon>
                      <Badge badgeContent={cart.length} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                      <Typography variant="caption">Giỏ hàng </Typography>
                    </BoxIcon>
                  </NavLink>
                  {user.id ? (
                    <NavLink to={"/user"}>
                      <BoxIcon>
                        <PersonOutlineOutlinedIcon />
                        <Typography variant="caption">Tài khoản </Typography>
                      </BoxIcon>
                    </NavLink>
                  ) : (
                    <NavLink to={"/auth"}>
                      <BoxIcon>
                        <PersonOutlineOutlinedIcon />
                        <Typography variant="caption">Đăng nhập </Typography>
                      </BoxIcon>
                    </NavLink>
                  )}
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "3px"
                    }}
                  >
                    <Image
                      src="	https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/default.svg"
                      width="37px"
                      height="24px"
                      alt=""
                    />
                    <ExpandMoreOutlinedIcon
                      sx={{
                        color: "gray"
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      ) : (
        <>
          <Grid
            sx={{
              py: "10px",
              backgroundColor: "#C92127"
            }}
          >
            <Container>
              <Grid item xs={2}>
                <Link to={"/"}>
                  <Box
                    sx={{
                      mb: "15px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      maxWidth: "220px",
                      mx: "auto"
                    }}
                  >
                    <Image
                      src="https://cdn0.fahasa.com/media/quiz-game-T7/Avatar_IconApp_SN47_logoSN47_1.png"
                      alt=""
                      width="100%"
                      height="53.77px"
                    />
                  </Box>
                </Link>
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Grid
                  item
                  xs={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: "10px"
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "right"
                    }}
                    color={"white"}
                  >
                    <FormatListBulletedOutlinedIcon
                      onClick={handleOpen}
                      sx={{
                        width: "36px",
                        height: "36px"
                      }}
                    />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Duis mollis, est non commodo luctus, nisi erat
                          porttitor ligula.
                        </Typography>
                      </Box>
                    </Modal>
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "5px"
                    }}
                  >
                    <TextField
                      sx={{
                        width: "100%",
                        "& fieldset": { border: "none", width: "100%" }
                      }}
                      placeholder="Tìm kiếm sản phẩm mong muốn..."
                    />
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    pl: "24px",
                    gap: "5px"
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{
                      width: "30px",
                      height: "30px"
                    }}
                  />
                  <PersonOutlineOutlinedIcon
                    sx={{
                      width: "30px",
                      height: "30px"
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </>
      )}
    </Box>
  );
};
export default Header;
