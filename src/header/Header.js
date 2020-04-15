import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import HeaderWrapper from "./HeaderStyles";

const Header = props => {
  return (
    <HeaderWrapper>
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Navbar.Brand href="#home">Rick &#38; Morty Show</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto custom-nav">{props.children}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </HeaderWrapper>
  );
};

export default Header;
