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
    <Nav className="logout">
      <h3> {props.logged_in ? `Hello, ${props.username}` : "Please Log In"}</h3>

      <Link onClick={props.handle_logout}>
        <h5 style={{paddingLeft:20}}>Logout</h5>
      </Link>
    </Nav>
  );


  // const author_nav = ()=>{
  //   if(props.logged_in)
  //   return(
  //           <NavDropdown title="Blogger Section" id="collasible-nav-dropdown">
  //             <NavDropdown.Item><Link to="/writeblog">Write Blog</Link></NavDropdown.Item>
  //             <NavDropdown.Item ><Link to="/myblogs">My Blogs</Link></NavDropdown.Item>
  //             <NavDropdown.Item ><Link to="/myprofile">My Profile</Link></NavDropdown.Item>
  //           </NavDropdown>
  //   )
  // }
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
              <NavDropdown.Item><Link to="/writeblog">Write Blog</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/myblogs">My Blogs</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/myprofile">My Profile</Link></NavDropdown.Item>
            </NavDropdown>
  {/* <div>{author_nav()}</div> */}
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
