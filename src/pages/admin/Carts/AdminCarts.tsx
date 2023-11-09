import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
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
import moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpCartController from "../../../submodules/controllers/http/httpCartController";
import { Order, TOrders } from "../../../submodules/models/OrderModel/Order";

const http = new HttpCartController(BaseAPi);
export default function AdminCarts() {
  const [carts, setCarts] = React.useState<Order[]>([] as Order[]);
  const [page, setPage] = React.useState<number>(1);
  const [count, setCount] = React.useState<number>(1);
  React.useEffect(() => {
    fetchData(page);
  }, [page]);
  const handleUpdateOrder = async (id: any) => {
    await http.put(Number(id), {
      status: 2,
    });
  };
  const fetchData = async (page: number) => {
    try {
      const cartsData: any = await http.getAll(page);
      setCarts(cartsData?.orders);
      setCount(cartsData?.totalPage);
    } catch (err) {
      console.log(err);
    }
  };
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
      <Grid mt={0} width={"100%"}>
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={"old"}>Đang chờ duyệt</MenuItem>
              <MenuItem value={"new"}>Đang giao hàng </MenuItem>
              <MenuItem value={"priceUp"}>Đã giao hàng</MenuItem>
            </Select>
          </FormControl>

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
                <TableCell align="center">Khách hàng</TableCell>
                <TableCell align="center">Tổng tiền</TableCell>
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
                  <TableCell align="right">
                    {Intl.NumberFormat("en-US", {
                      currency: "USD",
                    }).format(Number(e.money))}
                  </TableCell>
                  <TableCell align="center">
                    {moment(e.createdAt).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    {e.status == null ? (
                      <Chip label="Đang chờ duyệt" />
                    ) : e.status == 1 ? (
                      <Chip color="primary" label="Đang giao hàng" />
                    ) : e.status == 2 ? (
                      <Chip label=" Đã giao hàng" color="success" />
                    ) : (
                      <Chip label="Đã bị hủy" color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction={"row"}
                      color={color.text_color}
                      spacing={2}
                      justifyContent={"end"}
                    >
                      {e.status == null ? (
                        <>
                          <Stack
                            onClick={async () => {
                              const updated = await http.put(Number(e.id), {
                                status: 1,
                              });
                              window.location.reload();

                              toast.success("updated order successfully", {
                                position: "bottom-right",
                              });
                            }}
                          >
                            <Chip label="Duyệt đơn hàng" />
                          </Stack>
                          <Box>
                            <Stack
                              onClick={async () => {
                                const updated = await http.put(Number(e.id), {
                                  status: 0,
                                });
                                window.location.reload();

                                toast.success("updated order successfully", {
                                  position: "bottom-right",
                                });
                              }}
                            >
                              <Chip color="error" label="Hủy đơn" />
                            </Stack>
                          </Box>
                        </>
                      ) : e.status == 1 ? (
                        <>
                          <Stack onClick={() => handleUpdateOrder(e.id)}>
                            <Chip color="success" label="Xác nhận thanh toán" />
                          </Stack>
                          <Box>
                            <Stack
                              onClick={async () => {
                                const updated = await http.put(Number(e.id), {
                                  status: 0,
                                });
                                window.location.reload();
                                toast.success("updated order successfully", {
                                  position: "bottom-right",
                                });
                              }}
                            >
                              <Chip color="error" label="Hủy đơn" />
                            </Stack>
                          </Box>
                        </>
                      ) : (
                        ""
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell align="center">
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
          <Pagination count={count} page={page} onChange={handleChange} />
        </Box>
      </Grid>
    </Grid>
  );
}
