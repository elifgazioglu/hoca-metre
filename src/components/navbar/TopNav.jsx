import React from "react";
import "./TopNav.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavLink from "react-bootstrap/esm/NavLink";

const TopNav = () => {
  const menuData = [
    { path: "/", name: "Home" },
    { path: "/login", name: "Login" },
    { path: "/register", name: "Register" },
  ];
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar">
          <Container fluid>
            <Navbar.Brand href="/" className="brand">
              Hoca Metre
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="white-toggle"
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Hoca Metre
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {menuData.map((item) => (
                    <NavLink
                      className="nav-link"
                      href={item.path}
                      key={item.name}
                    >
                      <div className="list-item">{item.name}</div>
                    </NavLink>
                  ))}
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default TopNav;
