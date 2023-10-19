import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/dashboardStyles.scss";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  return (
    <div className="dashHeader">
      <Navbar expand={false} className="bg-body-tertiary mb-3 mr-auto">
        <Container fluid>
          <img src="/mainlogo.svg" alt="logo" width={120} height={130} />
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                لام تا کام
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 navbar-exapnd-menu">
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
                  دسته بندی
                </NavLink>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to={"/"}
                >
                  پنل ادمین
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* <img src="/mainlogo.svg" alt="logo" width={120} height={130} />
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
          دسته بندی
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to={"/"}
        >
          پنل ادمین
        </NavLink>
      </div> */}
    </div>
  );
}

export default Header;
