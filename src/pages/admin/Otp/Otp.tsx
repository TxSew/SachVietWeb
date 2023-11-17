import { NavLink } from "react-router-dom";
import "./Otp.css";

export default function Otp() {
  return (
    <div className="box-opt">
      <div className="box-top">
        <div className="top-img top-img-l">
          <NavLink to="">
            {" "}
            <img
              className="img-l"
              src="https://tse1.mm.bing.net/th?id=OIP.Mu0LODYSDb3gO5_zI4TrbwAAAA&pid=Api&P=0&h=180"
              alt=""
            />
          </NavLink>
        </div>
        <div className="top-img top-img-r">
          <NavLink to="">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/08/Burberry-Logo.png"
              alt=""
            />
          </NavLink>
        </div>
      </div>
      <div className="box-body">
        <p className="code-text">
          Vui lòng sử dụng mã OTP dưới đây để xác thực thông tin thay đổi mật
          khẩu của bạn, Không cung cấp mã OTP cho người lạ.
        </p>
        <p className="code">14789289</p>
        <p className="code-text">
          Mã xác thực của bạn có hiệu lực trong vòng 5 phút
        </p>
      </div>
      <div className="box-end">
        <div>
          <NavLink to="">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/08/Burberry-Logo.png"
              alt=""
              width={"150px"}
            />
          </NavLink>
          <p>214 Hà Huy Tập, Tân Lợi, TP.BMT , Đắk Lắk</p>
          <p>
            <NavLink
              style={{
                color: "white"
              }}
              to=""
            >
              sachviet.click
            </NavLink>
          </p>
        </div>
        <div>
          <h1>SACHVIET HOTLINE</h1>
          <p className="sdt">03828363636</p>
          <p>sachviet@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
