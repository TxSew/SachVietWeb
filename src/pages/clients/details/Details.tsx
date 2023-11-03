import AddIcon from "@mui/icons-material/Add";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import { addToCart } from "../../../redux/features/cart/CartProducer";
import {
  decrement,
  increment,
} from "../../../redux/features/counter/CounterProducer";
import { RootState } from "../../../redux/storeClient";
import HttpProductController from "../../../submodules/controllers/http/httpProductController";
import { Product } from "../../../submodules/models/ProductModel/Product";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { numberFormat } from "../../../helpers/formatPrice";
import styled from "@emotion/styled";
import useMedia from "../../../hooks/useMedia/useMedia";
const http = new HttpProductController(BaseAPi);
export const Details = () => {
  const { isMediumMD } = useMedia();

  const [RelatedProduct, setRelatedProduct] = useState<Product[]>([]);
  const redirect = useNavigate();
  const { id } = useParams();
  const [Detail, setDetail] = useState<Product>({});
  const Id: any = id;
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);
  const FetchProductOne = async () => {
    try {
      const detailValue = await http.getOne(Id);
      if (detailValue) {
      }
      setDetail(detailValue.product);
      setRelatedProduct(detailValue.relatedProducts);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddToCart = (detail: any) => {
    dispatch(addToCart(detail));
  };
  const handleOrder = (detail: any) => {
    dispatch(addToCart(detail));
    redirect("/cart");
  };
  useEffect(() => {
    FetchProductOne();
  }, [id]);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#f5f5f5",
      color: "#fff",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "none",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: "none",
    },
  }));
  const htmlContent = Detail ? Detail.desc : ""; // Ha
  return (
    <Box bgcolor={"#eee"}>
      <Container maxWidth="xl">
        <Stack
          direction={"row"}
          py={1}
          alignItems={"center"}
          textTransform={"uppercase"}
        >
          <Typography variant="caption">{Detail?.category?.name}</Typography>
          <ChevronRightOutlinedIcon />
          <Typography variant="caption">{Detail?.title}</Typography>
        </Stack>
        <Box pb={2}>
          <Grid container bgcolor={"#fff"} p={2}>
            <Grid item xs={12} md={5} pb={3}>
              <Box mx={"auto"} display={"flex"}>
                <Grid container display={"flex"} margin={"auto"} spacing={2}>
                  {!isMediumMD ? (
                    <Grid
                      direction={"column"}
                      xs={12}
                      md={3}
                      spacing={1}
                      margin={"auto"}
                      p={2}
                    >
                      {Detail?.productImages
                        ? Detail?.productImages.map((e: any, i: number) => {
                            return (
                              <img
                                key={i}
                                src={e.image}
                                alt=""
                                width={"100px"}
                              />
                            );
                          })
                        : ""}
                    </Grid>
                  ) : (
                    <></>
                  )}
                  {!isMediumMD ? (
                    <Grid
                      justifyContent={"center"}
                      xs={12}
                      md={9}
                      spacing={2}
                      p={2}
                    >
                      <Box sx={{ padding: "0 64px 0 0" }}>
                        <img
                          src={Detail?.image}
                          id={`/products/${Detail.slug}`}
                          alt=""
                          width={"100%"}
                          height={"255px"}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </Grid>
                  ) : (
                    <Grid justifyContent={"center"} xs={12} md={9} spacing={2}>
                      <Box sx={{ padding: "0 64px" }}>
                        <img
                          src={Detail?.image}
                          id={`/products/${Detail.slug}`}
                          alt=""
                          width={"100%"}
                        />
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
              <Stack
                direction={"row"}
                spacing={2}
                mx={"auto"}
                textAlign={"center"}
                justifyContent={"center"}
                mt={3}
              >
                {isMediumMD ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#F7941E",
                        borderColor: "#F7941E",
                        fontWeight: "bold",
                        "&:hover": {
                          borderColor: "#008C89",
                          backgroundColor: "#008C89",
                          color: "white",
                        },
                      }}
                      onClick={() => handleAddToCart(Detail)}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                    <Button
                      onClick={() => handleOrder(Detail)}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#008C89",
                        "&:hover": {
                          backgroundColor: "#F7941E",
                          color: "white",
                        },
                      }}
                      variant="containedGreen"
                    >
                      Mua ngay
                    </Button>
                  </>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box p={2}>
                <Typography
                  variant="h2"
                  fontSize={"22.1px"}
                  textTransform={"capitalize"}
                  fontWeight={500}
                  sx={{ textTransform: "capitalize" }}
                >
                  {Detail?.title}
                </Typography>
                <Box mt={3}>
                  <Stack
                    rowGap={2}
                    direction={"row"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{
                        width: "50%",
                      }}
                    >
                      <Typography>Nhà cung cấp:</Typography>
                      <Typography fontWeight={"bold"} color={"primary"}>
                        <NavLink
                          to=""
                          style={{
                            color: "#1976D2",
                          }}
                        >
                          {Detail?.producer?.name}
                        </NavLink>
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{
                        width: "50%",
                      }}
                    >
                      <Typography>Tác giả:</Typography>
                      <Typography fontWeight={"bold"}>
                        <NavLink
                          to=""
                          style={{
                            color: "#1976D2",
                          }}
                        >
                          {Detail?.category?.name}
                        </NavLink>
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{
                        width: "50%",
                      }}
                    >
                      <Typography>Nhà xuất bản</Typography>
                      <Typography fontWeight={"bold"}>
                        <NavLink
                          to=""
                          style={{
                            color: "#1976D2",
                          }}
                        >
                          ?
                        </NavLink>
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{
                        width: "50%",
                      }}
                    >
                      <Typography>Hình thức bìa:</Typography>
                      <Typography fontWeight={"bold"}>
                        <NavLink
                          to=""
                          style={{
                            color: "#1976D2",
                          }}
                        >
                          {Detail?.category?.name}
                        </NavLink>
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Box mt={1}>
                  <Rating
                    name="custom-rating-filter-operator"
                    defaultChecked={true}
                    defaultValue={2}
                    size="medium"
                    precision={0.5}
                    readOnly
                  />
                </Box>
                <Box>
                  <Stack direction={"row"} spacing={2} mt={2}>
                    <Typography
                      className="price"
                      color={color.price}
                      fontSize={25}
                      fontWeight={"bold"}
                    >
                      {`${numberFormat(Number(Detail.price_sale))} `}
                    </Typography>
                    <Typography
                      className="price"
                      fontSize={15}
                      sx={{
                        textDecoration: "line-through",
                      }}
                    >
                      {`${numberFormat(Number(Detail.price))} `}
                    </Typography>

                    <Typography
                      variant="caption"
                      bgcolor={color.sale}
                      color={color.white}
                      p={"3px 10px"}
                      borderRadius={"3px"}
                    >
                      {`-${Detail?.sale}%`}
                    </Typography>
                  </Stack>
                </Box>
                {/* order by */}
                <Box>
                  <Box
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 1,
                    }}
                  >
                    <Grid direction={"row"} display={"flex"} spacing={7}>
                      <Grid xs={4}>
                        <Typography variant="caption">
                          Thời gian giao hàng
                        </Typography>
                      </Grid>
                      <Grid xs={8} display={"flex"} gap={1}>
                        <Typography>Giao hàng đến</Typography>
                        <Typography color="primary" fontWeight={"bold"}>
                          Thay đổi
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      direction={"row"}
                      display={"flex"}
                      alignItems={"center"}
                      spacing={7}
                    >
                      <Grid xs={4}>
                        <Typography variant="caption">
                          Chính sách đổi trả
                        </Typography>
                      </Grid>
                      <Grid xs={8} display={"flex"} gap={1}>
                        <Typography>Đổi trả sản phẩm trong 30 ngày</Typography>
                        <Typography color="primary" fontWeight={"bold"}>
                          Xem thêm
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                {/* quantity */}
                {!isMediumMD ? (
                  <Box mt={3}>
                    <Grid direction={"row"} display={"flex"} spacing={7}>
                      <Grid xs={4}>
                        <Typography
                          variant="caption"
                          fontWeight={"bold"}
                          fontSize={"18px"}
                        >
                          Số lượng
                        </Typography>
                      </Grid>
                      <Grid xs={8}>
                        <Stack direction={"row"} sx={{}}>
                          <Stack
                            direction={"row"}
                            spacing={3}
                            border={"1px solid #eee"}
                            p={"3px 12px"}
                            borderRadius={"5px"}
                          >
                            <RemoveIcon
                              onClick={() => dispatch(decrement())}
                              sx={{
                                fontSize: "17px",
                              }}
                            />
                            <Typography variant="caption">{count}</Typography>
                            <AddIcon
                              onClick={() => dispatch(increment())}
                              sx={{
                                fontSize: "17px",
                              }}
                            />
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <Box
                    position={"fixed"}
                    bottom={0}
                    left={0}
                    width={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{
                      background: "#008C89",
                      zIndex: "1",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={3}
                      p={"16px 8px"}
                      borderRight={"1px solid white"}
                    >
                      <RemoveIcon
                        onClick={() => dispatch(decrement())}
                        sx={{
                          fontSize: "20px",
                          color: "whitesmoke",
                          cursor: "pointer",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "white",
                          width: "30px",
                          textAlign: "center",
                        }}
                        variant="caption"
                      >
                        {count}
                      </Typography>
                      <AddIcon
                        onClick={() => dispatch(increment())}
                        sx={{
                          fontSize: "20px",
                          color: "whitesmoke",
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                        padding: "16px 24px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAddToCart(Detail)}
                    >
                      Thêm vào giỏ hàng
                    </Typography>
                    <Button
                      sx={{
                        padding: "16px 24px",
                        borderRadius: "0",
                        backgroundColor: "#F7941E",
                        boxShadow: "none",
                        "&:hover": {
                          opacity: "0.9",
                          boxShadow: "none",
                          backgroundColor: "#F7941E",
                        },
                      }}
                      onClick={() => handleOrder(Detail)}
                    >
                      Mua ngay
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* chi tiet san pham */}
        <Box pb={2}>
          <Box
            bgcolor={color.white}
            sx={{
              p: 2,
              pt: 0,
            }}
          >
            <Typography
              variant="h2"
              fontSize={"18px"}
              textTransform={"uppercase"}
              sx={{
                p: "16px 0",
              }}
            >
              Thông tin chi tiết
            </Typography>
            <Table
              sx={{ border: "1px solid #CCCCCC" }}
              aria-label="customized table"
            >
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Nhà sản xuất:
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {Detail?.title}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Nhà xuất bản:
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    a
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Nhà phát hành:
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    a
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Kích thước:
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    a
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Số trang:
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    a
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Trọng lượng:
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    a
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Box>
          <Box
            bgcolor={color.white}
            sx={{
              p: 2,
              pt: 0,
            }}
          >
            <Typography
              variant="h2"
              fontSize={"18px"}
              textTransform={"uppercase"}
              sx={{
                p: "16px 0",
              }}
            >
              Giới thiệu sản phẩm
            </Typography>
            <Box p="2" textAlign={"center"}>
              <Typography
                textAlign={"center"}
                fontSize={"16px"}
                color={"#F7941E"}
                textTransform={"capitalize"}
                fontWeight={"bold"}
                p={2}
                variant="h2"
              >
                {Detail?.title}
              </Typography>
              <div
                style={{
                  fontSize: "14px",
                }}
                dangerouslySetInnerHTML={{
                  __html: htmlContent as unknown as TrustedHTML,
                }}
              />

              <Button
                style={{
                  padding: "4px 48px",
                  margin: "16px 0",
                  textAlign: "center",
                  background: "#F7941E",
                }}
              >
                Mua ngay
              </Button>
            </Box>
          </Box>
        </Box>
        <Box pb={2}>
          <Box bgcolor={color.white} p={2}>
            <Typography variant="h2" fontWeight={"bold"} fontSize={"18.85px"}>
              Sản phẩm liên quan
            </Typography>
            <Grid container mt={2}>
              {RelatedProduct.map((e) => {
                return (
                  <Grid xs={2} item>
                    <ProductItem products={e} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
