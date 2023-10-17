import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Grid } from "@mui/material";
import NavAdmin from "../components/NavAdmin/NavAdmin";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import { NavLink } from "react-router-dom";
import { FaBookOpen, FaHome } from "react-icons/fa";
import { BiBookAdd, BiSolidCategoryAlt } from "react-icons/bi";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="App dasb pb-3">
      <HeaderAdmin />
      <div className="dasb-wapper">
        <div className="dasb-sidebar">
          <ul className="">
            <li className="">
              <NavLink to="">
                <i>
                  <FaHome />
                </i>
                <span>Trang chủ</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="#">
                <i>
                  <BiSolidCategoryAlt />
                </i>
                <span>Danh mục</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="#">
                <i>
                  <FaBookOpen />
                </i>
                <span>Sản phẩm</span>
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
