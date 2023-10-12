import React from "react";
import "./style.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import NavUser from "./layout/NavUser";
function User() {
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
            <h1 className="main-hd">BẢNG ĐIỀU KHIỂN CỦA KHÁCH HÀNG</h1>
            <div className="main-poin">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon-thanthiet.png"
                alt=""
              />
            </div>
            <p className="poin-text pt-4 pb-4">Điểm tích luỹ 2023: 0 Fpoint</p>
            <div className="main-sumpoin pb-4">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fpoint/Fpoint-level-chart-0.png"
                alt=""
              />
            </div>
            <div className="main-info p-4">
              <p className="main-info-hd pb-2">
                Cấp độ thành viên: <Link to="">Thân thiết</Link>
                <h1 className="pt-3">Thông tin tài khoản</h1>
              </p>
              <div className="row pt-3 info-content">
                <div className="wide c-4 m-4 l-4 ">F-point</div>
                <div className="wide c-4 m-4 l-4 ">0 đ</div>
                <div className="wide c-4 m-4 l-4 info-content-end">
                  <Link to="">Xem thêm</Link>
                </div>
              </div>
              <div className="row pt-3 info-content">
                <div className="wide c-4 m-4 l-4 ">Freeship</div>
                <div className="wide c-4 m-4 l-4 ">0 lần</div>
                <div className="wide c-4 m-4 l-4 info-content-end">
                  <Link to="">Xem thêm</Link>
                </div>
              </div>
              <div className="row pt-3 info-content">
                <div className="wide c-4 m-4 l-4 ">Bọc sách</div>
                <div className="wide c-4 m-4 l-4 ">sắp diễn ra</div>
              </div>
              <div className="row pt-3 info-content">
                <div className="wide c-6 m-6 l-6 ">
                  Số đơn hàng thành công năm 2023
                </div>
                <div className="wide c-6 m-6 l-6 info-content-smoney ">0</div>
              </div>
              <div className="row pt-3 info-content">
                <div className="wide c-6 m-6 l-6 ">
                  Số tiền đã thanh toán năm 2023
                </div>
                <div className="wide c-6 m-6 l-6 info-content-smoney ">0 đ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default User;
