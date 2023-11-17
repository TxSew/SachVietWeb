import { Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDates } from "../../../helpers/FortmatDate";
import { numberFormat } from "../../../helpers/formatPrice";
import { httpCart } from "../../../submodules/controllers/http/axiosController";
import { Order } from "../../../submodules/models/OrderModel/Order";
import CartNotFound from "../cart/components/CartNotFound/CartNotFound";
import "./index.scss";
import NavUser from "./layout/NavUser";
import "./style.scss";
function UserMyCart() {
  const [user, setUser] = useState<any>({} as any);
  const [orderUser, setOrderUser] = useState<any>([]);
  const [Token, setToken] = useState("");

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const convertUser = JSON.parse(getUser!);
    const convertToken = JSON.parse(token!);
    if (convertToken) setToken(convertToken);
    if (convertUser) getOrderByUser(convertUser.id);
  }, []);

  const getOrderByUser = async (id: any) => {
    if (user) {
      const orderUserData = await httpCart.getOrderbyUser(Number(id));
      if (orderUserData) {
        setOrderUser(orderUserData);
      }
    }
  };

  return (
    <NavUser>
      <div className="main ps-0 pt-3 pb-3 pe-0">
        <div className="main-waper ">
          <div className="main-waper-top pt-2 pb-2 ps-4">
            <i className="fa fa-exclamation-triangle"></i>
            <p>
              Bạn vui lòng cập nhật thông tin tài khoản:
              <Link to="">Cập nhật thông tin ngay</Link>
            </p>
          </div>
          <div className="main-waper-end pt-4 pb-5 ps-4 pe-4">
            <h1 className="info-acc-hd p-3">Đơn hàng của tôi</h1>
            {orderUser.length > 0 ? (
              <div className="p-3">
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
                        <TableCell align="center">Ngày mua</TableCell>
                        <TableCell align="center">Tổng tiền</TableCell>
                        <TableCell align="center">Thanh toán</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderUser.map((e: Order) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {e.id}
                            </TableCell>
                            <TableCell align="center">
                              {formatDates(e.createdAt)}
                            </TableCell>
                            <TableCell align="center">
                              {numberFormat(e.money)}
                            </TableCell>
                            <TableCell align="center">{e.orderType}</TableCell>
                            <TableCell align="center">
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

                            <TableCell align="right">
                              <Link to={`/user/mycart/${e.id}`}>
                                <Chip label=" Xem" color="primary" />
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <CartNotFound />
            )}
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default UserMyCart;
