import { NavLink } from "react-router-dom";
import "../../styles/dashboardStyles.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";

function Header() {
  const [expanded, setExpanded] = useState<boolean>(false);
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
              <img src="lamtakamtext.png" alt="text lamtakam" width={100} />
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 navbar-exapnd-menu">
                <Navbar.Toggle className="navbartoggle">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                    to={"/blog-create-view"}
                  >
                    ایجاد بلاگ جدید
                  </NavLink>
                </Navbar.Toggle>
                <Navbar.Toggle className="navbartoggle">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                    to={"/category-create"}
                  >
                    دسته بندی
                  </NavLink>
                </Navbar.Toggle>
                <Navbar.Toggle className="navbartoggle">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                    to={"/"}
                  >
                    پنل ادمین
                  </NavLink>
                </Navbar.Toggle>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
