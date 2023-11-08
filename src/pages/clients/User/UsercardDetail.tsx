import {
  Box,
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { color } from "../../../Theme/color";
import NavUser from "./layout/NavUser";
import { numberFormat } from "../../../helpers/formatPrice";
import { useParams } from "react-router-dom";
import HttpCartController from "../../../submodules/controllers/http/httpCartController";
import { BaseAPi } from "../../../configs/BaseApi";
import { useEffect, useState } from "react";
const http = new HttpCartController(BaseAPi);
function UserCartDetail() {
  const { id } = useParams();
  const [orderCurrent, setOrderCurrent] = useState<any>([]);
  useEffect(() => {
    getOrderUser();
  }, []);

  const getOrderUser = async () => {
    const orderByUser = await http.getOrderbyUser(Number(id));
    if (orderByUser) setOrderCurrent(orderByUser[0].orderDetail);
  };
  return (
    <NavUser>
      <Box
        sx={{
          marginTop: "18px",
        }}
      >
        <Grid
          container
          maxWidth="xl"
          sx={{
            backgroundColor: color.white,
            padding: "20px",
          }}
        >
          <Grid item xs={9}>
            <Box>
              <Typography
                variant="h2"
                fontSize={"25px"}
                fontWeight={"bold"}
                pt={"20px"}
              >
                Chi tiết đơn hàng
              </Typography>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "#F6BA71",
                  borderRadius: "30px",
                  fontSize: "14px",
                  padding: "10px 15px",
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "#F7941E",
                }}
              >
                Đơn hàng chờ xác nhận
              </Box>
              <Box>
                <Stack direction={"row"} mt={"10px"}>
                  <Typography>Mã đơn hàng:</Typography>
                  <Typography fontWeight={"bold"}>103335433</Typography>
                </Stack>

                <Stack direction={"row"} mt={"10px"}>
                  <Typography>Ngày mua:</Typography>
                  <Typography fontWeight={"bold"}>05/11/2023</Typography>
                </Stack>

                <Stack direction={"row"} mt={"10px"}>
                  <Typography>Tổng tiền: </Typography>
                  <Typography fontWeight={"bold"}>99.800</Typography>
                </Stack>

                <Stack direction={"row"} mt={"10px"}>
                  <Typography>Thông tin xuất hóa đơn: </Typography>
                  <Typography fontWeight={"bold"}>không có</Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box mt={"60px"}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: color.borderColor,
                  borderRadius: "15px",
                  padding: "7px 30px",
                }}
              >
                <Typography textTransform={"capitalize"}>
                  Đặt hàng lại
                </Typography>
              </Button>
              <Button
                variant="OutlinedRed"
                sx={{
                  mt: "10px",
                  borderRadius: "15px",
                  padding: "7px 27px",
                }}
              >
                <Typography textTransform={"capitalize"}>
                  Hủy đơn hàng
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={"20px"}>
        <Grid
          container
          justifyContent={"space-between"}
          maxWidth="xl"
          sx={{
            backgroundColor: color.white,

            padding: "20px",
          }}
        >
          <Grid item xs={3.8}>
            <Box mt={"20px"} height={"166px"} border={"1px solid #B7B4B4"}>
              <Typography
                sx={{
                  padding: "7px 5px",
                  fontWeight: "bold",
                }}
              >
                Thông tin người nhận
              </Typography>
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  borderTop: "1px solid #B7B4B4",
                  flexDirection: "column",
                  rowGap: "5px",
                }}
              >
                <Typography variant="body1">Đỗ Thanh</Typography>
                <Typography variant="body1">0383476296</Typography>
                <Typography variant="body1">
                  Phường An Dương, Quận Lê Chân, Hải Phòng, Việt Nam
                </Typography>
                <Typography>Tel:03948546748</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3.8}>
            <Box mt={"20px"} height={"166px"} border={"1px solid #B7B4B4"}>
              <Typography
                sx={{
                  padding: "7px 5px",
                  fontWeight: "bold",
                }}
              >
                Phương thức vận chuyển
              </Typography>
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  borderTop: "1px solid #B7B4B4",
                  flexDirection: "column",
                  rowGap: "5px",
                }}
              >
                <Typography>Giao hàng tiêu chuẩn</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3.8}>
            <Box mt={"20px"} border={"1px solid #B7B4B4"} height={"166px"}>
              <Typography
                sx={{
                  padding: "7px 5px",
                  fontWeight: "bold",
                }}
              >
                Phương thức thanh toán
              </Typography>
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  borderTop: "1px solid #B7B4B4",
                  flexDirection: "column",
                  rowGap: "5px",
                }}
              >
                <Typography variant="body1">
                  Thanh toán bằng tiền mặt khi nhận hàng
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: "10px",
            backgroundColor: color.white,
            padding: "20px",
          }}
        >
          <Stack direction={"row"}>
            <Typography variant="body1">Đơn hàng:</Typography>
            <Typography variant="body1">103335433</Typography>
          </Stack>
          <Box
            sx={{
              display: "inline-block",
              backgroundColor: "#F6BA71",
              borderRadius: "30px",
              fontSize: "14px",
              padding: "10px 15px",
              marginTop: "10px",
              fontWeight: "bold",
              color: "#F7941E",
            }}
          >
            Đơn hàng chờ xác nhận
          </Box>

          <Stack direction={"row"} mt={"18px"}>
            <Typography variant="body1">Tổng tiền:</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {numberFormat(99.888)}
            </Typography>
          </Stack>

          <Stack direction={"row"} mt={"18px"}>
            <Typography variant="body1">Số lượng:</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              1
            </Typography>
          </Stack>

          <TableContainer>
            <Table
              sx={{
                minWidth: 800,
              }}
              aria-label="simple tablek w"
            >
              <TableHead>
                <TableRow
                  sx={{
                    "& > th": {
                      fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell align="center">Tên sản phẩm</TableCell>
                  <TableCell align="center">SKU</TableCell>
                  <TableCell align="center">Giá bán</TableCell>
                  <TableCell align="right"> SL</TableCell>
                  <TableCell align="center">Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderCurrent.map((order: any) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <img width={"100px"} src={order.product.image} alt="" />
                      </TableCell>

                      <TableCell>
                        <Typography fontSize={"12px"}>
                          {order.product.title}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography fontSize={"12px"}>
                          {order.product.id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography fontSize={"12px"}>
                          {order.product.price_sale}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography fontSize={"12px"}>
                          {order.quantity}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography fontSize={"12px"}>
                          {numberFormat(
                            order.quantity * order.product.price_sale
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </NavUser>
  );
}

export default UserCartDetail;
