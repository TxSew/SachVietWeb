import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { color } from "../../../Theme/color";
import { formatDates } from "../../../helpers/FortmatDate";
import { numberFormat } from "../../../helpers/formatPrice";
import { httpCart } from "../../../submodules/controllers/http/axiosController";
import NavUser from "./layout/NavUser";
function UserCartDetail() {
  const { id } = useParams();
  const [orderCurrent, setOrderCurrent] = useState<any>({});

  useEffect(() => {
    getOrderUser();
  }, []);
  const [open, setOpen] = useState(false);
  const getOrderUser = async () => {
    const orderByUser = await httpCart.getOrderDetail(Number(id));
    if (orderByUser) setOrderCurrent(orderByUser);
  };
  const handleCancelOrder = async () => {
    httpCart.updateOrderUser(Number(id)).then((response) => {
      handleClickClose();
      if (response) window.location.reload();
    });
  };
  const handleClickOpen = (id: any) => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
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

              {orderCurrent.status == null ? (
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
              ) : orderCurrent.status == 1 ? (
                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: color.BtnDartGreen,
                    borderRadius: "30px",
                    fontSize: "14px",
                    padding: "10px 15px",
                    marginTop: "10px",
                    fontWeight: "bold",
                    color: "#F7941E",
                  }}
                >
                  Đơn hàng đang giao
                </Box>
              ) : orderCurrent.status == 2 ? (
                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: color.BtnDartGreen,
                    borderRadius: "30px",
                    fontSize: "14px",
                    padding: "10px 15px",
                    marginTop: "10px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Đơn hàng đã giao
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: color.error,
                    borderRadius: "30px",
                    fontSize: "14px",
                    padding: "10px 15px",
                    marginTop: "10px",
                    fontWeight: "bold",
                    color: "#ffff",
                  }}
                >
                  Đơn hàng đã bị hủy
                </Box>
              )}
              <Box>
                <Stack direction={"row"} mt={"10px"}>
                  <Typography>Mã đơn hàng:</Typography>
                  <Typography fontWeight={"bold"}>{orderCurrent.id}</Typography>
                </Stack>

                <Stack direction={"row"} mt={"10px"}>
                  <Typography>Ngày mua: </Typography>
                  <Typography fontWeight={"bold"}>
                    {formatDates(orderCurrent.createdAt)}
                  </Typography>
                </Stack>

                <Stack direction={"row"} mt={"10px"}>
                  <Typography>Tổng tiền: </Typography>
                  <Typography fontWeight={"bold"}>
                    {numberFormat(orderCurrent.money)}
                  </Typography>
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
              {orderCurrent.status == null ? (
                <Button
                  variant="OutlinedRed"
                  sx={{
                    mt: "10px",
                    borderRadius: "15px",
                    padding: "7px 27px",
                  }}
                  onClick={handleClickOpen}
                >
                  <Typography textTransform={"capitalize"}>
                    Hủy đơn hàng
                  </Typography>
                </Button>
              ) : (
                ""
              )}
              <Dialog
                open={open}
                onClose={handleClickClose}
                TransitionComponent={Fade}
                aria-labelledby="customized-dialog-title"
              >
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-slide-description"
                    textAlign={"center"}
                    padding={"0 24px "}
                    sx={{
                      color: "red",
                    }}
                  >
                    <DeleteForeverIcon
                      sx={{
                        fontSize: "56px",
                        color: "rgb(201, 33, 39)",
                      }}
                    />
                    <DialogTitle fontSize={"16px"}>
                      Bạn chắc chắn muốn hủy đơn hàng này?
                    </DialogTitle>
                  </DialogContentText>
                </DialogContent>
                <Box
                  display={"flex"}
                  paddingBottom={"24px"}
                  justifyContent={"space-around"}
                >
                  <Button
                    onClick={handleClickClose}
                    sx={{
                      padding: "8px 16px",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      color: "black",
                      fontSize: "12px",
                      fontWeight: "bold",
                      width: "96px",
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={() => handleCancelOrder()}
                    sx={{
                      padding: "8px 16px",
                      border: "1px solid red",
                      borderRadius: "12px",
                      background: "red",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      width: "96px",
                      ":hover": {
                        backgroundColor: "rgb(201, 33, 39)",
                      },
                    }}
                  >
                    Đồng ý
                  </Button>
                </Box>
              </Dialog>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={"20px"} mb={"20px"}>
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
                <Typography variant="body1">{orderCurrent.fullName}</Typography>
                <Typography variant="body1">{orderCurrent.phone}</Typography>
                <Typography variant="body1">{orderCurrent.address}</Typography>
                <Typography>Tel:{orderCurrent.phone}</Typography>
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
            <Typography variant="body1">{`#${orderCurrent.id}`}</Typography>
          </Stack>

          <Stack direction={"row"} mt={"18px"}>
            <Typography variant="body1">Số lượng:</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {orderCurrent.quantity}
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
                {orderCurrent?.orderDetail?.map((order: any) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <img
                          width={"80px"}
                          height={"70px"}
                          src={order.product.image}
                          alt=""
                        />
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
