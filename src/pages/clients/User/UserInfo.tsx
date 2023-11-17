import { Link } from "react-router-dom";
import "./index.scss";
import NavUser from "./layout/NavUser";
import "./style.scss";
import { Controller, useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { color } from "../../../Theme/color";
import { ChangePassword } from "../../../submodules/models/UserModel/User";
import { httpAccount } from "../../../submodules/controllers/http/axiosController";
import { toast } from "react-toastify";
import { error } from "console";
import { da } from "@faker-js/faker";
function UserInfo() {
  const validatePasswordConfirmation = (value: any) => {
    const password = control._getWatch("newPassword");
    return value === password || "Mật khẩu nhập lại không khớp!";
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePassword>({ mode: "all" });

  const handelChangePassword = (data: any) => {
    httpAccount.changePassword(data).then((res) => {
      res?.message == "Password changed successfully" &&
        toast.success("Mật khẩu của bạn thay đổi thành công", {
          position: "top-right",
        });
      res == undefined &&
        toast.error("Mật khẩu thay đổi không thành công!", {
          position: "top-right",
        });
    });
  };

  const handelChangeInfo = (data: any) => {
    console.log(data);
  };

  const formInfo: any = useForm();
  return (
    <NavUser>
      <div className="main ps-0 pt-3 pb-3 pe-0">
        <div className="main-waper ">
          <div className="main-waper-top pt-2 pb-2 ps-4">
            <h1 className="info-acc-hd p-3">Thông tin tài khoản</h1>
            <form
              className="aa"
              action=""
              onSubmit={formInfo.handleSubmit(handelChangeInfo)}
            >
              <div className="info-acc row">
                <label className="c-12 m-2 l-2" htmlFor="">
                  Họ*
                </label>
                <input
                  className="c-12 m-8 l-8"
                  type="text"
                  placeholder="Họ"
                  {...formInfo.register("firstName")}
                />
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
                    {...formInfo.register("phone")}
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
              <button className="save pe-5 ps-5 pb-2 pt-2">Cập nhật</button>
            </form>

            <form className="" onSubmit={handleSubmit(handelChangePassword)}>
              <h1 className="info-acc-hd p-3">Thay đổi mật khẩu</h1>
              <div className="">
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Mật khẩu không được để trống!",
                  }}
                  render={({ field }) => (
                    <div className="info-acc row">
                      <label className="c-12 m-2 l-2" htmlFor="">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="c-12 m-8 l-8"
                        type="text"
                        placeholder="Nhập mât khẩu hiện tại"
                      />
                      <Typography color={color.error}>
                        {errors.password && errors.password.message}
                      </Typography>
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="newPassword"
                  rules={{
                    required: "Mật khẩu không được để  trống!",
                    minLength: {
                      value: 5,
                      message: "Mật khẩu yêu cầu 5 kí tự trở lên!",
                    },
                    maxLength: {
                      value: 30,
                      message: "Mật khẩu yêu cầu 30 kí tự trở xuống!",
                    },
                  }}
                  render={({ field }) => (
                    <div className="info-acc row">
                      <label className="c-12 m-2 l-2" htmlFor="">
                        Mật khẩu mới
                      </label>
                      <input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="c-12 m-8 l-8"
                        type="text"
                        placeholder="Mật khẩu mới"
                      />
                      <Typography color={color.error}>
                        {errors.newPassword && errors.newPassword.message}
                      </Typography>
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="repeatNewPassword"
                  rules={{
                    required: "Mật khẩu không được để  trống!",
                    validate: validatePasswordConfirmation,
                  }}
                  render={({ field }) => (
                    <div className="info-acc row">
                      <label className="c-12 m-2 l-2" htmlFor="">
                        Nhập lại mật khẩu mới
                      </label>
                      <input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="c-12 m-8 l-8"
                        type="text"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                      <Typography color={color.error}>
                        {errors.repeatNewPassword &&
                          errors.repeatNewPassword.message}
                      </Typography>
                    </div>
                  )}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="save pe-5 ps-5 pb-2 pt-2"
                    style={{
                      textAlign: "center",
                    }}
                    type="submit"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default UserInfo;
