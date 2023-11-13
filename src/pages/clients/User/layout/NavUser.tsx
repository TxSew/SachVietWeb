import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "../index.scss";
import "../style.scss";

function NavUser({ children }: { children: React.ReactNode }) {
  return (
    <Grid>
      <div className="UserGroup">
        <section className="user">
          <Container maxWidth="xl">
            <div className="row">
              <div className="wide c-0 m-0 l-3">
                <div className="sidebar ps-0 pe-3 pb-3 pt-3">
                  <div className="side-waper p-3 p-4">
                    <h1 className="side-hd pb-3">Tài khoản</h1>
                    <div className="side-item pt-3 pb-1">
                      <Link to="/user">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="/user/info">
                        <p className="side-item-text">Thông tin tài khoản</p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="/user/adress">
                        <p className="side-item-text">Sổ địa chỉ</p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="/user/myvoucher">
                        <p className="side-item-text">Ví voucher</p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="/user/mycart">
                        <p className="side-item-text">Đơn hàng của tôi</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wide c-12 m-12 l-9">{children}</div>
            </div>
          </Container>
        </section>
      </div>
    </Grid>
  );
}

export default NavUser;
