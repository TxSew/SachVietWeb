import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "../style.scss";
import "../index.scss";

function NavUser({ children }: { children: React.ReactNode }) {
  return (
    <Grid>
      <div className="UserGroup">
        <section className="user">
          <div className="container">
            <div className="row">
              <div className="wide c-0 m-0 l-3">
                <div className="sidebar p-3">
                  <div className="side-waper p-3 p-4">
                    <h1 className="side-hd pb-3">Tài khoản</h1>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">Thông tin tài khoản</p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                    <div className="side-item pt-3 pb-1">
                      <Link to="">
                        <p className="side-item-text">
                          Bảng điều kiển tài khoản
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wide c-12 m-12 l-9">{children}</div>
            </div>
          </div>
        </section>
      </div>
    </Grid>
  );
}

export default NavUser;
