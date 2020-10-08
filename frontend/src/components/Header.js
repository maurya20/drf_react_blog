import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../App.css'

const Header = (props) => {
  const logged_out_nav = (
    <Nav style={{ color: "#00ff00" }}>
      <Nav.Link>
        <Link to={"/login"}>LogIn</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to={"/signup"}>SignUP</Link>
      </Nav.Link>
    </Nav>
  );

  const logged_in_nav = (
    <Nav style={{ color: "#00ff00" }}>
      <h3> {props.logged_in ? `Hello, ${props.username}` : "Please Log In"}</h3>

      <h3 style={{ color: "#990", paddingLeft: 15 }} onClick={props.handle_logout}>
        Logout
      </h3>
    </Nav>
  );
  return (
    <div>
      <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="#home">
          <h1>Blog Website</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              {" "}
              <Link to={"/"}>Home</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to={"/about"}>About</Link>
            </Nav.Link>
            <NavDropdown title="Blogger Section" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Write Blog</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">My Blogs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Edit Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
