import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpCartController from "../../../submodules/controllers/http/httpCartController";
import {
  Order,
  OrderDetail,
} from "../../../submodules/models/OrderModel/Order";

const http = new HttpCartController(BaseAPi);
function DetailCarts() {
  const componentRef: any = useRef();
  const { id } = useParams();
  const [DetailOrder, setDetailOrder] = useState<Order>({});
  useEffect(() => {
    fetchOrderDetail();
  }, []);
  const fetchOrderDetail = async () => {
    const detail = await http.getOrderDetail(Number(id));
    console.log(detail);
    if (detail) {
      setDetailOrder(detail);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("print success"),
  });

  return (
    <Box bgcolor={color.text_color}>
      <Typography variant="h2" fontSize={"25px"}>
        Chi tiết đơn hàng
      </Typography>
      <Box
        ref={componentRef}
        bgcolor={color.white}
        sx={{
          p: 2,
          mt: 2,
        }}
      >
        <Typography
          variant="h2"
          fontSize={"30px"}
          color={color.error}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          Chi tiết đơn hàng
        </Typography>
        <Box>
          <Stack direction={"row"} spacing={1}>
            <Typography>Tên khách hàng:</Typography>
            <Typography fontWeight={"bold"}>{DetailOrder?.fullName}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Typography>Điện thoại:</Typography>
            <Typography fontWeight={"bold"}>{DetailOrder.phone}</Typography>
          </Stack>

          <Stack direction={"row"} spacing={1}>
            <Typography> Thời gian đặt hàng:</Typography>
            <Typography fontWeight={"bold"}>
              {moment(DetailOrder.createdAt).format("DD MMM YYYY  HH:mm:ss")}
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={1}>
            <Typography> Địa chỉ:</Typography>
            <Typography fontWeight={"bold"}>{DetailOrder.address}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Typography> Mã đơn hàng:</Typography>
            <Typography fontWeight={"bold"}>{DetailOrder.id}</Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Box border={"1px solid #eee"}>
            <Stack
              borderBottom={"1px solid #eee"}
              p={2}
              direction={"row"}
              width={"100%"}
              fontWeight={"bold"}
            >
              <Stack width={"10%"}>STT</Stack>
              <Stack width={"50%"}>Tên sản phẩm</Stack>
              <Stack width={"10%"}>Số lượng </Stack>
              <Stack width={"10%"}>Giá bán</Stack>
              <Stack width={"20%"} textAlign={"right"}>
                Thành tiền
              </Stack>
            </Stack>

            {DetailOrder.orderDetail?.map((e: OrderDetail, i: number) => {
              return (
                <Stack
                  direction={"row"}
                  borderBottom={"1px solid #eee"}
                  p={2}
                  width={"100%"}
                >
                  <Stack width={"10%"}>{i++}</Stack>
                  <Stack width={"50%"}>{e.product?.title}</Stack>
                  <Stack width={"10%"}>{e.quantity} </Stack>
                  <Stack width={"10%"}>
                    {Intl.NumberFormat("en-US", {
                      currency: "USD",
                    }).format(Number(e.price))}
                  </Stack>
                  <Stack width={"20%"} textAlign={"right"}>
                    {Intl.NumberFormat("en-US", {
                      currency: "USD",
                    }).format(
                      Number(
                        e?.price && e?.quantity ? e.price * e.quantity : null
                      )
                    )}
                  </Stack>
                </Stack>
              );
            })}
          </Box>
          <Box>
            <Stack
              direction={"row"}
              mt={2}
              fontSize={"19px"}
              justifyContent={"end"}
              spacing={1}
            >
              <Typography variant="body1" color="initial">
                Tổng cộng:
              </Typography>
              <Typography variant="body1" color="initial">
                {Intl.NumberFormat("en-US", {
                  currency: "USD",
                }).format(Number(DetailOrder.money))}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              fontSize={"19px"}
              justifyContent={"end"}
              spacing={1}
              sx={{
                fontStyle: "italic",
                fontSize: "13px",
                mt: 1,
              }}
            >
              <Typography variant="body1" fontSize={"14px"} color="initial">
                Phí vận chuyển:
              </Typography>
              <Typography variant="body1" color="initial" fontSize={"14px"}>
                19.00
              </Typography>
            </Stack>

            <Stack
              direction={"row"}
              mt={"3px"}
              fontSize={"19px"}
              justifyContent={"end"}
              spacing={1}
              color={color.error}
            >
              <Typography variant="body1" color="red">
                Thành tiền
              </Typography>
              <Typography variant="body1" color="red">
                {Intl.NumberFormat("en-US", {
                  currency: "USD",
                }).format(Number(DetailOrder.money))}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={handlePrint}
        sx={{
          mt: 1,
          float: "right",
          clear: "bold",
        }}
      >
        <PrintIcon
          sx={{
            mr: 1,
          }}
        />{" "}
        In hoá đơn
      </Button>
    </Box>
  );
}

export default DetailCarts;
