import React from "react";
import "./style.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import NavUser from "./layout/NavUser";
import Divider from "@mui/material/Divider";
function NavDas() {
  return (
    <div className="dasb row">
      <div className="dasb-sidebar c-2 l-2 m-2">
        <div className="dasb-logo">
          <img
            src="https://cdn0.fahasa.com/media/quiz-game-T7/Avatar_IconApp_SN47_logoSN47_1.png"
            alt="Logo"
          />
        </div>
        <ul className="dasb-nav">
          <li className="dasb-nav-item">
            <Link to="">Tổng quan</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Quản lý danh mục</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Quản lý sản phẩm</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Quản lý đơn hàng</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Quản lý Người dùng</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Quản lý thương hiệu / Tác giả</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Quản lý bình luận và đánh giá</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Quản lý Khuyến mãi và Coupon</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Thống kê và Báo cáo</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Cài đặt và Tùy chỉnh</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Quản lý Người dùng và Phân quyền:</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Hỗ trợ và Liên hệ:</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">Đăng xuất</Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="dasb-main c-10 l-10 m-10">
        <div className="dasb-main-header">Header</div>
        <div className="dasb-main-header">MAIN</div>
      </div>
    </div>
  );
}

export default NavDas;
