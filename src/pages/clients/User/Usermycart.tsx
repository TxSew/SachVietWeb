import React, { useEffect, useState } from "react";
import "./style.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import NavUser from "./layout/NavUser";
import HttpCartController from "../../../submodules/controllers/http/httpCartController";
import { BaseAPi } from "../../../configs/BaseApi";
import { features } from "process";
import { Order, OrderDto } from "../../../submodules/models/OrderModel/Order";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CartUser from "../../../components/CartItemUser/CartUser";
import { Box, Chip, Stack } from "@mui/material";
import { toast } from "react-toastify";
function UserMyCart() {
  const http = new HttpCartController(BaseAPi);
  const [user, setUser] = useState<any>({} as any);
  const [orderUser, setOrderUser] = useState<any>([]);
  useEffect(() => {
    const getUser = localStorage.getItem("user");
    const convertUser = JSON.parse(getUser!);
    if (convertUser) {
      getOrderByUser(convertUser.id);
    }
  }, []);
  useEffect(() => {}, []);

  const getOrderByUser = async (id: any) => {
    if (user) {
      const orderUserData = await http.getOrderbyUser(Number(id));
      console.log(orderUserData);

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
              Bạn vui lòng cập nhật thông tin tài khoản:{" "}
              <Link to="">Cập nhật thông tin ngay</Link>
            </p>
          </div>
          <div className="main-waper-end pt-4 pb-5 ps-4 pe-4">
            <h1 className="info-acc-hd p-3">Đơn hàng của tôi</h1>
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
                      <TableCell align="center">Ngày tạo hóa đơn</TableCell>
                      <TableCell align="right">Thao tác</TableCell>
                      <TableCell align="right">Tổng tiền</TableCell>
                      <TableCell align="right">Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>

                      <TableCell align="right">
                        <Stack
                          direction={"row"}
                          spacing={2}
                          justifyContent={"end"}
                        ></Stack>
                      </TableCell>

                      <TableCell align="right">
                        <Stack
                          direction={"row"}
                          spacing={2}
                          justifyContent={"end"}
                        ></Stack>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default UserMyCart;
