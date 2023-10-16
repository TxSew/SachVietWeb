import React from "react";
import "./style.scss";
import "./index.scss";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiBookAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaThLarge } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
function NavDas() {
  return (
    <div className="dasb pb-3">
      <div className="dasb-header">
        <div className="dasb-header-logo">
          <h1>TuanDEV</h1>
        </div>
        <div className="dasb-header-right row">
          <div className="dasb-header-togg c-1 m-1 l-1">
            <Link to="">
              <FaListUl />
            </Link>
          </div>
          <ul className="dasb-header-right c-11 m-11 l-11">
            <li className="dasb-header-right-search">
              <Link to="">
                <i>
                  <FaSearch />
                </i>
              </Link>
            </li>
            <li className="dasb-header-right-flag">
              <Link to="">
                <i>
                  <FaFlag />
                </i>
              </Link>
            </li>
            <li className="dasb-header-right-search">
              <Link to="">
                <i>
                  <FaBell />
                </i>
              </Link>
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
                <Link className="info" to="">
                  <i></i>
                  <p>Thông tin</p>
                </Link>
                <Link className="log" to="">
                  <i></i>
                  <p>Logout</p>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="dasb-wapper">
        <div className="dasb-sidebar">
          <ul className="">
            <li>
              <Link to="#">
                <i>
                  <FaHome />
                </i>
                <span>Trang chủ</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i>
                  <BiSolidCategoryAlt />
                </i>
                <span>Danh mục</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i>
                  <FaBookOpen />
                </i>
                <span>Sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i>
                  <BiBookAdd />
                </i>
                <span>...</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dasb-wapper-main">
          <div className="dasb-wapper-main-bg">chay</div>
        </div>
      </div>
    </div>
  );
}

export default NavDas;
