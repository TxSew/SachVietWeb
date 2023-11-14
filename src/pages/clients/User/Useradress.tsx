import "./index.scss";
import NavUser from "./layout/NavUser";
import "./style.scss";
function UserAdress() {
  return (
    <NavUser>
      <div className="mainps-0 pt-3 pb-3 pe-0">
        <div className="main-waper ">
          <div className="main-waper-top pt-2 pb-2 ps-4">
            <h1 className="info-acc-hd p-3">THÊM ĐỊA CHỈ MỚI</h1>
            <form action="">
              <div className="row p-4">
                <div className="adr-ttlh c-12 m-6 l-6 pe-3">
                  <h2>Thông tin liên hệ</h2>
                  <div className="ttlh ttlh-name">
                    <input type="text" placeholder="Tên" />
                  </div>
                  <div className="ttlh ttlh-fn">
                    <input type="text" placeholder="Họ" />
                  </div>
                  <div className="ttlh ttlh-sdt">
                    <input type="text" placeholder="Số điện thoại" />
                  </div>
                </div>
                <div className="adr-dc c-12 m-6 l-6  pe-3">
                  <h2>Địa chỉ</h2>
                  <div className="adr adr-adress">
                    <input type="text" placeholder="Địa chỉ" />
                  </div>
                  <div className="adr adr-t">
                    <select name="" id="" placeholder="Tỉnh/Thành phố">
                      <option value="1">Tỉnh/Thành phố</option>
                      <option value="1">Việt Nam</option>
                      <option value="1">Việt Nam</option>
                      <option value="1">Việt Nam</option>
                    </select>
                  </div>
                  <div className="adr adr-tp">
                    <select name="" id="" placeholder="Quận/Huyện">
                      <option value="1">Quận/Huyện</option>
                      <option value="1">Việt Nam</option>
                      <option value="1">Việt Nam</option>
                    </select>
                  </div>
                  <div className="adr adr-qh">
                    <select name="" id="" placeholder="Xã/Phường">
                      <option value="1">Xã/Phường</option>
                      <option value="1">Việt Nam</option>
                      <option value="1">Việt Nam</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default UserAdress;
