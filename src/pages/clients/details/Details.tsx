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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

export const Details = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const http = new HttpProductController(BaseAPi);
  const [Detail, setDetail] = useState<Product>({});
  const FetchProductOne = async () => {
    if (id) {
      const detailValue = await http.getOne(id);
      console.log(detailValue);
      setDetail(detailValue.product);
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
  }, []);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <Box bgcolor={"#eee"}>
      <Container maxWidth="xl">
        <Stack
          direction={"row"}
          py={1}
          alignItems={"center"}
          textTransform={"uppercase"}
        >
          <Typography variant="caption">{Detail.category?.name}</Typography>
          <ChevronRightOutlinedIcon />
          <Typography variant="caption">{Detail.title}</Typography>
        </Stack>
        <Box pb={2}>
          <Grid container bgcolor={"#fff"} p={3}>
            <Grid item xs={5}>
              <Box mx={"auto"} display={"flex"}>
                <Stack direction={"row"} spacing={2}>
                  <Stack width={"20%"} direction={"column"} spacing={1}>
                    {Detail.productImages
                      ? Detail.productImages.map((e: any, i: number) => {
                          return (
                            <img
                              key={i}
                              src={e.image}
                              alt=""
                              width={"100px"}
                              height={"70px"}
                            />
                          );
                        })
                      : ""}
                  </Stack>
                  <Stack flex={1} justifyContent={"center"} spacing={2}>
                    <img
                      src={Detail.image}
                      alt=""
                      width={"100%"}
                      height={"388px"}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Stack
                direction={"row"}
                spacing={2}
                mx={"auto"}
                textAlign={"center"}
                justifyContent={"center"}
                mt={3}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "red",
                    borderColor: "red",
                  }}
                  onClick={() => handleAddToCart(Detail)}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  onClick={() => handleOrder(Detail)}
                  sx={{
                    fontWeight: "bold",
                  }}
                  variant="contained"
                >
                  Mua ngay
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Box pl={4}>
                <Typography
                  variant="h2"
                  fontSize={"22.1px"}
                  textTransform={"capitalize"}
                  fontWeight={500}
                >
                  {Detail.title}
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
                        {Detail.producer?.name}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{
                        width: "50%",
                      }}
                    >
                      <Typography>Thương hiệu:</Typography>
                      <Typography fontWeight={"bold"}>
                        {Detail.category?.name}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{
                        width: "50%",
                      }}
                    >
                      <Typography>Xuất xứ</Typography>
                      <Typography fontWeight={"bold"}>Việt Nam</Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Box mt={1}>
                  <Rating
                    defaultChecked={true}
                    defaultValue={2}
                    name="read-only"
                    size="medium"
                    readOnly
                  />
                </Box>
                <Box>
                  <Stack direction={"row"} spacing={2} mt={2}>
                    <Typography
                      className="price"
                      color={color.error}
                      fontSize={25}
                      fontWeight={"bold"}
                    >
                      {Detail.price}
                    </Typography>
                    <Typography
                      className="price"
                      fontSize={15}
                      sx={{
                        textDecoration: "underline",
                      }}
                    >
                      {Detail.price_sale}
                    </Typography>

                    <Typography
                      variant="caption"
                      bgcolor={color.error}
                      color={color.white}
                      p={"3px 10px"}
                      borderRadius={"3px"}
                      fontWeight={"bold"}
                    >
                      -5%
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
                    <Stack direction={"row"} spacing={7}>
                      <Typography variant="caption">
                        Thời gian giao hàng
                      </Typography>
                      <Stack>
                        <Stack direction={"row"} spacing={1} sx={{}}>
                          <Typography>Giao hàng đến</Typography>
                          <Typography color="primary" fontWeight={"bold"}>
                            Thay đổi
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"} spacing={7}>
                      <Typography variant="caption">
                        Chính sách đổi trả
                      </Typography>
                      <Stack>
                        <Stack direction={"row"} spacing={1} sx={{}}>
                          <Typography>
                            Đổi trả sản phẩm trong 30 ngày
                          </Typography>
                          <Typography color="primary" fontWeight={"bold"}>
                            Xem thêm
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
                {/* quantity */}
                <Box mt={3}>
                  <Stack direction={"row"} spacing={7}>
                    <Typography
                      variant="caption"
                      fontWeight={"bold"}
                      fontSize={"18px"}
                    >
                      Số lượng
                    </Typography>
                    <Stack>
                      <Stack direction={"row"} spacing={1} sx={{}}>
                        <Stack
                          direction={"row"}
                          spacing={3}
                          border={"1px solid #eee"}
                          p={"3px 10px"}
                          borderRadius={2}
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
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* chi tiet san pham */}
        <Box pb={2}>
          <Box bgcolor={color.white} p={2}>
            <Typography variant="h2" fontWeight={"bold"} fontSize={"18.85px"}>
              Thông tin sản phẩm
            </Typography>
            <Grid container mt={2}>
              <Grid item xs={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                  }}
                >
                  <Typography variant="h3">Mã hàng</Typography>
                  <Typography variant="h3">Tên nhà cung cấp</Typography>
                  <Typography variant="h3">Tác giả</Typography>
                  <Typography variant="h3">Ngôn ngữ</Typography>
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                  }}
                >
                  <Typography variant="h3">{Detail.id}</Typography>
                  <Typography
                    variant="h3"
                    fontWeight={"bold"}
                    color={color.text_second}
                  >
                    {Detail.producer?.name}
                  </Typography>
                  <Typography variant="h3">{Detail.author}</Typography>
                  <Typography variant="h3">Việt Nam</Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="body1" mt={2} fontSize={"15px"}>
              Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành.
              Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng
              mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí
              vận chuyển, phụ phí hàng cồng kềnh,...
            </Typography>
            <Typography variant="body1" color={color.error} mt={1}>
              Chính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống
              Nhà sách Fahasa trên toàn quốc
            </Typography>
            <Box></Box>
          </Box>
        </Box>

        <Box>
          <Box></Box>
        </Box>
      </Container>
    </Box>
  );
};
