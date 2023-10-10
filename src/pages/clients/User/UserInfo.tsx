import React from "react";
import "./style.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import NavUser from "./layout/NavUser";
function UserInfo() {
  return (
    <NavUser>
      <div className="main p-3">
        <div className="main-waper ">
          <div className="main-waper-top pt-2 pb-2 ps-4">
            <h1 className="info-acc-hd p-3">Thông tin tài khoản</h1>
            <form className="aa" action="">
              <div className="info-acc row">
                <label className="c-12 m-2 l-2" htmlFor="">
                  Họ*
                </label>
                <input className="c-12 m-8 l-8" type="text" placeholder="Họ" />
              </div>
              <div className="info-acc row">
                <label className="c-12 m-2 l-2" htmlFor="">
                  Tên*
                </label>
                <input className="c-12 m-8 l-8" type="text" placeholder="Tên" />
              </div>
              <div className="info-acc row">
                <label className="c-12 m-2 l-2" htmlFor="">
                  Số điện thoại
                </label>
                <div className="c-12 m-8 sdt">
                  <input
                    className="c-9 m-9 l-9"
                    type="text"
                    placeholder="SDT"
                    value="SDT"
                  />
                  <p className="c-3 m-3 l-3">
                    <Link className="link" to="">
                      Thay đổi
                    </Link>
                  </p>
                </div>
              </div>
              <div className="info-acc row">
                <label className="c-12 m-2 l-2" htmlFor="">
                  Email
                </label>
                <div className="c-12 m-8 sdt">
                  <input className="c-9 m-9 l-9" type="text" />
                  <p className="c-3 m-3 l-3">
                    <Link className="link" to="">
                      Thay đổi
                    </Link>
                  </p>
                </div>
              </div>
              <div className="info-acc row">
                <label className="c-12 m-2 l-2" htmlFor="">
                  Giới tính*
                </label>
                <div className="pe-4 gioitinh">
                  <input id="boy" className="" type="checkbox" />
                  <label className="ps-2" htmlFor="boy">
                    Nam
                  </label>
                </div>
                <div className="ps-4 gioitinh">
                  <input id="girl" className="" type="checkbox" />
                  <label className="ps-2" htmlFor="girl">
                    Nữ
                  </label>
                </div>
              </div>
              <div className="info-acc row">
                <label className="c-12 m-2 l-2" htmlFor="">
                  Sinh nhật
                </label>
                <input
                  className="c-12 m-8 l-8"
                  type="date"
                  placeholder="Sinh nhật"
                />
              </div>
              <div className="info-acc row">
                <label className="c-12 m-2 l-2" htmlFor="">
                  Mã VIP
                </label>
                <input
                  className="c-12 m-8 l-8"
                  type="text"
                  placeholder="Nhập mã VIP"
                />
              </div>
              <div className="div">
                <label className="c-12 m-2 l-2" htmlFor=""></label>
                <input id="rpass" className="rpass" type="checkbox" />
                <label className="ps-2" htmlFor="rpass">
                  Đổi mật khẩu
                </label>
                <div className="dpass">
                  <div className="info-acc row">
                    <label className="c-12 m-2 l-2" htmlFor="pt">
                      Mật khẩu hiện tại*
                    </label>
                    <input
                      className="c-12 m-8 l-8"
                      type="text"
                      placeholder="Mật khẩu hiện tại"
                    />
                  </div>
                  <div className="info-acc row">
                    <label className="c-12 m-2 l-2" htmlFor="">
                      Mật khẩu mới*
                    </label>
                    <input
                      className="c-12 m-8 l-8"
                      type="text"
                      placeholder="Mật khẩu mới"
                    />
                  </div>
                  <div className="info-acc row pb-3">
                    <label className="c-12 m-2 l-2" htmlFor="">
                      Nhập lại mật khẩu mới*
                    </label>
                    <input
                      className="c-12 m-8 l-8"
                      type="text"
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>
                </div>
              </div>

              <button className="save pe-5 ps-5 pb-2 pt-2">Lưu thay đổi</button>
            </form>
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default UserInfo;
