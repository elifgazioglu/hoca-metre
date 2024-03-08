import React from "react";
import "./TopNav.scss";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavLink from "react-bootstrap/esm/NavLink";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js.cookie";
import { useEffect, useState } from "react";

const TopNav = () => {
  const menuData = [
    { path: "/", name: "Home" },
    { path: "/login", name: "Login" },
    { path: "/register", name: "Register" },
    { path: "/add-teacher", name: "AddTeacher" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/auth/email`);
      } catch (err) {
        console.log(err)
      }
    };
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try{
      await axios.post(
        `http://localhost:8000/api/auth/logout`,
        null,
        {
          withCredentials: true,
        }
      );
      Cookies.remove("accessToken");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("user")
    } catch(err){
      console.log(err);
    }
  }

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar">
          <Container fluid className="container">
            <Navbar.Brand href="/" className="brand">
              Hoca Metre
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
                  {currentUser ? (
                    <div className="profile-side">
                      <img
                        src={
                          currentUser?.profilePic
                            ? `http://localhost:8000/images/${currentUser.profilePic}`
                            : "/nouser.png"
                        }
                        alt=""
                        className="profile-img"
                      ></img>
                      <NavDropdown
                        title={currentUser.name}
                        id="basic-nav-dropdown"
                      >
                        <NavDropdown.Item href="/profile">
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/add-teacher">
                          Add Teacher
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={handleLogout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  ) : (
                    <>
                      {menuData.map((item) => (
                        <NavLink
                          className="nav-link"
                          href={item.path}
                          key={item.name}
                        >
                          <div className="list-item">{item.name}</div>
                        </NavLink>
                      ))}
                    </>
                  )}
                  <NavDropdown
                    title="Türkçe"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className="navDropdown"
                  >
                    <NavDropdown.Item href="#action3">English</NavDropdown.Item>
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
