import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/dashboardStyles.scss";

function Header() {
  return (
    <>
      <div className="dashHeader">
        <img src="/mainlogo.svg" alt="logo" width={120} height={130} />
        <div className="navbar">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={"/blog-create-view"}
          >
            ایجاد بلاگ جدید
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={"/category-create"}
          >
            ایجاد دسته بندی
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={"/"}
          >
            پنل ادمین
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
