import Box from "@mui/material/Box";
import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography/Typography";
import Image from "../../../components/Image/Image";
import { Badge, Grid, Stack, styled, TextField } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import useMedia from "../../../hooks/useMedia/useMedia";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/storeClient";
import { getTotal } from "../../../redux/features/cart/CartProducer";
const Header = () => {
  
  const count = useSelector((state: RootState) => state.counter.value);
 
  const { isMediumMD } = useMedia();
  console.log(isMediumMD);
  const BoxIcon = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > a {
      color: gray;
    }
    & > span {
      color: gray;
    }
  `;
  return (
    <Box>
      {!isMediumMD ? (
        <>
          <Grid
            sx={{
              backgroundColor: "#008c89",
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
              py: "10px",
            }}
          >
            <Container maxWidth="xl">
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Grid item xs={2}>
                  <Link to={"/"}>
                    <Box
                      sx={{
                        mb: "15px",
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
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "right",
                    }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FormatListBulletedOutlinedIcon
                        sx={{
                          marginLeft: "auto",
                          width: "36px",
                          height: "36px",
                          color: "gray",
                        }}
                      />
                      <ExpandMoreOutlinedIcon
                        sx={{
                          color: "gray",
                        }}
                      />
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={5.5}>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #ccc",
                      padding: "3px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    <TextField
                      sx={{
                        "& fieldset": { border: "none", width: "100%" },
                        width: "100%",
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
                        borderRadius: "5px",
                      }}
                    >
                      <SearchIcon
                        sx={{
                          color: "#fff",
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
                    pl: "24px",
                  }}
                >
                  <BoxIcon>
                    <NavLink to={"/"}>
                      <VolumeUpOutlinedIcon />
                    </NavLink>
                    <Typography variant="caption">Thông báo</Typography>
                  </BoxIcon>
                  <BoxIcon>
                    <NavLink to={"/cart"}>
                    <Badge badgeContent={count} color="primary">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                    </NavLink>
                    <Typography variant="caption">Giỏ hàng </Typography>
                  </BoxIcon>
                  <BoxIcon>
                    <NavLink to={"/auth"}>
                      <PersonOutlineOutlinedIcon />
                    </NavLink>
                    <Typography variant="caption">Tài khoản </Typography>
                  </BoxIcon>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
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
                        color: "gray",
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
              backgroundColor: "#C92127",
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
                      mx: "auto",
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
                  alignItems: "center",
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
                    paddingRight: "10px",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "right",
                    }}
                    color={"white"}
                  >
                    <FormatListBulletedOutlinedIcon
                      sx={{
                        width: "36px",
                        height: "36px",
                      }}
                    />
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
                      borderRadius: "5px",
                    }}
                  >
                    <TextField
                      sx={{
                        width: "100%",
                        "& fieldset": { border: "none", width: "100%" },
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
                    gap: "5px",
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <PersonOutlineOutlinedIcon
                    sx={{
                      width: "30px",
                      height: "30px",
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
