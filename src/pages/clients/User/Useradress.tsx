import { Controller, useForm } from "react-hook-form";
import "./index.scss";
import NavUser from "./layout/NavUser";
import "./style.scss";
import { Button, Stack } from "@mui/material";
function UserAdress() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});
  const handleAddUserAddress = (data: any) => {
    console.log(data);
  };
  return (
    <NavUser>
      <div className="mainps-0 pt-3 pb-3 pe-0">
        <div className="main-waper ">
          <div className="main-waper-top pt-2 pb-2 ps-4">
            <h1 className="info-acc-hd p-3">THÊM ĐỊA CHỈ MỚI</h1>
            <form action="" onSubmit={handleSubmit(handleAddUserAddress)}>
              <div className="row p-4">
                <div className="adr-ttlh c-12 m-6 l-6 pe-3">
                  <h2>Thông tin liên hệ</h2>

                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => {
                      return (
                        <div className="ttlh ttlh-name">
                          <input
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            type="text"
                            placeholder="Họ Tên"
                          />
                        </div>
                      );
                    }}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => {
                      return (
                        <div className="ttlh ttlh-name">
                          <input
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            type="number"
                            placeholder="Số điện thoại"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="adr-dc c-12 m-6 l-6  pe-3">
                  <h2>Địa chỉ</h2>

                  <div className="adr adr-t">
                    <select name="" id="" placeholder="Tỉnh/Thành phố">
                      <option value="1">Tỉnh/Thành phố</option>
                    </select>
                  </div>
                  <div className="adr adr-tp">
                    <select name="" id="" placeholder="Quận/Huyện">
                      <option value="1">Quận/Huyện</option>
                    </select>
                  </div>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => {
                      return (
                        <div className="ttlh ttlh-name">
                          <input
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            type="number"
                            placeholder="Địa chỉ"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  paddingRight: "25px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="submit"
                  style={{
                    border: "1px solid green",
                    padding: "5px 20px",
                    borderRadius: "8px",
                    marginRight: "10px",
                  }}
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default UserAdress;
