import React from "react";
import "./style.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import NavUser from "./layout/NavUser";
import Divider from "@mui/material/Divider";
import Dashboard from "../../admin/Dashboard/Dashboard";
function NavDas() {
  return (
    <div className="dasb row">
      <div className="dasb-sidebar c-12 l-3 m-4">
        <div className="dasb-logo">
          <img
            src="https://cdn0.fahasa.com/media/quiz-game-T7/Avatar_IconApp_SN47_logoSN47_1.png"
            alt="Logo"
          />
        </div>
        <ul className="dasb-nav">
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Tổng quan</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Danh mục</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Sản phẩm</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Đơn hàng</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Người dùng</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Thương hiệu / Tác giả</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Bình luận và đánh giá</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Khuyến mãi và Coupon</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Thống kê và Báo cáo</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Cài đặt và Tùy chỉnh</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Hỗ trợ và Liên hệ</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
          <li className="dasb-nav-item">
            <Link to="">
              <i>aa</i>
              <p>Đăng xuất</p>
            </Link>
            <div className="dasb-nav-drop-item">
              <ul>
                <li className="dasb-nav-item">aaa</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="dasb-main c-12 l-9 m-8">
        <div className="dasb-main-header row">
          <div className="dasb-main-header-title c-9 m-9 l-9">
            <h1>Dashboard</h1>
          </div>
          <div className="dasb-main-header-end c-3 m-3 l-3">
            <div className="row">
              <div className="dasb-main-header-end-user c-4 m-4 l-4">
                <h1>user</h1>
              </div>
              <div className="dasb-main-header-end-vn c-4 m-4 l-4">
                <h1>logo</h1>
              </div>
              <div className="dasb-main-header-end-logout c-4 m-4 l-4">
                <Link to="">Logout</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dasb-main-wapper">
          <div className="dasb-main-wapper-body">body</div>
        </div>
      </div>
    </div>
  );
}

export default NavDas;
