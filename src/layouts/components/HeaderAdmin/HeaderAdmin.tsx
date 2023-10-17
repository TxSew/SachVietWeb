import React from "react";
import {
  FaBell,
  FaChevronDown,
  FaFlag,
  FaListUl,
  FaSearch
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./style.scss";

function HeaderAdmin() {
  return (
    <div className="dasb-header">
      <div className="dasb-header-logo">
        <h1>TuanDEV</h1>
      </div>
      <div className="dasb-header-right row">
        <div className="dasb-header-togg c-1 m-1 l-1">
          <NavLink to="">
            <FaListUl />
          </NavLink>
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
  );
}

export default HeaderAdmin;
