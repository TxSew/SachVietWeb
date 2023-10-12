import React from "react";
import "./style.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import NavUser from "./layout/NavUser";
function UserMyCart() {
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
              <div className="cart-item-header row p-3">
                <div className="cart-item-header-checkbox row c-10 l-7 m-7 pt-2 pb-2">
                  <input type="checkbox" id="all" />
                  <label className="ps-3" htmlFor="all">
                    Chọn tất cả (2 sản phẩm)
                  </label>
                </div>
                <div className="cart-item-header-quantity c-0 l-2 m-2">
                  <span>Số lượng</span>
                </div>
                <div className="cart-item-header-money c-0 l-2 m-2">
                  <span>Thành tiền</span>
                </div>
                <div className="cart-item-header-status c-2 l-1 m-1">
                  <span>trạng thái</span>
                </div>
              </div>
              <div className="cart-item row p-3">
                <div className="cart-item-checkbox c-2 l-1 m-1">
                  <input type="checkbox" />
                </div>
                <div className="cart-item-image c-3 l-3 m-3">
                  <img
                    src="https://cdn0.fahasa.com/media/catalog/product//b/1/b1-1_1_5.jpg"
                    alt="ảnh"
                    width={56}
                  />
                </div>
                <div className="cart-item-title c-5 l-3 m-3">
                  <h2>Tên sản phẩm</h2>
                  <span>Giá sản phẩm</span>
                </div>
                <div className="cart-item-quantity c-0 l-2 m-2">
                  <p>8 (Cái)</p>
                </div>
                <div className="cart-item-money c-0 l-2 m-2">
                  <span>Thành tiền</span>
                </div>
                <div className="cart-item-status c-2 l-1 m-1">
                  <span>Trạng thái</span>
                </div>
                <div className="cart-item-ct pt-3">
                  <Link to="">Xem chi tiết</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default UserMyCart;
