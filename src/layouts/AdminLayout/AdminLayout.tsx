import { Grid } from "@mui/material";
import React from "react";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import { NavLink } from "react-router-dom";
import { FaBookOpen, FaHome, FaListUl, FaWpforms } from "react-icons/fa";
import { BiBookAdd, BiSolidCategoryAlt } from "react-icons/bi";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="App dasb pb-3">
      <HeaderAdmin />
      <div className="dasb-wapper">
        <label htmlFor="tool" className="tool">
          <FaListUl />
        </label>
        <input type="checkbox" id="tool" />
        <div className="dasb-sidebar">
          <ul className="k">
            <li className="">
              <NavLink to="/admin/statistical">
                <i>
                  <FaHome />
                </i>
                <span>Trang chủ</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/admin/category">
                <i>
                  <BiSolidCategoryAlt />
                </i>
                <span>Danh mục</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/admin/product">
                <i>
                  <FaBookOpen />
                </i>
                <span>Sản phẩm</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/admin/orders">
                <i>
                  <FaWpforms />
                </i>
                <span>Đơn</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="#">
                <i>
                  <BiBookAdd />
                </i>
                <span>...</span>
              </NavLink>
            </li>
            <div className="active start"></div>
          </ul>
        </div>
        <div className="dasb-wapper-main">
          <div className="dasb-wapper-main-bg">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
