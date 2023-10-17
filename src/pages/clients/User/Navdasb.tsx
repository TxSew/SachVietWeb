import { BiBookAdd, BiSolidCategoryAlt } from "react-icons/bi";
import {
  FaBell,
  FaBookOpen,
  FaChevronDown,
  FaFlag,
  FaHome,
  FaListUl,
  FaSearch
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import "./style.scss";
function NavDas() {
  return (
    <div className="dasb pb-3">
      <div className="dasb-header">
        <div className="dasb-header-logo">
          <h1>TuanDEV</h1>
        </div>
        <div className="dasb-header-right row">
          <div className="dasb-header-togg c-1 m-1 l-1">
            <NavLink to=""></NavLink>
          </div>
          <ul className="dasb-header-right c-11 m-11 l-11">
            <li className="dasb-header-right-search">
              <NavLink to="">
                <i>
                  <FaSearch />
                </i>
              </NavLink>
            </li>
            <li className="dasb-header-right-flag">
              <NavLink to="">
                <i>
                  <FaFlag />
                </i>
              </NavLink>
            </li>
            <li className="dasb-header-right-search">
              <NavLink to="">
                <i>
                  <FaBell />
                </i>
              </NavLink>
            </li>
            <li className="dasb-header-right-action">
              <input type="checkbox" id="action" />
              <label htmlFor="action">
                <img
                  width={32}
                  src="https://php.spruko.com/ynex/ynex/assets/images/faces/9.jpg"
                  alt="Ảnh admin"
                />
                <span>Tuấn</span>
                <i>
                  <FaChevronDown />
                </i>
              </label>
              <div className="dasb-header-right-action-drop" id="drop">
                <NavLink className="info" to="">
                  <i></i>
                  <p>Thông tin</p>
                </NavLink>
                <NavLink className="log" to="">
                  <i></i>
                  <p>Logout</p>
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="dasb-wapper">
        <label htmlFor="tool" className="tool">
          <FaListUl />
        </label>
        <input type="checkbox" id="tool" />
        <div className="dasb-sidebar">
          <ul className="k">
            <li className="">
              <NavLink to="">
                <i>
                  <FaHome />
                </i>
                <span>Trang chủ</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="../admin/category">
                <i>
                  <BiSolidCategoryAlt />
                </i>
                <span>Danh mục</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="../admin/product">
                <i>
                  <FaBookOpen />
                </i>
                <span>Sản phẩm</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="#">
                <i>
                  <BiBookAdd />
                </i>
                <span>...</span>
              </NavLink>
            </li>
            <div className="active start"></div>
          </ul>
        </div>
        <div className="dasb-wapper-main">
          <div className="dasb-wapper-main-bg"></div>
        </div>
      </div>
    </div>
  );
}

export default NavDas;
