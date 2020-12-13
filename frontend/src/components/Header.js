import React, {useContext, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../App.css'
import {BlogContext} from '../store/BlogContext'
import logo from '../components/images/logo.png'




const Header = () => {

  const [appState, setAppState] = useContext(BlogContext)

  const handle_logout = (e)=>{
    localStorage.removeItem("blogtoken")
    setAppState({logged_in:false, username:""})
    
  }


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
    <Nav className="logout ">
      <h3> {appState.logged_in ? `Hello, ${appState.username}` : "Please Log In"}</h3>

      <Link onClick={handle_logout} >
        <h5 style={{paddingLeft:20}} className="headerfont">Logout</h5>
      </Link>
    </Nav>
  );


  const author_nav = ()=>{
    if(appState.logged_in)
    return(
            <NavDropdown title="Blogger Section" id="collasible-nav-dropdown" className="author_nav">
              <NavDropdown.Item><Link to="/writeblog">Write Blog</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/myblogs">My Blogs</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/myprofile">My Profile</Link></NavDropdown.Item>
            </NavDropdown>
    )
  }
  return (
    <div>
      <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="#home" className="logo">
          {/* <img src={logo} width="20%" alt="logo" /> */}
          <h1>BlogSite</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto headerfont">
            <Nav.Link>
              {" "}
              <Link to={"/"}>Home</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to={"/about"}>About</Link>
            </Nav.Link>
  {author_nav()}
          </Nav>
          <Nav className="headerfont">
            <div>{appState.logged_in ? logged_in_nav : logged_out_nav}</div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
