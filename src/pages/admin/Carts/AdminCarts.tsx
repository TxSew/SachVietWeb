import { Label } from "@mui/icons-material";
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
  SelectChangeEvent,
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
import { httpCart } from "../../../submodules/controllers/http/axiosController";
import { Order } from "../../../submodules/models/OrderModel/Order";

export default function AdminCarts() {
  const [carts, setCarts] = React.useState<Order[]>([] as Order[]);
  const [page, setPage] = React.useState<number>(1);
  const [count, setCount] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleUpdateOrder = async (id: any) => {
    await httpCart.put(Number(id), {
      status: 2,
    });
  };

  const fetchData = async (page: number) => {
    try {
      const cartsData: any = await httpCart.getAll(page);
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
  const handleDelete = async (element: any) => {
    await httpCart.delete(Number(element.id));
  };
  const handleChangeSort = (event: SelectChangeEvent) => {
    const props = {
      status: event.target.value,
    };
    httpCart.getAll(props).then((result) => {
      if (result.orders) {
        setCarts(result.orders);
      }
    });
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
            <Label>Sắp xếp:</Label>
            <Select
              displayEmpty
              defaultValue={""}
              inputProps={{ "aria-label": "Without label" }}
              onChange={handleChangeSort}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={`${null}`}>Đang chờ duyệt</MenuItem>
              <MenuItem value={1}>Đang giao hàng </MenuItem>
              <MenuItem value={2}>Đã giao hàng</MenuItem>
            </Select>
          </FormControl>

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
            <TableHead
              sx={{
                border: "1px solid #eee",
              }}
            >
              <TableRow
                sx={{
                  "& > th": {
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell>
                  Mã đơn hàng
                  <OutlinedInput
                    sx={{
                      display: "block",
                      maxWidth: "100px",
                      mt: 1,
                      "& > input": {
                        p: "7px",
                      },
                    }}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  Khách hàng
                  <OutlinedInput
                    sx={{
                      display: "block",
                      maxWidth: "100px",
                      mt: 1,
                      "& > input": {
                        p: "7px",
                      },
                    }}
                    fullWidth
                  />
                </TableCell>
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
                      <Typography sx={{ color: "gray", fontSize: "13px" }}>
                        Đang chờ duyệt
                      </Typography>
                    ) : e.status == 1 ? (
                      <Typography
                        sx={{
                          color: "blue",
                          fontSize: "13px",
                        }}
                      >
                        {" "}
                        Đang giao hàng
                      </Typography>
                    ) : e.status == 2 ? (
                      <Typography color={"green"}> Đã giao </Typography>
                    ) : (
                      <Typography color={"red"}>Đã bị hủy</Typography>
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
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={async () => {
                              const updated = await httpCart.put(Number(e.id), {
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
                              sx={{
                                cursor: "pointer",
                              }}
                              onClick={async () => {
                                const updated = await httpCart.put(
                                  Number(e.id),
                                  {
                                    status: 0,
                                  }
                                );
                                window.location.reload();

                                toast.success("updated order successfully", {
                                  position: "bottom-right",
                                });
                              }}
                            >
                              <Chip
                                color="error"
                                label="Hủy đơn"
                                sx={{
                                  cursor: "pointer",
                                }}
                              />
                            </Stack>
                          </Box>
                        </>
                      ) : e.status == 1 ? (
                        <>
                          <Stack onClick={() => handleUpdateOrder(e.id)}>
                            <Chip
                              color="success"
                              label="Xác nhận thanh toán"
                              sx={{
                                cursor: "pointer",
                              }}
                            />
                          </Stack>
                          <Box>
                            <Stack
                              onClick={async () => {
                                const updated = await httpCart.put(
                                  Number(e.id),
                                  {
                                    status: 0,
                                  }
                                );
                                window.location.reload();
                                toast.success("updated order successfully", {
                                  position: "bottom-right",
                                });
                              }}
                            >
                              <Chip
                                color="error"
                                label="Hủy đơn"
                                sx={{
                                  cursor: "pointer",
                                }}
                              />
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
                      sx={{
                        cursor: "pointer",
                      }}
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
                            cursor: "pointer",
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
