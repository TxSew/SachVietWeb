import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { Badge, Grid, Modal, Stack, TextField, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Image from "../../../components/Image/Image";
import { BaseAPi } from "../../../configs/BaseApi";
import useDebounce from "../../../hooks/useDebounce/useDebounce";
import useMedia from "../../../hooks/useMedia/useMedia";
import { RootState } from "../../../redux/storeClient";
import HttpProductController from "../../../submodules/controllers/http/httpProductController";
import { Product } from "../../../submodules/models/ProductModel/Product";
import { User } from "../../../submodules/models/UserModel/User";
import UserModel from "./components/models/UserModel";
const http = new HttpProductController(BaseAPi);
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
  p: 4,
};
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
  borderRadius: "8px",
};
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

  const [open, setOpen] = React.useState<boolean>(false);
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);
  const [pageCount, setPageCount] = React.useState<number>(1);
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<string>("createdAt");
  const [Products, setProducts] = React.useState<Product[]>([] as Product[]);
  const [sortWith, setSortWith] = React.useState("asc");
  const [sort, setSort] = React.useState<string>("");
  const debounce = useDebounce(search, 400);
  const handleChangeValue = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch((pre) => event.target.value);
    if (event.target.value) {
      setPage(1);
    }
  };

  React.useEffect(() => {
    fetchData(page, debounce, sortBy, sortWith);
  }, [page, debounce, sortBy, sortWith]);
  const fetchData = async (
    page: number,
    search: string = debounce || "",
    sortBy: string,
    sortWith: string
  ) => {
    const limit = "6";
    try {
      const ProductData: any = await http.getAll(
        page,
        search,
        sortBy,
        sortWith,
        limit
      );
      const data: any = ProductData.products;
      setPageCount(ProductData.totalPage);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box>
      {!isMediumMD ? (
        <>
          <Grid
            sx={{
              backgroundColor: "#38284F",
            }}
          >
            <Container maxWidth={"xl"}>
              <Image
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/SaleThu3_W3_T1023_banner_Header_1263x60.jpg"
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
                    <FormatListBulletedOutlinedIcon
                      onClick={handleOpen}
                      sx={{
                        marginLeft: "auto",
                        width: "36px",
                        height: "36px",
                        color: "gray",
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
                    position: "relative",
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
                      borderRadius: "5px",
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
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          {" "}
                          <Typography
                            variant="caption"
                            sx={{
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SearchIcon
                              sx={{
                                color: "#0072E5",
                              }}
                            />
                          </Typography>
                          <TextField
                            sx={{
                              "& fieldset": {
                                border: "none",
                                width: "100%",
                              },
                              width: "100%",
                            }}
                            placeholder="Tìm kiếm sản phẩm mong muốn..."
                            autoFocus={true}
                            onInput={handleChangeValue}
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
                                color: "gray",
                              }}
                            >
                              <RefreshIcon
                                style={{
                                  fontSize: "16px",
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
                        <Box padding={"8px 0"}>
                          <Grid container>
                            {Products.slice(0, 6).map((e: any) => {
                              return (
                                <Grid item xs={6} md={4}>
                                  <Link
                                    to={`/products/${e.slug}`}
                                    onClick={handleCloseSearch}
                                  >
                                    <Box display={"fex"} alignItems={"center"}>
                                      <Grid item xs={12} md={3}>
                                        <img src={e.image} alt=""></img>
                                      </Grid>
                                      <Grid
                                        xs={12}
                                        md={9}
                                        item
                                        textAlign={"left"}
                                        paddingLeft={1}
                                      >
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            fontSize: "14px",
                                            color: "black",
                                          }}
                                        >
                                          sản phẩm: {e.title}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: "14px",
                                            color: "black",
                                          }}
                                        >
                                          SL: {e.quantity}
                                        </Typography>
                                      </Grid>
                                    </Box>
                                  </Link>
                                </Grid>
                              );
                            })}
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
                                margin: "0 auto",
                              }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                alt=""
                                width={"50%"}
                                style={{
                                  margin: "0 auto",
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
                                margin: "0 auto",
                              }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                alt=""
                                width={"50%"}
                                style={{
                                  margin: "0 auto",
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
                                margin: "0 auto",
                              }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                alt=""
                                width={"50%"}
                                style={{
                                  margin: "0 auto",
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
                                margin: "0 auto",
                              }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/bookscloud-3fd83.appspot.com/o/imageUpload%2F8934974180968_1.jpg?alt=media&token=9521d720-f7f7-4688-9204-48dc68108bc9"
                                alt=""
                                width={"50%"}
                                style={{
                                  margin: "0 auto",
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
                      <BoxIcon
                        sx={{
                          position: "relative",
                          "&:hover div": {
                            display: "flex",
                          },
                        }}
                      >
                        <PersonOutlineOutlinedIcon />
                        <Typography variant="caption">Tài khoản </Typography>
                        <UserModel />
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
                      onClick={handleOpen}
                      sx={{
                        width: "36px",
                        height: "36px",
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
