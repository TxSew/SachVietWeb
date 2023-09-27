import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import {
  Box,
  Button,
  Grid,
  OutlinedInput,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { Link } from "react-router-dom";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HttpCartController from "../../../submodules/controllers/http/httpCartController";
import { Order } from "../../../submodules/models/OrderModel/Order";
import moment from "moment";
import { toast } from "react-toastify";

const http = new HttpCartController(BaseAPi);
export default function AdminCarts() {
  const [carts, setCarts] = React.useState<Order[]>([] as Order[]);
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const cartsData = await http.getAll();
      setCarts(cartsData);
    } catch (err) {
      console.log(err);
    }
  };
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // remove item
  const handleDelete = async (element: any) => {
    const sss = await http.delete(Number(element.id));
  };

  return (
    <Grid>
      <Grid mt={3} width={"100%"}>
        <Stack
          direction={"row"}
          mb={2}
          alignItems={"center"}
          spacing={2}
          justifyContent={"space-between"}
        >
          <Typography variant="h2" fontSize={"26px"} mb={3} fontWeight={"bold"}>
            <ShoppingBasketIcon
              sx={{
                mr: 1,
              }}
            />
            Danh sách đơn hàng
          </Typography>
          <OutlinedInput
            sx={{
              maxWidth: "300px",
              mt: 1,
              "& > input": {
                p: "7px",
              },
            }}
            fullWidth
            placeholder="Tìm kiếm sản phẩm..."
          />
          <Link to={"/admijk/"}>
            <Button variant="contained">Thùng rác</Button>
          </Link>
        </Stack>
        <TableContainer component={Paper}>
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
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell align="right">Khách hàng</TableCell>
                <TableCell align="right"> Điện thoại</TableCell>
                <TableCell align="right">Tổng tiền</TableCell>
                <TableCell align="center">Ngày tạo hóa đơn</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="center">Xử lý đơn</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.map((e: Order, i) => (
                <TableRow
                  key={e.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {e.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {e.userID == null ? "Khách vãng lai" : e.users?.fullName}
                  </TableCell>
                  <TableCell align="right">{e.phone}</TableCell>
                  <TableCell align="right">
                    {Intl.NumberFormat("en-US", {
                      currency: "USD",
                    }).format(Number(e.money))}
                  </TableCell>
                  <TableCell align="right">
                    {moment(e.createdAt).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    {e.status == null ? (
                      <Typography fontSize={"12px"}>Đang chờ duyệt</Typography>
                    ) : e.status == 1 ? (
                      <Typography
                        fontSize={"12px"}
                        fontWeight={"bold"}
                        color={color.text_second}
                      >
                        Đang giao
                      </Typography>
                    ) : e.status == 2 ? (
                      <Typography
                        fontSize={"12px"}
                        fontWeight={"bold"}
                        color={"green"}
                      >
                        Đã giao
                      </Typography>
                    ) : (
                      <Typography
                        fontSize={"12px"}
                        color={color.error}
                        fontWeight={"bold"}
                      >
                        Bị hủy
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction={"row"}
                      color={color.text_color}
                      spacing={2}
                      justifyContent={"end"}
                    >
                      {e.status == null ? (
                        <>
                          <Button
                            variant="contained"
                            sx={{
                              bgcolor: "gray",
                            }}
                            onClick={async () => {
                              const updated = await http.put(Number(e.id), {
                                status: 1,
                              });
                              toast.success("updated order successfully", {
                                position: "bottom-right",
                              });
                            }}
                          >
                            <Typography fontSize={"10px"}>
                              Duyệt đơn hàng
                            </Typography>
                          </Button>
                          <Box>
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: "red",
                              }}
                              onClick={async () => {
                                const updated = await http.put(Number(e.id), {
                                  status: 0,
                                });
                                toast.success("updated order successfully", {
                                  position: "bottom-right",
                                });
                              }}
                            >
                              <Typography fontSize={"10px"}>Hủy đơn</Typography>
                            </Button>
                          </Box>
                        </>
                      ) : e.status == 1 ? (
                        <>
                          <Button
                            variant="contained"
                            sx={{
                              bgcolor: "green",
                            }}
                            onClick={async () => {
                              const updated = await http.put(Number(e.id), {
                                status: 2,
                              });
                              toast.success("updated order successfully", {
                                position: "bottom-right",
                              });
                            }}
                          >
                            <Typography fontSize={"10px"}>
                              Xác nhận thanh toán
                            </Typography>
                          </Button>
                          <Box>
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: "red",
                              }}
                              onClick={async () => {
                                const updated = await http.put(Number(e.id), {
                                  status: 0,
                                });
                                toast.success("updated order successfully", {
                                  position: "bottom-right",
                                });
                              }}
                            >
                              <Typography fontSize={"10px"}>Hủy đơn</Typography>
                            </Button>
                          </Box>
                        </>
                      ) : (
                        ""
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      direction={"row"}
                      color={color.text_color}
                      spacing={2}
                      justifyContent={"end"}
                    >
                      <Link to={`/admin/orders/detail/${e.id}`}>
                        <VisibilityIcon
                          sx={{
                            color: "green",
                          }}
                        />
                      </Link>
                      <Box onClick={() => handleDelete(e)}>
                        <DeleteForeverIcon
                          sx={{
                            color: "red",
                          }}
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2}>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Box>
      </Grid>
    </Grid>
  );
}
